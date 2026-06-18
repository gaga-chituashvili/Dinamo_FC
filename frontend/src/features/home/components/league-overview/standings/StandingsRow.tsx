import type { Standing } from "@/src/features/home/types/standings.types";
import { TeamBadge } from "./TeamBadge";
import { STANDINGS_GRID_COLS } from "./standings.utils";

interface StandingsRowProps {
  row: Standing;
  isDinamo: boolean;
}

export function StandingsRow({ row, isDinamo }: StandingsRowProps) {
  const goalDifference = row.goalsFor - row.goalsAgainst;
  const goalDifferenceLabel =
    goalDifference > 0 ? `+${goalDifference}` : `${goalDifference}`;

  return (
    <div
      className={`relative border-t border-white/4 ${
        isDinamo ? "bg-[#a5b4fc]/10" : ""
      }`}
    >
      {isDinamo && (
        <span
          className="absolute inset-y-0 left-0 w-1 bg-[#a5b4fc]"
          aria-hidden="true"
        />
      )}

      {/* Mobile */}
      <div className="flex items-center justify-between px-5 py-4 md:hidden">
        <div className="flex items-center gap-3">
          <span
            className={`w-6 text-sm font-bold ${
              isDinamo ? "text-[#a5b4fc]" : "text-[#4a4f6e]"
            }`}
          >
            {String(row.position).padStart(2, "0")}
          </span>
          <TeamBadge name={row.team} logo={row.logo} isSelected={isDinamo} />
          <span
            className={`text-sm font-semibold ${
              isDinamo ? "text-[#a5b4fc]" : "text-white"
            }`}
          >
            {row.team}
          </span>
        </div>
        <div className="flex items-center gap-3 text-xs text-[#8b8d9e]">
          <span>{row.played}</span>
          <span
            className={`text-base font-black ${
              isDinamo ? "text-[#a5b4fc]" : "text-white"
            }`}
          >
            {row.points}
          </span>
        </div>
      </div>

      {/* Desktop */}
      <div
        className="hidden items-center px-6 py-4 text-sm md:grid"
        style={{ gridTemplateColumns: STANDINGS_GRID_COLS }}
      >
        <span
          className={`font-bold ${
            isDinamo ? "text-[#a5b4fc]" : "text-[#4a4f6e]"
          }`}
        >
          {String(row.position).padStart(2, "0")}
        </span>

        <span
          className={`flex items-center gap-3 font-semibold ${
            isDinamo ? "text-[#a5b4fc]" : "text-white"
          }`}
        >
          <TeamBadge name={row.team} logo={row.logo} isSelected={isDinamo} />
          {row.team}
        </span>

        <span className="text-center text-[#8b8d9e]">{row.played}</span>
        <span className="text-center text-[#8b8d9e]">{row.won}</span>
        <span className="text-center text-[#8b8d9e]">{row.drawn}</span>
        <span className="text-center text-[#8b8d9e]">{row.lost}</span>
        <span
          className={`text-center ${
            isDinamo ? "text-[#a5b4fc]" : "text-[#8b8d9e]"
          }`}
        >
          {goalDifferenceLabel}
        </span>
        <span
          className={`text-right text-xl font-black ${
            isDinamo ? "text-[#a5b4fc]" : "text-white"
          }`}
        >
          {row.points}
        </span>
      </div>
    </div>
  );
}
