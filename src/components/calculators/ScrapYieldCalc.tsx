"use client";

import { useState } from "react";

const MATERIALS = [
  { value: "hms1", label: "HMS 1" },
  { value: "hms2", label: "HMS 2" },
  { value: "hms8020", label: "HMS 80:20 Blend" },
  { value: "shredded", label: "Shredded" },
  { value: "busheling", label: "#1 Busheling" },
  { value: "plate", label: "Plate & Structural" },
  { value: "turnings_loose", label: "Turnings (Loose)" },
  { value: "turnings_briq", label: "Turnings (Briquetted)" },
  { value: "cast_iron", label: "Cast Iron" },
  { value: "sponge_iron", label: "Sponge Iron (DRI)" },
  { value: "pig_iron", label: "Pig Iron" },
  { value: "returns", label: "In-House Returns" },
];

const YIELD_RATES: Record<string, Record<string, { low: number; mid: number; high: number }>> = {
  induction_furnace: {
    hms1: { low: 90, mid: 91.5, high: 93 },
    hms2: { low: 88, mid: 89.5, high: 91 },
    hms8020: { low: 89.6, mid: 91.1, high: 92.6 },
    shredded: { low: 91, mid: 92, high: 93 },
    busheling: { low: 92, mid: 93.5, high: 95 },
    plate: { low: 91, mid: 92.5, high: 94 },
    turnings_loose: { low: 82, mid: 84.5, high: 87 },
    turnings_briq: { low: 85, mid: 87.5, high: 90 },
    cast_iron: { low: 85, mid: 86.5, high: 88 },
    sponge_iron: { low: 82, mid: 85, high: 88 },
    pig_iron: { low: 93, mid: 95, high: 97 },
    returns: { low: 95, mid: 96.5, high: 98 },
  },
  eaf: {
    hms1: { low: 89, mid: 91, high: 93 },
    hms2: { low: 87, mid: 89, high: 91 },
    hms8020: { low: 88.6, mid: 90.6, high: 92.6 },
    shredded: { low: 90, mid: 91.5, high: 93 },
    busheling: { low: 91, mid: 93, high: 95 },
    plate: { low: 90, mid: 92, high: 94 },
    turnings_loose: { low: 80, mid: 83, high: 86 },
    turnings_briq: { low: 84, mid: 86.5, high: 89 },
    cast_iron: { low: 84, mid: 86, high: 88 },
    sponge_iron: { low: 80, mid: 83, high: 86 },
    pig_iron: { low: 92, mid: 94.5, high: 97 },
    returns: { low: 94, mid: 96, high: 98 },
  },
};

interface ChargeRow {
  material: string;
  qty: string;
  price: string;
}

interface YieldResult {
  totalCharge: number;
  weightedYieldMid: number;
  weightedYieldLow: number;
  weightedYieldHigh: number;
  liquidSteelMid: number;
  liquidSteelLow: number;
  liquidSteelHigh: number;
  totalLoss: number;
  slagLoss: number;
  fumesLoss: number;
  materialYields: { label: string; qty: number; mid: number }[];
  totalMaterialCost: number | null;
  effectiveCostPerTonne: number | null;
  electricityCostPerTonne: number | null;
  totalMeltCostPerTonne: number | null;
}

