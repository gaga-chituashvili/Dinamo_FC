import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import axios from 'axios';
import * as cheerio from 'cheerio';
import { PlayerDetail, PlayerSummary } from '../player.types';

const SQUAD_URL = 'https://erovnuliliga.ge/ge/club/dinamo-tb/squad';
const HEADERS = {
  'User-Agent':
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36',
  'Accept-Language': 'ka-GE,ka;q=0.9,en-US;q=0.8',
  Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
};

interface PlayerStats {
  dateOfBirth: string;
  age: string;
  height: string;
  appearances: number;
  goals: number;
  assists: number;
  yellowCards: number;
  redCards: number;
  minutesPlayed: number;
  cleanSheets: number;
}

@Injectable()
export class SquadService {
  private readonly logger = new Logger(SquadService.name);

  async getSquad(): Promise<PlayerSummary[]> {
    this.logger.log(`Scraping squad from ${SQUAD_URL}`);
    const { data: html } = await axios.get(SQUAD_URL, { headers: HEADERS });
    const $ = cheerio.load(html);
    const players: PlayerSummary[] = [];
    const FALLBACK_SVG =
      '/themes/custom/omedia/images/player-default-cutout.svg';

    $('[class*="e-player-teaser"]').each((_, el) => {
      const card = $(el);
      const number = card.find('.ept-number').text().trim();
      const name = card.find('.ept-name-inner').text().trim();
      const position = card.find('.ept-position').text().trim();
      const nationality = card
        .find('.ept-feature.ept-feature-nationality')
        .text()
        .replace(/ქვეყანა/g, '')
        .trim();

      const rawImageUrl =
        card.find('.ept-photo img, img').first().attr('src') ?? '';
      const cleaned = rawImageUrl
        .replace(/styles\/player_cutout_[^/]+\/public\//, '')
        .replace(/\?itok=.*$/, '');

      const imageUrl =
        !cleaned || cleaned === FALLBACK_SVG
          ? null
          : cleaned.startsWith('/')
            ? `https://erovnuliliga.ge${cleaned}`
            : cleaned;

      const profilePath =
        card.find('a[href*="/ge/player/"]').first().attr('href') ?? '';
      const profileUrl = profilePath
        ? `https://erovnuliliga.ge${profilePath}`
        : null;

      if (!name) return;
      const id = number ? `player-${number}` : `player-${players.length + 1}`;

      players.push({
        id,
        number: number || '—',
        name,
        position: position || '—',
        nationality: nationality || '—',
        imageUrl,
        flashscoreId: null,
        profileUrl,
      });
    });

    this.logger.log(`Found ${players.length} players`);
    return players;
  }

  async getPlayerById(id: string): Promise<PlayerDetail> {
    this.logger.log(`Fetching player detail for id=${id}`);
    const squad = await this.getSquad();
    const summary = squad.find((p) => p.id === id);
    if (!summary)
      throw new NotFoundException(`Player "${id}" not found in squad`);

    const stats = summary.profileUrl
      ? await this.scrapeStats(summary.profileUrl).catch(() => {
          this.logger.warn(`Stats scrape failed for ${summary.name}`);
          return this.emptyStats();
        })
      : this.emptyStats();

    return {
      ...summary,
      flashscoreId: null,
      dateOfBirth: stats.dateOfBirth,
      height: stats.height,
      age: stats.age,
      preferredFoot: '—',
      contractUntil: '—',
      marketValue: null,
      career: [],
      currentSeason: {
        appearances: stats.appearances,
        goals: stats.goals,
        assists: stats.assists,
        yellowCards: stats.yellowCards,
        redCards: stats.redCards,
        minutesPlayed: stats.minutesPlayed,
        cleanSheets: stats.cleanSheets,
      },
      lastMatches: [],
      transfers: [],
    };
  }

  private async scrapeStats(profileUrl: string): Promise<PlayerStats> {
    this.logger.log(`Scraping stats from ${profileUrl}`);
    const { data: html } = await axios.get(profileUrl, { headers: HEADERS });
    const $ = cheerio.load(html);

    const getInfoValue = (label: string): string => {
      let value = '—';
      $('.row').each((_, row) => {
        const col = $(row).find('.col').first().text().trim();
        if (col.includes(label)) {
          value = $(row)
            .find('.pf-intro-value')
            .text()
            .trim()
            .replace(/\s+/g, ' ');
        }
      });
      return value || '—';
    };

    const dateOfBirth = getInfoValue('დაბადების თარიღი');
    const age = getInfoValue('ასაკი');
    const height = getInfoValue('სიმაღლე');

    const currentYear = new Date().getFullYear().toString();
    const statBox = $(`[data-season-name="${currentYear}"]`).first();
    const stats: Record<string, string> = {};

    statBox.find('tr').each((_, row) => {
      const label = $(row).find('.st-label').text().trim();
      const value = $(row).find('.st-value').text().trim();
      if (label) stats[label] = value === '-' ? '0' : value;
    });

    return {
      dateOfBirth,
      age,
      height,
      appearances: parseInt(stats['თამაშები'] ?? '0') || 0,
      goals: parseInt(stats['გოლები'] ?? '0') || 0,
      assists: parseInt(stats['საგოლე პასები'] ?? '0') || 0,
      yellowCards: parseInt(stats['ყვითელი ბარათები'] ?? '0') || 0,
      redCards: parseInt(stats['წითელი ბარათები'] ?? '0') || 0,
      minutesPlayed: 0,
      cleanSheets: parseInt(stats['მშრალი მატჩები'] ?? '0') || 0,
    };
  }

  private emptyStats(): PlayerStats {
    return {
      dateOfBirth: '—',
      age: '—',
      height: '—',
      appearances: 0,
      goals: 0,
      assists: 0,
      yellowCards: 0,
      redCards: 0,
      minutesPlayed: 0,
      cleanSheets: 0,
    };
  }
}
