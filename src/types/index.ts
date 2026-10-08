export type PriceDir = "up" | "down" | "flat";

export interface PriceChange {
  dir: PriceDir;
  pct: number;
}

export interface MarketPrice {
  market: string;
  division: string;
  min: number;
  max: number;
}

export interface Product {
  id: number;
  slug: string;
  nameBn: string;
  category: string;
  categoryNameBn: string;
  categoryIcon: string;
  unit: string; // "kg" ইত্যাদি, বাংলা লেবেল পরে বানাব
  image: string; // emoji
  today: number;
  yesterday: number;
  lastWeek: number;
  lastMonth: number;
  change: PriceChange;
  markets: MarketPrice[];
}
export interface Category {
  id: string;
  slug: string;
  nameBn: string;
  icon: string;
}
