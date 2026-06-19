import { Injectable, Logger } from '@nestjs/common';
import { chromium } from 'playwright';

export interface HistoryEra {
  title: string;
  image: string | null;
  text: string;
}

@Injectable()
export class HistoryService {
  private readonly logger = new Logger(HistoryService.name);
  private historyCache: { data: HistoryEra[]; cachedAt: number } | null = null;
  private readonly HISTORY_CACHE_TTL = 24 * 60 * 60 * 1000;

  async getHistory(): Promise<HistoryEra[]> {
    if (
      this.historyCache &&
      Date.now() - this.historyCache.cachedAt < this.HISTORY_CACHE_TTL
    ) {
      return this.historyCache.data;
    }

    this.logger.log('Scraping club history from fcdinamo.ge');

    const browser = await chromium.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });

    try {
      const page = await browser.newPage({
        userAgent:
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36',
        viewport: { width: 1920, height: 1080 },
        deviceScaleFactor: 2,
      });

      await page.goto('https://fcdinamo.ge/club/history', {
        waitUntil: 'networkidle',
        timeout: 30000,
      });

      await page.waitForSelector('div.mb-16.relative', { timeout: 15000 });

      await page.evaluate(() => {
        const buttons = Array.from(document.querySelectorAll('button')).filter(
          (btn) => btn.textContent?.trim() === 'ვრცლად',
        );
        buttons.forEach((btn) => btn.click());
      });

      await page.waitForTimeout(1000);

      const eras = await page.evaluate(() => {
        function getBestImageSrc(img: HTMLImageElement | null): string | null {
          if (!img) return null;

          const srcset = img.getAttribute('srcset');
          if (srcset) {
            const candidates = srcset
              .split(',')
              .map((entry) => entry.trim().split(' '))
              .map(([url, width]) => ({
                url,
                width: parseInt(width?.replace('w', '') ?? '0', 10),
              }))
              .filter((c) => c.url);

            if (candidates.length > 0) {
              return candidates.sort((a, b) => b.width - a.width)[0].url;
            }
          }

          return img.getAttribute('src');
        }

        const blocks = Array.from(
          document.querySelectorAll('div.mb-16.relative'),
        );

        return blocks.map((block) => {
          const title = block.querySelector('h2')?.textContent?.trim() ?? '';
          const image = getBestImageSrc(block.querySelector('img'));
          const text =
            block
              .querySelector('p.text-white.text-opacity-90')
              ?.textContent?.trim() ?? '';
          return { title, image, text };
        });
      });

      const filtered = eras.filter((e) => e.title && e.text);

      this.historyCache = { data: filtered, cachedAt: Date.now() };
      return filtered;
    } finally {
      await browser.close();
    }
  }
}
