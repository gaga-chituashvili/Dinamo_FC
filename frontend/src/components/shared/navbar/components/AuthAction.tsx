import Link from "next/link";
import { User } from "lucide-react";
import { ROUTES } from "@/src/lib/routes";

interface Props {
  isLoggedIn: boolean;
  loginHref: string;
  variant?: "desktop" | "mobile";
}

export function AuthAction({
  isLoggedIn,
  loginHref,
  variant = "desktop",
}: Props) {
  const baseClass =
    variant === "desktop"
      ? "hidden h-10 items-center gap-2 border border-[#a5b4fc]/40 px-6 text-xs font-bold tracking-widest text-[#c7cbf5] transition-all duration-200 hover:border-[#a5b4fc] hover:text-white sm:flex cursor-pointer"
      : "flex h-11 w-full items-center justify-center gap-2 border border-[#a5b4fc]/40 text-xs font-bold tracking-widest text-[#c7cbf5] transition-all duration-200 hover:border-[#a5b4fc] hover:text-white cursor-pointer";

  if (isLoggedIn) {
    return (
      <Link href={ROUTES.profile} className={baseClass}>
        <User className="h-3.5 w-3.5" />
        PROFILE
      </Link>
    );
  }

  return (
    <Link href={loginHref} className={baseClass}>
      LOGIN
    </Link>
  );
}
