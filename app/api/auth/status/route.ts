import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export const dynamic = "force-dynamic";

const FREE_LIMIT = 3;

export async function GET(req: NextRequest) {
  void req;
  const cookieStore = await cookies();
  const isPremium = cookieStore.get("stripe_premium")?.value === "1";
  const count = parseInt(cookieStore.get("analyze_count")?.value ?? "0", 10);

  return NextResponse.json({
    premium: isPremium,
    remaining: Math.max(0, FREE_LIMIT - count),
  });
}
