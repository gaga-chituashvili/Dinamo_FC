import type { Standing } from "@/src/features/home/types/standings.types";

export async function fetchStandings(): Promise<Standing[]> {
  const cached = sessionStorage.getItem("standings");
  if (cached) {
    return JSON.parse(cached) as Standing[];
  }

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/standings`,
  );
  if (!res.ok) throw new Error(`Failed to fetch standings: ${res.status}`);

  const data: Standing[] = await res.json();
  sessionStorage.setItem("standings", JSON.stringify(data));
  return data;
}
