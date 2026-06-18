import { Clock } from "lucide-react";
import type { NewsArticle } from "@/src/features/home/types/topPlayer.type";
import { formatTimeAgo } from "./news.utils";

interface FeaturedCardProps {
  article: NewsArticle;
  tag: string;
}

export function FeaturedCard({ article, tag }: FeaturedCardProps) {
  const timeAgo = formatTimeAgo(article.date);

  return (
    <a
      href={article.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative w-full overflow-hidden rounded-xl border border-white/6"
      style={{ minHeight: "420px" }}
    >
      {article.image ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={article.image}
          alt={article.title}
          className="absolute inset-0 h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
        />
      ) : (
        <div className="absolute inset-0 bg-[#161b3a]" />
      )}

      <div className="absolute inset-0 bg-linear-to-t from-[#0a0e1f] via-[#0a0e1f]/50 to-transparent" />

      <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
        <span className="mb-4 inline-block rounded-md bg-[#a5b4fc] px-3 py-1 text-xs font-bold italic tracking-wide text-[#0a0e1f]">
          {tag}
        </span>
        <h2 className="text-2xl font-black italic leading-tight text-white md:text-4xl">
          {article.title}
        </h2>
        {article.excerpt && (
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-[#8b8d9e]">
            {article.excerpt}
          </p>
        )}

        {timeAgo && (
          <div className="mt-3 flex items-center gap-1.5 text-xs text-[#6b6f8c]">
            <Clock className="h-3.5 w-3.5" />
            <span>{timeAgo}</span>
          </div>
        )}
      </div>
    </a>
  );
}
