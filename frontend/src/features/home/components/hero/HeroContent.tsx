"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { HERO_CONTENT } from "./hero.constants";
import { HeroBadge } from "./HeroBadge";
import { fadeUp, heroStagger } from "./hero.animations";

export function HeroContent() {
  return (
    <motion.div
      variants={heroStagger}
      initial="hidden"
      animate="visible"
      className="relative z-10 flex min-w-0 flex-col gap-5 sm:gap-6"
    >
      <HeroBadge label={HERO_CONTENT.badge} />

      <motion.h1
        variants={fadeUp}
        className="wrap-break-word text-4xl font-black italic leading-tight sm:text-5xl sm:leading-[0.95] md:text-6xl lg:text-5xl xl:text-7xl"
      >
        <span className="block text-[#a5b4fc]">
          {HERO_CONTENT.titleLines[0]}
        </span>
        <span className="block text-white">{HERO_CONTENT.titleLines[1]}</span>
      </motion.h1>

      <motion.p
        variants={fadeUp}
        className="max-w-md text-sm leading-relaxed text-[#a3a8c4] sm:text-base lg:text-lg"
      >
        {HERO_CONTENT.description}
      </motion.p>

      <motion.div
        variants={fadeUp}
        className="flex flex-wrap items-center gap-3 pt-2 sm:gap-4"
      >
        <Link
          href={HERO_CONTENT.primaryCta.href}
          className="cursor-pointer bg-[#a5b4fc] px-6 py-3.5 text-xs font-bold tracking-widest text-[#0a0e1f] transition-transform duration-200 hover:scale-[1.03] sm:px-8 sm:py-4"
        >
          {HERO_CONTENT.primaryCta.label}
        </Link>
        <Link
          href={HERO_CONTENT.secondaryCta.href}
          className="cursor-pointer border border-white/20 px-6 py-3.5 text-xs font-bold tracking-widest text-white transition-colors duration-200 hover:border-white hover:bg-white/5 sm:px-8 sm:py-4"
        >
          {HERO_CONTENT.secondaryCta.label}
        </Link>
      </motion.div>
    </motion.div>
  );
}
