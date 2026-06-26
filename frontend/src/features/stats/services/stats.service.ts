import { H2HData, OnThisDayMatch, SeasonProgress } from "../types/stats.types";

const API = process.env.NEXT_PUBLIC_API_URL;

export async function getSeasonProgress(): Promise<SeasonProgress> {
  const res = await fetch(`${API}/api/stats/season-progress`, {
    next: { revalidate: 3600 },
  });
  if (!res.ok) throw new Error("Failed to fetch season progress");
  return res.json();
}

export async function getOpponents(): Promise<string[]> {
  const res = await fetch(`${API}/api/stats/h2h/opponents`, {
    next: { revalidate: 86400 },
  });
  if (!res.ok) throw new Error("Failed to fetch opponents");
  return res.json();
}

export async function getH2H(opponent: string): Promise<H2HData> {
  const res = await fetch(
    `${API}/api/stats/h2h?opponent=${encodeURIComponent(opponent)}`,
    { next: { revalidate: 86400 } },
  );
  if (!res.ok) throw new Error("Failed to fetch H2H");
  return res.json();
}

export async function getOnThisDay(): Promise<OnThisDayMatch[]> {
  const res = await fetch(`${API}/api/stats/on-this-day`, {
    next: { revalidate: 3600 },
  });
  if (!res.ok) throw new Error("Failed to fetch on this day");
  return res.json();
}
