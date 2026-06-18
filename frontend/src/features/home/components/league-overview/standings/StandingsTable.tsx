"use client";

import { useStandings } from "./useStandings";
import { StandingsRow } from "./StandingsRow";
import { STANDINGS_GRID_COLS } from "./standings.utils";

export function StandingsTable() {
  const { standings, dinamoPosition, loading } = useStandings(5);

  if (loading) {
    return (
      <div className="h-80 w-full animate-pulse rounded-xl border border-white/6 bg-[#10142a]" />
    );
  }

  return (
    <div className="overflow-hidden rounded-xl border border-white/6 bg-[#10142a]">
      <div
        className="hidden border-b border-white/6 px-6 py-4 text-xs font-bold tracking-widest text-[#6b6f8c] md:grid"
        style={{ gridTemplateColumns: STANDINGS_GRID_COLS }}
      >
        <span>პოზ</span>
        <span>გუნდი</span>
        <span className="text-center">თ</span>
        <span className="text-center">მ</span>
        <span className="text-center">ფ</span>
        <span className="text-center">წ</span>
        <span className="text-center">გტ</span>
        <span className="text-right">ქ</span>
      </div>

      {standings.map((row) => (
        <StandingsRow
          key={row.position}
          row={row}
          isDinamo={row.position === dinamoPosition}
        />
      ))}
    </div>
  );
}
