"use client";

import { useState } from "react";
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
} from "@/components/instrument";

const MATERIALS = [
  { id: "ms", label: "Mild Steel (MS/EN8)", density: 7.85 },
  { id: "ss304", label: "SS 304", density: 8.0 },
  { id: "ss316", label: "SS 316", density: 8.027 },
  { id: "en24", label: "EN24/EN19", density: 7.85 },
  { id: "al", label: "Aluminium", density: 2.7 },
  { id: "brass", label: "Brass", density: 8.5 },
];

const COMMON_DIAMETERS = [
  6, 8, 10, 12, 16, 20, 25, 28, 30, 32, 36, 40, 45, 50, 55, 60, 65, 70, 75, 80, 90, 100,
];

export default function RoundBarWeightCalc() {
  const [diameter, setDiameter] = useState("25");
  const [material, setMaterial] = useState("ms");
  const [length, setLength] = useState("1");
  const [quantity, setQuantity] = useState("1");
  const [rate, setRate] = useState("");
  const [currency, setCurrency] = useCurrency();

  const d = parseFloat(diameter) || 0;
  const l = parseFloat(length) || 0;
  const q = parseInt(quantity) || 1;
  const mat = MATERIALS.find((m) => m.id === material) || MATERIALS[0];

  const weightPerMetreMS = (d * d) / 162.2;
  const weightPerMetre = weightPerMetreMS * (mat.density / 7.85);
  const perPiece = weightPerMetre * l;
  const totalWeight = perPiece * q;
  const r = num(rate);
  const cost = totalWeight * r;
  const perTonne = perPiece > 0 ? 1000 / perPiece : 0;

  const formulaLine = `${d}² ÷ 162.2 × (${mat.density}/7.85) = ${fmt(weightPerMetre, 3)} kg/m`;
  const copyText = `ROUND BAR ${d}MM ${mat.label.toUpperCase()} — ${fmt(weightPerMetre, 3)} kg/m · ${q} pcs = ${fmt(totalWeight, 2)} kg${r > 0 ? ` · ${currency}${fmt(cost, 0)}` : ""} — via steelmath.com`;

  return (
    <div>
      <InstrumentShell
        inputs={
          <>
            <div className="flex flex-col gap-1.5">
              <span className="font-mono text-[10.5px] tracking-[0.1em] text-muted-3 uppercase">
                MATERIAL — ρ {fmt(mat.density * 1000)} KG/M³
              </span>
              <div className="flex flex-wrap gap-1.5">
                {MATERIALS.map((m) => (
                  <Chip key={m.id} active={material === m.id} onClick={() => setMaterial(m.id)}>
                    {m.label}
                  </Chip>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-[repeat(auto-fit,minmax(130px,1fr))] gap-3">
              <Field label="DIAMETER (MM)" value={diameter} onChange={setDiameter} />
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
                <option value="CN¥">CN¥ CNY</option>
                <option value="A$">A$ AUD</option>
                <option value="C$">C$ CAD</option>
                <option value="₫">₫ VND</option>
              </SelectField>
            </div>
            <ShowMaths
              lines={[
                `${d}² ÷ 162.2 = ${fmt(weightPerMetreMS, 3)} kg/m (MS basis)`,
                `× (${mat.density} ÷ 7.85) = ${fmt(weightPerMetre, 3)} kg/m — ${mat.label}`,
                "Constant 162.2 = 10⁶ ÷ (π/4 × 7,850)",
                "ρ — MS/EN8/EN24 7.85 · SS304 8.0 · SS316 8.027 · Al 2.7 · Brass 8.5 g/cm³",
              ]}
              source="SOURCE: IS 1786 / IS 2062 · ASTM A615 / A36 · JIS G3112 / G3101 · GB/T 1499 / 700 · EN 10025 · LAST VERIFIED 18 JUL 2026"
            />
          </>
        }
        result={
          <ResultPanel
            context={`ROUND ${d} MM · ${mat.label}`}
            headlineLabel="WEIGHT / METRE — KG/M"
            headlineValue={fmt(weightPerMetre, 3)}
            stats={[
              { label: `PER PIECE · ${l} M`, value: `${fmt(perPiece, 3)} kg` },
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
            shareUrl="https://steelmath.com/calculators/round-bar-weight"
          />
        }
      />

      <div className="border border-rule border-t-0 bg-[#FFFFFF] no-print">
        <div className="px-5 py-3.5 border-b border-rule-faint">
          <span className="font-mono text-[10.5px] tracking-[0.12em] text-muted-3">
            DIAMETER (MM) — QUICK SELECT · {mat.label.toUpperCase()}
          </span>
        </div>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(90px,1fr))]">
          {COMMON_DIAMETERS.map((dia) => {
            const w = ((dia * dia) / 162.2) * (mat.density / 7.85);
            return (
              <button
                key={dia}
                onClick={() => setDiameter(String(dia))}
                aria-pressed={d === dia}
                className={`border-r border-t border-rule-faint px-2.5 py-3 cursor-pointer text-left transition-colors ${
                  d === dia ? "bg-ink text-[#FFFFFF]" : "bg-transparent hover:bg-paper"
                }`}
              >
                <div
                  className={`font-mono text-[12.5px] font-semibold ${
                    d === dia ? "text-[#FFFFFF]" : "text-ink"
                  }`}
                >
                  {dia} mm
                </div>
                <div
                  className={`font-mono text-[11px] mt-0.5 ${
                    d === dia ? "text-[#FFFFFF]" : "text-muted-3"
                  }`}
                >
                  {fmt(w, 3)} kg/m
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
