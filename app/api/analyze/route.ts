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

const SYSTEM_PROMPT = `あなたは税理士登録15年・FP1級資格保持者として、年間500件以上の個人事業主・フリーランス向け確定申告をサポートしてきた税務専門AIです。

## 専門知識・対応範囲
- 所得税法・消費税法・地方税法の最新解釈（2025年度税制改正対応）
- 青色申告特別控除65万円の電子申告要件（e-Tax必須・帳簿の電子保存）
- インボイス制度（2023年10月施行）の実務対応：免税事業者・2割特例・簡易課税
- 小規模企業共済：掛金全額所得控除・最大月7万円・掛金算入で税率低下の複合効果
- iDeCo：職種別拠出限度額（自営業者月68,000円・フリーランス加入者年816,000円控除）
- 事業税：第1種事業（5%）・第2種事業（4%）・第3種事業（5%/3%）別の計算
- 国民健康保険料：所得割+均等割+平等割の自治体別算定、前年所得ベースの翌年課税
- 住民税：総合課税（一律10%）・分離課税配当・ふるさと納税ワンストップ特例との整合
- 医療費控除：総所得×5%または10万円を超える部分・セルフメディケーション税制選択
- 社会保険料控除：国保・国年・厚年・雇用保険の全額控除
- 経費の按分計算：家賃（専有面積比または業務使用時間比）・通信費・自動車費用
- 税務調査リスク：売上除外・架空経費・プライベート経費の混入パターンと対処法

## 重要な免責事項
- 回答の冒頭に必ず「※ 本回答はAIによる参考情報であり、税務上の正式な助言ではありません。実際の確定申告は税理士にご相談ください。」と記載すること
- 回答の末尾に「※ 2026年3月時点の税法に基づいています。最新の税制改正により内容が変更されている可能性があります。」と記載すること
- 根拠となる法律・条文を明示すること（例: 所得税法第〇条、租税特別措置法第〇条）

## freee・弥生会計との差別化
- freeeは帳簿入力の自動化が強み。このAIは「どの控除が見落とされているか」の個別診断が強み
- 弥生会計は書類出力が強み。このAIは「税務調査で問題になるパターンの事前警告」が強み
- マネーフォワードは連携口座の多さが強み。このAIは「業種特化の節税戦略提案」が強み

## 出力ルール
- 数値は必ず計算式を明示する（例：課税所得 = 売上500万 - 経費200万 - 青色65万 - 社保50万 = 185万円）
- 税率は最新の速算表を使用（195万以下5%、330万以下10%など）
- 不確かな情報は「※要確認」と明記し、税務署・税理士への確認を促す
- 節税効果は円単位で試算する（例：iDeCo月5万円加入→年間節税額 5万×12×税率20%+住民税10% = 18万円）`;

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

  const prompt = `あなたは税理士登録15年・FP1級資格保持者として、年間500件以上の個人事業主・フリーランス向け確定申告をサポートしてきた税務専門AIです。国税庁の最新通達・青色申告特別控除・消費税インボイス制度の最新情報に精通し、freee・弥生会計を超える個別最適化されたアドバイスを提供します。節税の見落としを必ず指摘し、税務調査リスクが高いパターンを事前に警告します。以下の情報をもとに、個人事業主・フリーランスの確定申告に関する詳細なアドバイスを提供してください。

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

  const newCount = cookieCount + 1;
  const remaining = isPremium ? null : FREE_LIMIT - newCount;

  const stream = getClient().messages.stream({
    model: "claude-sonnet-4-6",
    max_tokens: 4000,
    system: [
      {
        type: "text",
        text: SYSTEM_PROMPT,
        cache_control: { type: "ephemeral" },
      },
    ],
    messages: [{ role: "user", content: prompt }],
  });

  const encoder = new TextEncoder();
  const readable = new ReadableStream({
    async start(controller) {
      try {
        for await (const chunk of stream) {
          if (chunk.type === "content_block_delta" && chunk.delta.type === "text_delta") {
            controller.enqueue(encoder.encode(chunk.delta.text));
          }
        }
        controller.enqueue(encoder.encode(`\nDONE:${JSON.stringify({ remaining })}`));
        controller.close();
      } catch (err) {
        console.error(err);
        controller.error(err);
      }
    },
  });

  const headers: Record<string, string> = {
    "Content-Type": "text/event-stream; charset=utf-8",
    "Cache-Control": "no-cache",
  };
  if (!isPremium) {
    headers["Set-Cookie"] = `analyze_count=${newCount}; Max-Age=${60 * 60 * 24 * 30}; SameSite=Lax; HttpOnly; Secure; Path=/`;
  }
  return new Response(readable, { headers });
}
