export default function Loading() {
  return (
    <div className="mx-auto max-w-6xl p-4">
      <div className="skeleton h-10 w-48 mb-4"></div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="skeleton h-40 w-full"></div>
        ))}
      </div>
    </div>
  );
}
