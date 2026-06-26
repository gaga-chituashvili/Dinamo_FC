import { Injectable } from '@nestjs/common';
import { SeasonProgressScraper } from './scrapers/season-progress.scraper';
import { H2HScraper } from './scrapers/h2h.scraper';
import { OnThisDayScraper } from './scrapers/on-this-day.scraper';

@Injectable()
export class StatsService {
  constructor(
    private readonly seasonProgressScraper: SeasonProgressScraper,
    private readonly h2hScraper: H2HScraper,
    private readonly onThisDayScraper: OnThisDayScraper,
  ) {}

  getSeasonProgress() {
    return this.seasonProgressScraper.getSeasonProgress();
  }

  getOpponents() {
    return this.h2hScraper.getOpponents();
  }

  getH2H(opponentName: string) {
    return this.h2hScraper.getH2H(opponentName);
  }

  getOnThisDay() {
    return this.onThisDayScraper.getOnThisDay();
  }
}
