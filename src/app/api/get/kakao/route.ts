import { NextResponse } from "next/server";

export function GET() {
  const redirectUri =
    process.env.NODE_ENV === "development"
      ? "http://localhost:3000/login/callback"
      : "https://kyonggiyo.vercel.app/login/callback";
  return new NextResponse(
    `https://kauth.kakao.com/oauth/authorize?client_id=57374f9868fced968b0fd6e48493375d&redirect_uri=${redirectUri}&response_type=code`,
    {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
      },
    },
  );
}
