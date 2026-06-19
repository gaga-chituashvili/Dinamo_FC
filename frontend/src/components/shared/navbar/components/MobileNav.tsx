import Link from "next/link";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/src/components/ui/accordion";
import { NAV_ITEMS, NavItem } from "../navbar-links";
import { AuthAction } from "./AuthAction";

interface Props {
  menuOpen: boolean;
  pathname: string;
  isLoggedIn: boolean;
  loginHref: string;
  onClose: () => void;
}

export function MobileNav({
  menuOpen,
  pathname,
  isLoggedIn,
  loginHref,
  onClose,
}: Props) {
  const isItemActive = (item: NavItem) =>
    pathname === item.href || item.children?.some((c) => c.href === pathname);

  return (
    <>
      <div
        className={`fixed inset-0 z-40 bg-black/60 backdrop-blur-sm transition-opacity duration-300 lg:hidden ${
          menuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
      />

      <div
        className={`fixed left-0 top-14 z-40 flex h-[calc(100dvh-3.5rem)] w-full max-w-sm flex-col border-r border-white/6 bg-[#0a0e1f] transition-transform duration-300 ease-in-out lg:hidden ${
          menuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <nav className="flex flex-1 flex-col overflow-y-auto">
          {NAV_ITEMS.map((item, i) =>
            item.children ? (
              <Accordion
                key={item.label}
                type="single"
                collapsible
                className="border-b border-white/6"
                style={{ transitionDelay: menuOpen ? `${i * 40}ms` : "0ms" }}
              >
                <AccordionItem value={item.label} className="border-none">
                  <AccordionTrigger
                    className={`px-6 py-4 text-sm font-bold tracking-widest uppercase transition-all duration-300 hover:no-underline ${
                      menuOpen
                        ? "translate-x-0 opacity-100"
                        : "-translate-x-4 opacity-0"
                    } ${isItemActive(item) ? "text-[#a5b4fc]" : "text-[#8b8d9e] hover:text-white"}`}
                  >
                    {item.label}
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-2">
                    <div className="flex flex-col">
                      {item.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          className={`py-3 text-xs font-bold tracking-widest uppercase transition-colors ${
                            pathname === child.href
                              ? "text-[#a5b4fc]"
                              : "text-[#8b8d9e] hover:text-white"
                          }`}
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            ) : (
              <Link
                key={item.label}
                href={item.href}
                style={{ transitionDelay: menuOpen ? `${i * 40}ms` : "0ms" }}
                className={`border-b border-white/6 px-6 py-4 text-sm font-bold tracking-widest uppercase transition-all duration-300 ${
                  menuOpen
                    ? "translate-x-0 opacity-100"
                    : "-translate-x-4 opacity-0"
                } ${pathname === item.href ? "text-[#a5b4fc]" : "text-[#8b8d9e] hover:bg-white/5 hover:text-white"}`}
              >
                {item.label}
              </Link>
            ),
          )}
        </nav>

        <div
          className={`p-6 transition-all duration-300 delay-300 ${menuOpen ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`}
        >
          <AuthAction
            isLoggedIn={isLoggedIn}
            loginHref={loginHref}
            variant="mobile"
          />
        </div>
      </div>
    </>
  );
}
