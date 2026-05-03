"use client";

import { useState } from "react";
import { GAUGE_TABLE } from "@/lib/calculators/materials";

export default function GaugeToMmCalc() {
  const [gauge, setGauge] = useState("");
  const [result, setResult] = useState<(typeof GAUGE_TABLE)[number] | null>(null);

  function handleLookup() {
    const g = parseInt(gauge, 10);
    const entry = GAUGE_TABLE.find((e) => e.gauge === g);
    setResult(entry || null);
  }

  const inputClass =
    "w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 text-white text-sm focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/25 transition-colors";

  return (
    <div className="glass-panel p-5 sm:p-6">
      <div className="flex flex-col sm:flex-row gap-4 mb-5">
        <div className="flex-1">
          <label className="block text-white/40 text-xs mb-1.5">
            Enter Gauge Number (7–30)
          </label>
          <input
            type="number"
            className={inputClass}
            placeholder="e.g. 18"
            min={7}
            max={30}
            value={gauge}
            onChange={(e) => setGauge(e.target.value)}
          />
        </div>
        <div className="flex items-end">
          <button onClick={handleLookup} className="btn-glow px-6 py-2.5 text-sm w-full sm:w-auto">
            Convert
          </button>
        </div>
      </div>

      {result && (
        <div className="p-4 rounded-lg bg-accent/5 border border-accent/20">
          <div className="text-accent text-2xl font-bold">
            Gauge {result.gauge} = {result.mm} mm
          </div>
          <div className="text-white/30 text-xs mt-1">
            {result.inches}&Prime; &middot; {result.kgPerSqm} kg/m&sup2; (MS)
          </div>
        </div>
      )}
      {gauge && !result && (
        <div className="p-4 rounded-lg bg-red-500/5 border border-red-500/20 text-red-400 text-sm">
          Gauge number not found. Enter a value between 7 and 30.
        </div>
      )}
    </div>
  );
}
