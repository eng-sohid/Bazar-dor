"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { getBengaliDate } from "../lib/utils";
import { authClient } from "../lib/auth-client";
import LoadingLink from "./LoadingLink";
import type { Category } from "../types";

export default function Navbar({ categories }: { categories: Category[] }) {
  const pathname = usePathname();
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();

  async function handleSignOut() {
    await authClient.signOut();
    toast.success("সাইন আউট সফল হয়েছে");
    router.push("/");
    router.refresh();
  }

  return (
    <header className="border-b border-base-300 bg-base-100">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <LoadingLink
          href="/"
          label="হোম লোড হচ্ছে..."
          className="flex items-center gap-2"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-green-600 text-lg text-white">
            🛒
          </span>
          <span className="leading-tight">
            <span className="block font-bold">বাজার দর</span>
            <span className="block text-xs text-base-content/60">
              {getBengaliDate()}
            </span>
          </span>
        </LoadingLink>

        <div className="flex items-center gap-2">
          {isPending ? (
            <div className="skeleton h-8 w-28"></div>
          ) : session ? (
            <div className="dropdown dropdown-end">
              <button tabIndex={0} className="btn btn-ghost btn-sm gap-2">
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-green-600 text-xs text-white">
                  {session.user.name.charAt(0).toUpperCase()}
                </span>
                <span className="hidden sm:inline">{session.user.name}</span>
              </button>
              <ul
                tabIndex={0}
                className="menu dropdown-content z-10 mt-2 w-44 rounded-box border border-base-300 bg-base-100 p-2 shadow"
              >
                <li>
                  <LoadingLink href="/profile" label="প্রোফাইল লোড হচ্ছে...">
                    আমার প্রোফাইল
                  </LoadingLink>
                </li>
                <li>
                  <button onClick={handleSignOut}>সাইন আউট</button>
                </li>
              </ul>
            </div>
          ) : (
            <>
              <LoadingLink
                href="/signin"
                label="সাইন ইন পেজ লোড হচ্ছে..."
                className="btn btn-outline btn-sm"
              >
                সাইন ইন
              </LoadingLink>
              <LoadingLink
                href="/signup"
                label="সাইন আপ পেজ লোড হচ্ছে..."
                className="btn btn-success btn-sm text-white"
              >
                সাইন আপ
              </LoadingLink>
            </>
          )}
        </div>
      </div>

      <nav className="border-t border-base-200">
        <div className="mx-auto flex max-w-6xl gap-1 overflow-x-auto px-4 py-2">
          {categories.map((c) => {
            const active = pathname === `/category/${c.slug}`;
            return (
              <LoadingLink
                key={c.id}
                href={`/category/${c.slug}`}
                label={`${c.nameBn} লোড হচ্ছে...`}
                className={`whitespace-nowrap rounded-full px-3 py-1 text-sm font-medium transition ${
                  active ? "bg-green-600 text-white" : "hover:bg-base-200"
                }`}
              >
                {c.icon} {c.nameBn}
              </LoadingLink>
            );
          })}
        </div>
      </nav>
    </header>
  );
}
