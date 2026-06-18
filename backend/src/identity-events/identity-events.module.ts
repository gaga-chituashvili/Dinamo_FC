import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IdentityEventsController } from './identity-events.controller';
import { SiteLogin } from './site-login.entity';
import { SiteUser } from './site-user.entity';
import { ProfilesEventsPublisher } from './profiles-events.publisher';
import { SiteUsersService } from './site-users.service';

@Module({
  imports: [TypeOrmModule.forFeature([SiteUser, SiteLogin])],
  controllers: [IdentityEventsController],
  providers: [SiteUsersService, ProfilesEventsPublisher],
})
export class IdentityEventsModule {}
