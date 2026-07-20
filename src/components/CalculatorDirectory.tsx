"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

export interface CalcItem {
  href: string;
  title: string;
  description: string;
  tag: string;
}

/* Grouped, filterable instrument directory for /calculators.
   Design only: the item list (titles, descriptions, links) comes
   from the page unchanged. */

const GROUP_ORDER = [
  "All-in-One",
  "TMT / Rebar",
  "Plate / Sheet",
  "Pipes & Tubes",
  "Structural",
  "Scrap & Melting",
  "Converters & Finance",
];

function groupOf(tag: string): string {
  if (/tmt|rebar/i.test(tag)) return "TMT / Rebar";
  if (/plate|sheet|chequer/i.test(tag)) return "Plate / Sheet";
  if (/pipe|tube/i.test(tag)) return "Pipes & Tubes";
  if (/angle|beam|channel|structural|round|flat|bar/i.test(tag)) return "Structural";
  if (/scrap|melt|yield|production/i.test(tag)) return "Scrap & Melting";
  if (/all/i.test(tag)) return "All-in-One";
  return "Converters & Finance";
}

export default function CalculatorDirectory({ items }: { items: CalcItem[] }) {
  const [q, setQ] = useState("");

  const filtered = useMemo(() => {
    const needle = q.trim().toLowerCase();
    if (!needle) return items;
    return items.filter((c) =>
      (c.title + " " + c.description + " " + c.tag).toLowerCase().includes(needle)
    );
  }, [items, q]);

  const groups = useMemo(() => {
    const map = new Map<string, CalcItem[]>();
    for (const c of filtered) {
      const g = groupOf(c.tag);
      if (!map.has(g)) map.set(g, []);
      map.get(g)!.push(c);
    }
    return GROUP_ORDER.filter((g) => map.has(g)).map((g) => ({ name: g, items: map.get(g)! }));
  }, [filtered]);

  let n = 0;

  return (
    <div className="mb-12">
      {/* Filter strip */}
      <div className="border border-ink bg-[#FFFFFF] flex items-center gap-3 px-4 mb-6">
        <span className="font-mono text-xs text-muted-3" aria-hidden="true">→</span>
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Filter: try tmt, pipe, cost, gauge…"
          aria-label="Filter calculators"
          className="flex-1 bg-transparent border-none outline-none font-mono text-sm text-ink py-3 placeholder:text-muted-3"
        />
        <span className="font-mono text-[10.5px] tracking-[0.08em] text-muted-3 whitespace-nowrap">
          {filtered.length} / {items.length} TOOLS
        </span>
        {q && (
          <button
            onClick={() => setQ("")}
            className="border border-rule text-muted-3 font-mono text-[10.5px] px-1.5 py-0.5 cursor-pointer hover:border-ink hover:text-ink"
          >
            CLEAR
          </button>
        )}
      </div>

      {groups.length === 0 && (
        <div className="border border-rule bg-[#FFFFFF] p-8 text-center">
          <p className="text-muted-2 text-sm mb-2">Nothing matches that filter.</p>
          <button onClick={() => setQ("")} className="font-mono text-xs text-accent cursor-pointer">
            CLEAR AND SHOW ALL →
          </button>
        </div>
      )}

      {groups.map((g) => (
        <section key={g.name} className="mb-7">
          <div className="flex items-baseline justify-between border-t border-ink pt-3 mb-1">
            <h2 className="font-mono text-[11px] tracking-[0.14em] text-accent uppercase font-medium">
              {g.name}
            </h2>
            <span className="font-mono text-[10.5px] text-muted-3">
              {g.items.length} {g.items.length === 1 ? "TOOL" : "TOOLS"}
            </span>
          </div>
          {g.items.map((c) => {
            n += 1;
            return (
              <Link
                key={c.href}
                href={c.href}
                className="grid grid-cols-[36px_1fr_auto] gap-3.5 items-baseline py-3.5 px-1 border-b border-rule text-ink no-underline hover:bg-[#FFFFFF] transition-colors group"
              >
                <span className="font-mono text-[11.5px] text-muted-3">
                  {String(n).padStart(2, "0")}
                </span>
                <span>
                  <span className="block text-[15.5px] font-bold tracking-[-0.01em] group-hover:text-accent transition-colors">
                    {c.title}
                  </span>
                  <span className="block text-[12.5px] text-muted-2 mt-0.5 leading-normal">
                    {c.description}
                  </span>
                </span>
                <span className="font-mono text-xs text-accent whitespace-nowrap">OPEN →</span>
              </Link>
            );
          })}
        </section>
      ))}
    </div>
  );
}
