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
export class HistoryService {
  private readonly logger = new Logger(HistoryService.name);

  async getHistory() {
    this.logger.log('Scraping history from fcdinamo.ge');
    const { data: html } = await axios.get('https://fcdinamo.ge/club/history', {
      headers: HEADERS,
    });
    const $ = cheerio.load(html);

    const paragraphs: string[] = [];
    const images: string[] = [];

    $('.markup p').each((_, el) => {
      const text = $(el).text().trim();
      if (text) paragraphs.push(text);
    });

    $('.markup img').each((_, el) => {
      const src = $(el).attr('src');
      if (src) images.push(`https://fcdinamo.ge${src}`);
    });

    return { paragraphs, images };
  }
}
