"use client";

import { OnThisDayMatch } from "../types/stats.types";
import { useInView } from "../hooks/useInView";

interface Props {
  matches: OnThisDayMatch[];
}

export function OnThisDay({ matches }: Props) {
  const { ref, inView } = useInView();

  if (matches.length === 0) {
    return (
      <div
        ref={ref}
        className="rounded-xl border border-white/6 bg-[#10142a] px-6 py-8 text-center"
      >
        <p className="text-[#4a4f6e] text-sm">
          დღეს ისტორიაში დინამოს მატჩი არ ყოფილა
        </p>
      </div>
    );
  }

  return (
    <div ref={ref} className="space-y-3">
      {matches.map((m, i) => {
        const dinamoIsHome = m.home.includes("დინამო თბ");
        const resultColor =
          m.winner === "dinamo"
            ? "text-emerald-400"
            : m.winner === "opponent"
              ? "text-red-400"
              : "text-amber-400";
        const resultLabel =
          m.winner === "dinamo"
            ? "მოგება"
            : m.winner === "opponent"
              ? "წაგება"
              : "ფრე";
        const accentBg =
          m.winner === "dinamo"
            ? "bg-emerald-500"
            : m.winner === "opponent"
              ? "bg-red-500"
              : "bg-amber-500";

        return (
          <div
            key={i}
            className="relative overflow-hidden rounded-xl border border-white/6 bg-[#10142a] px-6 py-5"
            style={{
              opacity: inView ? 1 : 0,
              transform: inView ? "translateY(0)" : "translateY(16px)",
              transition: `opacity 0.4s ease ${i * 0.08}s, transform 0.4s ease ${i * 0.08}s`,
            }}
          >
            <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[6rem] font-black leading-none text-white/3 select-none">
              {m.season}
            </span>
            <span className={`absolute inset-y-0 left-0 w-0.5 ${accentBg}`} />
            <div className="relative flex items-center justify-between gap-4">
              <div className="space-y-1">
                <p className="text-[10px] font-semibold tracking-[0.12em] uppercase text-[#4a4f6e]">
                  {m.competition} · {m.yearsAgo} წლის წინ
                </p>
                <p className="text-white text-sm font-medium">
                  <span
                    className={
                      dinamoIsHome ? "text-[#a5b4fc] font-semibold" : ""
                    }
                  >
                    {m.home}
                  </span>
                  <span className="mx-2 text-[#4a4f6e]">vs</span>
                  <span
                    className={
                      !dinamoIsHome ? "text-[#a5b4fc] font-semibold" : ""
                    }
                  >
                    {m.away}
                  </span>
                </p>
              </div>
              <div className="shrink-0 text-right">
                <p className={`text-xl font-black tabular-nums ${resultColor}`}>
                  {m.score}
                </p>
                <p
                  className={`text-[10px] font-semibold uppercase tracking-widest ${resultColor}`}
                >
                  {resultLabel}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
