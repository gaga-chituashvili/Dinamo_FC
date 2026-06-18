import type {
  Fixture,
  FixtureWithParsedDate,
} from "@/src/features/home/types/next-match.types";

export function parseFixtureDate(dateStr: string): Date {
  const match = dateStr.match(/(\d+)\.(\d+)[\.,]\s*(\d+):(\d+)/);
  if (!match) return new Date(0);
  const [, day, month, hours, minutes] = match;
  const year = new Date().getFullYear();
  return new Date(
    year,
    parseInt(month) - 1,
    parseInt(day),
    parseInt(hours),
    parseInt(minutes),
  );
}

export function getNextFixture(
  fixtures: Fixture[],
): FixtureWithParsedDate | null {
  const now = Date.now();
  const upcoming = fixtures
    .map((f) => ({ ...f, parsed: parseFixtureDate(f.date) }))
    .filter((f) => f.parsed.getTime() > now)
    .sort((a, b) => a.parsed.getTime() - b.parsed.getTime());

  return upcoming[0] ?? null;
}

export function getTeamInitials(name: string): string {
  return name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

export function isDinamo(name: string): boolean {
  return (
    name.toLowerCase().includes("dinamo") || name.includes("დინამო თბილისი")
  );
}
