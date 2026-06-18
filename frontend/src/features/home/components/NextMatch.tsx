"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Calendar } from "lucide-react";
import { Wrapper } from "@/src/components/shared/wrapper";
import { fetchFixtures } from "@/src/features/home/services/next-match.service";
import type { Fixture } from "@/src/features/home/types/next-match.types";
import {
  getNextFixture,
  getTeamInitials,
  isDinamo,
} from "./next-match/next-match.utils";
import { useCountdown } from "./next-match/useCountdown";

export function NextMatch() {
  const [nextMatch, setNextMatch] = useState<Fixture | null>(null);
  const [matchDate, setMatchDate] = useState<Date | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const check = () => setIsLoggedIn(!!localStorage.getItem("access_token"));
    check();
    window.addEventListener("auth-change", check);
    return () => window.removeEventListener("auth-change", check);
  }, []);

  useEffect(() => {
    async function load() {
      try {
        const fixtures = await fetchFixtures();
        const next = getNextFixture(fixtures);
        if (next) {
          setNextMatch(next);
          setMatchDate(next.parsed);
        }
      } catch {}
    }
    load();
  }, []);

  const { days, hours, minutes, seconds } = useCountdown(matchDate);
  const pad = (n: number) => String(n).padStart(2, "0");

  if (!nextMatch)
    return (
      <section className="relative z-10 pb-16 bg-[#0a0e1f]">
        <Wrapper>
          <div className="h-40 w-full animate-pulse rounded-xl bg-[#10142a] border border-white/6" />
        </Wrapper>
      </section>
    );

  return (
    <section className="relative z-10 pb-16 bg-[#0a0e1f]">
      <Wrapper>
        <div className="w-full overflow-hidden rounded-xl border border-white/6 bg-[#10142a]">
          <div className="flex flex-col gap-8 p-6 sm:p-10 lg:flex-row lg:items-center lg:justify-between">
            <div className="shrink-0">
              <p className="mb-2 text-xs font-bold tracking-[0.2em] text-[#a5b4fc]">
                შემდეგი მატჩი
              </p>
              <h2 className="text-2xl font-black italic leading-tight text-white">
                ეროვნული ლიგა
              </h2>
              <div className="mt-3 flex items-center gap-1.5 text-xs text-[#8b8d9e]">
                <Calendar className="h-3 w-3" />
                <span>{nextMatch.date}</span>
              </div>
            </div>

            {/* Divider */}
            <div className="hidden h-16 w-px bg-white/10 lg:block" />

            {/* Teams */}
            <div className="flex items-center gap-6">
              {/* Home */}
              <div className="flex flex-col items-center gap-2">
                <div
                  className="flex h-16 w-16 items-center justify-center rounded-xl text-sm font-black"
                  style={
                    nextMatch.team1
                      ? { backgroundColor: "#ffffff" }
                      : {
                          backgroundColor: isDinamo(nextMatch.home)
                            ? "#a5b4fc"
                            : "#1a1f3a",
                          color: isDinamo(nextMatch.home)
                            ? "#0a0e1f"
                            : "#8b8d9e",
                        }
                  }
                >
                  {nextMatch.team1 ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={nextMatch.team1}
                      alt={nextMatch.home}
                      className="h-10 w-10 object-contain"
                    />
                  ) : (
                    getTeamInitials(nextMatch.home)
                  )}
                </div>
                <span className="max-w-20 truncate text-center text-xs text-[#8b8d9e]">
                  {nextMatch.home}
                </span>
              </div>

              <span className="text-xl font-black italic text-[#3a3f5c]">
                VS
              </span>

              {/* Away */}
              <div className="flex flex-col items-center gap-2">
                <div
                  className="flex h-16 w-16 items-center justify-center rounded-xl text-sm font-black"
                  style={
                    nextMatch.team2
                      ? { backgroundColor: "#ffffff" }
                      : {
                          backgroundColor: isDinamo(nextMatch.away)
                            ? "#a5b4fc"
                            : "#1a1f3a",
                          color: isDinamo(nextMatch.away)
                            ? "#0a0e1f"
                            : "#8b8d9e",
                        }
                  }
                >
                  {nextMatch.team2 ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={nextMatch.team2}
                      alt={nextMatch.away}
                      className="h-10 w-10 object-contain"
                    />
                  ) : (
                    getTeamInitials(nextMatch.away)
                  )}
                </div>
                <span className="max-w-20 truncate text-center text-xs text-[#8b8d9e]">
                  {nextMatch.away}
                </span>
              </div>
            </div>

            {/* Divider */}
            <div className="hidden h-16 w-px bg-white/10 lg:block" />

            {/* Countdown */}
            <div className="flex items-end gap-3">
              {[
                { value: pad(days), label: "დღე" },
                { value: pad(hours), label: "სთ" },
                { value: pad(minutes), label: "წთ" },
                { value: pad(seconds), label: "წმ" },
              ].map(({ value, label }) => (
                <div key={label} className="flex flex-col items-center">
                  <span className="font-mono text-4xl font-black text-[#a5b4fc] sm:text-5xl">
                    {value}
                  </span>
                  <span className="mt-1 text-xs text-[#6b6f8c]">{label}</span>
                </div>
              ))}
            </div>

            {/* Live Stream */}
            {isLoggedIn && (
              <>
                <div className="hidden h-16 w-px bg-white/10 lg:block" />
                <Link
                  href="/live"
                  className="flex shrink-0 items-center justify-center gap-2 rounded-xl border border-white/10 px-6 py-4 text-xs font-bold tracking-widest text-[#8b8d9e] transition-all hover:border-red-500 hover:text-red-400 cursor-pointer"
                >
                  <span className="h-2 w-2 animate-pulse rounded-full bg-red-500" />
                  <span>პირდაპირი ტრანსლაცია</span>
                </Link>
              </>
            )}
          </div>
        </div>
      </Wrapper>
    </section>
  );
}
