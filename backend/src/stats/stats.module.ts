import { Module } from '@nestjs/common';
import { StatsController } from './stats.controller';
import { StatsService } from './stats.service';
import { SeasonProgressScraper } from './scrapers/season-progress.scraper';

@Module({
  controllers: [StatsController],
  providers: [StatsService, SeasonProgressScraper],
  exports: [StatsService],
})
export class StatsModule {}
