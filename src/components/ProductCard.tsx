import Link from "next/link";
import type { Product } from "../types";
import { formatPrice, formatUnit, getChangeBadge } from "../lib/utils";

export default function ProductCard({ product }: { product: Product }) {
  const badge = getChangeBadge(product.change);

  return (
    <Link
      href={`/product/${product.slug}`}
      className="card border border-base-300 bg-base-100 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
    >
      <div className="card-body gap-2 p-4">
        <div className="text-4xl">{product.image}</div>

        <h3 className="text-lg font-bold leading-tight">{product.nameBn}</h3>
        <p className="text-sm text-base-content/60">
          {formatUnit(product.unit)}
        </p>

        <div className="mt-2 flex items-end justify-between gap-2">
          <div>
            <p className="text-xs text-base-content/60">আজকের দাম</p>
            <p className="text-xl font-bold text-red-600">
              {formatPrice(product.today)} টাকা
            </p>
          </div>
          <span
            className={`rounded-full px-2 py-1 text-xs font-semibold ${badge.color}`}
          >
            {badge.label}
          </span>
        </div>
      </div>
    </Link>
  );
}
