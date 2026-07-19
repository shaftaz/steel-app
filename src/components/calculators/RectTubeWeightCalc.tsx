"use client";

import { useState } from "react";
import { rectTubes } from "@/lib/data/section-weights";
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
  { w: 40, h: 20, t: 2 }, { w: 50, h: 25, t: 2.5 }, { w: 60, h: 30, t: 2.5 },
  { w: 60, h: 40, t: 3 }, { w: 80, h: 40, t: 3 }, { w: 80, h: 40, t: 4 },
  { w: 100, h: 50, t: 3 }, { w: 100, h: 50, t: 4 }, { w: 120, h: 60, t: 4 },
  { w: 150, h: 75, t: 4 }, { w: 200, h: 100, t: 5 },
];

export default function RectTubeWeightCalc() {
  const [width, setWidth] = useState("80");
  const [height, setHeight] = useState("40");
  const [wt, setWt] = useState("3");
  const [length, setLength] = useState("6");
  const [quantity, setQuantity] = useState("1");
  const [rate, setRate] = useState("");
  const [currency, setCurrency] = useCurrency();

  const w = parseFloat(width) || 0;
  const h = parseFloat(height) || 0;
  const t = parseFloat(wt) || 0;
  const l = parseFloat(length) || 0;
  const q = parseInt(quantity) || 1;
  const r = num(rate);

  const match = rectTubes.find(
    (rt) => rt.width === w && rt.height === h && rt.wallThickness === t
  );
  let weightPerMetre = match ? match.weightPerMetre : 0;
  if (!match && w > 0 && h > 0 && t > 0 && t < Math.min(w, h) / 2) {
    weightPerMetre = 2 * (w + h - 2 * t) * t * 0.00785;
  }

  const perPiece = weightPerMetre * l;
  const totalWeight = weightPerMetre * l * q;
  const cost = totalWeight * r;
  const perTonne = perPiece > 0 ? 1000 / perPiece : 0;

  const name = `RHS ${w}×${h}×${t}`;
  const shareUrl = "https://steelmath.com/calculators/rect-tube-weight";
  const copyText = `${name} — ${fmt(weightPerMetre, 2)} kg/m · ${q} pcs = ${fmt(
    totalWeight,
    2
  )} kg${r > 0 ? ` · ${currency}${fmt(cost, 0)}` : ""} — via steelmath.com`;
  const formulaLine = `2 × (${w} + ${h} − 2×${t}) × ${t} × 0.00785 = ${fmt(
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
                  key={`${cs.w}x${cs.h}x${cs.t}`}
                  active={w === cs.w && h === cs.h && t === cs.t}
                  onClick={() => {
                    setWidth(String(cs.w));
                    setHeight(String(cs.h));
                    setWt(String(cs.t));
                  }}
                >
                  {cs.w}×{cs.h}×{cs.t}
                </Chip>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            <Field label="WIDTH (MM)" value={width} onChange={setWidth} />
            <Field label="HEIGHT (MM)" value={height} onChange={setHeight} />
            <Field label="WALL (MM)" value={wt} onChange={setWt} step={0.5} />
            <Field label="LENGTH (M)" value={length} onChange={setLength} />
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
            </SelectField>
          </div>

          <div className="font-mono text-[11px] text-muted-3">
            Formula: 2 × (W + H − 2×WT) × WT × 0.00785
          </div>

          <ShowMaths
            lines={[
              formulaLine,
              match
                ? `IS 4923 table value — ${w}×${h}×${t} = ${fmt(
                    weightPerMetre,
                    2
                  )} kg/m`
                : "Custom size — sharp-corner approximation of the hollow section",
              "Constant 0.00785 = 7,850 kg/m³ ÷ 10⁶ (steel density per mm²·m)",
            ]}
            source="SOURCE: IS 4923 · LAST VERIFIED 18 JUL 2026"
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
