"use client";

import { Wrapper } from "@/src/components/shared/wrapper";
import { HeroBackground } from "../hero/HeroBackground";
import { HeroContent } from "../hero/HeroContent";
import { HeroImage } from "../hero/HeroImage";
import { useHeroImages } from "../../hook/useHeroImages";

export function Hero() {
  const heroImages = useHeroImages();

  return (
    <section className="relative w-full overflow-hidden bg-[#0a0e1f]">
      <HeroBackground />

      <Wrapper className="relative grid grid-cols-1 items-center gap-8 py-16 sm:gap-10 sm:py-20 lg:min-h-[85vh] lg:grid-cols-2 lg:gap-12 lg:py-0">
        <div className="min-w-0">
          <HeroContent />
        </div>
        <div className="min-w-0">
          <HeroImage images={heroImages} />
        </div>
      </Wrapper>
    </section>
  );
}
