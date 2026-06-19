import { Wrapper } from "@/src/components/shared/wrapper";
import { LeagueOverviewBackground } from "../league-overview/LeagueOverviewBackground";
import { SectionHeading } from "../league-overview/SectionHeading";
import { StandingsTable } from "../league-overview/standings/StandingsTable";
import { SeasonLeaders } from "../league-overview/leaders/SeasonLeaders";

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
          <SectionHeading label="ეროვნული ლიგა" title="სატურნირო ცხრილი" />
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
