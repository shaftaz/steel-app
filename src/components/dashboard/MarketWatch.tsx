"use client";

import { useState } from "react";
import {
  priceMatrix, regions, products,
  indianPrices, indianCities, indianProducts,
  type Region, type Product, type IndianCity, type IndianProduct,
} from "@/lib/data/market";

function MiniChart({ trend }: { trend: "up" | "down" }) {
  const pts = trend === "up"
    ? "0,18 10,16 20,19 30,12 40,14 50,7"
    : "0,5 10,8 20,4 30,10 40,13 50,18";
  return (
    <svg width="48" height="16" viewBox="0 0 52 20" className="opacity-50">
      <polyline points={pts} fill="none" stroke={trend === "up" ? "#00e676" : "#ff5252"} strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

export default function MarketWatch() {
  const [tab, setTab] = useState<"global" | "india">("india");

  return (
    <div className="glass-panel glass-panel-hover h-full flex flex-col">
      <div className="flex items-center justify-between px-4 py-3">
        <h2 className="text-white font-bold text-sm tracking-tight">Market Watch</h2>
        <div className="flex gap-1">
          {(["india", "global"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-2.5 py-1 rounded-md text-[11px] font-semibold cursor-pointer transition-all ${
                tab === t
                  ? "bg-accent/15 text-accent border border-accent/20"
                  : "text-white/30 hover:text-white/50 border border-transparent"
              }`}
            >
              {t === "india" ? "🇮🇳 India ₹" : "🌍 Global $"}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 px-3 pb-3 overflow-auto">
        {tab === "india" ? (
          <div className="overflow-x-auto -mx-0.5">
            <table className="w-full text-xs min-w-[500px]">
              <thead>
                <tr>
                  <th className="text-left text-white/25 font-medium pb-2 pl-1 uppercase tracking-wider text-[11px] sticky left-0 bg-[rgba(10,25,50,0.95)] z-10">₹/MT</th>
                  {indianCities.map((c) => (
                    <th key={c} className="text-center text-white/25 font-medium pb-2 uppercase tracking-wider text-[11px]">{c}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {indianProducts.map((product: IndianProduct) => (
                  <tr key={product} className="border-b border-white/[0.03] last:border-0">
                    <td className="py-2 pr-2 pl-1 sticky left-0 bg-[rgba(10,25,50,0.95)] z-10">
                      <span className="text-white/55 font-semibold text-xs">{product}</span>
                    </td>
                    {indianCities.map((city: IndianCity) => {
                      const cell = indianPrices[product][city];
                      return (
                        <td key={city} className="py-2 text-center">
                          <div className="text-white font-bold text-xs">
                            {cell.price.toLocaleString("en-IN")}
                          </div>
                          <div className={`text-[10px] font-semibold ${cell.change >= 0 ? "text-green-up" : "text-red-down"}`}>
                            {cell.change >= 0 ? "+" : ""}{cell.change.toLocaleString("en-IN")}
                          </div>
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="overflow-x-auto -mx-0.5">
            <table className="w-full text-xs min-w-[420px]">
              <thead>
                <tr>
                  <th className="text-left text-white/25 font-medium pb-2 pl-1 uppercase tracking-wider text-[11px]">$/MT</th>
                  {regions.map((r) => (
                    <th key={r} className="text-center text-white/25 font-medium pb-2 uppercase tracking-wider text-[11px]">{r}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {products.map((product: Product) => (
                  <tr key={product} className="border-b border-white/[0.03] last:border-0">
                    <td className="py-2 pr-2 pl-1">
                      <span className="text-white/55 font-semibold">{product}</span>
                    </td>
                    {regions.map((region: Region) => {
                      const cell = priceMatrix[product][region];
                      return (
                        <td key={region} className="py-2 text-center">
                          <div className="text-white font-bold text-xs">{cell.price}</div>
                          <div className={`text-[10px] font-semibold ${cell.change >= 0 ? "text-green-up" : "text-red-down"}`}>
                            {cell.change >= 0 ? "▲" : "▼"}{Math.abs(cell.change)}
                          </div>
                          <div className="mt-0.5 flex justify-center"><MiniChart trend={cell.change >= 0 ? "up" : "down"} /></div>
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
