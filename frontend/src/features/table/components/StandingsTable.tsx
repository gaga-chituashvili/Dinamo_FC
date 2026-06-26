"use client";

import { useState, useEffect } from "react";
import { Standing } from "../types/standings.types";

export function StandingsTable() {
  const [standings, setStandings] = useState<Standing[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/standings`,
        );
        const json = await res.json();
        const data: Standing[] = Array.isArray(json) ? json : [];
        setStandings(data);
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
      <div className="h-96 animate-pulse rounded-xl border border-white/6 bg-[#10142a]" />
    );

  return (
    <div className="overflow-hidden rounded-xl border border-white/6">
      <div
        className="hidden border-b border-white/6 bg-[#10142a] px-6 py-4 text-xs font-bold tracking-[0.15em] text-[#6b6f8c] md:grid"
        style={{
          gridTemplateColumns:
            "4rem 1fr 3.5rem 3.5rem 3.5rem 3.5rem 4rem 4rem 4.5rem",
        }}
      >
        <span>პოზ</span>
        <span>გუნდი</span>
        <span className="text-center">თ</span>
        <span className="text-center">მ</span>
        <span className="text-center">ფ</span>
        <span className="text-center">წ</span>
        <span className="text-center">გ/შ</span>
        <span className="text-center">სხ</span>
        <span className="text-right">ქ</span>
      </div>

      {standings.map((row) => {
        const isDinamo =
          row.team.includes("დინამო თბ") || row.team.includes("დინამო თბილისი");
        const gd = row.goalsFor - row.goalsAgainst;
        const gdStr = gd > 0 ? `+${gd}` : `${gd}`;

        return (
          <div
            key={row.position}
            className={`relative border-t border-white/6 transition-colors duration-150 ${
              isDinamo ? "bg-[#a5b4fc]/10" : "hover:bg-white/2"
            }`}
          >
            {isDinamo && (
              <span className="absolute inset-y-0 left-0 w-1 bg-[#a5b4fc]" />
            )}

            {/* Mobile */}
            <div className="flex items-center justify-between px-5 py-4 md:hidden">
              <div className="flex items-center gap-3">
                <span
                  className={`w-6 text-sm font-bold ${isDinamo ? "text-[#a5b4fc]" : "text-[#4a4f6e]"}`}
                >
                  {String(row.position).padStart(2, "0")}
                </span>
                {row.logo && (
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={row.logo}
                      alt={row.team}
                      className="h-6 w-6 object-contain"
                    />
                  </div>
                )}
                <span
                  className={`text-sm font-semibold ${isDinamo ? "text-[#a5b4fc]" : "text-white"}`}
                >
                  {row.team}
                </span>
              </div>
              <div className="flex items-center gap-4 text-xs">
                <span className="text-[#8b8d9e]">{row.played}თ</span>
                <span
                  className={`font-semibold ${gd > 0 ? "text-emerald-400" : gd < 0 ? "text-red-400" : "text-[#8b8d9e]"}`}
                >
                  {gdStr}
                </span>
                <span
                  className={`text-base font-black ${isDinamo ? "text-[#a5b4fc]" : "text-white"}`}
                >
                  {row.points}
                </span>
              </div>
            </div>

            {/* Desktop */}
            <div
              className="hidden items-center px-6 py-4 text-sm md:grid"
              style={{
                gridTemplateColumns:
                  "4rem 1fr 3.5rem 3.5rem 3.5rem 3.5rem 4rem 4rem 4.5rem",
              }}
            >
              <span
                className={`font-bold ${isDinamo ? "text-[#a5b4fc]" : "text-[#4a4f6e]"}`}
              >
                {String(row.position).padStart(2, "0")}
              </span>

              <span
                className={`flex items-center gap-3 font-semibold ${isDinamo ? "text-[#a5b4fc]" : "text-white"}`}
              >
                {row.logo && (
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={row.logo}
                      alt={row.team}
                      className="h-7 w-7 object-contain"
                    />
                  </div>
                )}
                {row.team}
              </span>

              <span className="text-center text-[#8b8d9e]">{row.played}</span>
              <span className="text-center text-[#8b8d9e]">{row.won}</span>
              <span className="text-center text-[#8b8d9e]">{row.drawn}</span>
              <span className="text-center text-[#8b8d9e]">{row.lost}</span>
              <span className="text-center text-[#8b8d9e]">
                {row.goalsFor}/{row.goalsAgainst}
              </span>
              <span
                className={`text-center font-semibold ${gd > 0 ? "text-emerald-400" : gd < 0 ? "text-red-400" : "text-[#8b8d9e]"}`}
              >
                {gdStr}
              </span>
              <span
                className={`text-right text-lg font-black ${isDinamo ? "text-[#a5b4fc]" : "text-white"}`}
              >
                {row.points}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
