"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { HistoryEra } from "../types/history.types";
import { extractEraYear } from "../utils/history.utils";

interface Props {
  era: HistoryEra;
  index: number;
}

export function HistoryCard({ era, index }: Props) {
  const [expanded, setExpanded] = useState(false);
  const isReversed = index % 2 === 1;
  const year = extractEraYear(era.title);

  return (
    <div className="relative grid grid-cols-1 items-center gap-8 py-12 md:grid-cols-2 md:gap-12">
      {/* წლის watermark */}
      {year && (
        <span
          aria-hidden
          className="pointer-events-none absolute top-1/2 left-1/2 -z-0 -translate-x-1/2 -translate-y-1/2 text-[120px] font-black text-white/3 select-none md:text-[180px]"
        >
          {year}
        </span>
      )}

      {/* ფოტო */}
      <div
        className={`relative z-10 ${isReversed ? "md:order-2" : "md:order-1"}`}
      >
        <div className="rounded-2xl border border-white/6 bg-[#10142a] p-3">
          <div className="relative aspect-4/5 overflow-hidden rounded-xl">
            {era.image ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={era.image}
                alt={era.title}
                className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
              />
            ) : (
              <div className="h-full w-full bg-[#161b3a]" />
            )}
          </div>
        </div>
      </div>

      {/* ტექსტი */}
      <div
        className={`relative z-10 ${isReversed ? "md:order-1" : "md:order-2"}`}
      >
        <span className="mb-3 inline-block text-xs font-bold tracking-widest text-[#a5b4fc] uppercase">
          ეპოქა {String(index + 1).padStart(2, "0")}
        </span>
        <h2 className="text-3xl font-black italic leading-tight text-white md:text-4xl">
          {era.title}
        </h2>

        <p
          className={`mt-4 text-sm leading-relaxed text-[#8b8d9e] ${
            expanded ? "" : "line-clamp-4"
          }`}
        >
          {era.text}
        </p>

        <button
          onClick={() => setExpanded((prev) => !prev)}
          className="mt-4 flex cursor-pointer items-center gap-1 text-xs font-bold tracking-widest text-[#a5b4fc] uppercase transition-colors hover:text-white"
        >
          {expanded ? "ნაკლების ჩვენება" : "ვრცლად"}
          <ChevronDown
            size={14}
            className={`transition-transform duration-300 ${
              expanded ? "rotate-180" : ""
            }`}
          />
        </button>
      </div>
    </div>
  );
}
