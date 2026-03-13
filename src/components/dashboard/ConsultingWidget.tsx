"use client";

import { useState } from "react";

export default function ConsultingWidget() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="glass-panel glass-panel-hover overflow-hidden" id="consulting">
      <div className="relative px-4 py-4 flex flex-col sm:flex-row items-center gap-4">
        <div className="absolute -top-16 -right-16 w-48 h-48 bg-accent/[0.04] rounded-full blur-[60px] pointer-events-none" />
        <div className="flex-1 relative flex items-center gap-3">
          <div className="w-7 h-7 rounded-lg bg-accent/10 border border-accent/20 flex items-center justify-center shrink-0">
            <svg className="w-3.5 h-3.5 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a2 2 0 01-2-2v-6a2 2 0 012-2h8z" />
            </svg>
          </div>
          <div>
            <h2 className="text-white font-bold text-sm tracking-tight">Steel Consulting</h2>
            <p className="text-white/25 text-[10px]">Material sourcing & optimization expertise</p>
          </div>
        </div>
        <div className="shrink-0 w-full sm:w-auto">
          {!submitted ? (
            <button onClick={() => setSubmitted(true)} className="btn-glow w-full sm:w-auto px-5 py-2 text-xs">
              Request Engagement →
            </button>
          ) : (
            <div className="text-center sm:text-left">
              <div className="text-green-up text-xs font-semibold">Request Received ✓</div>
              <p className="text-white/20 text-[9px]">We&apos;ll contact you within 24h.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
