import { Injectable } from '@nestjs/common';
import { PlayerDetail, PlayerSummary } from './player.types';
import { SquadService } from './services/squad.service';

@Injectable()
export class PlayersService {
  constructor(private readonly squadService: SquadService) {}

  getSquad(): Promise<PlayerSummary[]> {
    return this.squadService.getSquad();
  }

  getPlayerById(id: string): Promise<PlayerDetail> {
    return this.squadService.getPlayerById(id);
  }
}
