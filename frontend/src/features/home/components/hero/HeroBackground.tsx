"use client";

import { motion } from "framer-motion";
import { glowPulse } from "./hero.animations";

export function HeroBackground() {
  return (
    <div
      className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
      aria-hidden="true"
    >
      {/* Base navy background */}
      <div className="absolute inset-0 bg-[#0a0e1f]" />

      {/* Dot grid pattern */}
      <div
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(165,180,252,0.14) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      {/* Diagonal lighter navy panel on the right */}
      <div
        className="absolute inset-y-0 right-0 w-[65%] bg-linear-to-br from-[#161b3a] to-[#1f2554] lg:w-[55%]"
        style={{ clipPath: "polygon(18% 0, 100% 0, 100% 100%, 0% 100%)" }}
      />

      {/* Soft ambient glow behind the heading */}
      <motion.div
        variants={glowPulse}
        initial="hidden"
        animate="visible"
        className="absolute left-[5%] top-1/3 h-72 w-72 rounded-full bg-[#a5b4fc] opacity-30 blur-[120px]"
      />

      {/* Bottom vignette so the section blends into the page background */}
      <div className="absolute inset-0 bg-linear-to-t from-[#0a0e1f] via-transparent to-transparent" />
    </div>
  );
}
