import { Hero } from "@/src/features/home/components/Hero";
import { NextMatch } from "@/src/features/home/components/NextMatch";
import { LeagueOverview } from "@/src/features/home/components/LeagueOverview";
import { NewsSection } from "@/src/features/home/components/NewsSection";

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
