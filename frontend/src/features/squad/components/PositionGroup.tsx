import type { Player } from "../types";
import { PlayerCard } from "./PlayerCard";

interface PositionGroupProps {
  label: string;
  players: Player[];
}

export function PositionGroup({ label, players }: PositionGroupProps) {
  if (players.length === 0) return null;

  return (
    <section className="space-y-5">
      <div className="flex items-center gap-4">
        <h2 className="font-black text-xl uppercase tracking-widest text-[#a5b4fc] sm:text-2xl">
          {label}
        </h2>
        <span className="rounded border border-white/6 px-2.5 py-1 font-bold text-[10px] uppercase tracking-widest text-[#6b6f8c]">
          {players.length.toString().padStart(2, "0")} მოთამაშე
        </span>
        <div className="h-px flex-1 bg-white/6" />
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        {players.map((player) => (
          <PlayerCard key={player.id} player={player} />
        ))}
      </div>
    </section>
  );
}
