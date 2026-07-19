"use client";

import { useState } from "react";
import { MATERIALS } from "@/lib/calculators/materials";
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

type Shape = "round" | "square" | "rectangular" | "sheet" | "pipe" | "hexagonal";

interface Result {
  weight: number;
  formula: string;
}

const SHAPES: { value: Shape; label: string }[] = [
  { value: "round", label: "Round Bar" },
  { value: "square", label: "Square Bar" },
  { value: "rectangular", label: "Rectangular Bar" },
  { value: "sheet", label: "Sheet / Plate" },
  { value: "pipe", label: "Pipe / Tube" },
  { value: "hexagonal", label: "Hexagonal Bar" },
];

// Prefilled defaults per shape so a result shows immediately
const SHAPE_DEFAULTS: Record<Shape, Record<string, string>> = {
  round: { length: "6", diameter: "25" },
  square: { length: "6", side: "25" },
  rectangular: { length: "6", width: "50", thickness: "10" },
  sheet: { length: "6", width: "50", thickness: "10" },
  pipe: { length: "6", outerDiameter: "60", wallThickness: "3" },
  hexagonal: { length: "6", acrossFlats: "30" },
};

function calculate(
  shape: Shape,
  dims: Record<string, number>,
  density: number
): Result | null {
  const L = dims.length || 0;
  if (L <= 0) return null;

  switch (shape) {
    case "round": {
      const d = dims.diameter || 0;
      if (d <= 0) return null;
      const vol = (Math.PI / 4) * (d / 10) ** 2 * (L * 100);
      const w = (vol * density) / 1000;
      return { weight: w, formula: "π/4 × d² × L × ρ" };
    }
    case "square": {
      const s = dims.side || 0;
      if (s <= 0) return null;
      const vol = (s / 10) ** 2 * (L * 100);
      return { weight: (vol * density) / 1000, formula: "s² × L × ρ" };
    }
    case "rectangular": {
      const w = dims.width || 0;
      const t = dims.thickness || 0;
      if (w <= 0 || t <= 0) return null;
      const vol = (w / 10) * (t / 10) * (L * 100);
      return { weight: (vol * density) / 1000, formula: "W × T × L × ρ" };
    }
    case "sheet": {
      const sw = dims.width || 0;
      const st = dims.thickness || 0;
      if (sw <= 0 || st <= 0) return null;
      const vol = (L * 100) * (sw / 10) * (st / 10);
      return { weight: (vol * density) / 1000, formula: "L × W × T × ρ" };
    }
    case "pipe": {
      const od = dims.outerDiameter || 0;
      const wt = dims.wallThickness || 0;
      if (od <= 0 || wt <= 0 || wt >= od / 2) return null;
      const vol =
        (Math.PI / 4) *
        ((od / 10) ** 2 - ((od - 2 * wt) / 10) ** 2) *
        (L * 100);
      return { weight: (vol * density) / 1000, formula: "π/4 × (OD² − ID²) × L × ρ" };
    }
    case "hexagonal": {
      const af = dims.acrossFlats || 0;
      if (af <= 0) return null;
      const area = ((3 * Math.sqrt(3)) / 2) * (af / 2 / 10) ** 2;
      const vol = area * (L * 100);
      return { weight: (vol * density) / 1000, formula: "(3√3/2) × s² × L × ρ" };
    }
    default:
      return null;
  }
}

