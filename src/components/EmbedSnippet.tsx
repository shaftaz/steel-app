"use client";

import { useState } from "react";
import { track } from "@/components/instrument";

/* "Embed this calculator" — the distribution loop for stockists,
   fabricators and engineering blogs. The iframe carries a visible
   SteelMath attribution link, which is the backlink. */

export default function EmbedSnippet({
  shape = "round",
  label = "Steel Weight Calculator",
}: {
  shape?: string;
  label?: string;
}) {
  const [copied, setCopied] = useState(false);
  const src = `https://steelmath.com/embed?shape=${encodeURIComponent(shape)}`;
  const snippet = `<iframe src="${src}" title="${label} by SteelMath" width="100%" height="760" style="border:1px solid #D8D6D0;max-width:720px" loading="lazy"></iframe>
<p style="font:12px/1.4 ui-monospace,monospace;margin:6px 0 0">Calculator by <a href="https://steelmath.com/calculator?utm_source=embed" rel="noopener">SteelMath</a></p>`;

  const copy = () => {
    track("embed_copy", { shape });
    const done = () => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    };
    if (navigator.clipboard?.writeText) navigator.clipboard.writeText(snippet).then(done, done);
    else done();
  };

  return (
    <details className="group border border-rule bg-[#FFFFFF] mb-8 no-print">
      <summary className="cursor-pointer list-none px-5 py-3.5 flex items-center justify-between gap-3">
        <span>
          <span className="font-mono text-[10.5px] tracking-[0.12em] text-accent block mb-1">
            FOR STOCKISTS, FABRICATORS &amp; ENGINEERING SITES
          </span>
          <span className="text-[14.5px] font-semibold text-ink">
            Embed this calculator on your website — free
          </span>
        </span>
        <span className="font-mono text-[11px] text-muted-3 group-open:rotate-90 transition-transform">▸</span>
      </summary>
      <div className="px-5 pb-5 border-t border-rule-faint pt-4">
        <p className="text-[13.5px] text-muted leading-relaxed mb-3 max-w-[640px]">
          Paste this once into any page. It stays up to date automatically, works on
          phones, and shows a small &ldquo;Calculator by SteelMath&rdquo; line beneath the tool.
          No sign-up, no key.
        </p>
        <pre className="font-mono text-[11.5px] leading-relaxed bg-paper border border-rule p-3 overflow-x-auto whitespace-pre-wrap break-all text-ink m-0">
          {snippet}
        </pre>
        <div className="flex gap-2 mt-3 flex-wrap">
          <button
            onClick={copy}
            className="btn-glow px-4 py-2 text-[12px] font-semibold cursor-pointer"
          >
            {copied ? "COPIED ✓" : "COPY EMBED CODE"}
          </button>
          <a
            href={src}
            target="_blank"
            rel="noopener"
            className="px-4 py-2 text-[12px] font-mono font-semibold border border-rule text-ink hover:border-ink transition-colors no-underline bg-[#FFFFFF]"
          >
            PREVIEW WIDGET →
          </a>
        </div>
      </div>
    </details>
  );
}
