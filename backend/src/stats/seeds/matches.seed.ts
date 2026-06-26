import { DataSource } from 'typeorm';
import { Match } from '../entities/match.entity';
import * as fs from 'fs';
import * as path from 'path';
import { parse } from 'csv-parse/sync';

const dataSource = new DataSource({
  type: 'postgres',
  url: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
  entities: [Match],
  synchronize: true,
});

async function seed() {
  await dataSource.initialize();
  const repo = dataSource.getRepository(Match);

  const csvPath = path.join(process.cwd(), 'data/dinamo-matches.csv');
  const content = fs.readFileSync(csvPath, 'utf-8');

  const records = parse(content, {
    columns: true,
    skip_empty_lines: true,
    trim: true,
  }) as {
    date: string;
    season: string;
    competition: string;
    home_team: string;
    away_team: string;
    home_score: string;
    away_score: string;
    venue: string;
  }[];

  const matches = records.map((r) =>
    repo.create({
      date: r.date,
      season: r.season,
      competition: r.competition,
      homeTeam: r.home_team,
      awayTeam: r.away_team,
      homeScore: parseInt(r.home_score),
      awayScore: parseInt(r.away_score),
      venue: r.venue ?? '',
    }),
  );

  await repo.clear();
  await repo.save(matches);
  console.log(`Seeded ${matches.length} matches`);
  await dataSource.destroy();
}

seed().catch(console.error);
