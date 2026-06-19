import { NAV_ROUTES } from "@/src/components/shared/routes";

export interface NavItem {
  label: string;
  href: string;
  children?: { label: string; href: string }[];
}

export const NAV_ITEMS: NavItem[] = [
  { label: "HOME", href: NAV_ROUTES.home },
  { label: "NEWS", href: NAV_ROUTES.news },
  { label: "TABLE", href: NAV_ROUTES.table },
  { label: "TEAM", href: NAV_ROUTES.team },
  // { label: "TICKETS", href: NAV_ROUTES.tickets },
  // { label: "SHOP", href: NAV_ROUTES.shop },
  { label: "CONTACT", href: NAV_ROUTES.contact },
  {
    label: "CLUB",
    href: NAV_ROUTES.history,
    children: [
      { label: "HISTORY", href: NAV_ROUTES.history },
      { label: "TITLES", href: NAV_ROUTES.titles },
    ],
  },
];
