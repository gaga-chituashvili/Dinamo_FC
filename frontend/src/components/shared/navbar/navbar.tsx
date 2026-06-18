"use client";

import { Menu, User, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect, useTransition } from "react";
import { useScrollDirection } from "@/src/components/shared/useScrollDirection";
import { NAV_ROUTES } from "@/src/components/shared/routes";
import { resolveAuthRoutes } from "@/src/features/auth/routes";
import { NAV_ITEMS } from "./navbar-links";
import { Wrapper } from "@/src/components/shared/wrapper";
import { BellButton } from "./notifications/BellButton";
import { DINAMO_LOGO_URL } from "../footer/footer.constants";

export const Header = () => {
  const pathname = usePathname();
  const authRoutes = resolveAuthRoutes(pathname);
  const visible = useScrollDirection();
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [, startTransition] = useTransition();

  useEffect(() => {
    const checkAuth = () => {
      setIsLoggedIn(!!localStorage.getItem("access_token"));
    };
    checkAuth();
    window.addEventListener("storage", checkAuth);
    window.addEventListener("auth-change", checkAuth);
    return () => {
      window.removeEventListener("storage", checkAuth);
      window.removeEventListener("auth-change", checkAuth);
    };
  }, []);

  useEffect(() => {
    startTransition(() => {
      setMenuOpen(false);
    });
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const linkClass = (href: string) =>
    `px-5 h-14 flex items-center text-sm font-bold uppercase tracking-widest transition-colors duration-200 border-b-2 ${
      pathname === href
        ? "border-[#a5b4fc] text-[#a5b4fc]"
        : "border-transparent text-[#8b8d9e] hover:text-white"
    }`;

  const authButtonClass =
    "hidden h-10 items-center gap-2 border border-[#a5b4fc]/40 px-6 text-xs font-bold tracking-widest text-[#c7cbf5] transition-all duration-200 hover:border-[#a5b4fc] hover:text-white sm:flex cursor-pointer";

  return (
    <>
      <header
        className={`fixed left-0 top-0 z-50 w-full border-b border-white/6 bg-[#0a0e1f] transition-transform duration-300 ease-in-out ${
          visible ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <Wrapper className="flex h-14 items-center justify-between">
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

          <nav className="hidden lg:block">
            <ul className="m-0 flex list-none items-center p-0">
              {NAV_ITEMS.map((item) => (
                <li key={item.label}>
                  <Link href={item.href} className={linkClass(item.href)}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex shrink-0 items-center gap-4">
            <BellButton isLoggedIn={isLoggedIn} />

            {isLoggedIn ? (
              <Link href="/profile" className={authButtonClass}>
                <User className="h-3.5 w-3.5" />
                PROFILE
              </Link>
            ) : (
              <Link href={authRoutes.login} className={authButtonClass}>
                LOGIN
              </Link>
            )}

            <button
              className="relative flex h-8 w-8 items-center justify-center text-[#8b8d9e] transition-colors hover:text-white lg:hidden cursor-pointer"
              onClick={() => setMenuOpen((v) => !v)}
              aria-label="Toggle menu"
            >
              <span
                className={`absolute transition-all duration-300 ${menuOpen ? "rotate-0 opacity-100" : "rotate-90 opacity-0"}`}
              >
                <X className="h-5 w-5" />
              </span>
              <span
                className={`absolute transition-all duration-300 ${menuOpen ? "-rotate-90 opacity-0" : "rotate-0 opacity-100"}`}
              >
                <Menu className="h-5 w-5" />
              </span>
            </button>
          </div>
        </Wrapper>
      </header>

      <div
        className={`fixed inset-0 z-40 bg-black/60 backdrop-blur-sm transition-opacity duration-300 lg:hidden ${
          menuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setMenuOpen(false)}
      />

      <div
        className={`fixed left-0 top-14 z-40 flex h-[calc(100dvh-3.5rem)] w-full max-w-sm flex-col border-r border-white/6 bg-[#0a0e1f] transition-transform duration-300 ease-in-out lg:hidden ${
          menuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <nav className="flex flex-1 flex-col overflow-y-auto">
          {NAV_ITEMS.map((item, i) => (
            <Link
              key={item.label}
              href={item.href}
              style={{ transitionDelay: menuOpen ? `${i * 40}ms` : "0ms" }}
              className={`border-b border-white/6 px-6 py-4 text-sm font-bold uppercase tracking-widest transition-all duration-300 ${
                menuOpen
                  ? "translate-x-0 opacity-100"
                  : "-translate-x-4 opacity-0"
              } ${
                pathname === item.href
                  ? "text-[#a5b4fc]"
                  : "text-[#8b8d9e] hover:bg-white/5 hover:text-white"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div
          className={`p-6 transition-all duration-300 delay-300 ${menuOpen ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`}
        >
          {isLoggedIn ? (
            <Link
              href="/profile"
              className="flex h-11 w-full items-center justify-center gap-2 border border-[#a5b4fc]/40 text-xs font-bold tracking-widest text-[#c7cbf5] transition-all duration-200 hover:border-[#a5b4fc] hover:text-white cursor-pointer"
            >
              <User className="h-3.5 w-3.5" />
              PROFILE
            </Link>
          ) : (
            <Link
              href={authRoutes.login}
              className="flex h-11 w-full items-center justify-center border border-[#a5b4fc]/40 text-xs font-bold tracking-widest text-[#c7cbf5] transition-all duration-200 hover:border-[#a5b4fc] hover:text-white cursor-pointer"
            >
              LOGIN
            </Link>
          )}
        </div>
      </div>
    </>
  );
};
