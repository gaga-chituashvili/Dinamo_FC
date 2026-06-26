import { StatsView } from "@/src/features/stats/components/view/StatsView";
import {
  getSeasonProgress,
  getOpponents,
  getOnThisDay,
} from "@/src/features/stats/services/stats.service";

export const revalidate = 3600;

export default async function StatsPage() {
  const [seasonProgress, opponents, onThisDay] = await Promise.all([
    getSeasonProgress(),
    getOpponents(),
    getOnThisDay(),
  ]);

  return (
    <StatsView
      seasonProgress={seasonProgress}
      opponents={opponents}
      onThisDay={onThisDay}
    />
  );
}
