"use client";

import { useState } from "react";
import Link from "next/link";
import { ProductType, CalculationResult, calculateSteelWeight } from "@/lib/calculator";

const PRODUCT_TYPES: { type: ProductType; icon: string; name: string }[] = [
  { type: "round", icon: "●", name: "Round Bar / TMT" },
  { type: "square", icon: "■", name: "Square Bar" },
  { type: "rectangular", icon: "▭", name: "Flat / Rectangular" },
  { type: "sheet", icon: "⬜", name: "Sheet / Plate" },
];

const GRADES = ["MS (Mild Steel)", "Fe500", "SS304", "SS316", "EN8", "EN24", "Aluminium", "Copper"] as const;

const INPUT_CONFIGS: Record<ProductType, { id: string; label: string; ph: string }[]> = {
  round: [
    { id: "diameter", label: "Diameter (mm)", ph: "e.g. 12" },
    { id: "length", label: "Length (m)", ph: "e.g. 6" },
  ],
  square: [
    { id: "side", label: "Side (mm)", ph: "e.g. 25" },
    { id: "length", label: "Length (m)", ph: "e.g. 6" },
  ],
  rectangular: [
    { id: "width", label: "Width (mm)", ph: "e.g. 50" },
    { id: "height", label: "Height (mm)", ph: "e.g. 25" },
    { id: "length", label: "Length (m)", ph: "e.g. 6" },
  ],
  sheet: [
    { id: "length", label: "Length (mm)", ph: "e.g. 2000" },
    { id: "width", label: "Width (mm)", ph: "e.g. 1000" },
    { id: "thickness", label: "Thickness (mm)", ph: "e.g. 10" },
  ],
};

