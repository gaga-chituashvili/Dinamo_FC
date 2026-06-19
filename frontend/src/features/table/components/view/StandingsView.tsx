import { Wrapper } from "@/src/components/shared/wrapper";
import { StandingsTable } from "../StandingsTable";
import { TopScorersSection } from "../TopScorersSection";

export function StandingsView() {
  return (
    <div className="min-h-screen bg-[#0a0e1f]">
      <div
        className="pointer-events-none fixed inset-0 -z-10 opacity-30"
        aria-hidden="true"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(165,180,252,0.12) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      <div className="border-b border-white/6">
        <Wrapper className="py-12">
          <p className="mb-2 text-xs font-bold tracking-[0.2em] text-[#a5b4fc]">
            სეზონი {new Date().getFullYear()}
          </p>
          <h1 className="text-3xl font-black italic text-white md:text-5xl">
            სატურნირო ცხრილი
          </h1>
          <div className="mt-3 h-px w-12 bg-[#a5b4fc]" />
          <p className="mt-4 max-w-lg text-sm leading-relaxed text-[#8b8d9e]">
            თვალი ადევნეთ თბილისის დინამოს სვლას ჩემპიონობისკენ. მიმდინარე
            სეზონის დეტალური სტატისტიკა და სატურნირო მდგომარეობა.
          </p>
        </Wrapper>
      </div>

      <Wrapper className="py-12">
        <StandingsTable />

        <div className="mt-4 flex flex-wrap items-center gap-6 text-xs text-[#6b6f8c]">
          <div className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-[#a5b4fc]" />
            <span>დინამო თბილისი</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-emerald-400" />
            <span>ჩემპიონთა ლიგის საკვალიფიკაციო</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-red-400" />
            <span>დაქვეითება</span>
          </div>
        </div>

        <div className="my-16 flex items-center gap-6">
          <span className="h-px flex-1 bg-white/6" />
          <span className="text-xs font-bold tracking-[0.2em] text-[#a5b4fc]">
            სტატისტიკა
          </span>
          <span className="h-px flex-1 bg-white/6" />
        </div>

        <TopScorersSection />
      </Wrapper>
    </div>
  );
}
