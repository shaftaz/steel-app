/* ============================================================
   Hydrogen-ready direct reduction: a project status board,
   rendered as static inline SVG so it ships in the article's
   server HTML (crawlable, no client JS). Bars are DRI capacity;
   colour is status as of 9 Nov 2026; the right column is the
   stated start or target year. Geometry is computed from the
   table below; nothing is hand-placed.
   ============================================================ */

type Status = "operating" | "construction" | "delayed" | "suspended" | "pilot";

interface Project {
  name: string;
  place: string;
  mt: number; // Mt DRI per year (0 for pilots)
  h2: string; // hydrogen share
  status: Status;
  year: string;
}

const PROJECTS: Project[] = [
  { name: "thyssenkrupp tkH2Steel", place: "Duisburg, Germany", mt: 2.5, h2: "gas first, H₂ later", status: "delayed", year: "2029 (was 2027)" },
  { name: "ArcelorMittal Gijón", place: "Spain", mt: 2.3, h2: "H₂-ready", status: "suspended", year: "FID suspended" },
  { name: "Stegra", place: "Boden, Sweden", mt: 2.1, h2: "100% H₂", status: "construction", year: "2026 target, start unconfirmed" },
  { name: "HYBRIT demonstration", place: "Gällivare, Sweden", mt: 1.35, h2: "100% H₂", status: "delayed", year: "2027+" },
  { name: "Baowu Zhanjiang", place: "China", mt: 1.0, h2: "up to 70% H₂", status: "operating", year: "since 2024" },
  { name: "POSCO HyREX demo", place: "Pohang, Korea", mt: 0.3, h2: "100% H₂ (fines)", status: "construction", year: "2028" },
  { name: "Nippon Steel pilot", place: "Hasaki, Japan", mt: 0.008, h2: "100% H₂, BF-grade pellets", status: "pilot", year: "scale-up FY2027 · 2040" },
];

const INK = "#17181A";
const MUTED = "#4A4A46";
const FAINT = "#8B8981";
const RULE = "#D8D6D0";
const ORANGE = "#FF5C1F";
const GREY = "#C9C7C1";
const DARK = "#5B5A55";

const STATUS_FILL: Record<Status, string> = {
  operating: ORANGE,
  construction: DARK,
  delayed: GREY,
  suspended: "#FFFFFF",
  pilot: ORANGE,
};
const STATUS_LABEL: Record<Status, string> = {
  operating: "OPERATING",
  construction: "UNDER CONSTRUCTION",
  delayed: "DELAYED",
  suspended: "SUSPENDED / CANCELLED",
  pilot: "PILOT, 1 t/h",
};

const W = 640;
const LEFT = 170;
const RIGHT = 150;
const TOP = 50;
const ROW_H = 46;
const BAR_H = 16;
const MAX = 2.6;

const LABEL_MONO =
  "font-family:'IBM Plex Mono',ui-monospace,SFMono-Regular,Menlo,monospace";
const SANS = "font-family:Archivo,system-ui,sans-serif";
const CAVEAT =
  "Nameplate DRI capacity in million tonnes a year; status and dates as publicly stated at 9 Nov 2026. ArcelorMittal’s Dunkirk DRI (dropped for a 2029 EAF) and its two cancelled German modules are omitted as they no longer have a DRI capacity. The Nippon Steel pilot is drawn as a marker, not a bar.";

function esc(s: string) {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;");
}

