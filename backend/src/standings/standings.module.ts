import { Module } from '@nestjs/common';
import { StandingsService } from './standings.service';
import { ScorersService } from './scorers.service';
import { StandingsController } from './standings.controller';

@Module({
  controllers: [StandingsController],
  providers: [StandingsService, ScorersService],
  exports: [StandingsService, ScorersService],
})
export class StandingsModule {}
