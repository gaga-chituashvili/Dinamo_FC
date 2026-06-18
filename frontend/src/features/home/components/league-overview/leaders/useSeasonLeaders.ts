"use client";

import { useEffect, useState } from "react";
import { fetchTopScorers } from "@/src/features/home/services/scorers.service";
import type { Scorer } from "@/src/features/home/types/scorers.types";

export interface SeasonLeader {
  category: "goals" | "assists";
  player: Scorer;
}

export function useSeasonLeaders(): SeasonLeader[] | null {
  const [leaders, setLeaders] = useState<SeasonLeader[] | null>(null);

  useEffect(() => {
    let cancelled = false;

    fetchTopScorers()
      .then((data) => {
        if (cancelled) return;
        const result: SeasonLeader[] = [];
        if (data.goals[0])
          result.push({ category: "goals", player: data.goals[0] });
        if (data.assists[0])
          result.push({ category: "assists", player: data.assists[0] });
        setLeaders(result);
      })
      .catch((err) => {
        console.error("scorers fetch error:", err);
        if (!cancelled) setLeaders([]);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return leaders;
}
