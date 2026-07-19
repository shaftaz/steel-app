"use client";

import { useState } from "react";
import { equalAngles } from "@/lib/data/section-weights";
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
} from "@/components/instrument";

const COMMON_SIZES = [
  { a: 25, b: 25, t: 3 }, { a: 30, b: 30, t: 5 }, { a: 40, b: 40, t: 5 },
  { a: 50, b: 50, t: 5 }, { a: 50, b: 50, t: 6 }, { a: 60, b: 60, t: 6 },
  { a: 75, b: 75, t: 6 }, { a: 75, b: 75, t: 8 }, { a: 100, b: 100, t: 8 },
  { a: 100, b: 100, t: 10 }, { a: 130, b: 130, t: 10 }, { a: 150, b: 150, t: 12 },
];

export default function AngleWeightCalc() {
  const [legA, setLegA] = useState("50");
  const [legB, setLegB] = useState("50");
  const [thickness, setThickness] = useState("5");
  const [length, setLength] = useState("6");
  const [quantity, setQuantity] = useState("1");
  const [rate, setRate] = useState("");
  const [currency, setCurrency] = useCurrency();

  const a = parseFloat(legA) || 0;
  const b = parseFloat(legB) || 0;
  const t = parseFloat(thickness) || 0;
  const l = parseFloat(length) || 0;
  const q = parseInt(quantity) || 1;
  const r = num(rate);

  const match = equalAngles.find(
    (ang) => ang.legA === a && ang.legB === b && ang.thickness === t
  );

  let weightPerMetre = match ? match.weightPerMetre : 0;
  if (!match && a > 0 && b > 0 && t > 0 && t < Math.min(a, b)) {
    weightPerMetre = (a + b - t) * t * 0.00785;
  }

  const perPiece = weightPerMetre * l;
  const totalWeight = weightPerMetre * l * q;
  const cost = totalWeight * r;
  const perTonne = perPiece > 0 ? 1000 / perPiece : 0;

  const name = `ANGLE ${a}×${b}×${t}`;
  const shareUrl = "https://steelmath.com/calculators/angle-weight";
  const copyText = `${name} — ${fmt(weightPerMetre, 2)} kg/m · ${q} pcs = ${fmt(
    totalWeight,
    2
  )} kg${r > 0 ? ` · ${currency}${fmt(cost, 0)}` : ""} — via steelmath.com`;
  const formulaLine = `(${a} + ${b} − ${t}) × ${t} × 0.00785 = ${fmt(
    weightPerMetre,
    2
  )} kg/m`;

  return (
    <InstrumentShell
      inputs={
        <>
          <div className="flex flex-col gap-1.5">
            <span className={LABEL_CLS}>QUICK SELECT — COMMON SIZES</span>
            <div className="flex flex-wrap gap-1.5">
              {COMMON_SIZES.map((s) => (
                <Chip
                  key={`${s.a}x${s.b}x${s.t}`}
                  active={a === s.a && b === s.b && t === s.t}
                  onClick={() => {
                    setLegA(String(s.a));
                    setLegB(String(s.b));
                    setThickness(String(s.t));
                  }}
                >
                  {s.a}×{s.b}×{s.t}
                </Chip>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            <Field label="LEG A (MM)" value={legA} onChange={setLegA} />
            <Field label="LEG B (MM)" value={legB} onChange={setLegB} />
            <Field
              label="THICKNESS (MM)"
              value={thickness}
              onChange={setThickness}
            />
            <Field label="LENGTH (METRES)" value={length} onChange={setLength} />
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
              <option value="₹">₹ INR</option>
              <option value="€">€ EUR</option>
              <option value="$">$ USD</option>
              <option value="£">£ GBP</option>
              <option value="S$">S$ SGD</option>
              <option value="¥">¥ JPY</option>
            </SelectField>
          </div>

          <div className="font-mono text-[11px] text-muted-3">
            Formula: (A + B − T) × T × 0.00785 |{" "}
            {match ? "✓ Standard IS 808 size" : "Custom size (calculated)"}
          </div>

          <ShowMaths
            lines={[
              formulaLine,
              match
                ? `IS 808 table value — ${a}×${b}×${t} = ${fmt(
                    weightPerMetre,
                    2
                  )} kg/m`
                : "Custom size — sharp-corner approximation (IS 808 tabulated values differ slightly)",
              "Constant 0.00785 = 7,850 kg/m³ ÷ 10⁶ (steel density per mm²·m)",
            ]}
            source="SOURCE: IS 808 · ASTM A6 · JIS G3192 · LAST VERIFIED 18 JUL 2026"
          />
        </>
      }
      result={
        <ResultPanel
          context={name}
          headlineLabel="WEIGHT / METRE — KG/M"
          headlineValue={fmt(weightPerMetre, 2)}
          stats={[
            {
              label: `PER PIECE · ${l} M`,
              value: `${fmt(perPiece, 2)} kg`,
            },
            {
              label: `TOTAL — ${q} PCS`,
              value:
                totalWeight >= 1000
                  ? `${fmt(totalWeight / 1000, 3)} t`
                  : `${fmt(totalWeight, 2)} kg`,
            },
            {
              label: "PIECES PER TONNE",
              value: perTonne > 0 ? `≈ ${fmt(perTonne, 1)}` : "—",
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