export default function ScrapYieldCalc() {
  const [furnace, setFurnace] = useState<"induction_furnace" | "eaf">("induction_furnace");
  const [rows, setRows] = useState<ChargeRow[]>([{ material: "hms1", qty: "", price: "" }]);
  const [showElectricity, setShowElectricity] = useState(false);
  const [elecRate, setElecRate] = useState("");
  const [elecConsumption, setElecConsumption] = useState("625");
  const [result, setResult] = useState<YieldResult | null>(null);

  const inputClass =
    "w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 text-white text-sm focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/25 transition-colors";

  const fmt = (n: number) =>
    n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  function handleFurnaceToggle(type: "induction_furnace" | "eaf") {
    setFurnace(type);
    setElecConsumption(type === "induction_furnace" ? "625" : "450");
    setResult(null);
  }

  function updateRow(index: number, field: keyof ChargeRow, value: string) {
    setRows((prev) => prev.map((r, i) => (i === index ? { ...r, [field]: value } : r)));
  }

  function addRow() {
    setRows((prev) => [...prev, { material: "hms1", qty: "", price: "" }]);
  }

  function removeRow(index: number) {
    setRows((prev) => prev.filter((_, i) => i !== index));
  }

  function handleCalc() {
    const yieldTable = YIELD_RATES[furnace];
    let totalCharge = 0;
    let weightedSumMid = 0;
    let weightedSumLow = 0;
    let weightedSumHigh = 0;
    let totalCost = 0;
    let hasCost = false;
    const materialYields: YieldResult["materialYields"] = [];

    for (const row of rows) {
      const qty = parseFloat(row.qty) || 0;
      if (qty <= 0) continue;
      const rates = yieldTable[row.material];
      if (!rates) continue;

      totalCharge += qty;
      weightedSumMid += qty * rates.mid;
      weightedSumLow += qty * rates.low;
      weightedSumHigh += qty * rates.high;

      const label = MATERIALS.find((m) => m.value === row.material)?.label || row.material;
      materialYields.push({ label, qty, mid: rates.mid });

      const price = parseFloat(row.price) || 0;
      if (price > 0) {
        totalCost += qty * price;
        hasCost = true;
      }
    }

    if (totalCharge <= 0) return;

    const weightedYieldMid = weightedSumMid / totalCharge;
    const weightedYieldLow = weightedSumLow / totalCharge;
    const weightedYieldHigh = weightedSumHigh / totalCharge;
    const liquidSteelMid = (totalCharge * weightedYieldMid) / 100;
    const liquidSteelLow = (totalCharge * weightedYieldLow) / 100;
    const liquidSteelHigh = (totalCharge * weightedYieldHigh) / 100;
    const totalLoss = totalCharge - liquidSteelMid;
    const slagLoss = totalLoss * 0.65;
    const fumesLoss = totalLoss * 0.35;

    let totalMaterialCost: number | null = null;
    let effectiveCostPerTonne: number | null = null;
    let electricityCostPerTonne: number | null = null;
    let totalMeltCostPerTonne: number | null = null;

    if (hasCost) {
      totalMaterialCost = totalCost;
      effectiveCostPerTonne = totalCost / liquidSteelMid;
    }

    const eRate = parseFloat(elecRate) || 0;
    const eCons = parseFloat(elecConsumption) || 0;
    if (showElectricity && eRate > 0 && eCons > 0) {
      electricityCostPerTonne = eRate * eCons;
      if (effectiveCostPerTonne !== null) {
        totalMeltCostPerTonne = effectiveCostPerTonne + electricityCostPerTonne;
      }
    }

    setResult({
      totalCharge,
      weightedYieldMid,
      weightedYieldLow,
      weightedYieldHigh,
      liquidSteelMid,
      liquidSteelLow,
      liquidSteelHigh,
      totalLoss,
      slagLoss,
      fumesLoss,
      materialYields,
      totalMaterialCost,
      effectiveCostPerTonne,
      electricityCostPerTonne,
      totalMeltCostPerTonne,
    });
  }

  function handleShare() {
    if (!result) return;

    let text = `*Scrap Yield Calculator*\n`;
    text += `Furnace: ${furnace === "induction_furnace" ? "Induction Furnace" : "Electric Arc Furnace"}\n\n`;
    text += `*Charge Mix:*\n`;
    for (const m of result.materialYields) {
      text += `- ${m.label}: ${fmt(m.qty)} MT (Yield: ${m.mid.toFixed(1)}%)\n`;
    }
    text += `\n*Results:*\n`;
    text += `Total Charge: ${fmt(result.totalCharge)} MT\n`;
    text += `Weighted Avg Yield: ${result.weightedYieldMid.toFixed(1)}%\n`;
    text += `Expected Liquid Steel: ${fmt(result.liquidSteelMid)} MT\n`;
    text += `Yield Range: ${fmt(result.liquidSteelLow)} - ${fmt(result.liquidSteelHigh)} MT\n`;
    text += `Process Losses: ${fmt(result.totalLoss)} MT\n`;

    if (result.totalMaterialCost !== null) {
      text += `\n*Cost Analysis:*\n`;
      text += `Total Material Cost: ${fmt(result.totalMaterialCost)}\n`;
      text += `Cost/Tonne Liquid Steel: ${fmt(result.effectiveCostPerTonne!)}\n`;
    }
    if (result.electricityCostPerTonne !== null) {
      text += `Electricity Cost/Tonne: ${fmt(result.electricityCostPerTonne)}\n`;
    }
    if (result.totalMeltCostPerTonne !== null) {
      text += `Total Melt Cost/Tonne: ${fmt(result.totalMeltCostPerTonne)}\n`;
    }

    const url = `https://wa.me/?text=${encodeURIComponent(text)}`;
    window.open(url, "_blank");
  }

  return (
    <div className="glass-panel p-5 sm:p-6">
      {/* Furnace Type Toggle */}
      <div className="mb-5">
        <label className="block text-white/40 text-xs mb-1.5">Furnace Type</label>
        <div className="flex gap-2">
          <button
            onClick={() => handleFurnaceToggle("induction_furnace")}
            className={`flex-1 px-4 py-2.5 rounded-lg border text-sm font-medium transition-colors ${
              furnace === "induction_furnace"
                ? "bg-accent/20 border-accent/40 text-accent"
                : "bg-white/5 border-white/10 text-white/60 hover:text-white/80"
            }`}
          >
            Induction Furnace (IF)
          </button>
          <button
            onClick={() => handleFurnaceToggle("eaf")}
            className={`flex-1 px-4 py-2.5 rounded-lg border text-sm font-medium transition-colors ${
              furnace === "eaf"
                ? "bg-accent/20 border-accent/40 text-accent"
                : "bg-white/5 border-white/10 text-white/60 hover:text-white/80"
            }`}
          >
            Electric Arc Furnace (EAF)
          </button>
        </div>
      </div>

      {/* Charge Mix Builder */}
      <div className="mb-5">
        <label className="block text-white/40 text-xs mb-1.5">Charge Mix</label>
        <div className="space-y-3">
          {rows.map((row, i) => (
            <div key={i} className="grid grid-cols-[1fr_0.6fr_0.8fr_auto] gap-2 items-end">
              <div>
                {i === 0 && <div className="text-white/30 text-[10px] mb-1">Material</div>}
                <select
                  className={inputClass}
                  value={row.material}
                  onChange={(e) => updateRow(i, "material", e.target.value)}
                >
                  {MATERIALS.map((m) => (
                    <option key={m.value} value={m.value} className="bg-[#0d1929]">
                      {m.label}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                {i === 0 && <div className="text-white/30 text-[10px] mb-1">Qty (MT)</div>}
                <input
                  type="number"
                  className={inputClass}
                  placeholder="MT"
                  value={row.qty}
                  onChange={(e) => updateRow(i, "qty", e.target.value)}
                />
              </div>
              <div>
                {i === 0 && <div className="text-white/30 text-[10px] mb-1">Price/MT</div>}
                <input
                  type="number"
                  className={inputClass}
                  placeholder="Optional - for cost analysis"
                  value={row.price}
                  onChange={(e) => updateRow(i, "price", e.target.value)}
                />
              </div>
              <div>
                {i === 0 && <div className="text-white/30 text-[10px] mb-1">&nbsp;</div>}
                <button
                  onClick={() => removeRow(i)}
                  disabled={rows.length <= 1}
                  className="p-2.5 rounded-lg border border-white/10 text-red-400/60 hover:text-red-400 hover:border-red-400/30 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path
                      fillRule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
        <button
          onClick={addRow}
          className="mt-3 text-accent/70 hover:text-accent text-sm transition-colors"
        >
          + Add Material
        </button>
      </div>

      {/* Electricity Section */}
      <div className="mb-5">
        {!showElectricity ? (
          <button
            onClick={() => setShowElectricity(true)}
            className="text-accent/60 hover:text-accent text-sm transition-colors"
          >
            + Add Electricity Cost
          </button>
        ) : (
          <div className="rounded-lg bg-white/[0.02] border border-white/10 p-4">
            <div className="flex items-center justify-between mb-3">
              <span className="text-white/40 text-xs">Electricity Cost</span>
              <button
                onClick={() => setShowElectricity(false)}
                className="text-white/30 hover:text-white/60 text-xs transition-colors"
              >
                Remove
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-white/40 text-xs mb-1.5">Rate (per kWh)</label>
                <input
                  type="number"
                  className={inputClass}
                  placeholder="e.g. 8"
                  value={elecRate}
                  onChange={(e) => setElecRate(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-white/40 text-xs mb-1.5">Consumption (kWh/t)</label>
                <input
                  type="number"
                  className={inputClass}
                  value={elecConsumption}
                  onChange={(e) => setElecConsumption(e.target.value)}
                />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Calculate Button */}
      <button onClick={handleCalc} className="btn-glow px-6 py-2.5 text-sm w-full sm:w-auto">
        Calculate Yield
      </button>

      {/* Results */}
      {result && (
        <div className="mt-5 space-y-4">
          {/* Yield Analysis */}
          <div className="p-4 rounded-lg bg-accent/5 border border-accent/20">
            <h3 className="text-white/60 text-xs uppercase tracking-wider mb-4">Yield Analysis</h3>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-4">
              <div>
                <div className="text-white/40 text-xs">Total Charge Weight</div>
                <div className="text-accent font-mono font-semibold text-lg">{fmt(result.totalCharge)} MT</div>
              </div>
              <div>
                <div className="text-white/40 text-xs">Weighted Avg Yield</div>
                <div className="text-white font-mono font-semibold">{result.weightedYieldMid.toFixed(1)}%</div>
              </div>
              <div className="col-span-2 sm:col-span-1">
                <div className="text-white/40 text-xs">Expected Liquid Steel</div>
                <div className="text-2xl text-accent font-bold font-mono">{fmt(result.liquidSteelMid)} MT</div>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-4">
              <div>
                <div className="text-white/40 text-xs">Yield Range</div>
                <div className="text-white/70 font-mono text-sm">
                  {fmt(result.liquidSteelLow)} &ndash; {fmt(result.liquidSteelHigh)} MT
                </div>
                <div className="text-white/30 text-[10px] font-mono">
                  ({result.weightedYieldLow.toFixed(1)}% &ndash; {result.weightedYieldHigh.toFixed(1)}%)
                </div>
              </div>
            </div>

            {/* Process Losses */}
            <div className="border-t border-white/10 pt-3 mb-4">
              <div className="text-white/40 text-xs mb-2">Process Losses</div>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <div className="text-white/30 text-[10px]">Total Loss</div>
                  <div className="text-white/70 font-mono text-sm">{fmt(result.totalLoss)} MT</div>
                </div>
                <div>
                  <div className="text-white/30 text-[10px]">Slag (est. 65%)</div>
                  <div className="text-white/70 font-mono text-sm">{fmt(result.slagLoss)} MT</div>
                </div>
                <div>
                  <div className="text-white/30 text-[10px]">Fumes &amp; Oxidation (35%)</div>
                  <div className="text-white/70 font-mono text-sm">{fmt(result.fumesLoss)} MT</div>
                </div>
              </div>
            </div>

            {/* Material Yield Bars */}
            <div className="border-t border-white/10 pt-3">
              <div className="text-white/40 text-xs mb-3">Individual Material Yields</div>
              <div className="space-y-2">
                {result.materialYields.map((m, i) => (
                  <div key={i}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-white/60 text-xs">{m.label} ({fmt(m.qty)} MT)</span>
                      <span className="text-white font-mono text-xs">{m.mid.toFixed(1)}%</span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-white/5 overflow-hidden">
                      <div
                        className="h-full rounded-full bg-accent/30"
                        style={{ width: `${m.mid}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Cost Analysis (only if any price entered) */}
          {result.totalMaterialCost !== null && (
            <div className="p-4 rounded-lg bg-accent/5 border border-accent/20">
              <h3 className="text-white/60 text-xs uppercase tracking-wider mb-4">Cost Analysis</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                <div>
                  <div className="text-white/40 text-xs">Total Material Cost</div>
                  <div className="text-white font-mono font-semibold">{fmt(result.totalMaterialCost)}</div>
                </div>
                <div>
                  <div className="text-white/40 text-xs">Cost/Tonne Liquid Steel</div>
                  <div className="text-accent font-mono font-semibold">{fmt(result.effectiveCostPerTonne!)}</div>
                </div>
                {result.electricityCostPerTonne !== null && (
                  <div>
                    <div className="text-white/40 text-xs">Electricity Cost/Tonne</div>
                    <div className="text-white/70 font-mono">{fmt(result.electricityCostPerTonne)}</div>
                  </div>
                )}
                {result.totalMeltCostPerTonne !== null && (
                  <div>
                    <div className="text-white/40 text-xs">Total Melt Cost/Tonne</div>
                    <div className="text-accent font-mono font-bold text-lg">{fmt(result.totalMeltCostPerTonne)}</div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Electricity cost shown even without material cost */}
          {result.totalMaterialCost === null && result.electricityCostPerTonne !== null && (
            <div className="p-4 rounded-lg bg-accent/5 border border-accent/20">
              <h3 className="text-white/60 text-xs uppercase tracking-wider mb-4">Electricity Cost</h3>
              <div>
                <div className="text-white/40 text-xs">Electricity Cost/Tonne</div>
                <div className="text-white/70 font-mono">{fmt(result.electricityCostPerTonne)}</div>
              </div>
            </div>
          )}

          {/* WhatsApp Share */}
          <button
            onClick={handleShare}
            className="w-full sm:w-auto px-6 py-2.5 rounded-lg text-sm font-medium text-white transition-colors"
            style={{ backgroundColor: "#25D366" }}
          >
            Share via WhatsApp
          </button>
        </div>
      )}
    </div>
  );
}
