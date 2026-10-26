/* ============================================================
   Steel capital flows, 2025–2026: an original Sankey diagram
   rendered as static inline SVG, so it ships in the article's
   server HTML (crawlable, no client JS). Geometry is computed
   from the data table below; nothing is hand-placed.
   ============================================================ */

type FlowType = "acquisition" | "new";

interface Flow {
  from: string;
  to: string;
  bn: number;
  type: FlowType;
  label: string;
}

/** Mirrors the article's data table (foreign partner's share for JVs). */
const FLOWS: Flow[] = [
  { from: "Japan", to: "United States", bn: 14.9, type: "acquisition", label: "Nippon Steel acquisition of US Steel" },
  { from: "Japan", to: "United States", bn: 11.0, type: "new", label: "Nippon Steel new investment in US Steel by 2028" },
  { from: "Japan", to: "India", bn: 2.5, type: "new", label: "Nippon Steel share of AMNS India expansion" },
  { from: "Korea", to: "United States", bn: 5.8, type: "new", label: "Hyundai Steel–POSCO Louisiana DRI-EAF mill" },
  { from: "Korea", to: "India", bn: 3.6, type: "new", label: "POSCO share of Odisha mill with JSW" },
  { from: "Türkiye", to: "MENA", bn: 2.5, type: "new", label: "Tosyali Algeria programme" },
  { from: "China", to: "MENA", bn: 2.0, type: "new", label: "Baowu share of Ras Al Khair DRI-EAF mill" },
];

const ORIGINS = ["Japan", "Korea", "Türkiye", "China"];
const DESTS = ["United States", "India", "MENA"];

const INK = "#17181A";
const MUTED = "#4A4A46";
const FAINT = "#8B8981";
const ORANGE = "#FF5C1F";

const W = 640;
const TOP = 64;
const K = 8; // px per US$ bn
const GAP = 24;
const NODE_W = 12;
const LX = 148; // left node x
const RX = 480; // right node x
const LABEL_SANS = "font-family:var(--font-archivo),Archivo,system-ui,sans-serif";
const LABEL_MONO = "font-family:var(--font-plex-mono),'IBM Plex Mono',ui-monospace,monospace";

const r1 = (n: number) => Math.round(n * 10) / 10;
const sum = (xs: number[]) => xs.reduce((a, b) => a + b, 0);

function band(x1: number, a0: number, a1: number, x2: number, b0: number, b1: number) {
  const xm = (x1 + x2) / 2;
  return `M${x1},${a0} C${xm},${a0} ${xm},${b0} ${x2},${b0} L${x2},${b1} C${xm},${b1} ${xm},${a1} ${x1},${a1} Z`;
}

function label(x: number, mid: number, name: string, value: string, anchor: "start" | "end") {
  return (
    `<text x="${x}" y="${r1(mid - 3)}" text-anchor="${anchor}" style="${LABEL_SANS};font-size:15px;font-weight:700" fill="${INK}">${name}</text>` +
    `<text x="${x}" y="${r1(mid + 14)}" text-anchor="${anchor}" style="${LABEL_MONO};font-size:13px" fill="${MUTED}">${value}</text>`
  );
}

