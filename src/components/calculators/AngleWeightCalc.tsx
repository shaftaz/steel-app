"use client";

import { useState } from "react";
import { equalAngles } from "@/lib/data/section-weights";

export default function AngleWeightCalc() {
  const [legA, setLegA] = useState("50");
  const [legB, setLegB] = useState("50");
  const [thickness, setThickness] = useState("5");
  const [length, setLength] = useState("6");
  const [quantity, setQuantity] = useState("1");

  const a = parseFloat(legA) || 0;
  const b = parseFloat(legB) || 0;
  const t = parseFloat(thickness) || 0;
  const l = parseFloat(length) || 0;
  const q = parseInt(quantity) || 1;

  const match = equalAngles.find(
    (ang) => ang.legA === a && ang.legB === b && ang.thickness === t
  );

  let weightPerMetre = match ? match.weightPerMetre : 0;
  if (!match && a > 0 && b > 0 && t > 0 && t < Math.min(a, b)) {
    weightPerMetre = (a + b - t) * t * 0.00785;
  }

  const totalWeight = weightPerMetre * l * q;

  const commonSizes = [
    { a: 25, b: 25, t: 3 }, { a: 30, b: 30, t: 5 }, { a: 40, b: 40, t: 5 },
    { a: 50, b: 50, t: 5 }, { a: 50, b: 50, t: 6 }, { a: 60, b: 60, t: 6 },
    { a: 75, b: 75, t: 6 }, { a: 75, b: 75, t: 8 }, { a: 100, b: 100, t: 8 },
    { a: 100, b: 100, t: 10 }, { a: 130, b: 130, t: 10 }, { a: 150, b: 150, t: 12 },
  ];

  return (
    <div className="glass-panel p-5 sm:p-6">
      <div className="mb-4">
        <label className="block text-white/40 text-xs mb-1.5">Quick Select — Common Sizes</label>
        <div className="flex flex-wrap gap-2">
          {commonSizes.map((s) => (
            <button
              key={`${s.a}x${s.b}x${s.t}`}
              onClick={() => { setLegA(String(s.a)); setLegB(String(s.b)); setThickness(String(s.t)); }}
              className={`px-2.5 py-1.5 rounded-md text-xs font-mono transition-all cursor-pointer ${a === s.a && b === s.b && t === s.t ? "bg-accent/20 text-accent border border-accent/30" : "text-white/50 border border-white/10 hover:border-white/20"}`}
            >
              {s.a}×{s.b}×{s.t}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-4">
        <div>
          <label className="block text-white/40 text-xs mb-1.5">Leg A (mm)</label>
          <input type="number" value={legA} onChange={(e) => setLegA(e.target.value)}
            className="w-full bg-white/[0.04] border border-white/10 rounded-lg px-3 py-2.5 text-white text-sm focus:outline-none focus:border-accent/50" />
        </div>
        <div>
          <label className="block text-white/40 text-xs mb-1.5">Leg B (mm)</label>
          <input type="number" value={legB} onChange={(e) => setLegB(e.target.value)}
            className="w-full bg-white/[0.04] border border-white/10 rounded-lg px-3 py-2.5 text-white text-sm focus:outline-none focus:border-accent/50" />
        </div>
        <div>
          <label className="block text-white/40 text-xs mb-1.5">Thickness (mm)</label>
          <input type="number" value={thickness} onChange={(e) => setThickness(e.target.value)}
            className="w-full bg-white/[0.04] border border-white/10 rounded-lg px-3 py-2.5 text-white text-sm focus:outline-none focus:border-accent/50" />
        </div>
      </div>

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

      <div className="mt-3 text-white/20 text-[10px] text-center">
        Formula: (A + B − T) × T × 0.00785 | {match ? "✓ Standard IS 808 size" : "Custom size (calculated)"}
      </div>
    </div>
  );
}
