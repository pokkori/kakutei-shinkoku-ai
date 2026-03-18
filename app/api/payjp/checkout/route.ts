import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

const PAYJP_API = "https://api.pay.jp/v1";

function auth() {
  return "Basic " + Buffer.from(process.env.PAYJP_SECRET_KEY! + ":").toString("base64");
}

async function payjpPost(path: string, body: Record<string, string>) {
  const res = await fetch(`${PAYJP_API}${path}`, {
    method: "POST",
    headers: {
      Authorization: auth(),
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams(body).toString(),
  });
  return res.json();
}

export async function POST(req: NextRequest) {
  const { token } = await req.json();
  if (!token) return NextResponse.json({ error: "No token" }, { status: 400 });

  try {
    // One-time charge (¥2,980)
    const charge = await payjpPost("/charges", {
      card: token,
      amount: "2980",
      currency: "jpy",
      capture: "true",
    });
    if (charge.error) {
      return NextResponse.json({ error: charge.error.message }, { status: 400 });
    }

    const res = NextResponse.json({ ok: true });
    res.cookies.set("premium", "1", {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 366,
      path: "/",
    });
    return res;
  } catch {
    return NextResponse.json({ error: "決済処理に失敗しました" }, { status: 500 });
  }
}
