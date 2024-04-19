import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import RQProvider from "@/lib/react-query/QueryClient";
import { cn } from "@/lib/utils";
import { Toaster } from "sonner";
import "./globals.css";
import splashScreenInfo from "./splash_screen_info";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  applicationName: "경기요!",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "🍽️경기요! - 경기대학교 근처 맛집 지도 앱",
  },
  formatDetection: {
    telephone: false,
  },
  title: "🍽️경기요! - 경기대학교 근처 맛집 지도 앱",
  description: "경기대학교 근처의 맛집을 쉽게 찾아보세요!",
  metadataBase: new URL("https://kyonggiyo.site"),
  openGraph: {
    title: "🍽️경기요! - 경기대학교 근처 맛집 지도 앱",
    description: "경기대학교 근처의 맛집을 쉽게 찾아보세요!",
    url: "https://kyonggiyo.site",
    type: "website",
  },
  icons: {
    other: [...splashScreenInfo],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  minimumScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#ffffff",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ko"
      className={"h-full"}
    >
      <body className={cn(inter.className, "h-full bg-gray-300")}>
        <RQProvider>
          <main className="mx-auto min-h-dvh flex-col bg-white sm:w-[320px] md:w-[480px] lg:w-[640px] xl:w-[800px] 2xl:w-[960px]">
            {children}
          </main>
        </RQProvider>
      </body>
      <Toaster
        richColors
        position={"top-center"}
      />
    </html>
  );
}
