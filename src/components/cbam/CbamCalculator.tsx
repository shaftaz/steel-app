"use client";

import { useEffect, useState } from "react";

/* ============================================================
   CBAM cost model, constants and formulas ported verbatim from
   the verified reference implementation (CBAM Calculator v2).
   MODEL & FACTORS LAST VERIFIED — 19 JUL 2026.
   ============================================================ */

type Regime = "eu" | "uk";
type Basis = "default" | "actual";
type View = "importer" | "supplier";
type Route = "bf" | "eaf" | "dri";

interface SteelVariant {
  key: string; label: string; cn: string;
  bf: number; eaf: number; dri: number; def: number;
}
interface BaseVariant {
  key: string; label: string; cn: string; base: number; def: number;
}
type Variant = SteelVariant | BaseVariant;

const COMMODITIES: Record<
  string,
  { label: string; chip: string; scope: string; variants: Variant[] }
> = {
  steel: {
    label: "Iron & Steel", chip: "≈ 1.9–2.8 t",
    scope: "CH. 72–73 · EU IN SCOPE SINCE 2026 · UK FROM 2027 (SCRAP EXCLUDED)",
    variants: [
      { key: "hrc", label: "Hot-rolled coil (HRC)", cn: "CN 7208", bf: 2.3, eaf: 0.7, dri: 1.4, def: 2.8 },
      { key: "crc", label: "Cold-rolled coil (CRC)", cn: "CN 7209", bf: 2.5, eaf: 0.9, dri: 1.6, def: 3.0 },
      { key: "rebar", label: "Rebar / TMT", cn: "CN 7214", bf: 2.0, eaf: 0.6, dri: 1.2, def: 2.5 },
      { key: "wire", label: "Wire rod", cn: "CN 7213", bf: 2.1, eaf: 0.65, dri: 1.25, def: 2.6 },
      { key: "plate", label: "Plate", cn: "CN 7208/7225", bf: 2.4, eaf: 0.85, dri: 1.5, def: 2.9 },
      { key: "hdg", label: "Coated / HDG", cn: "CN 7210", bf: 2.7, eaf: 1.1, dri: 1.8, def: 3.2 },
      { key: "pipe", label: "Pipe / tube", cn: "CN 7304–7306", bf: 2.6, eaf: 1.0, dri: 1.7, def: 3.1 },
      { key: "billet", label: "Billet / slab", cn: "CN 7207", bf: 1.9, eaf: 0.55, dri: 1.15, def: 2.4 },
      { key: "pig", label: "Pig iron", cn: "CN 7201 (precursor)", bf: 1.9, eaf: 1.9, dri: 1.9, def: 2.2 },
      { key: "dwn", label: "Fasteners / downstream", cn: "CN 7318 (EU proposed scope from 2028)", bf: 2.8, eaf: 1.2, dri: 1.9, def: 3.3 },
    ],
  },
  alu: {
    label: "Aluminium", chip: "≈ 1.6 t",
    scope: "CH. 76 · DIRECT EMISSIONS BASIS (ELECTRICITY EXCLUDED — EU PENDING REVIEW, UK UNTIL 2029+) · SCRAP EXCLUDED IN UK",
    variants: [
      { key: "prim", label: "Primary unwrought", cn: "CN 7601", base: 1.6, def: 2.1 },
      { key: "recy", label: "Recycled / remelt billet", cn: "CN 7601", base: 0.35, def: 0.55 },
      { key: "semi", label: "Rolled / extruded semis", cn: "CN 7604–7610", base: 2.0, def: 2.6 },
    ],
  },
  cement: {
    label: "Cement", chip: "≈ 0.65 t",
    scope: "CN 2523 · CLINKER IS THE EMISSIONS DRIVER",
    variants: [
      { key: "clinker", label: "Clinker", cn: "CN 2523 10", base: 0.85, def: 1.05 },
      { key: "cem1", label: "Grey cement (CEM I)", cn: "CN 2523 29", base: 0.65, def: 0.82 },
      { key: "blend", label: "Blended cement", cn: "CN 2523 90", base: 0.55, def: 0.7 },
    ],
  },
  fert: {
    label: "Fertilisers", chip: "≈ 2.4 t",
    scope: "CN 2808 / 3102–3105 · CO₂ + N₂O COUNTED",
    variants: [
      { key: "amm", label: "Ammonia", cn: "CN 2814", base: 2.4, def: 3.0 },
      { key: "urea", label: "Urea", cn: "CN 3102 10", base: 1.9, def: 2.4 },
      { key: "an", label: "Ammonium nitrate / nitric", cn: "CN 3102 30 / 2808", base: 2.6, def: 3.3 },
    ],
  },
  h2: {
    label: "Hydrogen", chip: "≈ 9 t",
    scope: "CN 2804 10 · ROUTE DOMINATES THE NUMBER",
    variants: [
      { key: "smr", label: "SMR (grey)", cn: "CN 2804 10", base: 9.0, def: 11.0 },
      { key: "ccs", label: "SMR + CCS (blue)", cn: "CN 2804 10", base: 3.0, def: 4.0 },
      { key: "ely", label: "Electrolytic (renewable PPA)", cn: "CN 2804 10", base: 0.1, def: 0.4 },
    ],
  },
};

const COUNTRIES: Record<
  string,
  { label: string; mult: number; paid: number; note: string }
