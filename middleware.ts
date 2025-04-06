import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  if (req.nextUrl.pathname === "/") {
    return NextResponse.rewrite(new URL("/login", req.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/"], // Ensures it runs only on the root URL
};
