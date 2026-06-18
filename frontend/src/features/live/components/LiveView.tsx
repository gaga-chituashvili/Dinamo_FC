"use client";

import { useState, useEffect } from "react";
import { Radio } from "lucide-react";
import { Wrapper } from "@/src/components/shared/wrapper";
import { fetchLive } from "../services/live.service";
import { LiveVideo } from "../types/live.types";

const POLL_INTERVAL_MS = 30_000;

export function LiveView() {
  const [videos, setVideos] = useState<LiveVideo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const data = await fetchLive();
        if (!cancelled) setVideos(data.live);
      } catch (err) {
        console.error("live fetch error:", err);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();
    const id = setInterval(load, POLL_INTERVAL_MS);

    return () => {
      cancelled = true;
      clearInterval(id);
    };
  }, []);

  const activeStreams = videos.filter((v) => v.videoId);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0a0e1f]">
        <div className="border-b border-white/6">
          <Wrapper className="py-12">
            <div className="h-4 w-24 animate-pulse rounded bg-[#10142a]" />
            <div className="mt-3 h-10 w-64 animate-pulse rounded bg-[#10142a]" />
          </Wrapper>
        </div>
        <Wrapper className="py-12">
          <div className="h-96 animate-pulse rounded-2xl border border-white/6 bg-[#10142a]" />
        </Wrapper>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0e1f]">
      <div
        className="pointer-events-none fixed inset-0 -z-10 opacity-30"
        aria-hidden="true"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(165,180,252,0.12) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      {/* Page header */}
      <div className="border-b border-white/6">
        <Wrapper className="py-12">
          <div className="mb-2 flex items-center gap-2">
            <span className="h-2 w-2 animate-pulse rounded-full bg-red-500" />
            <p className="text-xs font-bold tracking-[0.2em] text-red-400">
              პირდაპირი ეთერი
            </p>
          </div>
          <h1 className="text-3xl font-black italic text-white md:text-5xl">
            პირდაპირი ტრანსლაცია
          </h1>
          <div className="mt-3 h-px w-12 bg-red-500" />
        </Wrapper>
      </div>

      <Wrapper className="py-12">
        {activeStreams.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-2xl border border-white/6 bg-[#10142a] py-32 text-center">
            <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl border border-white/6 bg-[#161b3a]">
              <Radio size={28} className="text-[#6b6f8c]" />
            </div>
            <h2 className="mb-2 text-xl font-black italic text-white">
              ახლა ტრანსლაცია არ მიმდინარეობს
            </h2>
            <p className="max-w-sm text-sm leading-relaxed text-[#8b8d9e]">
              დინამოს მატჩის დაწყებისთანავე ლაივი ავტომატურად გამოჩნდება
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-10">
            {activeStreams.map((video) => (
              <div key={video.videoId} className="flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="h-2.5 w-2.5 animate-pulse rounded-full bg-red-500" />
                    <span className="text-xs font-bold tracking-[0.2em] text-red-400">
                      პირდაპირი
                    </span>
                  </div>
                  {video.channel && (
                    <span className="text-xs text-[#8b8d9e]">
                      {video.channel}
                    </span>
                  )}
                </div>

                <h2 className="text-lg font-black italic text-white">
                  {video.title}
                </h2>

                <div
                  className="relative w-full overflow-hidden rounded-2xl border border-white/6"
                  style={{ aspectRatio: "16/9" }}
                >
                  <iframe
                    src={`https://www.youtube.com/embed/${video.videoId}?autoplay=1&mute=0`}
                    title={video.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="absolute inset-0 h-full w-full"
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </Wrapper>
    </div>
  );
}
