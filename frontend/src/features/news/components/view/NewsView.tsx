"use client";

import { useState, useEffect, useMemo } from "react";
import { MoveRight, MoveLeft, SearchX } from "lucide-react";
import { Wrapper } from "@/src/components/shared/wrapper";
import { NewsHero } from "../NewsHero";
import { NewsGrid } from "../NewsGrid";
import { NewsSearch } from "../NewsSearch";
import { fetchNews } from "../../services/news.service";
import { NewsItem } from "../../types/news.types";

const ITEMS_PER_PAGE = 6;

export function NewsView() {
  const [articles, setArticles] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const handleSearchChange = (value: string) => {
    setSearch(value);
    setPage(1);
  };

  useEffect(() => {
    fetchNews()
      .then(setArticles)
      .catch((err) => console.error("news fetch error:", err))
      .finally(() => setLoading(false));
  }, []);

  const filtered = useMemo(() => {
    if (!search.trim()) return articles;
    return articles.filter((a) =>
      a.title.toLowerCase().includes(search.toLowerCase()),
    );
  }, [articles, search]);

  const hero = filtered[0] ?? null;

  const heroIndex = hero ? filtered.indexOf(hero) : -1;
  const rest = filtered.filter((_, i) => i !== heroIndex);
  const totalPages = Math.ceil(rest.length / ITEMS_PER_PAGE);
  const paginatedRest = rest.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE,
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0a0e1f]">
        <div className="border-b border-white/6 py-16">
          <Wrapper>
            <div className="h-4 w-32 animate-pulse rounded bg-[#10142a]" />
            <div className="mt-3 h-12 w-64 animate-pulse rounded bg-[#10142a]" />
          </Wrapper>
        </div>
        <Wrapper className="py-12">
          <div
            className="animate-pulse rounded-xl border border-white/6 bg-[#10142a]"
            style={{ minHeight: "480px" }}
          />
          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                className="h-64 animate-pulse rounded-xl border border-white/6 bg-[#10142a]"
              />
            ))}
          </div>
        </Wrapper>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0e1f]">
      {/* Page header */}
      <div className="border-b border-white/6">
        <Wrapper className="flex flex-col gap-6 py-12 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="mb-2 text-xs font-bold tracking-[0.2em] text-[#a5b4fc]">
              ეროვნული ლიგა
            </p>
            <h1 className="text-3xl font-black italic text-white md:text-5xl">
              სიახლეები
            </h1>
            <div className="mt-3 h-px w-12 bg-[#a5b4fc]" />
          </div>

          <div className="w-full sm:w-72">
            <NewsSearch value={search} onChange={handleSearchChange} />
          </div>
        </Wrapper>
      </div>

      <Wrapper className="py-12">
        {/* Hero */}
        {hero && (
          <div className="mb-8">
            <NewsHero article={hero} />
          </div>
        )}

        {/* Count */}
        {filtered.length > 0 && (
          <div className="mb-6 flex items-center gap-3">
            <span className="text-xs font-bold tracking-widest text-[#6b6f8c] uppercase">
              სულ {filtered.length} სიახლე
            </span>
            <span className="h-px flex-1 bg-white/6" />
          </div>
        )}

        {/* Grid */}
        {paginatedRest.length > 0 ? (
          <NewsGrid articles={paginatedRest} />
        ) : (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <SearchX className="h-12 w-12 text-[#6b6f8c]" />
            <p className="mt-4 text-sm text-[#8b8d9e]">სიახლე ვერ მოიძებნა</p>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-12 flex items-center justify-center gap-2">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-lg border border-white/6 text-[#8b8d9e] transition-colors hover:border-[#a5b4fc] hover:text-[#a5b4fc] disabled:pointer-events-none disabled:opacity-20"
            >
              <MoveLeft className="h-4 w-4" />
            </button>

            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i}
                onClick={() => setPage(i + 1)}
                className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-lg border text-sm font-bold transition-all duration-200"
                style={{
                  borderColor:
                    page === i + 1
                      ? "rgba(165,180,252,0.6)"
                      : "rgba(255,255,255,0.06)",
                  color: page === i + 1 ? "#a5b4fc" : "#6b6f8c",
                  background:
                    page === i + 1 ? "rgba(165,180,252,0.08)" : "transparent",
                }}
              >
                {i + 1}
              </button>
            ))}

            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-lg border border-white/6 text-[#8b8d9e] transition-colors hover:border-[#a5b4fc] hover:text-[#a5b4fc] disabled:pointer-events-none disabled:opacity-20"
            >
              <MoveRight className="h-4 w-4" />
            </button>
          </div>
        )}
      </Wrapper>
    </div>
  );
}
