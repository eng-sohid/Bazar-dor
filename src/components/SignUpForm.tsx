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
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

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

    try {
      const { error } = await authClient.signUp.email({
        name,
        email,
        password,
      });

      if (error) {
        toast.error(error.message || "রেজিস্ট্রেশন ব্যর্থ হয়েছে");
        return;
      }

      toast.success("রেজিস্ট্রেশন সফল! এখন সাইন ইন করুন", {
        id: "signup-success",
        duration: 3000,
      });

      setTimeout(() => {
        router.push("/signin");
      }, 1500);
    } catch {
      toast.error("সমস্যা হয়েছে। আবার চেষ্টা করুন।");
    } finally {
      setLoading(false);
    }
  }

  const inputClass =
    "mt-2 w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-green-600 focus:bg-white focus:ring-4 focus:ring-green-100";

  return (
    <section className="relative flex min-h-[75vh] items-center justify-center overflow-hidden bg-green-50/50 px-4 py-12">
      <div className="pointer-events-none absolute -left-24 top-10 h-64 w-64 rounded-full bg-green-100/70 blur-3xl" />
      <div className="pointer-events-none absolute -right-24 bottom-0 h-64 w-64 rounded-full bg-lime-100/70 blur-3xl" />

      <div className="relative w-full max-w-md">
        <div className="mb-7 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-green-700 text-3xl shadow-lg shadow-green-700/20">
            🛒
          </div>

          <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-green-700">
            BAZAR DOR
          </p>

          <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            অ্যাকাউন্ট তৈরি করুন
          </h1>

          <p className="mt-3 text-sm leading-6 text-gray-500">
            আপনার অ্যাকাউন্ট তৈরি করুন এবং নিত্যপ্রয়োজনীয় পণ্যের দাম এক নজরে
            দেখুন।
          </p>
        </div>

        <div className="rounded-3xl border border-green-100 bg-white p-5 shadow-xl shadow-green-900/5 sm:p-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            <label className="block text-sm font-semibold text-gray-700">
              আপনার নাম
              <input
                name="name"
                type="text"
                autoComplete="name"
                placeholder="আপনার পুরো নাম লিখুন"
                className={inputClass}
                disabled={loading}
              />
            </label>

            <label className="block text-sm font-semibold text-gray-700">
              ইমেইল ঠিকানা
              <input
                name="email"
                type="email"
                autoComplete="email"
                placeholder="you@example.com"
                className={inputClass}
                disabled={loading}
              />
            </label>

            <label className="block text-sm font-semibold text-gray-700">
              পাসওয়ার্ড
              <div className="relative">
                <input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="new-password"
                  placeholder="কমপক্ষে ৮ অক্ষর"
                  className={`${inputClass} pr-20`}
                  disabled={loading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-semibold text-green-700 hover:text-green-900"
                >
                  {showPassword ? "লুকান" : "দেখুন"}
                </button>
              </div>
            </label>

            <label className="block text-sm font-semibold text-gray-700">
              পাসওয়ার্ড নিশ্চিত করুন
              <div className="relative">
                <input
                  name="confirm"
                  type={showConfirmPassword ? "text" : "password"}
                  autoComplete="new-password"
                  placeholder="পাসওয়ার্ড আবার লিখুন"
                  className={`${inputClass} pr-20`}
                  disabled={loading}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-semibold text-green-700 hover:text-green-900"
                >
                  {showConfirmPassword ? "লুকান" : "দেখুন"}
                </button>
              </div>
            </label>

            <button
              type="submit"
              disabled={loading}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-green-700 px-5 py-3.5 text-sm font-bold text-white shadow-md shadow-green-700/20 transition hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-200 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? (
                <>
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                  অ্যাকাউন্ট তৈরি হচ্ছে...
                </>
              ) : (
                "অ্যাকাউন্ট তৈরি করুন →"
              )}
            </button>
          </form>

          <div className="my-6 flex items-center gap-3">
            <div className="h-px flex-1 bg-gray-200" />
            <span className="text-xs font-medium text-gray-400">
              অথবা ব্যবহার করুন
            </span>
            <div className="h-px flex-1 bg-gray-200" />
          </div>

          <SocialLoginButtons />

          <p className="mt-6 text-center text-sm text-gray-500">
            আগে থেকেই অ্যাকাউন্ট আছে?{" "}
            <Link
              href="/signin"
              className="font-bold text-green-700 hover:text-green-900 hover:underline"
            >
              সাইন ইন করুন
            </Link>
          </p>
        </div>

        <p className="mt-6 text-center text-xs text-gray-500">
          <Link href="/" className="transition hover:text-green-700">
            ← হোম পেজে ফিরে যান
          </Link>
        </p>
      </div>
    </section>
  );
}
