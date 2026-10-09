"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "../lib/auth-client";
import SocialLoginButtons from "./SocialLoginButtons";

export default function SignInForm() {
  const router = useRouter();
  const params = useSearchParams();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (params.get("reason") === "login") {
      toast.error("এই পেজ দেখতে আগে সাইন ইন করুন", { id: "login-required" });
    }
  }, [params]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const email = String(form.get("email") ?? "").trim();
    const password = String(form.get("password") ?? "");

    if (!email || !password) {
      toast.error("ইমেইল ও পাসওয়ার্ড দিন");
      return;
    }

    setLoading(true);
    const { error } = await authClient.signIn.email({ email, password });

    if (error) {
      setLoading(false);
      toast.error(error.message || "ইমেইল বা পাসওয়ার্ড ভুল");
      return;
    }

    toast.success("সাইন ইন সফল হয়েছে", { duration: 2500 });
    setTimeout(() => {
      router.push(params.get("redirect") || "/");
      router.refresh();
    }, 900);
  }

  return (
    <div className="mx-auto max-w-md px-4 py-10">
      <div className="text-center">
        <h1 className="text-2xl font-bold">সাইন ইন করুন</h1>
        <p className="mt-1 text-sm text-base-content/60">
          আপনার অ্যাকাউন্টে প্রবেশ করে সব দাম দেখুন
        </p>
      </div>

      <div className="mt-6 rounded-2xl border border-green-100 bg-white p-6 shadow-sm">
        <form onSubmit={handleSubmit} className="space-y-3">
          <label className="block text-sm font-medium">
            ইমেইল
            <input
              name="email"
              type="email"
              placeholder="you@example.com"
              className="input input-bordered mt-1 w-full"
            />
          </label>
          <label className="block text-sm font-medium">
            পাসওয়ার্ড
            <input
              name="password"
              type="password"
              placeholder="আপনার পাসওয়ার্ড"
              className="input input-bordered mt-1 w-full"
            />
          </label>
          <button
            disabled={loading}
            className="btn w-full border-green-700 bg-green-700 text-white hover:bg-green-800"
          >
            {loading ? "অপেক্ষা করুন..." : "সাইন ইন"}
          </button>
        </form>

        <SocialLoginButtons />

        <p className="mt-4 text-center text-sm">
          অ্যাকাউন্ট নেই?{" "}
          <Link
            href="/signup"
            className="font-semibold text-green-700 hover:underline"
          >
            সাইন আপ করুন
          </Link>
        </p>
      </div>

      <p className="mt-4 text-center text-sm">
        <Link href="/" className="text-base-content/60 hover:text-green-700">
          ← হোম পেজে ফিরে যান
        </Link>
      </p>
    </div>
  );
}
