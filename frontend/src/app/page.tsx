import { Hero } from "@/src/features/home/components/view/Hero";
import { NextMatch } from "@/src/features/home/components/view/NextMatch";
import { LeagueOverview } from "@/src/features/home/components/view/LeagueOverview";
import { NewsSection } from "@/src/features/home/components/view/NewsSection";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      <Hero />
      <NextMatch />
      <LeagueOverview />
      <NewsSection />
    </div>
  );
}
