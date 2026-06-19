import { TitleCard } from "../types/titles.types";
import { parseTitleLabel } from "../utils/titles.utils";

interface Props {
  titles: TitleCard[];
}

export function TitlesStats({ titles }: Props) {
  const championTitle = titles.find((t) => t.title.includes("ჩემპიონი - "));
  const championCount = championTitle
    ? parseTitleLabel(championTitle.title).count
    : null;

  const europeanCount = titles.filter(
    (t) =>
      t.title.includes("მფლობელთა თასის მფლობელი") ||
      t.title.includes("თანამეგობრობის თასი"),
  ).length;

  const founded = 1925;
  const yearsActive = new Date().getFullYear() - founded;

  const stats = [
    {
      value: championCount ? `${championCount}` : "—",
      label: "საქართველოს ჩემპიონი",
    },
    { value: `${europeanCount}`, label: "ევროპული თასი" },
    { value: `${yearsActive}+`, label: "წლიანი ისტორია" },
  ];

  return (
    <div className="mt-12 bg-[#a5b4fc] py-10">
      <div className="mx-auto flex max-w-4xl flex-wrap justify-around gap-6 px-4 text-center">
        {stats.map((stat) => (
          <div key={stat.label} className="min-w-22.5 flex-1">
            <span className="block text-3xl font-black text-[#0a0e1f] sm:text-4xl">
              {stat.value}
            </span>
            <span className="mt-1 block text-[10px] font-bold tracking-widest text-[#1a1f3a] uppercase sm:text-xs">
              {stat.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
