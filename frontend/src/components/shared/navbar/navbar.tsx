"use client";

import { usePathname } from "next/navigation";
import { useState, useEffect, useTransition } from "react";
import { useScrollDirection } from "@/src/components/shared/useScrollDirection";
import { resolveAuthRoutes } from "@/src/features/auth/routes";
import { Wrapper } from "@/src/components/shared/wrapper";
import { BellButton } from "./notifications/BellButton";
import { Logo } from "./components/Logo";
import { DesktopNav } from "./components/DesktopNav";
import { MobileNav } from "./components/MobileNav";
import { MobileMenuButton } from "./components/MobileMenuButton";
import { AuthAction } from "./components/AuthAction";

export const Header = () => {
  const pathname = usePathname();
  const authRoutes = resolveAuthRoutes(pathname);
  const visible = useScrollDirection();
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [, startTransition] = useTransition();

  useEffect(() => {
    const checkAuth = () =>
      setIsLoggedIn(!!localStorage.getItem("access_token"));
    checkAuth();
    window.addEventListener("storage", checkAuth);
    window.addEventListener("auth-change", checkAuth);
    return () => {
      window.removeEventListener("storage", checkAuth);
      window.removeEventListener("auth-change", checkAuth);
    };
  }, []);

  useEffect(() => {
    startTransition(() => setMenuOpen(false));
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <>
      <header
        className={`fixed left-0 top-0 z-50 w-full border-b border-white/6 bg-[#0a0e1f] transition-transform duration-300 ease-in-out ${
          visible ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <Wrapper className="flex h-14 items-center justify-between">
          <Logo />
          <DesktopNav pathname={pathname} />

          <div className="flex shrink-0 items-center gap-4">
            <BellButton isLoggedIn={isLoggedIn} />
            <AuthAction isLoggedIn={isLoggedIn} loginHref={authRoutes.login} />
            <MobileMenuButton
              menuOpen={menuOpen}
              onToggle={() => setMenuOpen((v) => !v)}
            />
          </div>
        </Wrapper>
      </header>

      <MobileNav
        menuOpen={menuOpen}
        pathname={pathname}
        isLoggedIn={isLoggedIn}
        loginHref={authRoutes.login}
        onClose={() => setMenuOpen(false)}
      />
    </>
  );
};
