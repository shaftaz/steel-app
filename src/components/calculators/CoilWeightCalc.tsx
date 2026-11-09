"use client";

import { useState } from "react";
import {
  InstrumentShell,
  ResultPanel,
  Field,
  SelectField,
  Chip,
  ModeTab,
  ShowMaths,
  LABEL_CLS,
  fmt,
  num,
  useCurrency,
  CurrencyOptions,
  useUrlState,
} from "@/components/instrument";

/* Coil weight — HR / CR / GI / SS / aluminium coils.
   Mode A (dimensions): OD, ID, width → weight, strip length.
   Mode B (weight):     weight, ID, width, thickness → OD, strip length.
   Formula: kg = π/4 × (OD² − ID²) × W × ρ ÷ 10⁹ (all mm, ρ in kg/m³). */

const MATERIALS: { key: string; label: string; density: number }[] = [
  { key: "MS", label: "Mild / HR / CR steel", density: 7850 },
  { key: "GI", label: "Galvanised (GI / GP)", density: 7850 },
  { key: "SS304", label: "Stainless 304", density: 8000 },
  { key: "SS316", label: "Stainless 316", density: 8027 },
  { key: "SS430", label: "Stainless 430", density: 7700 },
  { key: "AL", label: "Aluminium", density: 2700 },
  { key: "CU", label: "Copper", density: 8940 },
];

const COMMON_ID = [
  { label: '508 (20")', v: 508 },
  { label: '610 (24")', v: 610 },
  { label: '760 (30")', v: 760 },
];
const COMMON_WIDTH = [1000, 1250, 1500, 1800, 2000];

type Mode = "dims" | "weight";

