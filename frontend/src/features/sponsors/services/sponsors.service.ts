import type { Sponsor } from "../types/sponsors.types";

export async function fetchSponsors(): Promise<Sponsor[]> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/sponsors`);
  if (!res.ok) throw new Error(`Failed to fetch sponsors: ${res.status}`);
  return res.json();
}
