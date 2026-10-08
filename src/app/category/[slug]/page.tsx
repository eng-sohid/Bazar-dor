import Link from "next/link";
import { notFound } from "next/navigation";
import { getCategories, getProducts } from "../../../lib/api";
import CategorySort from "../../../components/CategorySort";

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const categories = await getCategories();
  const category = categories.find((c) => c.slug === slug);
  if (!category) notFound();

  const products = await getProducts(slug);

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <h1 className="text-2xl font-bold">
        {category.icon} {category.nameBn}
      </h1>

      {products.length === 0 ? (
        <div className="py-16 text-center">
          <p className="text-lg">এই ক্যাটাগরিতে কোনো পণ্য নেই।</p>
          <Link href="/" className="btn btn-primary mt-4">
            হোম পেজে ফিরে যান
          </Link>
        </div>
      ) : (
        <CategorySort products={products} />
      )}
    </div>
  );
}
