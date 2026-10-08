import type { PriceChange } from "../types";

const BN_DIGITS = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];

// 148 -> "১৪৮"
export function toBengaliNumber(value: number | string): string {
  return String(value).replace(/\d/g, (d) => BN_DIGITS[Number(d)]);
}

// "১,৮৫০" -> 1850
export function parseBengaliNumber(value: number | string): number {
  if (typeof value === "number") return value;
  const en = value
    .replace(/[০-৯]/g, (d) => String(BN_DIGITS.indexOf(d)))
    .replace(/,/g, "")
    .replace(/[^\d.\-]/g, "");
  const n = parseFloat(en);
  return Number.isNaN(n) ? 0 : n;
}

// 1850 -> "১,৮৫০"
export function formatPrice(value: number | string): string {
  const n = parseBengaliNumber(value);
  return toBengaliNumber(n.toLocaleString("en-US"));
}

// "kg" -> "প্রতি কেজি"
const UNIT_LABELS: Record<string, string> = {
  kg: "প্রতি কেজি",
  litre: "প্রতি লিটার",
  liter: "প্রতি লিটার",
  l: "প্রতি লিটার",
  dozen: "প্রতি ডজন",
  piece: "প্রতি পিস",
  pcs: "প্রতি পিস",
  pc: "প্রতি পিস",
};

export function formatUnit(unit: string): string {
  return UNIT_LABELS[unit.toLowerCase()] ?? `প্রতি ${unit}`;
}

// change badge: ▲ ২.১% / ▼ ২.৯% / — ০.০%
export function getChangeBadge(change: PriceChange) {
  const pct = Math.abs(change.pct);
  const dir = pct === 0 ? "flat" : change.dir;
  const symbol = dir === "up" ? "▲" : dir === "down" ? "▼" : "—";
  const label = `${symbol} ${toBengaliNumber(pct.toFixed(1))}%`;
  const color =
    dir === "up"
      ? "text-green-600 bg-green-100"
      : dir === "down"
        ? "text-red-600 bg-red-100"
        : "text-gray-600 bg-gray-100";
  return { dir, label, color };
}

// আজকের বাংলা তারিখ
export function getBengaliDate(date = new Date()): string {
  return new Intl.DateTimeFormat("bn-BD", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
}
import type { Product } from "../types";

// markets থেকে min / max / average হিসাব
export function getPriceSummary(product: Product) {
  const mins = product.markets.map((m) => m.min);
  const maxs = product.markets.map((m) => m.max);
  const mids = product.markets.map((m) => (m.min + m.max) / 2);

  const min = mins.length ? Math.min(...mins) : product.today;
  const max = maxs.length ? Math.max(...maxs) : product.today;
  const avg = mids.length
    ? Math.round(mids.reduce((a, b) => a + b, 0) / mids.length)
    : product.today;

  return { min, max, avg };
}

// বিভাগ অনুযায়ী markets সাজানো
export function groupByDivision(product: Product) {
  const map = new Map<string, Product["markets"]>();
  for (const m of product.markets) {
    map.set(m.division, [...(map.get(m.division) ?? []), m]);
  }
  return Array.from(map.entries());
}
// 65.5 -> "৬৫.৫০", 66 -> "৬৬"
export function formatDecimal(value: number): string {
  const s = Number.isInteger(value) ? String(value) : value.toFixed(2);
  return toBengaliNumber(s);
}
