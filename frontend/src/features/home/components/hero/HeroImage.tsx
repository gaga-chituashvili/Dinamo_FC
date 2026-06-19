"use client";

import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

const SLIDE_INTERVAL = 4000;

interface HeroImageProps {
  images: string[];
}

export function HeroImage({ images }: HeroImageProps) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (images.length <= 1) return;
    const id = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, SLIDE_INTERVAL);
    return () => clearInterval(id);
  }, [images.length]);

  if (!images.length || !images[current]) return null;

  return (
    <div
      className="relative h-100 w-full overflow-hidden sm:h-105 lg:h-160"
      style={{ clipPath: "polygon(8% 0, 100% 0, 100% 100%, 0% 100%)" }}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          <Image
            src={images[current]}
            alt="დინამო თბილისი"
            fill
            priority
            className="object-cover object-top"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </motion.div>
      </AnimatePresence>

      {/* Lavender streak */}
      <div
        className="pointer-events-none absolute inset-0 z-10"
        style={{
          background:
            "linear-gradient(115deg, transparent 35%, rgba(165,180,252,0.2) 50%, transparent 65%)",
        }}
      />
      <div className="absolute inset-0 z-10 bg-linear-to-t from-[#0a0e1f] via-transparent to-transparent" />

      {/* Dots */}
      {images.length > 1 && (
        <div className="absolute bottom-4 left-1/2 z-20 flex -translate-x-1/2 gap-1.5">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`h-1 rounded-full transition-all duration-300 cursor-pointer ${
                i === current ? "w-6 bg-[#a5b4fc]" : "w-1.5 bg-white/30"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
