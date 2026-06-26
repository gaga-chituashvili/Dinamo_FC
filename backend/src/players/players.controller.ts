import {
  Controller,
  Get,
  Param,
  HttpCode,
  HttpStatus,
  Query,
  Res,
} from '@nestjs/common';
import type { Response } from 'express';
import type { Readable } from 'stream';
import { PlayersService } from './players.service';
import axios from 'axios';

@Controller('players')
export class PlayersController {
  constructor(private readonly playersService: PlayersService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  getSquad() {
    return this.playersService.getSquad();
  }

  @Get('proxy-image')
  async proxyImage(@Query('url') url: string, @Res() res: Response) {
    try {
      const response = await axios.get<Readable>(url, {
        responseType: 'stream',
        headers: {
          Referer: 'https://erovnuliliga.ge',
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        },
      });
      res.setHeader('Content-Type', 'image/jpeg');
      res.setHeader('Cache-Control', 'public, max-age=86400');
      response.data.pipe(res);
    } catch {
      res.status(404).end();
    }
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  getPlayer(@Param('id') id: string) {
    const normalized = id.startsWith('player-') ? id : `player-${id}`;
    return this.playersService.getPlayerById(normalized);
  }
}
