import { CareerEntry } from "../types/player.types";
import { SectionHeader } from "./ui/SectionHeader";
import { headerColumns } from "../api/data";

interface CareerTableProps {
  career: CareerEntry[];
}

export function CareerTable({ career }: CareerTableProps) {
  if (!career.length) return null;

  return (
    <div className="overflow-x-auto rounded-2xl border border-white/6 bg-[#10142a] p-7">
      <SectionHeader>კარიერა</SectionHeader>

      <table className="w-full border-collapse text-sm">
        <thead>
          <tr className="border-b border-white/6">
            {headerColumns.map(({ label, align }) => (
              <th
                key={label}
                className={`px-3 py-2.5 font-mono text-[11px] font-semibold uppercase tracking-widest text-[#6b6f8c] ${align}`}
              >
                {label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {career.map((c, i) => (
            <tr
              key={i}
              className="border-b border-white/4 transition-colors duration-150 hover:bg-[#a5b4fc]/5"
            >
              <td className="px-3 py-3 font-mono text-xs text-[#6b6f8c]">
                {c.season}
              </td>
              <td className="px-3 py-3 font-semibold text-white">
                <div className="flex items-center gap-2">
                  {c.teamLogo && (
                    <div className="flex h-5 w-5 items-center justify-center rounded bg-white">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={c.teamLogo}
                        alt=""
                        className="h-4 w-4 object-contain"
                        onError={(e) => {
                          (e.target as HTMLImageElement).style.display = "none";
                        }}
                      />
                    </div>
                  )}
                  {c.team}
                </div>
              </td>
              <td className="px-3 py-3 text-xs text-[#8b8d9e]">
                {c.competition}
              </td>
              <td className="px-3 py-3 text-center font-semibold text-white">
                {c.appearances}
              </td>
              <td className="px-3 py-3 text-center font-bold text-[#a5b4fc]">
                {c.goals}
              </td>
              <td className="px-3 py-3 text-center text-white">
                {c.assists ?? "—"}
              </td>
              <td className="px-3 py-3 text-center text-amber-400">
                {c.yellowCards}
              </td>
              <td className="px-3 py-3 text-center text-red-400">
                {c.redCards}
              </td>
              <td className="px-3 py-3 text-center font-mono text-xs text-[#6b6f8c]">
                {c.rating ?? "—"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
