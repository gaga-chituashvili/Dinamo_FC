import { TopScorers } from "../types/scorers.types";

export async function fetchTopScorers(): Promise<TopScorers> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/players/scorers`,
  );
  if (!res.ok) throw new Error(`Failed to fetch scorers: ${res.status}`);
  return res.json();
}
