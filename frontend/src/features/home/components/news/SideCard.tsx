import { Clock } from "lucide-react";
import type { NewsArticle } from "@/src/features/home/types/topPlayer.type";
import { formatTimeAgo } from "./news.utils";

interface SideCardProps {
  article: NewsArticle;
  tag: string;
}

export function SideCard({ article, tag }: SideCardProps) {
  const timeAgo = formatTimeAgo(article.date);

  return (
    <a
      href={article.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative h-48 overflow-hidden rounded-xl border border-white/6 lg:h-auto lg:flex-1"
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

      <div className="absolute bottom-0 left-0 right-0 p-4">
        <span className="mb-2 inline-block rounded-md bg-[#a5b4fc] px-2.5 py-1 text-[10px] font-bold italic tracking-wide text-[#0a0e1f]">
          {tag}
        </span>
        <h3 className="text-sm font-black italic leading-snug text-white line-clamp-2">
          {article.title}
        </h3>

        {timeAgo && (
          <div className="mt-2 flex items-center gap-1.5 text-xs text-[#8b8d9e]">
            <Clock className="h-3 w-3" />
            <span>{timeAgo}</span>
          </div>
        )}
      </div>
    </a>
  );
}
