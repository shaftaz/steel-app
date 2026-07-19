"use client";

import { useState } from "react";
import { REBAR_SIZES } from "@/lib/calculators/materials";
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

export default function RebarCalc() {
  const [sizeIdx, setSizeIdx] = useState(3); // default 12mm
  const [barLength, setBarLength] = useState("12");
  const [totalLengthNeeded, setTotalLengthNeeded] = useState("100");
  const [rate, setRate] = useState("");
  const [currency, setCurrency] = useCurrency();

  const size = REBAR_SIZES[sizeIdx];
  const bl = parseFloat(barLength) || 12;
  const tl = parseFloat(totalLengthNeeded) || 0;

  const totalWeight = tl * size.kgPerMetre;
  const barsNeeded = tl > 0 ? Math.ceil(tl / bl) : 0;
  const r = num(rate);
  const cost = totalWeight * r;

  const formulaLine = `${fmt(tl, 1)} m × ${size.kgPerMetre} kg/m = ${fmt(totalWeight, 2)} kg`;
  const copyText = `${size.diameter}MM TMT REBAR — ${size.kgPerMetre} kg/m · ${barsNeeded} pcs = ${fmt(totalWeight, 2)} kg${r > 0 ? ` · ${currency}${fmt(cost, 0)}` : ""} — via steelmath.com`;

  return (
    <InstrumentShell
      inputs={
        <>
          <SelectField
            label="BAR DIAMETER"
            value={sizeIdx}
            onChange={(v) => setSizeIdx(Number(v))}
          >
            {REBAR_SIZES.map((s, i) => (
              <option key={s.diameter} value={i}>
                {s.diameter}mm ({s.kgPerMetre} kg/m)
              </option>
            ))}
          </SelectField>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(130px,1fr))] gap-3">
            <Field
              label="STANDARD BAR LENGTH (M)"
              value={barLength}
              onChange={setBarLength}
              placeholder="12"
            />
            <Field
              label="TOTAL LENGTH NEEDED (M)"
              value={totalLengthNeeded}
              onChange={setTotalLengthNeeded}
              placeholder="e.g. 500"
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
              <option value="CN¥">CN¥ CNY</option>
              <option value="A$">A$ AUD</option>
              <option value="C$">C$ CAD</option>
              <option value="₫">₫ VND</option>
            </SelectField>
          </div>
          <ShowMaths
            lines={[
              `${fmt(tl, 1)} m × ${size.kgPerMetre} kg/m = ${fmt(totalWeight, 2)} kg`,
              `Bars needed = ceil(${fmt(tl, 1)} ÷ ${fmt(bl, 1)}) = ${barsNeeded}`,
              `kg/m for ${size.diameter} mm TMT = ${size.diameter}² ÷ 162.2 (cross-section ${size.area} mm²)`,
              "Constant 162.2 = 10⁶ ÷ (π/4 × 7,850)",
            ]}
            source="SOURCE: IS 1786 · ASTM A615 · JIS G3112 · BS 4449 · LAST VERIFIED 18 JUL 2026"
          />
        </>
      }
      result={
        <ResultPanel
          context={`${size.diameter} MM TMT · ${size.kgPerMetre} KG/M`}
          headlineLabel="TOTAL WEIGHT — KG"
          headlineValue={fmt(totalWeight, 2)}
          subline={`${size.diameter}mm TMT · ${fmt(tl, 1)} m total length`}
          stats={[
            { label: "BAR SIZE", value: `${size.diameter}mm TMT` },
            { label: `BARS NEEDED · ${fmt(bl, 1)} M EACH`, value: `${barsNeeded} bars` },
            { label: "WEIGHT IN TONNES", value: `${fmt(totalWeight / 1000, 3)} t` },
            {
              label: "TOTAL COST",
              value: r > 0 ? `${currency}${fmt(cost, 0)}` : "— enter rate",
              accent: true,
            },
          ]}
          formulaLine={formulaLine}
          copyText={copyText}
          shareUrl="https://steelmath.com/calculators/rebar"
        />
      }
    />
  );
}
