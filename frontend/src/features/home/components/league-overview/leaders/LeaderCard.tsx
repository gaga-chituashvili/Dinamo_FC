import type { SeasonLeader } from "./useSeasonLeaders";
import { LEADER_LABELS } from "./leader.constants";

interface LeaderCardProps {
  leader: SeasonLeader;
}

export function LeaderCard({ leader }: LeaderCardProps) {
  const { player, category } = leader;
  const labels = LEADER_LABELS[category];

  return (
    <div className="flex h-44 overflow-hidden rounded-xl border border-white/6 bg-[#10142a]">
      {/* Photo */}
      <div className="relative w-[55%] shrink-0">
        {player.photo ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={player.photo}
            alt={player.name}
            className="absolute inset-0 h-full w-full object-cover object-top"
          />
        ) : (
          <div className="absolute inset-0 bg-[#161b3a]" />
        )}
        <div className="absolute inset-0 bg-linear-to-r from-transparent to-[#10142a]" />
      </div>

      {/* Info */}
      <div className="flex flex-1 flex-col justify-between p-5">
        <div>
          <p className="mb-1 text-[10px] font-bold tracking-[0.2em] text-[#a5b4fc]">
            {labels.category.toUpperCase()}
          </p>
          <h3 className="text-lg font-black italic leading-tight text-white">
            {player.name}
          </h3>

          {/* Club */}
          <div className="mt-1.5 flex items-center gap-1.5">
            {player.clubLogo && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={player.clubLogo}
                alt={player.team}
                className="h-4 w-4 object-contain"
              />
            )}
            <span className="text-xs font-medium text-[#8b8d9e]">
              {player.team}
            </span>
          </div>
        </div>

        <div className="flex items-end gap-2">
          <span className="text-4xl font-black italic leading-none text-white">
            {player.value}
          </span>
          <span className="mb-1 text-xs font-bold uppercase tracking-widest text-[#8b8d9e]">
            {labels.value}
          </span>
        </div>
      </div>
    </div>
  );
}
