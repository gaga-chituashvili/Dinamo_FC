export interface Standing {
  position: number;
  team: string;
  played: number;
  won: number;
  drawn: number;
  lost: number;
  goalsFor: number;
  goalsAgainst: number;
  points: number;
  logo: string | null;
}

export interface Scorer {
  rank: number;
  name: string;
  team: string;
  value: number;
  photo: string | null;
  clubLogo: string | null;
}

export interface TopScorers {
  goals: Scorer[];
  assists: Scorer[];
  appearances: Scorer[];
}
