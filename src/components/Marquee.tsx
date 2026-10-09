import type { Product } from "../types";
import { formatPrice, formatUnit, getChangeBadge } from "../lib/utils";

function TickerItem({ product }: { product: Product }) {
  const badge = getChangeBadge(product.change);
  const textColor =
    badge.dir === "up"
      ? "text-green-600"
      : badge.dir === "down"
        ? "text-red-600"
        : "text-gray-500";

  return (
    <span className="mx-5 inline-flex items-center gap-2 whitespace-nowrap text-sm">
      <span className="text-lg">{product.image}</span>
      <span className="font-medium">{product.nameBn}</span>
      <span className="text-base-content/70">
        {formatPrice(product.today)} টাকা/
        {formatUnit(product.unit).replace("প্রতি ", "")}
      </span>
      <span className={`font-semibold ${textColor}`}>{badge.label}</span>
    </span>
  );
}

export default function Marquee({ products }: { products: Product[] }) {
  return (
    <div className="overflow-hidden border-b border-base-300 bg-base-200 py-2">
      <style>{`
        @keyframes marquee-scroll {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
      `}</style>

      <div
        className="flex w-max"
        style={{ animation: "marquee-scroll 35s linear infinite" }}
      >
        {[0, 1].map((n) => (
          <div key={n} className="flex shrink-0" aria-hidden={n === 1}>
            {products.map((p) => (
              <TickerItem key={`${n}-${p.id}`} product={p} />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
