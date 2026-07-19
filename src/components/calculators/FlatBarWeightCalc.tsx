"use client";

import { useState } from "react";
import { flatBars } from "@/lib/data/section-weights";
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

const COMMON_SIZES = [
  { w: 25, t: 3 }, { w: 25, t: 5 }, { w: 30, t: 5 }, { w: 40, t: 5 },
  { w: 40, t: 6 }, { w: 50, t: 5 }, { w: 50, t: 6 }, { w: 50, t: 8 },
  { w: 65, t: 6 }, { w: 75, t: 6 }, { w: 75, t: 8 }, { w: 100, t: 6 },
  { w: 100, t: 8 }, { w: 100, t: 10 },
];

function kgmFor(w: number, t: number) {
  const match = flatBars.find((fb) => fb.width === w && fb.thickness === t);
  if (match) return match.weightPerMetre;
  return w > 0 && t > 0 ? w * t * 0.00785 : 0;
}

export default function FlatBarWeightCalc() {
  const [width, setWidth] = useState("50");
  const [thickness, setThickness] = useState("6");
  const [length, setLength] = useState("6");
  const [quantity, setQuantity] = useState("1");
  const [rate, setRate] = useState("");
  const [currency, setCurrency] = useCurrency();

  const w = parseFloat(width) || 0;
  const t = parseFloat(thickness) || 0;
  const l = parseFloat(length) || 0;
  const q = parseInt(quantity) || 1;

  const match = flatBars.find((fb) => fb.width === w && fb.thickness === t);
  let weightPerMetre = match ? match.weightPerMetre : 0;
  if (!match && w > 0 && t > 0) {
    weightPerMetre = w * t * 0.00785;
  }

  const perPiece = weightPerMetre * l;
  const totalWeight = perPiece * q;
  const r = num(rate);
  const cost = totalWeight * r;

  const formulaLine = `${w} × ${t} × 0.00785 = ${fmt(w * t * 0.00785, 2)} kg/m${match ? ` · IS table value ${fmt(match.weightPerMetre, 2)} kg/m used` : ""}`;
  const copyText = `FLAT BAR ${w}×${t}MM — ${fmt(weightPerMetre, 2)} kg/m · ${q} pcs = ${fmt(totalWeight, 2)} kg${r > 0 ? ` · ${currency}${fmt(cost, 0)}` : ""} — via steelmath.com`;

  return (
    <div>
      <InstrumentShell
        inputs={
          <>
            <div className="grid grid-cols-[repeat(auto-fit,minmax(130px,1fr))] gap-3">
              <Field label="WIDTH (MM)" value={width} onChange={setWidth} />
              <Field label="THICKNESS (MM)" value={thickness} onChange={setThickness} />
              <Field label="LENGTH (M)" value={length} onChange={setLength} />
              <Field
                label="PIECES (PCS)"
                value={quantity}
                onChange={(v) => setQuantity(v)}
                step={1}
              />
            </div>
            <div className="grid grid-cols-[repeat(auto-fit,minmax(130px,1fr))] gap-3">
              <Field
                label="RATE / KG (OPTIONAL)"
                value={rate}
                onChange={setRate}
                placeholder="0"
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
            <ShowMaths
              lines={[
                `${w} × ${t} × 0.00785 = ${fmt(w * t * 0.00785, 2)} kg/m`,
                match
                  ? `Standard size — IS table value ${fmt(match.weightPerMetre, 2)} kg/m used`
                  : "Custom size — calculated from W × T × 0.00785",
                "Constant 0.00785 = MS density 7,850 kg/m³ ÷ 10⁶",
              ]}
              source="SOURCE: IS 2062 / IS 1732 · ASTM A36 · JIS G3101 · EN 10025 · LAST VERIFIED 18 JUL 2026"
            />
          </>
        }
        result={
          <ResultPanel
            context={`FLAT ${w}×${t} MM · ${match ? "STANDARD SIZE" : "CUSTOM SIZE"}`}
            headlineLabel="WEIGHT / METRE — KG/M"
            headlineValue={fmt(weightPerMetre, 2)}
            stats={[
              { label: `PER PIECE · ${l} M`, value: `${fmt(perPiece, 2)} kg` },
              {
                label: `TOTAL — ${q} PCS`,
                value:
                  totalWeight >= 1000
                    ? `${fmt(totalWeight / 1000, 3)} t`
                    : `${fmt(totalWeight, 2)} kg`,
              },
              {
                label: "SIZE STATUS",
                value: match ? "STANDARD ✓" : "CUSTOM (CALC)",
              },
              {
                label: "TOTAL COST",
                value: r > 0 ? `${currency}${fmt(cost, 0)}` : "— enter rate",
                accent: true,
              },
            ]}
            formulaLine={formulaLine}
            copyText={copyText}
            shareUrl="https://steelmath.com/calculators/flat-bar-weight"
          />
        }
      />

      <div className="border border-rule border-t-0 bg-[#FFFFFF] no-print">
        <div className="px-5 py-3.5 border-b border-rule-faint">
          <span className="font-mono text-[10.5px] tracking-[0.12em] text-muted-3">
            QUICK SELECT — COMMON SIZES (W × T MM)
          </span>
        </div>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(100px,1fr))]">
          {COMMON_SIZES.map((s) => {
            const active = w === s.w && t === s.t;
            return (
              <button
                key={`${s.w}x${s.t}`}
                onClick={() => {
                  setWidth(String(s.w));
                  setThickness(String(s.t));
                }}
                aria-pressed={active}
                className={`border-r border-t border-rule-faint px-2.5 py-3 cursor-pointer text-left transition-colors ${
                  active ? "bg-ink text-[#FFFFFF]" : "bg-transparent hover:bg-paper"
                }`}
              >
                <div
                  className={`font-mono text-[12.5px] font-semibold ${
                    active ? "text-[#FFFFFF]" : "text-ink"
                  }`}
                >
                  {s.w}×{s.t}
                </div>
                <div
                  className={`font-mono text-[11px] mt-0.5 ${
                    active ? "text-[#FFFFFF]" : "text-muted-3"
                  }`}
                >
                  {fmt(kgmFor(s.w, s.t), 2)} kg/m
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
