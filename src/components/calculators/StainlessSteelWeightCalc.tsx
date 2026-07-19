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
  fmt,
  num,
  useCurrency,
} from "@/components/instrument";

const SS_GRADES = [
  { id: "ss304", label: "SS 304", density: 8.0 },
  { id: "ss316", label: "SS 316", density: 8.027 },
  { id: "ss202", label: "SS 202", density: 7.86 },
];

const SECTION_TYPES = [
  { id: "round", label: "Round Bar" },
  { id: "plate", label: "Plate/Sheet" },
  { id: "pipe", label: "Pipe" },
];

// Prefilled defaults per section so a result shows immediately
const SECTION_DEFAULTS: Record<string, { d1: string; d2: string; d3: string }> = {
  round: { d1: "25", d2: "", d3: "" },
  plate: { d1: "2500", d2: "1250", d3: "3" },
  pipe: { d1: "60", d2: "3", d3: "" },
};

export default function StainlessSteelWeightCalc() {
  const [grade, setGrade] = useState("ss304");
  const [section, setSection] = useState("round");
  const [dim1, setDim1] = useState("25");
  const [dim2, setDim2] = useState("");
  const [dim3, setDim3] = useState("");
  const [length, setLength] = useState("1");
  const [quantity, setQuantity] = useState("1");
  const [rate, setRate] = useState("");
  const [currency, setCurrency] = useCurrency();

  const g = SS_GRADES.find((gr) => gr.id === grade) || SS_GRADES[0];
  const d1 = parseFloat(dim1) || 0;
  const d2 = parseFloat(dim2) || 0;
  const d3 = parseFloat(dim3) || 0;
  const l = parseFloat(length) || 0;
  const q = parseInt(quantity) || 1;

  const selectSection = (id: string) => {
    setSection(id);
    const def = SECTION_DEFAULTS[id];
    if (def) {
      setDim1(def.d1);
      setDim2(def.d2);
      setDim3(def.d3);
    }
  };

  let weightPerUnit = 0;
  let formulaText = "";

  if (section === "round" && d1 > 0) {
    weightPerUnit = ((d1 * d1 * Math.PI * g.density) / (4 * 1000000)) * 1000;
    formulaText = `d²/162.2 × (${g.density}/7.85)`;
  } else if (section === "plate" && d1 > 0 && d2 > 0 && d3 > 0) {
    weightPerUnit = (d1 * d2 * d3 * g.density) / 1000000;
    formulaText = `L × W × T × ${g.density} / 1,000,000`;
  } else if (section === "pipe" && d1 > 0 && d2 > 0) {
    weightPerUnit = ((d1 - d2) * d2 * Math.PI * g.density) / 1000;
    formulaText = `(OD − WT) × WT × π × ${g.density} / 1000`;
  }

  const isPlate = section === "plate";
  const perPiece = isPlate ? weightPerUnit : weightPerUnit * l;
  const totalWeight = isPlate ? weightPerUnit * q : weightPerUnit * l * q;
  const r = num(rate);
  const cost = totalWeight * r;

  const sectionLabel =
    SECTION_TYPES.find((st) => st.id === section)?.label.toUpperCase() ?? "";
  const copyText = `${g.label.toUpperCase()} ${sectionLabel} — ${fmt(weightPerUnit, 3)} ${isPlate ? "kg/pc" : "kg/m"} · ${q} pcs = ${fmt(totalWeight, 2)} kg${r > 0 ? ` · ${currency}${fmt(cost, 0)}` : ""} — via steelmath.com`;

  const mathsLines: string[] = [];
  if (section === "round") {
    mathsLines.push(
      `π/4 × ${d1}² × ${g.density} ÷ 1,000 = ${fmt(weightPerUnit, 3)} kg/m`,
      `Equivalent: d²/162.2 × (${g.density}/7.85)`
    );
  } else if (section === "plate") {
    mathsLines.push(
      `${d1} × ${d2} × ${d3} × ${g.density} ÷ 10⁶ = ${fmt(weightPerUnit, 3)} kg per sheet`
    );
  } else {
    mathsLines.push(
      `(${d1} − ${d2}) × ${d2} × π × ${g.density} ÷ 1,000 = ${fmt(weightPerUnit, 3)} kg/m`
    );
  }
  mathsLines.push("ρ — SS 304: 8.0 · SS 316: 8.027 · SS 202: 7.86 g/cm³");

  return (
    <InstrumentShell
      header={
        <div className="flex flex-wrap border-b border-rule">
          {SECTION_TYPES.map((st) => (
            <ModeTab
              key={st.id}
              active={section === st.id}
              onClick={() => selectSection(st.id)}
            >
              {st.label}
            </ModeTab>
          ))}
        </div>
      }
      inputs={
        <>
          <div className="flex flex-col gap-1.5">
            <span className="font-mono text-[10.5px] tracking-[0.1em] text-muted-3 uppercase">
              SS GRADE — ρ {g.density} G/CM³
            </span>
            <div className="flex flex-wrap gap-1.5">
              {SS_GRADES.map((gr) => (
                <Chip key={gr.id} active={grade === gr.id} onClick={() => setGrade(gr.id)}>
                  {gr.label} ({gr.density} g/cm³)
                </Chip>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(130px,1fr))] gap-3">
            {section === "round" && (
              <Field label="DIAMETER (MM)" value={dim1} onChange={setDim1} />
            )}
            {section === "plate" && (
              <>
                <Field label="LENGTH (MM)" value={dim1} onChange={setDim1} />
                <Field label="WIDTH (MM)" value={dim2} onChange={setDim2} />
                <Field label="THICKNESS (MM)" value={dim3} onChange={setDim3} />
              </>
            )}
            {section === "pipe" && (
              <>
                <Field label="OD (MM)" value={dim1} onChange={setDim1} />
                <Field label="WALL THICKNESS (MM)" value={dim2} onChange={setDim2} />
              </>
            )}
            {!isPlate && <Field label="LENGTH (M)" value={length} onChange={setLength} />}
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
            lines={mathsLines}
            source="SOURCE: ASTM A240 / IS 6911 DENSITIES · LAST VERIFIED 18 JUL 2026"
          />
        </>
      }
      result={
        <ResultPanel
          context={`${g.label} · ${sectionLabel}`}
          headlineLabel={isPlate ? "WEIGHT / PIECE — KG" : "WEIGHT / METRE — KG/M"}
          headlineValue={fmt(weightPerUnit, 3)}
          stats={[
            {
              label: isPlate ? "PER SHEET" : `PER PIECE · ${l} M`,
              value: `${fmt(perPiece, 3)} kg`,
            },
            {
              label: `TOTAL — ${q} PCS`,
              value:
                totalWeight >= 1000
                  ? `${fmt(totalWeight / 1000, 3)} t`
                  : `${fmt(totalWeight, 2)} kg`,
            },
            { label: "GRADE DENSITY", value: `${g.density} g/cm³` },
            {
              label: "TOTAL COST",
              value: r > 0 ? `${currency}${fmt(cost, 0)}` : "— enter rate",
              accent: true,
            },
          ]}
          formulaLine={
            formulaText
              ? `${formulaText} · ${g.label} density ${g.density} g/cm³`
              : undefined
          }
          copyText={copyText}
          shareUrl="https://steelmath.com/calculators/stainless-steel-weight"
        />
      }
    />
  );
}