export default function MetalWeightCalc() {
  const [shape, setShape] = useState<Shape>("round");
  const [materialIdx, setMaterialIdx] = useState(0);
  const [dims, setDims] = useState<Record<string, string>>(SHAPE_DEFAULTS.round);
  const [pieces, setPieces] = useState(10);
  const [rate, setRate] = useState("");
  const [currency, setCurrency] = useCurrency();

  const material = MATERIALS[materialIdx];

  function setDim(key: string, val: string) {
    setDims((prev) => ({ ...prev, [key]: val }));
  }

  const numDims: Record<string, number> = {};
  for (const [k, v] of Object.entries(dims)) {
    numDims[k] = parseFloat(v) || 0;
  }
  const result = calculate(shape, numDims, material.density);

  const L = numDims.length || 0;
  const perPiece = result ? result.weight : 0;
  const kgPerMetre = result && L > 0 ? result.weight / L : 0;
  const total = perPiece * pieces;
  const r = num(rate);
  const cost = total * r;

  const shapeLabel = SHAPES.find((s) => s.value === shape)?.label ?? "";
  const copyText = `${shapeLabel.toUpperCase()} ${material.name.toUpperCase()} — ${fmt(kgPerMetre, 3)} kg/m · ${pieces} pcs = ${fmt(total, 2)} kg${r > 0 ? ` · ${currency}${fmt(cost, 0)}` : ""} — via steelmath.com`;

  return (
    <InstrumentShell
      inputs={
        <>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(160px,1fr))] gap-3">
            <SelectField
              label="MATERIAL"
              value={materialIdx}
              onChange={(v) => setMaterialIdx(Number(v))}
            >
              {MATERIALS.map((m, i) => (
                <option key={m.name} value={i}>
                  {m.name} ({m.density} g/cm³)
                </option>
              ))}
            </SelectField>
            <SelectField
              label="SHAPE"
              value={shape}
              onChange={(v) => {
                const sh = v as Shape;
                setShape(sh);
                setDims(SHAPE_DEFAULTS[sh]);
              }}
            >
              {SHAPES.map((s) => (
                <option key={s.value} value={s.value}>
                  {s.label}
                </option>
              ))}
            </SelectField>
          </div>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(130px,1fr))] gap-3">
            <Field
              label="LENGTH (M)"
              value={dims.length || ""}
              onChange={(v) => setDim("length", v)}
              placeholder="e.g. 6"
            />
            {shape === "round" && (
              <Field
                label="DIAMETER (MM)"
                value={dims.diameter || ""}
                onChange={(v) => setDim("diameter", v)}
                placeholder="e.g. 25"
              />
            )}
            {shape === "square" && (
              <Field
                label="SIDE (MM)"
                value={dims.side || ""}
                onChange={(v) => setDim("side", v)}
                placeholder="e.g. 25"
              />
            )}
            {(shape === "rectangular" || shape === "sheet") && (
              <>
                <Field
                  label="WIDTH (MM)"
                  value={dims.width || ""}
                  onChange={(v) => setDim("width", v)}
                  placeholder="e.g. 50"
                />
                <Field
                  label="THICKNESS (MM)"
                  value={dims.thickness || ""}
                  onChange={(v) => setDim("thickness", v)}
                  placeholder="e.g. 10"
                />
              </>
            )}
            {shape === "pipe" && (
              <>
                <Field
                  label="OUTER DIAMETER (MM)"
                  value={dims.outerDiameter || ""}
                  onChange={(v) => setDim("outerDiameter", v)}
                  placeholder="e.g. 60"
                />
                <Field
                  label="WALL THICKNESS (MM)"
                  value={dims.wallThickness || ""}
                  onChange={(v) => setDim("wallThickness", v)}
                  placeholder="e.g. 3"
                />
              </>
            )}
            {shape === "hexagonal" && (
              <Field
                label="ACROSS FLATS (MM)"
                value={dims.acrossFlats || ""}
                onChange={(v) => setDim("acrossFlats", v)}
                placeholder="e.g. 30"
              />
            )}
          </div>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(130px,1fr))] gap-3">
            <Field
              label="PIECES (PCS)"
              value={pieces}
              onChange={(v) => setPieces(Math.max(Math.round(num(v)), 0))}
              step={1}
            />
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
              result
                ? `${result.formula} = ${fmt(result.weight, 3)} kg per piece (${L} m)`
                : "Enter all dimensions to calculate",
              `ρ — ${material.name}: ${material.density} g/cm³ (${fmt(material.density * 1000)} kg/m³)`,
              "Volume in cm³ (mm ÷ 10, m × 100) · weight = volume × ρ ÷ 1,000",
            ]}
            source="SOURCE: IS 1786 / IS 2062 · ASTM A615 / A36 · JIS G3112 / G3101 · GB/T 1499 / 700 · EN 10025 · LAST VERIFIED 18 JUL 2026"
          />
        </>
      }
      result={
        <ResultPanel
          context={`${shapeLabel.toUpperCase()} · ${material.name.toUpperCase()}`}
          headlineLabel={`PER PIECE · ${L} M — KG`}
          headlineValue={result ? fmt(result.weight, 3) : "—"}
          subline={
            result
              ? `${fmt(result.weight / 1000, 4)} tonnes per piece`
              : "Enter all dimensions above"
          }
          stats={[
            {
              label: "WEIGHT / METRE",
              value: result ? `${fmt(kgPerMetre, 3)} kg/m` : "—",
            },
            {
              label: `TOTAL — ${pieces} PCS`,
              value: result
                ? total >= 1000
                  ? `${fmt(total / 1000, 3)} t`
                  : `${fmt(total, 2)} kg`
                : "—",
            },
            { label: "DENSITY", value: `${material.density} g/cm³` },
            {
              label: "TOTAL COST",
              value: result && r > 0 ? `${currency}${fmt(cost, 0)}` : "— enter rate",
              accent: true,
            },
          ]}
          formulaLine={result ? `Formula: ${result.formula}` : undefined}
          copyText={copyText}
          shareUrl="https://steelmath.com/calculators/metal-weight"
        />
      }
    />
  );
}
