"use client";

import { useState } from "react";
import { MATERIALS } from "@/lib/calculators/materials";

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
      return { weight: w, formula: "\u03C0/4 \u00D7 d\u00B2 \u00D7 L \u00D7 \u03C1" };
    }
    case "square": {
      const s = dims.side || 0;
      if (s <= 0) return null;
      const vol = (s / 10) ** 2 * (L * 100);
      return { weight: (vol * density) / 1000, formula: "s\u00B2 \u00D7 L \u00D7 \u03C1" };
    }
    case "rectangular": {
      const w = dims.width || 0;
      const t = dims.thickness || 0;
      if (w <= 0 || t <= 0) return null;
      const vol = (w / 10) * (t / 10) * (L * 100);
      return { weight: (vol * density) / 1000, formula: "W \u00D7 T \u00D7 L \u00D7 \u03C1" };
    }
    case "sheet": {
      const sw = dims.width || 0;
      const st = dims.thickness || 0;
      if (sw <= 0 || st <= 0) return null;
      const vol = (L * 100) * (sw / 10) * (st / 10);
      return { weight: (vol * density) / 1000, formula: "L \u00D7 W \u00D7 T \u00D7 \u03C1" };
    }
    case "pipe": {
      const od = dims.outerDiameter || 0;
      const wt = dims.wallThickness || 0;
      if (od <= 0 || wt <= 0 || wt >= od / 2) return null;
      const vol =
        (Math.PI / 4) *
        ((od / 10) ** 2 - ((od - 2 * wt) / 10) ** 2) *
        (L * 100);
      return { weight: (vol * density) / 1000, formula: "\u03C0/4 \u00D7 (OD\u00B2 \u2212 ID\u00B2) \u00D7 L \u00D7 \u03C1" };
    }
    case "hexagonal": {
      const af = dims.acrossFlats || 0;
      if (af <= 0) return null;
      const area = (3 * Math.sqrt(3) / 2) * (af / 2 / 10) ** 2;
      const vol = area * (L * 100);
      return { weight: (vol * density) / 1000, formula: "(3\u221A3/2) \u00D7 s\u00B2 \u00D7 L \u00D7 \u03C1" };
    }
    default:
      return null;
  }
}

export default function MetalWeightCalc() {
  const [shape, setShape] = useState<Shape>("round");
  const [materialIdx, setMaterialIdx] = useState(0);
  const [dims, setDims] = useState<Record<string, string>>({});
  const [result, setResult] = useState<Result | null>(null);

  const material = MATERIALS[materialIdx];

  function handleCalc() {
    const numDims: Record<string, number> = {};
    for (const [k, v] of Object.entries(dims)) {
      numDims[k] = parseFloat(v) || 0;
    }
    setResult(calculate(shape, numDims, material.density));
  }

  function setDim(key: string, val: string) {
    setDims((prev) => ({ ...prev, [key]: val }));
  }

  const inputClass =
    "w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 text-white text-sm focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/25 transition-colors";

  return (
    <div className="glass-panel p-5 sm:p-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">
        <div>
          <label className="block text-white/40 text-xs mb-1.5">Material</label>
          <select
            className={inputClass}
            value={materialIdx}
            onChange={(e) => setMaterialIdx(Number(e.target.value))}
          >
            {MATERIALS.map((m, i) => (
              <option key={m.name} value={i} className="bg-[#0d1929]">
                {m.name} ({m.density} g/cm&sup3;)
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-white/40 text-xs mb-1.5">Shape</label>
          <select
            className={inputClass}
            value={shape}
            onChange={(e) => {
              setShape(e.target.value as Shape);
              setDims({});
              setResult(null);
            }}
          >
            {SHAPES.map((s) => (
              <option key={s.value} value={s.value} className="bg-[#0d1929]">
                {s.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-5">
        <div>
          <label className="block text-white/40 text-xs mb-1.5">Length (m)</label>
          <input
            type="number"
            className={inputClass}
            placeholder="e.g. 6"
            value={dims.length || ""}
            onChange={(e) => setDim("length", e.target.value)}
          />
        </div>

        {shape === "round" && (
          <div>
            <label className="block text-white/40 text-xs mb-1.5">Diameter (mm)</label>
            <input type="number" className={inputClass} placeholder="e.g. 25" value={dims.diameter || ""} onChange={(e) => setDim("diameter", e.target.value)} />
          </div>
        )}
        {shape === "square" && (
          <div>
            <label className="block text-white/40 text-xs mb-1.5">Side (mm)</label>
            <input type="number" className={inputClass} placeholder="e.g. 25" value={dims.side || ""} onChange={(e) => setDim("side", e.target.value)} />
          </div>
        )}
        {(shape === "rectangular" || shape === "sheet") && (
          <>
            <div>
              <label className="block text-white/40 text-xs mb-1.5">Width (mm)</label>
              <input type="number" className={inputClass} placeholder="e.g. 50" value={dims.width || ""} onChange={(e) => setDim("width", e.target.value)} />
            </div>
            <div>
              <label className="block text-white/40 text-xs mb-1.5">Thickness (mm)</label>
              <input type="number" className={inputClass} placeholder="e.g. 10" value={dims.thickness || ""} onChange={(e) => setDim("thickness", e.target.value)} />
            </div>
          </>
        )}
        {shape === "pipe" && (
          <>
            <div>
              <label className="block text-white/40 text-xs mb-1.5">Outer Diameter (mm)</label>
              <input type="number" className={inputClass} placeholder="e.g. 60" value={dims.outerDiameter || ""} onChange={(e) => setDim("outerDiameter", e.target.value)} />
            </div>
            <div>
              <label className="block text-white/40 text-xs mb-1.5">Wall Thickness (mm)</label>
              <input type="number" className={inputClass} placeholder="e.g. 3" value={dims.wallThickness || ""} onChange={(e) => setDim("wallThickness", e.target.value)} />
            </div>
          </>
        )}
        {shape === "hexagonal" && (
          <div>
            <label className="block text-white/40 text-xs mb-1.5">Across Flats (mm)</label>
            <input type="number" className={inputClass} placeholder="e.g. 30" value={dims.acrossFlats || ""} onChange={(e) => setDim("acrossFlats", e.target.value)} />
          </div>
        )}
      </div>

      <button onClick={handleCalc} className="btn-glow px-6 py-2.5 text-sm w-full sm:w-auto">
        Calculate Weight
      </button>

      {result && (
        <div className="mt-5 p-4 rounded-lg bg-accent/5 border border-accent/20">
          <div className="text-accent text-2xl font-bold">
            {result.weight.toFixed(3)} kg
          </div>
          <div className="text-white/30 text-xs mt-1">
            {(result.weight / 1000).toFixed(4)} tonnes &middot; Formula: {result.formula}
          </div>
        </div>
      )}
    </div>
  );
}
