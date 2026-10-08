"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { getBengaliDate } from "../lib/utils";
import type { Category } from "../types";

export default function Navbar({ categories }: { categories: Category[] }) {
  const pathname = usePathname();

  return (
    <header className="border-b border-base-300 bg-base-100">
      {/* উপরের সারি: লোগো + auth */}
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link href="/" className="flex items-center gap-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-green-600 text-lg text-white">
            🛒
          </span>
          <span className="leading-tight">
            <span className="block font-bold">বাজার দর</span>
            <span className="block text-xs text-base-content/60">
              {getBengaliDate()}
            </span>
          </span>
        </Link>

        <div className="flex gap-2">
          <Link href="/signin" className="btn btn-outline btn-sm">
            সাইন ইন
          </Link>
          <Link href="/signup" className="btn btn-success btn-sm text-white">
            সাইন আপ
          </Link>
        </div>
      </div>

      {/* নিচের সারি: ক্যাটাগরি */}
      <nav className="border-t border-base-200">
        <div className="mx-auto flex max-w-6xl gap-1 overflow-x-auto px-4 py-2">
          {categories.map((c) => {
            const active = pathname === `/category/${c.slug}`;
            return (
              <Link
                key={c.id}
                href={`/category/${c.slug}`}
                className={`whitespace-nowrap rounded-full px-3 py-1 text-sm font-medium transition ${
                  active ? "bg-green-600 text-white" : "hover:bg-base-200"
                }`}
              >
                {c.icon} {c.nameBn}
              </Link>
            );
          })}
        </div>
      </nav>
    </header>
  );
}
