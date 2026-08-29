import { ImageResponse } from "next/og";

export const alt = "MeasureSpark measurement tools and project calculators";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "72px", background: "#f6faf5", color: "#253126", fontFamily: "sans-serif" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 22, fontSize: 36, fontWeight: 700 }}>
        <div style={{ width: 58, height: 58, display: "flex", alignItems: "center", justifyContent: "center", borderRadius: 14, background: "#367a45", color: "white" }}>M</div>
        MeasureSpark
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
        <div style={{ maxWidth: 950, fontSize: 74, lineHeight: 1.04, fontWeight: 750, letterSpacing: "-3px" }}>Measure the job. Plan it right.</div>
        <div style={{ fontSize: 30, color: "#5c695e" }}>Free measurement tools and home project calculators</div>
      </div>
      <div style={{ height: 24, display: "flex", background: "#dcebdd" }} />
    </div>, size,
  );
}
