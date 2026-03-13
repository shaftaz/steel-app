"use client";

import { forecastData } from "@/lib/data/market";

export default function ForecastWidget() {
  const { points, low, high, label, direction } = forecastData;
  const allValues = [...points, ...low, ...high];
  const min = Math.min(...allValues) - 5;
  const max = Math.max(...allValues) + 5;
  const w = 300, h = 100;

  function toSvg(vals: number[]) {
    return vals.map((v, i) => {
      const x = (i / (vals.length - 1)) * w;
      const y = h - ((v - min) / (max - min)) * h;
      return `${x},${y}`;
    }).join(" ");
  }

  const projStart = points.length - 6;
  const projX = (projStart / (points.length - 1)) * w;

  return (
    <div className="glass-panel glass-panel-hover h-full flex flex-col">
      <div className="widget-header">
        <div>
          <h2 className="text-white font-bold text-xs tracking-tight">Forecasting</h2>
          <p className="text-white/15 text-[8px]">3mo projection</p>
        </div>
        <div className={`flex items-center gap-1 px-2 py-0.5 rounded-md text-[9px] font-bold ${
          direction === "bullish"
            ? "bg-green-up/10 text-green-up border border-green-up/20"
            : "bg-red-down/10 text-red-down border border-red-down/20"
        }`}>
          {direction === "bullish" ? "▲ Bullish" : "▼ Bearish"}
        </div>
      </div>

      <div className="flex-1 px-3 pb-3">
        <div className="text-white/20 text-[8px] mb-1">{label}</div>
        <svg viewBox={`0 0 ${w} ${h}`} className="w-full h-auto" preserveAspectRatio="none">
          <defs>
            <linearGradient id="fg" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="rgba(0,212,255,0.15)" />
              <stop offset="100%" stopColor="rgba(0,212,255,0)" />
            </linearGradient>
          </defs>
          <rect x={projX} y="0" width={w - projX} height={h} fill="rgba(0,230,118,0.03)" />
          <line x1={projX} y1="0" x2={projX} y2={h} stroke="rgba(255,255,255,0.05)" strokeWidth="1" strokeDasharray="3,3" />
          <polygon points={`${toSvg(high)} ${toSvg([...low].reverse()).split(" ").reverse().join(" ")}`} fill="rgba(0,212,255,0.04)" />
          <polyline points={toSvg(high)} fill="none" stroke="rgba(0,212,255,0.1)" strokeWidth="0.7" strokeDasharray="2,2" />
          <polyline points={toSvg(low)} fill="none" stroke="rgba(0,212,255,0.1)" strokeWidth="0.7" strokeDasharray="2,2" />
          <polygon points={`0,${h} ${toSvg(points)} ${w},${h}`} fill="url(#fg)" />
          <polyline points={toSvg(points)} fill="none" stroke="#00d4ff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx={w} cy={h - ((points[points.length - 1] - min) / (max - min)) * h} r="2.5" fill="#00d4ff" stroke="#070e1b" strokeWidth="1" />
        </svg>
        <div className="flex justify-between mt-1 text-[8px] text-white/12">
          <span>Jan</span><span>Feb</span><span>Mar</span><span>Apr</span><span>May</span><span>Jun</span>
        </div>
      </div>
    </div>
  );
}
