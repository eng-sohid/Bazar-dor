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

    if (!name || !email || !password) {
      toast.error("সব ঘর পূরণ করুন");
      return;
    }
    if (password.length < 8) {
      toast.error("পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে");
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
      <div className="rounded-2xl border border-green-100 bg-white p-6 shadow-sm">
        <h1 className="text-2xl font-bold">সাইন আপ</h1>
        <p className="mt-1 text-sm text-base-content/60">
          নতুন অ্যাকাউন্ট খুলুন
        </p>

        <form onSubmit={handleSubmit} className="mt-5 space-y-3">
          <input
            name="name"
            type="text"
            placeholder="নাম"
            className="input input-bordered w-full"
          />
          <input
            name="email"
            type="email"
            placeholder="ইমেইল"
            className="input input-bordered w-full"
          />
          <input
            name="password"
            type="password"
            placeholder="পাসওয়ার্ড (কমপক্ষে ৮ অক্ষর)"
            className="input input-bordered w-full"
          />
          <button
            disabled={loading}
            className="btn btn-success w-full text-white"
          >
            {loading ? "অপেক্ষা করুন..." : "রেজিস্টার করুন"}
          </button>
        </form>
        <SocialLoginButtons />

        <p className="mt-4 text-center text-sm">
          আগে থেকেই অ্যাকাউন্ট আছে?{" "}
          <Link
            href="/signin"
            className="font-semibold text-green-700 hover:underline"
          >
            সাইন ইন
          </Link>
        </p>
      </div>
    </div>
  );
}
