"use client";

import { useState } from "react";
import { squareTubes } from "@/lib/data/section-weights";
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
  { s: 20, t: 2 }, { s: 25, t: 2 }, { s: 30, t: 2 }, { s: 40, t: 2 },
  { s: 40, t: 2.5 }, { s: 40, t: 3 }, { s: 50, t: 2.5 }, { s: 50, t: 3 },
  { s: 60, t: 3 }, { s: 75, t: 3 }, { s: 75, t: 4 }, { s: 80, t: 4 },
  { s: 100, t: 4 }, { s: 100, t: 5 },
];

export default function SquareTubeWeightCalc() {
  const [side, setSide] = useState("50");
  const [wt, setWt] = useState("3");
  const [length, setLength] = useState("6");
  const [quantity, setQuantity] = useState("1");
  const [rate, setRate] = useState("");
  const [currency, setCurrency] = useCurrency();

  const s = parseFloat(side) || 0;
  const t = parseFloat(wt) || 0;
  const l = parseFloat(length) || 0;
  const q = parseInt(quantity) || 1;
  const r = num(rate);

  const match = squareTubes.find(
    (st) => st.side === s && st.wallThickness === t
  );
  let weightPerMetre = match ? match.weightPerMetre : 0;
  if (!match && s > 0 && t > 0 && t < s / 2) {
    weightPerMetre = (s - t) * t * 4 * 0.00785;
  }

  const perPiece = weightPerMetre * l;
  const totalWeight = weightPerMetre * l * q;
  const cost = totalWeight * r;
  const perTonne = perPiece > 0 ? 1000 / perPiece : 0;

  const name = `SHS ${s}×${s}×${t}`;
  const shareUrl = "https://steelmath.com/calculators/square-tube-weight";
  const copyText = `${name} — ${fmt(weightPerMetre, 2)} kg/m · ${q} pcs = ${fmt(
    totalWeight,
    2
  )} kg${r > 0 ? ` · ${currency}${fmt(cost, 0)}` : ""} — via steelmath.com`;
  const formulaLine = `(${s} − ${t}) × ${t} × 4 × 0.00785 = ${fmt(
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
              {COMMON_SIZES.map((cs) => (
                <Chip
                  key={`${cs.s}x${cs.t}`}
                  active={s === cs.s && t === cs.t}
                  onClick={() => {
                    setSide(String(cs.s));
                    setWt(String(cs.t));
                  }}
                >
                  {cs.s}×{cs.s}×{cs.t}
                </Chip>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <Field label="SIDE (MM)" value={side} onChange={setSide} />
            <Field
              label="WALL THICKNESS (MM)"
              value={wt}
              onChange={setWt}
              step={0.5}
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
            Formula: (Side − WT) × WT × 4 × 0.00785 |{" "}
            {match ? "✓ Standard size" : "Custom (calculated)"}
          </div>

          <ShowMaths
            lines={[
              formulaLine,
              match
                ? `IS 4923 table value — ${s}×${s}×${t} = ${fmt(
                    weightPerMetre,
                    2
                  )} kg/m`
                : "Custom size — sharp-corner approximation of the hollow section",
              "Constant 0.00785 = 7,850 kg/m³ ÷ 10⁶ (steel density per mm²·m)",
            ]}
            source="SOURCE: IS 4923 · ASTM A500 · JIS G3466 · EN 10219 · LAST VERIFIED 18 JUL 2026"
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
