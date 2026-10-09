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
      }, 1000);
    } catch {
      toast.error("সমস্যা হয়েছে। আবার চেষ্টা করুন।");
    } finally {
      setLoading(false);
    }
  }

  const inputClass =
    "mt-1.5 w-full rounded-lg border border-gray-200 bg-gray-50 px-3.5 py-2.5 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-emerald-600 focus:bg-white focus:ring-2 focus:ring-emerald-100";

  return (
    <section className="flex min-h-[80vh] items-center justify-center bg-[#F8F9FA] px-4 py-12">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
            আবার ফিরে আসায় স্বাগতম!
          </h1>
          <p className="mt-2 text-xs text-gray-500">
            আপনার অ্যাকাউন্টে সাইন ইন করুন এবং নিত্যপ্রয়োজনীয় পণ্যের দাম এক
            নজরে দেখুন।
          </p>
        </div>

        {/* Card Form */}
        <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm sm:p-8">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-gray-700">
                ইমেইল ঠিকানা
              </label>
              <input
                name="email"
                type="email"
                autoComplete="email"
                placeholder="Your Email"
                className={inputClass}
                disabled={loading}
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700">
                পাসওয়ার্ড
              </label>
              <div className="relative">
                <input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  placeholder="আপনার পাসওয়ার্ড লিখুন"
                  className={`${inputClass} pr-16`}
                  disabled={loading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? "লুকান" : "দেখুন"}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="mt-2 flex w-full items-center justify-center gap-2 rounded-lg bg-[#00966D] py-3 text-sm font-semibold text-white transition hover:bg-[#00805d] focus:outline-none disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? (
                <>
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                  সাইন ইন হচ্ছে...
                </>
              ) : (
                "সাইন ইন করুন"
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="my-5 flex items-center gap-3">
            <div className="h-px flex-1 bg-gray-200" />
            <span className="text-xs text-gray-400">অথবা সাইন ইন করুন</span>
            <div className="h-px flex-1 bg-gray-200" />
          </div>

          {/* Social Logins */}
          <SocialLoginButtons />

          {/* Redirect to SignUp */}
          <p className="mt-6 text-center text-xs text-gray-500">
            অ্যাকাউন্ট নেই?{" "}
            <Link
              href="/signup"
              className="font-medium text-[#00966D] hover:underline"
            >
              নতুন অ্যাকাউন্ট তৈরি করুন
            </Link>
          </p>
        </div>

        {/* Back to Home */}
        <p className="mt-6 text-center text-xs text-gray-500">
          <Link href="/" className="transition hover:text-gray-800">
            ← হোম পেজে ফিরে যান
          </Link>
        </p>
      </div>
    </section>
  );
}
