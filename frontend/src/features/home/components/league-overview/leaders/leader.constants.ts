import type { SeasonLeader } from "./useSeasonLeaders";

export const LEADER_LABELS: Record<
  SeasonLeader["category"],
  { category: string; value: string }
> = {
  goals: { category: "ბომბარდირი", value: "გოლი" },
  assists: { category: "ასისტენტი", value: "ასისტი" },
};
