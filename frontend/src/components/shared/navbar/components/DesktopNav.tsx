import Link from "next/link";
import { ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/src/components/ui/dropdown-menu";
import { NAV_ITEMS, NavItem } from "../navbar-links";

interface Props {
  pathname: string;
}

export function DesktopNav({ pathname }: Props) {
  const isItemActive = (item: NavItem) =>
    pathname === item.href || item.children?.some((c) => c.href === pathname);

  const linkClass = (href: string) =>
    `px-5 h-14 flex items-center text-sm font-bold uppercase tracking-widest transition-colors duration-200 border-b-2 ${
      pathname === href
        ? "border-[#a5b4fc] text-[#a5b4fc]"
        : "border-transparent text-[#8b8d9e] hover:text-white"
    }`;

  return (
    <nav className="hidden lg:block">
      <ul className="m-0 flex list-none items-center p-0">
        {NAV_ITEMS.map((item) =>
          item.children ? (
            <li key={item.label}>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button
                    className={`flex h-14 cursor-pointer items-center gap-1 border-b-2 px-5 text-sm font-bold tracking-widest uppercase outline-none transition-colors duration-200 focus:outline-none focus-visible:outline-none ${
                      isItemActive(item)
                        ? "border-[#a5b4fc] text-[#a5b4fc]"
                        : "border-transparent text-[#8b8d9e] hover:text-white"
                    }`}
                  >
                    {item.label}
                    <ChevronDown className="h-3 w-3" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="start"
                  className="min-w-[180px] border border-white/10 bg-[#10142a] p-1"
                >
                  {item.children.map((child) => (
                    <DropdownMenuItem key={child.href} asChild>
                      <Link
                        href={child.href}
                        className="cursor-pointer rounded-sm px-3 py-2 text-xs font-bold tracking-widest text-[#8b8d9e] uppercase transition-colors hover:bg-white/5 hover:text-[#a5b4fc] focus:bg-white/5 focus:text-[#a5b4fc]"
                      >
                        {child.label}
                      </Link>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </li>
          ) : (
            <li key={item.label}>
              <Link href={item.href} className={linkClass(item.href)}>
                {item.label}
              </Link>
            </li>
          ),
        )}
      </ul>
    </nav>
  );
}
