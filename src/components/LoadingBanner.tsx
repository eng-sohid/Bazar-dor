"use client";

import { useSyncExternalStore } from "react";

export const LOADING_KEY = "loading-label";

const subscribe = () => () => {};

export default function LoadingBanner({
  fallback = "লোড হচ্ছে...",
}: {
  fallback?: string;
}) {
  const text = useSyncExternalStore(
    subscribe,
    () => sessionStorage.getItem(LOADING_KEY) || fallback,
    () => fallback,
  );

  return (
    <div
      role="status"
      aria-live="polite"
      className="flex items-center justify-center gap-3 rounded-2xl border border-green-100 bg-green-50 px-4 py-3 text-green-700"
    >
      <span className="h-5 w-5 animate-spin rounded-full border-2 border-green-200 border-t-green-600" />
      <span className="text-sm font-semibold sm:text-base">{text}</span>
    </div>
  );
}
