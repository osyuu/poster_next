import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function trackPreviousPage(
  request: NextRequest,
  response: NextResponse
) {
  const pathname = request.nextUrl.pathname;

  // 如果不是 compose 相關路由，存當前路徑作為「上一頁」
  if (!pathname.startsWith("/compose")) {
    response.cookies.set("previous-page", pathname, {
      httpOnly: true,
      sameSite: "lax",
      maxAge: 60 * 60, // 1 hour
    });
  }

  return response;
}
