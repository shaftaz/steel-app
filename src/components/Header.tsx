"use client";

import Link from "next/link";
import { useState, useRef, useEffect, useCallback } from "react";

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
    label: "Import Compliance",
    items: [
      { href: "/articles/bis-certification-steel-imports-india-2026-complete-guide", label: "BIS Certification Guide" },
      { href: "/articles/anti-dumping-duty-steel-imports-india-2026-active-cases", label: "Anti-Dumping Duty Tracker" },
      { href: "/articles/safeguard-duty-steel-imports-india-2026", label: "Safeguard Duty Guide" },
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

const CMDK_TOOLS = [
  { label: "Steel Weight Calculator", meta: "TOOL", href: "/calculator" },
  { label: "TMT Bar Calculator", meta: "TOOL · d²/162", href: "/calculators/tmt" },
  { label: "Steel Plate Calculator", meta: "TOOL", href: "/calculators/steel-plate" },
  { label: "Scrap Yield Calculator", meta: "TOOL", href: "/calculators/scrap-yield" },
  { label: "Production Cost Calculator", meta: "TOOL", href: "/calculators/scrap-production-cost" },
  { label: "CBAM Hub — Exporter View", meta: "CBAM HUB", href: "/cbam" },
  { label: "CBAM Hub — EU Importer View", meta: "CBAM HUB", href: "/cbam" },
  { label: "CBAM Liability Calculator", meta: "CBAM HUB", href: "/cbam/calculator" },
  { label: "TMT Bar Weight Chart", meta: "CHART", href: "/articles/tmt-bar-weight-per-metre-chart" },
  { label: "MS Pipe Weight Chart", meta: "CHART · IS 1239", href: "/articles/ms-pipe-weight-calculator-chart" },
  { label: "Steel Plate Weight Chart", meta: "CHART", href: "/articles/steel-plate-weight-calculator-thickness-chart" },
  { label: "Steel Angle Weight Chart", meta: "CHART", href: "/articles/steel-angle-weight-chart-sizes-formula" },
  { label: "GST on Steel", meta: "GUIDE", href: "/articles/gst-steel-products-india-rates-itc" },
  { label: "All Insights & Reports", meta: "ARTICLES", href: "/articles" },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [calcOpen, setCalcOpen] = useState(false);
  const [cmdkOpen, setCmdkOpen] = useState(false);
  const [query, setQuery] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);
  const cmdkInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setCalcOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const openCmdk = useCallback(() => {
    setCmdkOpen(true);
    setQuery("");
  }, []);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setCmdkOpen((v) => !v);
        setQuery("");
      } else if (e.key === "Escape") {
        setCmdkOpen(false);
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    if (cmdkOpen) cmdkInputRef.current?.focus();
  }, [cmdkOpen]);

  const q = query.trim().toLowerCase();
  const filteredTools = q
    ? CMDK_TOOLS.filter((t) => (t.label + " " + t.meta).toLowerCase().includes(q))
    : CMDK_TOOLS;

  return (
    <header className="sticky top-0 z-50 bg-paper border-b border-rule">
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 py-2.5 flex items-center gap-4 lg:gap-7 flex-wrap">
        {/* Logo */}
        <Link href="/" className="flex items-baseline gap-1.5 no-underline shrink-0">
          <span className="text-ink font-extrabold text-lg tracking-tight">
            Steel<span className="text-accent">Math</span>
          </span>
          <span className="font-mono text-[10px] text-muted-3 tracking-[0.08em]">.COM</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-5 lg:gap-6">
          <div ref={dropdownRef} className="relative">
            <button
              onClick={() => setCalcOpen(!calcOpen)}
              aria-expanded={calcOpen}
              className="text-[13.5px] font-medium text-muted hover:text-ink transition-colors whitespace-nowrap cursor-pointer flex items-center gap-1 py-2"
            >
              Calculators
              <svg className={`w-3 h-3 transition-transform ${calcOpen ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path d="M19 9l-7 7-7-7" /></svg>
            </button>
            {calcOpen && (
              <div className="absolute top-full left-0 mt-0 bg-paper border border-ink p-5 min-w-[780px] grid grid-cols-4 gap-x-6 gap-y-4 z-50">
                {CALC_CATEGORIES.map((cat) => (
                  <div key={cat.label}>
                    <div className="font-mono text-muted-3 text-[10px] uppercase tracking-[0.12em] font-medium mb-2">{cat.label}</div>
                    {cat.items.map((item) => (
                      <Link key={item.href} href={item.href} onClick={() => setCalcOpen(false)}
                        className="block py-1.5 text-xs text-muted hover:text-accent no-underline transition-colors">
                        {item.label}
                      </Link>
                    ))}
                  </div>
                ))}
                <div className="col-span-4 border-t border-rule pt-2.5 mt-1">
                  <Link href="/calculators" onClick={() => setCalcOpen(false)}
                    className="block py-1 font-mono text-[11.5px] tracking-[0.06em] text-accent hover:text-ink no-underline transition-colors font-medium">
                    VIEW ALL CALCULATORS &rarr;
                  </Link>
                </div>
              </div>
            )}
          </div>
          <Link href="/cbam"
            className="text-[13.5px] font-medium no-underline text-muted hover:text-ink transition-colors whitespace-nowrap inline-flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 bg-cbam rounded-full inline-block" aria-hidden="true" />
            CBAM Hub
          </Link>
          <Link href="/articles"
            className="text-[13.5px] font-medium no-underline text-muted hover:text-ink transition-colors whitespace-nowrap">
            Insights &amp; Reports
          </Link>
        </nav>

        <div className="ml-auto flex items-center gap-3">
          {/* ⌘K search */}
          <button
            onClick={openCmdk}
            className="hidden sm:flex items-center gap-5 bg-[#FFFFFF] border border-rule text-muted-3 font-mono text-xs px-3 py-2 cursor-pointer hover:border-ink hover:text-ink transition-colors"
          >
            <span>Search tools…</span>
            <span className="border border-rule px-1.5 py-px text-[10.5px]">⌘K</span>
          </button>
          {/* Accent CTA — preserves the Weight Calculator link */}
          <Link href="/calculator"
            className="hidden md:inline-block btn-glow text-[13px] px-4 py-2 no-underline whitespace-nowrap">
            Weight Calculator
          </Link>

          {/* Mobile hamburger */}
          <button onClick={() => setMobileOpen(!mobileOpen)}
            aria-expanded={mobileOpen}
            aria-label="Menu"
            className="md:hidden p-1.5 cursor-pointer text-muted hover:text-ink transition-colors">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              {mobileOpen
                ? <path d="M6 18L18 6M6 6l12 12" />
                : <path d="M4 6h16M4 12h16M4 18h16" />
              }
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile nav drawer */}
      {mobileOpen && (
        <div className="md:hidden border-t border-rule bg-paper px-4 py-3 space-y-3 max-h-[80vh] overflow-y-auto">
          <Link href="/cbam" onClick={() => setMobileOpen(false)}
            className="flex items-center gap-2 px-3 py-2.5 text-sm font-semibold text-ink no-underline">
            <span className="w-1.5 h-1.5 bg-cbam rounded-full inline-block" aria-hidden="true" />
            CBAM Hub
          </Link>
          {CALC_CATEGORIES.map((cat) => (
            <div key={cat.label}>
              <div className="font-mono text-muted-3 text-[10px] uppercase tracking-[0.12em] font-medium px-3 mb-1">{cat.label}</div>
              {cat.items.map((item) => (
                <Link key={item.href} href={item.href} onClick={() => setMobileOpen(false)}
                  className="block px-3 py-2.5 text-sm text-muted hover:text-ink no-underline transition-colors">
                  {item.label}
                </Link>
              ))}
            </div>
          ))}
          <div className="border-t border-rule pt-2">
            <Link href="/calculators" onClick={() => setMobileOpen(false)}
              className="block px-3 py-2.5 text-sm text-accent no-underline font-medium">
              View All Calculators &rarr;
            </Link>
            <Link href="/calculator" onClick={() => setMobileOpen(false)}
              className="block px-3 py-2.5 text-sm text-muted hover:text-ink no-underline transition-colors">
              Weight Calculator
            </Link>
            <Link href="/articles" onClick={() => setMobileOpen(false)}
              className="block px-3 py-2.5 text-sm text-muted hover:text-ink no-underline transition-colors">
              Insights &amp; Reports
            </Link>
          </div>
        </div>
      )}

      {/* ⌘K switcher */}
      {cmdkOpen && (
        <div
          onClick={() => setCmdkOpen(false)}
          className="fixed inset-0 bg-[rgba(23,24,26,0.55)] z-[100] flex justify-center items-start pt-[14vh]"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-[min(580px,calc(100vw-32px))] bg-paper border border-ink"
          >
            <div className="flex items-center gap-3 border-b border-rule px-4">
              <span className="font-mono text-xs text-muted-3">→</span>
              <input
                ref={cmdkInputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search calculators, charts, CBAM tools…"
                className="flex-1 bg-transparent border-none outline-none font-mono text-sm text-ink py-3.5"
              />
              <button
                onClick={() => setCmdkOpen(false)}
                className="border border-rule text-muted-3 font-mono text-[10.5px] px-1.5 py-0.5 cursor-pointer"
              >
                ESC
              </button>
            </div>
            <div className="max-h-[380px] overflow-y-auto py-2">
              {filteredTools.map((t) => (
                <Link
                  key={t.label}
                  href={t.href}
                  onClick={() => setCmdkOpen(false)}
                  className="flex justify-between items-baseline px-4.5 py-2.5 text-ink hover:bg-[#FFFFFF] no-underline"
                >
                  <span className="text-sm font-semibold">{t.label}</span>
                  <span className="font-mono text-[10.5px] tracking-[0.08em] text-muted-3">{t.meta}</span>
                </Link>
              ))}
              {filteredTools.length === 0 && (
                <div className="p-4.5 font-mono text-xs text-muted-3">
                  NO MATCHES — TRY &quot;TMT&quot;, &quot;PLATE&quot;, &quot;CBAM&quot;…
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
