export default function Loading() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-6">
      <div className="skeleton h-4 w-48 font-bold text-2xl">Laoding...</div>
      <div className="mt-4 flex items-center justify-between gap-4 rounded-2xl border border-green-100 bg-white p-5">
        <div className="flex items-center gap-4">
          <div className="skeleton h-16 w-16 rounded-2xl"></div>
          <div className="space-y-2">
            <div className="skeleton h-6 w-40"></div>
            <div className="skeleton h-3 w-28"></div>
            <div className="skeleton h-3 w-52"></div>
          </div>
        </div>
        <div className="skeleton h-24 w-32 rounded-xl"></div>
      </div>
      <div className="mt-4 rounded-2xl border border-green-100 bg-white p-5">
        <div className="skeleton h-5 w-36"></div>
        <div className="mt-3 grid gap-3 sm:grid-cols-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="skeleton h-24 w-full rounded-xl"></div>
          ))}
        </div>
        <div className="mt-6 space-y-2">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="skeleton h-9 w-full"></div>
          ))}
        </div>
      </div>
    </div>
  );
}
