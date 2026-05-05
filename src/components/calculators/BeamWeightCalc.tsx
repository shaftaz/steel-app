"use client";

import { useState } from "react";
import { ismbBeams } from "@/lib/data/section-weights";

export default function BeamWeightCalc() {
  const [selected, setSelected] = useState("ISMB 200");
  const [length, setLength] = useState("6");
  const [quantity, setQuantity] = useState("1");

  const beam = ismbBeams.find((b) => b.designation === selected);
  const weightPerMetre = beam?.weightPerMetre || 0;
  const l = parseFloat(length) || 0;
  const q = parseInt(quantity) || 1;
  const totalWeight = weightPerMetre * l * q;

  return (
    <div className="glass-panel p-5 sm:p-6">
      <div className="mb-4">
        <label className="block text-white/40 text-xs mb-1.5">Select ISMB Designation</label>
        <div className="flex flex-wrap gap-2">
          {ismbBeams.map((b) => (
            <button
              key={b.designation}
              onClick={() => setSelected(b.designation)}
              className={`px-3 py-1.5 rounded-md text-xs font-mono transition-all cursor-pointer ${selected === b.designation ? "bg-accent/20 text-accent border border-accent/30" : "text-white/50 border border-white/10 hover:border-white/20"}`}
            >
              {b.designation}
            </button>
          ))}
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

      <div className="glass-panel p-4 grid grid-cols-3 gap-4 text-center mb-4">
        <div>
          <div className="text-white/30 text-[10px] uppercase tracking-wider mb-1">Weight/m</div>
          <div className="text-accent font-bold text-lg font-mono">{weightPerMetre.toFixed(1)}</div>
          <div className="text-white/20 text-[10px]">kg/m</div>
        </div>
        <div>
          <div className="text-white/30 text-[10px] uppercase tracking-wider mb-1">Per Piece</div>
          <div className="text-white font-bold text-lg font-mono">{(weightPerMetre * l).toFixed(1)}</div>
          <div className="text-white/20 text-[10px]">kg</div>
        </div>
        <div>
          <div className="text-white/30 text-[10px] uppercase tracking-wider mb-1">Total</div>
          <div className="text-white font-bold text-lg font-mono">{totalWeight.toFixed(1)}</div>
          <div className="text-white/20 text-[10px]">kg ({(totalWeight / 1000).toFixed(3)} MT)</div>
        </div>
      </div>

      {beam && (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
          <div className="glass-panel p-2.5">
            <div className="text-white/30 text-[9px] uppercase">Depth</div>
            <div className="text-white/70 text-sm font-mono">{beam.depth}mm</div>
          </div>
          <div className="glass-panel p-2.5">
            <div className="text-white/30 text-[9px] uppercase">Flange</div>
            <div className="text-white/70 text-sm font-mono">{beam.flangeWidth}mm</div>
          </div>
          <div className="glass-panel p-2.5">
            <div className="text-white/30 text-[9px] uppercase">Zxx</div>
            <div className="text-white/70 text-sm font-mono">{beam.sectionModulusZxx} cm³</div>
          </div>
          <div className="glass-panel p-2.5">
            <div className="text-white/30 text-[9px] uppercase">Ixx</div>
            <div className="text-white/70 text-sm font-mono">{beam.momentOfInertiaIxx} cm⁴</div>
          </div>
        </div>
      )}
    </div>
  );
}
