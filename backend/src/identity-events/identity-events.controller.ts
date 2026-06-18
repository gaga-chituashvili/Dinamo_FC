import { Controller, Logger } from '@nestjs/common';
import { Ctx, EventPattern, Payload, RmqContext } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';
import {
  IDENTITY_USER_LOGGED_IN_EVENT,
  IDENTITY_USER_REGISTERED_EVENT,
  type IdentityUserLoggedInEvent,
  type IdentityUserRegisteredEvent,
} from './identity-events';
import { ProfilesEventsPublisher } from './profiles-events.publisher';
import { SiteUsersService } from './site-users.service';

type AckChannel = { ack: (message: unknown) => void };

function isAckChannel(value: unknown): value is AckChannel {
  if (typeof value !== 'object' || value === null) {
    return false;
  }

  return typeof Reflect.get(value, 'ack') === 'function';
}

@Controller()
export class IdentityEventsController {
  private readonly logger = new Logger(IdentityEventsController.name);
  private readonly tenantSlug: string;

  constructor(
    private readonly siteUsersService: SiteUsersService,
    private readonly profilesEventsPublisher: ProfilesEventsPublisher,
    configService: ConfigService,
  ) {
    this.tenantSlug = (configService.get<string>('TENANT_SLUG') ?? 'dinamo')
      .trim()
      .toLowerCase();
  }

  @EventPattern(IDENTITY_USER_REGISTERED_EVENT)
  async handleUserRegistered(
    @Payload() payload: IdentityUserRegisteredEvent,
    @Ctx() context: RmqContext,
  ): Promise<void> {
    try {
      if (payload.tenantSlug.trim().toLowerCase() !== this.tenantSlug) {
        return;
      }

      this.logger.log(
        `Registration event userId=${payload.userId} tenant=${payload.tenantSlug}`,
      );
      await this.siteUsersService.upsertFromRegistration(payload);
    } finally {
      this.ack(context);
    }
  }

  @EventPattern(IDENTITY_USER_LOGGED_IN_EVENT)
  async handleUserLoggedIn(
    @Payload() payload: IdentityUserLoggedInEvent,
    @Ctx() context: RmqContext,
  ): Promise<void> {
    try {
      if (payload.tenantSlug.trim().toLowerCase() !== this.tenantSlug) {
        return;
      }

      this.logger.log(
        `Login event userId=${payload.userId} tenant=${payload.tenantSlug}`,
      );
      await this.siteUsersService.recordLogin(payload);
      this.profilesEventsPublisher.publishTenantSiteLoggedIn({
        userId: payload.userId,
        email: payload.email,
        name: payload.name,
        tenantSlug: payload.tenantSlug,
        siteSlug: this.tenantSlug,
        occurredAt: payload.occurredAt,
      });
    } finally {
      this.ack(context);
    }
  }

  private ack(context: RmqContext): void {
    const channelRef: unknown = context.getChannelRef();
    const message: unknown = context.getMessage();
    if (isAckChannel(channelRef)) {
      channelRef.ack(message);
    }
  }
}
