export interface Fixture {
  date: string;
  home: string;
  away: string;
  team1?: string | null;
  team2?: string | null;
}

export interface FixtureWithParsedDate extends Fixture {
  parsed: Date;
}

export interface CountdownTime {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}
