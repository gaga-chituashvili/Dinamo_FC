import { Injectable, Logger } from '@nestjs/common';
import { chromium } from 'playwright';
import * as fs from 'fs/promises';
import * as path from 'path';

export interface TitleCard {
  title: string;
  image: string | null;
  details: string[];
}

@Injectable()
export class TitlesService {
  private readonly logger = new Logger(TitlesService.name);
  private readonly TITLES_CACHE_TTL = 24 * 60 * 60 * 1000;
  private readonly CACHE_FILE = path.join(
    process.cwd(),
    'cache',
    'titles.json',
  );
  private memCache: { data: TitleCard[]; cachedAt: number } | null = null;

  async getTitles(): Promise<TitleCard[]> {
    if (
      this.memCache &&
      Date.now() - this.memCache.cachedAt < this.TITLES_CACHE_TTL
    ) {
      return this.memCache.data;
    }

    const diskCache = await this.readDiskCache();
    if (diskCache && Date.now() - diskCache.cachedAt < this.TITLES_CACHE_TTL) {
      this.memCache = diskCache;
      return diskCache.data;
    }

    this.logger.log('Scraping titles from fcdinamo.ge');
    const filtered = await this.scrape();

    const entry = { data: filtered, cachedAt: Date.now() };
    this.memCache = entry;
    await this.writeDiskCache(entry);

    return filtered;
  }

  private async readDiskCache(): Promise<{
    data: TitleCard[];
    cachedAt: number;
  } | null> {
    try {
      const raw = await fs.readFile(this.CACHE_FILE, 'utf-8');
      const parsed: unknown = JSON.parse(raw);

      if (
        parsed &&
        typeof parsed === 'object' &&
        'data' in parsed &&
        'cachedAt' in parsed
      ) {
        return parsed as { data: TitleCard[]; cachedAt: number };
      }

      return null;
    } catch {
      return null;
    }
  }
  private async writeDiskCache(entry: { data: TitleCard[]; cachedAt: number }) {
    try {
      await fs.mkdir(path.dirname(this.CACHE_FILE), { recursive: true });
      await fs.writeFile(this.CACHE_FILE, JSON.stringify(entry));
    } catch (err) {
      this.logger.warn(`Failed to write disk cache: ${err}`);
    }
  }

  private async scrape(): Promise<TitleCard[]> {
    const browser = await chromium.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });

    try {
      const page = await browser.newPage({
        userAgent:
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36',
      });

      await page.goto('https://fcdinamo.ge/club/titles', {
        waitUntil: 'networkidle',
        timeout: 30000,
      });

      await page.waitForSelector('div.rounded-lg.border.bg-card', {
        timeout: 15000,
      });

      const titles = await page.evaluate(() => {
        const cards = Array.from(
          document.querySelectorAll('div.rounded-lg.border.bg-card'),
        );

        return cards.map((card) => {
          const image = card.querySelector('img')?.getAttribute('src') ?? null;
          const title = card.querySelector('h3')?.textContent?.trim() ?? '';

          const details = Array.from(card.querySelectorAll('.ql-editor p'))
            .map((p) => p.textContent?.trim() ?? '')
            .filter((line) => line.length > 0);

          return { title, image, details };
        });
      });

      return titles.filter((t) => t.title);
    } finally {
      await browser.close();
    }
  }
}
