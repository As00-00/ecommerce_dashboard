import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

export async function middleware(request: NextRequest) {
  const token = request.cookies.get("admin_token")?.value;
  const path = request.nextUrl.pathname;

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


  const isLoginPage = path === "/login";
  

  const isProtectedRoute = path === "/" || path.startsWith("/dashboard");


  if (isProtectedRoute && !isValid) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (isLoginPage && isValid) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/login", "/dashboard/:path*"],
};