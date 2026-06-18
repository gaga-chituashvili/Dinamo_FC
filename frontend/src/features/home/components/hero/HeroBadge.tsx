"use client";

import { motion } from "framer-motion";
import { fadeUp } from "./hero.animations";

interface HeroBadgeProps {
  label: string;
}

export function HeroBadge({ label }: HeroBadgeProps) {
  return (
    <motion.div
      variants={fadeUp}
      className="inline-flex w-fit max-w-full -skew-x-6 items-center bg-[#1c2142] px-3 py-1.5 sm:px-4"
    >
      <span className="skew-x-6 whitespace-nowrap text-[10px] font-bold italic tracking-[0.15em] text-[#a5b4fc] sm:text-xs sm:tracking-[0.2em]">
        {label}
      </span>
    </motion.div>
  );
}
