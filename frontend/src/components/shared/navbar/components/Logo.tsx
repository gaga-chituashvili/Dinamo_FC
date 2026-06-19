import Link from "next/link";
import { NAV_ROUTES } from "@/src/components/shared/routes";
import { DINAMO_LOGO_URL } from "../../footer/footer.constants";

export function Logo() {
  return (
    <Link
      className="shrink-0 text-sm font-black italic tracking-wider text-white transition-opacity hover:opacity-80"
      href={NAV_ROUTES.home}
    >
      <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full p-1">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={DINAMO_LOGO_URL}
          alt="Dinamo Tbilisi"
          className="h-full w-full object-contain brightness-0 invert"
        />
      </div>
    </Link>
  );
}
