"use client";

import { useState } from "react";
import { rectTubes } from "@/lib/data/section-weights";

export default function RectTubeWeightCalc() {
  const [width, setWidth] = useState("80");
  const [height, setHeight] = useState("40");
  const [wt, setWt] = useState("3");
  const [length, setLength] = useState("6");
  const [quantity, setQuantity] = useState("1");

  const w = parseFloat(width) || 0;
  const h = parseFloat(height) || 0;
  const t = parseFloat(wt) || 0;
  const l = parseFloat(length) || 0;
  const q = parseInt(quantity) || 1;

  const match = rectTubes.find((rt) => rt.width === w && rt.height === h && rt.wallThickness === t);
  let weightPerMetre = match ? match.weightPerMetre : 0;
  if (!match && w > 0 && h > 0 && t > 0 && t < Math.min(w, h) / 2) {
    weightPerMetre = 2 * (w + h - 2 * t) * t * 0.00785;
  }

  const totalWeight = weightPerMetre * l * q;

  const commonSizes = [
    { w: 40, h: 20, t: 2 }, { w: 50, h: 25, t: 2.5 }, { w: 60, h: 30, t: 2.5 },
    { w: 60, h: 40, t: 3 }, { w: 80, h: 40, t: 3 }, { w: 80, h: 40, t: 4 },
    { w: 100, h: 50, t: 3 }, { w: 100, h: 50, t: 4 }, { w: 120, h: 60, t: 4 },
    { w: 150, h: 75, t: 4 }, { w: 200, h: 100, t: 5 },
  ];

  return (
    <div className="glass-panel p-5 sm:p-6">
      <div className="mb-4">
        <label className="block text-white/40 text-xs mb-1.5">Quick Select — Common Sizes</label>
        <div className="flex flex-wrap gap-2">
          {commonSizes.map((cs) => (
            <button
              key={`${cs.w}x${cs.h}x${cs.t}`}
              onClick={() => { setWidth(String(cs.w)); setHeight(String(cs.h)); setWt(String(cs.t)); }}
              className={`px-2.5 py-1.5 rounded-md text-xs font-mono transition-all cursor-pointer ${w === cs.w && h === cs.h && t === cs.t ? "bg-accent/20 text-accent border border-accent/30" : "text-white/50 border border-white/10 hover:border-white/20"}`}
            >
              {cs.w}×{cs.h}×{cs.t}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-5 gap-4 mb-5">
        <div>
          <label className="block text-white/40 text-xs mb-1.5">Width (mm)</label>
          <input type="number" value={width} onChange={(e) => setWidth(e.target.value)}
            className="w-full bg-white/[0.04] border border-white/10 rounded-lg px-3 py-2.5 text-white text-sm focus:outline-none focus:border-accent/50" />
        </div>
        <div>
          <label className="block text-white/40 text-xs mb-1.5">Height (mm)</label>
          <input type="number" value={height} onChange={(e) => setHeight(e.target.value)}
            className="w-full bg-white/[0.04] border border-white/10 rounded-lg px-3 py-2.5 text-white text-sm focus:outline-none focus:border-accent/50" />
        </div>
        <div>
          <label className="block text-white/40 text-xs mb-1.5">Wall (mm)</label>
          <input type="number" value={wt} onChange={(e) => setWt(e.target.value)} step="0.5"
            className="w-full bg-white/[0.04] border border-white/10 rounded-lg px-3 py-2.5 text-white text-sm focus:outline-none focus:border-accent/50" />
        </div>
        <div>
          <label className="block text-white/40 text-xs mb-1.5">Length (m)</label>
          <input type="number" value={length} onChange={(e) => setLength(e.target.value)}
            className="w-full bg-white/[0.04] border border-white/10 rounded-lg px-3 py-2.5 text-white text-sm focus:outline-none focus:border-accent/50" />
        </div>
        <div>
          <label className="block text-white/40 text-xs mb-1.5">Qty</label>
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
        Formula: 2 × (W + H − 2×WT) × WT × 0.00785
      </div>
    </div>
  );
}
