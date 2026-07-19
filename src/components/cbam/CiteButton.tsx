"use client";

import { useState } from "react";

export default function CiteButton({ anchor, label }: { anchor: string; label: string }) {
  const [copied, setCopied] = useState(false);

  const cite = () => {
    const url = `https://steelmath.com/cbam${anchor}`;
    const date = new Date().toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
    const text = `${label} — SteelMath CBAM Hub, ${url} (retrieved ${date})`;
    const done = () => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    };
    if (navigator.clipboard?.writeText) navigator.clipboard.writeText(text).then(done, done);
    else done();
  };

  return (
    <button
      onClick={cite}
      className="font-mono text-[10px] tracking-[0.08em] text-[#7A8094] border border-cbam-rule px-2 py-1 cursor-pointer hover:border-cbam hover:text-cbam transition-colors"
    >
      {copied ? "CITATION COPIED ✓" : "CITE THIS"}
    </button>
  );
}
