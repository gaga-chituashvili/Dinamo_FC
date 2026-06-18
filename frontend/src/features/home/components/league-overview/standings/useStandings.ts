"use client";

import { useEffect, useState } from "react";
import { fetchStandings } from "@/src/features/home/services/standings.service";
import type { Standing } from "@/src/features/home/types/standings.types";
import { findDinamoPosition } from "./standings.utils";

interface UseStandingsResult {
  standings: Standing[];
  dinamoPosition: number | null;
  loading: boolean;
}

export function useStandings(limit?: number): UseStandingsResult {
  const [standings, setStandings] = useState<Standing[]>([]);
  const [dinamoPosition, setDinamoPosition] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const data = await fetchStandings();
        setStandings(limit ? data.slice(0, limit) : data);
        setDinamoPosition(findDinamoPosition(data));
      } catch {
        // silently fail — table just stays empty
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [limit]);

  return { standings, dinamoPosition, loading };
}
