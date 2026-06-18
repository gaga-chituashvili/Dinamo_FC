"use client";

import { useEffect, useState } from "react";
import type { CountdownTime } from "@/src/features/home/types/next-match.types";

const EMPTY: CountdownTime = { days: 0, hours: 0, minutes: 0, seconds: 0 };

export function useCountdown(target: Date | null): CountdownTime {
  const [timeLeft, setTimeLeft] = useState<CountdownTime>(EMPTY);

  useEffect(() => {
    if (!target) return;

    const tick = () => {
      const diff = target.getTime() - Date.now();
      if (diff <= 0) {
        setTimeLeft(EMPTY);
        return;
      }
      setTimeLeft({
        days: Math.floor(diff / 86400000),
        hours: Math.floor((diff % 86400000) / 3600000),
        minutes: Math.floor((diff % 3600000) / 60000),
        seconds: Math.floor((diff % 60000) / 1000),
      });
    };

    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [target]);

  return timeLeft;
}
