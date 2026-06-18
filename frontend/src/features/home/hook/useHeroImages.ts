"use client";

import { useEffect, useState } from "react";
import { Player } from "@/src/features/squad/types";

export function useHeroImages() {
  const [heroImages, setHeroImages] = useState<string[]>([]);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/players`)
      .then((r) => r.json())
      .then((players: Player[]) => {
        const imgs = players
          .filter((p) => p.imageUrl)
          .slice(0, 8)
          .map((p) => p.imageUrl);
        setHeroImages(imgs);
      })
      .catch(() => setHeroImages([]));
  }, []);

  return heroImages;
}
