export interface Player {
  id: string;
  number: string;
  name: string;
  position: string;
  nationality: string;
  age: number;
  imageUrl: string;
  flashscoreId: string | null;
}

export type PositionGroup =
  | "მეკარე"
  | "მცველი"
  | "ნახევარმცველი"
  | "თავდამსხმელი";

export const POSITION_LABELS: Record<string, string> = {
  მეკარე: "მეკარეები",
  მცველი: "მცველები",
  ნახევარმცველი: "ნახევარმცველები",
  თავდამსხმელი: "თავდამსხმელები",
};

export const POSITION_ORDER = [
  "მეკარე",
  "მცველი",
  "ნახევარმცველი",
  "თავდამსხმელი",
];
