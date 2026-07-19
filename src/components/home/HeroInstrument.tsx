"use client";

import { useEffect, useState } from "react";

type Shape = "round" | "square" | "flat" | "plate";

const DENSITIES: Record<string, number> = {
  MS: 7850, Fe500: 7850, A36: 7850, SS400: 7850, SS304: 8000, SS316: 8027,
  EN8: 7850, EN24: 7850, Aluminium: 2700, Copper: 8940,
};

const GRADE_OPTS = [
  { key: "Fe500", label: "Fe500 TMT — 7,850 kg/m³" },
  { key: "MS", label: "MS (Mild Steel) — 7,850 kg/m³" },
  { key: "A36", label: "A36 (ASTM, US) — 7,850 kg/m³" },
  { key: "SS400", label: "SS400 (JIS, Japan) — 7,850 kg/m³" },
  { key: "SS304", label: "SS 304 — 8,000 kg/m³" },
  { key: "SS316", label: "SS 316 — 8,027 kg/m³" },
  { key: "EN8", label: "EN8 — 7,850 kg/m³" },
  { key: "EN24", label: "EN24 — 7,850 kg/m³" },
  { key: "Aluminium", label: "Aluminium — 2,700 kg/m³" },
  { key: "Copper", label: "Copper — 8,940 kg/m³" },
];

const QUICK_DIAS = [8, 10, 12, 16, 20, 25, 32];

function fmt(n: number, dp: number) {
  return n.toLocaleString("en-IN", { minimumFractionDigits: dp, maximumFractionDigits: dp });
}

const labelCls = "font-mono text-[10.5px] tracking-[0.1em] text-muted-3";
const inputCls =
  "bg-[#FFFFFF] border border-input-border text-ink font-mono text-[17px] px-3 py-2.5 outline-none w-full focus:border-accent";

