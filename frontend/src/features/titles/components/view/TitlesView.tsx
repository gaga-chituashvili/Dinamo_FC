"use client";

import { useEffect, useState } from "react";
import { TitlesHero } from "../../components/TitlesHero";
import { TitleFeatured } from "../../components/TitleFeatured";
import { TitlesGrid } from "../../components/TitlesGrid";
import { TitlesStats } from "../../components/TitlesStats";
import { fetchTitles } from "../../services/titles.service";
import { TitleCard } from "../../types/titles.types";
import { pickFeaturedTitle } from "../../utils/titles.utils";

export function TitlesView() {
  const [titles, setTitles] = useState<TitleCard[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTitles()
      .then(setTitles)
      .catch((err) => console.error("titles fetch error:", err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0a0e1f]">
        <div className="border-b border-white/6 py-16 text-center">
          <div className="mx-auto h-4 w-40 animate-pulse rounded bg-[#10142a]" />
          <div className="mx-auto mt-3 h-12 w-64 animate-pulse rounded bg-[#10142a]" />
        </div>
        <div className="mx-4 mt-12 h-72 animate-pulse rounded-2xl border border-white/6 bg-[#10142a] sm:mx-6" />
        <div className="mt-8 grid grid-cols-1 gap-4 px-4 sm:grid-cols-2 sm:px-6 lg:grid-cols-3">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div
              key={i}
              className="h-40 animate-pulse rounded-xl border border-white/6 bg-[#10142a]"
            />
          ))}
        </div>
      </div>
    );
  }

  const featured = pickFeaturedTitle(titles);
  const rest = titles.filter((t) => t.title !== featured?.title);

  return (
    <div className="min-h-screen bg-[#0a0e1f] pb-12">
      <TitlesHero />

      {featured && (
        <div className="mt-12">
          <TitleFeatured title={featured} />
        </div>
      )}

      <div className="mt-8">
        <TitlesGrid titles={rest} />
      </div>

      <TitlesStats titles={titles} />
    </div>
  );
}
