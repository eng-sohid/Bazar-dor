import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-6xl p-8 text-center">
      <h1 className="text-3xl font-bold mb-2">৪০৪ - পেজ পাওয়া যায়নি</h1>
      <Link href="/" className="btn btn-primary mt-4">
        হোম পেজে ফিরে যান
      </Link>
    </div>
  );
}
