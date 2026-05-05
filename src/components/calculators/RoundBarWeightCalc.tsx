"use client";

import { useState } from "react";

const MATERIALS = [
  { id: "ms", label: "Mild Steel (MS/EN8)", density: 7.85 },
  { id: "ss304", label: "SS 304", density: 8.0 },
  { id: "ss316", label: "SS 316", density: 8.027 },
  { id: "en24", label: "EN24/EN19", density: 7.85 },
  { id: "al", label: "Aluminium", density: 2.7 },
  { id: "brass", label: "Brass", density: 8.5 },
];

export default function RoundBarWeightCalc() {
  const [diameter, setDiameter] = useState("25");
  const [material, setMaterial] = useState("ms");
  const [length, setLength] = useState("1");
  const [quantity, setQuantity] = useState("1");

  const d = parseFloat(diameter) || 0;
  const l = parseFloat(length) || 0;
  const q = parseInt(quantity) || 1;
  const mat = MATERIALS.find((m) => m.id === material) || MATERIALS[0];

  const weightPerMetreMS = (d * d) / 162.2;
  const weightPerMetre = weightPerMetreMS * (mat.density / 7.85);
  const totalWeight = weightPerMetre * l * q;

  const commonDiameters = [6, 8, 10, 12, 16, 20, 25, 28, 30, 32, 36, 40, 45, 50, 55, 60, 65, 70, 75, 80, 90, 100];

  return (
    <div className="glass-panel p-5 sm:p-6">
      <div className="mb-4">
        <label className="block text-white/40 text-xs mb-1.5">Material</label>
        <div className="flex flex-wrap gap-2">
          {MATERIALS.map((m) => (
            <button
              key={m.id}
              onClick={() => setMaterial(m.id)}
              className={`px-3 py-1.5 rounded-md text-xs transition-all cursor-pointer ${material === m.id ? "bg-accent/20 text-accent border border-accent/30" : "text-white/50 border border-white/10 hover:border-white/20"}`}
            >
              {m.label}
            </button>
          ))}
        </div>
      </div>

      <div className="mb-4">
        <label className="block text-white/40 text-xs mb-1.5">Diameter (mm) — Quick Select</label>
        <div className="flex flex-wrap gap-1.5">
          {commonDiameters.map((dia) => (
            <button
              key={dia}
              onClick={() => setDiameter(String(dia))}
              className={`px-2 py-1 rounded text-[11px] font-mono transition-all cursor-pointer ${d === dia ? "bg-accent/20 text-accent border border-accent/30" : "text-white/40 border border-white/[0.06] hover:border-white/20"}`}
            >
              {dia}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-5">
        <div>
          <label className="block text-white/40 text-xs mb-1.5">Diameter (mm)</label>
          <input type="number" value={diameter} onChange={(e) => setDiameter(e.target.value)}
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
          <div className="text-accent font-bold text-lg font-mono">{weightPerMetre.toFixed(3)}</div>
          <div className="text-white/20 text-[10px]">kg/m</div>
        </div>
        <div>
          <div className="text-white/30 text-[10px] uppercase tracking-wider mb-1">Per Piece</div>
          <div className="text-white font-bold text-lg font-mono">{(weightPerMetre * l).toFixed(3)}</div>
          <div className="text-white/20 text-[10px]">kg</div>
        </div>
        <div>
          <div className="text-white/30 text-[10px] uppercase tracking-wider mb-1">Total</div>
          <div className="text-white font-bold text-lg font-mono">{totalWeight.toFixed(2)}</div>
          <div className="text-white/20 text-[10px]">kg ({(totalWeight / 1000).toFixed(3)} MT)</div>
        </div>
      </div>

      <div className="mt-3 text-white/20 text-[10px] text-center">
        Formula: d²/162.2 × (density/7.85) | Material: {mat.label} ({mat.density} g/cm³)
      </div>
    </div>
  );
}
