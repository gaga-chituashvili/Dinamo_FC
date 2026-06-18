"use client";

import { useParams, useRouter } from "next/navigation";
import { ChevronLeft, CircleAlert } from "lucide-react";
import { Wrapper } from "@/src/components/shared/wrapper";
import { usePlayer } from "../hooks/usePlayer";
import { PlayerHero } from "./PlayerHero";
import { PlayerSidebar } from "./PlayerSidebar";
import { SeasonStats } from "./SeasonStats";
import { CareerTable } from "./CareerTable";
import { LastMatches } from "./LastMatches";
import { Transfers } from "./Transfers";

export function PlayerDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params?.id as string;
  const { player, loading, error } = usePlayer(id);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#0a0e1f]">
        <div className="flex flex-col items-center gap-4">
          <div className="h-12 w-12 animate-spin rounded-full border-[3px] border-[#a5b4fc]/20 border-t-[#a5b4fc]" />
          <span className="font-mono text-sm tracking-widest text-[#6b6f8c]">
            იტვირთება...
          </span>
        </div>
      </div>
    );
  }

  if (error || !player) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-[#0a0e1f]">
        <CircleAlert className="h-12 w-12 text-red-400" />
        <p className="font-mono text-sm text-red-400">{error ?? "შეცდომა"}</p>
        <button
          onClick={() => router.back()}
          className="inline-flex cursor-pointer items-center gap-2 rounded-lg border border-[#a5b4fc]/30 bg-[#a5b4fc]/10 px-5 py-2.5 font-mono text-sm text-[#a5b4fc] transition-colors duration-200 hover:bg-[#a5b4fc]/20"
        >
          <ChevronLeft className="h-4 w-4" />
          უკან
        </button>
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
      <Wrapper>
        <div className="pb-20">
          <div className="mb-2 pt-6">
            <button
              onClick={() => router.back()}
              className="inline-flex cursor-pointer items-center gap-2 rounded-xl border border-white/6 bg-white/4 px-4 py-2.5 font-mono text-sm tracking-wide text-[#8b8d9e] transition-all duration-200 hover:border-[#a5b4fc]/30 hover:text-[#a5b4fc]"
            >
              <ChevronLeft className="h-4 w-4" />
              შემადგენლობა
            </button>
          </div>

          <PlayerHero player={player} />

          <div className="flex flex-col items-start gap-6 md:flex-row">
            <div className="flex min-w-0 flex-1 flex-col gap-6">
              <SeasonStats stats={player.currentSeason} />
              <CareerTable career={player.career} />
              <LastMatches matches={player.lastMatches} />
              <Transfers transfers={player.transfers} />
            </div>
            <PlayerSidebar player={player} />
          </div>
        </div>
      </Wrapper>
    </div>
  );
}
