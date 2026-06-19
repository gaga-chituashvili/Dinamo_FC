export function parseTitleLabel(title: string): {
  label: string;
  count: number | null;
} {
  const match = title.match(/^(.*?)\s*-\s*(\d+)$/);
  if (!match) return { label: title, count: null };

  return { label: match[1].trim(), count: parseInt(match[2], 10) };
}

export function pickFeaturedTitle(titles: TitleCardWithIndex[]) {
  const europeanCup = titles.find((t) =>
    t.title.includes("მფლობელთა თასის მფლობელი"),
  );
  if (europeanCup) return europeanCup;

  const oneOff = titles.find((t) => parseTitleLabel(t.title).count === null);
  if (oneOff) return oneOff;

  return titles[0];
}

interface TitleCardWithIndex {
  title: string;
  image: string | null;
  details: string[];
}
