export default function ProductSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="card border border-base-300 bg-base-100 p-4 shadow-sm"
        >
          <div className="skeleton h-10 w-10 rounded-full"></div>
          <div className="skeleton mt-3 h-5 w-3/4"></div>
          <div className="skeleton mt-2 h-4 w-1/3"></div>
          <div className="skeleton mt-4 h-6 w-1/2"></div>
        </div>
      ))}
    </div>
  );
}
