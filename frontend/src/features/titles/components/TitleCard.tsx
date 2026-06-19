import { TitleCard as TitleCardType } from "../types/titles.types";
import { parseTitleLabel } from "../utils/titles.utils";

interface Props {
  title: TitleCardType;
}

export function TitleCard({ title }: Props) {
  const { label, count } = parseTitleLabel(title.title);

  return (
    <div className="group relative overflow-hidden rounded-xl border border-white/6">
      {title.image ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={title.image}
          alt={label}
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
      ) : (
        <div className="absolute inset-0 bg-[#10142a]" />
      )}

      <div className="absolute inset-0 bg-linear-to-t from-[#0a0e1f] via-[#0a0e1f]/85 to-[#0a0e1f]/40" />

      <div className="relative z-10 flex min-h-55 flex-col justify-end p-5 sm:p-6">
        <h3 className="text-sm font-bold text-[#a5b4fc] sm:text-base">
          {label}
        </h3>

        {count !== null && (
          <span className="mt-1 block text-3xl font-black text-white sm:text-4xl">
            {count}
          </span>
        )}

        <div className="mt-3 space-y-1.5">
          {title.details.map((detail) => (
            <p
              key={detail}
              className="text-xs leading-relaxed font-semibold text-white/90 sm:text-sm"
            >
              {detail}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}
