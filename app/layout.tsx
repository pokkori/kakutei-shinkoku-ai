import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";

export const metadata: Metadata = {
  title: "確定申告AI - フリーランス・個人事業主の確定申告を30分で完成",
  description: "年収・経費を入力するだけで、AIが確定申告の手順・節税ポイント・申告書の書き方を完全サポート。税理士に頼まず¥2,980で完結。",
  keywords: "確定申告, フリーランス, 個人事業主, 節税, 青色申告, 白色申告, 医療費控除, 経費, 確定申告書",
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
