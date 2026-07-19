"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  InstrumentShell,
  ResultPanel,
  Field,
  SelectField,
  ShowMaths,
  fmt,
  num,
  useCurrency,
} from "@/components/instrument";

type Shape =
  | "round"
  | "square"
  | "hex"
  | "flat"
  | "pipe"
  | "shs"
  | "rhs"
  | "angle"
  | "plate";

const DENSITIES: Record<string, number> = {
  MS: 7850, Fe500: 7850, A36: 7850, SS400: 7850, Q235: 7850, SS304: 8000, SS316: 8027,
  EN8: 7850, EN24: 7850, Aluminium: 2700, Copper: 8940,
};

const GRADE_OPTS = [
  { key: "Fe500", label: "Fe500 TMT — 7,850 kg/m³" },
  { key: "MS", label: "MS (Mild Steel) — 7,850 kg/m³" },
  { key: "A36", label: "A36 (ASTM, US) — 7,850 kg/m³" },
  { key: "SS400", label: "SS400 (JIS, Japan) — 7,850 kg/m³" },
  { key: "Q235", label: "Q235 (GB, China) — 7,850 kg/m³" },
  { key: "SS304", label: "SS 304 — 8,000 kg/m³" },
  { key: "SS316", label: "SS 316 — 8,027 kg/m³" },
  { key: "EN8", label: "EN8 — 7,850 kg/m³" },
  { key: "EN24", label: "EN24 — 7,850 kg/m³" },
  { key: "Aluminium", label: "Aluminium — 2,700 kg/m³" },
  { key: "Copper", label: "Copper — 8,940 kg/m³" },
];

const SHAPE_DEFS: { key: Shape; label: string }[] = [
  { key: "round", label: "Round / TMT" },
  { key: "square", label: "Square bar" },
  { key: "hex", label: "Hex bar" },
  { key: "flat", label: "Flat bar" },
  { key: "pipe", label: "Pipe (OD × WT)" },
  { key: "shs", label: "Square tube" },
  { key: "rhs", label: "Rect tube" },
  { key: "angle", label: "Equal angle" },
  { key: "plate", label: "Sheet / plate" },
];

