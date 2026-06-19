import { TitleCard as TitleCardType } from "../types/titles.types";
import { TitleCard } from "./TitleCard";

interface Props {
  titles: TitleCardType[];
}

export function TitlesGrid({ titles }: Props) {
  return (
    <div className="grid grid-cols-1 gap-4 px-4 sm:grid-cols-2 sm:px-6 lg:grid-cols-3">
      {titles.map((title) => (
        <TitleCard key={title.title} title={title} />
      ))}
    </div>
  );
}
