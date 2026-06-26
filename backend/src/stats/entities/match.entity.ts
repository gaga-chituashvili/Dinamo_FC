import { Entity, PrimaryGeneratedColumn, Column, Index } from 'typeorm';

@Entity('matches')
@Index(['homeTeam', 'awayTeam'])
@Index(['season'])
export class Match {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  date: string;

  @Column()
  season: string;

  @Column()
  competition: string;

  @Column()
  homeTeam: string;

  @Column()
  awayTeam: string;

  @Column()
  homeScore: number;

  @Column()
  awayScore: number;

  @Column({ nullable: true })
  venue: string;
}
