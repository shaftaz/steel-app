"use client";

import Link from "next/link";
import { useState } from "react";

const NAV_ITEMS = [
  { label: "Calculators", href: "/calculators" },
  { label: "Weight Calculator", href: "/calculator" },
  { label: "Insights & Reports", href: "/articles" },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

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
          {NAV_ITEMS.map((item) => (
            <Link key={item.label} href={item.href}
              className="px-3 py-1.5 rounded-md text-xs font-medium no-underline text-white/40 hover:text-white/70 hover:bg-white/[0.04] transition-all whitespace-nowrap">
              {item.label}
            </Link>
          ))}
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
        <div className="md:hidden border-t border-white/[0.04] bg-[rgba(7,14,27,0.95)] backdrop-blur-xl px-4 py-3 space-y-1">
          {NAV_ITEMS.map((item) => (
            <Link key={item.label} href={item.href} onClick={() => setMobileOpen(false)}
              className="block px-3 py-2.5 rounded-lg text-sm text-white/50 hover:text-white/80 hover:bg-white/[0.04] no-underline transition-all">
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
