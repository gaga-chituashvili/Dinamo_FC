export interface SeasonProgress {
  totalMatchdays: number;
  currentMatchday: number;
  dinamo: TeamProgress;
  second: TeamProgress;
  pointsNeeded: number;
  remainingMatches: number;
  maxPossiblePoints: number;
  isFactualLeader: boolean;
}

export interface TeamProgress {
  position: number;
  team: string;
  played: number;
  points: number;
  logo: string | null;
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

export interface H2HResult {
  date: string;
  season: string;
  competition: string;
  home: string;
  away: string;
  score: string;
  winner: "dinamo" | "opponent" | "draw";
}

export interface OnThisDayMatch {
  date: string;
  season: string;
  competition: string;
  home: string;
  away: string;
  score: string;
  winner: "dinamo" | "opponent" | "draw";
  yearsAgo: number;
}
