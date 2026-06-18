import type { FanProfile } from "../types/types";

interface Props {
  profile: FanProfile;
}

export function LoyaltySection({ profile }: Props) {
  const xpTotal = profile.loyaltyXp + profile.loyaltyXpToNext;
  const xpPercent = Math.round((profile.loyaltyXp / xpTotal) * 100);
  const dots = Math.min(5, Math.round((profile.seasonMatchesAttended / (profile.seasonMatchesTotal || 1)) * 5));
  const membershipExpiry = profile.membershipExpiresAt
    ? new Date(profile.membershipExpiresAt).toLocaleDateString("ka-GE", { month: "long", year: "numeric" })
    : null;

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
      <div className="rounded-2xl border border-white/6 bg-[#10142a] p-5">
        <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.15em] text-[#6b6f8c]">ლოიალობის ქულები</p>
        <div className="mb-2 flex items-end gap-1">
          <span className="text-4xl font-black text-[#a5b4fc]">{profile.loyaltyXp.toLocaleString()}</span>
          <span className="mb-1 text-sm text-[#6b6f8c]">XP</span>
        </div>
        <div className="mb-2 h-1 overflow-hidden rounded-full bg-[#161b3a]">
          <div className="h-full rounded-full bg-[#a5b4fc]" style={{ width: `${xpPercent}%` }} />
        </div>
        <p className="text-xs text-[#6b6f8c]">შემდეგი დონე: {profile.loyaltyLevel} ({profile.loyaltyXpToNext.toLocaleString()} XP დარჩა)</p>
      </div>

      <div className="rounded-2xl border border-white/6 bg-[#10142a] p-5">
        <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.15em] text-[#6b6f8c]">დასწრებული მატჩები</p>
        <span className="mb-2 block text-4xl font-black text-white">{profile.matchesAttended}</span>
        <p className="mb-2 text-xs text-[#6b6f8c]">მიმდინარე სეზონი: {profile.seasonMatchesAttended}/{profile.seasonMatchesTotal} მატჩი</p>
        <div className="flex items-center gap-1.5">
          {[...Array(5)].map((_, i) => (
            <div key={i} className={`h-2 w-2 rounded-full ${i < dots ? "bg-[#a5b4fc]" : "bg-[#161b3a]"}`} />
          ))}
        </div>
      </div>

      <div className="relative overflow-hidden rounded-2xl border border-[#a5b4fc]/20 bg-[#a5b4fc]/5 p-5">
        <div className="pointer-events-none absolute bottom-3 right-3 opacity-5">
          <svg width="64" height="64" viewBox="0 0 24 24" fill="#a5b4fc">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
          </svg>
        </div>
        <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.15em] text-[#a5b4fc]/60">აქტიური გაწევრიანება</p>
        {profile.membershipType ? (
          <>
            <p className="mb-1 text-xl font-black italic text-white uppercase">{profile.membershipType}</p>
            {membershipExpiry && <p className="mb-4 text-xs text-[#6b6f8c]">მოქმედია: {membershipExpiry}</p>}
          </>
        ) : (
          <p className="mb-4 text-sm text-[#8b8d9e]">გაწევრიანება არ არის</p>
        )}
        <button className="cursor-pointer rounded-lg border border-[#a5b4fc]/40 px-3 py-1.5 text-[11px] font-black uppercase tracking-widest text-[#a5b4fc] transition-all hover:bg-[#a5b4fc] hover:text-[#0a0e1f]">
          პასის მართვა
        </button>
      </div>
    </div>
  );
}
