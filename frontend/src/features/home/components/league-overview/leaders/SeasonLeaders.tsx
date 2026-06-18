"use client";

import { useSeasonLeaders } from "./useSeasonLeaders";
import { LeaderCard } from "./LeaderCard";

export function SeasonLeaders() {
  const leaders = useSeasonLeaders();

  if (!leaders) {
    return (
      <div className="flex flex-col gap-4">
        {[1, 2].map((i) => (
          <div
            key={i}
            className="h-44 animate-pulse rounded-xl border border-white/6 bg-[#10142a]"
          />
        ))}
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      {leaders.map((leader) => (
        <LeaderCard key={leader.category} leader={leader} />
      ))}
    </div>
  );
}
