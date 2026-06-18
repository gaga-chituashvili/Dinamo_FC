"use client";

import { NewsItem } from "../types/news.types";
import { NewsCard } from "./NewsCard";

interface Props {
  articles: NewsItem[];
}

export function NewsGrid({ articles }: Props) {
  if (articles.length === 0) {
    return (
      <div className="flex items-center justify-center py-20">
        <p className="text-[#8b8d9e]">სიახლეები ვერ მოიძებნა</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {articles.map((article, i) => (
        <NewsCard key={i} article={article} />
      ))}
    </div>
  );
}
