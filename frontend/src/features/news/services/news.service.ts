import { NewsItem } from "../types/news.types";

export async function fetchNews(): Promise<NewsItem[]> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/news`,
  );
  if (!res.ok) throw new Error(`Failed to fetch news: ${res.status}`);
  return res.json();
}
