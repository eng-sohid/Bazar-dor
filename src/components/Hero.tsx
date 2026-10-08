import Image from "next/image";
import { getBengaliDate } from "../lib/utils";

export default function Hero() {
  return (
    <section className="mx-auto max-w-6xl px-4 pt-5">
      <div className="grid items-center gap-4 rounded-2xl border border-green-100 bg-green-50 p-5 md:grid-cols-[1fr_auto] md:p-6">
        <div>
          <span className="inline-block rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
            {getBengaliDate()}
          </span>
          <h1 className="mt-3 text-2xl font-bold leading-tight md:text-3xl">
            আজকের বাজারের দাম এক নজরে
          </h1>
          <p className="mt-2 max-w-xl text-sm text-base-content/70">
            চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক
            বিশ্লেষণ, গড় এবং দামের পরিবর্তন এক জায়গায়।
          </p>
          <a href="#সব-পণ্য" className="btn btn-success btn-sm mt-4 text-white">
            সব পণ্য দেখুন
          </a>
        </div>

        {/* ঝুড়ির ছবি: public/hero.png থাকলে নিচের div বদলে Image ব্যবহার করুন */}
        <Image
          src="/bazar-hero.png"
          alt="বাজারের ঝুড়ি"
          width={200}
          height={160}
          className="h-auto w-48"
          priority
        />
      </div>
    </section>
  );
}