export default function HeroInstrument() {
  const [shape, setShape] = useState<Shape>("round");
  const [grade, setGrade] = useState("Fe500");
  const [d, setD] = useState(12);
  const [side, setSide] = useState(25);
  const [fw, setFw] = useState(50);
  const [ft, setFt] = useState(6);
  const [pl, setPl] = useState(2.5);
  const [pw, setPw] = useState(1.25);
  const [pt, setPt] = useState(10);
  const [len, setLen] = useState(12);
  const [unit, setUnit] = useState<"kg" | "t">("kg");
  const [mathsOpen, setMathsOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [shared, setShared] = useState(false);

  useEffect(() => {
    try {
      const u = localStorage.getItem("sm_unit");
      if (u === "t" || u === "kg") setUnit(u);
    } catch {}
  }, []);

  const setUnitPersist = (u: "kg" | "t") => {
    setUnit(u);
    try { localStorage.setItem("sm_unit", u); } catch {}
  };

  const num = (v: string) => {
    const n = parseFloat(v);
    return isFinite(n) && n >= 0 ? n : 0;
  };

  const rho = DENSITIES[grade];
  let perUnit = 0;
  let total = 0;
  let unitLabel = "WEIGHT / METRE — KG/M";
  let totalLabel = `TOTAL · ${len} M`;
  let formulaText = "";

  if (shape === "round") {
    perUnit = (Math.PI / 4) * d * d * rho / 1e6;
    total = perUnit * len;
    formulaText = rho === 7850
      ? `${d}² ÷ 162.2 = ${fmt(perUnit, 3)} kg/m`
      : `π/4 × ${d}² × ${rho.toLocaleString("en-IN")} ÷ 10⁶ = ${fmt(perUnit, 3)} kg/m`;
  } else if (shape === "square") {
    perUnit = side * side * rho / 1e6;
    total = perUnit * len;
    formulaText = `${side}² × ${rho.toLocaleString("en-IN")} ÷ 10⁶ = ${fmt(perUnit, 3)} kg/m`;
  } else if (shape === "flat") {
    perUnit = fw * ft * rho / 1e6;
    total = perUnit * len;
    formulaText = `${fw} × ${ft} × ${rho.toLocaleString("en-IN")} ÷ 10⁶ = ${fmt(perUnit, 3)} kg/m`;
  } else {
    perUnit = (pt / 1000) * rho;
    total = pl * pw * (pt / 1000) * rho;
    unitLabel = "WEIGHT / M² — KG/M²";
    totalLabel = `TOTAL · ${pl} × ${pw} M`;
    formulaText = `${pl} × ${pw} × ${pt} × ${rho / 1000} = ${fmt(total, 1)} kg`;
  }

  const totalDisplay = unit === "t" ? `${fmt(total / 1000, 4)} t` : `${fmt(total, 1)} kg`;
  const perFoot = shape === "plate" ? "—" : `${fmt(perUnit * 0.3048, 3)} kg/ft`;

  const shapeParams: Record<Shape, string> = {
    round: `d=${d}&l=${len}`,
    square: `a=${side}&l=${len}`,
    flat: `w=${fw}&t=${ft}&l=${len}`,
    plate: `l=${pl}&w=${pw}&t=${pt}`,
  };
  const shareUrl = `https://steelmath.com/calculator?shape=${shape}&grade=${grade}&${shapeParams[shape]}`;
  const resultText = `${grade} ${shape} — ${fmt(perUnit, 3)} ${shape === "plate" ? "kg/m²" : "kg/m"} · total ${totalDisplay} — via steelmath.com`;

  const copyText = (text: string, done: (v: boolean) => void) => {
    const finish = () => { done(true); setTimeout(() => done(false), 1600); };
    if (navigator.clipboard?.writeText) navigator.clipboard.writeText(text).then(finish, finish);
    else finish();
  };

  const tabs: { key: Shape; label: string; icon: React.ReactNode }[] = [
    { key: "round", label: "Round / TMT", icon: <span className="w-[13px] h-[13px] border-2 border-current rounded-full block" /> },
    { key: "square", label: "Square Bar", icon: <span className="w-3 h-3 border-2 border-current block" /> },
    { key: "flat", label: "Flat / Rect", icon: <span className="w-[17px] h-[9px] border-2 border-current block mt-0.5" /> },
    { key: "plate", label: "Sheet / Plate", icon: <span className="w-[18px] h-[5px] border-2 border-current block mt-1" /> },
  ];

  return (
    <div className="print-block">
      <div className="border border-ink bg-[#FFFFFF] grid grid-cols-1 lg:grid-cols-2">
        {/* Inputs */}
        <div className="lg:border-r border-rule">
          <div className="grid grid-cols-4 border-b border-rule">
            {tabs.map((t, i) => (
              <button
                key={t.key}
                onClick={() => setShape(t.key)}
                aria-pressed={shape === t.key}
                className={`relative bg-transparent text-ink pt-3 pb-2.5 px-1 cursor-pointer flex flex-col items-center gap-1.5 hover:bg-paper min-h-[44px] ${i < 3 ? "border-r border-rule" : ""}`}
              >
                {t.icon}
                <span className="text-[11.5px] font-semibold">{t.label}</span>
                <span
                  className="absolute left-0 right-0 bottom-0 h-0.5 bg-accent transition-opacity"
                  style={{ opacity: shape === t.key ? 1 : 0 }}
                />
              </button>
            ))}
          </div>
          <div className="p-5 flex flex-col gap-3.5">
            <label className="flex flex-col gap-1.5">
              <span className={labelCls}>GRADE — ρ {rho.toLocaleString("en-IN")} KG/M³</span>
              <select
                value={grade}
                onChange={(e) => setGrade(e.target.value)}
                className="bg-[#FFFFFF] border border-input-border text-ink font-mono text-[13.5px] px-3 py-2.5 outline-none w-full focus:border-accent"
              >
                {GRADE_OPTS.map((g) => (
                  <option key={g.key} value={g.key}>{g.label}</option>
                ))}
              </select>
            </label>

            {shape === "round" && (
              <>
                <div className="grid grid-cols-2 gap-3">
                  <label className="flex flex-col gap-1.5">
                    <span className={labelCls}>DIAMETER (MM)</span>
                    <input type="number" value={d} onChange={(e) => setD(num(e.target.value))} className={inputCls} />
                  </label>
                  <label className="flex flex-col gap-1.5">
                    <span className={labelCls}>LENGTH (M)</span>
                    <input type="number" value={len} onChange={(e) => setLen(num(e.target.value))} className={inputCls} />
                  </label>
                </div>
                <div className="flex gap-2 items-center flex-wrap">
                  <span className={labelCls}>COMMON —</span>
                  {QUICK_DIAS.map((q) => (
                    <button
                      key={q}
                      onClick={() => setD(q)}
                      className="bg-transparent border border-input-border text-muted font-mono text-[11.5px] px-2.5 py-1 cursor-pointer hover:border-ink hover:text-ink transition-colors"
                    >
                      {q}
                    </button>
                  ))}
                </div>
              </>
            )}
            {shape === "square" && (
              <div className="grid grid-cols-2 gap-3">
                <label className="flex flex-col gap-1.5">
                  <span className={labelCls}>SIDE (MM)</span>
                  <input type="number" value={side} onChange={(e) => setSide(num(e.target.value))} className={inputCls} />
                </label>
                <label className="flex flex-col gap-1.5">
                  <span className={labelCls}>LENGTH (M)</span>
                  <input type="number" value={len} onChange={(e) => setLen(num(e.target.value))} className={inputCls} />
                </label>
              </div>
            )}
            {shape === "flat" && (
              <div className="grid grid-cols-3 gap-3">
                <label className="flex flex-col gap-1.5">
                  <span className={labelCls}>WIDTH (MM)</span>
                  <input type="number" value={fw} onChange={(e) => setFw(num(e.target.value))} className={inputCls} />
                </label>
                <label className="flex flex-col gap-1.5">
                  <span className={labelCls}>THICK (MM)</span>
                  <input type="number" value={ft} onChange={(e) => setFt(num(e.target.value))} className={inputCls} />
                </label>
                <label className="flex flex-col gap-1.5">
                  <span className={labelCls}>LENGTH (M)</span>
                  <input type="number" value={len} onChange={(e) => setLen(num(e.target.value))} className={inputCls} />
                </label>
              </div>
            )}
            {shape === "plate" && (
              <div className="grid grid-cols-3 gap-3">
                <label className="flex flex-col gap-1.5">
                  <span className={labelCls}>LENGTH (M)</span>
                  <input type="number" value={pl} onChange={(e) => setPl(num(e.target.value))} className={inputCls} />
                </label>
                <label className="flex flex-col gap-1.5">
                  <span className={labelCls}>WIDTH (M)</span>
                  <input type="number" value={pw} onChange={(e) => setPw(num(e.target.value))} className={inputCls} />
                </label>
                <label className="flex flex-col gap-1.5">
                  <span className={labelCls}>THICK (MM)</span>
                  <input type="number" value={pt} onChange={(e) => setPt(num(e.target.value))} className={inputCls} />
                </label>
              </div>
            )}

            <button
              onClick={() => setMathsOpen(!mathsOpen)}
              aria-expanded={mathsOpen}
              className="bg-transparent border-t border-dashed border-rule pt-3 mt-0.5 cursor-pointer flex items-center gap-2 font-mono text-[11.5px] tracking-[0.08em] text-muted hover:text-ink text-left"
            >
              <span>{mathsOpen ? "▾" : "▸"}</span>
              <span>SHOW THE MATHS</span>
            </button>
            {mathsOpen && (
              <div className="font-mono text-xs leading-[1.8] text-muted bg-paper border border-rule px-4 py-3.5">
                <div className="text-ink">{formulaText}</div>
                <div>Constant 162.2 = 10⁶ ÷ (π/4 × 7,850) — from steel density 7,850 kg/m³</div>
                <div>ρ — MS/Fe500/A36/SS400 7,850 · SS304 8,000 · SS316 8,027 · Al 2,700 · Cu 8,940 kg/m³</div>
                <div>Imperial — 1 kg/m = 0.672 lb/ft · 1 t = 2,204.6 lb</div>
                <div className="text-muted-3 mt-1.5">SOURCE: IS 1786 / IS 2062 · ASTM A615 / A36 · JIS G3112 / G3101 · EN 10025 · LAST VERIFIED 18 JUL 2026</div>
              </div>
            )}
          </div>
        </div>

        {/* Result */}
        <div className="bg-ink text-paper flex flex-col">
          <div className="flex items-center justify-between px-5 py-3.5 border-b border-ink-border">
            <span className="font-mono text-[11px] tracking-[0.12em] text-[#9A9B9E] inline-flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-accent rounded-full inline-block pulse-dot" />
              RESULT — RECALCULATES AS YOU TYPE
            </span>
            <div className="flex border border-[#34353A]">
              {(["kg", "t"] as const).map((u) => (
                <button
                  key={u}
                  onClick={() => setUnitPersist(u)}
                  aria-pressed={unit === u}
                  className={`font-mono text-[11px] tracking-[0.06em] px-2.5 py-1 cursor-pointer ${unit === u ? "bg-accent text-ink" : "bg-transparent text-[#9A9B9E]"}`}
                >
                  {u.toUpperCase()}
                </button>
              ))}
            </div>
          </div>
          <div className="px-5 py-6 flex-1">
            <div className="font-mono text-[10.5px] tracking-[0.12em] text-[#7E8085] mb-2">{unitLabel}</div>
            <div className="font-mono text-[clamp(40px,6vw,58px)] font-semibold text-accent leading-none tracking-[-0.01em]">
              {fmt(perUnit, 3)}
            </div>
            <div className="flex justify-between items-baseline mt-6 border-t border-ink-border pt-4">
              <span className="font-mono text-[10.5px] tracking-[0.12em] text-[#7E8085]">{totalLabel}</span>
              <span className="font-mono text-[27px] font-semibold">{totalDisplay}</span>
            </div>
            <div className="flex justify-between items-baseline mt-3">
              <span className="font-mono text-[10.5px] tracking-[0.12em] text-[#7E8085]">
                {shape === "plate" ? `AREA — ${fmt(pl * pw, 2)} M²` : "PER FOOT"}
              </span>
              <span className="font-mono text-[15px] text-[#C9CACC]">
                {shape === "plate" ? `${fmt(pl * pw, 2)} m²` : perFoot}
              </span>
            </div>
          </div>
          <div className="grid grid-cols-3 border-t border-ink-border no-print">
            <button onClick={() => copyText(resultText, setCopied)}
              className="bg-transparent border-r border-ink-border text-paper font-mono text-[11.5px] tracking-[0.08em] py-3.5 px-2 cursor-pointer hover:bg-panel-dark">
              {copied ? "COPIED ✓" : "COPY RESULT"}
            </button>
            <button onClick={() => copyText(shareUrl, setShared)}
              className="bg-transparent border-r border-ink-border text-paper font-mono text-[11.5px] tracking-[0.08em] py-3.5 px-2 cursor-pointer hover:bg-panel-dark">
              {shared ? "LINK COPIED ✓" : "SHARE LINK"}
            </button>
            <button onClick={() => window.print()}
              className="bg-transparent text-paper font-mono text-[11.5px] tracking-[0.08em] py-3.5 px-2 cursor-pointer hover:bg-panel-dark">
              DOWNLOAD PDF
            </button>
          </div>
        </div>
      </div>
      <div className="flex justify-between items-center border border-rule border-t-0 bg-[#FFFFFF] px-5 py-2.5 flex-wrap gap-2">
        <span className="font-mono text-[10.5px] tracking-[0.1em] text-muted-3">
          INSTANT RECALC · WORKS OFFLINE (PWA) · SHAREABLE RESULTS · WCAG 2.2 AA
        </span>
        <span className="font-mono text-[10.5px] tracking-[0.1em] text-muted-3">
          FORMULAS LAST VERIFIED — 18 JUL 2026
        </span>
      </div>
    </div>
  );
}
