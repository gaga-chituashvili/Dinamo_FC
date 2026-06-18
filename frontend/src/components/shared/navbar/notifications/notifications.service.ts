export interface NewsItem {
  title: string;
  url: string;
  image: string | null;
}

const NEWS_SEEN_KEY = "news_seen_count";
const PREVIEW_COUNT = 3;

export async function fetchLatestNews(): Promise<NewsItem[]> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/players/news`,
  );
  if (!res.ok) throw new Error(`Failed to fetch news: ${res.status}`);
  const data: NewsItem[] = await res.json();
  return data.slice(0, PREVIEW_COUNT);
}

export async function fetchNewsCount(): Promise<number> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/players/news`,
  );
  if (!res.ok) return 0;
  const data: NewsItem[] = await res.json();
  return data.length;
}

export function getSeenCount(): number {
  return parseInt(localStorage.getItem(NEWS_SEEN_KEY) ?? "0");
}

export function setSeenCount(count: number): void {
  localStorage.setItem(NEWS_SEEN_KEY, String(count));
}
