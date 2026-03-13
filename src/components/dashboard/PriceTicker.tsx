"use client";

import { priceTicker } from "@/lib/data/market";

export default function PriceTicker() {
  const items = [...priceTicker, ...priceTicker];

  return (
    <div className="glass-panel overflow-hidden" id="market">
      <div className="flex items-center">
        <div className="shrink-0 flex items-center gap-1.5 px-3 py-2 border-r border-white/[0.06]">
          <span className="w-1.5 h-1.5 rounded-full bg-green-up pulse-dot text-green-up" />
          <span className="text-[9px] font-bold uppercase tracking-widest text-accent hidden sm:inline">Live Pulse</span>
        </div>
        <div className="flex-1 overflow-hidden py-2">
          <div className="ticker-track flex items-center gap-6 whitespace-nowrap w-max">
            {items.map((tick, i) => (
              <div key={i} className="flex items-center gap-2">
                <span className="text-white/35 text-[10px] font-medium">{tick.label}</span>
                <span className="text-white font-bold text-xs">{tick.currency}{tick.value}</span>
                <span className={`text-[10px] font-bold ${tick.change >= 0 ? "text-green-up" : "text-red-down"}`}>
                  {tick.change >= 0 ? "▲" : "▼"}{Math.abs(tick.change).toFixed(1)}%
                </span>
                {i < items.length - 1 && <span className="text-white/[0.06]">│</span>}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
