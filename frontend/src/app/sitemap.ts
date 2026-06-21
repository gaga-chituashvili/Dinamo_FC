import { MetadataRoute } from "next";
import { api } from "@/src/lib/api";
import type { Player } from "@/src/features/squad/types/squad.types";

const BASE_URL = "https://dinamo-fc.vercel.app";

const STATIC_ROUTES: Array<{
  path: string;
  priority: number;
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
}> = [
  { path: "", priority: 1, changeFrequency: "daily" },
  { path: "/news", priority: 0.8, changeFrequency: "daily" },
  { path: "/table", priority: 0.8, changeFrequency: "daily" },
  { path: "/team", priority: 0.7, changeFrequency: "weekly" },
  { path: "/live", priority: 0.6, changeFrequency: "daily" },
  { path: "/history", priority: 0.5, changeFrequency: "monthly" },
  { path: "/titles", priority: 0.5, changeFrequency: "monthly" },
  { path: "/contact", priority: 0.3, changeFrequency: "yearly" },
];

async function getPlayerRoutes(): Promise<MetadataRoute.Sitemap> {
  try {
    const players = await api<Player[]>("/api/players");
    return players.map((player) => ({
      url: `${BASE_URL}/player/${player.id}`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.4,
    }));
  } catch (error) {
    console.error(
      "sitemap: failed to fetch players, skipping player URLs",
      error,
    );
    return [];
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  const staticEntries: MetadataRoute.Sitemap = STATIC_ROUTES.map((route) => ({
    url: `${BASE_URL}${route.path}`,
    lastModified: now,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));

  const playerEntries = await getPlayerRoutes();

  return [...staticEntries, ...playerEntries];
}
