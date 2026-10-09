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
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (params.get("reason") === "login") {
      toast.error("এই পেজ দেখতে আগে সাইন ইন করুন", {
        id: "login-required",
      });
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

    try {
      const { error } = await authClient.signIn.email({
        email,
        password,
      });

      if (error) {
        toast.error(error.message || "ইমেইল বা পাসওয়ার্ড ভুল");
        return;
      }

      toast.success("সাইন ইন সফল হয়েছে!", {
        id: "signin-success",
        duration: 3000,
      });

      setTimeout(() => {
        router.push(params.get("redirect") || "/");
        router.refresh();
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
            আবার ফিরে আসায় স্বাগতম!
          </h1>

          <p className="mt-3 text-sm leading-6 text-gray-500">
            আপনার অ্যাকাউন্টে সাইন ইন করুন এবং নিত্যপ্রয়োজনীয় পণ্যের দাম এক
            নজরে দেখুন।
          </p>
        </div>

        <div className="rounded-3xl border border-green-100 bg-white p-5 shadow-xl shadow-green-900/5 sm:p-8">
          <form onSubmit={handleSubmit} className="space-y-5">
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
                  autoComplete="current-password"
                  placeholder="আপনার পাসওয়ার্ড লিখুন"
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

            <button
              type="submit"
              disabled={loading}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-green-700 px-5 py-3.5 text-sm font-bold text-white shadow-md shadow-green-700/20 transition hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-200 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? (
                <>
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                  সাইন ইন হচ্ছে...
                </>
              ) : (
                "সাইন ইন করুন →"
              )}
            </button>
          </form>

          <div className="my-6 flex items-center gap-3">
            <div className="h-px flex-1 bg-gray-200" />
            <span className="text-xs font-medium text-gray-400">
              অথবা সাইন ইন করুন
            </span>
            <div className="h-px flex-1 bg-gray-200" />
          </div>

          <SocialLoginButtons />

          <p className="mt-6 text-center text-sm text-gray-500">
            অ্যাকাউন্ট নেই?{" "}
            <Link
              href="/signup"
              className="font-bold text-green-700 hover:text-green-900 hover:underline"
            >
              নতুন অ্যাকাউন্ট তৈরি করুন
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
