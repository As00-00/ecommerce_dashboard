import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

export async function middleware(request: NextRequest) {
  // 1. Check for token
  const token = request.cookies.get("admin_token")?.value;
  const path = request.nextUrl.pathname;

  // 2. Verify Token
  // Use a fallback to prevent "Zero-length key" crashes if ENV is missing during dev
  const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET || "fallback_secret_for_dev");
  
  let isValid = false;
  if (token) {
    try {
      await jwtVerify(token, JWT_SECRET);
      isValid = true;
    } catch (error) {
      isValid = false;
    }
  }

  // 3. Define Routes
  // "/login" is the only public page
  const isLoginPage = path === "/login";
  
  // PROTECTED ROUTES: The root "/" AND anything under "/dashboard"
  const isProtectedRoute = path === "/" || path.startsWith("/dashboard");

  // SCENARIO 1: Not logged in -> Trying to access Admin pages (Root or Dashboard)
  if (isProtectedRoute && !isValid) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // SCENARIO 2: Already logged in -> Trying to access Login
  if (isLoginPage && isValid) {
    // Redirect them to the Root (which is your Dashboard)
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

// Config: Explicitly match the routes we care about
export const config = {
  matcher: ["/", "/login", "/dashboard/:path*"],
};