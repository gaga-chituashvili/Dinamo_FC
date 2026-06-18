import { Hero } from "@/src/features/home/components/Hero";
import { NextMatch } from "@/src/features/home/components/NextMatch";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      <Hero />
      <NextMatch />
    </div>
  );
}