export default function CoilWeightCalc() {
  const [mode, setMode] = useState<Mode>("dims");
  const [material, setMaterial] = useState("MS");
  const [od, setOd] = useState("1600");
  const [id, setId] = useState("610");
  const [width, setWidth] = useState("1250");
  const [thk, setThk] = useState("2");
  const [targetKg, setTargetKg] = useState("20000");
  const [coils, setCoils] = useState("1");
  const [rate, setRate] = useState("");
  const [currency, setCurrency] = useCurrency();

  useUrlState((p) => {
    if (p.get("m") === "weight") setMode("weight");
    if (p.get("mat") && MATERIALS.some((m) => m.key === p.get("mat"))) setMaterial(p.get("mat")!);
    if (p.get("od") && num(p.get("od")!) > 0) setOd(p.get("od")!);
    if (p.get("id") && num(p.get("id")!) >= 0) setId(p.get("id")!);
    if (p.get("w") && num(p.get("w")!) > 0) setWidth(p.get("w")!);
    if (p.get("t") && num(p.get("t")!) >= 0) setThk(p.get("t")!);
    if (p.get("kg") && num(p.get("kg")!) > 0) setTargetKg(p.get("kg")!);
    if (p.get("n") && num(p.get("n")!) > 0) setCoils(p.get("n")!);
  });

  const rho = MATERIALS.find((m) => m.key === material)?.density ?? 7850;
  const matLabel = MATERIALS.find((m) => m.key === material)?.label ?? "Steel";
  const idV = num(id);
  const wV = num(width);
  const tV = num(thk);
  const n = Math.max(1, Math.round(num(coils)) || 1);
  const r = num(rate);

  /* ---- derive OD and weight depending on mode ---- */
  let odV = num(od);
  let kgPerCoil = 0;
  if (mode === "dims") {
    if (odV > idV && wV > 0) {
      kgPerCoil = (Math.PI / 4) * (odV * odV - idV * idV) * wV * rho / 1e9;
    }
  } else {
    kgPerCoil = num(targetKg);
    if (kgPerCoil > 0 && wV > 0) {
      odV = Math.sqrt(idV * idV + (4 * kgPerCoil * 1e9) / (Math.PI * wV * rho));
    } else {
      odV = 0;
    }
  }

  /* strip length (m) from the annulus area ÷ thickness */
  const stripLenM =
    tV > 0 && odV > idV ? ((Math.PI / 4) * (odV * odV - idV * idV)) / tV / 1000 : 0;
  const kgPerMetreStrip = wV > 0 && tV > 0 ? (wV * tV * rho) / 1e6 : 0;
  const kgPerSqm = tV > 0 ? (tV * rho) / 1000 : 0;
  const sqmPerCoil = stripLenM > 0 && wV > 0 ? stripLenM * (wV / 1000) : 0;
  const totalKg = kgPerCoil * n;
  const cost = totalKg * r;
  const coilsPer25t = kgPerCoil > 0 ? Math.floor(25000 / kgPerCoil) : 0;

  const name = `${matLabel} coil ${wV}mm × ${tV > 0 ? `${tV}mm` : "—"} · OD ${fmt(odV, 0)} / ID ${idV}`;
  const shareUrl = `https://steelmath.com/calculators/coil-weight?m=${mode}&mat=${material}&od=${od}&id=${id}&w=${width}&t=${thk}&kg=${targetKg}&n=${coils}`;
  const copyText = `${name} — ${fmt(kgPerCoil, 0)} kg/coil${n > 1 ? ` · ${n} coils = ${fmt(totalKg / 1000, 3)} t` : ""}${
    stripLenM > 0 ? ` · ${fmt(stripLenM, 0)} m strip` : ""
  }${r > 0 ? ` · ${currency}${fmt(cost, 0)}` : ""} — via steelmath.com`;
  const formulaLine =
    mode === "dims"
      ? `π/4 × (${fmt(odV, 0)}² − ${idV}²) × ${wV} × ${rho} ÷ 10⁹ = ${fmt(kgPerCoil, 0)} kg`
      : `OD = √(${idV}² + 4 × ${fmt(kgPerCoil, 0)} × 10⁹ ÷ (π × ${wV} × ${rho})) = ${fmt(odV, 0)} mm`;

  return (
    <InstrumentShell
      header={
        <div className="flex flex-wrap border-b border-rule">
          <ModeTab active={mode === "dims"} onClick={() => setMode("dims")}>
            WEIGHT FROM OD · ID · WIDTH
          </ModeTab>
          <ModeTab active={mode === "weight"} onClick={() => setMode("weight")}>
            OD &amp; LENGTH FROM WEIGHT
          </ModeTab>
        </div>
      }
      inputs={
        <>
          <SelectField label="MATERIAL" value={material} onChange={setMaterial}>
            {MATERIALS.map((m) => (
              <option key={m.key} value={m.key}>
                {m.label} — {m.density} kg/m³
              </option>
            ))}
          </SelectField>

          <div className="flex flex-col gap-1.5">
            <span className={LABEL_CLS}>COIL ID (MM) — QUICK SELECT</span>
            <div className="flex flex-wrap gap-1.5">
              {COMMON_ID.map((c) => (
                <Chip key={c.v} active={idV === c.v} onClick={() => setId(String(c.v))}>
                  {c.label}
                </Chip>
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-1.5">
            <span className={LABEL_CLS}>WIDTH (MM) — QUICK SELECT</span>
            <div className="flex flex-wrap gap-1.5">
              {COMMON_WIDTH.map((w) => (
                <Chip key={w} active={wV === w} onClick={() => setWidth(String(w))}>
                  {w}
                </Chip>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {mode === "dims" ? (
              <Field label="OUTER DIA — OD (MM)" value={od} onChange={setOd} step={10} />
            ) : (
              <Field label="COIL WEIGHT (KG)" value={targetKg} onChange={setTargetKg} step={100} />
            )}
            <Field label="INNER DIA — ID (MM)" value={id} onChange={setId} step={1} />
            <Field label="WIDTH (MM)" value={width} onChange={setWidth} step={10} />
            <Field
              label={mode === "dims" ? "THICKNESS (MM) — FOR LENGTH" : "THICKNESS (MM)"}
              value={thk}
              onChange={setThk}
              step={0.1}
            />
            <Field label="NO. OF COILS" value={coils} onChange={setCoils} step={1} />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <Field
              label="RATE / KG (OPTIONAL)"
              value={rate}
              onChange={setRate}
              placeholder="e.g. 58"
            />
            <SelectField label="CURRENCY" value={currency} onChange={setCurrency}>
              <CurrencyOptions />
            </SelectField>
          </div>

          <div className="font-mono text-[11px] text-muted-3">
            Formula: kg = π/4 × (OD² − ID²) × W × ρ ÷ 10⁹ &nbsp;·&nbsp; strip length = π/4 × (OD² − ID²) ÷ t
          </div>

          <ShowMaths
            lines={[
              formulaLine,
              stripLenM > 0
                ? `Strip length = π/4 × (${fmt(odV, 0)}² − ${idV}²) ÷ ${tV} ÷ 1000 = ${fmt(stripLenM, 0)} m`
                : "Enter thickness to get strip length and m² per coil",
              `Strip weight = ${wV} × ${tV} × ${rho} ÷ 10⁶ = ${fmt(kgPerMetreStrip, 2)} kg per metre of strip`,
              "Weight is theoretical; mill tolerance on thickness and width typically moves actual coil weight ±2 to 3%",
            ]}
            source="SOURCE: IS 1079 · IS 513 · IS 277 · ASTM A1011 · EN 10051 · LAST VERIFIED 9 NOV 2026"
          />
        </>
      }
      result={
        <ResultPanel
          context={name}
          quote={{
            desc: `${matLabel} coil ${wV} × ${tV} mm`,
            detail: `OD ${fmt(odV, 0)} / ID ${idV} mm`,
            pieces: n,
            unitKg: kgPerCoil,
            totalKg,
          }}
          headlineLabel={mode === "dims" ? "WEIGHT PER COIL — KG" : "OUTER DIAMETER — MM"}
          headlineValue={mode === "dims" ? fmt(kgPerCoil, 0) : fmt(odV, 0)}
          subline={
            mode === "dims"
              ? `${fmt(kgPerCoil / 1000, 3)} t per coil`
              : `${fmt(kgPerCoil, 0)} kg per coil`
          }
          stats={[
            {
              label: "STRIP LENGTH",
              value: stripLenM > 0 ? `${fmt(stripLenM, 0)} m` : "— enter thickness",
            },
            {
              label: "AREA PER COIL",
              value: sqmPerCoil > 0 ? `${fmt(sqmPerCoil, 0)} m² · ${fmt(kgPerSqm, 2)} kg/m²` : "—",
            },
            {
              label: `TOTAL — ${n} COIL${n > 1 ? "S" : ""}`,
              value: totalKg >= 1000 ? `${fmt(totalKg / 1000, 3)} t` : `${fmt(totalKg, 0)} kg`,
            },
            {
              label: "COILS PER 25 T TRUCK",
              value: coilsPer25t > 0 ? `${coilsPer25t}` : "—",
            },
            {
              label: "TOTAL COST",
              value: r > 0 ? `${currency}${fmt(cost, 0)}` : "— enter rate",
              accent: true,
            },
          ]}
          formulaLine={formulaLine}
          copyText={copyText}
          shareUrl={shareUrl}
        />
      }
    />
  );
}
