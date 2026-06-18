"use client";

import { useState, useEffect } from "react";
import { Scorer } from "../types/standings.types";

interface ScorerWithCategory extends Scorer {
  category: string;
}

function mapWithCategory(
  list: unknown[],
  category: string,
): ScorerWithCategory[] {
  return (list as Scorer[]).map((s) => ({ ...s, category }));
}

export function TopScorers() {
  const [scorers, setScorers] = useState<ScorerWithCategory[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/players/scorers`,
        );
        const json: unknown = await res.json();
        const data = json as {
          goals?: unknown[];
          assists?: unknown[];
          appearances?: unknown[];
        };
        const goals = mapWithCategory(data?.goals ?? [], "გოლი");
        const assists = mapWithCategory(data?.assists ?? [], "პასი");
        const appearances = mapWithCategory(data?.appearances ?? [], "თამაში");
        setScorers([...goals, ...assists, ...appearances]);
      } catch {
        // silently fail
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  if (loading)
    return (
      <div className="h-64 animate-pulse rounded-xl border border-[#1e1e1e] bg-[#111]" />
    );

  return (
    <div className="overflow-hidden rounded-xl border border-[#1e1e1e]">
      {/* Header */}
      <div className="border-b border-[#1a1a1a] bg-[#0e0e0e] px-6 py-4">
        <h2 className="text-xs font-bold tracking-[0.2em] text-[#16a34a] uppercase">
          ბომბარდირები
        </h2>
      </div>

      <div className="divide-y divide-[#1a1a1a]">
        {scorers.map((scorer, i) => (
          <div
            key={i}
            className="flex items-center gap-4 bg-[#111] px-6 py-4 transition-colors hover:bg-[#161616]"
          >
            <span className="w-5 text-xs font-bold text-[#444]">{i + 1}</span>

            <div className="relative h-11 w-11 shrink-0">
              {scorer.photo ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={scorer.photo}
                  alt={scorer.name}
                  className="h-11 w-11 rounded-lg object-cover object-top bg-[#1a1a1a]"
                />
              ) : (
                <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-[#1a1a1a] text-xs font-black text-[#555]">
                  {scorer.name.slice(0, 2).toUpperCase()}
                </div>
              )}
            </div>

            <div className="min-w-0 flex-1 overflow-hidden">
              <p className="truncate text-sm font-bold text-white">
                {scorer.name}
              </p>
              <div className="mt-0.5 flex items-center gap-1.5">
                {scorer.clubLogo && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={scorer.clubLogo}
                    alt={scorer.team}
                    className="h-4 w-4 object-contain"
                  />
                )}
                <span className="text-xs text-[#555]">{scorer.team}</span>
              </div>
            </div>

            <div className="flex flex-col items-end">
              <span className="text-lg font-black text-[#16a34a]">
                {scorer.value}
              </span>
              <span className="text-xs text-[#444]">{scorer.category}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
