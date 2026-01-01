import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // 1. Check if the user has the cookie
  const isAdmin = request.cookies.get("admin_session")?.value === "true";

  // 2. Define protected routes (Dashboard)
  const isDashboardRoute = request.nextUrl.pathname === "/" || request.nextUrl.pathname.startsWith("/dashboard");
  
  // 3. Define public routes (Login)
  const isLoginRoute = request.nextUrl.pathname === "/login";

  // SCENARIO 1: User tries to go to Dashboard but is NOT logged in
  if (isDashboardRoute && !isAdmin) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // SCENARIO 2: User is ALREADY logged in but tries to go to Login page
  if (isLoginRoute && isAdmin) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

// Config tells Next.js which routes to run this middleware on
export const config = {
  matcher: ["/", "/dashboard/:path*", "/login"],
};