export default function Calculator() {
  const [shape, setShape] = useState<Shape>("round");
  const [grade, setGrade] = useState("Fe500");
  const [dims, setDims] = useState({
    d: 12, side: 25, hex: 22, fw: 50, ft: 6, od: 48.3, wt: 3.2,
    sa: 40, st2: 3, rw: 60, rh: 40, rt: 3, aa: 50, at: 6,
    pl: 2.5, pw: 1.25, pt: 10, len: 12,
  });
  const [pieces, setPieces] = useState(100);
  const [rate, setRate] = useState(62);
  const [currency, setCurrency] = useCurrency();

  // Restore state from shareable URL params
  useEffect(() => {
    try {
      const p = new URLSearchParams(window.location.search);
      const sh = p.get("shape");
      if (sh && SHAPE_DEFS.some((s) => s.key === sh)) setShape(sh as Shape);
      const g = p.get("grade");
      if (g && DENSITIES[g]) setGrade(g);
      const map: Record<string, keyof typeof dims> = {
        d: "d", a: "side", hex: "hex", w: "fw", t: "ft", od: "od", wt: "wt",
        sa: "sa", st: "st2", rw: "rw", rh: "rh", rt: "rt", aa: "aa", at: "at",
        pl: "pl", pw: "pw", pt: "pt", l: "len",
      };
      const patch: Partial<typeof dims> = {};
      for (const [param, key] of Object.entries(map)) {
        const v = p.get(param);
        if (v !== null) {
          const n = parseFloat(v);
          if (isFinite(n) && n >= 0) patch[key] = n;
        }
      }
      // plate share links use l/w/t for plate dims
      if (sh === "plate") {
        const l = p.get("l"), w = p.get("w"), t = p.get("t");
        if (l) patch.pl = num(l);
        if (w) patch.pw = num(w);
        if (t) patch.pt = num(t);
      }
      const pcs = p.get("pcs");
      if (pcs) setPieces(Math.max(Math.round(num(pcs)), 1));
      if (Object.keys(patch).length) setDims((prev) => ({ ...prev, ...patch }));
    } catch {}
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const s = dims;
  const rho = DENSITIES[grade];
  const k = rho / 1e6;
  const setDim = (key: keyof typeof dims) => (v: string) =>
    setDims((prev) => ({ ...prev, [key]: num(v) }));

  const dim = (label: string, key: keyof typeof dims) => ({
    label,
    value: s[key],
    onChange: setDim(key),
  });

  let kgm = 0;
  let fields: { label: string; value: number; onChange: (v: string) => void }[] = [];
  let formulaText = "";
  let formulaNote = "";
  let shapeName = "";
  const L = dim("LENGTH (M)", "len");

  if (shape === "round") {
    kgm = (Math.PI / 4) * s.d * s.d * k;
    fields = [dim("DIAMETER (MM)", "d"), L];
    shapeName = "ROUND";
    formulaText =
      (rho === 7850 ? `${s.d}² ÷ 162.2 = ` : `π/4 × ${s.d}² × ${rho}/10⁶ = `) +
      `${fmt(kgm, 3)} kg/m`;
    formulaNote = "Constant 162.2 = 10⁶ ÷ (π/4 × 7,850)";
  } else if (shape === "square") {
    kgm = s.side * s.side * k;
    fields = [dim("SIDE (MM)", "side"), L];
    shapeName = "SQUARE";
    formulaText = `${s.side}² × ${rho}/10⁶ = ${fmt(kgm, 3)} kg/m`;
    formulaNote = "Area = a² mm²";
  } else if (shape === "hex") {
    kgm = 0.866025 * s.hex * s.hex * k;
    fields = [dim("ACROSS FLATS (MM)", "hex"), L];
    shapeName = "HEX";
    formulaText = `0.866 × ${s.hex}² × ${rho}/10⁶ = ${fmt(kgm, 3)} kg/m`;
    formulaNote = "Hex area = (√3/2) × AF²";
  } else if (shape === "flat") {
    kgm = s.fw * s.ft * k;
    fields = [dim("WIDTH (MM)", "fw"), dim("THICK (MM)", "ft"), L];
    shapeName = "FLAT";
    formulaText = `${s.fw} × ${s.ft} × ${rho}/10⁶ = ${fmt(kgm, 3)} kg/m`;
    formulaNote = "Area = w × t mm²";
  } else if (shape === "pipe") {
    const id = Math.max(s.od - 2 * s.wt, 0);
    kgm = (Math.PI / 4) * (s.od * s.od - id * id) * k;
    fields = [dim("OD (MM)", "od"), dim("WALL (MM)", "wt"), L];
    shapeName = "PIPE";
    formulaText = `π/4 × (${s.od}² − ${fmt(id, 1)}²) × ${rho}/10⁶ = ${fmt(kgm, 3)} kg/m`;
    formulaNote = "IS 1239 — alt: 0.02466 × WT × (OD − WT)";
  } else if (shape === "shs") {
    const i = Math.max(s.sa - 2 * s.st2, 0);
    kgm = (s.sa * s.sa - i * i) * k;
    fields = [dim("SIDE (MM)", "sa"), dim("WALL (MM)", "st2"), L];
    shapeName = "SHS";
    formulaText = `(${s.sa}² − ${fmt(i, 1)}²) × ${rho}/10⁶ = ${fmt(kgm, 3)} kg/m`;
    formulaNote = "Sharp-corner approximation (≈ +2% vs IS 4923 radius corners)";
  } else if (shape === "rhs") {
    const iw = Math.max(s.rw - 2 * s.rt, 0);
    const ih = Math.max(s.rh - 2 * s.rt, 0);
    kgm = (s.rw * s.rh - iw * ih) * k;
    fields = [dim("WIDTH (MM)", "rw"), dim("HEIGHT (MM)", "rh"), dim("WALL (MM)", "rt"), L];
    shapeName = "RHS";
    formulaText = `(${s.rw}×${s.rh} − ${fmt(iw, 0)}×${fmt(ih, 0)}) × ${rho}/10⁶ = ${fmt(kgm, 3)} kg/m`;
    formulaNote = "Sharp-corner approximation";
  } else if (shape === "angle") {
    kgm = s.at * (2 * s.aa - s.at) * k;
    fields = [dim("LEG (MM)", "aa"), dim("THICK (MM)", "at"), L];
    shapeName = "ANGLE";
    formulaText = `${s.at} × (2×${s.aa} − ${s.at}) × ${rho}/10⁶ = ${fmt(kgm, 3)} kg/m`;
    formulaNote = "Equal angle, sharp-corner (IS 808 tabulated values differ slightly)";
  } else {
    kgm = (s.pt / 1000) * rho;
    fields = [dim("LENGTH (M)", "pl"), dim("WIDTH (M)", "pw"), dim("THICK (MM)", "pt")];
    shapeName = "PLATE";
    formulaText = `${s.pt} × ${rho / 1000} = ${fmt(kgm, 2)} kg/m² · sheet = ${s.pl} × ${s.pw} m`;
    formulaNote = "T(mm) × 7.85 = kg/m² for MS";
  }

  const isPlate = shape === "plate";
  const perPiece = isPlate ? kgm * s.pl * s.pw : kgm * s.len;
  const total = perPiece * pieces;
  const perTonne = perPiece > 0 ? 1000 / perPiece : 0;
  const cost = total * rate;

  const shapeParams: Record<Shape, string> = {
    round: `d=${s.d}&l=${s.len}`,
    square: `a=${s.side}&l=${s.len}`,
    hex: `hex=${s.hex}&l=${s.len}`,
    flat: `w=${s.fw}&t=${s.ft}&l=${s.len}`,
    pipe: `od=${s.od}&wt=${s.wt}&l=${s.len}`,
    shs: `sa=${s.sa}&st=${s.st2}&l=${s.len}`,
    rhs: `rw=${s.rw}&rh=${s.rh}&rt=${s.rt}&l=${s.len}`,
    angle: `aa=${s.aa}&at=${s.at}&l=${s.len}`,
    plate: `pl=${s.pl}&pw=${s.pw}&pt=${s.pt}`,
  };
  const shareUrl = `https://steelmath.com/calculator?shape=${shape}&grade=${grade}&${shapeParams[shape]}&pcs=${pieces}`;
  const resultText = `${shapeName} ${grade} — ${fmt(kgm, 3)}${isPlate ? " kg/m²" : " kg/m"} · ${pieces} pcs = ${fmt(total, 1)} kg${rate > 0 ? ` · ${currency}${fmt(cost, 0)}` : ""} — via steelmath.com`;

  return (
    <div>
      <InstrumentShell
        header={
          <div className="flex flex-wrap border-b border-rule">
            {SHAPE_DEFS.map((sh) => (
              <button
                key={sh.key}
                onClick={() => setShape(sh.key)}
                aria-pressed={shape === sh.key}
                className={`font-mono text-[11.5px] px-3 py-2.5 cursor-pointer border-r border-b border-rule-faint transition-colors ${
                  shape === sh.key
                    ? "bg-ink text-[#FFFFFF]"
                    : "bg-transparent text-ink hover:bg-paper"
                }`}
              >
                {sh.label}
              </button>
            ))}
          </div>
        }
        inputs={
          <>
            <SelectField
              label={`GRADE — ρ ${rho.toLocaleString("en-IN")} KG/M³`}
              value={grade}
              onChange={setGrade}
            >
              {GRADE_OPTS.map((g) => (
                <option key={g.key} value={g.key}>
                  {g.label}
                </option>
              ))}
            </SelectField>
            <div className="grid grid-cols-[repeat(auto-fit,minmax(130px,1fr))] gap-3">
              {fields.map((f) => (
                <Field key={f.label} label={f.label} value={f.value} onChange={f.onChange} />
              ))}
            </div>
            <div className="grid grid-cols-[repeat(auto-fit,minmax(130px,1fr))] gap-3">
              <Field
                label={isPlate ? "SHEETS (PCS)" : "PIECES (PCS)"}
                value={pieces}
                onChange={(v) => setPieces(Math.max(Math.round(num(v)), 0))}
                step={1}
              />
              <Field label="RATE / KG (OPTIONAL)" value={rate} onChange={(v) => setRate(num(v))} />
              <SelectField label="CURRENCY" value={currency} onChange={setCurrency}>
                <option value="₹">₹ INR</option>
                <option value="€">€ EUR</option>
                <option value="$">$ USD</option>
                <option value="£">£ GBP</option>
                <option value="S$">S$ SGD</option>
                <option value="¥">¥ JPY</option>
                <option value="CN¥">CN¥ CNY</option>
                <option value="A$">A$ AUD</option>
                <option value="C$">C$ CAD</option>
                <option value="₫">₫ VND</option>
              </SelectField>
            </div>
            <ShowMaths
              lines={[
                formulaText,
                formulaNote,
                "ρ — MS/Fe500/A36/SS400 7,850 · SS304 8,000 · SS316 8,027 · Al 2,700 · Cu 8,940 kg/m³",
                "Imperial — 1 kg/m = 0.672 lb/ft · 1 t = 2,204.6 lb",
              ]}
              source="SOURCE: IS 1786 / 2062 / 1239 · ASTM A615 / A36 / A53 · JIS G3112 / G3101 · GB/T 1499 / 700 · EN 10025 · LAST VERIFIED 18 JUL 2026"
            />
          </>
        }
        result={
          <ResultPanel
            context={`${shapeName} · ${grade}`}
            headlineLabel={isPlate ? "WEIGHT / M² — KG/M²" : "WEIGHT / METRE — KG/M"}
            headlineValue={fmt(kgm, 3)}
            stats={[
              {
                label: isPlate ? "PER SHEET" : `PER PIECE · ${s.len} M`,
                value: `${fmt(perPiece, 2)} kg`,
              },
              {
                label: `TOTAL — ${pieces} PCS`,
                value: total >= 1000 ? `${fmt(total / 1000, 3)} t` : `${fmt(total, 1)} kg`,
              },
              {
                label: isPlate ? "AREA / SHEET" : "PIECES PER TONNE",
                value: isPlate
                  ? `${fmt(s.pl * s.pw, 2)} m²`
                  : perTonne > 0
                  ? `≈ ${fmt(perTonne, 1)}`
                  : "—",
              },
              {
                label: "TOTAL COST",
                value: rate > 0 ? `${currency}${fmt(cost, 0)}` : "— enter rate",
                accent: true,
              },
            ]}
            formulaLine={formulaText}
            copyText={resultText}
            shareUrl={shareUrl}
          />
        }
      />

      {/* TMT quick reference — tap to load */}
      <div className="border border-rule border-t-0 bg-[#FFFFFF] no-print">
        <div className="px-5 py-3.5 border-b border-rule-faint flex justify-between items-baseline flex-wrap gap-2">
          <span className="font-mono text-[10.5px] tracking-[0.12em] text-muted-3">
            TMT QUICK REFERENCE — d² ÷ 162.2 · 12 M BARS
          </span>
          <Link
            href="/articles/tmt-bar-weight-per-metre-chart"
            className="font-mono text-[11px] tracking-[0.06em] text-accent no-underline hover:text-ink transition-colors"
          >
            FULL CHART →
          </Link>
        </div>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(110px,1fr))]">
          {[8, 10, 12, 16, 20, 25, 28, 32].map((dd) => {
            const w = (dd * dd) / 162.2;
            return (
              <button
                key={dd}
                onClick={() => {
                  setDims((prev) => ({ ...prev, d: dd, len: 12 }));
                  setShape("round");
                  setGrade("Fe500");
                }}
                className="bg-transparent border-r border-t border-rule-faint px-2.5 py-3 cursor-pointer text-left hover:bg-paper"
              >
                <div className="font-mono text-[12.5px] font-semibold text-ink">{dd} mm</div>
                <div className="font-mono text-[11px] text-muted-3 mt-0.5">{fmt(w, 3)} kg/m</div>
                <div className="font-mono text-[11px] text-muted-3">{fmt(w * 12, 2)} kg/bar</div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
