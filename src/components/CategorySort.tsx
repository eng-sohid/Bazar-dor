"use client";

import { useMemo, useState } from "react";
import type { Product } from "../types";
import ProductCard from "./ProductCard";
import { parseBengaliNumber } from "../lib/utils";

type SortKey = "default" | "asc" | "desc";

export default function CategorySort({ products }: { products: Product[] }) {
  const [sort, setSort] = useState<SortKey>("default");

  const sorted = useMemo(() => {
    const list = [...products];
    if (sort === "asc")
      list.sort(
        (a, b) => parseBengaliNumber(a.today) - parseBengaliNumber(b.today),
      );
    if (sort === "desc")
      list.sort(
        (a, b) => parseBengaliNumber(b.today) - parseBengaliNumber(a.today),
      );
    return list;
  }, [products, sort]);

  return (
    <>
      <div className="mt-4 flex items-center gap-2">
        <label htmlFor="sort" className="text-sm font-medium">
          সাজান:
        </label>
        <select
          id="sort"
          value={sort}
          onChange={(e) => setSort(e.target.value as SortKey)}
          className="select select-bordered select-sm sm:select-md"
        >
          <option value="default">ডিফল্ট</option>
          <option value="asc">দাম: কম থেকে বেশি</option>
          <option value="desc">দাম: বেশি থেকে কম</option>
        </select>
      </div>

      <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {sorted.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </>
  );
}
