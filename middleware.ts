import { cookies } from "next/headers";
import { NextResponse, type NextRequest, type MiddlewareConfig } from "next/server";
import { authCookie, login } from "./features/auth";

export default async function middleware(req: NextRequest) {
  const _cookies = await cookies();
  const password = _cookies.get(authCookie)?.value;

  if (!password || !login(password)) {
    const url = req.nextUrl.clone();
    url.pathname = "/login";
    url.search = "";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config: MiddlewareConfig = {
  matcher: [
    // Match all other routes except /_next, static files, /login and /api/auth.
    "/((?!_next|favicon.ico|robots.txt|login|api/auth|.*\\.(?:png|jpg|jpeg|gif|svg|css|js|ico|webmanifest)).*)",
  ],
};
