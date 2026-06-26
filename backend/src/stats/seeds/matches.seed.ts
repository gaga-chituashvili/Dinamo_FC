import { DataSource } from 'typeorm';
import { Match } from '../entities/match.entity';
import { chromium } from 'playwright';
import axios from 'axios';

const HEADERS = {
  'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
  'Accept-Language': 'ka-GE,ka;q=0.9',
};

const SEASONS: { year: string; id: string }[] = [
  { year: '2017', id: '249' },
  { year: '2018', id: '255' },
  { year: '2019', id: '357' },
  { year: '2020', id: '391' },
  { year: '2021', id: '410' },
  { year: '2022', id: '437' },
  { year: '2023', id: '459' },
  { year: '2024', id: '492' },
  { year: '2025', id: '524' },
];

const CONCURRENCY = 5;

const dataSource = new DataSource({
  type: 'postgres',
  url: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
  entities: [Match],
  synchronize: true,
});

async function fetchMatchDate(gameUrl: string): Promise<string | null> {
  try {
    const { data: html } = await axios.get<string>(
      `https://erovnuliliga.ge${gameUrl}`,
      { headers: HEADERS, timeout: 10000 },
    );
    const match = html.match(/datetime="(\d{4}-\d{2}-\d{2}T[^"]+)"/);
    return match ? match[1].split('T')[0] : null;
  } catch {
    return null;
  }
}

async function runWithConcurrency<T>(
  tasks: (() => Promise<T>)[],
  concurrency: number,
): Promise<T[]> {
  const results: T[] = [];
  let index = 0;

  async function worker() {
    while (index < tasks.length) {
      const i = index++;
      results[i] = await tasks[i]();
    }
  }

  await Promise.all(Array.from({ length: concurrency }, worker));
  return results;
}

async function scrapeSeasonMatches(
  year: string,
  seasonId: string,
): Promise<Omit<Match, 'id'>[]> {
  const url = `https://erovnuliliga.ge/ge/club/dinamo-tb/results?season=${seasonId}`;
  console.log(`  Scraping ${year} (season=${seasonId})...`);

  const browser = await chromium.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  try {
    const page = await browser.newPage({ userAgent: HEADERS['User-Agent'] });
    await page.goto(url, { waitUntil: 'networkidle', timeout: 30000 });
    await page.waitForSelector('.e-game-teaser.status-finished', {
      timeout: 10000,
    });

    const rawMatches = await page.evaluate(() => {
      return [
        ...document.querySelectorAll('.e-game-teaser.status-finished'),
      ].map((el) => ({
        href: el.querySelector('a')?.getAttribute('href') ?? '',
        home:
          el.querySelector('.grs-1 .grs-name.normal')?.textContent?.trim() ??
          '',
        away:
          el.querySelector('.grs-2 .grs-name.normal')?.textContent?.trim() ??
          '',
        score1: el.querySelector('.live-score-1')?.textContent?.trim() ?? '',
        score2: el.querySelector('.live-score-2')?.textContent?.trim() ?? '',
        competition:
          el.querySelector('.gt-round')?.textContent?.trim() ?? 'ეროვნული ლიგა',
      }));
    });

    console.log(`    Found ${rawMatches.length} matches, fetching dates...`);

    // fetch dates in parallel with concurrency limit
    const dateTasks = rawMatches.map((m) => () => fetchMatchDate(m.href));
    const dates = await runWithConcurrency(dateTasks, CONCURRENCY);

    return rawMatches
      .map((m, i) => ({
        date: dates[i] ?? `${year}-01-01`,
        season: year,
        competition: m.competition,
        homeTeam: m.home,
        awayTeam: m.away,
        homeScore: parseInt(m.score1),
        awayScore: parseInt(m.score2),
        venue: '',
      }))
      .filter((m) => m.homeTeam && m.awayTeam && !isNaN(m.homeScore));
  } finally {
    await browser.close();
  }
}

async function seed() {
  await dataSource.initialize();
  const repo = dataSource.getRepository(Match);

  await repo.clear();
  console.log('Cleared existing matches\n');

  let total = 0;

  for (const season of SEASONS) {
    try {
      const matches = await scrapeSeasonMatches(season.year, season.id);
      if (matches.length > 0) {
        await repo.save(matches.map((m) => repo.create(m)));
        total += matches.length;
        console.log(`    Saved ${matches.length} matches for ${season.year}`);
      }
      await new Promise((r) => setTimeout(r, 1000));
    } catch (err) {
      console.error(
        `  Error scraping ${season.year}:`,
        err instanceof Error ? err.message : err,
      );
    }
  }

  console.log(`\nDone! Seeded ${total} matches total`);
  await dataSource.destroy();
}

seed().catch(console.error);
