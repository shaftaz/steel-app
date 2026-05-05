"use client";

import { useState } from "react";

const SS_GRADES = [
  { id: "ss304", label: "SS 304", density: 8.0 },
  { id: "ss316", label: "SS 316", density: 8.027 },
  { id: "ss202", label: "SS 202", density: 7.86 },
];

const SECTION_TYPES = [
  { id: "round", label: "Round Bar" },
  { id: "plate", label: "Plate/Sheet" },
  { id: "pipe", label: "Pipe" },
];

export default function StainlessSteelWeightCalc() {
  const [grade, setGrade] = useState("ss304");
  const [section, setSection] = useState("round");
  const [dim1, setDim1] = useState("25");
  const [dim2, setDim2] = useState("");
  const [dim3, setDim3] = useState("");
  const [length, setLength] = useState("1");
  const [quantity, setQuantity] = useState("1");

  const g = SS_GRADES.find((gr) => gr.id === grade) || SS_GRADES[0];
  const d1 = parseFloat(dim1) || 0;
  const d2 = parseFloat(dim2) || 0;
  const d3 = parseFloat(dim3) || 0;
  const l = parseFloat(length) || 0;
  const q = parseInt(quantity) || 1;

  let weightPerUnit = 0;
  let formulaText = "";

  if (section === "round" && d1 > 0) {
    weightPerUnit = (d1 * d1 * Math.PI * g.density) / (4 * 1000000) * 1000;
    formulaText = `d²/162.2 × (${g.density}/7.85)`;
  } else if (section === "plate" && d1 > 0 && d2 > 0 && d3 > 0) {
    weightPerUnit = (d1 * d2 * d3 * g.density) / 1000000;
    formulaText = `L × W × T × ${g.density} / 1,000,000`;
  } else if (section === "pipe" && d1 > 0 && d2 > 0) {
    weightPerUnit = (d1 - d2) * d2 * Math.PI * g.density / 1000;
    formulaText = `(OD − WT) × WT × π × ${g.density} / 1000`;
  }

  const isPlate = section === "plate";
  const totalWeight = isPlate ? weightPerUnit * q : weightPerUnit * l * q;

  return (
    <div className="glass-panel p-5 sm:p-6">
      <div className="mb-4">
        <label className="block text-white/40 text-xs mb-1.5">SS Grade</label>
        <div className="flex flex-wrap gap-2">
          {SS_GRADES.map((gr) => (
            <button
              key={gr.id}
              onClick={() => setGrade(gr.id)}
              className={`px-3 py-1.5 rounded-md text-xs transition-all cursor-pointer ${grade === gr.id ? "bg-accent/20 text-accent border border-accent/30" : "text-white/50 border border-white/10 hover:border-white/20"}`}
            >
              {gr.label} ({gr.density} g/cm³)
            </button>
          ))}
        </div>
      </div>

      <div className="mb-4">
        <label className="block text-white/40 text-xs mb-1.5">Section Type</label>
        <div className="flex flex-wrap gap-2">
          {SECTION_TYPES.map((st) => (
            <button
              key={st.id}
              onClick={() => setSection(st.id)}
              className={`px-3 py-1.5 rounded-md text-xs transition-all cursor-pointer ${section === st.id ? "bg-accent/20 text-accent border border-accent/30" : "text-white/50 border border-white/10 hover:border-white/20"}`}
            >
              {st.label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-5">
        {section === "round" && (
          <div>
            <label className="block text-white/40 text-xs mb-1.5">Diameter (mm)</label>
            <input type="number" value={dim1} onChange={(e) => setDim1(e.target.value)}
              className="w-full bg-white/[0.04] border border-white/10 rounded-lg px-3 py-2.5 text-white text-sm focus:outline-none focus:border-accent/50" />
          </div>
        )}
        {section === "plate" && (
          <>
            <div>
              <label className="block text-white/40 text-xs mb-1.5">Length (mm)</label>
              <input type="number" value={dim1} onChange={(e) => setDim1(e.target.value)}
                className="w-full bg-white/[0.04] border border-white/10 rounded-lg px-3 py-2.5 text-white text-sm focus:outline-none focus:border-accent/50" />
            </div>
            <div>
              <label className="block text-white/40 text-xs mb-1.5">Width (mm)</label>
              <input type="number" value={dim2} onChange={(e) => setDim2(e.target.value)}
                className="w-full bg-white/[0.04] border border-white/10 rounded-lg px-3 py-2.5 text-white text-sm focus:outline-none focus:border-accent/50" />
            </div>
            <div>
              <label className="block text-white/40 text-xs mb-1.5">Thickness (mm)</label>
              <input type="number" value={dim3} onChange={(e) => setDim3(e.target.value)}
                className="w-full bg-white/[0.04] border border-white/10 rounded-lg px-3 py-2.5 text-white text-sm focus:outline-none focus:border-accent/50" />
            </div>
          </>
        )}
        {section === "pipe" && (
          <>
            <div>
              <label className="block text-white/40 text-xs mb-1.5">OD (mm)</label>
              <input type="number" value={dim1} onChange={(e) => setDim1(e.target.value)}
                className="w-full bg-white/[0.04] border border-white/10 rounded-lg px-3 py-2.5 text-white text-sm focus:outline-none focus:border-accent/50" />
            </div>
            <div>
              <label className="block text-white/40 text-xs mb-1.5">Wall Thickness (mm)</label>
              <input type="number" value={dim2} onChange={(e) => setDim2(e.target.value)}
                className="w-full bg-white/[0.04] border border-white/10 rounded-lg px-3 py-2.5 text-white text-sm focus:outline-none focus:border-accent/50" />
            </div>
          </>
        )}
        {!isPlate && (
          <div>
            <label className="block text-white/40 text-xs mb-1.5">Length (m)</label>
            <input type="number" value={length} onChange={(e) => setLength(e.target.value)}
              className="w-full bg-white/[0.04] border border-white/10 rounded-lg px-3 py-2.5 text-white text-sm focus:outline-none focus:border-accent/50" />
          </div>
        )}
        <div>
          <label className="block text-white/40 text-xs mb-1.5">Quantity</label>
          <input type="number" value={quantity} onChange={(e) => setQuantity(e.target.value)}
            className="w-full bg-white/[0.04] border border-white/10 rounded-lg px-3 py-2.5 text-white text-sm focus:outline-none focus:border-accent/50" />
        </div>
      </div>

      <div className="glass-panel p-4 grid grid-cols-2 gap-4 text-center">
        <div>
          <div className="text-white/30 text-[10px] uppercase tracking-wider mb-1">{isPlate ? "Per Piece" : "Weight/m"}</div>
          <div className="text-accent font-bold text-lg font-mono">{weightPerUnit.toFixed(3)}</div>
          <div className="text-white/20 text-[10px]">kg</div>
        </div>
        <div>
          <div className="text-white/30 text-[10px] uppercase tracking-wider mb-1">Total</div>
          <div className="text-white font-bold text-lg font-mono">{totalWeight.toFixed(2)}</div>
          <div className="text-white/20 text-[10px]">kg ({(totalWeight / 1000).toFixed(3)} MT)</div>
        </div>
      </div>

      {formulaText && (
        <div className="mt-3 text-white/20 text-[10px] text-center">
          {formulaText} | {g.label} density: {g.density} g/cm³
        </div>
      )}
    </div>
  );
}
