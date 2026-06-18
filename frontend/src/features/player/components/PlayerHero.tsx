"use client";

import { useState } from "react";
import { PlayerDetail } from "../types/player.types";

const POSITION_COLORS: Record<string, string> = {
  მეკარე: "bg-amber-500",
  მცველი: "bg-blue-500",
  ნახევარმცველი: "bg-emerald-500",
  თავდამსხმელი: "bg-red-500",
};

function getPositionColor(pos: string) {
  return POSITION_COLORS[pos] ?? "bg-violet-500";
}

function getMetaInfo(player: PlayerDetail) {
  return [
    { label: "ეროვნება", value: player.nationality },
    { label: "ასაკი", value: player.age > 0 ? `${player.age} წელი` : null },
    { label: "სიმაღლე", value: player.height !== "—" ? player.height : null },
    { label: "ფეხი", value: player.preferredFoot !== "—" ? player.preferredFoot : null },
  ];
}

interface PlayerHeroProps {
  player: PlayerDetail;
}

export function PlayerHero({ player }: PlayerHeroProps) {
  const [imgError, setImgError] = useState(false);
  const posColor = getPositionColor(player.position);
  const metaInfo = getMetaInfo(player);

  return (
    <div className="relative mb-8 flex min-h-[400px] flex-col overflow-hidden rounded-2xl border border-white/6 bg-[#10142a] md:flex-row">
      {/* dot-grid bg */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: "radial-gradient(circle, rgba(165,180,252,0.08) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />
      {/* lavender glow */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_80%_50%,rgba(165,180,252,0.06)_0%,transparent_60%)]" />

      {/* Photo */}
      <div className="relative h-80 w-full shrink-0 overflow-hidden md:h-auto md:w-80">
        {player.imageUrl && !imgError ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={player.imageUrl}
            alt={player.name}
            onError={() => setImgError(true)}
            className="block h-full w-full object-cover object-top"
          />
        ) : (
          <div className="flex h-full min-h-80 w-full items-center justify-center bg-[#161b3a]">
            <svg width="80" height="80" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="8" r="4" stroke="rgba(165,180,252,0.3)" strokeWidth="1.5" />
              <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" stroke="rgba(165,180,252,0.3)" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </div>
        )}
        {/* Number watermark */}
        <div className="pointer-events-none absolute left-4 top-4 select-none text-[72px] font-black leading-none text-[#a5b4fc]/10">
          {player.number}
        </div>
        {/* gradient fade into content */}
        <div className="absolute inset-0 bg-linear-to-r from-transparent to-[#10142a] opacity-0 md:opacity-100" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-1 flex-col justify-center px-8 py-10 md:px-12">
        {/* Number + position */}
        <div className="mb-5 flex items-center gap-3.5">
          <span className="font-mono text-sm font-extrabold tracking-wide text-[#a5b4fc]">
            #{player.number}
          </span>
          <div className="h-4 w-px bg-white/15" />
          <span className={`rounded-md px-2.5 py-0.5 font-mono text-[11px] font-bold uppercase tracking-[0.15em] text-white ${posColor}`}>
            {player.position}
          </span>
        </div>

        {/* Name */}
        <h1 className="mb-8 text-4xl font-black italic leading-tight tracking-tight text-white md:text-6xl">
          {player.name}
        </h1>

        {/* Meta */}
        <div className="flex flex-wrap gap-7">
          {metaInfo
            .filter((i) => i.value)
            .map(({ label, value }) => (
              <div key={label} className="flex flex-col gap-1">
                <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-[#6b6f8c]">
                  {label}
                </span>
                <span className="text-[15px] font-semibold text-white">
                  {value}
                </span>
              </div>
            ))}
        </div>

        {/* Market value */}
        {player.marketValue && (
          <div className="mt-7 inline-flex self-start items-center gap-2 rounded-lg border border-[#a5b4fc]/20 bg-[#a5b4fc]/10 px-4 py-2">
            <span className="font-mono text-[11px] tracking-wide text-[#a5b4fc]">
              ბაზრის ღირებულება
            </span>
            <span className="text-sm font-bold text-[#a5b4fc]">
              {player.marketValue}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
