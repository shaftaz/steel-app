"use client";

import { useState } from "react";
import { REBAR_SIZES } from "@/lib/calculators/materials";

interface RebarResult {
  diameter: number;
  kgPerMetre: number;
  totalLength: number;
  totalWeight: number;
  numberOfBars: number;
  barsNeeded: number;
}

export default function RebarCalc() {
  const [sizeIdx, setSizeIdx] = useState(3); // default 12mm
  const [barLength, setBarLength] = useState("12");
  const [totalLengthNeeded, setTotalLengthNeeded] = useState("");
  const [result, setResult] = useState<RebarResult | null>(null);

  function handleCalc() {
    const size = REBAR_SIZES[sizeIdx];
    const bl = parseFloat(barLength) || 12;
    const tl = parseFloat(totalLengthNeeded) || 0;
    if (tl <= 0) return;

    const totalWeight = tl * size.kgPerMetre;
    const barsNeeded = Math.ceil(tl / bl);

    setResult({
      diameter: size.diameter,
      kgPerMetre: size.kgPerMetre,
      totalLength: tl,
      totalWeight,
      numberOfBars: barsNeeded,
      barsNeeded,
    });
  }

  const inputClass =
    "w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 text-white text-sm focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/25 transition-colors";

  return (
    <div className="glass-panel p-5 sm:p-6">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-5">
        <div>
          <label className="block text-white/40 text-xs mb-1.5">Bar Diameter</label>
          <select
            className={inputClass}
            value={sizeIdx}
            onChange={(e) => setSizeIdx(Number(e.target.value))}
          >
            {REBAR_SIZES.map((s, i) => (
              <option key={s.diameter} value={i} className="bg-[#0d1929]">
                {s.diameter}mm ({s.kgPerMetre} kg/m)
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-white/40 text-xs mb-1.5">Standard Bar Length (m)</label>
          <input
            type="number"
            className={inputClass}
            placeholder="12"
            value={barLength}
            onChange={(e) => setBarLength(e.target.value)}
          />
        </div>
        <div>
          <label className="block text-white/40 text-xs mb-1.5">Total Length Needed (m)</label>
          <input
            type="number"
            className={inputClass}
            placeholder="e.g. 500"
            value={totalLengthNeeded}
            onChange={(e) => setTotalLengthNeeded(e.target.value)}
          />
        </div>
      </div>

      <button onClick={handleCalc} className="btn-glow px-6 py-2.5 text-sm w-full sm:w-auto">
        Calculate
      </button>

      {result && (
        <div className="mt-5 p-4 rounded-lg bg-accent/5 border border-accent/20">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div>
              <div className="text-white/40 text-xs">Bar Size</div>
              <div className="text-white font-semibold">{result.diameter}mm TMT</div>
            </div>
            <div>
              <div className="text-white/40 text-xs">Total Weight</div>
              <div className="text-accent font-mono font-bold text-lg">
                {result.totalWeight.toFixed(2)} kg
              </div>
            </div>
            <div>
              <div className="text-white/40 text-xs">Bars Needed</div>
              <div className="text-white font-mono font-semibold">{result.barsNeeded} bars</div>
            </div>
            <div>
              <div className="text-white/40 text-xs">Weight in Tonnes</div>
              <div className="text-white/70 font-mono">{(result.totalWeight / 1000).toFixed(3)} T</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
