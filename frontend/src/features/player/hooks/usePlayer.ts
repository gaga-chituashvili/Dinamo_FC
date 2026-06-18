import { useEffect, useState } from "react";
import { PlayerDetail } from "../types/player.types";

interface UsePlayerReturn {
  player: PlayerDetail | null;
  loading: boolean;
  error: string | null;
}

export function usePlayer(id: string): UsePlayerReturn {
  const [player, setPlayer] = useState<PlayerDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    let cancelled = false;

    async function fetchPlayer() {
      try {
        const r = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/players/${id}`,
        );
        if (!r.ok) throw new Error("მოთამაშე ვერ მოიძებნა");
        const data = await r.json();
        if (!cancelled) setPlayer(data);
      } catch (e: unknown) {
        if (!cancelled) setError(e instanceof Error ? e.message : "შეცდომა");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    fetchPlayer();

    return () => {
      cancelled = true;
    };
  }, [id]);

  return { player, loading, error };
}
