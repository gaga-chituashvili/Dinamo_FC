import { Square } from "lucide-react";
import { SeasonStats as SeasonStatsType } from "../types/player.types";
import { SectionHeader } from "./ui/SectionHeader";
import { StatCard } from "./ui/StatCard";

interface SeasonStatsProps {
  stats: SeasonStatsType;
}

export function SeasonStats({ stats }: SeasonStatsProps) {
  const hasStats = stats.appearances > 0 || stats.goals > 0 || stats.assists > 0;

  return (
    <div className="rounded-2xl border border-white/6 bg-[#10142a] p-7">
      <SectionHeader>მიმდინარე სეზონი</SectionHeader>

      <div className="flex flex-wrap gap-3">
        <StatCard label="მატჩები" value={stats.appearances} accent />
        <StatCard label="გოლები" value={stats.goals} accent />
        <StatCard label="გადაცემები" value={stats.assists} />
        <StatCard
          label="ყვითელი"
          value={stats.yellowCards}
          icon={<Square className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />}
        />
        <StatCard
          label="წითელი"
          value={stats.redCards}
          icon={<Square className="h-3.5 w-3.5 fill-red-500 text-red-500" />}
        />
        {stats.rating && <StatCard label="რეიტინგი" value={stats.rating} accent />}
      </div>

      {!hasStats && (
        <p className="mt-4 text-center font-mono text-sm text-[#6b6f8c]">
          სეზონის სტატისტიკა ჯერ არ არის ხელმისაწვდომი
        </p>
      )}
    </div>
  );
}
