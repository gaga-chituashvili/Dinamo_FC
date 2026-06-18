import Image from "next/image";
import Link from "next/link";
import type { Player } from "../types";

interface PlayerCardProps {
  player: Player;
}

export function PlayerCard({ player }: PlayerCardProps) {
  return (
    <Link
      href={`/player/${player.id}`}
      className="group relative block cursor-pointer overflow-hidden rounded-xl border border-white/6 bg-[#10142a] transition-all duration-300 hover:-translate-y-1 hover:border-[#a5b4fc]/30"
    >
      <div className="relative aspect-3/4">
        {player.imageUrl ? (
          <Image
            src={player.imageUrl}
            alt={player.name}
            fill
            className="object-contain object-bottom transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            quality={100}
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-[#161b3a]">
            <svg
              viewBox="0 0 200 220"
              className="w-1/2 opacity-20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="100" cy="70" r="50" fill="#a5b4fc" />
              <path
                d="M10 220c0-49.7 40.3-90 90-90s90 40.3 90 90"
                fill="#a5b4fc"
              />
            </svg>
          </div>
        )}

        <div className="absolute inset-0 bg-linear-to-t from-[#0a0e1f] via-[#0a0e1f]/20 to-transparent" />

        {/* Number watermark */}
        <span className="absolute left-3 top-3 select-none font-black text-5xl leading-none text-[#a5b4fc]/15 sm:text-6xl">
          {player.number.padStart(2, "0")}
        </span>

        {/* Lavender accent on hover */}
        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#a5b4fc] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

        <div className="absolute bottom-0 left-0 right-0 p-4">
          <p className="font-black text-sm uppercase leading-tight tracking-wide text-white sm:text-base">
            {player.name}
          </p>
          <p className="mt-1 text-[10px] uppercase tracking-widest text-[#8b8d9e]">
            {player.nationality}
          </p>
        </div>
      </div>
    </Link>
  );
}
