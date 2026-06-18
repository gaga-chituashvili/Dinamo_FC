import Link from "next/link";
import { ColumnHeading } from "./ColumnHeading";
import { INFO_LINKS, FAN_ZONE_LINKS } from "./footer.constants";

export function FooterLinks() {
  return (
    <>
      <nav
        aria-label="ინფორმაცია"
        className="flex flex-col items-center gap-6 lg:items-start"
      >
        <ColumnHeading>ინფორმაცია</ColumnHeading>
        <ul className="flex flex-col items-center gap-4 lg:items-start">
          {INFO_LINKS.map(({ label, href }) => (
            <li key={label}>
              <Link
                href={href}
                className="text-sm text-[#8b8d9e] transition-colors duration-150 hover:text-white"
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <nav
        aria-label="ფან-ზონა"
        className="flex flex-col items-center gap-6 lg:items-start"
      >
        <ColumnHeading>ფან-ზონა</ColumnHeading>
        <ul className="flex flex-col items-center gap-4 lg:items-start">
          {FAN_ZONE_LINKS.map(({ label, href }) => (
            <li key={label}>
              <Link
                href={href}
                className="text-sm text-[#8b8d9e] transition-colors duration-150 hover:text-white"
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
}
