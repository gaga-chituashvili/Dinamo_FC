"use client";

import { useEffect, useState } from "react";
import { Wrapper } from "@/src/components/shared/wrapper";
import { HistoryHero } from "../HistoryHero";
import { HistoryCard } from "../HistoryCard";
import { fetchHistory } from "../../services/history.service";
import { HistoryEra } from "../../types/history.types";

export function HistoryView() {
  const [eras, setEras] = useState<HistoryEra[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchHistory()
      .then(setEras)
      .catch((err) => console.error("history fetch error:", err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0a0e1f]">
        <div className="border-b border-white/6 py-16 text-center">
          <div className="mx-auto h-4 w-40 animate-pulse rounded bg-[#10142a]" />
          <div className="mx-auto mt-3 h-12 w-64 animate-pulse rounded bg-[#10142a]" />
        </div>
        <Wrapper className="py-12">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="mb-12 h-96 animate-pulse rounded-2xl border border-white/6 bg-[#10142a]"
            />
          ))}
        </Wrapper>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0e1f]">
      <HistoryHero />

      <Wrapper className="divide-y divide-white/6">
        {eras.map((era, index) => (
          <HistoryCard key={era.title} era={era} index={index} />
        ))}
      </Wrapper>
    </div>
  );
}
