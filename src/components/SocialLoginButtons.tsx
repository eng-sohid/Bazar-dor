"use client";

import toast from "react-hot-toast";
import { authClient } from "../lib/auth-client";

export default function SocialLoginButtons() {
  async function login(provider: "google" | "github") {
    const { error } = await authClient.signIn.social({
      provider,
      callbackURL: "/",
    });

    if (error) {
      toast.error(error.message || "লগইন ব্যর্থ হয়েছে");
    }
  }

  return (
    <div className="mt-6 space-y-5">
      {/* Divider */}
      <div className="relative flex items-center">
        <div className="flex-grow border-t border-gray-200" />
        <span className="mx-4 text-xs font-medium text-gray-500">অথবা</span>
        <div className="flex-grow border-t border-gray-200" />
      </div>

      {/* Social Login Buttons */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {/* Google */}
        <button
          type="button"
          onClick={() => login("google")}
          className="flex h-12 items-center justify-center gap-3 rounded-xl border border-gray-200 bg-white px-4 text-sm font-semibold text-gray-700 shadow-sm transition-all duration-200 hover:border-gray-300 hover:bg-gray-50 hover:shadow-md active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          <svg
            viewBox="0 0 48 48"
            className="h-5 w-5 shrink-0"
            aria-hidden="true"
          >
            <path
              fill="#EA4335"
              d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 3.15 13.22l7.98 6.19C13.02 13.72 18.02 9.5 24 9.5Z"
              transform="translate(0 4)"
            />
            <path
              fill="#4285F4"
              d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.76 7.18l7.73 6C44.42 37.98 46.98 31.89 46.98 24.55Z"
              transform="translate(0 -1)"
            />
            <path
              fill="#FBBC05"
              d="M10.53 28.59a14.4 14.4 0 0 1 0-9.18l-7.98-6.19a24 24 0 0 0 0 21.56l7.98-6.19Z"
              transform="translate(0 0)"
            />
            <path
              fill="#34A853"
              d="M24 48c6.48 0 11.93-2.13 15.91-5.8l-7.73-6c-2.14 1.45-4.89 2.3-8.18 2.3-5.98 0-11.06-4.04-12.88-9.48l-7.98 6.19C6.51 43.62 14.62 48 24 48Z"
              transform="translate(0 -4)"
            />
          </svg>

          <span>Google দিয়ে চালিয়ে যান</span>
        </button>

        {/* GitHub */}
        <button
          type="button"
          onClick={() => login("github")}
          className="flex h-12 items-center justify-center gap-3 rounded-xl border border-gray-200 bg-white px-4 text-sm font-semibold text-gray-700 shadow-sm transition-all duration-200 hover:border-gray-300 hover:bg-gray-50 hover:shadow-md active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
        >
          <svg
            viewBox="0 0 24 24"
            fill="currentColor"
            className="h-5 w-5 shrink-0 text-gray-900"
            aria-hidden="true"
          >
            <path d="M12 .9a11.1 11.1 0 0 0-3.51 21.63c.56.1.76-.24.76-.54v-2.1c-3.1.68-3.76-1.32-3.76-1.32-.51-1.3-1.25-1.65-1.25-1.65-1.02-.7.08-.69.08-.69 1.13.08 1.73 1.16 1.73 1.16 1 .1.77 2.04 3.35 1.55.1-.73.4-1.22.72-1.5-2.48-.28-5.09-1.24-5.09-5.5 0-1.22.44-2.21 1.16-2.99-.12-.28-.5-1.42.11-2.95 0 0 .95-.3 3.05 1.14a10.6 10.6 0 0 1 5.55 0c2.1-1.44 3.04-1.14 3.04-1.14.61 1.53.23 2.67.12 2.95.72.78 1.15 1.77 1.15 2.99 0 4.27-2.61 5.21-5.1 5.49.4.34.76 1 .76 2.02v3c0 .3.2.65.77.54A11.1 11.1 0 0 0 12 .9Z" />
          </svg>

          <span>GitHub দিয়ে চালিয়ে যান</span>
        </button>
      </div>
    </div>
  );
}
