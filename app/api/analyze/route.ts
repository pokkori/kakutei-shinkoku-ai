import Anthropic from "@anthropic-ai/sdk";
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export const dynamic = "force-dynamic";

const FREE_LIMIT = 3;

function getClient() {
  return new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
}

const rateLimit = new Map<string, { count: number; resetAt: number }>();
function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimit.get(ip);
  if (!entry || now > entry.resetAt) { rateLimit.set(ip, { count: 1, resetAt: now + 60000 }); return true; }
  if (entry.count >= 10) return false;
  entry.count++;
  return true;
}

const REPORT_TYPES: Record<string, string> = {
  white: "白色申告",
  blue10: "青色申告（10万円特別控除）",
  blue65: "青色申告（65万円特別控除）",
  unknown: "不明（診断してほしい）",
};

export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for") || "unknown";
  if (!checkRateLimit(ip)) {
    return NextResponse.json({ error: "リクエストが多すぎます" }, { status: 429 });
  }

  const cookieStore = await cookies();
  const isPremium = cookieStore.get("stripe_premium")?.value === "1";
  const cookieCount = parseInt(cookieStore.get("analyze_count")?.value ?? "0", 10);

  if (!isPremium && cookieCount >= FREE_LIMIT) {
    return NextResponse.json({ error: "limit_reached" }, { status: 402 });
  }

  const body = await req.json();
  const {
    reportType, occupation, revenue, totalExpenses, expenseDetails,
    hasSpouse, hasDependents, socialInsurance, lifeInsurance,
    furusato, medical, other
  } = body;

  if (!occupation || !revenue) {
    return NextResponse.json({ error: "必須項目が不足しています" }, { status: 400 });
  }

  const revenueNum = parseFloat(revenue) || 0;
  const expensesNum = parseFloat(totalExpenses) || 0;
  const socialNum = parseFloat(socialInsurance) || 0;
  const lifeNum = parseFloat(lifeInsurance) || 0;
  const furusatoNum = parseFloat(furusato) || 0;
  const medicalNum = parseFloat(medical) || 0;

  const prompt = `あなたは日本の税務に精通したAIアシスタントです。以下の情報をもとに、個人事業主・フリーランスの確定申告に関する詳細なアドバイスを提供してください。

【申告者情報】
- 職業・業種: ${occupation}
- 申告の種類（現在）: ${REPORT_TYPES[reportType] || "不明"}
- 年間売上（収入）: ${revenueNum}万円
- 年間経費合計: ${expensesNum}万円
- 主な経費の内訳: ${expenseDetails || "記載なし"}
- 配偶者: ${hasSpouse ? "あり" : "なし"}
- 扶養家族: ${hasDependents ? "あり" : "なし"}
- 社会保険料控除: ${socialNum}万円
- 生命保険料控除: ${lifeNum}万円
- ふるさと納税: ${furusatoNum}万円
- 医療費（年間）: ${medicalNum}万円
- その他・相談事項: ${other || "なし"}

以下の5セクションに分けて、具体的・実践的なアドバイスを提供してください。各セクションは「===TAX===」「===EXPENSES===」「===PROCEDURE===」「===SAVINGS===」「===FAQ===」で区切ってください。

===TAX===
## 予想納税額・還付金の計算

計算式と結果を具体的な数字で示してください：
- 課税所得の計算（売上 - 経費 - 各種控除）
- 所得税の概算額（税率・税額控除を含む）
- 住民税の概算額
- 国民健康保険料への影響
- ふるさと納税の節税効果
- 医療費控除の適用可否
- 最終的な納税予想額または還付予想額

※ これは概算であり、実際の申告時には税務署またはe-Taxでの計算が必要です。

===EXPENSES===
## 経費の最適化アドバイス

${occupation}として申告できる経費の完全リストと、見落としがちな経費を具体的に示してください：
- 申告済み経費の評価
- 見落としやすい経費の指摘（${occupation}に特化）
- 家賃・光熱費の按分方法と計算例
- 注意すべき経費（税務調査で問題になりやすいもの）

===PROCEDURE===
## 確定申告の手順（2025年分 / 2026年3月15日締め切り）

ステップバイステップで具体的な手順を示してください：
1. 必要書類の準備リスト
2. e-Taxを使った電子申告の手順（マイナンバーカード方式 or ID・パスワード方式）
3. 申告書の記入方法（重要な欄の説明）
4. 提出方法（e-Tax推奨・税務署持参・郵送）
5. 提出後の流れ（納税・還付のタイミング）

===SAVINGS===
## 節税アドバイス（今年分と来年以降）

### 今すぐ申告に反映できること
- 控除の漏れがないか確認

### 来年以降の節税対策
- ${reportType === "white" ? "青色申告への切り替え検討（65万円控除のメリット）" : "青色申告の最大活用法"}
- iDeCo（個人型確定拠出年金）の活用
- 小規模企業共済への加入
- 法人化を検討すべき収入ラインの目安
- その他の節税手法

===FAQ===
## よくある質問・注意点

${occupation}のフリーランスがよく疑問に思うこと、税務調査で指摘されやすいポイントを5つのQ&A形式で答えてください。`;

  const message = await getClient().messages.create({
    model: "claude-haiku-4-5-20251001",
    max_tokens: 4000,
    messages: [{ role: "user", content: prompt }],
  });

  const rawText = message.content[0].type === "text" ? message.content[0].text : "";

  function extractSection(text: string, key: string): string {
    const regex = new RegExp(`===${key}===([\\s\\S]*?)(?:===\\w+===|$)`);
    const match = text.match(regex);
    return match ? match[1].trim() : "";
  }

  const result = {
    tax: extractSection(rawText, "TAX"),
    expenses: extractSection(rawText, "EXPENSES"),
    procedure: extractSection(rawText, "PROCEDURE"),
    savings: extractSection(rawText, "SAVINGS"),
    faq: extractSection(rawText, "FAQ"),
  };

  if (!isPremium) {
    const responseObj = NextResponse.json({ result, remaining: FREE_LIMIT - cookieCount - 1 });
    responseObj.cookies.set("analyze_count", String(cookieCount + 1), {
      httpOnly: true,
      secure: true,
      maxAge: 60 * 60 * 24 * 30,
      path: "/",
      sameSite: "lax",
    });
    return responseObj;
  }

  return NextResponse.json({ result });
}
