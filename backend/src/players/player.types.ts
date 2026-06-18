export interface PlayerSummary {
  id: string;
  number: string;
  name: string;
  position: string;
  nationality: string;
  imageUrl: string | null;
  flashscoreId: string | null;
  profileUrl: string | null;
}

export interface PlayerStats {
  appearances: number;
  goals: number;
  assists: number;
  yellowCards: number;
  redCards: number;
  minutesPlayed: number;
  cleanSheets: number;
  rating?: string | null;
}

export interface CareerEntry {
  season: string;
  team: string;
  competition: string;
  country: string;
  appearances: number;
  goals: number;
  assists: number | null;
  yellowCards: number;
  redCards: number;
  rating: string | null;
  teamLogo: string;
}

export interface LastMatch {
  date: string;
  home: string;
  away: string;
  homeScore: number;
  awayScore: number;
  result: string;
  minutesPlayed: string | null;
  goals: number;
  assists: number;
  yellowCards: number;
  competition: string;
  url: string;
}

export interface Transfer {
  date: string;
  from: string;
  to: string;
  type: string;
  fee: string;
}

export interface PlayerDetail extends PlayerSummary {
  age: string;
  dateOfBirth: string;
  height: string;
  preferredFoot: string;
  contractUntil: string;
  marketValue: string | null;
  currentSeason: PlayerStats;
  career: CareerEntry[];
  lastMatches: LastMatch[];
  transfers: Transfer[];
}
