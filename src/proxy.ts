import { NextResponse, type NextRequest } from "next/server";
import { STORAGE_KEYS } from "@/consts/storage";

export function proxy(request: NextRequest) {
  const sessionCookie = request.cookies.get(STORAGE_KEYS.SESSION);
  const { pathname } = request.nextUrl;

  const isAuthPage = pathname.startsWith("/login");

  if (!sessionCookie && !isAuthPage) {
    const loginUrl = new URL("/login", request.url);
    if (pathname !== "/") {
      loginUrl.searchParams.set("redirect", pathname);
    }
    return NextResponse.redirect(loginUrl);
  }

  if (sessionCookie && isAuthPage) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
