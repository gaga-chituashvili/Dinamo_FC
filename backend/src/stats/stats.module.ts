import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StatsController } from './stats.controller';
import { StatsService } from './stats.service';
import { SeasonProgressScraper } from './scrapers/season-progress.scraper';
import { H2HScraper } from './scrapers/h2h.scraper';
import { Match } from './entities/match.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Match])],
  controllers: [StatsController],
  providers: [StatsService, SeasonProgressScraper, H2HScraper],
  exports: [StatsService],
})
export class StatsModule {}
