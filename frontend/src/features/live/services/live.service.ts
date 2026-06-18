import { LiveResponse } from "../types/live.types";

export async function fetchLive(): Promise<LiveResponse> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/players/live`,
  );
  if (!res.ok) throw new Error(`Failed to fetch live: ${res.status}`);
  return res.json();
}