export default function LandingCalculator() {
  const [currentType, setCurrentType] = useState<ProductType>("round");
  const [dims, setDims] = useState<Record<string, string>>({});
  const [result, setResult] = useState<CalculationResult | null>(null);

  // Yield calculator state
  const [inputWt, setInputWt] = useState("");
  const [outputWt, setOutputWt] = useState("");
  const [yieldPct, setYieldPct] = useState<number | null>(null);

  function handleTypeChange(type: ProductType) {
    setCurrentType(type);
    setDims({});
    setResult(null);
  }

  function calcWeight() {
    const n: Record<string, number> = {};
    for (const [k, v] of Object.entries(dims)) n[k] = parseFloat(v);
    const r = calculateSteelWeight(currentType, n);
    if (r) setResult(r);
  }

  function calcYield() {
    const i = parseFloat(inputWt);
    const o = parseFloat(outputWt);
    if (i > 0 && o > 0 && o <= i) setYieldPct((o / i) * 100);
  }

  const inputs = INPUT_CONFIGS[currentType];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">

      {/* ── Weight Calculator (2/3) ── */}
      <div className="lg:col-span-2 glass-panel glass-panel-hover overflow-hidden">
        <div className="p-5 sm:p-6">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h3 className="text-white font-bold text-base">Steel Weight Calculator</h3>
              <p className="text-white/25 text-xs mt-0.5">Select shape, enter dimensions, get instant weight</p>
            </div>
            <Link href="/calculator" className="text-accent/50 hover:text-accent text-[11px] font-semibold no-underline transition-colors">
              Advanced →
            </Link>
          </div>

          {/* Product type selector */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-5">
            {PRODUCT_TYPES.map((p) => (
              <button key={p.type} onClick={() => handleTypeChange(p.type)}
                className={`rounded-lg py-3 px-3 cursor-pointer text-center transition-all duration-200 ${
                  currentType === p.type
                    ? "bg-accent/12 border border-accent/25 text-accent"
                    : "bg-white/[0.03] border border-white/[0.06] text-white/35 hover:bg-white/[0.06] hover:text-white/55"
                }`}>
                <span className="text-xl block mb-1">{p.icon}</span>
                <div className="font-medium text-[11px]">{p.name}</div>
              </button>
            ))}
          </div>

          {/* Grade + Dimensions row */}
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-2.5 mb-5">
            <div>
              <label className="block text-white/30 text-[11px] font-medium mb-1.5 uppercase tracking-wider">Grade</label>
              <select className="glass-select w-full px-3 py-2.5 text-xs">
                {GRADES.map((g) => <option key={g}>{g}</option>)}
              </select>
            </div>
            {inputs.map((inp) => (
              <div key={inp.id}>
                <label className="block text-white/30 text-[11px] font-medium mb-1.5 uppercase tracking-wider">{inp.label}</label>
                <input type="number" placeholder={inp.ph} step="0.1"
                  value={dims[inp.id] || ""}
                  onChange={(e) => setDims((prev) => ({ ...prev, [inp.id]: e.target.value }))}
                  className="glass-input w-full px-3 py-2.5 text-xs" />
              </div>
            ))}
          </div>

          {/* Calculate button + result */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <button onClick={calcWeight} className="btn-glow px-8 py-3 text-sm">
              Calculate Weight
            </button>

            {result && (
              <div className="flex items-center gap-4 sm:ml-4">
                <div className="bg-white/[0.04] rounded-lg px-5 py-2.5 border border-white/[0.06] text-center">
                  <div className="text-white/30 text-[10px] uppercase tracking-wider">Weight</div>
                  <div className="text-2xl font-bold text-white">{result.weight.toFixed(2)} <span className="text-white/30 text-sm">kg</span></div>
                </div>
                <div className="bg-white/[0.04] rounded-lg px-5 py-2.5 border border-white/[0.06] text-center">
                  <div className="text-white/30 text-[10px] uppercase tracking-wider">Volume</div>
                  <div className="text-2xl font-bold text-white">{Math.round(result.volume).toLocaleString()} <span className="text-white/30 text-sm">cm³</span></div>
                </div>
                <div className="text-[10px] text-white/20 hidden sm:block">Density: 7.85 g/cm³</div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ── Yield Calculator (1/3) ── */}
      <div className="lg:col-span-1 glass-panel glass-panel-hover overflow-hidden">
        <div className="p-5 sm:p-6 h-full flex flex-col">
          <h3 className="text-white font-bold text-base mb-1">Yield Calculator</h3>
          <p className="text-white/25 text-xs mb-5">Processing efficiency & waste analysis</p>

          <div className="space-y-3.5 flex-1">
            <div>
              <label className="block text-white/30 text-[11px] font-medium mb-1.5 uppercase tracking-wider">Input Weight (kg)</label>
              <input type="number" placeholder="e.g. 1000" value={inputWt}
                onChange={(e) => { setInputWt(e.target.value); setYieldPct(null); }}
                className="glass-input w-full px-3 py-2.5 text-xs" />
            </div>
            <div>
              <label className="block text-white/30 text-[11px] font-medium mb-1.5 uppercase tracking-wider">Finished Product Weight (kg)</label>
              <input type="number" placeholder="e.g. 920" value={outputWt}
                onChange={(e) => { setOutputWt(e.target.value); setYieldPct(null); }}
                className="glass-input w-full px-3 py-2.5 text-xs" />
            </div>

            <button onClick={calcYield} className="btn-glow w-full py-3 text-sm">
              Calculate Yield
            </button>

            {yieldPct !== null && (
              <div className="bg-white/[0.03] rounded-lg p-4 border border-white/[0.05]">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-white/35 text-xs">Yield</span>
                  <span className={`text-2xl font-bold ${yieldPct >= 90 ? "text-green-up" : yieldPct >= 80 ? "text-warn" : "text-red-down"}`}>
                    {yieldPct.toFixed(1)}%
                  </span>
                </div>
                <div className="h-2 bg-white/[0.05] rounded-full overflow-hidden mb-2">
                  <div className={`h-full rounded-full transition-all duration-500 ${yieldPct >= 90 ? "bg-green-up" : yieldPct >= 80 ? "bg-warn" : "bg-red-down"}`}
                    style={{ width: `${yieldPct}%` }} />
                </div>
                <div className="flex justify-between text-[11px]">
                  <span className="text-white/25">Usable: {parseFloat(outputWt).toFixed(0)} kg</span>
                  <span className="text-red-down/70">Waste: {(parseFloat(inputWt) - parseFloat(outputWt)).toFixed(0)} kg ({(100 - yieldPct).toFixed(1)}%)</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
