import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlayersController } from './players.controller';
import { PlayersService } from './players.service';
import { SquadService } from './services/squad.service';
import { FixturesService } from './services/fixtures.service';
import { StandingsService } from './services/standings.service';
import { ScorersService } from './services/scorers.service';
import { NewsService } from './services/news.service';
import { HistoryService } from './services/history.service';
import { TitlesService } from './services/titles.service';
import { LiveService } from './services/live.service';
import { User } from '../auth/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [PlayersController],
  providers: [
    PlayersService,
    SquadService,
    FixturesService,
    StandingsService,
    ScorersService,
    NewsService,
    HistoryService,
    TitlesService,
    LiveService,
  ],
  exports: [PlayersService],
})
export class PlayersModule {}
