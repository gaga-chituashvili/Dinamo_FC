import { TitleCard } from "../types/titles.types";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000";

export async function fetchTitles(): Promise<TitleCard[]> {
  const res = await fetch(`${API_URL}/api/players/titles`, {
    next: { revalidate: 3600 },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch titles");
  }

  return res.json();
}
