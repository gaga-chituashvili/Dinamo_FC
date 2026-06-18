import {
  Injectable,
  Logger,
  OnModuleDestroy,
  OnModuleInit,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import amqp, { ChannelWrapper } from 'amqp-connection-manager';
import type { AmqpConnectionManager } from 'amqp-connection-manager';
import type { Channel } from 'amqplib';
import {
  TENANT_SITE_LOGGED_IN_EVENT,
  type TenantSiteLoggedInEvent,
} from './tenant-events';

@Injectable()
export class ProfilesEventsPublisher implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(ProfilesEventsPublisher.name);
  private connection: AmqpConnectionManager | null = null;
  private channel: ChannelWrapper | null = null;

  constructor(private readonly configService: ConfigService) {}

  onModuleInit(): void {
    const rabbitmqUrl = this.configService.get<string>('RABBITMQ_URL');
    if (!rabbitmqUrl) {
      this.logger.warn(
        'RABBITMQ_URL is not set — tenant.site.logged_in will not reach line-profiles',
      );
      return;
    }

    this.connection = amqp.connect([rabbitmqUrl]);
    this.channel = this.connection.createChannel({ json: false });
  }

  async onModuleDestroy(): Promise<void> {
    await this.channel?.close();
    await this.connection?.close();
  }

  publishTenantSiteLoggedIn(event: TenantSiteLoggedInEvent): void {
    if (!this.channel) {
      this.logger.warn(
        `Skipped ${TENANT_SITE_LOGGED_IN_EVENT} for tenant '${event.tenantSlug}'`,
      );
      return;
    }

    const queue =
      this.configService.get<string>('LINE_PROFILES_EVENTS_QUEUE') ??
      'line-profiles.identity.events.dev';
    const payload = Buffer.from(
      JSON.stringify({
        pattern: TENANT_SITE_LOGGED_IN_EVENT,
        data: event,
      }),
    );

    void this.channel
      .addSetup(async (setupChannel: Channel) => {
        await setupChannel.assertQueue(queue, { durable: true });
      })
      .then(() => this.channel?.sendToQueue(queue, payload))
      .catch((error: unknown) => {
        this.logger.error(
          `Failed to publish ${TENANT_SITE_LOGGED_IN_EVENT} to ${queue}`,
          error instanceof Error ? error.stack : undefined,
        );
      });
  }
}
