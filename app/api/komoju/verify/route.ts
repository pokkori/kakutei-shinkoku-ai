import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const sessionId = req.nextUrl.searchParams.get("session_id");
  if (!sessionId) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  try {
    const secretKey = process.env.KOMOJU_SECRET_KEY;
    if (!secretKey) {
      return NextResponse.redirect(new URL("/", req.url));
    }

    const res = await fetch(`https://komoju.com/api/v1/sessions/${sessionId}`, {
      headers: {
        Authorization: `Basic ${Buffer.from(secretKey + ":").toString("base64")}`,
      },
    });

    const data = await res.json();
    if (data.status === "completed") {
      const response = NextResponse.json({ success: true });
      response.cookies.set("premium", "1", {
        httpOnly: true,
        secure: true,
        sameSite: "lax",
        maxAge: 60 * 60 * 24 * 365,
        path: "/",
      });
      return response;
    }

    return NextResponse.json({ success: false });
  } catch {
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
