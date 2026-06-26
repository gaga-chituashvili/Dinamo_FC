import { Controller, Get } from '@nestjs/common';
import { StandingsService } from './standings.service';
import { ScorersService } from './scorers.service';

@Controller('standings')
export class StandingsController {
  constructor(
    private readonly standingsService: StandingsService,
    private readonly scorersService: ScorersService,
  ) {}

  @Get()
  getStandings() {
    return this.standingsService.getStandings();
  }

  @Get('scorers')
  getScorers() {
    return this.scorersService.getTopScorers();
  }
}
