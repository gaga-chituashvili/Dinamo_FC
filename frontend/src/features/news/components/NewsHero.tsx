"use client";

import { ArrowUpRight } from "lucide-react";
import { NewsItem } from "../types/news.types";

interface Props {
  article: NewsItem;
}

export function NewsHero({ article }: Props) {
  return (
    <a
      href={article.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative block w-full overflow-hidden rounded-xl border border-white/6"
      style={{ minHeight: "480px" }}
    >
      {article.image ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={article.image}
          alt={article.title}
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
      ) : (
        <div className="absolute inset-0 bg-[#161b3a]" />
      )}

      <div className="absolute inset-0 bg-linear-to-t from-[#0a0e1f] via-[#0a0e1f]/40 to-transparent" />

      {/* Lavender accent line */}
      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#a5b4fc] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

      <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
        <span className="mb-4 inline-block rounded-md bg-[#a5b4fc] px-3 py-1 text-xs font-bold italic tracking-wide text-[#0a0e1f]">
          მთავარი სიახლე
        </span>
        <h1 className="text-2xl font-black italic leading-tight text-white md:text-4xl lg:text-5xl">
          {article.title}
        </h1>
        <div className="mt-4 flex items-center gap-2 text-xs font-bold tracking-widest text-[#a5b4fc] uppercase opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-1">
          სრულად წაკითხვა <ArrowUpRight size={14} />
        </div>
      </div>
    </a>
  );
}
