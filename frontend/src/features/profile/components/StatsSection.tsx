import { TrendingUp, Shield, Star, Database } from "lucide-react";
import type { FanProfile } from "../types/types";

interface StatsSectionProps {
  profile: FanProfile;
}

function calcCompletion(profile: FanProfile): number {
  const fields = [
    profile.fullName,
    profile.bio,
    profile.headline,
    profile.jobTitle,
    profile.company,
    profile.location,
  ];
  const filled = fields.filter((f) => f && f.trim() !== "").length;
  return Math.round((filled / fields.length) * 100);
}

export function StatsSection({ profile }: StatsSectionProps) {
  const completionScore = calcCompletion(profile);

  const stats = [
    {
      icon: <TrendingUp className="h-5 w-5 text-[#a5b4fc]" />,
      label: "პროფილის შევსება",
      value: `${completionScore}%`,
      sub: completionScore < 100 ? "შეავსე პროფილი სრულად" : "პროფილი სრულია",
      progress: completionScore,
      accent: true,
    },
    {
      icon: <Shield className="h-5 w-5 text-blue-400" />,
      label: "სტატუსი",
      value: profile.isVerified ? "დადასტურებული" : "დაუდასტურებელი",
      sub: profile.roles.join(", ") || "—",
      accent: false,
    },
    {
      icon: <Star className="h-5 w-5 text-amber-400" />,
      label: "წევრია",
      value: profile.joinedYear,
      sub: "დინამო თბილისის წევრი",
      accent: false,
    },
    {
      icon: <Database className="h-5 w-5 text-violet-400" />,
      label: "უნარები",
      value: profile.skills.length > 0 ? String(profile.skills.length) : "—",
      sub:
        profile.skills.length > 0
          ? profile.skills.slice(0, 2).join(", ")
          : "უნარები არ არის",
      accent: false,
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
      {stats.map((s) => (
        <div
          key={s.label}
          className={`flex flex-col gap-3 rounded-2xl border p-5 ${s.accent ? "border-[#a5b4fc]/20 bg-[#a5b4fc]/5" : "border-white/6 bg-[#10142a]"}`}
        >
          <div className="flex items-center justify-between">
            <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#6b6f8c]">
              {s.label}
            </p>
            {s.icon}
          </div>
          <span
            className={`font-black ${s.accent ? "text-[#a5b4fc]" : "text-white"} ${s.value.length > 6 ? "text-sm" : "text-2xl"}`}
          >
            {s.value}
          </span>
          {s.progress !== undefined && (
            <div className="h-1 overflow-hidden rounded-full bg-[#161b3a]">
              <div
                className="h-full rounded-full bg-[#a5b4fc] transition-all duration-700"
                style={{ width: `${s.progress}%` }}
              />
            </div>
          )}
          <p className="text-xs text-[#6b6f8c]">{s.sub}</p>
        </div>
      ))}
    </div>
  );
}