> = {
  IN: { label: "India", mult: 1.15, paid: 0, note: "INDIA. CCTS phasing in; no effective carbon price paid yet → 0 deductible today. Verified actuals are the lever against defaults." },
  TR: { label: "Turkey", mult: 0.55, paid: 0, note: "TURKEY. TR-ETS pilot live, free allocation heavy → effective price ≈ 0 for now. EAF-heavy route mix is a real advantage." },
  CN: { label: "China", mult: 1.05, paid: 9, note: "CHINA, national ETS covers steel & aluminium; ≈ €9/tCO₂e indicative effective price → small deduction. Expect scrutiny on data provenance." },
  VN: { label: "Vietnam", mult: 1.0, paid: 0, note: "VIETNAM, pilot ETS scheduled, no effective price yet → 0 deductible. Move early on verified actuals." },
  KR: { label: "South Korea", mult: 1.0, paid: 7, note: "SOUTH KOREA. K-ETS since 2015; deduct the price net of free allocation (≈ €7 indicative), not the gross ETS price." },
  JP: { label: "Japan", mult: 0.95, paid: 2, note: "JAPAN. GX-ETS turning mandatory FY2026; small deductions emerging (≈ €2 indicative)." },
  UK: { label: "United Kingdom", mult: 0.8, paid: 60, note: "UK. UK ETS ≈ EU levels (≈ €60 indicative net). UK–EU ETS linkage, once in force, is expected to exempt UK goods from EU CBAM." },
  EU: { label: "European Union", mult: 0.85, paid: 64, note: "EU, full EU ETS carbon price paid (≈ €75 gross; ≈ €64 indicative net of residual free allocation)." },
  OT: { label: "Other / rest of world", mult: 1.0, paid: 0, note: "OTHER ORIGIN, no carbon price assumed. Only a price effectively paid (net of rebates) is deductible." },
};

const EU_FACTORS: Record<string, number> = {
  "2026": 0.025, "2027": 0.05, "2028": 0.10, "2029": 0.225, "2030": 0.485,
  "2031": 0.61, "2032": 0.735, "2033": 0.86, "2034": 1.0,
};

const SCENARIOS: Record<string, { label: string; mult: number }> = {
  low: { label: "LOW −20%", mult: 0.8 },
  central: { label: "CENTRAL", mult: 1 },
  high: { label: "HIGH +25%", mult: 1.25 },
};

const FX = 0.86; // EUR → GBP indicative

function fmt(n: number, dp?: number) {
  return n.toLocaleString("en-IN", {
    minimumFractionDigits: dp ?? 0,
    maximumFractionDigits: dp ?? 0,
  });
}

function money(n: number, sym: string) {
  if (n >= 1e6) return sym + (n / 1e6).toLocaleString("en-IN", { maximumFractionDigits: 2 }) + "M";
  if (n >= 1e3) return sym + (n / 1e3).toLocaleString("en-IN", { maximumFractionDigits: 1 }) + "k";
  return sym + n.toLocaleString("en-IN", { maximumFractionDigits: 0 });
}

function num(v: string) {
  const n = parseFloat(v);
  return isFinite(n) && n >= 0 ? n : 0;
}

function price(regime: Regime, yearKey: string, scenario: string) {
  const m = SCENARIOS[scenario].mult;
  if (regime === "eu") return yearKey === "2026" ? 75.28 : 75 * m;
  return 55 * m;
}

function calc(
  regime: Regime,
  yearKey: string,
  scenario: string,
  intensity: number,
  qty: number,
  paidEur: number
) {
  const p = price(regime, yearKey, scenario);
  const factor = regime === "eu" ? EU_FACTORS[yearKey] : 1;
  const paid = regime === "uk" ? paidEur * FX : paidEur;
  const embedded = qty * intensity;
  const chargeable = embedded * factor;
  const paidEff = Math.min(paid, p);
  const gross = chargeable * p;
  const net = chargeable * (p - paidEff);
  const certs =
    p > 0 ? Math.ceil(Math.round(chargeable * ((p - paidEff) / p) * 1e6) / 1e6) : 0;
  return { p, factor, embedded, chargeable, paidEff, gross, net, deduction: gross - net, certs };
}

const LABEL = "font-mono text-[10.5px] tracking-[0.1em] text-muted-3";

function Accordion({
  title,
  meta,
  open,
  onToggle,
  children,
}: {
  title: string;
  meta?: string;
  open: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}) {
  return (
    <div className="border border-rule bg-[#FFFFFF] mb-2.5">
      <button
        onClick={onToggle}
        aria-expanded={open}
        className="w-full bg-transparent px-4.5 py-3.5 cursor-pointer flex justify-between items-baseline gap-3 text-left"
      >
        <span className="text-[14.5px] font-bold">{title}</span>
        <span className="font-mono text-[11px] text-[#7A8094] shrink-0">
          {meta} {open ? "▾" : "▸"}
        </span>
      </button>
      {open && <div className="border-t border-rule-faint">{children}</div>}
    </div>
  );
}

