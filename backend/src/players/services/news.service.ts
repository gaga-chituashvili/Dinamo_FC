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
export class NewsService {
  private readonly logger = new Logger(NewsService.name);
  private cache: { data: any; cachedAt: number } | null = null;
  private readonly CACHE_TTL = 30 * 60 * 1000;

  async getNews() {
    if (this.cache && Date.now() - this.cache.cachedAt < this.CACHE_TTL) {
      return this.cache.data;
    }

    this.logger.log('Scraping news from erovnuliliga.ge');
    const news: { title: string; url: string; image: string | null }[] = [];
    const baseUrl = (
      process.env.BASE_URL ?? 'https://dinamotb.fly.dev'
    ).replace(/\/$/, '');

    for (let page = 0; page <= 2; page++) {
      const url =
        page === 0
          ? 'https://erovnuliliga.ge/ge/news'
          : `https://erovnuliliga.ge/ge/news?page=${page}`;
      const { data: html } = await axios.get(url, { headers: HEADERS });
      const $ = cheerio.load(html);

      $('a.e-article-teaser').each((_, el) => {
        const href = $(el).attr('href') ?? '';
        const title = $(el).find('.article-link span').text().trim();
        const rawImage = $(el).find('img').attr('src') ?? null;
        const image = rawImage
          ? `${baseUrl}/api/players/proxy-image?url=${encodeURIComponent(rawImage)}`
          : null;
        if (!title || !href.includes('dinamo')) return;
        news.push({ title, url: `https://erovnuliliga.ge${href}`, image });
      });
    }

    this.cache = { data: news, cachedAt: Date.now() };
    return news;
  }
}
