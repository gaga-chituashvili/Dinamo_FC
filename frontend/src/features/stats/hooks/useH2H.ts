"use client";

import { useState, useCallback } from "react";
import { H2HData } from "../types/stats.types";

const API = process.env.NEXT_PUBLIC_API_URL;

export function useH2H() {
  const [data, setData] = useState<H2HData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetch = useCallback(async (opponent: string) => {
    setLoading(true);
    setError(null);
    try {
      const res = await window.fetch(
        `${API}/api/stats/h2h?opponent=${encodeURIComponent(opponent)}`,
      );
      if (!res.ok) throw new Error("Failed");
      setData(await res.json());
    } catch {
      setError("Failed to load data");
    } finally {
      setLoading(false);
    }
  }, []);

  return { data, loading, error, fetch };
}
