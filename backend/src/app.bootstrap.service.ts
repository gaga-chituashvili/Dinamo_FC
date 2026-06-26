import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { StandingsService } from './standings/standings.service';
import { FixturesService } from './fixtures/fixtures.service';
import { LiveService } from './live/live.service';

@Injectable()
export class AppBootstrapService implements OnModuleInit {
  private readonly logger = new Logger(AppBootstrapService.name);

  constructor(
    private readonly standingsService: StandingsService,
    private readonly fixturesService: FixturesService,
    private readonly liveService: LiveService,
  ) {}

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
}
