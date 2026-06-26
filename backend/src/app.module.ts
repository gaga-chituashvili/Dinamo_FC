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
import { Match } from './stats/entities/match.entity';
import { SponsorsModule } from './sponsors/sponsors.module';
import { NewsModule } from './news/news.module';
import { StandingsModule } from './standings/standings.module';
import { LiveModule } from './live/live.module';
import { FixturesModule } from './fixtures/fixtures.module';
import { HistoryModule } from './history/history.module';
import { TitlesModule } from './titles/titles.module';
import { StatsModule } from './stats/stats.module';

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
        Match,
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
    NewsModule,
    StandingsModule,
    LiveModule,
    FixturesModule,
    HistoryModule,
    TitlesModule,
    StatsModule,
  ],
})
export class AppModule {}
