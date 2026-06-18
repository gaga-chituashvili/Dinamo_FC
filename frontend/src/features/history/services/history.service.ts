import { HistoryData } from "../types/history.types";

export async function fetchHistory(): Promise<HistoryData> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/players/history`,
  );
  if (!res.ok) throw new Error(`Failed to fetch history: ${res.status}`);
  return res.json();
}
