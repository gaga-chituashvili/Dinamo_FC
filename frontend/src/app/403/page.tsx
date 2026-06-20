"use client";

import { motion, useReducedMotion } from "framer-motion";

export default function ForbiddenPage() {
  const reduceMotion = useReducedMotion();

  return (
    <div className="relative flex h-screen flex-col items-center justify-center overflow-hidden bg-[#0a0e1f] px-6 text-center">
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 h-120 w-120 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#a5b4fc]/6 blur-[120px]"
      />

      <motion.div
        aria-hidden
        initial={reduceMotion ? { scaleX: 1 } : { scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        style={{ transformOrigin: "left" }}
        className="absolute top-1/2 h-px w-full -translate-y-22 bg-linear-to-r from-transparent via-white/10 to-transparent"
      />

      <div className="relative flex flex-col items-center">
        <motion.div
          initial={reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mb-7"
        >
          <svg
            width="64"
            height="84"
            viewBox="0 0 64 84"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <line
              x1="14"
              y1="6"
              x2="14"
              y2="80"
              stroke="#4a4f6e"
              strokeWidth="2"
            />
            <motion.path
              d="M14 8 L54 16 L42 24 L54 32 L14 38 Z"
              fill="#e0445c"
              initial={false}
              animate={
                reduceMotion
                  ? {}
                  : {
                      d: [
                        "M14 8 L54 16 L42 24 L54 32 L14 38 Z",
                        "M14 8 L52 14 L41 24 L52 34 L14 38 Z",
                        "M14 8 L54 16 L42 24 L54 32 L14 38 Z",
                      ],
                    }
              }
              transition={
                reduceMotion
                  ? undefined
                  : { duration: 2.4, repeat: Infinity, ease: "easeInOut" }
              }
            />
            <ellipse
              cx="14"
              cy="80"
              rx="7"
              ry="2"
              fill="white"
              fillOpacity="0.06"
            />
          </svg>
        </motion.div>

        <motion.span
          initial={reduceMotion ? { opacity: 1 } : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mb-3 text-xs font-bold tracking-[0.3em] text-[#e0445c] uppercase"
        >
          ოფსაიდი
        </motion.span>

        <motion.h1
          initial={reduceMotion ? { opacity: 1 } : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.55 }}
          className="text-7xl font-bold tracking-tight text-white sm:text-8xl"
        >
          403
        </motion.h1>

        <motion.p
          initial={reduceMotion ? { opacity: 1 } : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-4 max-w-xs text-sm text-[#4a4f6e]"
        >
          ეს უბანი მხოლოდ ადმინისთვისაა გახსნილი. შენი პოზიცია თამაშგარეა.
        </motion.p>

        <motion.a
          href="/login"
          initial={reduceMotion ? { opacity: 1 } : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.7 }}
          className="mt-8 rounded-full border border-[#a5b4fc]/30 px-6 py-2.5 text-xs font-bold tracking-widest text-[#a5b4fc] uppercase transition-colors hover:border-[#a5b4fc] hover:bg-[#a5b4fc]/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#a5b4fc]"
        >
          შესვლა
        </motion.a>
      </div>
    </div>
  );
}
