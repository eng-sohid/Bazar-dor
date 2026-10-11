import LoadingBanner from "../../../components/LoadingBanner";

export default function Loading() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <LoadingBanner fallback="পণ্যের তালিকা লোড হচ্ছে..." />
      <div className="skeleton mt-4 h-28 w-full rounded-2xl"></div>
      <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="skeleton h-32 w-full rounded-2xl"></div>
        ))}
      </div>
    </div>
  );
}
