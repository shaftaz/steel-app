"use client";

import { useState } from "react";
import { HARDNESS_TABLE, type HardnessEntry } from "@/lib/calculators/materials";

type Scale = "brinell" | "rockwellC" | "rockwellB" | "vickers";

const SCALES: { value: Scale; label: string; unit: string }[] = [
  { value: "brinell", label: "Brinell (HB)", unit: "HB" },
  { value: "rockwellC", label: "Rockwell C (HRC)", unit: "HRC" },
  { value: "rockwellB", label: "Rockwell B (HRB)", unit: "HRB" },
  { value: "vickers", label: "Vickers (HV)", unit: "HV" },
];

function findClosest(scale: Scale, value: number): HardnessEntry | null {
  const filtered = HARDNESS_TABLE.filter((e) => e[scale] !== null);
  if (filtered.length === 0) return null;

  let best = filtered[0];
  let bestDiff = Math.abs((best[scale] as number) - value);
  for (const entry of filtered) {
    const diff = Math.abs((entry[scale] as number) - value);
    if (diff < bestDiff) {
      best = entry;
      bestDiff = diff;
    }
  }
  return best;
}

export default function HardnessCalc() {
  const [scale, setScale] = useState<Scale>("brinell");
  const [input, setInput] = useState("");
  const [result, setResult] = useState<HardnessEntry | null>(null);

  function handleConvert() {
    const val = parseFloat(input);
    if (isNaN(val) || val <= 0) {
      setResult(null);
      return;
    }
    setResult(findClosest(scale, val));
  }

  const inputClass =
    "w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 text-white text-sm focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/25 transition-colors";

  const scaleInfo = SCALES.find((s) => s.value === scale)!;

  return (
    <div className="glass-panel p-5 sm:p-6">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-5">
        <div>
          <label className="block text-white/40 text-xs mb-1.5">From Scale</label>
          <select
            className={inputClass}
            value={scale}
            onChange={(e) => {
              setScale(e.target.value as Scale);
              setResult(null);
            }}
          >
            {SCALES.map((s) => (
              <option key={s.value} value={s.value} className="bg-[#0d1929]">
                {s.label}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-white/40 text-xs mb-1.5">Value ({scaleInfo.unit})</label>
          <input
            type="number"
            className={inputClass}
            placeholder={`e.g. ${scale === "brinell" ? "300" : scale === "rockwellC" ? "45" : scale === "rockwellB" ? "85" : "350"}`}
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
        </div>
        <div className="flex items-end">
          <button onClick={handleConvert} className="btn-glow px-6 py-2.5 text-sm w-full">
            Convert
          </button>
        </div>
      </div>

      {result && (
        <div className="p-4 rounded-lg bg-accent/5 border border-accent/20">
          <div className="text-accent text-lg font-bold mb-2">Conversion Result (closest match)</div>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
            <div>
              <div className="text-white/40 text-xs">Brinell (HB)</div>
              <div className="text-white font-mono font-semibold">{result.brinell}</div>
            </div>
            <div>
              <div className="text-white/40 text-xs">Rockwell C (HRC)</div>
              <div className="text-white font-mono font-semibold">{result.rockwellC ?? "—"}</div>
            </div>
            <div>
              <div className="text-white/40 text-xs">Rockwell B (HRB)</div>
              <div className="text-white font-mono font-semibold">{result.rockwellB ?? "—"}</div>
            </div>
            <div>
              <div className="text-white/40 text-xs">Vickers (HV)</div>
              <div className="text-white font-mono font-semibold">{result.vickers}</div>
            </div>
            <div>
              <div className="text-white/40 text-xs">Tensile (MPa)</div>
              <div className="text-white font-mono font-semibold">{result.tensileApproxMPa}</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
