import { Controller, Get, Query } from '@nestjs/common';
import { StatsService } from './stats.service';

@Controller('stats')
export class StatsController {
  constructor(private readonly statsService: StatsService) {}

  @Get('season-progress')
  getSeasonProgress() {
    return this.statsService.getSeasonProgress();
  }

  @Get('h2h/opponents')
  getOpponents() {
    return this.statsService.getOpponents();
  }

  @Get('h2h')
  getH2H(@Query('opponent') opponent: string) {
    return this.statsService.getH2H(opponent);
  }
}
