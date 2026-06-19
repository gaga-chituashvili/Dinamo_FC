"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Wrapper } from "@/src/components/shared/wrapper";
import { FeaturedCard } from "../news/FeaturedCard";
import { SideCard } from "../news/SideCard";
import { NewsBackground } from "../news/NewsBackground";
import { NEWS_TAGS } from "../news/news.constants";
import type { NewsArticle } from "@/src/features/home/types/topPlayer.type";

export function NewsSection() {
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [featuredIndex, setFeaturedIndex] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/players/news`,
        );
        const data = await res.json();
        const mapped: NewsArticle[] = (Array.isArray(data) ? data : []).map(
          (
            item: { title: string; url: string; image: string | null },
            i: number,
          ) => ({
            id: i,
            category: "სიახლე",
            title: item.title,
            excerpt: "",
            image: item.image ?? "",
            date: "",
            url: item.url,
            featured: false,
          }),
        );
        setArticles(mapped.slice(0, 6));
      } catch (err) {
        console.error("news fetch error:", err);
      }
    }
    load();
  }, []);

  useEffect(() => {
    if (articles.length === 0) return;
    intervalRef.current = setInterval(() => {
      setFeaturedIndex((prev) => (prev + 1) % articles.length);
    }, 5000);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [articles]);

  if (articles.length === 0) return null;

  const featured = articles[featuredIndex];
  const side = articles.filter((_, i) => i !== featuredIndex).slice(0, 2);

  return (
    <section className="relative w-full overflow-hidden py-20 bg-[#0a0e1f]">
      <NewsBackground />

      <Wrapper className="relative">
        {/* Header */}
        <div className="mb-10 flex items-end justify-between">
          <div>
            <p className="mb-2 text-xs font-bold tracking-[0.2em] text-[#a5b4fc]">
              უახლესი ამბები
            </p>
            <h2 className="text-2xl font-black italic text-white md:text-4xl">
              სიახლეების ზოლი
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/news"
              className="hidden items-center gap-2 whitespace-nowrap text-xs font-bold tracking-widest text-[#8b8d9e] transition-colors hover:text-white sm:flex"
            >
              ყველა სიახლე <ArrowRight size={14} />
            </Link>
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-[1fr_380px]">
          <FeaturedCard
            article={featured}
            tag={NEWS_TAGS[featuredIndex % NEWS_TAGS.length]}
          />
          <div className="flex h-full flex-col gap-4">
            {side.map((article, i) => (
              <SideCard
                key={article.id}
                article={article}
                tag={NEWS_TAGS[(featuredIndex + i + 1) % NEWS_TAGS.length]}
              />
            ))}
          </div>
        </div>

        <div className="mt-6 flex justify-center gap-2">
          {articles.map((_, i) => (
            <button
              key={i}
              onClick={() => setFeaturedIndex(i)}
              className="cursor-pointer rounded-full transition-all duration-300"
              style={{
                width: i === featuredIndex ? "24px" : "8px",
                height: "4px",
                background:
                  i === featuredIndex ? "#a5b4fc" : "rgba(255,255,255,0.1)",
              }}
            />
          ))}
        </div>
      </Wrapper>
    </section>
  );
}
