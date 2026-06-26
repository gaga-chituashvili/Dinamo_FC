"use client";

import { useState, useEffect, useTransition } from "react";
import { H2HData } from "../types/stats.types";
import { useInView } from "../hooks/useInView";
import { useCountUp } from "../hooks/useCountUp";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/src/components/ui/select";

const API = process.env.NEXT_PUBLIC_API_URL;

interface Props {
  opponents: string[];
}

export function HeadToHead({ opponents }: Props) {
  const [selected, setSelected] = useState(opponents[0] ?? "");
  const [data, setData] = useState<H2HData | null>(null);
  const [isPending, startTransition] = useTransition();
  const { ref, inView } = useInView();
  const wins = useCountUp(data?.wins ?? 0);
  const draws = useCountUp(data?.draws ?? 0);
  const losses = useCountUp(data?.losses ?? 0);

  useEffect(() => {
    if (!selected) return;
    startTransition(async () => {
      const r = await fetch(
        `${API}/api/stats/h2h?opponent=${encodeURIComponent(selected)}`,
      );
      const json: H2HData = await r.json();
      setData(json);
    });
  }, [selected]);

  const total = data ? data.wins + data.draws + data.losses : 0;
  const winPct = total > 0 ? Math.round((data!.wins / total) * 100) : 0;

  return (
    <div ref={ref} className="space-y-3">
      <div className="rounded-xl border border-white/6 bg-[#10142a] p-4">
        <p className="text-[10px] font-semibold tracking-[0.12em] uppercase text-[#4a4f6e] mb-3">
          მეტოქე
        </p>
        <Select value={selected} onValueChange={setSelected}>
          <SelectTrigger className="w-full h-10 border border-white/10 bg-white/5 text-white text-sm font-semibold rounded-lg px-3 focus:ring-0 focus:border-[#a5b4fc]/50 transition-colors hover:border-white/20 cursor-pointer">
            <SelectValue />
          </SelectTrigger>
          <SelectContent
            position="popper"
            className="w-[--radix-select-trigger-width] bg-[#0d1124] border border-white/10 rounded-xl shadow-2xl shadow-black/50 overflow-hidden"
          >
            {opponents.map((op) => (
              <SelectItem
                key={op}
                value={op}
                className="text-white/70 text-sm py-2.5 px-3 focus:bg-[#a5b4fc]/10 focus:text-[#a5b4fc] rounded-lg cursor-pointer data-[state=checked]:text-[#a5b4fc] data-[state=checked]:font-semibold"
              >
                {op}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {isPending && (
        <div className="h-48 animate-pulse rounded-xl border border-white/6 bg-[#10142a]" />
      )}

      {data && !isPending && (
        <div
          style={{
            opacity: inView ? 1 : 0,
            transform: inView ? "translateY(0)" : "translateY(12px)",
            transition: "opacity 0.4s ease, transform 0.4s ease",
          }}
          className="space-y-3"
        >
          <div className="grid grid-cols-3 gap-3">
            {[
              {
                label: "მოგება",
                value: wins,
                color: "text-emerald-400",
                border: "border-emerald-500/20",
              },
              {
                label: "ფრე",
                value: draws,
                color: "text-amber-400",
                border: "border-amber-500/20",
              },
              {
                label: "წაგება",
                value: losses,
                color: "text-red-400",
                border: "border-red-500/20",
              },
            ].map(({ label, value, color, border }) => (
              <div
                key={label}
                className={`rounded-xl border ${border} bg-[#10142a] p-5 text-center`}
              >
                <p className={`text-3xl font-black tabular-nums ${color}`}>
                  {value}
                </p>
                <p className="text-[10px] font-semibold uppercase tracking-widest text-[#4a4f6e] mt-1">
                  {label}
                </p>
              </div>
            ))}
          </div>

          <div className="rounded-xl border border-white/6 bg-[#10142a] px-6 py-4">
            <p className="text-[10px] font-semibold tracking-[0.12em] uppercase text-[#4a4f6e] mb-3">
              გოლები
            </p>
            <div className="flex items-center justify-between">
              <div className="text-center">
                <p className="text-3xl font-black text-[#a5b4fc] tabular-nums">
                  {data.goalsFor}
                </p>
                <p className="text-xs text-[#4a4f6e] mt-0.5">დინამო</p>
              </div>
              <div className="flex-1 mx-4">
                <div className="h-1.5 rounded-full bg-white/6 overflow-hidden">
                  <div
                    className="h-full bg-[#a5b4fc] rounded-full transition-all duration-700"
                    style={{ width: `${winPct}%` }}
                  />
                </div>
                <div className="flex justify-between text-[10px] text-[#4a4f6e] mt-1">
                  <span>{winPct}%</span>
                  <span>{100 - winPct}%</span>
                </div>
              </div>
              <div className="text-center">
                <p className="text-3xl font-black text-white/40 tabular-nums">
                  {data.goalsAgainst}
                </p>
                <p className="text-xs text-[#4a4f6e] mt-0.5">{selected}</p>
              </div>
            </div>
          </div>

          {data.recentForm.length > 0 && (
            <div className="rounded-xl border border-white/6 bg-[#10142a] px-6 py-4">
              <p className="text-[10px] font-semibold tracking-[0.12em] uppercase text-[#4a4f6e] mb-3">
                ბოლო შეხვედრები
              </p>
              <div className="flex gap-2 flex-wrap">
                {data.recentForm.map((r, i) => (
                  <div
                    key={i}
                    title={`${r.home} ${r.score} ${r.away} (${r.season})`}
                    className={`flex h-10 w-10 items-center justify-center rounded-lg text-xs font-black cursor-default border transition-transform hover:scale-110 ${
                      r.winner === "dinamo"
                        ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-400"
                        : r.winner === "opponent"
                          ? "border-red-500/30 bg-red-500/10 text-red-400"
                          : "border-amber-500/30 bg-amber-500/10 text-amber-400"
                    }`}
                  >
                    {r.score}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
