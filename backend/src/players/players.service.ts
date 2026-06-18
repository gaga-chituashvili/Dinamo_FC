import {
  Injectable,
  Logger,
  OnModuleDestroy,
  OnModuleInit,
} from '@nestjs/common';
import { PlayerDetail, PlayerSummary } from './player.types';
import { SquadService } from './services/squad.service';
import { FixturesService } from './services/fixtures.service';
import { StandingsService } from './services/standings.service';
import { ScorersService } from './services/scorers.service';
import { NewsService } from './services/news.service';
import { HistoryService } from './services/history.service';
import { LiveService } from './services/live.service';

@Injectable()
export class PlayersService implements OnModuleDestroy, OnModuleInit {
  private readonly logger = new Logger(PlayersService.name);

  constructor(
    private readonly squadService: SquadService,
    private readonly fixturesService: FixturesService,
    private readonly standingsService: StandingsService,
    private readonly scorersService: ScorersService,
    private readonly newsService: NewsService,
    private readonly historyService: HistoryService,
    private readonly liveService: LiveService,
  ) {}

  async onModuleDestroy() {}

  async onModuleInit() {
    try {
      await Promise.all([
        this.standingsService.getStandings(),
        this.fixturesService.getFixtures(),
      ]);
      this.logger.log('Cache warmed up');
    } catch {
      this.logger.warn('Failed to warm cache');
    }
    setInterval(
      () => void this.liveService.checkAndNotifyLive(),
      5 * 60 * 1000,
    );
  }

  getSquad(): Promise<PlayerSummary[]> {
    return this.squadService.getSquad();
  }

  getPlayerById(id: string): Promise<PlayerDetail> {
    return this.squadService.getPlayerById(id);
  }

  getFixtures() {
    return this.fixturesService.getFixtures();
  }

  getStandings() {
    return this.standingsService.getStandings();
  }

  getTopScorers() {
    return this.scorersService.getTopScorers();
  }

  getNews() {
    return this.newsService.getNews();
  }

  getHistory() {
    return this.historyService.getHistory();
  }

  getLive() {
    return this.liveService.getLive();
  }
}
