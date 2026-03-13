"use client";

import { useState } from "react";

export default function YieldWidget() {
  const [inputWt, setInputWt] = useState("");
  const [outputWt, setOutputWt] = useState("");
  const [yieldPct, setYieldPct] = useState<number | null>(null);

  function calculate() {
    const i = parseFloat(inputWt);
    const o = parseFloat(outputWt);
    if (i > 0 && o > 0 && o <= i) setYieldPct((o / i) * 100);
  }

  return (
    <div className="h-full flex flex-col">
      <div className="widget-header">
        <h2 className="text-white font-bold text-xs tracking-tight">Yield Calculator</h2>
      </div>

      <div className="flex-1 px-3 pb-3 flex flex-col gap-2">
        <div className="grid grid-cols-2 gap-1.5">
          <div className="relative">
            <input type="number" placeholder="Input kg" value={inputWt}
              onChange={(e) => { setInputWt(e.target.value); setYieldPct(null); }}
              className="glass-input w-full px-2 py-1.5 text-[10px] pr-7" />
            <span className="absolute right-2 top-1/2 -translate-y-1/2 text-[8px] text-white/15">kg</span>
          </div>
          <div className="relative">
            <input type="number" placeholder="Output kg" value={outputWt}
              onChange={(e) => { setOutputWt(e.target.value); setYieldPct(null); }}
              className="glass-input w-full px-2 py-1.5 text-[10px] pr-7" />
            <span className="absolute right-2 top-1/2 -translate-y-1/2 text-[8px] text-white/15">kg</span>
          </div>
        </div>

        <div className="flex items-center gap-2 mt-auto">
          <button onClick={calculate} className="btn-glow flex-1 py-2 text-[10px]">CALCULATE</button>
          {yieldPct !== null && (
            <div className="text-right shrink-0">
              <span className={`text-xl font-bold ${yieldPct >= 90 ? "text-green-up" : yieldPct >= 80 ? "text-warn" : "text-red-down"}`}>
                {yieldPct.toFixed(1)}%
              </span>
            </div>
          )}
        </div>

        {yieldPct !== null && (
          <div className="bg-white/[0.03] rounded-lg p-2 border border-white/[0.04]">
            <div className="flex justify-between text-[9px]">
              <span className="text-white/25">Waste</span>
              <span className="text-red-down font-semibold">{(parseFloat(inputWt) - parseFloat(outputWt)).toFixed(1)} kg ({(100 - yieldPct).toFixed(1)}%)</span>
            </div>
            <div className="mt-1.5 h-1 bg-white/[0.05] rounded-full overflow-hidden">
              <div className={`h-full rounded-full transition-all duration-500 ${yieldPct >= 90 ? "bg-green-up" : yieldPct >= 80 ? "bg-warn" : "bg-red-down"}`}
                style={{ width: `${yieldPct}%` }} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
