"use client";

import { useEffect, useState } from "react";
import { Wrapper } from "./wrapper";
import { FooterBrand } from "./footer/FooterBrand";
import { FooterLinks } from "./footer/FooterLinks";
import { FooterSponsors } from "./footer/FooterSponsors";
import { FooterBottom } from "./footer/FooterBottom";
import { fetchSponsors } from "@/src/features/sponsors/services/sponsors.service";
import type { Sponsor } from "@/src/features/sponsors/types/sponsors.types";

export function Footer() {
  const [sponsors, setSponsors] = useState<Sponsor[]>([]);

  useEffect(() => {
    fetchSponsors()
      .then(setSponsors)
      .catch((err) => console.error("sponsors fetch error:", err));
  }, []);

  return (
    <footer className="relative overflow-hidden bg-[#0a0e1f]">
      <div
        className="pointer-events-none absolute inset-0 -z-10"
        aria-hidden="true"
      >
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage:
              "radial-gradient(circle, rgba(165,180,252,0.12) 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />
      </div>

      <Wrapper className="relative py-20">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1.5fr_1fr_1fr] lg:gap-10">
          <FooterBrand />
          <FooterLinks />
        </div>
        <FooterSponsors sponsors={sponsors} />
      </Wrapper>

      <FooterBottom />
    </footer>
  );
}
