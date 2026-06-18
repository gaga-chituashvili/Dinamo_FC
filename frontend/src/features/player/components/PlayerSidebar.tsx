import { PlayerDetail } from "../types/player.types";
import { SectionHeader } from "./ui/SectionHeader";
import { InfoRow } from "./ui/InfoRow";
import { ArrowRight } from "lucide-react";

interface PlayerSidebarProps {
  player: PlayerDetail;
}

export function PlayerSidebar({ player }: PlayerSidebarProps) {
  return (
    <div className="flex w-full shrink-0 flex-col gap-4 md:w-72">
      <div className="rounded-2xl border border-white/6 bg-[#10142a] p-6">
        <SectionHeader>პირადი ინფო</SectionHeader>
        <InfoRow label="ნომერი" value={player.number} />
        <InfoRow label="პოზიცია" value={player.position} />
        <InfoRow label="ეროვნება" value={player.nationality} />
        <InfoRow
          label="ასაკი"
          value={player.age > 0 ? `${player.age} წელი` : "—"}
        />
        <InfoRow label="დაბ. თარიღი" value={player.dateOfBirth} />
        <InfoRow label="სიმაღლე" value={player.height} />
        <InfoRow label="ფეხი" value={player.preferredFoot} />
        <InfoRow label="კონტრ. ვადა" value={player.contractUntil} />
      </div>

      {player.flashscoreId && (
        <a
          href={`https://www.flashscore.com/player/${player.flashscoreId}/`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex cursor-pointer items-center justify-center gap-2 rounded-xl border border-red-500/20 bg-red-500/8 px-5 py-3.5 font-mono text-sm font-semibold tracking-wide text-red-400 transition-colors duration-200 hover:bg-red-500/15"
        >
          Flashscore-ზე ნახვა <ArrowRight className="h-3.5 w-3.5" />
        </a>
      )}
    </div>
  );
}
