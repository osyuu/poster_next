import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";
import { trackPreviousPage } from "@/proxy/trackPreviousPage";

export default auth((req) => {
  const isLoggedIn = !!req.auth;
  const isAuthPage = req.nextUrl.pathname.startsWith("/login");
  const isApiRoute = req.nextUrl.pathname.startsWith("/api");

  // API routes 不處理
  if (isApiRoute) {
    return NextResponse.next();
  }

  // 已登入但訪問 /login，導向首頁
  if (isLoggedIn && isAuthPage) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  // 未登入且訪問需要登入的頁面，導向 /login
  if (!isLoggedIn && !isAuthPage) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  if (isLoggedIn) {
    return trackPreviousPage(req, NextResponse.next());
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    /*
     * 以下で始まるリクエストパス以外のすべてをマッチングします：
     * - api（APIルート）
     * - _next/static（静的ファイル）
     * - _next/image（画像最適化ファイル）
     * - favicon.ico、sitemap.xml、robots.txt（メタデータファイル）
     * - .well-known（システム路徑）
     */
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|\\.well-known|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
