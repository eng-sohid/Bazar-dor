"use client";

import { useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";

function SocialToastHandler() {
  const params = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    if (params.get("toast") === "social-login") {
      toast.success("সফলভাবে সাইন ইন করা হয়েছে!", {
        id: "social-login-success",
      });

      const url = new URL(window.location.href);
      url.searchParams.delete("toast");
      router.replace(url.pathname, { scroll: false });
    }
  }, [params, router]);

  return null;
}

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Toaster position="top-center" toastOptions={{ duration: 3000 }} />
      <Suspense fallback={null}>
        <SocialToastHandler />
      </Suspense>
      {children}
    </>
  );
}
