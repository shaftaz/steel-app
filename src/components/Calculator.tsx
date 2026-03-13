"use client";

import { useState } from "react";
import {
  ProductType,
  CalculationResult,
  calculateSteelWeight,
} from "@/lib/calculator";

const PRODUCT_TYPES: { type: ProductType; icon: string; name: string }[] = [
  { type: "round", icon: "●", name: "Round Bar" },
  { type: "square", icon: "■", name: "Square Bar" },
  { type: "rectangular", icon: "▭", name: "Rectangular" },
  { type: "sheet", icon: "⬜", name: "Sheet / Plate" },
];

interface InputConfig {
  id: string;
  label: string;
  placeholder: string;
}

const INPUT_CONFIGS: Record<ProductType, InputConfig[]> = {
  round: [
    { id: "diameter", label: "Diameter (mm)", placeholder: "e.g. 12" },
    { id: "length", label: "Length (m)", placeholder: "e.g. 6" },
  ],
  square: [
    { id: "side", label: "Side (mm)", placeholder: "e.g. 25" },
    { id: "length", label: "Length (m)", placeholder: "e.g. 6" },
  ],
  rectangular: [
    { id: "width", label: "Width (mm)", placeholder: "e.g. 50" },
    { id: "height", label: "Height (mm)", placeholder: "e.g. 25" },
    { id: "length", label: "Length (m)", placeholder: "e.g. 6" },
  ],
  sheet: [
    { id: "length", label: "Length (mm)", placeholder: "e.g. 2000" },
    { id: "width", label: "Width (mm)", placeholder: "e.g. 1000" },
    { id: "thickness", label: "Thickness (mm)", placeholder: "e.g. 10" },
  ],
};

