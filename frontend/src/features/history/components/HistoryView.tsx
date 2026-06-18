"use client";

import { useState, useEffect } from "react";
import { Wrapper } from "@/src/components/shared/wrapper";
import { fetchHistory } from "../services/history.service";
import { HistoryData } from "../types/history.types";

export function HistoryView() {
  const [data, setData] = useState<HistoryData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchHistory()
      .then(setData)
      .catch((err) => console.error("history fetch error:", err))
      .finally(() => setLoading(false));
  }, []);

  if (loading)
    return (
      <div className="min-h-screen bg-[#0a0e1f]">
        <div className="border-b border-white/6">
          <Wrapper className="py-12">
            <div className="h-4 w-32 animate-pulse rounded bg-[#10142a]" />
            <div className="mt-3 h-10 w-64 animate-pulse rounded bg-[#10142a]" />
          </Wrapper>
        </div>
        <Wrapper className="py-12">
          <div className="space-y-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <div
                key={i}
                className="h-4 animate-pulse rounded bg-[#10142a]"
                style={{ width: `${85 + (i % 3) * 5}%` }}
              />
            ))}
          </div>
        </Wrapper>
      </div>
    );

  if (!data) return null;

  const half = Math.ceil(data.paragraphs.length / 2);
  const firstHalf = data.paragraphs.slice(0, half);
  const secondHalf = data.paragraphs.slice(half);

  return (
    <div className="min-h-screen bg-[#0a0e1f]">
      <div
        className="pointer-events-none fixed inset-0 -z-10 opacity-30"
        aria-hidden="true"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(165,180,252,0.12) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      {/* Page header */}
      <div className="border-b border-white/6">
        <Wrapper className="py-12">
          <p className="mb-2 text-xs font-bold tracking-[0.2em] text-[#a5b4fc]">
            1925 — დღემდე
          </p>
          <h1 className="text-3xl font-black italic text-white md:text-5xl">
            კლუბის ისტორია
          </h1>
          <div className="mt-3 h-px w-12 bg-[#a5b4fc]" />
        </Wrapper>
      </div>

      <Wrapper className="py-16">
        <div className="mx-auto max-w-3xl">
          {/* First half */}
          <div className="space-y-6">
            {firstHalf.map((p, i) => (
              <p
                key={i}
                className="text-sm leading-relaxed text-[#8b8d9e] md:text-base"
              >
                {p}
              </p>
            ))}
          </div>

          {/* First image */}
          {data.images[0] && (
            <div className="my-12 overflow-hidden rounded-xl border border-white/6">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={data.images[0]}
                alt="დინამო ისტორია"
                className="w-full object-cover"
              />
            </div>
          )}

          {/* Second half */}
          <div className="space-y-6">
            {secondHalf.map((p, i) => (
              <p
                key={i}
                className="text-sm leading-relaxed text-[#8b8d9e] md:text-base"
              >
                {p}
              </p>
            ))}
          </div>

          {/* Second image */}
          {data.images[1] && (
            <div className="my-12 overflow-hidden rounded-xl border border-white/[0.06]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={data.images[1]}
                alt="დინამო ისტორია"
                className="w-full object-cover"
              />
            </div>
          )}

          {/* Footer note */}
          <div className="mt-16 flex items-center gap-6 border-t border-white/6 pt-8">
            <span className="h-px flex-1 bg-white/6" />
            <span className="text-xs font-bold tracking-[0.2em] text-[#6b6f8c]">
              ფ.კ. დინამო თბილისი
            </span>
            <span className="h-px flex-1 bg-white/6" />
          </div>
        </div>
      </Wrapper>
    </div>
  );
}
