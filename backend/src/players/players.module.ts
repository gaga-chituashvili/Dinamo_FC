import { Module } from '@nestjs/common';
import { PlayersController } from './players.controller';
import { PlayersService } from './players.service';
import { SquadService } from './services/squad.service';

@Module({
  controllers: [PlayersController],
  providers: [PlayersService, SquadService],
  exports: [PlayersService],
})
export class PlayersModule {}
