import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";

const SITE_URL = "https://kakutei-shinkoku-ai.vercel.app";
const TITLE = "確定申告AI - フリーランス・個人事業主の確定申告を30分で完成";
const DESC = "年収・経費を入力するだけでAIが確定申告を完全サポート。税理士費用¥50,000不要。¥2,980で完結。3月15日締め切り前に完成させよう。";

export const metadata: Metadata = {
  title: TITLE,
  description: DESC,
  keywords: "確定申告, フリーランス, 個人事業主, 節税, 青色申告, 白色申告, 医療費控除, 経費, 確定申告書",
  openGraph: {
    title: TITLE,
    description: DESC,
    url: SITE_URL,
    siteName: "確定申告AI",
    locale: "ja_JP",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESC,
  },
  metadataBase: new URL(SITE_URL),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <body className="bg-gray-950 text-white min-h-screen">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
