import { Injectable } from '@nestjs/common';
import { SeasonProgressScraper } from './scrapers/season-progress.scraper';

@Injectable()
export class StatsService {
  constructor(private readonly seasonProgressScraper: SeasonProgressScraper) {}

  getSeasonProgress() {
    return this.seasonProgressScraper.getSeasonProgress();
  }
}
