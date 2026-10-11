import LoadingBanner from "../components/LoadingBanner";

export default function Loading() {
  return (
    <div className="mx-auto max-w-6xl px-4 pt-5">
      <LoadingBanner fallback="আজকের দাম লোড হচ্ছে..." />
      <div className="skeleton mt-4 h-44 w-full rounded-2xl"></div>
      <div className="skeleton mt-8 h-6 w-48"></div>
      <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="skeleton h-32 w-full rounded-2xl"></div>
        ))}
      </div>
    </div>
  );
}
