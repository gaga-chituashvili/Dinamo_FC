import { Injectable, Logger } from '@nestjs/common';
import axios from 'axios';
import * as cheerio from 'cheerio';

const HEADERS = {
  'User-Agent':
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36',
  'Accept-Language': 'ka-GE,ka;q=0.9,en-US;q=0.8',
  Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
};

@Injectable()
export class FixturesService {
  private readonly logger = new Logger(FixturesService.name);
  private cache: { data: any; cachedAt: number } | null = null;
  private readonly CACHE_TTL = 5 * 60 * 1000;

  async getFixtures() {
    if (this.cache && Date.now() - this.cache.cachedAt < this.CACHE_TTL) {
      return this.cache.data;
    }

    this.logger.log('Scraping fixtures from erovnuliliga.ge');
    const { data: html } = await axios.get(
      'https://erovnuliliga.ge/ge/club/dinamo-tb/calendar',
      { headers: HEADERS },
    );
    const $ = cheerio.load(html);
    const fixtures: {
      date: string;
      home: string;
      away: string;
      team1: string | null;
      team2: string | null;
    }[] = [];

    $('.e-game-teaser.status-upcoming').each((_, el) => {
      const datetime = $(el).find('time').attr('datetime') ?? '';
      const date = datetime
        ? new Date(datetime).toLocaleString('ka-GE', {
            day: '2-digit',
            month: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
          })
        : '';

      const home = $(el).find('.grs-1 .grs-name.normal').text().trim();
      const away = $(el).find('.grs-2 .grs-name.normal').text().trim();
      const team1 =
        $(el)
          .find('.grs-1 .grs-logo')
          .attr('src')
          ?.replace(/\?itok=.*$/, '') ?? null;
      const team2 =
        $(el)
          .find('.grs-2 .grs-logo')
          .attr('src')
          ?.replace(/\?itok=.*$/, '') ?? null;

      if (!home || !away) return;
      fixtures.push({ date, home, away, team1, team2 });
    });

    this.cache = { data: fixtures, cachedAt: Date.now() };
    return fixtures;
  }
}
