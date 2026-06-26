import { Injectable, Logger } from '@nestjs/common';
import axios from 'axios';
import * as cheerio from 'cheerio';

const HEADERS = {
  'User-Agent':
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36',
  'Accept-Language': 'ka-GE,ka;q=0.9,en-US;q=0.8',
  Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
};

export interface TeamProgress {
  position: number;
  team: string;
  played: number;
  points: number;
  logo: string | null;
}

export interface SeasonProgress {
  totalMatchdays: number;
  currentMatchday: number;
  dinamo: TeamProgress;
  second: TeamProgress;
  pointsNeeded: number;
  remainingMatches: number;
  maxPossiblePoints: number;
  isFactualLeader: boolean;
}

@Injectable()
export class SeasonProgressScraper {
  private readonly logger = new Logger(SeasonProgressScraper.name);
  private cache: { data: SeasonProgress; cachedAt: number } | null = null;
  private readonly CACHE_TTL = 60 * 60 * 1000;

  async getSeasonProgress(): Promise<SeasonProgress> {
    if (this.cache && Date.now() - this.cache.cachedAt < this.CACHE_TTL) {
      return this.cache.data;
    }

    this.logger.log('Scraping season progress from erovnuliliga.ge');
    const { data: html } = await axios.get<string>(
      'https://erovnuliliga.ge/ge/tables',
      { headers: HEADERS },
    );
    const $ = cheerio.load(html);

    const standings: TeamProgress[] = [];

    $('table.ttl-table tbody tr').each((_, row) => {
      const position = parseInt(
        $(row).find('.ttl-cell-position').text().replace('.', '').trim(),
      );
      const team = $(row).find('.ttl-cell-club a').text().trim();
      const rawLogo = $(row).find('.ttl-cell-club img').attr('src') ?? '';
      const logo = rawLogo.replace(/\?itok=.*$/, '') || null;
      const played =
        parseInt($(row).find('.ttl-cell-plays').text().trim()) || 0;
      const points =
        parseInt($(row).find('.ttl-cell-points').text().trim()) || 0;

      if (!team || isNaN(position)) return;
      standings.push({ position, team, played, points, logo });
    });

    const dinamo =
      standings.find(
        (s) =>
          s.team.toLowerCase().includes('დინამო თბ') ||
          s.team.toLowerCase().includes('dinamo tb'),
      ) ?? standings[0];

    const second = standings.find((s) => s.position === 2) ?? standings[1];

    const totalMatchdays = (standings[0]?.played ?? 19) + 17;
    const remainingMatches = totalMatchdays - (dinamo?.played ?? 0);
    const maxPossiblePoints = (dinamo?.points ?? 0) + remainingMatches * 3;
    const pointsNeeded = Math.max(
      0,
      (second?.points ?? 0) + 1 - (dinamo?.points ?? 0),
    );
    const isFactualLeader = (dinamo?.points ?? 0) - (second?.points ?? 0) > 20;

    const result: SeasonProgress = {
      totalMatchdays,
      currentMatchday: dinamo?.played ?? 0,
      dinamo: dinamo ?? {
        position: 0,
        team: 'დინამო თბ',
        played: 0,
        points: 0,
        logo: null,
      },
      second: second ?? {
        position: 2,
        team: '—',
        played: 0,
        points: 0,
        logo: null,
      },
      pointsNeeded,
      remainingMatches,
      maxPossiblePoints,
      isFactualLeader,
    };

    this.cache = { data: result, cachedAt: Date.now() };
    return result;
  }
}
