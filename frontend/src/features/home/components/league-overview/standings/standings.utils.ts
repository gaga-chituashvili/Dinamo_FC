import type { Standing } from "@/src/features/home/types/standings.types";

// Shared grid template — used by both the header row and each data row
// so columns always line up.
export const STANDINGS_GRID_COLS = "4rem 1fr 3rem 3rem 3rem 3rem 3.5rem 4rem";

export function getInitials(name: string): string {
  return name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export function findDinamoPosition(standings: Standing[]): number | null {
  const dinamo = standings.find(
    (r) => r.team.includes("დინამო თბილისი") || r.team === "დინამო თბ",
  );
  return dinamo ? dinamo.position : null;
}
