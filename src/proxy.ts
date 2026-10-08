import { NextRequest, NextResponse } from "next/server";

export function proxy(request: NextRequest) {
  console.log("PROXY HIT:", request.nextUrl.pathname);

  const token =
    request.cookies.get("better-auth.session_token") ??
    request.cookies.get("__Secure-better-auth.session_token");

  console.log("TOKEN:", token ? "আছে" : "নেই");

  if (!token) {
    const url = new URL("/signin", request.url);
    url.searchParams.set("redirect", request.nextUrl.pathname);
    url.searchParams.set("reason", "login");
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/product/:path*", "/profile/:path*"],
};
