"use client";

import Link from "next/link";
import { useState, useRef, useEffect } from "react";

const CALC_CATEGORIES = [
  {
    label: "Bars & Rebar",
    items: [
      { href: "/calculators/tmt", label: "TMT Bar Calculator" },
      { href: "/calculators/round-bar-weight", label: "Round Bar Calculator" },
      { href: "/calculators/flat-bar-weight", label: "Flat Bar Calculator" },
      { href: "/calculators/rebar", label: "Rebar Calculator" },
    ],
  },
  {
    label: "Plates & Sheets",
    items: [
      { href: "/calculators/steel-plate", label: "Steel Plate Calculator" },
      { href: "/calculators/chequered-plate-weight", label: "Chequered Plate Calculator" },
    ],
  },
  {
    label: "Tubes & Pipes",
    items: [
      { href: "/calculators/pipe-weight", label: "MS Pipe Calculator" },
      { href: "/calculators/square-tube-weight", label: "Square Tube (SHS)" },
      { href: "/calculators/rect-tube-weight", label: "Rectangular Tube (RHS)" },
    ],
  },
  {
    label: "Structural Sections",
    items: [
      { href: "/calculators/angle-weight", label: "Steel Angle Calculator" },
      { href: "/calculators/beam-weight", label: "I-Beam (ISMB) Calculator" },
      { href: "/calculators/channel-weight", label: "Channel (ISMC) Calculator" },
    ],
  },
  {
    label: "Scrap & Melting",
    items: [
      { href: "/calculators/scrap-yield", label: "Scrap Yield Calculator" },
      { href: "/calculators/scrap-production-cost", label: "Scrap-to-Steel Production Cost" },
    ],
  },
  {
    label: "Specialty",
    items: [
      { href: "/calculators/stainless-steel-weight", label: "Stainless Steel Calculator" },
      { href: "/calculators/metal-weight", label: "Metal Weight Calculator" },
      { href: "/calculators/gauge-to-mm", label: "Gauge to MM Converter" },
      { href: "/calculators/hardness-conversion", label: "Hardness Conversion" },
      { href: "/calculators/credit-cost", label: "Credit Cost Calculator" },
    ],
  },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [calcOpen, setCalcOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setCalcOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="sticky top-0 z-50 bg-[rgba(7,14,27,0.9)] backdrop-blur-xl border-b border-white/[0.06]">
      <div className="max-w-[1400px] mx-auto px-3 sm:px-4 py-2.5 flex items-center gap-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 no-underline shrink-0">
          <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-accent to-teal flex items-center justify-center text-[#070e1b] font-extrabold text-sm">
            SM
          </div>
          <span className="text-white font-bold text-lg tracking-tight hidden sm:block">
            STEEL<span className="text-accent">MATH</span><span className="text-white/25 font-normal text-base">.COM</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1 flex-1">
          <div ref={dropdownRef} className="relative">
            <button
              onClick={() => setCalcOpen(!calcOpen)}
              className="px-3 py-1.5 rounded-md text-xs font-medium text-white/40 hover:text-white/70 hover:bg-white/[0.04] transition-all whitespace-nowrap cursor-pointer flex items-center gap-1"
            >
              Calculators
              <svg className={`w-3 h-3 transition-transform ${calcOpen ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path d="M19 9l-7 7-7-7" /></svg>
            </button>
            {calcOpen && (
              <div className="absolute top-full left-0 mt-1 bg-[rgba(7,14,27,0.97)] backdrop-blur-xl border border-white/10 rounded-lg shadow-2xl p-4 min-w-[640px] grid grid-cols-3 gap-x-5 gap-y-4 z-50">
                {CALC_CATEGORIES.map((cat) => (
                  <div key={cat.label}>
                    <div className="text-white/25 text-[10px] uppercase tracking-wider font-semibold mb-1.5">{cat.label}</div>
                    {cat.items.map((item) => (
                      <Link key={item.href} href={item.href} onClick={() => setCalcOpen(false)}
                        className="block px-2 py-1.5 rounded text-xs text-white/50 hover:text-accent hover:bg-white/[0.04] no-underline transition-all">
                        {item.label}
                      </Link>
                    ))}
                  </div>
                ))}
                <div className="col-span-3 border-t border-white/[0.06] pt-2 mt-1">
                  <Link href="/calculators" onClick={() => setCalcOpen(false)}
                    className="block px-2 py-1.5 rounded text-xs text-accent/70 hover:text-accent hover:bg-white/[0.04] no-underline transition-all font-medium">
                    View All Calculators &rarr;
                  </Link>
                </div>
              </div>
            )}
          </div>
          <Link href="/calculator"
            className="px-3 py-1.5 rounded-md text-xs font-medium no-underline text-white/40 hover:text-white/70 hover:bg-white/[0.04] transition-all whitespace-nowrap">
            Weight Calculator
          </Link>
          <Link href="/articles"
            className="px-3 py-1.5 rounded-md text-xs font-medium no-underline text-white/40 hover:text-white/70 hover:bg-white/[0.04] transition-all whitespace-nowrap">
            Insights &amp; Reports
          </Link>
        </nav>

        <div className="flex-1 md:hidden" />

        {/* Mobile hamburger */}
        <button onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden p-1.5 rounded-md hover:bg-white/[0.04] transition-colors cursor-pointer text-white/40">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            {mobileOpen
              ? <path d="M6 18L18 6M6 6l12 12" />
              : <path d="M4 6h16M4 12h16M4 18h16" />
            }
          </svg>
        </button>
      </div>

      {/* Mobile nav drawer */}
      {mobileOpen && (
        <div className="md:hidden border-t border-white/[0.04] bg-[rgba(7,14,27,0.95)] backdrop-blur-xl px-4 py-3 space-y-3 max-h-[80vh] overflow-y-auto">
          {CALC_CATEGORIES.map((cat) => (
            <div key={cat.label}>
              <div className="text-white/25 text-[10px] uppercase tracking-wider font-semibold px-3 mb-1">{cat.label}</div>
              {cat.items.map((item) => (
                <Link key={item.href} href={item.href} onClick={() => setMobileOpen(false)}
                  className="block px-3 py-2 rounded-lg text-sm text-white/50 hover:text-white/80 hover:bg-white/[0.04] no-underline transition-all">
                  {item.label}
                </Link>
              ))}
            </div>
          ))}
          <div className="border-t border-white/[0.06] pt-2">
            <Link href="/calculators" onClick={() => setMobileOpen(false)}
              className="block px-3 py-2 rounded-lg text-sm text-accent/70 hover:text-accent no-underline transition-all font-medium">
              View All Calculators &rarr;
            </Link>
            <Link href="/calculator" onClick={() => setMobileOpen(false)}
              className="block px-3 py-2 rounded-lg text-sm text-white/50 hover:text-white/80 hover:bg-white/[0.04] no-underline transition-all">
              Weight Calculator
            </Link>
            <Link href="/articles" onClick={() => setMobileOpen(false)}
              className="block px-3 py-2 rounded-lg text-sm text-white/50 hover:text-white/80 hover:bg-white/[0.04] no-underline transition-all">
              Insights &amp; Reports
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
