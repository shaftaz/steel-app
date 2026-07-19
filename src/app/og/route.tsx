import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";

export const runtime = "edge";

const ACCENTS: Record<string, string> = {
  orange: "#FF5C1F",
  blue: "#8FA3E8",
};

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const title = (searchParams.get("title") || "SteelMath — Steel Calculators & Market Intelligence").slice(0, 120);
  const value = (searchParams.get("value") || "").slice(0, 24);
  const label = (searchParams.get("label") || "").slice(0, 60);
  const accent = ACCENTS[searchParams.get("accent") || "orange"] || ACCENTS.orange;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          background: "#17181A",
          padding: "56px 64px",
          fontFamily: "sans-serif",
        }}
      >
        {/* Header row */}
        <div
          style={{
            display: "flex",
            alignItems: "baseline",
            justifyContent: "space-between",
            borderBottom: "1px solid #2E2F33",
            paddingBottom: 24,
          }}
        >
          <div style={{ display: "flex", alignItems: "baseline" }}>
            <span style={{ color: "#F6F5F2", fontSize: 36, fontWeight: 800, letterSpacing: -1 }}>
              Steel
            </span>
            <span style={{ color: "#FF5C1F", fontSize: 36, fontWeight: 800, letterSpacing: -1 }}>
              Math
            </span>
            <span style={{ color: "#8B8981", fontSize: 18, marginLeft: 10 }}>.COM</span>
          </div>
          <span style={{ color: "#7E8085", fontSize: 18, letterSpacing: 3 }}>
            FREE · NO SIGNUP · VERIFIED FORMULAS
          </span>
        </div>

        {/* Body */}
        <div style={{ display: "flex", flexDirection: "column", flex: 1, justifyContent: "center" }}>
          {label ? (
            <span style={{ color: "#7E8085", fontSize: 22, letterSpacing: 4, marginBottom: 12 }}>
              {label.toUpperCase()}
            </span>
          ) : null}
          {value ? (
            <span style={{ color: accent, fontSize: 130, fontWeight: 700, lineHeight: 1 }}>
              {value}
            </span>
          ) : null}
          <span
            style={{
              color: "#F6F5F2",
              fontSize: value ? 40 : 58,
              fontWeight: 800,
              lineHeight: 1.15,
              letterSpacing: -1,
              marginTop: value ? 24 : 0,
            }}
          >
            {title}
          </span>
        </div>

        {/* Footer strip */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            borderTop: "1px solid #2E2F33",
            paddingTop: 22,
          }}
        >
          <span style={{ color: "#7E8085", fontSize: 18, letterSpacing: 2 }}>
            INSTANT RECALC · WORKS OFFLINE · SHAREABLE RESULTS
          </span>
          <span style={{ color: accent, fontSize: 18, letterSpacing: 2 }}>
            steelmath.com
          </span>
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  );
}
