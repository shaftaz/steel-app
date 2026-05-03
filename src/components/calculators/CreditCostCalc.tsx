"use client";

import { useState } from "react";

interface CreditResult {
  totalMaterial: number;
  interestCost: number;
  totalCost: number;
  effectiveRate: number;
  costPerKg: number;
}

function calcCredit(
  qty: number,
  pricePerKg: number,
  creditDays: number,
  interestRate: number
): CreditResult | null {
  if (qty <= 0 || pricePerKg <= 0 || creditDays <= 0 || interestRate <= 0)
    return null;

  const totalMaterial = qty * pricePerKg;
  const interestCost = totalMaterial * (interestRate / 100) * (creditDays / 365);
  const totalCost = totalMaterial + interestCost;
  const effectiveRate = (interestCost / totalMaterial) * 100;
  const costPerKg = totalCost / qty;

  return { totalMaterial, interestCost, totalCost, effectiveRate, costPerKg };
}

export default function CreditCostCalc() {
  const [qty, setQty] = useState("");
  const [price, setPrice] = useState("");
  const [days, setDays] = useState("30");
  const [rate, setRate] = useState("12");
  const [result, setResult] = useState<CreditResult | null>(null);

  function handleCalc() {
    setResult(
      calcCredit(
        parseFloat(qty) || 0,
        parseFloat(price) || 0,
        parseInt(days) || 0,
        parseFloat(rate) || 0
      )
    );
  }

  const inputClass =
    "w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 text-white text-sm focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/25 transition-colors";

  const fmt = (n: number) =>
    n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  return (
    <div className="glass-panel p-5 sm:p-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">
        <div>
          <label className="block text-white/40 text-xs mb-1.5">Quantity (kg)</label>
          <input
            type="number"
            className={inputClass}
            placeholder="e.g. 10000"
            value={qty}
            onChange={(e) => setQty(e.target.value)}
          />
        </div>
        <div>
          <label className="block text-white/40 text-xs mb-1.5">Price per kg</label>
          <input
            type="number"
            className={inputClass}
            placeholder="e.g. 55"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>
        <div>
          <label className="block text-white/40 text-xs mb-1.5">Credit Period (days)</label>
          <input
            type="number"
            className={inputClass}
            placeholder="e.g. 30"
            value={days}
            onChange={(e) => setDays(e.target.value)}
          />
        </div>
        <div>
          <label className="block text-white/40 text-xs mb-1.5">Interest Rate (% p.a.)</label>
          <input
            type="number"
            className={inputClass}
            placeholder="e.g. 12"
            value={rate}
            onChange={(e) => setRate(e.target.value)}
          />
        </div>
      </div>

      <button onClick={handleCalc} className="btn-glow px-6 py-2.5 text-sm w-full sm:w-auto">
        Calculate Credit Cost
      </button>

      {result && (
        <div className="mt-5 p-4 rounded-lg bg-accent/5 border border-accent/20">
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            <div>
              <div className="text-white/40 text-xs">Material Cost</div>
              <div className="text-white font-mono font-semibold">{fmt(result.totalMaterial)}</div>
            </div>
            <div>
              <div className="text-white/40 text-xs">Interest Cost</div>
              <div className="text-red-400 font-mono font-semibold">+{fmt(result.interestCost)}</div>
            </div>
            <div>
              <div className="text-white/40 text-xs">Total Cost</div>
              <div className="text-accent font-mono font-bold text-lg">{fmt(result.totalCost)}</div>
            </div>
            <div>
              <div className="text-white/40 text-xs">Effective Add-on %</div>
              <div className="text-white/70 font-mono">{result.effectiveRate.toFixed(3)}%</div>
            </div>
            <div>
              <div className="text-white/40 text-xs">Effective Cost/kg</div>
              <div className="text-white/70 font-mono">{result.costPerKg.toFixed(2)}</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
