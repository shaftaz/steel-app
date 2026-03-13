"use client";

import { useState } from "react";

export default function ChatBubble() {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");

  return (
    <>
      <button
        onClick={() => setOpen(!open)}
        className={`fixed bottom-4 right-4 z-50 w-12 h-12 rounded-xl flex items-center justify-center cursor-pointer transition-all duration-300 shadow-lg ${
          open
            ? "bg-white/10 border border-white/20"
            : "bg-gradient-to-br from-accent to-teal chat-float hover:shadow-[0_0_25px_rgba(0,212,255,0.3)]"
        }`}
      >
        {open ? (
          <svg className="w-4 h-4 text-white/60" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg className="w-5 h-5 text-[#070e1b]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
        )}
      </button>

      {open && (
        <div className="fixed bottom-20 right-4 z-50 w-[min(320px,calc(100vw-32px))] glass-panel shadow-2xl overflow-hidden">
          <div className="px-4 py-3 border-b border-white/[0.06]">
            <div className="flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 rounded-full bg-green-up pulse-dot text-green-up" />
              <h3 className="text-white font-bold text-xs">Live Chat / Doubt Clarification</h3>
            </div>
            <p className="text-white/20 text-[9px] mt-0.5">Ask a SteelMath Expert</p>
          </div>

          <div className="px-4 py-2 border-b border-white/[0.04] flex flex-wrap gap-1">
            {["Grade Cross-Ref", "Weld Procedure", "Weight Formula", "Price Query"].map((tag) => (
              <button key={tag}
                className="px-2 py-0.5 rounded-md bg-white/[0.04] border border-white/[0.06] text-white/30 text-[9px] hover:bg-accent/10 hover:text-accent hover:border-accent/20 transition-all cursor-pointer">
                {tag}
              </button>
            ))}
          </div>

          <div className="h-[160px] px-4 py-3 overflow-auto">
            <div className="flex gap-2">
              <div className="w-5 h-5 rounded-md bg-accent/15 flex items-center justify-center shrink-0 mt-0.5">
                <span className="text-accent text-[8px] font-bold">SM</span>
              </div>
              <div className="bg-white/[0.04] rounded-lg rounded-tl-sm px-3 py-2 max-w-[220px]">
                <p className="text-white/45 text-[10px] leading-relaxed">
                  Hello! I can help with technical questions, grade specs, or weight calculations.
                </p>
              </div>
            </div>
          </div>

          <div className="px-3 py-2.5 border-t border-white/[0.06]">
            <div className="flex gap-1.5">
              <input type="text" placeholder="Type your question..." value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="glass-input flex-1 px-2.5 py-1.5 text-[10px]" />
              <button className="btn-glow px-3 py-1.5 text-[10px] shrink-0">Send</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
