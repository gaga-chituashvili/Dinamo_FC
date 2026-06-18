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
    this.logger.log('Fetching history from fcdinamo.ge');
    const { data: html } = await axios.get('https://fcdinamo.ge/club/history', {
      headers: HEADERS,
    });
    const $ = cheerio.load(html);

    // Next.js ჩაშენებს data-ს ამ script tag-ში
    const nextDataRaw = $('#__NEXT_DATA__').html();
    if (nextDataRaw) {
      this.logger.log('Found __NEXT_DATA__, parsing...');
      const nextData = JSON.parse(nextDataRaw);
      this.logger.log(
        '__NEXT_DATA__ keys: ' +
          JSON.stringify(Object.keys(nextData?.props?.pageProps || {})),
      );
      // დავბეჭდოთ სრული სტრუქტურა რომ ვნახოთ
      this.logger.log(
        'Full pageProps: ' +
          JSON.stringify(nextData?.props?.pageProps).slice(0, 2000),
      );
    } else {
      this.logger.warn('No __NEXT_DATA__ found');
      this.logger.log('HTML snippet: ' + html.slice(0, 1000));
    }

    return { debug: true };
  }
}
