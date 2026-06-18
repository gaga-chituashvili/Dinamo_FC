import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { ContactModule } from './contact/contact.module';
import { ContactEntity } from './contact/contact.entity';
import { PlayersModule } from './players/players.module';
import { IdentityEventsModule } from './identity-events/identity-events.module';
import { SiteLogin } from './identity-events/site-login.entity';
import { SiteUser } from './identity-events/site-user.entity';
import { User } from './auth/entities/user.entity';
import { PasswordReset } from './auth/entities/password-reset.entity';
import { ProfileModule } from './profile/profile.module';
import { FanProfile } from './profile/entities/fan-profile.entity';
import { SponsorsModule } from './sponsors/sponsors.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_URL,
      entities: [
        ContactEntity,
        SiteUser,
        SiteLogin,
        User,
        PasswordReset,
        FanProfile,
      ],
      synchronize: true,
      ssl: { rejectUnauthorized: false },
    }),
    ContactModule,
    PlayersModule,
    IdentityEventsModule,
    AuthModule,
    ProfileModule,
    SponsorsModule,
  ],
})
export class AppModule {}
