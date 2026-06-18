"use client";

import { ArrowUpRight } from "lucide-react";
import { NewsItem } from "../types/news.types";

interface Props {
  article: NewsItem;
  tag?: string;
}

export function NewsCard({ article, tag = "სიახლე" }: Props) {
  return (
    <a
      href={article.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative flex flex-col overflow-hidden rounded-xl border border-white/6 bg-[#10142a] transition-all duration-300 hover:-translate-y-1 hover:border-[#a5b4fc]/30"
    >
      <div className="relative overflow-hidden" style={{ aspectRatio: "16/9" }}>
        {article.image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={article.image}
            alt={article.title}
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="absolute inset-0 bg-[#161b3a]" />
        )}
        <div className="absolute inset-0 bg-linear-to-t from-[#0a0e1f]/80 to-transparent" />
        <span className="absolute left-3 top-3 rounded-md bg-[#a5b4fc] px-2.5 py-1 text-[10px] font-bold italic tracking-wide text-[#0a0e1f]">
          {tag}
        </span>
      </div>

      <div className="flex flex-1 flex-col gap-3 p-5">
        <h3 className="text-sm font-black italic leading-snug text-white transition-colors group-hover:text-[#a5b4fc] md:text-base line-clamp-3">
          {article.title}
        </h3>
        <div className="mt-auto flex items-center gap-1 text-xs font-bold tracking-widest text-[#a5b4fc] uppercase">
          სრულად <ArrowUpRight size={13} />
        </div>
      </div>
    </a>
  );
}
