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
export class ScorersService {
  private readonly logger = new Logger(ScorersService.name);
  private cache: { data: any; cachedAt: number } | null = null;
  private readonly CACHE_TTL = 5 * 60 * 1000;

  async getTopScorers() {
    if (this.cache && Date.now() - this.cache.cachedAt < this.CACHE_TTL) {
      return this.cache.data;
    }

    this.logger.log('Scraping top scorers from erovnuliliga.ge');
    const { data: html } = await axios.get('https://erovnuliliga.ge/ge/stats', {
      headers: HEADERS,
    });
    const $ = cheerio.load(html);

    const parseList = (wrapper: cheerio.Cheerio<any>) => {
      const result: any[] = [];
      wrapper.find('li').each((_, el) => {
        const rank = parseInt(
          $(el).find('.ptl-rank').text().replace('.', '').trim(),
        );
        const isLeader = $(el).find('.ptl-leader').length > 0;
        const name = isLeader
          ? $(el).find('.ptl-leader-name-inner').text().trim()
          : $(el).find('.ptl-name a').text().trim();
        const team = isLeader
          ? ($(el).find('.ptl-leader-club').attr('title') ?? '')
          : ($(el).find('.ptl-club').attr('title') ?? '');
        const value = isLeader
          ? parseInt($(el).find('.ptl-leader-value b').text().trim()) || 0
          : parseInt($(el).find('.ptl-value').text().trim()) || 0;
        const photo = isLeader
          ? ($(el)
              .find('.ptl-leader-photo img')
              .attr('src')
              ?.replace(/\/styles\/[^/]+\/public/, '')
              ?.replace(/\?itok=.*$/, '') ?? null)
          : null;
        const clubLogo = isLeader
          ? ($(el)
              .find('.ptl-leader-club img')
              .attr('src')
              ?.replace(/\/styles\/[^/]+\/public/, '')
              ?.replace(/\?itok=.*$/, '') ?? null)
          : ($(el)
              .find('.ptl-club img')
              .attr('src')
              ?.replace(/\/styles\/[^/]+\/public/, '')
              ?.replace(/\?itok=.*$/, '') ?? null);

        if (!name || isNaN(rank)) return;
        result.push({ rank, name, team, value, photo, clubLogo });
      });
      return result;
    };

    const wrappers = $('.player-tops-list');
    const result = {
      goals: parseList($(wrappers[0])).slice(0, 5),
      assists: parseList($(wrappers[1])).slice(0, 5),
      appearances: parseList($(wrappers[2])).slice(0, 5),
    };

    this.cache = { data: result, cachedAt: Date.now() };
    return result;
  }
}
