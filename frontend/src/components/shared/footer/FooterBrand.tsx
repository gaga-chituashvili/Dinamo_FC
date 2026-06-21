import Link from "next/link";
import { SocialIcon } from "./SocialIcon";
import { SOCIAL_LINKS, DINAMO_LOGO_URL } from "./footer.constants";
import { ROUTES } from "@/src/lib/routes";

export function FooterBrand() {
  return (
    <div className="flex flex-col items-center gap-6 text-center lg:items-start lg:text-left">
      <div className="flex items-center gap-4">
        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={DINAMO_LOGO_URL}
            alt="Dinamo Tbilisi"
            className="h-full w-full object-contain brightness-0 invert"
          />
        </div>
        <Link
          href={ROUTES.home}
          className="text-xl font-black italic text-[#a5b4fc]"
        >
          DINAMO_FC
        </Link>
      </div>

      <p className="text-xs font-bold tracking-[0.2em] text-[#6b6f8c] uppercase">
        თბილისი, საქართველო · დაარსდა <time dateTime="1925">1925</time>
      </p>

      <p className="max-w-xs text-sm leading-relaxed text-[#8b8d9e]">
        თბილისის დინამო — საქართველოს ერთ-ერთი ყველაზე ტიტულოვანი და ისტორიული
        საფეხბურთო კლუბი. დაარსებულია 1925 წელს.
      </p>

      <nav aria-label="სოციალური ქსელები" className="flex items-center gap-3">
        {SOCIAL_LINKS.map(({ href, label, type }) => (
          <a
            key={label}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={label}
            className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-lg border border-white/6 text-[#8b8d9e] transition-colors hover:border-[#a5b4fc] hover:text-[#a5b4fc]"
          >
            <SocialIcon type={type} />
          </a>
        ))}
      </nav>
    </div>
  );
}
