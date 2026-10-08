import type { Product } from "../types";
import ProductCard from "./ProductCard";

export default function ProductSection({
  id,
  title,
  subtitle,
  products,
}: {
  id?: string;
  title: string;
  subtitle?: string;
  products: Product[];
}) {
  return (
    <section id={id} className="mx-auto max-w-6xl scroll-mt-4 px-4 pt-10">
      <h2 className="text-xl font-bold">{title}</h2>
      {subtitle && (
        <p className="mt-1 text-sm text-base-content/60">{subtitle}</p>
      )}
      <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </section>
  );
}
