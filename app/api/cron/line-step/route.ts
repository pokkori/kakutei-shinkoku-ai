/**
 * LINE ステップ配信 CRON - 確定申告AI
 * GET /api/cron/line-step
 * Vercel CRON: "0 0 * * *" (毎日 09:00 JST)
 *
 * 確定申告AI専用シーケンス（個人事業主・フリーランス向け税務訴求）
 */

import { NextRequest, NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase";

export const dynamic = "force-dynamic";
export const maxDuration = 60;

const SERVICE_URL = "https://kakutei-shinkoku-ai.vercel.app";
const SERVICE_NAME = "確定申告AI";
const APP_ID = "kakutei";

interface StepDef {
  step: number;
  nextStep: number | null;
  daysUntilNext: number;
  message: string;
}

const STEPS: StepDef[] = [
  {
    step: 1,
    nextStep: 2,
    daysUntilNext: 2,
    message: `【${SERVICE_NAME}】ご登録ありがとうございます。

まず無料でAIに経費・控除の質問をしてみてください。
青色申告・インボイス・ふるさと納税など、どんな疑問にも答えます。

${SERVICE_URL}`,
  },
  {
    step: 2,
    nextStep: 3,
    daysUntilNext: 3,
    message: `【${SERVICE_NAME}】申告期限が近い方へ。

AIが書類の書き方を手順ごとに解説します。
「経費の按分ってどうやるの？」「青色申告特別控除65万円の条件は？」など、実務レベルの質問に対応しています。

${SERVICE_URL}`,
  },
  {
    step: 3,
    nextStep: 4,
    daysUntilNext: 2,
    message: `【${SERVICE_NAME}】月額プランのご案内です。

月額プランなら、いつでも税務相談し放題。確定申告シーズン以外にも、日々の帳簿・節税・インボイス対応をAIがサポートします。

詳細はこちら: ${SERVICE_URL}#pricing`,
  },
  {
    step: 4,
    nextStep: null,
    daysUntilNext: 0,
    message: `【${SERVICE_NAME}】期間限定のご案内です。

今週限り、月額プランが初月20%OFFになります。
年間の節税効果を考えると、月額料金は十分に回収できます。

お早めにどうぞ: ${SERVICE_URL}`,
  },
];

async function sendLineMessage(userId: string, text: string): Promise<boolean> {
  const token = process.env.LINE_CHANNEL_ACCESS_TOKEN;
  if (!token) return false;
  const res = await fetch("https://api.line.me/v2/bot/message/push", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      to: userId,
      messages: [{ type: "text", text }],
    }),
  });
  return res.ok;
}

export async function GET(req: NextRequest): Promise<NextResponse> {
  const authHeader = req.headers.get("authorization");
  const cronSecret = process.env.CRON_SECRET;
  if (!cronSecret || authHeader !== `Bearer ${cronSecret}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const supabase = getSupabaseAdmin();
  const now = new Date();
  const maxStep = STEPS.length;

  const { data: users, error } = await supabase
    .from("line_step_users")
    .select("id, line_user_id, step, next_send_at")
    .lte("next_send_at", now.toISOString())
    .lt("step", maxStep)
    .eq("app_id", APP_ID)
    .order("next_send_at", { ascending: true })
    .limit(200);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const results: { userId: string; step: number; status: string }[] = [];

  for (const user of users ?? []) {
    const stepDef = STEPS.find((s) => s.step === (user.step as number) + 1);
    if (!stepDef) continue;

    const sent = await sendLineMessage(user.line_user_id as string, stepDef.message);
    const nextSendAt =
      stepDef.nextStep !== null && stepDef.daysUntilNext > 0
        ? new Date(now.getTime() + stepDef.daysUntilNext * 86400 * 1000).toISOString()
        : null;

    await supabase
      .from("line_step_users")
      .update({
        step: stepDef.step,
        next_send_at: nextSendAt,
        updated_at: now.toISOString(),
      })
      .eq("id", user.id);

    results.push({
      userId: user.line_user_id as string,
      step: stepDef.step,
      status: sent ? "sent" : "error",
    });
  }

  return NextResponse.json({
    processed: results.length,
    results,
    executedAt: now.toISOString(),
  });
}
