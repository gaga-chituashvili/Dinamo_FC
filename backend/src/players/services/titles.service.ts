import { Injectable, Logger } from '@nestjs/common';
import { chromium } from 'playwright';

export interface TitleCard {
  title: string;
  image: string | null;
  details: string[];
}

@Injectable()
export class TitlesService {
  private readonly logger = new Logger(TitlesService.name);
  private titlesCache: { data: TitleCard[]; cachedAt: number } | null = null;
  private readonly TITLES_CACHE_TTL = 24 * 60 * 60 * 1000;

  async getTitles(): Promise<TitleCard[]> {
    if (
      this.titlesCache &&
      Date.now() - this.titlesCache.cachedAt < this.TITLES_CACHE_TTL
    ) {
      return this.titlesCache.data;
    }

    this.logger.log('Scraping titles from fcdinamo.ge');

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

      const filtered = titles.filter((t) => t.title);

      this.titlesCache = { data: filtered, cachedAt: Date.now() };
      return filtered;
    } finally {
      await browser.close();
    }
  }
}
