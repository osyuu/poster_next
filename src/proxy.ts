import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";

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

  return NextResponse.next();
});

export const config = {
  matcher: [
    /*
     * 排除以下路徑：
     * - _next/static (靜態檔案)
     * - _next/image (圖片優化)
     * - favicon.ico
     * - 公開資源 (images, icons 等)
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
