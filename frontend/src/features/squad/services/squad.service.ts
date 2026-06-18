import { api } from "@/src/lib/api";
import type { Player } from "../types";

export const squadService = {
  getPlayers(): Promise<Player[]> {
    return api<Player[]>("/api/players");
  },
};
