import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Wrapper } from "@/src/components/shared/wrapper";
import { LeagueOverviewBackground } from "../league-overview/LeagueOverviewBackground";
import { SectionHeading } from "../league-overview/SectionHeading";
import { StandingsTable } from "../league-overview/standings/StandingsTable";
import { SeasonLeaders } from "../league-overview/leaders/SeasonLeaders";
import { ROUTES } from "@/src/lib/routes";

export function getCurrentSeason(): string {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth() + 1;
  const startYear = month <= 2 ? year - 1 : year - 1;
  const endYear = startYear + 1;
  return `სეზონი ${String(startYear).slice(2)}/${String(endYear).slice(2)}`;
}

export function LeagueOverview() {
  return (
    <section className="relative w-full overflow-hidden py-20 bg-[#0a0e1f]">
      <LeagueOverviewBackground />

      <Wrapper className="relative grid grid-cols-1 gap-12 lg:grid-cols-5 lg:gap-10">
        <div className="lg:col-span-3">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <SectionHeading label="ეროვნული ლიგა" title="სატურნირო ცხრილი" />
            <Link
              href={ROUTES.table}
              className="group inline-flex w-fit items-center gap-2 rounded-full border border-[#a5b4fc]/20 px-4 py-2 text-sm font-medium text-[#a5b4fc] transition-all duration-300 hover:border-[#a5b4fc]/40 hover:bg-[#a5b4fc]/5 mb-5"
            >
              სრული ცხრილი
              <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5" />
            </Link>
          </div>
          <StandingsTable />
        </div>

        <div className="lg:col-span-2">
          <SectionHeading label={getCurrentSeason()} title="სეზონის ლიდერები" />
          <SeasonLeaders />
        </div>
      </Wrapper>
    </section>
  );
}
