"use client";

import { useState } from "react";
import {
  InstrumentShell,
  ResultPanel,
  Field,
  SelectField,
  Chip,
  ShowMaths,
  LABEL_CLS,
  fmt,
  num,
  useCurrency,
  CurrencyOptions,
  useUrlState,
} from "@/components/instrument";

const COMMON_THICKNESSES = [3, 4, 5, 6, 8, 10, 12, 14, 16, 20, 25];

export default function ChequeredPlateWeightCalc() {
  const [thickness, setThickness] = useState("6");
  const [length, setLength] = useState("1500");
  const [width, setWidth] = useState("6000");
  const [quantity, setQuantity] = useState("1");
  const [rate, setRate] = useState("");
  const [currency, setCurrency] = useCurrency();

  useUrlState((p) => {
    if (p.get("t") && num(p.get("t")!) > 0) setThickness(p.get("t")!);
    if (p.get("l") && num(p.get("l")!) > 0) setLength(p.get("l")!);
    if (p.get("w") && num(p.get("w")!) > 0) setWidth(p.get("w")!);
    if (p.get("q") && num(p.get("q")!) > 0) setQuantity(p.get("q")!);
  });

  const t = parseFloat(thickness) || 0;
  const l = parseFloat(length) || 0;
  const w = parseFloat(width) || 0;
  const q = parseInt(quantity) || 1;
  const r = num(rate);

  const weightPerSqm = t * 7.85 * 1.05;
  const areaSqm = (l * w) / 1000000;
  const weightPerPiece = weightPerSqm * areaSqm;
  const totalWeight = weightPerPiece * q;
  const cost = totalWeight * r;

  const name = `CHQ PLATE ${t} MM`;
  const shareUrl = `https://steelmath.com/calculators/chequered-plate-weight?t=${thickness}&l=${length}&w=${width}&q=${quantity}`;
  const copyText = `${name} — ${fmt(weightPerSqm, 2)} kg/m² · ${q} pcs = ${fmt(
    totalWeight,
    2
  )} kg${r > 0 ? ` · ${currency}${fmt(cost, 0)}` : ""} — via steelmath.com`;
  const formulaLine = `${t} × 7.85 × 1.05 = ${fmt(weightPerSqm, 2)} kg/m²`;

  return (
    <InstrumentShell
      inputs={
        <>
          <div className="flex flex-col gap-1.5">
            <span className={LABEL_CLS}>THICKNESS — QUICK SELECT</span>
            <div className="flex flex-wrap gap-1.5">
              {COMMON_THICKNESSES.map((th) => (
                <Chip
                  key={th}
                  active={t === th}
                  onClick={() => setThickness(String(th))}
                >
                  {th}mm
                </Chip>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <Field
              label="THICKNESS (MM)"
              value={thickness}
              onChange={setThickness}
            />
            <Field label="LENGTH (MM)" value={length} onChange={setLength} />
            <Field label="WIDTH (MM)" value={width} onChange={setWidth} />
            <Field
              label="PIECES (PCS)"
              value={quantity}
              onChange={setQuantity}
              step={1}
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <Field
              label="RATE / KG (OPTIONAL)"
              value={rate}
              onChange={setRate}
              placeholder="e.g. 62"
            />
            <SelectField label="CURRENCY" value={currency} onChange={setCurrency}>
              <CurrencyOptions />
            </SelectField>
          </div>

          <div className="font-mono text-[11px] text-muted-3">
            Formula: Thickness × 7.85 × 1.05 (5% pattern weight) ={" "}
            {fmt(weightPerSqm, 2)} kg/m²
          </div>

          <ShowMaths
            lines={[
              `${formulaLine} · plate = ${fmt(l, 0)} × ${fmt(w, 0)} mm = ${fmt(
                areaSqm,
                2
              )} m²`,
              "T(mm) × 7.85 = kg/m² for plain MS plate (density 7,850 kg/m³)",
              "× 1.05 adds ≈ 5% for the raised chequer pattern",
            ]}
            source="SOURCE: IS 2062 · ASTM A36 · JIS G3101 (SS400) · EN 10025 · LAST VERIFIED 18 JUL 2026"
          />
        </>
      }
      result={
        <ResultPanel
          context={name}
          quote={{ desc: name, pieces: q, unitKg: weightPerPiece, totalKg: totalWeight }}
          headlineLabel="WEIGHT / M² — KG/M²"
          headlineValue={fmt(weightPerSqm, 2)}
          stats={[
            {
              label: "PER PIECE",
              value: `${fmt(weightPerPiece, 2)} kg`,
            },
            {
              label: `TOTAL — ${q} PCS`,
              value:
                totalWeight >= 1000
                  ? `${fmt(totalWeight / 1000, 3)} t`
                  : `${fmt(totalWeight, 2)} kg`,
            },
            {
              label: "AREA / PIECE",
              value: `${fmt(areaSqm, 2)} m²`,
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
