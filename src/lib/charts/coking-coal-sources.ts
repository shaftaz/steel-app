/* ============================================================
   India's coking coal import sources, 2019 vs 2025: an original
   paired-bar chart rendered as static inline SVG so it ships in
   the article's server HTML (crawlable, no client JS). Geometry
   is computed from the data below; nothing is hand-placed.
   Source: Ministry of Steel deposition to the Parliamentary
   Standing Committee, as reported by SMM (2026).
   ============================================================ */

interface Row {
  origin: string;
  y2019: number;
  y2025: number;
}

const ROWS: Row[] = [
  { origin: "Australia", y2019: 73.0, y2025: 54.0 },
  { origin: "United States", y2019: 8.0, y2025: 17.0 },
  { origin: "Russia", y2019: 0.6, y2025: 8.2 },
  { origin: "Mozambique", y2019: 4.0, y2025: 7.3 },
  { origin: "Indonesia", y2019: 2.5, y2025: 4.0 },
  { origin: "Others (Canada etc.)", y2019: 11.9, y2025: 9.5 },
];

const INK = "#17181A";
const MUTED = "#4A4A46";
const FAINT = "#8B8981";
const RULE = "#D8D6D0";
const ORANGE = "#FF5C1F";
const GREY = "#C9C7C1";

const W = 640;
const LEFT = 150;
const RIGHT = 56;
const TOP = 44;
const ROW_H = 44;
const BAR_H = 13;
const GAP = 4;
const MAX = 80; // % scale

const LABEL_MONO =
  "font-family:'IBM Plex Mono',ui-monospace,SFMono-Regular,Menlo,monospace";
const CAVEAT =
  "Shares of India’s coking coal imports by origin, calendar 2019 versus 2025. “Others” is the residual and is dominated by Canada. Percentages as deposed; residuals computed.";

function esc(s: string) {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;");
}

function buildSvg(): string {
  const plotW = W - LEFT - RIGHT;
  const x = (v: number) => LEFT + (v / MAX) * plotW;
  const height = TOP + ROWS.length * ROW_H + 34;
  const parts: string[] = [];

  parts.push(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${height}" width="100%" style="display:block;min-width:520px;max-width:${W}px;margin:0 auto" role="img" aria-label="Paired bar chart: India’s coking coal import shares by origin, 2019 versus 2025. Australia falls from 73 to 54 percent; the United States rises from 8 to 17; Russia from under 1 to 8; Mozambique from 4 to 7.">`
  );

  // Legend
  parts.push(
    `<rect x="${LEFT}" y="12" width="14" height="${BAR_H}" fill="${GREY}"/>` +
      `<text x="${LEFT + 20}" y="23" style="${LABEL_MONO};font-size:10.5px;letter-spacing:1px" fill="${MUTED}">2019</text>` +
      `<rect x="${LEFT + 70}" y="12" width="14" height="${BAR_H}" fill="${ORANGE}"/>` +
      `<text x="${LEFT + 90}" y="23" style="${LABEL_MONO};font-size:10.5px;letter-spacing:1px" fill="${MUTED}">2025</text>` +
      `<text x="${W - RIGHT}" y="23" text-anchor="end" style="${LABEL_MONO};font-size:10.5px;letter-spacing:1px" fill="${FAINT}">SHARE OF IMPORTS, %</text>`
  );

  // Gridlines
  for (const v of [0, 20, 40, 60, 80]) {
    const gx = x(v);
    parts.push(
      `<line x1="${gx}" y1="${TOP - 6}" x2="${gx}" y2="${TOP + ROWS.length * ROW_H}" stroke="${RULE}" stroke-width="1" stroke-dasharray="${v === 0 ? "" : "2 3"}"/>` +
        `<text x="${gx}" y="${TOP + ROWS.length * ROW_H + 18}" text-anchor="middle" style="${LABEL_MONO};font-size:10px" fill="${FAINT}">${v}</text>`
    );
  }

  ROWS.forEach((r, i) => {
    const y0 = TOP + i * ROW_H;
    const yA = y0 + 6;
    const yB = yA + BAR_H + GAP;
    const wA = Math.max(1, x(r.y2019) - LEFT);
    const wB = Math.max(1, x(r.y2025) - LEFT);
    const delta = r.y2025 - r.y2019;
    const deltaTxt = `${delta > 0 ? "+" : "−"}${Math.abs(delta).toFixed(delta % 1 === 0 ? 0 : 1)} pt`;
    parts.push(
      `<text x="${LEFT - 10}" y="${y0 + 21}" text-anchor="end" style="font-family:Archivo,system-ui,sans-serif;font-size:12.5px;font-weight:600" fill="${INK}">${esc(r.origin)}</text>` +
        `<rect x="${LEFT}" y="${yA}" width="${wA.toFixed(1)}" height="${BAR_H}" fill="${GREY}"/>` +
        `<text x="${(LEFT + wA + 6).toFixed(1)}" y="${yA + 10.5}" style="${LABEL_MONO};font-size:10.5px" fill="${MUTED}">${r.y2019.toFixed(r.y2019 % 1 === 0 ? 0 : 1)}</text>` +
        `<rect x="${LEFT}" y="${yB}" width="${wB.toFixed(1)}" height="${BAR_H}" fill="${ORANGE}"/>` +
        `<text x="${(LEFT + wB + 6).toFixed(1)}" y="${yB + 10.5}" style="${LABEL_MONO};font-size:10.5px;font-weight:600" fill="${INK}">${r.y2025.toFixed(r.y2025 % 1 === 0 ? 0 : 1)}</text>` +
        `<text x="${W - 4}" y="${y0 + 21}" text-anchor="end" style="${LABEL_MONO};font-size:10.5px" fill="${delta > 0 ? ORANGE : FAINT}">${deltaTxt}</text>`
    );
  });

  parts.push("</svg>");
  return parts.join("");
}

export function cokingCoalSourcesFigure(): string {
  const svg = buildSvg();
  return (
    `<figure style="margin:2rem 0;border:1px solid ${INK};background:#FFFFFF;padding:20px 18px 14px">` +
    `<style>.ccs-hint{display:none}@media (max-width:600px){.ccs-hint{display:block}}</style>` +
    `<div class="ccs-hint" style="${LABEL_MONO};font-size:10.5px;letter-spacing:1px;color:${ORANGE};margin-bottom:8px">SWIPE TO SEE CHANGE →</div>` +
    `<div style="overflow-x:auto;-webkit-overflow-scrolling:touch" tabindex="0" aria-label="India coking coal import sources chart (scrolls horizontally on small screens)">${svg}</div>` +
    `<figcaption style="margin-top:14px;padding-top:10px;border-top:1px solid ${RULE};font-size:12.5px;line-height:1.55;color:${MUTED}">` +
    `<strong style="color:${INK}">India’s coking coal import mix is diversifying away from Australia, but only slowly.</strong> <em>${CAVEAT}</em>` +
    `</figcaption></figure>`
  );
}
