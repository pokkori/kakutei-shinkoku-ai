import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const secretKey = process.env.KOMOJU_SECRET_KEY;
    if (!secretKey) {
      return NextResponse.json({ error: "決済設定が未完了です" }, { status: 500 });
    }

    const origin = req.headers.get("origin") || "https://kakutei-shinkoku-ai.vercel.app";

    const body = new URLSearchParams({
      "default_locale": "ja",
      "cancel_url": `${origin}/`,
      "return_url": `${origin}/success?session_id={CHECKOUT_SESSION_ID}`,
      "currency": "JPY",
    });

    body.append("line_items[][quantity]", "1");
    body.append("line_items[][unit_price]", "2980");
    body.append("line_items[][currency]", "JPY");
    body.append("line_items[][description]", "確定申告AI プレミアム（買い切り）");

    const res = await fetch("https://komoju.com/api/v1/sessions", {
      method: "POST",
      headers: {
        Authorization: `Basic ${Buffer.from(secretKey + ":").toString("base64")}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: body.toString(),
    });

    const data = await res.json();
    if (!res.ok) {
      return NextResponse.json({ error: data.error?.message || "決済セッション作成失敗" }, { status: 500 });
    }

    return NextResponse.json({ url: data.session_url });
  } catch {
    return NextResponse.json({ error: "サーバーエラー" }, { status: 500 });
  }
}
