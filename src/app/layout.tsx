import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { cn } from "@/lib/utils";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "경기요! - 경기대학교 근처 맛집 지도 앱",
  description: "경기대학교 근처의 맛집을 쉽게 찾아보세요!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body
        className={cn(
          inter.className,
          "mx-auto bg-gray-300 sm:w-[320px] md:w-[480px] lg:w-[640px] xl:w-[800px] 2xl:w-[960px]",
        )}
      >
        {children}
      </body>
    </html>
  );
}
