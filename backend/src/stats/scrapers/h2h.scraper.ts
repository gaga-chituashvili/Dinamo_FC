import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, ILike } from 'typeorm';
import { Match } from '../entities/match.entity';

export interface H2HResult {
  date: string;
  season: string;
  competition: string;
  home: string;
  away: string;
  score: string;
  winner: 'dinamo' | 'opponent' | 'draw';
}

export interface H2HData {
  opponent: string;
  wins: number;
  draws: number;
  losses: number;
  goalsFor: number;
  goalsAgainst: number;
  recentForm: H2HResult[];
  totalGames: number;
  winPercent: number;
}

const DINAMO = 'დინამო თბ';

@Injectable()
export class H2HScraper {
  constructor(
    @InjectRepository(Match)
    private readonly matchRepo: Repository<Match>,
  ) {}

  async getOpponents(): Promise<string[]> {
    const asHome = await this.matchRepo
      .createQueryBuilder('m')
      .select('DISTINCT m.awayTeam', 'team')
      .where('m.homeTeam = :dinamo', { dinamo: DINAMO })
      .getRawMany<{ team: string }>();

    const asAway = await this.matchRepo
      .createQueryBuilder('m')
      .select('DISTINCT m.homeTeam', 'team')
      .where('m.awayTeam = :dinamo', { dinamo: DINAMO })
      .getRawMany<{ team: string }>();

    const all = [...asHome, ...asAway].map((r) => r.team);
    return [...new Set(all)].sort();
  }

  async getH2H(opponentName: string): Promise<H2HData> {
    const matches = await this.matchRepo.find({
      where: [
        { homeTeam: DINAMO, awayTeam: ILike(`%${opponentName}%`) },
        { awayTeam: DINAMO, homeTeam: ILike(`%${opponentName}%`) },
      ],
      order: { date: 'DESC' },
    });

    let wins = 0,
      draws = 0,
      losses = 0,
      goalsFor = 0,
      goalsAgainst = 0;
    const recentForm: H2HResult[] = [];

    for (const m of matches) {
      const dinamoIsHome = m.homeTeam === DINAMO;
      const dinamoGoals = dinamoIsHome ? m.homeScore : m.awayScore;
      const oppGoals = dinamoIsHome ? m.awayScore : m.homeScore;

      goalsFor += dinamoGoals;
      goalsAgainst += oppGoals;

      let winner: 'dinamo' | 'opponent' | 'draw';
      if (dinamoGoals > oppGoals) {
        wins++;
        winner = 'dinamo';
      } else if (dinamoGoals < oppGoals) {
        losses++;
        winner = 'opponent';
      } else {
        draws++;
        winner = 'draw';
      }

      recentForm.push({
        date: m.date,
        season: m.season,
        competition: m.competition,
        home: m.homeTeam,
        away: m.awayTeam,
        score: `${m.homeScore}:${m.awayScore}`,
        winner,
      });
    }

    const totalGames = wins + draws + losses;
    const winPercent =
      totalGames > 0 ? Math.round((wins / totalGames) * 100) : 0;

    return {
      opponent: opponentName,
      wins,
      draws,
      losses,
      goalsFor,
      goalsAgainst,
      recentForm: recentForm.slice(0, 5),
      totalGames,
      winPercent,
    };
  }
}
