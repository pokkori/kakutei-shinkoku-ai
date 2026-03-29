import { ImageResponse } from "next/og";

export const runtime = "edge";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #0a1628, #0d2b1f)",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ fontSize: 48, marginBottom: 20 }}></div>
        <div style={{ fontSize: 52, fontWeight: 900, color: "#4ade80", marginBottom: 16, textAlign: "center" }}>
          確定申告AI
        </div>
        <div style={{ fontSize: 28, color: "#d1fae5", marginBottom: 24, textAlign: "center" }}>
          フリーランスの確定申告を<br />AIが30分で完全サポート
        </div>
        <div style={{ fontSize: 20, color: "#86efac", marginBottom: 32, textAlign: "center" }}>
          税理士費用¥50,000→¥2,980  14日間返金保証
        </div>
        <div style={{ background: "#16a34a", color: "#fff", fontSize: 20, fontWeight: 700, padding: "10px 32px", borderRadius: 999 }}>
          今すぐ確定申告を完成させる →
        </div>
      </div>
    ),
    { ...size }
  );
}
