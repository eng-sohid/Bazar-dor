"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "../lib/auth-client";
import SocialLoginButtons from "./SocialLoginButtons";

export default function SignUpForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const name = String(form.get("name") ?? "").trim();
    const email = String(form.get("email") ?? "").trim();
    const password = String(form.get("password") ?? "");
    const confirm = String(form.get("confirm") ?? "");

    if (!name || !email || !password || !confirm) {
      toast.error("সব ঘর পূরণ করুন");
      return;
    }
    if (password.length < 8) {
      toast.error("পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে");
      return;
    }
    if (password !== confirm) {
      toast.error("দুটি পাসওয়ার্ড মিলছে না");
      return;
    }

    setLoading(true);
    const { error } = await authClient.signUp.email({ name, email, password });

    if (error) {
      setLoading(false);
      toast.error(error.message || "রেজিস্ট্রেশন ব্যর্থ হয়েছে");
      return;
    }

    toast.success("রেজিস্ট্রেশন সফল! এখন সাইন ইন করুন", { duration: 2500 });
    setTimeout(() => router.push("/signin"), 900);
  }

  return (
    <div className="mx-auto max-w-md px-4 py-10">
      <div className="text-center">
        <h1 className="text-2xl font-bold">অ্যাকাউন্ট তৈরি করুন</h1>
        <p className="mt-1 text-sm text-base-content/60">
          বিনা খরচে সাইন আপ করে সব বিস্তারিত দাম দেখুন
        </p>
      </div>

      <div className="mt-6 rounded-2xl border border-green-100 bg-white p-6 shadow-sm">
        <form onSubmit={handleSubmit} className="space-y-3">
          <label className="block text-sm font-medium">
            নাম
            <input
              name="name"
              type="text"
              placeholder="যেমন: রহিম উদ্দিন"
              className="input input-bordered mt-1 w-full"
            />
          </label>
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
              placeholder="কমপক্ষে ৮ অক্ষর"
              className="input input-bordered mt-1 w-full"
            />
          </label>
          <label className="block text-sm font-medium">
            পাসওয়ার্ড নিশ্চিত করুন
            <input
              name="confirm"
              type="password"
              placeholder="আবার লিখুন"
              className="input input-bordered mt-1 w-full"
            />
          </label>
          <button
            disabled={loading}
            className="btn w-full border-green-700 bg-green-700 text-white hover:bg-green-800"
          >
            {loading ? "অপেক্ষা করুন..." : "অ্যাকাউন্ট তৈরি করুন"}
          </button>
        </form>

        <SocialLoginButtons />

        <p className="mt-4 text-center text-sm">
          অ্যাকাউন্ট আছে?{" "}
          <Link
            href="/signin"
            className="font-semibold text-green-700 hover:underline"
          >
            সাইন ইন করুন
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
