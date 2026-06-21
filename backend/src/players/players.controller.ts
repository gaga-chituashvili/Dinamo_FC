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
import { TitlesService } from './services/titles.service';
import axios from 'axios';

@Controller('players')
export class PlayersController {
  constructor(
    private readonly playersService: PlayersService,
    private readonly titlesService: TitlesService,
  ) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  getSquad() {
    return this.playersService.getSquad();
  }

  @Get('fixtures')
  @HttpCode(HttpStatus.OK)
  getFixtures() {
    return this.playersService.getFixtures();
  }

  @Get('standings')
  @HttpCode(HttpStatus.OK)
  getStandings() {
    return this.playersService.getStandings();
  }

  @Get('scorers')
  @HttpCode(HttpStatus.OK)
  getTopScorers() {
    return this.playersService.getTopScorers();
  }

  @Get('news')
  @HttpCode(HttpStatus.OK)
  getNews() {
    return this.playersService.getNews();
  }

  @Get('history')
  @HttpCode(HttpStatus.OK)
  getHistory() {
    return this.playersService.getHistory();
  }

  @Get('live')
  @HttpCode(HttpStatus.OK)
  getLive() {
    return this.playersService.getLive();
  }

  @Get('proxy-image')
  async proxyImage(@Query('url') url: string, @Res() res: Response) {
    try {
      const response = await axios.get<Readable>(url, {
        responseType: 'stream',
        headers: {
          Referer: 'https://erovnuliliga.ge',
          'User-Agent':
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        },
      });
      res.setHeader('Content-Type', 'image/jpeg');
      res.setHeader('Cache-Control', 'public, max-age=86400');
      response.data.pipe(res);
    } catch {
      res.status(404).end();
    }
  }
  @Get('titles')
  @HttpCode(HttpStatus.OK)
  getTitles() {
    return this.titlesService.getTitles();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  getPlayer(@Param('id') id: string) {
    const normalized = id.startsWith('player-') ? id : `player-${id}`;
    return this.playersService.getPlayerById(normalized);
  }
}
