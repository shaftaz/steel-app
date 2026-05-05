"use client";

import { useState } from "react";

export default function ChequeredPlateWeightCalc() {
  const [thickness, setThickness] = useState("6");
  const [length, setLength] = useState("1500");
  const [width, setWidth] = useState("6000");
  const [quantity, setQuantity] = useState("1");

  const t = parseFloat(thickness) || 0;
  const l = parseFloat(length) || 0;
  const w = parseFloat(width) || 0;
  const q = parseInt(quantity) || 1;

  const weightPerSqm = t * 7.85 * 1.05;
  const areaSqm = (l * w) / 1000000;
  const weightPerPiece = weightPerSqm * areaSqm;
  const totalWeight = weightPerPiece * q;

  const commonThicknesses = [3, 4, 5, 6, 8, 10, 12, 14, 16, 20, 25];

  return (
    <div className="glass-panel p-5 sm:p-6">
      <div className="mb-4">
        <label className="block text-white/40 text-xs mb-1.5">Thickness — Quick Select</label>
        <div className="flex flex-wrap gap-2">
          {commonThicknesses.map((th) => (
            <button
              key={th}
              onClick={() => setThickness(String(th))}
              className={`px-3 py-1.5 rounded-md text-xs font-mono transition-all cursor-pointer ${t === th ? "bg-accent/20 text-accent border border-accent/30" : "text-white/50 border border-white/10 hover:border-white/20"}`}
            >
              {th}mm
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-5">
        <div>
          <label className="block text-white/40 text-xs mb-1.5">Thickness (mm)</label>
          <input type="number" value={thickness} onChange={(e) => setThickness(e.target.value)}
            className="w-full bg-white/[0.04] border border-white/10 rounded-lg px-3 py-2.5 text-white text-sm focus:outline-none focus:border-accent/50" />
        </div>
        <div>
          <label className="block text-white/40 text-xs mb-1.5">Length (mm)</label>
          <input type="number" value={length} onChange={(e) => setLength(e.target.value)}
            className="w-full bg-white/[0.04] border border-white/10 rounded-lg px-3 py-2.5 text-white text-sm focus:outline-none focus:border-accent/50" />
        </div>
        <div>
          <label className="block text-white/40 text-xs mb-1.5">Width (mm)</label>
          <input type="number" value={width} onChange={(e) => setWidth(e.target.value)}
            className="w-full bg-white/[0.04] border border-white/10 rounded-lg px-3 py-2.5 text-white text-sm focus:outline-none focus:border-accent/50" />
        </div>
        <div>
          <label className="block text-white/40 text-xs mb-1.5">Quantity</label>
          <input type="number" value={quantity} onChange={(e) => setQuantity(e.target.value)}
            className="w-full bg-white/[0.04] border border-white/10 rounded-lg px-3 py-2.5 text-white text-sm focus:outline-none focus:border-accent/50" />
        </div>
      </div>

      <div className="glass-panel p-4 grid grid-cols-3 gap-4 text-center">
        <div>
          <div className="text-white/30 text-[10px] uppercase tracking-wider mb-1">Weight/m²</div>
          <div className="text-accent font-bold text-lg font-mono">{weightPerSqm.toFixed(2)}</div>
          <div className="text-white/20 text-[10px]">kg/m²</div>
        </div>
        <div>
          <div className="text-white/30 text-[10px] uppercase tracking-wider mb-1">Per Piece</div>
          <div className="text-white font-bold text-lg font-mono">{weightPerPiece.toFixed(2)}</div>
          <div className="text-white/20 text-[10px]">kg</div>
        </div>
        <div>
          <div className="text-white/30 text-[10px] uppercase tracking-wider mb-1">Total</div>
          <div className="text-white font-bold text-lg font-mono">{totalWeight.toFixed(2)}</div>
          <div className="text-white/20 text-[10px]">kg ({(totalWeight / 1000).toFixed(3)} MT)</div>
        </div>
      </div>

      <div className="mt-3 text-white/20 text-[10px] text-center">
        Formula: Thickness × 7.85 × 1.05 (5% pattern weight) = {weightPerSqm.toFixed(2)} kg/m²
      </div>
    </div>
  );
}