export default function CbamCalculator() {
  const [regime, setRegimeState] = useState<Regime>("eu");
  const [commodity, setCommodity] = useState("steel");
  const [variantKey, setVariantKey] = useState("hrc");
  const [country, setCountry] = useState("IN");
  const [qty, setQty] = useState(10000);
  const [year, setYear] = useState("2026");
  const [basis, setBasis] = useState<Basis>("default");
  const [route, setRoute] = useState<Route>("bf");
  const [intensityInput, setIntensityInput] = useState(2.3);
  const [intensityTouched, setIntensityTouched] = useState(false);
  const [carbonPaidInput, setCarbonPaidInput] = useState(0);
  const [carbonTouched, setCarbonTouched] = useState(false);
  const [scenario, setScenario] = useState("central");
  const [view, setView] = useState<View>("importer");
  const [a1, setA1] = useState(false);
  const [a2, setA2] = useState(true);
  const [a3, setA3] = useState(false);
  const [a4, setA4] = useState(false);
  const [copied, setCopied] = useState(false);
  const [copiedBd, setCopiedBd] = useState(false);
  const [shared, setShared] = useState(false);

  // Persisted prefs (shared keys with the hub) + shareable URL restore
  useEffect(() => {
    try {
      const d = localStorage.getItem("sm_cbam_door");
      if (d === "export" || d === "import") setView(d === "import" ? "importer" : "supplier");
      const r = localStorage.getItem("sm_cbam_regime");
      if (r === "eu" || r === "uk") setRegimeState(r);
    } catch {}
    try {
      const p = new URLSearchParams(window.location.search);
      const pr = p.get("regime");
      if (pr === "eu" || pr === "uk") setRegimeState(pr);
      const pc = p.get("commodity");
      if (pc && COMMODITIES[pc]) {
        setCommodity(pc);
        setVariantKey(COMMODITIES[pc].variants[0].key);
        const pv = p.get("variant");
        if (pv && COMMODITIES[pc].variants.some((v) => v.key === pv)) setVariantKey(pv);
      } else {
        const pv = p.get("variant");
        if (pv && COMMODITIES.steel.variants.some((v) => v.key === pv)) setVariantKey(pv);
      }
      const po = p.get("origin");
      if (po && COUNTRIES[po]) setCountry(po);
      const pq = p.get("qty");
      if (pq) setQty(num(pq));
      const py = p.get("year");
      if (py && EU_FACTORS[py]) setYear(py);
      const pb = p.get("basis");
      if (pb === "default" || pb === "actual") setBasis(pb);
      const prt = p.get("route");
      if (prt === "bf" || prt === "eaf" || prt === "dri") setRoute(prt);
    } catch {}
  }, []);

  const setRegime = (r: Regime) => {
    setRegimeState(r);
    setCarbonTouched(false);
    setIntensityTouched(false);
    if (r === "uk" && year === "2026") setYear("2027");
    try {
      localStorage.setItem("sm_cbam_regime", r);
    } catch {}
  };

  const pickView = (v: View) => {
    setView(v);
    try {
      localStorage.setItem("sm_cbam_door", v === "importer" ? "import" : "export");
    } catch {}
  };

  const trackEv = (event: string) => {
    try {
      (window as unknown as { gtag?: (...a: unknown[]) => void }).gtag?.("event", event, { page: "/cbam/calculator" });
    } catch {}
  };

  const copyTextFn = (text: string, done: (v: boolean) => void, event?: string) => {
    if (event) trackEv(event);
    const finish = () => {
      done(true);
      setTimeout(() => done(false), 1600);
    };
    if (navigator.clipboard?.writeText) navigator.clipboard.writeText(text).then(finish, finish);
    else finish();
  };

  const CO = COMMODITIES[commodity];
  const V = CO.variants.find((v) => v.key === variantKey) || CO.variants[0];
  const C = COUNTRIES[country];
  const isSteel = commodity === "steel";
  const isEu = regime === "eu";
  const sym = isEu ? "€" : "£";
  const isDefault = basis === "default";

  const vDef = V.def;
  const steelV = V as SteelVariant;
  const baseV = V as BaseVariant;
  const defIntensity = +(isSteel ? vDef * C.mult : vDef).toFixed(2);
  const typActual = isSteel ? steelV[route] : baseV.base;
  const intensity = isDefault ? defIntensity : intensityTouched ? intensityInput : typActual;
  const carbonPaidEur = carbonTouched
    ? isEu
      ? carbonPaidInput
      : carbonPaidInput / FX
    : C.paid;

  const r = calc(regime, year, scenario, intensity, qty, carbonPaidEur);
  const rAlt = calc(
    regime, year, scenario,
    isDefault ? typActual : defIntensity,
    qty, carbonPaidEur
  );
  const saving = Math.abs(isDefault ? r.net - rAlt.net : rAlt.net - r.net);

  const domestic = (isEu && country === "EU") || (!isEu && country === "UK");
  const exemptEu = isEu && qty <= 50 && qty > 0;
  const dwnEu = isEu && variantKey === "dwn" && +year < 2028;
  const dwnUk = !isEu && variantKey === "dwn";
  const linkage = (isEu && country === "UK") || (!isEu && country === "EU");
  const zero = domestic || exemptEu;
  const net = zero ? 0 : r.net;
  const perT = qty > 0 ? net / qty : 0;

  let bannerText = "";
  if (domestic)
    bannerText = "✓ " + (isEu
      ? "EU-ORIGIN GOODS ARE NOT CBAM GOODS UNDER EU CBAM — NO CHARGE."
      : "UK-ORIGIN GOODS ARE NOT IN SCOPE OF UK CBAM — NO CHARGE.");
  else if (exemptEu)
    bannerText = "✓ DE MINIMIS — ≤ 50 T / YEAR: FULLY EXEMPT FROM EU CBAM OBLIGATIONS.";
  else if (dwnUk)
    bannerText = "△ DOWNSTREAM GOODS ARE NOT IN UK CBAM SCOPE (2027 LIST). FIGURES MODEL AN EU-STYLE EXTENSION — INDICATIVE ONLY.";
  else if (dwnEu)
    bannerText = "△ DOWNSTREAM PRODUCT — EU SCOPE FROM 1 JAN 2028 (PROPOSED). FIGURES MODEL THE POST-EXTENSION REGIME.";
  else if (linkage)
    bannerText = "△ UK–EU ETS LINKAGE, ONCE IN FORCE, IS EXPECTED TO EXEMPT THESE GOODS FROM " + (isEu ? "EU" : "UK") + " CBAM — MODEL BOTH SCENARIOS.";

  const yearsList = isEu
    ? Object.keys(EU_FACTORS)
    : Object.keys(EU_FACTORS).filter((y) => +y >= 2027);

  const trajYears = isEu ? ["2026", "2028", "2030", "2032", "2034"] : ["low", "central", "high"];
  const trajectory = isEu
    ? trajYears.map((y) => {
        const t = calc("eu", y, scenario, intensity, qty, carbonPaidEur);
        const active = y === year;
        return {
          key: y,
          head: `${y} · ${EU_FACTORS[y] * 100}%`,
          cost: zero ? sym + "0" : money(t.net, sym),
          perT: zero
            ? domestic ? "NOT IN SCOPE" : "EXEMPT"
            : `≈ ${sym}${fmt(qty > 0 ? t.net / qty : 0, 1)}/t`,
          active,
        };
      })
    : trajYears.map((k) => {
        const t = calc("uk", year, k, intensity, qty, carbonPaidEur);
        const active = k === scenario;
        return {
          key: k,
          head: `${SCENARIOS[k].label} · £${fmt(t.p, 0)}`,
          cost: zero ? "£0" : money(t.net, "£"),
          perT: zero ? "NOT IN SCOPE" : `≈ £${fmt(qty > 0 ? t.net / qty : 0, 1)}/t`,
          active,
        };
      });

  const refReg = isEu ? "REG. (EU) 2023/956" : "SCH. 16 FA 2026";
  const breakdown: { label: string; value: string; ref: string }[] = [
    { label: "Regime", value: isEu ? "EU CBAM (definitive, 2026)" : "UK CBAM (from 1 Jan 2027)", ref: refReg },
    { label: "Cargo", value: `${fmt(qty)} t · ${V.label}`, ref: V.cn },
    { label: "Origin", value: C.label, ref: isEu ? "ART. 2" : "PLACE OF ORIGIN" },
    { label: "Emissions basis", value: isDefault ? "Default values" : "Verified actual" + (isSteel ? ` (${route.toUpperCase()})` : ""), ref: isEu ? "ART. 7" : "VERIFIED / DEFAULT" },
    { label: "Emissions intensity", value: `${fmt(intensity, 2)} tCO₂e/t`, ref: isDefault ? "DEFAULT (INDICATIVE)" : "MILL MRV" },
    { label: "Embedded emissions", value: `${fmt(r.embedded, 0)} tCO₂e`, ref: isEu ? "ANNEX IV" : "DIRECT ONLY TO 2029" },
    { label: isEu ? `CBAM factor ${year}` : "Charge basis", value: isEu ? `${r.factor * 100}% (free-allocation phase-out)` : "100% from day one, rate already reflects UK free allocation", ref: isEu ? "ART. 31" : "RATE MECHANISM" },
    { label: isEu ? "Certificate price" : "CBAM rate", value: `${sym}${fmt(r.p, 2)}/tCO₂e` + (isEu && year === "2026" ? " (Q2 2026 published)" : ` (${SCENARIOS[scenario].label.toLowerCase()} assumption)`), ref: isEu ? "ART. 21" : "PRIOR-QTR UK ETS AVG" },
    { label: "Carbon price deduction", value: `−${sym}${fmt(r.paidEff, 2)}/tCO₂e (${C.label})`, ref: isEu ? "ART. 9" : "CARBON PRICE RELIEF" },
    isEu
      ? { label: "Certificates to surrender", value: zero ? "0" : `${fmt(r.certs)} certificates`, ref: "ART. 22" }
      : { label: "Registration trigger", value: "£50k / rolling 12 mo or 30-day forward test", ref: "POLICY SUMMARY" },
    { label: "Net cost", value: zero ? sym + "0" : `${sym}${fmt(net, 0)} (≈ ${sym}${fmt(perT, 1)}/t)`, ref: isEu ? `DUE 30 SEP ${+year + 1}` : (+year === 2027 ? "RETURN 31 MAY 2028" : "QUARTERLY RETURNS") },
  ];

  const plainSentence = zero
    ? domestic
      ? isEu
        ? "EU-origin goods carry no EU CBAM cost, the mechanism applies to imports from outside the EU."
        : "UK-origin goods carry no UK CBAM cost, the tax applies to imported CBAM goods."
      : `At ${fmt(qty)} t/year you are under the EU 50 t de minimis, no declarant status, no certificates, no declaration.`
    : view === "importer"
    ? `For ${fmt(qty)} t of ${V.label} from ${C.label} in ${year}, budget ≈ ${money(net, sym)} (${sym}${fmt(perT, 1)}/t). ` +
      (isEu
        ? `Certificates purchasable from 1 Feb ${+year + 1}; surrender by 30 Sep ${+year + 1}.`
        : +year === 2027
        ? "First UK return & payment due 31 May 2028."
        : "Quarterly UK returns apply from 2028.")
    : `Your ${isEu ? "EU" : "UK"} buyer faces ≈ ${money(net, sym)} (${sym}${fmt(perT, 1)}/t) on this cargo in ${year}. ` +
      (isDefault
        ? "Supplying verified actuals could cut it, open the saving figure above."
        : `Your verified data saves them ${money(saving, sym)} vs defaults, price accordingly.`);

  const resultText = `${isEu ? "EU" : "UK"} CBAM ${year} (${fmt(qty)} t ${V.label} ex ${C.label}: net ${money(net, sym)} (${sym}${fmt(perT, 1)}/t) @ ${sym}${fmt(r.p, 2)}/tCO₂e) via steelmath.com`;
  const bdText = breakdown.map((b) => `${b.label}: ${b.value}`).join("\n") + "\n, steelmath.com/cbam";
  const shareUrl = `https://steelmath.com/cbam/calculator?regime=${regime}&commodity=${commodity}&variant=${variantKey}&origin=${country}&qty=${qty}&year=${year}&basis=${basis}${isSteel && !isDefault ? `&route=${route}` : ""}`;

  const carbonPaidDisplay = isEu ? carbonPaidEur : +(carbonPaidEur * FX).toFixed(1);

  const inputCls =
    "bg-[#FFFFFF] border border-input-border text-ink font-mono text-base px-3 py-2.5 outline-none w-full focus:border-cbam";
  const selectCls =
    "bg-[#FFFFFF] border border-input-border text-ink font-mono text-[13px] px-2.5 py-2.5 outline-none w-full focus:border-cbam";
  const chipCls = (on: boolean) =>
    `font-mono text-[11.5px] px-2.5 py-1.5 cursor-pointer border transition-colors ${
      on
        ? "bg-ink text-[#FFFFFF] border-ink"
        : "bg-transparent text-muted border-input-border hover:border-ink hover:text-ink"
    }`;

  return (
    <div>
      <div className="print-block">
        {/* Regime toggle */}
        <div className="grid grid-cols-1 sm:grid-cols-2 border border-ink border-b-0 bg-[#FFFFFF]">
          {(["eu", "uk"] as const).map((rg) => (
            <button
              key={rg}
              onClick={() => setRegime(rg)}
              aria-pressed={regime === rg}
              className={`py-3 px-3.5 cursor-pointer flex flex-col gap-1 items-center ${
                regime === rg
                  ? "bg-cbam text-[#FFFFFF]"
                  : "bg-transparent text-ink border-b border-rule sm:border-b-0"
              }`}
            >
              <span className="text-[15px] font-extrabold">{rg === "eu" ? "EU CBAM" : "UK CBAM"}</span>
              <span className="font-mono text-[10.5px] tracking-[0.06em] opacity-80">
                {rg === "eu"
                  ? `LIVE SINCE 1 JAN 2026 · ${year === "2026" && regime === "eu" ? "Q2 PRICE €75.28" : `PRICE ASSUMED €${fmt(price("eu", regime === "eu" ? year : "2027", scenario), 0)}`}`
                  : "STARTS 1 JAN 2027 · PLANNING RATE £55"}
              </span>
            </button>
          ))}
        </div>

        <div className="border border-ink bg-[#FFFFFF] grid grid-cols-1 lg:grid-cols-2">
          {/* INPUTS */}
          <div className="lg:border-r border-rule">
            <div className="px-5 pt-4">
              <div className={`${LABEL} mb-2`}>1 — COMMODITY</div>
              <div className="flex flex-wrap gap-2">
                {Object.keys(COMMODITIES).map((k) => (
                  <button
                    key={k}
                    onClick={() => {
                      setCommodity(k);
                      setVariantKey(COMMODITIES[k].variants[0].key);
                      setIntensityTouched(false);
                    }}
                    aria-pressed={commodity === k}
                    className={`px-3 py-2 cursor-pointer text-left min-w-[118px] flex-auto border transition-colors ${
                      commodity === k
                        ? "bg-ink text-[#FFFFFF] border-ink"
                        : "bg-transparent text-ink border-input-border hover:border-ink"
                    }`}
                  >
                    <span className="text-[13px] font-bold block">{COMMODITIES[k].label}</span>
                    <span className="font-mono text-[10.5px] opacity-75">
                      {COMMODITIES[k].chip}CO₂e/t
                    </span>
                  </button>
                ))}
              </div>
            </div>
            <div className="px-5 pt-4 pb-5 flex flex-col gap-3.5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <label className="flex flex-col gap-1.5">
                  <span className={LABEL}>PRODUCT</span>
                  <select
                    value={variantKey}
                    onChange={(e) => {
                      setVariantKey(e.target.value);
                      setIntensityTouched(false);
                    }}
                    className={selectCls}
                  >
                    {CO.variants.map((v) => (
                      <option key={v.key} value={v.key}>{v.label}</option>
                    ))}
                  </select>
                </label>
                <label className="flex flex-col gap-1.5">
                  <span className={LABEL}>ORIGIN — COUNTRY OF PRODUCTION</span>
                  <select
                    value={country}
                    onChange={(e) => {
                      setCountry(e.target.value);
                      setCarbonTouched(false);
                      setIntensityTouched(false);
                    }}
                    className={selectCls}
                  >
                    {Object.keys(COUNTRIES).map((k) => (
                      <option key={k} value={k}>{COUNTRIES[k].label}</option>
                    ))}
                  </select>
                </label>
              </div>
              <div className="font-mono text-[11px] leading-relaxed text-[#7A8094]">
                {V.cn} · {CO.scope}
              </div>
              <div>
                <div className={`${LABEL} mb-1.5`}>2 — CARGO (TONNES)</div>
                <div className="flex gap-2 items-center flex-wrap">
                  <input
                    type="number"
                    value={qty}
                    onChange={(e) => setQty(num(e.target.value))}
                    aria-label="Cargo quantity in tonnes"
                    className="bg-[#FFFFFF] border border-input-border text-ink font-mono text-[17px] px-3 py-2.5 outline-none flex-1 min-w-[110px] focus:border-cbam"
                  />
                  {[100, 1000, 10000, 50000].map((v) => (
                    <button
                      key={v}
                      onClick={() => setQty(v)}
                      aria-pressed={qty === v}
                      className={chipCls(qty === v)}
                    >
                      {v >= 1000 ? `${v / 1000}K` : v}
                    </button>
                  ))}
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <label className="flex flex-col gap-1.5">
                  <span className={LABEL}>
                    3 — IMPORT YEAR {isEu ? `— FACTOR ${r.factor * 100}%` : "— 100% FROM DAY ONE"}
                  </span>
                  <select
                    value={year}
                    onChange={(e) => setYear(e.target.value)}
                    className={selectCls}
                  >
                    {yearsList.map((y) => (
                      <option key={y} value={y}>
                        {isEu ? `${y}, factor ${EU_FACTORS[y] * 100}%` : y}
                      </option>
                    ))}
                  </select>
                </label>
                <div className="flex flex-col gap-1.5">
                  <span className={LABEL}>EMISSIONS DATA</span>
                  <div className="grid grid-cols-2 border border-input-border">
                    {(["default", "actual"] as const).map((b) => (
                      <button
                        key={b}
                        onClick={() => setBasis(b)}
                        aria-pressed={basis === b}
                        className={`font-mono text-[11.5px] py-2.5 px-1.5 cursor-pointer ${
                          basis === b ? "bg-ink text-[#FFFFFF]" : "bg-transparent text-ink"
                        }`}
                      >
                        {b === "default" ? "Defaults" : "Verified actual"}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
              {!isDefault && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {isSteel && (
                    <label className="flex flex-col gap-1.5">
                      <span className={LABEL}>ROUTE</span>
                      <select
                        value={route}
                        onChange={(e) => {
                          setRoute(e.target.value as Route);
                          setIntensityTouched(false);
                        }}
                        className={selectCls}
                      >
                        <option value="bf">BF-BOF (blast furnace)</option>
                        <option value="eaf">EAF (scrap)</option>
                        <option value="dri">DRI-EAF</option>
                      </select>
                    </label>
                  )}
                  <label className="flex flex-col gap-1.5">
                    <span className={LABEL}>INTENSITY (TCO₂E/T)</span>
                    <input
                      type="number"
                      step={0.05}
                      value={intensity}
                      onChange={(e) => {
                        setIntensityInput(num(e.target.value));
                        setIntensityTouched(true);
                      }}
                      className={inputCls}
                    />
                  </label>
                </div>
              )}
              <div className="font-mono text-[11px] leading-[1.7] text-[#7A8094] border-t border-dashed border-rule pt-3">
                {isDefault
                  ? `DEFAULT APPLIED, ${fmt(defIntensity, 2)} tCO₂e/t (indicative, set from high emitters${isSteel ? ", regional adjustment" : ""}). Switch to VERIFIED ACTUAL (typical ${fmt(typActual, 2)}) to see your saving.`
                  : `TYPICAL ${isSteel ? route.toUpperCase() + " " : ""}VALUE, ${fmt(typActual, 2)} tCO₂e/t. Edit to your verified figure. Verification: ${isEu ? "accredited verifier (EU)" : "IAF-member-accredited body (UK)"}.`}
              </div>
            </div>
          </div>

          {/* RESULT */}
          <div className="bg-ink text-paper flex flex-col">
            <div className="px-5 py-3 border-b border-ink-border flex justify-between items-center gap-2 flex-wrap">
              <span className="font-mono text-[11px] tracking-[0.12em] text-[#9A9B9E]">
                {isEu ? "EU CBAM" : "UK CBAM"} — RECALCULATES AS YOU TYPE
              </span>
              <div className="flex border border-[#34353A]">
                {(["importer", "supplier"] as const).map((v) => (
                  <button
                    key={v}
                    onClick={() => pickView(v)}
                    aria-pressed={view === v}
                    className={`font-mono text-[10.5px] tracking-[0.06em] px-2.5 py-1 cursor-pointer ${
                      view === v ? "bg-cbam text-[#FFFFFF]" : "bg-transparent text-[#9A9B9E]"
                    }`}
                  >
                    {v.toUpperCase()}
                  </button>
                ))}
              </div>
            </div>
            {bannerText && (
              <div className="px-5 py-2.5 border-b border-ink-border font-mono text-[11.5px] leading-relaxed text-cbam-bright">
                {bannerText}
              </div>
            )}
            <div className="px-5 pt-5 pb-3.5">
              <div className="font-mono text-[10.5px] tracking-[0.12em] text-[#7E8085] mb-2">
                {(view === "importer" ? "YOUR NET COST" : "YOUR BUYER'S NET COST") +
                  (zero ? `, ${domestic ? "NOT IN SCOPE" : "EXEMPT"}` : ` · ${year}`)}
              </div>
              <div className="font-mono text-[clamp(38px,5vw,52px)] font-semibold text-cbam-bright leading-none tracking-[-0.01em]">
                {zero ? sym + "0" : money(net, sym)}
              </div>
              <div className="font-mono text-[12.5px] text-[#C9CACC] mt-2.5">
                {zero
                  ? domestic
                    ? "DOMESTIC-ORIGIN GOODS — NO CHARGE"
                    : "UNDER THE 50 T DE MINIMIS"
                  : `≈ ${sym}${fmt(perT, 1)} PER TONNE · GROSS − DEDUCTION = NET`}
              </div>
            </div>
            <div className="px-5 pb-3.5 grid grid-cols-2 gap-x-4 gap-y-2.5">
              <div className="border-t border-ink-border pt-2.5">
                <div className="font-mono text-[10px] tracking-[0.1em] text-[#7E8085]">GROSS LEVY</div>
                <div className="font-mono text-base font-semibold mt-1">
                  {zero ? sym + "0" : money(r.gross, sym)}
                </div>
              </div>
              <div className="border-t border-ink-border pt-2.5">
                <div className="font-mono text-[10px] tracking-[0.1em] text-[#7E8085]">
                  {isEu ? "DEDUCTION — CARBON PAID" : "CARBON PRICE RELIEF"}
                </div>
                <div className="font-mono text-base font-semibold mt-1 text-positive">
                  −{zero ? sym + "0" : money(r.deduction, sym)}
                </div>
              </div>
              <div className="border-t border-ink-border pt-2.5">
                <div className="font-mono text-[10px] tracking-[0.1em] text-[#7E8085]">
                  {isEu ? `CERTIFICATES (${year})` : "RATE APPLIED"}
                </div>
                <div className="font-mono text-base font-semibold mt-1">
                  {isEu ? (zero ? "0" : fmt(r.certs)) : `£${fmt(r.p, 0)}/tCO₂e`}
                </div>
              </div>
              <div className="border-t border-ink-border pt-2.5">
                <div className="font-mono text-[10px] tracking-[0.1em] text-[#7E8085]">
                  {isDefault ? "IF VERIFIED ACTUALS" : "SAVING VS DEFAULTS"}
                </div>
                <div className="font-mono text-base font-semibold mt-1 text-positive">
                  {zero ? "—" : `−${money(saving, sym)}`}
                </div>
              </div>
            </div>
            <div className="px-5 py-3 border-t border-ink-border text-[13px] leading-relaxed text-[#C9CACC]">
              {plainSentence}
            </div>
            <div className="mt-auto grid grid-cols-2 sm:grid-cols-4 border-t border-ink-border no-print">
              <button
                onClick={() => copyTextFn(resultText, setCopied, "copy_result")}
                className="bg-transparent border-r border-ink-border text-paper font-mono text-[10.5px] tracking-[0.04em] py-3 px-1 cursor-pointer hover:bg-panel-dark"
              >
                {copied ? "COPIED ✓" : "COPY RESULT"}
              </button>
              <button
                onClick={() => copyTextFn(bdText, setCopiedBd, "copy_breakdown")}
                className="bg-transparent sm:border-r border-ink-border text-paper font-mono text-[10.5px] tracking-[0.04em] py-3 px-1 cursor-pointer hover:bg-panel-dark"
              >
                {copiedBd ? "COPIED ✓" : "COPY BREAKDOWN"}
              </button>
              <button
                onClick={() => copyTextFn(shareUrl, setShared, "share_link")}
                className="bg-transparent border-r border-t sm:border-t-0 border-ink-border text-paper font-mono text-[10.5px] tracking-[0.04em] py-3 px-1 cursor-pointer hover:bg-panel-dark"
              >
                {shared ? "LINK COPIED ✓" : "SHARE LINK"}
              </button>
              <button
                onClick={() => { trackEv("download_pdf"); window.print(); }}
                className="bg-transparent border-t sm:border-t-0 border-ink-border text-paper font-mono text-[10.5px] tracking-[0.04em] py-3 px-1 cursor-pointer hover:bg-panel-dark"
              >
                DOWNLOAD PDF
              </button>
            </div>
          </div>
        </div>

        {/* Compliance strip */}
        <div className="grid grid-cols-1 sm:grid-cols-3 border border-rule border-t-0 bg-[#FFFFFF]">
          <div className="px-4.5 py-3 sm:border-r border-rule-faint">
            <div className="font-mono text-[10px] tracking-[0.1em] text-muted-3">WHO IS IN</div>
            <div className="font-mono text-xs text-ink mt-1">
              {isEu ? "EU — REGISTER ABOVE 50 T / YR (MASS)" : "UK — REGISTER AT £50K / 12 MO (VALUE)"}
            </div>
          </div>
          <div className="px-4.5 py-3 sm:border-r border-rule-faint">
            <div className="font-mono text-[10px] tracking-[0.1em] text-muted-3">PAPERWORK</div>
            <div className="font-mono text-xs text-ink mt-1">
              {isEu ? "AUTHORISED DECLARANT REQUIRED AT BORDER" : "30 DAYS FROM TRIGGER · FIRST-YEAR EASEMENT"}
            </div>
          </div>
          <div className="px-4.5 py-3">
            <div className="font-mono text-[10px] tracking-[0.1em] text-muted-3">MONEY DATE</div>
            <div className="font-mono text-xs text-ink mt-1">
              {isEu
                ? `CERTS 1 FEB ${+year + 1} · SURRENDER 30 SEP ${+year + 1}`
                : +year === 2027
                ? "RETURN & PAYMENT — 31 MAY 2028"
                : "QUARTERLY RETURNS FROM 2028"}
            </div>
          </div>
        </div>
        <div className="flex justify-between items-center py-2.5 px-1 flex-wrap gap-2">
          <span className="font-mono text-[10.5px] tracking-[0.08em] text-muted-3">
            INSTANT RECALC · ESTIMATES ONLY — NOT TAX OR LEGAL ADVICE
          </span>
          <span className="font-mono text-[10.5px] tracking-[0.08em] text-muted-3">
            MODEL &amp; FACTORS LAST VERIFIED — 19 JUL 2026
          </span>
        </div>
      </div>

      {/* DETAIL ACCORDIONS */}
      <div className="pt-4">
        <div className="font-mono text-[11px] tracking-[0.14em] text-cbam mb-2.5">
          DETAILED ANALYSIS — OPEN WHAT YOU NEED
        </div>

        <Accordion
          title="Price & deduction assumptions"
          meta={`${sym}${fmt(r.p, 2)} · DEDUCT ${sym}${fmt(r.paidEff, 0)}`}
          open={a1}
          onToggle={() => setA1(!a1)}
        >
          <div className="px-4.5 pb-4.5 pt-3 flex flex-col gap-3.5">
            <div className="flex gap-2 items-center flex-wrap">
              <span className={LABEL}>
                {isEu
                  ? year === "2026"
                    ? "PRICE — Q2 2026 PUBLISHED (SCENARIOS APPLY TO FUTURE YEARS)"
                    : "PRICE SCENARIO — €75 BASE"
                  : "RATE SCENARIO — £55 PLANNING BASE"}
              </span>
              {Object.keys(SCENARIOS).map((k) => (
                <button
                  key={k}
                  onClick={() => setScenario(k)}
                  aria-pressed={scenario === k}
                  className={chipCls(scenario === k)}
                >
                  {SCENARIOS[k].label}
                </button>
              ))}
              <span className="font-mono text-[11.5px] text-[#7A8094]">
                → {sym}{fmt(r.p, 2)}/tCO₂e{isEu && year === "2026" ? " (fixed)" : ""}
              </span>
            </div>
            <label className="flex flex-col gap-1.5 max-w-[420px]">
              <span className={LABEL}>
                CARBON PRICE EFFECTIVELY PAID AT ORIGIN ({sym}/TCO₂E) — DEDUCTIBLE
              </span>
              <input
                type="number"
                step={0.5}
                value={carbonPaidDisplay}
                onChange={(e) => {
                  setCarbonPaidInput(num(e.target.value));
                  setCarbonTouched(true);
                }}
                className={inputCls}
              />
            </label>
            <div className="font-mono text-[11px] leading-[1.7] text-[#7A8094]">{C.note}</div>
          </div>
        </Accordion>

        <Accordion
          title={isEu ? "This cargo, every year, free-allocation phase-out" : "This cargo under rate scenarios"}
          open={a2}
          onToggle={() => setA2(!a2)}
        >
          <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5">
            {trajectory.map((t) => (
              <div
                key={t.key}
                className="px-4.5 py-3.5 border-r border-rule-faint"
                style={{
                  borderTop: t.active ? "2px solid var(--cbam)" : "2px solid transparent",
                  background: t.active ? "#F8F9FC" : "#FFFFFF",
                }}
              >
                <div className="font-mono text-xs text-[#7A8094]">{t.head}</div>
                <div
                  className={`font-mono text-[19px] font-semibold mt-1.5 ${t.active ? "text-cbam" : "text-ink"}`}
                >
                  {t.cost}
                </div>
                <div className="font-mono text-[11px] text-[#7A8094] mt-1">{t.perT}</div>
              </div>
            ))}
          </div>
          <div className="px-4.5 py-3 text-[12.5px] leading-relaxed text-muted-2">
            {isEu
              ? `Same inputs at ${sym}${fmt(r.p, 2)}/tCO₂e. The payable share of emissions climbs from 2.5% (2026) to 100% (2034) as EU free allocation phases out, cleaner routes and verified actuals are the only levers.`
              : "UK CBAM has no phase-in: 100% of direct emissions are chargeable from 1 Jan 2027. The per-product rate moves quarterly with the UK ETS (free allocation already netted off). £55 is the planning proxy; HMRC publishes actual rates from Q1 2027."}
          </div>
        </Accordion>

        <Accordion title="Calculation detail, every step, cited" open={a3} onToggle={() => setA3(!a3)}>
          <div className="px-4.5 pb-2.5">
            {breakdown.map((b) => (
              <div
                key={b.label}
                className="grid grid-cols-[minmax(110px,1fr)_minmax(110px,auto)_minmax(80px,auto)] gap-x-4 gap-y-2 items-baseline py-2 border-b border-rule-faint"
              >
                <span className="text-[13px] text-muted">{b.label}</span>
                <span className="font-mono text-[12.5px] font-semibold text-ink text-right">{b.value}</span>
                <span className="font-mono text-[10.5px] text-[#A0A6B4] text-right">{b.ref}</span>
              </div>
            ))}
          </div>
        </Accordion>

        <Accordion title="Show the maths, full formula chain" open={a4} onToggle={() => setA4(!a4)}>
          <div className="font-mono text-xs leading-[1.9] text-muted bg-cbam-bg px-4.5 py-4">
            <div>1 · Embedded = quantity × intensity = {fmt(qty)} t × {fmt(intensity, 2)} = {fmt(r.embedded, 0)} tCO₂e</div>
            <div>2 · Chargeable = embedded × {isEu ? `CBAM factor ${r.factor * 100}%` : "factor 100% (UK)"} = {fmt(r.chargeable, 0)} tCO₂e</div>
            <div>3 · Deduction rate = min(carbon paid {sym}{fmt(r.paidEff, 2)}, rate {sym}{fmt(r.p, 2)}) → net rate = {sym}{fmt(r.p - r.paidEff, 2)}</div>
            <div>4 · Net cost = chargeable × net rate = {zero ? `${sym}0 (${domestic ? "not in scope" : "exempt"})` : `${sym}${fmt(net, 0)}`}</div>
            <div className="text-muted-3 mt-2">
              {isEu
                ? "SIMPLIFICATIONS. 2026 modelled at the Q2 price (€75.28); strictly each quarter’s imports use that quarter’s price (Q1 €75.36). Deduction pro-rata to the payable share; certificates rounded up; precursor & verification detail per Reg. (EU) 2023/956. Defaults indicative until final EC tables."
                : `SIMPLIFICATIONS, £55 planning rate (UK ETS proxy); HMRC publishes per-product quarterly rates from Q1 2027, net of sector free allocation. Direct emissions only until 2029 at earliest; scrap excluded from scope; CPR capped at the liability; FX €→£ ${FX} indicative. Weight net of packing.`}
            </div>
          </div>
        </Accordion>
      </div>
    </div>
  );
}
