import { LastMatch } from "../types/player.types";
import { SectionHeader } from "./ui/SectionHeader";

interface LastMatchesProps {
  matches: LastMatch[];
}

const RESULT_STYLES: Record<string, string> = {
  W: "bg-emerald-500/20 border-emerald-500/40 text-emerald-400",
  L: "bg-red-500/20 border-red-500/40 text-red-400",
  D: "bg-amber-500/20 border-amber-500/40 text-amber-400",
};

export function LastMatches({ matches }: LastMatchesProps) {
  if (!matches.length) return null;

  return (
    <div className="bg-[#0d1117] border border-white/7 rounded-2xl p-7">
      <SectionHeader>ბოლო მატჩები</SectionHeader>

      <div className="flex flex-col gap-1">
        {matches.map((m, i) => {
          const resultStyle = RESULT_STYLES[m.result] ?? RESULT_STYLES["D"];

          return (
            <a
              key={i}
              href={m.url}
              target="_blank"
              rel="noopener noreferrer"
              className="grid grid-cols-[80px_1fr_auto_1fr_60px] items-center gap-3 px-3 py-3.5 rounded-xl hover:bg-white/4 transition-colors duration-150 cursor-pointer"
            >
              <span className="text-[11px] text-gray-600 font-mono">
                {new Date(Number(m.date) * 1000).toLocaleDateString("ka-GE")}
              </span>
              <span className="text-sm text-gray-400 text-right truncate">
                {m.home}
              </span>
              <div className="flex items-center gap-2 bg-white/4 rounded-lg px-3 py-1.5">
                <span className="text-sm font-bold text-gray-50 font-mono">
                  {m.homeScore}
                </span>
                <span className="text-xs text-gray-700">:</span>
                <span className="text-sm font-bold text-gray-50 font-mono">
                  {m.awayScore}
                </span>
              </div>
              <span className="text-sm text-gray-400 truncate">{m.away}</span>
              <div
                className={`w-7 h-7 rounded-full border flex items-center justify-center text-[11px] font-bold font-mono justify-self-end ${resultStyle}`}
              >
                {m.result}
              </div>
            </a>
          );
        })}
      </div>
    </div>
  );
}
