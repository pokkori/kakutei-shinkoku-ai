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
    images: [{ url: `${SITE_URL}/og.png`, width: 1200, height: 630, alt: "確定申告AI" }],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESC,
    images: [`${SITE_URL}/og.png`],
  },
  metadataBase: new URL(SITE_URL),
  manifest: "/manifest.json",
};

const breadcrumbLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "ホーム", "item": SITE_URL },
    { "@type": "ListItem", "position": 2, "name": "確定申告AIツール", "item": `${SITE_URL}/tool` },
  ],
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      "name": "確定申告AI",
      "url": SITE_URL,
      "applicationCategory": "FinanceApplication",
      "operatingSystem": "Web",
      "keywords": "確定申告,フリーランス,個人事業主,節税,青色申告,白色申告,医療費控除,経費,確定申告書,e-Tax",
      "offers": { "@type": "Offer", "price": "2980", "priceCurrency": "JPY", "description": "確定申告AI ¥2,980（買い切り）・14日間返金保証" },
      "description": DESC,
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "確定申告AIはどんな人が使えますか？",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "フリーランス・個人事業主・副業収入がある会社員の方が主な対象です。年収・経費・控除額を入力するだけで、予想納税額・還付金額・経費の最適化・申告手順を30分以内に確認できます。青色申告・白色申告どちらにも対応しています。"
          }
        },
        {
          "@type": "Question",
          "name": "税理士の代わりになりますか？",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "確定申告AIは情報提供・申告サポートを目的としており、税理士による税務相談の代替ではありません。ただし、税理士費用¥50,000〜¥150,000をかけずに確定申告の流れ・節税ポイント・申告書の書き方を把握できるため、初めての確定申告や自力申告の方に最適です。"
          }
        },
        {
          "@type": "Question",
          "name": "無料で試せますか？",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "はい。登録不要で3回まで無料でAI分析をお試しいただけます。プレミアムプラン（¥2,980/年・買い切り）にアップグレードすると無制限でご利用いただけます。14日間返金保証付きです。"
          }
        },
      ],
    },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="bg-gray-950 text-white min-h-screen">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
