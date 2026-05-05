"use client";

import { useState } from "react";
import { squareTubes } from "@/lib/data/section-weights";

export default function SquareTubeWeightCalc() {
  const [side, setSide] = useState("50");
  const [wt, setWt] = useState("3");
  const [length, setLength] = useState("6");
  const [quantity, setQuantity] = useState("1");

  const s = parseFloat(side) || 0;
  const t = parseFloat(wt) || 0;
  const l = parseFloat(length) || 0;
  const q = parseInt(quantity) || 1;

  const match = squareTubes.find((st) => st.side === s && st.wallThickness === t);
  let weightPerMetre = match ? match.weightPerMetre : 0;
  if (!match && s > 0 && t > 0 && t < s / 2) {
    weightPerMetre = (s - t) * t * 4 * 0.00785;
  }

  const totalWeight = weightPerMetre * l * q;

  const commonSizes = [
    { s: 20, t: 2 }, { s: 25, t: 2 }, { s: 30, t: 2 }, { s: 40, t: 2 },
    { s: 40, t: 2.5 }, { s: 40, t: 3 }, { s: 50, t: 2.5 }, { s: 50, t: 3 },
    { s: 60, t: 3 }, { s: 75, t: 3 }, { s: 75, t: 4 }, { s: 80, t: 4 },
    { s: 100, t: 4 }, { s: 100, t: 5 },
  ];

  return (
    <div className="glass-panel p-5 sm:p-6">
      <div className="mb-4">
        <label className="block text-white/40 text-xs mb-1.5">Quick Select — Common Sizes</label>
        <div className="flex flex-wrap gap-2">
          {commonSizes.map((cs) => (
            <button
              key={`${cs.s}x${cs.t}`}
              onClick={() => { setSide(String(cs.s)); setWt(String(cs.t)); }}
              className={`px-2.5 py-1.5 rounded-md text-xs font-mono transition-all cursor-pointer ${s === cs.s && t === cs.t ? "bg-accent/20 text-accent border border-accent/30" : "text-white/50 border border-white/10 hover:border-white/20"}`}
            >
              {cs.s}×{cs.s}×{cs.t}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-5">
        <div>
          <label className="block text-white/40 text-xs mb-1.5">Side (mm)</label>
          <input type="number" value={side} onChange={(e) => setSide(e.target.value)}
            className="w-full bg-white/[0.04] border border-white/10 rounded-lg px-3 py-2.5 text-white text-sm focus:outline-none focus:border-accent/50" />
        </div>
        <div>
          <label className="block text-white/40 text-xs mb-1.5">Wall Thickness (mm)</label>
          <input type="number" value={wt} onChange={(e) => setWt(e.target.value)} step="0.5"
            className="w-full bg-white/[0.04] border border-white/10 rounded-lg px-3 py-2.5 text-white text-sm focus:outline-none focus:border-accent/50" />
        </div>
        <div>
          <label className="block text-white/40 text-xs mb-1.5">Length (metres)</label>
          <input type="number" value={length} onChange={(e) => setLength(e.target.value)}
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
        Formula: (Side − WT) × WT × 4 × 0.00785 | {match ? "✓ Standard size" : "Custom (calculated)"}
      </div>
    </div>
  );
}
