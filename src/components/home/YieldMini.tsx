"use client";

import Link from "next/link";
import { useState } from "react";

function fmt(n: number, dp: number) {
  return n.toLocaleString("en-IN", { minimumFractionDigits: dp, maximumFractionDigits: dp });
}

export default function YieldMini() {
  const [yin, setYin] = useState(1000);
  const [yout, setYout] = useState(920);

  const num = (v: string) => {
    const n = parseFloat(v);
    return isFinite(n) && n >= 0 ? n : 0;
  };

  const yieldPct = yin > 0 ? Math.min((yout / yin) * 100, 100) : 0;

  return (
    <div className="bg-ink text-paper p-5 flex flex-col gap-3.5">
      <div className="flex justify-between items-baseline">
        <span className="text-[17px] font-bold">Yield Calculator</span>
        <span className="font-mono text-[10.5px] tracking-[0.08em] text-accent">LIVE — TRY IT</span>
      </div>
      <div className="grid grid-cols-2 gap-2.5">
        <label className="flex flex-col gap-1">
          <span className="font-mono text-[10px] tracking-[0.1em] text-[#7E8085]">INPUT (KG)</span>
          <input
            type="number"
            value={yin}
            onChange={(e) => setYin(num(e.target.value))}
            className="bg-panel-dark border border-[#34353A] text-paper font-mono text-sm px-2.5 py-2 outline-none w-full focus:border-accent"
          />
        </label>
        <label className="flex flex-col gap-1">
          <span className="font-mono text-[10px] tracking-[0.1em] text-[#7E8085]">FINISHED (KG)</span>
          <input
            type="number"
            value={yout}
            onChange={(e) => setYout(num(e.target.value))}
            className="bg-panel-dark border border-[#34353A] text-paper font-mono text-sm px-2.5 py-2 outline-none w-full focus:border-accent"
          />
        </label>
      </div>
      <div>
        <div className="flex justify-between items-baseline mb-2">
          <span className="font-mono text-[10.5px] tracking-[0.1em] text-[#7E8085]">YIELD</span>
          <span className="font-mono text-[26px] font-semibold text-accent">{fmt(yieldPct, 1)}%</span>
        </div>
        <div className="h-1 bg-ink-border relative">
          <div
            className="absolute left-0 top-0 bottom-0 bg-accent transition-[width] duration-200"
            style={{ width: `${yieldPct}%` }}
          />
        </div>
        <div className="font-mono text-[11px] text-[#7E8085] mt-2">
          PROCESS LOSS — {fmt(Math.max(yin - yout, 0), 1)} kg
        </div>
      </div>
      <Link
        href="/calculators/scrap-yield"
        className="font-mono text-[11.5px] tracking-[0.06em] text-paper border border-[#34353A] py-2.5 text-center no-underline hover:border-accent hover:text-accent transition-colors"
      >
        FULL SCRAP YIELD TOOL →
      </Link>
    </div>
  );
}
