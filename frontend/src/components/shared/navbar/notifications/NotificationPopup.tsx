"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowRight } from "lucide-react";
import { NotificationItem } from "./NotificationItem";
import { fetchLatestNews, NewsItem } from "./notifications.service";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export function NotificationPopup({ isOpen, onClose }: Props) {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    fetchLatestNews()
      .then(setNews)
      .catch(() => setNews([]))
      .finally(() => setLoading(false));
  }, [isOpen]);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) onClose();
    }
    if (isOpen) document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      ref={ref}
      className="absolute right-0 top-12 z-50 w-80 overflow-hidden rounded-xl border border-white/6 bg-[#10142a] shadow-2xl"
    >
      <div className="border-b border-white/6 px-4 py-3">
        <p className="text-xs font-black italic uppercase tracking-widest text-white">
          უახლესი სიახლეები
        </p>
      </div>

      {loading ? (
        <div className="flex flex-col gap-2 p-4">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="h-12 animate-pulse rounded-lg bg-[#161b3a]"
            />
          ))}
        </div>
      ) : news.length === 0 ? (
        <p className="px-4 py-6 text-center text-xs text-[#6b6f8c]">
          სიახლეები ვერ მოიძებნა
        </p>
      ) : (
        <div className="divide-y divide-white/4">
          {news.map((item, i) => (
            <NotificationItem key={i} item={item} />
          ))}
        </div>
      )}

      <div className="border-t border-white/4 px-4 py-3">
        <a
          href="/news"
          className="flex items-center gap-1 text-xs font-bold tracking-widest text-[#af3205] transition-colors hover:text-white"
        >
          ყველა სიახლე <ArrowRight className="h-3 w-3" />
        </a>
      </div>
    </div>
  );
}
