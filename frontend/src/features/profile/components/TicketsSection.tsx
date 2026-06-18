import { Ticket as TicketIcon, MapPin, Clock } from "lucide-react";
import type { FanProfile } from "../types/types";
import { ArrowRight } from "lucide-react";

interface TicketsSectionProps {
  profile: FanProfile;
}

export function TicketsSection({ profile }: TicketsSectionProps) {
  const tickets = profile.tickets;

  return (
    <div className="rounded-2xl border border-white/6 bg-[#10142a] p-6">
      <div className="mb-5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="h-5 w-0.5 rounded-full bg-[#a5b4fc]" />
          <h2 className="text-xs font-bold uppercase tracking-[0.15em] text-[#6b6f8c]">
            აქტიური ბილეთები
          </h2>
        </div>
        {tickets.length > 0 && (
          <button className="cursor-pointer text-xs text-[#6b6f8c] transition-colors hover:text-[#a5b4fc]">
            <span className="flex items-center gap-1">
              ყველა ბილეთი <ArrowRight className="h-3 w-3" />
            </span>
          </button>
        )}
      </div>

      {tickets.length === 0 ? (
        <div className="flex flex-col items-center justify-center gap-3 py-8">
          <TicketIcon className="h-8 w-8 text-[#161b3a]" />
          <p className="text-sm text-[#6b6f8c]">ბილეთები არ გაქვს</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {tickets.map((t) => (
            <div
              key={t.id}
              className="group relative cursor-pointer overflow-hidden rounded-xl border border-white/6 bg-[#0a0e1f] p-5 transition-colors hover:border-[#a5b4fc]/30"
            >
              <div className="absolute left-0 top-1/2 h-6 w-3 -translate-y-1/2 rounded-r-full border-r border-white/6 bg-[#10142a]" />
              <div className="absolute right-0 top-1/2 h-6 w-3 -translate-y-1/2 rounded-l-full border-l border-white/6 bg-[#10142a]" />
              <div className="pl-2">
                <p className="mb-2 text-[10px] font-bold uppercase tracking-widest text-[#a5b4fc]">
                  {t.competition} • {t.round}
                </p>
                <p className="text-sm font-black italic text-white uppercase">
                  {t.home}
                </p>
                <p className="my-0.5 text-xs text-[#6b6f8c]">VS</p>
                <p className="mb-4 text-sm font-black italic text-white uppercase">
                  {t.away}
                </p>
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-1.5 text-[11px] text-[#8b8d9e]">
                    <Clock className="h-3 w-3" />
                    {t.date} • {t.time}
                  </div>
                  <div className="flex items-center gap-1.5 text-[11px] text-[#8b8d9e]">
                    <MapPin className="h-3 w-3" />
                    {t.stadium} — {t.seat}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
