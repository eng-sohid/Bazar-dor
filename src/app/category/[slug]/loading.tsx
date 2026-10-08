import ProductSkeleton from "../../../components/ProductSkeleton";

export default function Loading() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <div className="skeleton h-8 w-40"></div>
      <div className="mt-6">
        <ProductSkeleton />
      </div>
    </div>
  );
}
