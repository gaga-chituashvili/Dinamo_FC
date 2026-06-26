import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Match } from '../entities/match.entity';

export interface OnThisDayMatch {
  date: string;
  season: string;
  competition: string;
  home: string;
  away: string;
  score: string;
  winner: 'dinamo' | 'opponent' | 'draw';
  yearsAgo: number;
}

const DINAMO = 'დინამო თბ';

@Injectable()
export class OnThisDayScraper {
  constructor(
    @InjectRepository(Match)
    private readonly matchRepo: Repository<Match>,
  ) {}

  async getOnThisDay(): Promise<OnThisDayMatch[]> {
    const today = new Date();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    const currentYear = today.getFullYear();

    const matches = await this.matchRepo
      .createQueryBuilder('m')
      .where("TO_CHAR(m.date::date, 'MM-DD') = :monthDay", {
        monthDay: `${month}-${day}`,
      })
      .orderBy('m.date', 'DESC')
      .getMany();

    return matches.map((m) => {
      const dinamoIsHome = m.homeTeam === DINAMO;
      const dinamoGoals = dinamoIsHome ? m.homeScore : m.awayScore;
      const oppGoals = dinamoIsHome ? m.awayScore : m.homeScore;

      let winner: 'dinamo' | 'opponent' | 'draw';
      if (dinamoGoals > oppGoals) winner = 'dinamo';
      else if (dinamoGoals < oppGoals) winner = 'opponent';
      else winner = 'draw';

      return {
        date: m.date,
        season: m.season,
        competition: m.competition,
        home: m.homeTeam,
        away: m.awayTeam,
        score: `${m.homeScore}:${m.awayScore}`,
        winner,
        yearsAgo: currentYear - parseInt(m.season),
      };
    });
  }
}