function buildSvg(): { svg: string; height: number } {
  // Node extents
  const leftY: Record<string, number> = {};
  let y = TOP;
  for (const o of ORIGINS) {
    leftY[o] = y;
    y += sum(FLOWS.filter((f) => f.from === o).map((f) => f.bn)) * K + GAP;
  }
  const rightY: Record<string, number> = {};
  y = TOP;
  for (const d of DESTS) {
    rightY[d] = y;
    y += sum(FLOWS.filter((f) => f.to === d).map((f) => f.bn)) * K + GAP;
  }
  const europeY = y;
  const europeH = 28;
  const legendY = Math.max(europeY + europeH + 44, y + 44);
  const height = legendY + 40;

  // Bands, stacked in table order at both ends
  const lCursor = { ...leftY };
  const rCursor = { ...rightY };
  const bands = FLOWS.map((f) => {
    const h = f.bn * K;
    const a0 = lCursor[f.from];
    const b0 = rCursor[f.to];
    lCursor[f.from] += h;
    rCursor[f.to] += h;
    const fill = f.type === "acquisition" ? "url(#scf-hatch)" : ORANGE;
    const opacity = f.type === "acquisition" ? 1 : 0.55;
    return `<path d="${band(LX + NODE_W, r1(a0), r1(a0 + h), RX, r1(b0), r1(b0 + h))}" fill="${fill}" fill-opacity="${opacity}"><title>${f.label}: ${f.from} → ${f.to}, US$${f.bn.toFixed(1)}bn (${f.type === "acquisition" ? "acquisition of existing assets" : "new capacity / greenfield"})</title></path>`;
  }).join("");

  const nodes =
    ORIGINS.map((o) => {
      const v = sum(FLOWS.filter((f) => f.from === o).map((f) => f.bn));
      const yy = leftY[o];
      return (
        `<rect x="${LX}" y="${r1(yy)}" width="${NODE_W}" height="${r1(v * K)}" fill="${INK}"/>` +
        label(LX - 10, yy + (v * K) / 2, o, `$${v.toFixed(1)}bn`, "end")
      );
    }).join("") +
    DESTS.map((d) => {
      const v = sum(FLOWS.filter((f) => f.to === d).map((f) => f.bn));
      const yy = rightY[d];
      return (
        `<rect x="${RX}" y="${r1(yy)}" width="${NODE_W}" height="${r1(v * K)}" fill="${INK}"/>` +
        label(RX + NODE_W + 10, yy + (v * K) / 2, d, `$${v.toFixed(1)}bn`, "start")
      );
    }).join("") +
    `<rect x="${RX}" y="${europeY}" width="${NODE_W}" height="${europeH}" fill="none" stroke="${FAINT}" stroke-width="1.5" stroke-dasharray="4 3"/>` +
    label(RX + NODE_W + 10, europeY + europeH / 2, "Europe", "$0", "start");

  const total = sum(FLOWS.map((f) => f.bn));
  const header =
    `<text x="0" y="24" style="${LABEL_MONO};font-size:12px;letter-spacing:1.5px" fill="${FAINT}">ORIGIN OF CAPITAL</text>` +
    `<text x="${W}" y="24" text-anchor="end" style="${LABEL_MONO};font-size:12px;letter-spacing:1.5px" fill="${FAINT}">DESTINATION</text>` +
    `<text x="${(LX + RX + NODE_W) / 2}" y="24" text-anchor="middle" style="${LABEL_MONO};font-size:12px;letter-spacing:1.5px" fill="${INK}">TOTAL ≈ US$${total.toFixed(1)}BN</text>`;

  const legend =
    `<rect x="0" y="${legendY - 12}" width="22" height="14" fill="url(#scf-hatch)"/>` +
    `<text x="30" y="${legendY}" style="${LABEL_MONO};font-size:12.5px" fill="${MUTED}">Acquisition of existing assets</text>` +
    `<rect x="300" y="${legendY - 12}" width="22" height="14" fill="${ORANGE}" fill-opacity="0.55"/>` +
    `<text x="330" y="${legendY}" style="${LABEL_MONO};font-size:12.5px" fill="${MUTED}">New capacity / greenfield</text>`;

  const desc = [
    `Announced cross-border steel investment, 2025–2026, total about US$${total.toFixed(1)} billion.`,
    ...FLOWS.map(
      (f) =>
        `${f.from} to ${f.to}: US$${f.bn.toFixed(1)}bn, ${f.type === "acquisition" ? "acquisition of existing assets" : "new capacity"} (${f.label}).`
    ),
    "Europe receives none of the headline cross-border capital.",
  ].join(" ");

  const svg =
    `<svg viewBox="0 0 ${W} ${height}" width="100%" role="img" aria-labelledby="scf-title scf-desc" style="display:block;height:auto;max-width:100%">` +
    `<title id="scf-title">Steel capital flows 2025–2026: about US$${total.toFixed(1)} billion of cross-border steel investment flows from Japan, Korea, Türkiye and China to the United States, India and MENA, and none to Europe</title>` +
    `<desc id="scf-desc">${desc}</desc>` +
    `<defs><pattern id="scf-hatch" width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><rect width="6" height="6" fill="#C9C7C0"/><line x1="0" y1="0" x2="0" y2="6" stroke="${INK}" stroke-width="2" stroke-opacity="0.55"/></pattern></defs>` +
    header +
    bands +
    nodes +
    legend +
    `</svg>`;
  return { svg, height };
}

const CAVEAT =
  "Not exhaustive: selected large announced commitments, 2025–2026. Cross-border capital only; domestic investment, which is substantial in every region including Europe, is not shown. Joint ventures show the foreign partner’s share. Sources: company announcements and trade press.";

/** Full-width figure for the flagship article, or a compact one for reuse. */
export function steelCapitalFlowsFigure(variant: "full" | "compact" = "full"): string {
  const { svg } = buildSvg();
  const maxW = variant === "compact" ? "max-width:520px;" : "";
  const heading =
    variant === "full"
      ? "Selected announced cross-border steel investments, 2025–2026 (US$ billion; foreign partner’s share for joint ventures)"
      : "Where cross-border steel capital went, 2025–2026 (US$ billion)";
  return (
    `<figure style="margin:2rem 0;${maxW}border:1px solid ${INK};background:#FFFFFF;padding:20px 18px 14px">` +
    svg +
    `<figcaption style="margin-top:14px;padding-top:10px;border-top:1px solid #D8D6D0;font-size:12.5px;line-height:1.55;color:${MUTED}">` +
    `<strong style="color:${INK}">${heading}.</strong> <em>${CAVEAT}</em>` +
    (variant === "compact"
      ? ` <a href="/articles/global-steel-investment-capital-map-2026">Full data table →</a>`
      : "") +
    `</figcaption></figure>`
  );
}
