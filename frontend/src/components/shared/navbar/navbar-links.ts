import { NAV_ROUTES } from "@/src/components/shared/routes";

export const NAV_ITEMS = [
  { label: "HOME", href: NAV_ROUTES.home },
  { label: "NEWS", href: NAV_ROUTES.news },
  { label: "TABLE", href: NAV_ROUTES.table },
  { label: "TEAM", href: NAV_ROUTES.team },
  // { label: "TICKETS", href: NAV_ROUTES.tickets },
  // { label: "SHOP", href: NAV_ROUTES.shop },
  { label: "CONTACT", href: NAV_ROUTES.contact },
  { label: "HISTORY", href: NAV_ROUTES.history },
] as const;