export default function Calculator() {
  const [currentType, setCurrentType] = useState<ProductType>("round");
  const [dimensions, setDimensions] = useState<Record<string, string>>({});
  const [result, setResult] = useState<CalculationResult | null>(null);

  function handleTypeChange(type: ProductType) {
    setCurrentType(type);
    setDimensions({});
    setResult(null);
  }

  function handleInputChange(id: string, value: string) {
    setDimensions((prev) => ({ ...prev, [id]: value }));
  }

  function handleCalculate() {
    const numericDimensions: Record<string, number> = {};
    for (const [key, value] of Object.entries(dimensions)) {
      numericDimensions[key] = parseFloat(value);
    }
    const calcResult = calculateSteelWeight(currentType, numericDimensions);
    if (calcResult) {
      setResult(calcResult);
    } else {
      alert("Please enter valid dimensions for all fields.");
    }
  }

  function shareWhatsApp() {
    if (!result) return;
    const message = `Steel Weight Calculation Result:\nWeight: ${result.weight.toFixed(2)} kg\nVolume: ${Math.round(result.volume).toLocaleString()} cm³\nCalculated using SteelMath Calculator`;
    window.open(`https://wa.me/?text=${encodeURIComponent(message)}`, "_blank");
  }

  function downloadResults() {
    if (!result) return;
    const content = `Steel Weight Calculation Results\n\nWeight: ${result.weight.toFixed(2)} kg\nVolume: ${Math.round(result.volume).toLocaleString()} cm³\nDensity: 7.85 g/cm³\n\nCalculated using SteelMath Calculator\nDeveloped by MetalX`;
    const blob = new Blob([content], { type: "text/plain" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "steel-weight-calculation.txt";
    a.click();
    window.URL.revokeObjectURL(url);
  }

  function printResults() {
    if (!result) return;
    const printWindow = window.open("", "_blank");
    if (!printWindow) return;
    printWindow.document.write(`<html><head><title>Steel Weight Results</title><style>body{font-family:Arial,sans-serif;padding:2rem}.header{text-align:center;margin-bottom:2rem}.results{background:#f8f9fa;padding:1rem;border-radius:8px}</style></head><body><div class="header"><h1>Steel Weight Calculation Results</h1></div><div class="results"><p><strong>Weight:</strong> ${result.weight.toFixed(2)} kg</p><p><strong>Volume:</strong> ${Math.round(result.volume).toLocaleString()} cm³</p><p><em>Density: 7.85 g/cm³</em></p></div><p style="text-align:center;margin-top:2rem">Calculated using <strong>SteelMath</strong> | Developed by <strong>MetalX</strong></p></body></html>`);
    printWindow.document.close();
    printWindow.print();
  }

  const inputs = INPUT_CONFIGS[currentType];

  return (
    <div className="glass-panel overflow-hidden">
      <div className="px-5 pt-5 pb-4 sm:px-6 sm:pt-6">
        <h2 className="text-lg font-bold text-white mb-0.5">Steel Weight Calculator</h2>
        <p className="text-white/25 text-xs">Select product type and enter dimensions</p>
      </div>

      <div className="px-5 pb-5 sm:px-6 sm:pb-6">
        {/* Product type selector */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-5">
          {PRODUCT_TYPES.map((product) => (
            <button
              key={product.type}
              onClick={() => handleTypeChange(product.type)}
              className={`rounded-lg p-3 cursor-pointer text-center transition-all duration-200 ${
                currentType === product.type
                  ? "bg-accent/15 border border-accent/25 text-accent"
                  : "bg-white/[0.03] border border-white/[0.06] text-white/40 hover:bg-white/[0.06] hover:text-white/60"
              }`}
            >
              <span className="text-xl block mb-1">{product.icon}</span>
              <div className="font-medium text-[10px]">{product.name}</div>
            </button>
          ))}
        </div>

        {/* Dimension inputs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
          {inputs.map((input) => (
            <div key={input.id}>
              <label htmlFor={input.id} className="block text-white/30 text-[10px] font-medium mb-1.5 uppercase tracking-wider">
                {input.label}
              </label>
              <input
                type="number"
                id={input.id}
                placeholder={input.placeholder}
                step="0.1"
                value={dimensions[input.id] || ""}
                onChange={(e) => handleInputChange(input.id, e.target.value)}
                className="glass-input w-full px-3 py-2.5 text-xs"
              />
            </div>
          ))}
        </div>

        <button onClick={handleCalculate}
          className="btn-glow w-full py-3 text-xs mb-5">
          Calculate Weight
        </button>

        {/* Results */}
        {result && (
          <div className="bg-white/[0.03] rounded-xl p-5 border border-white/[0.06]">
            <div className="grid grid-cols-2 gap-3 mb-3">
              <div className="bg-white/[0.04] rounded-lg p-3 text-center border border-white/[0.05]">
                <div className="text-white/25 text-[9px] uppercase tracking-wider mb-1">Weight</div>
                <div className="text-xl font-bold text-white">
                  {result.weight.toFixed(2)}<span className="text-white/30 text-xs ml-1">kg</span>
                </div>
              </div>
              <div className="bg-white/[0.04] rounded-lg p-3 text-center border border-white/[0.05]">
                <div className="text-white/25 text-[9px] uppercase tracking-wider mb-1">Volume</div>
                <div className="text-xl font-bold text-white">
                  {Math.round(result.volume).toLocaleString()}<span className="text-white/30 text-xs ml-1">cm³</span>
                </div>
              </div>
            </div>
            <div className="text-[9px] text-white/15 mb-4">Mild steel density: 7.85 g/cm³</div>

            <div className="flex flex-col sm:flex-row gap-2">
              <button onClick={shareWhatsApp}
                className="flex-1 py-2 px-3 rounded-lg text-[10px] font-medium cursor-pointer transition-all bg-[#25d366]/15 border border-[#25d366]/20 text-[#25d366] hover:bg-[#25d366]/25">
                WhatsApp
              </button>
              <button onClick={downloadResults}
                className="flex-1 py-2 px-3 rounded-lg text-[10px] font-medium cursor-pointer transition-all bg-white/[0.04] border border-white/[0.06] text-white/50 hover:bg-white/[0.08]">
                Download
              </button>
              <button onClick={printResults}
                className="flex-1 py-2 px-3 rounded-lg text-[10px] font-medium cursor-pointer transition-all bg-white/[0.04] border border-white/[0.06] text-white/50 hover:bg-white/[0.08]">
                Print
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
