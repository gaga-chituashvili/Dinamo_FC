"use client";

import {
  SeasonProgress as SeasonProgressType,
  OnThisDayMatch,
} from "../../types/stats.types";
import { OnThisDay } from "../OnThisDay";
import { HeadToHead } from "../HeadToHead";
import { SeasonProgress } from "../SeasonProgress";
import { Wrapper } from "@/src/components/shared/wrapper";

interface Props {
  seasonProgress: SeasonProgressType;
  opponents: string[];
  onThisDay: OnThisDayMatch[];
}

function SectionHeader({ title }: { title: string }) {
  return (
    <div className="flex items-center gap-3 mb-4">
      <span className="w-px h-5 bg-[#a5b4fc]" />
      <p className="text-[11px] font-semibold tracking-[0.15em] uppercase text-[#6b6f8c]">
        {title}
      </p>
    </div>
  );
}

export function StatsView({ seasonProgress, opponents, onThisDay }: Props) {
  return (
    <Wrapper className="py-10 space-y-14">
      <div>
        <p className="text-[10px] font-semibold tracking-[0.15em] uppercase text-[#4a4f6e] mb-1">
          სტატისტიკა
        </p>
        <h1 className="text-3xl font-black text-white">
          დინამო <span className="text-[#a5b4fc]">სტატისტიკა</span>
        </h1>
      </div>
      <section>
        <SectionHeader title="ამ დღეს ისტორიაში" />
        <OnThisDay matches={onThisDay} />
      </section>
      <section>
        <SectionHeader title="თავი თავში" />
        <HeadToHead opponents={opponents} />
      </section>
      <section>
        <SectionHeader title="სეზონის პროგრესი" />
        <SeasonProgress data={seasonProgress} />
      </section>
    </Wrapper>
  );
}
