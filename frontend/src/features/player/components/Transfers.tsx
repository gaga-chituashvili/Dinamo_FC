import { Transfer } from "../types/player.types";
import { SectionHeader } from "./ui/SectionHeader";
import { ArrowRight } from "lucide-react";

interface TransfersProps {
  transfers: Transfer[];
}

export function Transfers({ transfers }: TransfersProps) {
  if (!transfers.length) return null;

  return (
    <div className="rounded-2xl border border-white/6 bg-[#10142a] p-7">
      <SectionHeader>ტრანსფერები</SectionHeader>

      <div className="flex flex-col">
        {transfers.map((t, i) => (
          <div
            key={i}
            className={`grid grid-cols-[80px_1fr_auto_1fr_auto] items-center gap-3 px-3 py-3.5 ${
              i < transfers.length - 1 ? "border-b border-white/4" : ""
            }`}
          >
            <span className="font-mono text-[11px] text-[#6b6f8c]">
              {t.date}
            </span>
            <span className="truncate text-right text-sm text-[#8b8d9e]">
              {t.from}
            </span>
            <ArrowRight className="h-3.5 w-3.5 text-[#4a4f6e]" />
            <span className="truncate text-sm font-semibold text-white">
              {t.to}
            </span>
            <span
              className={`font-mono text-xs font-bold ${t.fee === "Free" ? "text-[#6b6f8c]" : "text-[#a5b4fc]"}`}
            >
              {t.fee}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
