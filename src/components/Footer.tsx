import Link from "next/link";

export default function Footer() {
  return (
    <footer className="relative z-10 mt-8 border-t border-white/[0.04]">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-5 py-6">
        {/* Top row: logo + nav links */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-md bg-gradient-to-br from-accent/20 to-teal/20 border border-accent/20 flex items-center justify-center text-accent font-bold text-[10px]">
              SM
            </div>
            <span className="text-white/30 text-xs">
              <span className="font-semibold text-white/45">SteelMath</span> —
              Steel calculations &amp; market intelligence for professionals
            </span>
          </div>
          <nav className="flex items-center gap-5">
            <Link
              href="/"
              className="text-white/25 hover:text-white/50 no-underline text-xs transition-colors"
            >
              Home
            </Link>
            <Link
              href="/calculators"
              className="text-white/25 hover:text-white/50 no-underline text-xs transition-colors"
            >
              Calculators
            </Link>
            <Link
              href="/calculator"
              className="text-white/25 hover:text-white/50 no-underline text-xs transition-colors"
            >
              Weight Calculator
            </Link>
            <Link
              href="/articles"
              className="text-white/25 hover:text-white/50 no-underline text-xs transition-colors"
            >
              Insights
            </Link>
          </nav>
        </div>

        {/* Middle row: popular article links for SEO internal linking */}
        <div className="mt-4 pt-4 border-t border-white/[0.03]">
          <div className="text-white/20 text-[11px] font-semibold uppercase tracking-wider mb-2">
            Popular Guides &amp; Tools
          </div>
          <div className="flex flex-wrap gap-x-5 gap-y-1.5">
            <Link
              href="/calculators/tmt"
              className="text-white/20 hover:text-white/40 text-[11px] no-underline transition-colors"
            >
              TMT Bar Calculator
            </Link>
            <Link
              href="/calculators/steel-plate"
              className="text-white/20 hover:text-white/40 text-[11px] no-underline transition-colors"
            >
              Steel Plate Calculator
            </Link>
            <Link
              href="/articles/tmt-bar-weight-per-metre-chart"
              className="text-white/20 hover:text-white/40 text-[11px] no-underline transition-colors"
            >
              TMT Bar Weight Chart
            </Link>
            <Link
              href="/articles/ms-pipe-weight-calculator-chart"
              className="text-white/20 hover:text-white/40 text-[11px] no-underline transition-colors"
            >
              MS Pipe Weight Chart
            </Link>
            <Link
              href="/articles/steel-plate-weight-calculator-thickness-chart"
              className="text-white/20 hover:text-white/40 text-[11px] no-underline transition-colors"
            >
              Steel Plate Weight Chart
            </Link>
            <Link
              href="/articles/steel-angle-weight-chart-sizes-formula"
              className="text-white/20 hover:text-white/40 text-[11px] no-underline transition-colors"
            >
              Steel Angle Weight Chart
            </Link>
            <Link
              href="/articles/steel-weight-calculator-guide"
              className="text-white/20 hover:text-white/40 text-[11px] no-underline transition-colors"
            >
              Weight Calculator Guide
            </Link>
            <Link
              href="/articles/gst-steel-products-india-rates-itc"
              className="text-white/20 hover:text-white/40 text-[11px] no-underline transition-colors"
            >
              GST on Steel
            </Link>
            <Link
              href="/articles/safeguard-duty-steel-imports-india-2026"
              className="text-white/20 hover:text-white/40 text-[11px] no-underline transition-colors"
            >
              Safeguard Duty Guide
            </Link>
            <Link
              href="/articles/how-to-read-mill-price-circular-steel-india"
              className="text-white/20 hover:text-white/40 text-[11px] no-underline transition-colors"
            >
              Mill Price Circular Guide
            </Link>
            <Link
              href="/articles/india-steel-demand-story-not-china-2026"
              className="text-white/20 hover:text-white/40 text-[11px] no-underline transition-colors"
            >
              India Steel Demand Story
            </Link>
          </div>
        </div>

        {/* Bottom row: copyright */}
        <div className="mt-4 pt-4 border-t border-white/[0.03] text-center text-white/15 text-[11px]">
          &copy; 2026 SteelMath. All rights reserved. Developed by MetalX.
        </div>
      </div>
    </footer>
  );
}
