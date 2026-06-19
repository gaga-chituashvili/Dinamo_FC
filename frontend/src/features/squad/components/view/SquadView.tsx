"use client";

import { useEffect, useState } from "react";
import { Wrapper } from "@/src/components/shared/wrapper";
import { squadService } from "@/src/features/squad/services/squad.service";
import type { Player } from "@/src/features/squad/types";
import { POSITION_ORDER, POSITION_LABELS } from "@/src/features/squad/types";
import { SquadHeader } from "../SquadHeader";
import { PositionGroup } from "../PositionGroup";

export default function SquadView() {
  const [players, setPlayers] = useState<Player[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    squadService
      .getPlayers()
      .then(setPlayers)
      .catch(() => setError("მოთამაშეების ჩატვირთვა ვერ მოხერხდა"))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center bg-[#0a0e1f]">
        <div className="flex flex-col items-center gap-3">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-[#a5b4fc]/30 border-t-[#a5b4fc]" />
          <p className="text-sm text-[#6b6f8c]">იტვირთება...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center bg-[#0a0e1f]">
        <p className="text-sm text-red-400">{error}</p>
      </div>
    );
  }

  const grouped = POSITION_ORDER.reduce<Record<string, Player[]>>(
    (acc, pos) => {
      acc[pos] = players
        .filter((p) => p.position === pos)
        .sort((a, b) => Number(a.number) - Number(b.number));
      return acc;
    },
    {},
  );

  return (
    <div className="min-h-screen bg-[#0a0e1f] py-10 text-white md:py-16">
      <div
        className="pointer-events-none fixed inset-0 -z-10 opacity-30"
        aria-hidden="true"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(165,180,252,0.12) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />
      <Wrapper className="space-y-14 md:space-y-20">
        <SquadHeader total={players.length} />
        {POSITION_ORDER.map((pos) => (
          <PositionGroup
            key={pos}
            label={POSITION_LABELS[pos] ?? pos}
            players={grouped[pos] ?? []}
          />
        ))}
      </Wrapper>
    </div>
  );
}
