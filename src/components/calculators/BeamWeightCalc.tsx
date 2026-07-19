"use client";

import { useState } from "react";
import { ismbBeams } from "@/lib/data/section-weights";
import {
  InstrumentShell,
  ResultPanel,
  Field,
  SelectField,
  Chip,
  ShowMaths,
  fmt,
  num,
  useCurrency,
  LABEL_CLS,
} from "@/components/instrument";

export default function BeamWeightCalc() {
  const [selected, setSelected] = useState("ISMB 200");
  const [length, setLength] = useState("6");
  const [quantity, setQuantity] = useState("1");
  const [rate, setRate] = useState(62);
  const [currency, setCurrency] = useCurrency();

  const beam = ismbBeams.find((b) => b.designation === selected);
  const weightPerMetre = beam?.weightPerMetre || 0;
  const l = parseFloat(length) || 0;
  const q = parseInt(quantity) || 1;
  const totalWeight = weightPerMetre * l * q;
  const cost = totalWeight * rate;

  const formulaText = `${weightPerMetre.toFixed(1)} kg/m × ${l} m × ${q} pcs = ${fmt(totalWeight, 1)} kg`;
  const copyText = `${selected} — ${weightPerMetre.toFixed(1)} kg/m · ${q} pcs × ${l} m = ${fmt(totalWeight, 1)} kg (${fmt(totalWeight / 1000, 3)} MT)${rate > 0 ? ` · ${currency}${fmt(cost, 0)}` : ""} — via steelmath.com`;

  return (
    <div>
      <InstrumentShell
        inputs={
          <>
            <div className="flex flex-col gap-1.5">
              <span className={LABEL_CLS}>ISMB DESIGNATION — IS 808</span>
              <div className="flex flex-wrap gap-1.5">
                {ismbBeams.map((b) => (
                  <Chip
                    key={b.designation}
                    active={selected === b.designation}
                    onClick={() => setSelected(b.designation)}
                  >
                    {b.designation}
                  </Chip>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-[repeat(auto-fit,minmax(130px,1fr))] gap-3">
              <Field label="LENGTH (M)" value={length} onChange={setLength} />
              <Field
                label="PIECES (PCS)"
                value={quantity}
                onChange={setQuantity}
                step={1}
              />
            </div>
            <div className="grid grid-cols-[repeat(auto-fit,minmax(130px,1fr))] gap-3">
              <Field
                label="RATE / KG (OPTIONAL)"
                value={rate}
                onChange={(v) => setRate(num(v))}
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
                formulaText,
                `Unit weight for ${selected} is the IS 808 tabulated value — ${weightPerMetre.toFixed(1)} kg/m`,
                beam
                  ? `Section — depth ${beam.depth} mm · flange ${beam.flangeWidth} mm · web ${beam.webThickness} mm · flange t ${beam.flangeThickness} mm`
                  : "",
              ]}
              source="SOURCE: IS 808 (ISMB/ISMC) · ASTM A6 / A36 · JIS G3192 · LAST VERIFIED 18 JUL 2026"
            />
          </>
        }
        result={
          <ResultPanel
            context={selected}
            headlineLabel="WEIGHT / METRE — KG/M"
            headlineValue={weightPerMetre.toFixed(1)}
            stats={[
              {
                label: `PER PIECE · ${l} M`,
                value: `${fmt(weightPerMetre * l, 1)} kg`,
              },
              {
                label: `TOTAL — ${q} PCS`,
                value: `${fmt(totalWeight, 1)} kg`,
              },
              {
                label: "TOTAL — TONNES",
                value: `${fmt(totalWeight / 1000, 3)} MT`,
              },
              {
                label: "TOTAL COST",
                value: rate > 0 ? `${currency}${fmt(cost, 0)}` : "— enter rate",
                accent: true,
              },
            ]}
            formulaLine={formulaText}
            copyText={copyText}
            shareUrl="https://steelmath.com/calculators/beam-weight"
          />
        }
      />

      {/* Section properties — IS 808 */}
      {beam && (
        <div className="border border-rule border-t-0 bg-[#FFFFFF]">
          <div className="px-5 py-3.5 border-b border-rule-faint">
            <span className="font-mono text-[10.5px] tracking-[0.12em] text-muted-3 uppercase">
              SECTION PROPERTIES — {selected}
            </span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4">
            {[
              { label: "DEPTH", value: `${beam.depth} mm` },
              { label: "FLANGE", value: `${beam.flangeWidth} mm` },
              { label: "ZXX", value: `${beam.sectionModulusZxx} cm³` },
              { label: "IXX", value: `${beam.momentOfInertiaIxx} cm⁴` },
            ].map((p) => (
              <div
                key={p.label}
                className="border-r border-t border-rule-faint px-2.5 py-3"
              >
                <div className="font-mono text-[10px] tracking-[0.1em] text-muted-3 uppercase">
                  {p.label}
                </div>
                <div className="font-mono text-[12.5px] text-ink mt-0.5">{p.value}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
