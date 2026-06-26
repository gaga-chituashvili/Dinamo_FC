import type { Fixture } from "@/src/features/home/types/next-match.types";

export async function fetchFixtures(): Promise<Fixture[]> {
  const cached = sessionStorage.getItem("fixtures");
  if (cached) {
    return JSON.parse(cached) as Fixture[];
  }

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/fixtures`,
  );
  if (!res.ok) throw new Error(`Failed to fetch fixtures: ${res.status}`);

  const fixtures: Fixture[] = await res.json();
  sessionStorage.setItem("fixtures", JSON.stringify(fixtures));
  return fixtures;
}
