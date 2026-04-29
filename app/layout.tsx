import type { Metadata } from "next";
import { Noto_Sans_JP, M_PLUS_Rounded_1c } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { GoogleAdScript } from "@/components/GoogleAdScript";
import CookieBanner from "@/components/CookieBanner";
import OrbBackground from "@/components/OrbBackground";
import "./globals.css";
import { InstallPrompt } from "@/components/InstallPrompt";

const notoSansJP = Noto_Sans_JP({
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
  variable: "--font-noto-sans-jp",
});

const mPlusRounded = M_PLUS_Rounded_1c({
  subsets: ["latin"],
  weight: ["700", "800"],
  display: "swap",
  variable: "--font-rounded",
});

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
    images: [{ url: `${SITE_URL}/opengraph-image`, width: 1200, height: 630, alt: "確定申告AI" }],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESC,
    images: [`${SITE_URL}/opengraph-image`],
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
        {
          "@type": "Question",
          "name": "e-Taxの使い方がわからないのですが大丈夫ですか？",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "マイナンバーカードとスマホがあれば自宅から10分で電子申告が完了します。確定申告AIが手順を1ステップずつ解説するので、初めての方でも迷わず進められます。"
          }
        },
        {
          "@type": "Question",
          "name": "青色申告と白色申告、どちらを選べばいいですか？",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "年間売上が150万円以上のフリーランスには青色申告（65万円特別控除）をおすすめします。事前に開業届と青色申告承認申請書の提出が必要ですが、確定申告AIが状況に応じた最適な選択を診断します。"
          }
        },
        {
          "@type": "Question",
          "name": "副業収入が20万円を超えた場合はどうすればいいですか？",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "給与所得者で副業の所得が年間20万円を超えた場合、確定申告が必要です。本業の源泉徴収票と副業の収支を合算して申告します。確定申告AIが副業収入の入力方法と申告書の書き方を案内します。"
          }
        },
        {
          "@type": "Question",
          "name": "医療費控除はいくら以上から申告できますか？",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "年間の医療費が10万円（総所得金額の5%が10万円を下回る場合はその金額）を超えた部分が医療費控除の対象です。薬局のレシート・歯科・市販薬（セルフメディケーション税制）なども含まれます。"
          }
        },
        {
          "@type": "Question",
          "name": "ふるさと納税のワンストップ特例と確定申告の違いは何ですか？",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "ワンストップ特例は給与所得者専用で、他に確定申告が不要な場合に利用できます。フリーランス・個人事業主は確定申告で寄附金控除として申告します。確定申告AIが最適な申告方法を計算します。"
          }
        },
        {
          "@type": "Question",
          "name": "インボイス制度（適格請求書）への登録は必要ですか？",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "クライアントが消費税課税事業者の場合、インボイス未登録だと取引を断られるリスクがあります。小規模事業者には消費税の80%控除となる「2割特例」が3年間適用可能です。確定申告AIが状況に応じた判断を診断します。"
          }
        },
        {
          "@type": "Question",
          "name": "iDeCoに加入すると税金はどれだけ減りますか？",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "自営業・フリーランスの場合、iDeCoの掛金上限は月68,000円（年816,000円）で全額が所得控除になります。課税所得300万円（税率20%）の方が月5万円加入すると年間約12万円の節税効果があります。"
          }
        },
        {
          "@type": "Question",
          "name": "確定申告はいつまでにすればいいですか？",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "原則として翌年の2月16日〜3月15日です。電子申告（e-Tax）なら自宅から提出できます。このAIが申告書の書き方を手順ごとにサポートします。"
          }
        },
        {
          "@type": "Question",
          "name": "副業の所得が20万円以下でも申告が必要ですか？",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "給与所得以外の所得が年間20万円以下の場合、確定申告は不要です（ただし住民税申告は必要な場合あり）。AIが状況に応じた必要書類を提示します。"
          }
        },
        {
          "@type": "Question",
          "name": "経費として認められるものは何ですか？",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "事業関連の交通費・通信費・書籍代・セミナー費・家賃の一部（在宅ワーク）などが認められます。AIが領収書の整理から申告書の記入まで支援します。"
          }
        },
      ],
    },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja" className={`${notoSansJP.variable} ${mPlusRounded.variable}`}>
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
      <body className="antialiased min-h-screen text-white bg-[#0B1120]">
        <OrbBackground theme="finance" />
        <div className="relative" style={{ zIndex: 1 }}>
          {children}
          <InstallPrompt />
          <CookieBanner />
        </div>
        <Analytics />
        <SpeedInsights />
        <GoogleAdScript />
      </body>
    </html>
  );
}
