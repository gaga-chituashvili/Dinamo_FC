"use client";

import { useState, useEffect } from "react";
import { Scorer, TopScorers } from "../types/standings.types";

const CATEGORIES: { key: keyof TopScorers; label: string; value: string }[] = [
  { key: "goals", label: "ბომბარდირები", value: "გოლი" },
  { key: "assists", label: "ასისტენტები", value: "ასისტი" },
  { key: "appearances", label: "გამოსვლები", value: "თამაში" },
];

const DINAMO_TEAMS = ["დინამო თბილისი", "დინამო თბ"];

function isDinamoPlayer(scorer: Scorer): boolean {
  return DINAMO_TEAMS.some((t) => scorer.team?.includes(t));
}

function LeaderCard({
  scorer,
  valueLabel,
}: {
  scorer: Scorer;
  valueLabel: string;
}) {
  const isDinamo = isDinamoPlayer(scorer);

  return (
    <div
      className={`relative overflow-hidden rounded-xl border ${
        isDinamo
          ? "border-[#a5b4fc]/30 bg-[#a5b4fc]/10"
          : "border-white/6 bg-[#10142a]"
      }`}
      style={{ minHeight: "160px" }}
    >
      {isDinamo && (
        <span className="absolute left-0 top-0 h-full w-1 bg-[#a5b4fc]" />
      )}
      {scorer.photo && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={scorer.photo}
          alt={scorer.name}
          className="absolute right-0 top-0 h-full w-auto object-cover object-top opacity-10"
        />
      )}
      <div className="relative z-10 p-5">
        <span
          className={`text-xs font-bold tracking-widest ${isDinamo ? "text-[#a5b4fc]" : "text-[#6b6f8c]"}`}
        >
          #1
        </span>
        <h3
          className={`mt-1 text-lg font-black italic leading-tight ${isDinamo ? "text-[#a5b4fc]" : "text-white"}`}
        >
          {scorer.name}
        </h3>
        <div className="mt-1 flex items-center gap-1.5">
          {scorer.clubLogo && (
            <div className="flex h-5 w-5 items-center justify-center rounded bg-white">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={scorer.clubLogo}
                alt={scorer.team}
                className="h-4 w-4 object-contain"
              />
            </div>
          )}
          <span className="text-xs text-[#8b8d9e]">{scorer.team}</span>
        </div>
        <p className="mt-4">
          <span
            className={`text-5xl font-black ${isDinamo ? "text-[#a5b4fc]" : "text-white"}`}
          >
            {scorer.value}
          </span>
          <span className="ml-2 text-sm text-[#8b8d9e]">{valueLabel}</span>
        </p>
      </div>
    </div>
  );
}

function RunnerUpRow({
  scorer,
  valueLabel,
  rank,
}: {
  scorer: Scorer;
  valueLabel: string;
  rank: number;
}) {
  const isDinamo = isDinamoPlayer(scorer);

  return (
    <div
      className={`relative flex items-center gap-3 border-b border-white/4 px-5 py-3 last:border-0 ${
        isDinamo ? "bg-[#a5b4fc]/5" : ""
      }`}
    >
      {isDinamo && (
        <span className="absolute inset-y-0 left-0 w-0.5 bg-[#a5b4fc]" />
      )}
      <span
        className={`w-5 text-xs font-bold ${isDinamo ? "text-[#a5b4fc]" : "text-[#4a4f6e]"}`}
      >
        {rank}.
      </span>
      {scorer.clubLogo && (
        <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded bg-white">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={scorer.clubLogo}
            alt={scorer.team}
            className="h-5 w-5 object-contain"
          />
        </div>
      )}
      <span
        className={`flex-1 truncate text-sm font-semibold ${isDinamo ? "text-[#a5b4fc]" : "text-white"}`}
      >
        {scorer.name}
      </span>
      <span
        className={`text-sm font-black ${isDinamo ? "text-[#a5b4fc]" : "text-white"}`}
      >
        {scorer.value}
      </span>
      <span className="w-10 text-right text-xs text-[#6b6f8c]">
        {valueLabel}
      </span>
    </div>
  );
}

function CategoryColumn({
  title,
  scorers,
  valueLabel,
}: {
  title: string;
  scorers: Scorer[];
  valueLabel: string;
}) {
  const leader = scorers[0];
  const rest = scorers.slice(1);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-3">
        <div className="h-px flex-1 bg-white/6" />
        <h3 className="text-xs font-bold tracking-[0.15em] text-[#a5b4fc] uppercase">
          {title}
        </h3>
        <div className="h-px flex-1 bg-white/6" />
      </div>
      {leader && <LeaderCard scorer={leader} valueLabel={valueLabel} />}
      {rest.length > 0 && (
        <div className="overflow-hidden rounded-xl border border-white/6 bg-[#10142a]">
          {rest.map((scorer, i) => (
            <RunnerUpRow
              key={i}
              scorer={scorer}
              valueLabel={valueLabel}
              rank={i + 2}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export function TopScorersSection() {
  const [data, setData] = useState<TopScorers | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/standings/scorers`,
        );
        const json: unknown = await res.json();
        setData(json as TopScorers);
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
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="h-80 animate-pulse rounded-xl border border-white/6 bg-[#10142a]"
          />
        ))}
      </div>
    );

  if (!data) return null;

  return (
    <div>
      <div className="mb-10">
        <p className="mb-2 text-xs font-bold tracking-[0.2em] text-[#a5b4fc]">
          სეზონის სტატისტიკა
        </p>
        <h2 className="text-2xl font-black italic text-white md:text-4xl">
          ტოპ მოთამაშეები
        </h2>
        <div className="mt-3 h-px w-12 bg-[#a5b4fc]" />
      </div>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {CATEGORIES.map(({ key, label, value }) => (
          <CategoryColumn
            key={key}
            title={label}
            scorers={data[key]}
            valueLabel={value}
          />
        ))}
      </div>
    </div>
  );
}
