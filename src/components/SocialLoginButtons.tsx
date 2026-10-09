"use client";

import toast from "react-hot-toast";
import { authClient } from "../lib/auth-client";

export default function SocialLoginButtons() {
  async function login(provider: "google" | "github") {
    const { error } = await authClient.signIn.social({
      provider,
      callbackURL: "/",
    });
    if (error) toast.error(error.message || "লগইন ব্যর্থ হয়েছে");
  }

  return (
    <div className="mt-4">
      <div className="divider text-xs">অথবা</div>
      <div className="grid grid-cols-2 gap-2">
        <button
          type="button"
          onClick={() => login("google")}
          className="btn btn-outline btn-sm sm:btn-md"
        >
          Google দিয়ে চালিয়ে যান
        </button>
        <button
          type="button"
          onClick={() => login("github")}
          className="btn btn-outline btn-sm sm:btn-md"
        >
          GitHub দিয়ে চালিয়ে যান
        </button>
      </div>
    </div>
  );
}
