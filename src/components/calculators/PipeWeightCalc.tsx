"use client";

import { useState } from "react";
import { pipes } from "@/lib/data/section-weights";

export default function PipeWeightCalc() {
  const [selectedNB, setSelectedNB] = useState(50);
  const [customOD, setCustomOD] = useState("");
  const [customWT, setCustomWT] = useState("");
  const [length, setLength] = useState("6");
  const [quantity, setQuantity] = useState("1");
  const [useCustom, setUseCustom] = useState(false);

  const selectedPipe = pipes.find((p) => p.nbSize === selectedNB);

  let weightPerMetre = selectedPipe?.weightPerMetre || 0;
  if (useCustom && customOD && customWT) {
    const od = parseFloat(customOD);
    const wt = parseFloat(customWT);
    if (od > 0 && wt > 0 && wt < od / 2) {
      weightPerMetre = (od - wt) * wt * 0.02466;
    }
  }

  const l = parseFloat(length) || 0;
  const q = parseInt(quantity) || 1;
  const totalWeight = weightPerMetre * l * q;

  return (
    <div className="glass-panel p-5 sm:p-6">
      <div className="flex items-center gap-3 mb-5">
        <button
          onClick={() => setUseCustom(false)}
          className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all cursor-pointer ${!useCustom ? "bg-accent/20 text-accent border border-accent/30" : "text-white/40 border border-white/10 hover:border-white/20"}`}
        >
          Standard NB Size
        </button>
        <button
          onClick={() => setUseCustom(true)}
          className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all cursor-pointer ${useCustom ? "bg-accent/20 text-accent border border-accent/30" : "text-white/40 border border-white/10 hover:border-white/20"}`}
        >
          Custom OD &times; WT
        </button>
      </div>

      {!useCustom ? (
        <div className="mb-4">
          <label className="block text-white/40 text-xs mb-1.5">Nominal Bore Size</label>
          <div className="flex flex-wrap gap-2">
            {pipes.map((p) => (
              <button
                key={p.nbSize}
                onClick={() => setSelectedNB(p.nbSize)}
                className={`px-3 py-1.5 rounded-md text-xs font-mono transition-all cursor-pointer ${selectedNB === p.nbSize ? "bg-accent/20 text-accent border border-accent/30" : "text-white/50 border border-white/10 hover:border-white/20"}`}
              >
                {p.nbSize}mm ({p.nbInch})
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-white/40 text-xs mb-1.5">Outer Diameter (mm)</label>
            <input
              type="number"
              value={customOD}
              onChange={(e) => setCustomOD(e.target.value)}
              placeholder="e.g. 60.3"
              className="w-full bg-white/[0.04] border border-white/10 rounded-lg px-3 py-2.5 text-white text-sm focus:outline-none focus:border-accent/50"
            />
          </div>
          <div>
            <label className="block text-white/40 text-xs mb-1.5">Wall Thickness (mm)</label>
            <input
              type="number"
              value={customWT}
              onChange={(e) => setCustomWT(e.target.value)}
              placeholder="e.g. 3.6"
              className="w-full bg-white/[0.04] border border-white/10 rounded-lg px-3 py-2.5 text-white text-sm focus:outline-none focus:border-accent/50"
            />
          </div>
        </div>
      )}

      <div className="grid grid-cols-2 gap-4 mb-5">
        <div>
          <label className="block text-white/40 text-xs mb-1.5">Length (metres)</label>
          <input type="number" value={length} onChange={(e) => setLength(e.target.value)}
            className="w-full bg-white/[0.04] border border-white/10 rounded-lg px-3 py-2.5 text-white text-sm focus:outline-none focus:border-accent/50" />
        </div>
        <div>
          <label className="block text-white/40 text-xs mb-1.5">Quantity (pieces)</label>
          <input type="number" value={quantity} onChange={(e) => setQuantity(e.target.value)}
            className="w-full bg-white/[0.04] border border-white/10 rounded-lg px-3 py-2.5 text-white text-sm focus:outline-none focus:border-accent/50" />
        </div>
      </div>

      <div className="glass-panel p-4 grid grid-cols-3 gap-4 text-center">
        <div>
          <div className="text-white/30 text-[10px] uppercase tracking-wider mb-1">Weight/m</div>
          <div className="text-accent font-bold text-lg font-mono">{weightPerMetre.toFixed(2)}</div>
          <div className="text-white/20 text-[10px]">kg/m</div>
        </div>
        <div>
          <div className="text-white/30 text-[10px] uppercase tracking-wider mb-1">Per Piece</div>
          <div className="text-white font-bold text-lg font-mono">{(weightPerMetre * l).toFixed(2)}</div>
          <div className="text-white/20 text-[10px]">kg</div>
        </div>
        <div>
          <div className="text-white/30 text-[10px] uppercase tracking-wider mb-1">Total</div>
          <div className="text-white font-bold text-lg font-mono">{totalWeight.toFixed(2)}</div>
          <div className="text-white/20 text-[10px]">kg ({(totalWeight / 1000).toFixed(3)} MT)</div>
        </div>
      </div>

      {!useCustom && selectedPipe && (
        <div className="mt-3 text-white/20 text-[10px] text-center">
          OD: {selectedPipe.od}mm | WT: {selectedPipe.wallThickness}mm | Formula: (OD − WT) × WT × 0.02466
        </div>
      )}
    </div>
  );
}
