import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

export async function POST(req: NextRequest) {
  const webhookSecret = process.env.KOMOJU_WEBHOOK_SECRET;
  if (!webhookSecret) {
    return NextResponse.json({ error: "Webhook secret not configured" }, { status: 500 });
  }

  const body = await req.text();
  const signature = req.headers.get("x-komoju-signature");
  const expected = crypto.createHmac("sha256", webhookSecret).update(body).digest("hex");

  if (signature !== expected) {
    return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
  }

  const event = JSON.parse(body);
  if (event.type === "payment.captured" || event.type === "payment.authorized") {
    console.log("Komoju payment success:", event.data?.id);
  }

  return NextResponse.json({ received: true });
}
