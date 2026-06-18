"use client";

import { NewsItem } from "./notifications.service";

interface Props {
  item: NewsItem;
}

export function NotificationItem({ item }: Props) {
  return (
    <a
      href={item.url}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-3 px-4 py-3 transition-colors hover:bg-white/5"
    >
      <div className="relative h-12 w-16 shrink-0 overflow-hidden rounded-md bg-[#1a1a1a]">
        {item.image && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={item.image}
            alt={item.title}
            className="absolute inset-0 h-full w-full object-cover"
          />
        )}
      </div>
      <p className="line-clamp-2 text-xs font-semibold leading-snug text-white">
        {item.title}
      </p>
    </a>
  );
}
