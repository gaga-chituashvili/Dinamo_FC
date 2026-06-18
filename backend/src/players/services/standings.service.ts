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
export class StandingsService {
  private readonly logger = new Logger(StandingsService.name);
  private cache: { data: any; cachedAt: number } | null = null;
  private readonly CACHE_TTL = 5 * 60 * 1000;

  async getStandings() {
    if (this.cache && Date.now() - this.cache.cachedAt < this.CACHE_TTL) {
      return this.cache.data;
    }

    this.logger.log('Scraping standings from erovnuliliga.ge');
    const { data: html } = await axios.get(
      'https://erovnuliliga.ge/ge/tables',
      { headers: HEADERS },
    );
    const $ = cheerio.load(html);
    const standings: any[] = [];

    $('table.ttl-table tbody tr').each((_, row) => {
      const position = parseInt(
        $(row).find('.ttl-cell-position').text().replace('.', '').trim(),
      );
      const team = $(row).find('.ttl-cell-club a').text().trim();
      const rawLogo = $(row).find('.ttl-cell-club img').attr('src') ?? '';
      const logo = rawLogo.replace(/\?itok=.*$/, '') || null;
      const played =
        parseInt($(row).find('.ttl-cell-plays').text().trim()) || 0;
      const won = parseInt($(row).find('.ttl-cell-wins').text().trim()) || 0;
      const drawn = parseInt($(row).find('.ttl-cell-draws').text().trim()) || 0;
      const lost = parseInt($(row).find('.ttl-cell-loses').text().trim()) || 0;
      const goalsFor = parseInt($(row).find('.ttl-cell-gf').text().trim()) || 0;
      const goalsAgainst =
        parseInt($(row).find('.ttl-cell-ga').text().trim()) || 0;
      const points =
        parseInt($(row).find('.ttl-cell-points').text().trim()) || 0;

      if (!team || isNaN(position)) return;
      standings.push({
        position,
        team,
        played,
        won,
        drawn,
        lost,
        goalsFor,
        goalsAgainst,
        points,
        logo,
      });
    });

    this.cache = { data: standings, cachedAt: Date.now() };
    return standings;
  }
}
