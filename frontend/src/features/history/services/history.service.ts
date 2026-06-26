import { HistoryEra } from "../types/history.types";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000";

export async function fetchHistory(): Promise<HistoryEra[]> {
  const res = await fetch(`${API_URL}/api/history`, {
    next: { revalidate: 3600 },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch history");
  }

  return res.json();
}
