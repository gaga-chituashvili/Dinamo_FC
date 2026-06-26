import { DataSource } from 'typeorm';
import { Match } from '../entities/match.entity';
import { chromium } from 'playwright';

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

const dataSource = new DataSource({
  type: 'postgres',
  url: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
  entities: [Match],
  synchronize: true,
});

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
    const page = await browser.newPage({
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
    });

    await page.goto(url, { waitUntil: 'networkidle', timeout: 30000 });
    await page.waitForSelector('.e-game-teaser.status-finished', {
      timeout: 10000,
    });

    const matches = await page.evaluate(() => {
      const results: {
        home: string;
        away: string;
        score1: string;
        score2: string;
        date: string;
        competition: string;
      }[] = [];

      document
        .querySelectorAll('.e-game-teaser.status-finished')
        .forEach((el) => {
          const home =
            el.querySelector('.grs-1 .grs-name.normal')?.textContent?.trim() ??
            '';
          const away =
            el.querySelector('.grs-2 .grs-name.normal')?.textContent?.trim() ??
            '';
          const score1 =
            el.querySelector('.live-score-1')?.textContent?.trim() ?? '';
          const score2 =
            el.querySelector('.live-score-2')?.textContent?.trim() ?? '';
          const datetime =
            el.querySelector('time')?.getAttribute('datetime') ?? '';
          const competition =
            el.querySelector('.gt-round')?.textContent?.trim() ??
            'ეროვნული ლიგა';

          if (!home || !away || !score1 || !score2) return;
          results.push({
            home,
            away,
            score1,
            score2,
            date: datetime,
            competition,
          });
        });

      return results;
    });

    console.log(`    Found ${matches.length} matches`);

    return matches.map((m) => ({
      date: m.date ? m.date.split('T')[0] : `${year}-01-01`,
      season: year,
      competition: m.competition,
      homeTeam: m.home,
      awayTeam: m.away,
      homeScore: parseInt(m.score1),
      awayScore: parseInt(m.score2),
      venue: '',
    }));
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
