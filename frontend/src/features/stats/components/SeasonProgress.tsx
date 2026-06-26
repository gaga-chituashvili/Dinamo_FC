"use client";

import { SeasonProgress as SeasonProgressType } from "../types/stats.types";
import { useInView } from "../hooks/useInView";
import { useCountUp } from "../hooks/useCountUp";

interface Props {
  data: SeasonProgressType;
}

export function SeasonProgress({ data }: Props) {
  const { ref, inView } = useInView();
  const progressPct = Math.round(
    (data.currentMatchday / data.totalMatchdays) * 100,
  );
  const maxPts = data.totalMatchdays * 3;
  const dinamoPct = Math.round((data.dinamo.points / maxPts) * 100);
  const secondPct = Math.round((data.second.points / maxPts) * 100);
  const animatedPoints = useCountUp(data.dinamo.points);

  return (
    <div ref={ref} className="space-y-3">
      <div
        className="rounded-xl border border-white/6 bg-[#10142a] px-6 py-5"
        style={{
          opacity: inView ? 1 : 0,
          transform: inView ? "translateY(0)" : "translateY(12px)",
          transition: "opacity 0.4s ease, transform 0.4s ease",
        }}
      >
        <div className="flex justify-between items-baseline mb-3">
          <p className="text-[10px] font-semibold tracking-[0.12em] uppercase text-[#4a4f6e]">
            მატჩდღე
          </p>
          <p className="text-white font-black tabular-nums">
            {data.currentMatchday}
            <span className="text-[#4a4f6e] font-normal text-sm">
              /{data.totalMatchdays}
            </span>
          </p>
        </div>
        <div className="h-1.5 rounded-full bg-white/6 overflow-hidden">
          <div
            className="h-full bg-[#a5b4fc] rounded-full"
            style={{
              width: inView ? `${progressPct}%` : "0%",
              transition: "width 0.8s cubic-bezier(0.4,0,0.2,1)",
            }}
          />
        </div>
        <p className="text-[10px] text-[#4a4f6e] mt-2">
          {progressPct}% სეზონი დასრულებული
        </p>
      </div>

      <div
        className="rounded-xl border border-white/6 bg-[#10142a] px-6 py-5 space-y-4"
        style={{
          opacity: inView ? 1 : 0,
          transform: inView ? "translateY(0)" : "translateY(12px)",
          transition: "opacity 0.4s ease 0.1s, transform 0.4s ease 0.1s",
        }}
      >
        <p className="text-[10px] font-semibold tracking-[0.12em] uppercase text-[#4a4f6e]">
          ქულები
        </p>
        <div className="space-y-3">
          <div>
            <div className="flex justify-between items-baseline mb-1.5">
              <span className="text-[#a5b4fc] text-sm font-semibold">
                დინამო თბ
              </span>
              <span className="text-[#a5b4fc] font-black tabular-nums text-lg">
                {animatedPoints}
              </span>
            </div>
            <div className="h-2 rounded-full bg-white/6 overflow-hidden">
              <div
                className="h-full bg-[#a5b4fc] rounded-full"
                style={{
                  width: inView ? `${dinamoPct}%` : "0%",
                  transition: "width 0.9s cubic-bezier(0.4,0,0.2,1) 0.2s",
                }}
              />
            </div>
          </div>
          <div>
            <div className="flex justify-between items-baseline mb-1.5">
              <span className="text-[#6b6f8c] text-sm">{data.second.team}</span>
              <span className="text-[#6b6f8c] font-bold tabular-nums">
                {data.second.points}
              </span>
            </div>
            <div className="h-2 rounded-full bg-white/6 overflow-hidden">
              <div
                className="h-full bg-white/20 rounded-full"
                style={{
                  width: inView ? `${secondPct}%` : "0%",
                  transition: "width 0.9s cubic-bezier(0.4,0,0.2,1) 0.3s",
                }}
              />
            </div>
          </div>
        </div>
      </div>

      <div
        style={{
          opacity: inView ? 1 : 0,
          transition: "opacity 0.4s ease 0.2s",
        }}
      >
        {data.isFactualLeader ? (
          <div className="rounded-xl border border-amber-500/20 bg-amber-500/5 px-6 py-4 text-center">
            <p className="text-amber-400 font-bold text-sm">
              🏆 ფაქტობრივი ლიდერი
            </p>
          </div>
        ) : (
          <div className="rounded-xl border border-[#a5b4fc]/20 bg-[#a5b4fc]/5 px-6 py-4">
            <p className="text-[#8b8d9e] text-sm text-center">
              ჩემპიონობისთვის საჭიროა კიდევ{" "}
              <span className="font-black text-white">
                {data.pointsNeeded} ქულა
              </span>
            </p>
          </div>
        )}
      </div>

      <div className="grid grid-cols-2 gap-3">
        {[
          { label: "დარჩენილი მატჩი", value: data.remainingMatches },
          { label: "მაქს. შესაძლო ქულა", value: data.maxPossiblePoints },
        ].map(({ label, value }, i) => (
          <div
            key={label}
            className="rounded-xl border border-white/6 bg-[#10142a] p-5 text-center"
            style={{
              opacity: inView ? 1 : 0,
              transform: inView ? "translateY(0)" : "translateY(8px)",
              transition: `opacity 0.4s ease ${0.3 + i * 0.08}s, transform 0.4s ease ${0.3 + i * 0.08}s`,
            }}
          >
            <p className="text-2xl font-black text-white tabular-nums">
              {value}
            </p>
            <p className="text-[10px] font-semibold uppercase tracking-widest text-[#4a4f6e] mt-1">
              {label}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
