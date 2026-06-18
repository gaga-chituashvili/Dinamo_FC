import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import type {
  IdentityUserLoggedInEvent,
  IdentityUserRegisteredEvent,
} from './identity-events';
import { SiteLogin } from './site-login.entity';
import { SiteUser } from './site-user.entity';

@Injectable()
export class SiteUsersService {
  constructor(
    @InjectRepository(SiteUser)
    private readonly siteUsersRepository: Repository<SiteUser>,
    @InjectRepository(SiteLogin)
    private readonly siteLoginsRepository: Repository<SiteLogin>,
  ) {}

  async upsertFromRegistration(
    event: IdentityUserRegisteredEvent,
  ): Promise<void> {
    const occurredAt = this.parseOccurredAt(event.occurredAt);
    const existing = await this.siteUsersRepository.findOne({
      where: { identityUserId: event.userId },
    });

    if (!existing) {
      await this.siteUsersRepository.save(
        this.siteUsersRepository.create({
          identityUserId: event.userId,
          email: event.email.toLowerCase(),
          name: event.name,
          firstSeenAt: occurredAt,
        }),
      );
      return;
    }

    existing.email = event.email.toLowerCase();
    existing.name = event.name ?? existing.name;
    await this.siteUsersRepository.save(existing);
  }

  async recordLogin(event: IdentityUserLoggedInEvent): Promise<void> {
    const occurredAt = this.parseOccurredAt(event.occurredAt);
    let siteUser = await this.siteUsersRepository.findOne({
      where: { identityUserId: event.userId },
    });

    if (!siteUser) {
      siteUser = await this.siteUsersRepository.save(
        this.siteUsersRepository.create({
          identityUserId: event.userId,
          email: event.email.toLowerCase(),
          name: event.name,
          lastLoginAt: occurredAt,
          firstSeenAt: occurredAt,
        }),
      );
    } else {
      siteUser.email = event.email.toLowerCase();
      siteUser.name = event.name ?? siteUser.name;
      siteUser.lastLoginAt = occurredAt;
      await this.siteUsersRepository.save(siteUser);
    }

    await this.siteLoginsRepository.save(
      this.siteLoginsRepository.create({
        identityUserId: event.userId,
        occurredAt,
      }),
    );
  }

  private parseOccurredAt(value: string): Date {
    const parsed = new Date(value);
    return Number.isNaN(parsed.getTime()) ? new Date() : parsed;
  }
}
