import type { Variants } from "framer-motion";

export const heroStagger: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.15,
    },
  },
};

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

export const imageReveal: Variants = {
  hidden: { opacity: 0, scale: 1.08, x: 60 },
  visible: {
    opacity: 1,
    scale: 1,
    x: 0,
    transition: { duration: 1, ease: [0.22, 1, 0.36, 1] },
  },
};

// Diagonal light-streak overlay fades in after the image.
export const streakDrift: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 1.2, delay: 0.5, ease: "easeOut" },
  },
};

// Soft ambient glow behind the heading.
export const glowPulse: Variants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 0.5,
    scale: 1,
    transition: { duration: 1.4, ease: "easeOut" },
  },
};