function buildSvg(): string {
  const plotW = W - LEFT - RIGHT;
  const x = (v: number) => LEFT + (v / MAX) * plotW;
  const height = TOP + PROJECTS.length * ROW_H + 36;
  const p: string[] = [];

  p.push(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${height}" width="100%" style="display:block;min-width:560px;max-width:${W}px;margin:0 auto" role="img" aria-label="Status board of hydrogen-ready direct reduction projects: thyssenkrupp Duisburg 2.5 Mt delayed to 2029; ArcelorMittal Gijón 2.3 Mt suspended; Stegra Boden 2.1 Mt under construction; HYBRIT 1.35 Mt delayed; Baowu Zhanjiang 1 Mt operating since 2024; POSCO HyREX 0.3 Mt demo for 2028; Nippon Steel 1 tonne per hour pilot operating.">`
  );

  // Legend
  const legend: [Status, string][] = [
    ["operating", "Operating"],
    ["construction", "Under construction"],
    ["delayed", "Delayed"],
    ["suspended", "Suspended"],
  ];
  let lx = LEFT;
  for (const [st, lab] of legend) {
    p.push(
      `<rect x="${lx}" y="14" width="12" height="12" fill="${STATUS_FILL[st]}" stroke="${INK}" stroke-width="${st === "suspended" ? 1 : 0}"/>` +
        `<text x="${lx + 17}" y="24.5" style="${LABEL_MONO};font-size:10px;letter-spacing:0.8px" fill="${MUTED}">${lab.toUpperCase()}</text>`
    );
    lx += 17 + lab.length * 6.6 + 16;
  }
  p.push(
    `<text x="${W - 4}" y="24.5" text-anchor="end" style="${LABEL_MONO};font-size:10px;letter-spacing:0.8px" fill="${FAINT}">START / TARGET</text>`
  );

  // Gridlines
  for (const v of [0, 0.5, 1, 1.5, 2, 2.5]) {
    const gx = x(v);
    p.push(
      `<line x1="${gx.toFixed(1)}" y1="${TOP - 6}" x2="${gx.toFixed(1)}" y2="${TOP + PROJECTS.length * ROW_H}" stroke="${RULE}" stroke-width="1" stroke-dasharray="${v === 0 ? "" : "2 3"}"/>` +
        `<text x="${gx.toFixed(1)}" y="${TOP + PROJECTS.length * ROW_H + 18}" text-anchor="middle" style="${LABEL_MONO};font-size:10px" fill="${FAINT}">${v}</text>`
    );
  }
  p.push(
    `<text x="${x(1.25).toFixed(1)}" y="${TOP + PROJECTS.length * ROW_H + 32}" text-anchor="middle" style="${LABEL_MONO};font-size:10px;letter-spacing:0.8px" fill="${FAINT}">DRI CAPACITY, MT / YEAR</text>`
  );

  PROJECTS.forEach((pr, i) => {
    const y0 = TOP + i * ROW_H;
    const yBar = y0 + 8;
    const fill = STATUS_FILL[pr.status];
    const stroke = pr.status === "suspended" ? `stroke="${INK}" stroke-width="1" stroke-dasharray="3 2"` : "";
    p.push(
      `<text x="${LEFT - 10}" y="${y0 + 15}" text-anchor="end" style="${SANS};font-size:12.5px;font-weight:600" fill="${INK}">${esc(pr.name)}</text>` +
        `<text x="${LEFT - 10}" y="${y0 + 29}" text-anchor="end" style="${LABEL_MONO};font-size:9.5px;letter-spacing:0.5px" fill="${FAINT}">${esc(pr.place.toUpperCase())}</text>`
    );
    if (pr.status === "pilot") {
      p.push(
        `<circle cx="${(LEFT + 6).toFixed(1)}" cy="${yBar + BAR_H / 2}" r="6" fill="${fill}"/>` +
          `<text x="${LEFT + 18}" y="${yBar + 12}" style="${LABEL_MONO};font-size:10px" fill="${MUTED}">${STATUS_LABEL.pilot} · ${esc(pr.h2)}</text>`
      );
    } else {
      const w = Math.max(2, x(pr.mt) - LEFT);
      p.push(
        `<rect x="${LEFT}" y="${yBar}" width="${w.toFixed(1)}" height="${BAR_H}" fill="${fill}" ${stroke}/>` +
          `<text x="${(LEFT + w + 7).toFixed(1)}" y="${yBar + 12}" style="${LABEL_MONO};font-size:10.5px;font-weight:600" fill="${INK}">${pr.mt.toFixed(pr.mt % 1 === 0 ? 1 : 2).replace(/0$/, "")} Mt</text>` +
          `<text x="${LEFT}" y="${yBar + BAR_H + 12}" style="${LABEL_MONO};font-size:9.5px;letter-spacing:0.4px" fill="${FAINT}">${STATUS_LABEL[pr.status]} · ${esc(pr.h2.toUpperCase())}</text>`
      );
    }
    p.push(
      `<text x="${W - 4}" y="${yBar + 12}" text-anchor="end" style="${LABEL_MONO};font-size:10px" fill="${pr.status === "operating" || pr.status === "pilot" ? ORANGE : MUTED}">${esc(pr.year)}</text>`
    );
  });

  p.push("</svg>");
  return p.join("");
}

export function hydrogenDriStatusFigure(): string {
  const svg = buildSvg();
  return (
    `<figure style="margin:2rem 0;border:1px solid ${INK};background:#FFFFFF;padding:20px 18px 14px">` +
    `<style>.hds-hint{display:none}@media (max-width:640px){.hds-hint{display:block}}</style>` +
    `<div class="hds-hint" style="${LABEL_MONO};font-size:10.5px;letter-spacing:1px;color:${ORANGE};margin-bottom:8px">SWIPE TO SEE DATES →</div>` +
    `<div style="overflow-x:auto;-webkit-overflow-scrolling:touch" tabindex="0" aria-label="Hydrogen DRI project status chart (scrolls horizontally on small screens)">${svg}</div>` +
    `<figcaption style="margin-top:14px;padding-top:10px;border-top:1px solid ${RULE};font-size:12.5px;line-height:1.55;color:${MUTED}">` +
    `<strong style="color:${INK}">The hydrogen-ready DRI pipeline, November 2026: the only plants running are a Chinese gas-hydrogen hybrid and a Japanese pilot; Europe’s 100% hydrogen flagships are delayed or suspended.</strong> <em>${CAVEAT}</em>` +
    `</figcaption></figure>`
  );
}
