import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    // You can add additional checks here if needed
    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => token != null,
    },
    pages: {
      signIn: "/auth/signin",
    },
  }
);

export const config = {
  matcher: [
    "/api/articles/:path*", // Protect article-related API routes
    "/admin/:path*", // Protect admin pages
  ],
};
