import type { Sponsor } from "@/src/features/sponsors/types/sponsors.types";
import { ColumnHeading } from "./ColumnHeading";

interface FooterSponsorsProps {
  sponsors: Sponsor[];
}

export function FooterSponsors({ sponsors }: FooterSponsorsProps) {
  if (sponsors.length === 0) return null;

  return (
    <section
      aria-label="სპონსორები"
      className="mt-16 border-t border-white/6 pt-10"
    >
      <ColumnHeading>სპონსორები</ColumnHeading>
      <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {sponsors.map((sponsor) => (
          <a
            key={sponsor.id}
            href={sponsor.websiteUrl ?? undefined}
            target={sponsor.websiteUrl ? "_blank" : undefined}
            rel={sponsor.websiteUrl ? "noopener noreferrer" : undefined}
            className="flex h-16 items-center justify-center rounded-lg border border-white/6 bg-[#10142a] px-4 text-center text-xs text-[#6b6f8c] transition-colors hover:border-white/12"
          >
            {sponsor.logoUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={sponsor.logoUrl}
                alt={sponsor.name}
                className="h-8 w-auto object-contain"
              />
            ) : (
              sponsor.name
            )}
          </a>
        ))}
      </div>
    </section>
  );
}
