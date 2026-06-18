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

export type ScorerCategory = keyof TopScorers;

export const CATEGORY_LABELS: Record<ScorerCategory, string> = {
  goals: "გოლები",
  assists: "პასები",
  appearances: "თამაშები",
};

export const VALUE_LABELS: Record<ScorerCategory, string> = {
  goals: "გოლი",
  assists: "პასი",
  appearances: "თამაში",
};
