import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export function middleware() {
  const isAuthendicated = cookies().has("isAuth");
  const response = NextResponse.next();
  if (isAuthendicated) {
    return response;
  }
  if (!isAuthendicated) {
    return NextResponse.redirect("https://kyonggiyo.vercel.app/login");
  }
}

export const config = {
  matcher: ["/restaurant/register", "/restaurant/status"],
};
