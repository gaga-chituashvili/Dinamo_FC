import { ArrowRight } from "lucide-react";
import { TitleCard } from "../types/titles.types";
import { parseTitleLabel } from "../utils/titles.utils";
import { ROUTES } from "@/src/lib/routes";

interface Props {
  title: TitleCard;
}

export function TitleFeatured({ title }: Props) {
  const { label } = parseTitleLabel(title.title);
  const firstDetail = title.details[0] ?? "";
  const yearMatch = firstDetail.match(/(\d{4})/);
  const watermarkYear = yearMatch?.[1] ?? "";

  return (
    <div className="relative mx-4 overflow-hidden rounded-2xl border border-white/6 bg-[#10142a] p-6 sm:mx-6 sm:p-8 md:mx-auto md:max-w-5xl md:p-10">
      {watermarkYear && (
        <span
          aria-hidden
          className="pointer-events-none absolute top-1/2 right-4 z-0`-translate-y-1/2 text-[80px] font-black text-white/5 select-none sm:text-[120px] md:text-[160px]"
        >
          {watermarkYear}
        </span>
      )}

      <div className="relative z-10 grid grid-cols-1 items-center gap-8 md:grid-cols-2">
        <div className="aspect-square w-full max-w-70 overflow-hidden rounded-xl border border-white/6 bg-[#161b3a] sm:max-w-[320px]">
          {title.image ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={title.image}
              alt={label}
              className="h-full w-full object-cover"
            />
          ) : null}
        </div>

        <div>
          <div className="mb-4 h-px w-10 bg-[#a5b4fc]" />
          <h2 className="text-2xl font-black italic leading-tight text-white sm:text-3xl">
            {label}
          </h2>

          <ul className="mt-5 space-y-2">
            {title.details.map((detail) => (
              <li
                key={detail}
                className="flex items-start gap-2 text-sm text-[#c4c6d4] sm:text-base"
              >
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#a5b4fc]" />
                {detail}
              </li>
            ))}
          </ul>

          <a
            href={ROUTES.history}
            className="mt-6 inline-flex cursor-pointer items-center gap-2 rounded-lg bg-[#a5b4fc] px-5 py-2.5 text-xs font-bold tracking-widest text-[#0a0e1f] uppercase transition-opacity hover:opacity-90"
          >
            ისტორიის ნახვა
            <ArrowRight size={14} />
          </a>
        </div>
      </div>
    </div>
  );
}
