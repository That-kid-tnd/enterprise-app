import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token;
    const path = req.nextUrl.pathname;

    if (!token && path !== "/login") {
      return NextResponse.redirect(new URL("/login", req.url));
    }

    if (token?.role !== "admin" && (path.startsWith("/users") || path.startsWith("/settings"))) {
      return NextResponse.redirect(new URL("/", req.url));
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  }
);

export const config = { matcher: ["/((?!api/auth|login|_next/static|favicon.ico).*)"] };
