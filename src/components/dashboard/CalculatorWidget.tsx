"use client";

import { useState } from "react";
import Link from "next/link";
import { ProductType, calculateSteelWeight } from "@/lib/calculator";

const GRADES = ["Fe500", "SS304", "SS316", "MS", "EN8", "EN24"] as const;
const SHAPES: { value: ProductType; label: string }[] = [
  { value: "round", label: "Round" },
  { value: "square", label: "Square" },
  { value: "rectangular", label: "Flat/Rect" },
  { value: "sheet", label: "Sheet" },
];

const DIM_FIELDS: Record<ProductType, { id: string; ph: string }[]> = {
  round: [
    { id: "diameter", ph: "Dia mm" },
    { id: "length", ph: "Len m" },
  ],
  square: [
    { id: "side", ph: "Side mm" },
    { id: "length", ph: "Len m" },
  ],
  rectangular: [
    { id: "width", ph: "W mm" },
    { id: "height", ph: "H mm" },
    { id: "length", ph: "L m" },
  ],
  sheet: [
    { id: "length", ph: "L mm" },
    { id: "width", ph: "W mm" },
    { id: "thickness", ph: "T mm" },
  ],
};

export default function CalculatorWidget() {
  const [shape, setShape] = useState<ProductType>("round");
  const [dims, setDims] = useState<Record<string, string>>({});
  const [result, setResult] = useState<number | null>(null);

  function calculate() {
    const n: Record<string, number> = {};
    for (const [k, v] of Object.entries(dims)) n[k] = parseFloat(v);
    const r = calculateSteelWeight(shape, n);
    setResult(r ? r.weight : null);
  }

  const fields = DIM_FIELDS[shape];

  return (
    <div className="h-full flex flex-col" id="tools">
      <div className="widget-header">
        <Link href="/calculator" className="no-underline group flex items-center gap-1.5">
          <h2 className="text-white font-bold text-xs tracking-tight group-hover:text-accent transition-colors">Weight Calculator</h2>
          <svg className="w-3 h-3 text-white/15 group-hover:text-accent/40 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path d="M7 17l9.2-9.2M17 17V7H7" />
          </svg>
        </Link>
      </div>

      <div className="flex-1 px-3 pb-3 flex flex-col gap-2">
        <div className="grid grid-cols-2 gap-1.5">
          <select className="glass-select px-2 py-1.5 text-[10px]">
            {GRADES.map((g) => <option key={g}>{g}</option>)}
          </select>
          <select
            className="glass-select px-2 py-1.5 text-[10px]"
            value={shape}
            onChange={(e) => { setShape(e.target.value as ProductType); setDims({}); setResult(null); }}
          >
            {SHAPES.map((s) => <option key={s.value} value={s.value}>{s.label}</option>)}
          </select>
        </div>

        <div className={`grid gap-1.5 ${fields.length > 2 ? "grid-cols-3" : "grid-cols-2"}`}>
          {fields.map((f) => (
            <input
              key={f.id}
              type="number"
              placeholder={f.ph}
              step="0.1"
              value={dims[f.id] || ""}
              onChange={(e) => setDims((prev) => ({ ...prev, [f.id]: e.target.value }))}
              className="glass-input px-2 py-1.5 text-[10px]"
            />
          ))}
        </div>

        <div className="flex items-center gap-2 mt-auto">
          <button onClick={calculate} className="btn-glow flex-1 py-2 text-[10px]">
            CALCULATE
          </button>
          {result !== null && (
            <div className="text-right shrink-0">
              <span className="text-xl font-bold text-white">{result.toFixed(1)}</span>
              <span className="text-white/30 text-[10px] ml-0.5">kg</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
