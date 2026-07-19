import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";

export const runtime = "edge";

const ACCENTS: Record<string, string> = {
  orange: "#FF5C1F",
  blue: "#8FA3E8",
};

/* Bar chart card: India data centre capacity 2025 → 2030 with constraint gates */
function dcIndiaChart() {
  const bars = [
    { label: "2025", value: "1.7 GW", h: 42 },
    { label: "2026", value: "~2.2 GW", h: 55 },
    { label: "2030", value: "8–10 GW", h: 225 },
  ];
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          background: "#17181A",
          padding: "52px 64px",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "baseline",
            justifyContent: "space-between",
            borderBottom: "1px solid #2E2F33",
            paddingBottom: 20,
          }}
        >
          <div style={{ display: "flex", alignItems: "baseline" }}>
            <span style={{ color: "#F6F5F2", fontSize: 32, fontWeight: 800 }}>Steel</span>
            <span style={{ color: "#FF5C1F", fontSize: 32, fontWeight: 800 }}>Math</span>
            <span style={{ color: "#8B8981", fontSize: 16, marginLeft: 8 }}>.COM</span>
          </div>
          <span style={{ color: "#7E8085", fontSize: 17, letterSpacing: 3 }}>
            ANALYSIS · MARKET INTELLIGENCE
          </span>
        </div>

        <div style={{ display: "flex", flex: 1, alignItems: "flex-end", gap: 48, paddingTop: 36 }}>
          <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
            <span style={{ color: "#F6F5F2", fontSize: 42, fontWeight: 800, lineHeight: 1.15, letterSpacing: -1 }}>
              India&apos;s data centre boom: 5x capacity by 2030
            </span>
            <span style={{ color: "#7E8085", fontSize: 20, marginTop: 18, letterSpacing: 2 }}>
              GATED BY — POWER · WATER · TALENT · REGULATION
            </span>
            <span style={{ color: "#FF5C1F", fontSize: 20, marginTop: 26, letterSpacing: 2 }}>
              $180B PIPELINE · THE STEEL BUYER&apos;S READ
            </span>
          </div>
          <div style={{ display: "flex", alignItems: "flex-end", gap: 30 }}>
            {bars.map((b) => (
              <div key={b.label} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
                <span style={{ color: "#8FA3E8", fontSize: 19, fontWeight: 700 }}>{b.value}</span>
                <div style={{ width: 88, height: b.h, background: b.label === "2030" ? "#FF5C1F" : "#8FA3E8", display: "flex" }} />
                <span style={{ color: "#7E8085", fontSize: 18 }}>{b.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            borderTop: "1px solid #2E2F33",
            paddingTop: 18,
            marginTop: 24,
          }}
        >
          <span style={{ color: "#7E8085", fontSize: 16, letterSpacing: 2 }}>
            1.7 GW (2025) → 8–10 GW (2030) · SOURCES VERIFIED
          </span>
          <span style={{ color: "#FF5C1F", fontSize: 16, letterSpacing: 2 }}>steelmath.com</span>
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  );
}

/* Timeline card: gigafactory delivery — leaders vs average + slip zone */
function gigafactoryChart() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          background: "#17181A",
          padding: "52px 64px",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "baseline",
            justifyContent: "space-between",
            borderBottom: "1px solid #2E2F33",
            paddingBottom: 20,
          }}
        >
          <div style={{ display: "flex", alignItems: "baseline" }}>
            <span style={{ color: "#F6F5F2", fontSize: 32, fontWeight: 800 }}>Steel</span>
            <span style={{ color: "#FF5C1F", fontSize: 32, fontWeight: 800 }}>Math</span>
            <span style={{ color: "#8B8981", fontSize: 16, marginLeft: 8 }}>.COM</span>
          </div>
          <span style={{ color: "#7E8085", fontSize: 17, letterSpacing: 3 }}>
            ANALYSIS · INDUSTRIAL CAPITAL PROJECTS
          </span>
        </div>

        <span style={{ color: "#F6F5F2", fontSize: 44, fontWeight: 800, lineHeight: 1.15, letterSpacing: -1, marginTop: 34 }}>
          Late capacity is worthless capacity
        </span>

        <div style={{ display: "flex", flexDirection: "column", gap: 26, marginTop: 40, flex: 1 }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <span style={{ color: "#7E8085", fontSize: 18, letterSpacing: 2 }}>
              LEADERS — 18–24 MONTHS TO SOP
            </span>
            <div style={{ display: "flex", width: 440, height: 34, background: "#8FA3E8" }} />
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <span style={{ color: "#7E8085", fontSize: 18, letterSpacing: 2 }}>
              AVERAGE PROJECT — PLAN + 6–9 MONTH SLIP
            </span>
            <div style={{ display: "flex" }}>
              <div style={{ display: "flex", width: 560, height: 34, background: "#4A4B50" }} />
              <div
                style={{
                  display: "flex",
                  width: 250,
                  height: 34,
                  background: "#FF5C1F",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <span style={{ color: "#17181A", fontSize: 16, fontWeight: 700 }}>SLIP</span>
              </div>
            </div>
            <span style={{ color: "#FF5C1F", fontSize: 19, fontWeight: 700, letterSpacing: 1 }}>
              $250M AT RISK — 40 GWh REFERENCE PLANT
            </span>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            borderTop: "1px solid #2E2F33",
            paddingTop: 18,
          }}
        >
          <span style={{ color: "#7E8085", fontSize: 16, letterSpacing: 2 }}>
            2,500+ GWh CAPACITY vs ~1.6 TWh DEMAND · THE EXECUTION SPREAD
          </span>
          <span style={{ color: "#FF5C1F", fontSize: 16, letterSpacing: 2 }}>steelmath.com</span>
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  );
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  if (searchParams.get("chart") === "dc-india") return dcIndiaChart();
  if (searchParams.get("chart") === "gigafactory") return gigafactoryChart();
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
