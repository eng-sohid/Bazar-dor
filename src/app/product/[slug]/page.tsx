import Link from "next/link";
import { notFound } from "next/navigation";
import { getProducts } from "../../../lib/api";
import {
  formatDecimal,
  formatPrice,
  formatUnit,
  getChangeBadge,
  getPriceSummary,
  toBengaliNumber,
} from "../../../lib/utils";

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const products = await getProducts();
  const product = products.find((p) => p.slug === slug);
  if (!product) notFound();

  const badge = getChangeBadge(product.change);
  const { min, max, avg } = getPriceSummary(product);
  const diff = product.today - product.yesterday;
  const unitShort = formatUnit(product.unit).replace("প্রতি ", "");

  const rows = product.markets
    .map((m) => ({ ...m, avg: (m.min + m.max) / 2 }))
    .sort((a, b) => a.avg - b.avg);

  const diffText =
    diff > 0
      ? `বেড়েছে · ${toBengaliNumber(diff)} টাকা`
      : diff < 0
        ? `কমেছে · ${toBengaliNumber(Math.abs(diff))} টাকা`
        : "অপরিবর্তিত";

  return (
    <div className="mx-auto max-w-5xl px-4 py-6">
      {/* Breadcrumb */}
      <nav className="text-xs text-base-content/60">
        <Link href="/" className="hover:text-green-700 hover:underline">
          হোম
        </Link>
        <span className="mx-1.5">›</span>
        <Link
          href={`/category/${product.category}`}
          className="hover:text-green-700 hover:underline"
        >
          {product.categoryNameBn}
        </Link>
        <span className="mx-1.5">›</span>
        <span className="text-base-content">{product.nameBn}</span>
      </nav>

      {/* Summary card */}
      <div className="mt-4 flex flex-col gap-4 rounded-2xl border border-green-100 bg-white p-5 shadow-sm sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
          <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-green-50 text-4xl ring-1 ring-green-100">
            {product.image}
          </div>
          <div>
            <h1 className="text-2xl font-bold leading-tight">
              {product.nameBn}
            </h1>
            <p className="mt-0.5 text-xs text-base-content/60">
              {formatUnit(product.unit)} · {product.categoryNameBn}
            </p>
            <p className="mt-1.5 text-xs text-base-content/70">
              গতকালের তুলনায় আজ দাম{" "}
              <b className="text-base-content">{diffText}</b>
            </p>
          </div>
        </div>

        <div className="rounded-xl bg-green-50 px-6 py-3 text-center ring-1 ring-green-100 sm:min-w-32">
          <p className="text-[11px] text-base-content/60">আজকের দাম</p>
          <p className="text-3xl font-bold leading-tight">
            {formatPrice(product.today)}
          </p>
          <p className="text-[11px] text-base-content/60">টাকা/{unitShort}</p>
          <span
            className={`mt-1.5 inline-block rounded-full px-2 py-0.5 text-xs font-semibold ${badge.color}`}
          >
            {badge.label}
          </span>
        </div>
      </div>

      {/* Price summary + table */}
      <div className="mt-4 rounded-2xl border border-green-100 bg-white p-5 shadow-sm">
        <h2 className="text-base font-bold">দামের সারসংক্ষেপ</h2>

        <div className="mt-3 grid gap-3 sm:grid-cols-3">
          <div className="rounded-xl border border-green-100 bg-green-50/50 p-4">
            <p className="text-xs text-base-content/60">সর্বনিম্ন দাম</p>
            <p className="mt-1 text-xl font-bold text-green-600">
              {formatPrice(min)}{" "}
              <span className="text-sm font-medium">টাকা</span>
            </p>
            <p className="mt-0.5 text-[11px] text-base-content/50">
              সবচেয়ে কম দামের বাজার
            </p>
          </div>
          <div className="rounded-xl border border-red-100 bg-red-50/50 p-4">
            <p className="text-xs text-base-content/60">সর্বোচ্চ দাম</p>
            <p className="mt-1 text-xl font-bold text-red-600">
              {formatPrice(max)}{" "}
              <span className="text-sm font-medium">টাকা</span>
            </p>
            <p className="mt-0.5 text-[11px] text-base-content/50">
              সবচেয়ে বেশি দামের বাজার
            </p>
          </div>
          <div className="rounded-xl border border-base-300 bg-base-100 p-4">
            <p className="text-xs text-base-content/60">গড় দাম</p>
            <p className="mt-1 text-xl font-bold">
              {formatPrice(avg)}{" "}
              <span className="text-sm font-medium">টাকা</span>
            </p>
            <p className="mt-0.5 text-[11px] text-base-content/50">
              {formatUnit(product.unit)} গড়
            </p>
          </div>
        </div>

        <h2 className="mt-7 text-base font-bold">বাজারভিত্তিক আজকের দাম</h2>
        <div className="mt-3 overflow-x-auto rounded-xl border border-green-100">
          <table className="w-full min-w-[560px] text-sm">
            <thead>
              <tr className="bg-green-50 text-xs text-base-content/60">
                <th className="px-4 py-2.5 text-left font-medium">বাজার</th>
                <th className="px-4 py-2.5 text-left font-medium">বিভাগ</th>
                <th className="px-4 py-2.5 text-right font-medium">
                  সর্বনিম্ন
                </th>
                <th className="px-4 py-2.5 text-right font-medium">সর্বোচ্চ</th>
                <th className="px-4 py-2.5 text-right font-medium">গড়</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((m, i) => (
                <tr
                  key={m.market}
                  className={`border-t border-green-100 transition hover:bg-green-50 ${
                    i % 2 === 1 ? "bg-green-50/40" : "bg-white"
                  }`}
                >
                  <td className="px-4 py-2.5 font-medium">{m.market}</td>
                  <td className="px-4 py-2.5 text-base-content/70">
                    {m.division}
                  </td>
                  <td className="px-4 py-2.5 text-right">
                    {formatPrice(m.min)} টাকা
                  </td>
                  <td className="px-4 py-2.5 text-right">
                    {formatPrice(m.max)} টাকা
                  </td>
                  <td className="px-4 py-2.5 text-right font-bold">
                    {formatDecimal(m.avg)} টাকা
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
