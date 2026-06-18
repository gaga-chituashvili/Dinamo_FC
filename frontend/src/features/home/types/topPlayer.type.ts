import type { StaticImageData } from "next/image";

export type TableRow = {
  position: number;
  team: string;
  played: number;
  won: number;
  drawn: number;
  lost: number;
  goals: string;
  points: number;
  logo?: string;
  isHighlighted?: boolean;
};

export type Player = {
  id: number;
  name: string;
  position: string;
  number: number;
  image: StaticImageData;
  isFeatured?: boolean;
};

export interface NewsArticle {
  id: number;
  category: string;
  title: string;
  excerpt: string;
  image: string;
  date: string;
  featured?: boolean;
  url?: string;
}
