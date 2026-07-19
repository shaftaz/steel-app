import Link from "next/link";

const FOOTER_COLS: { heading: string; links: { href: string; label: string }[] }[] = [
  {
    heading: "CALCULATORS",
    links: [
      { href: "/calculator", label: "Steel Weight Calculator" },
      { href: "/calculators/tmt", label: "TMT Bar Calculator" },
      { href: "/calculators/steel-plate", label: "Steel Plate Calculator" },
      { href: "/calculators/scrap-yield", label: "Scrap Yield Calculator" },
      { href: "/calculators/scrap-production-cost", label: "Steel Production Cost Calculator" },
      { href: "/calculators", label: "All Calculators" },
    ],
  },
  {
    heading: "CBAM HUB",
    links: [
      { href: "/cbam", label: "CBAM Hub Overview" },
      { href: "/cbam/calculator", label: "CBAM Liability Calculator" },
      { href: "/cbam#doors", label: "Exporter Guide" },
      { href: "/cbam#doors", label: "EU Importer Guide" },
      { href: "/cbam#prices", label: "Certificate Prices" },
      { href: "/cbam#countries", label: "Country Playbooks" },
      { href: "/articles/cbam-indian-steel-exports-2026", label: "CBAM & Indian Steel Exports" },
    ],
  },
  {
    heading: "WEIGHT CHARTS",
    links: [
      { href: "/articles/tmt-bar-weight-per-metre-chart", label: "TMT Bar Weight Chart" },
      { href: "/articles/ms-pipe-weight-calculator-chart", label: "MS Pipe Weight Chart" },
      { href: "/articles/steel-plate-weight-calculator-thickness-chart", label: "Steel Plate Weight Chart" },
      { href: "/articles/steel-angle-weight-chart-sizes-formula", label: "Steel Angle Weight Chart" },
      { href: "/articles/steel-weight-calculator-guide", label: "Weight Calculator Guide" },
      { href: "/articles/how-to-calculate-weight-of-steel-formula-guide", label: "Formula Guide — All Sections" },
      { href: "/articles/hollow-vs-solid-steel-sections-structural-efficiency", label: "Hollow vs Solid Steel Sections" },
    ],
  },
  {
    heading: "POLICY & TRADE",
    links: [
      { href: "/articles/gst-steel-products-india-rates-itc", label: "GST on Steel" },
      { href: "/articles/safeguard-duty-steel-imports-india-2026", label: "Safeguard Duty Guide" },
      { href: "/articles/anti-dumping-duty-steel-imports-india-2026-active-cases", label: "Anti-Dumping Duty Tracker" },
      { href: "/articles/bis-certification-steel-imports-india-2026-complete-guide", label: "BIS Certification Guide" },
      { href: "/articles/how-to-read-mill-price-circular-steel-india", label: "Mill Price Circular Guide" },
      { href: "/articles/steel-scrap-grades-classification-guide", label: "Steel Scrap Grades Guide" },
    ],
  },
  {
    heading: "ANALYSIS",
    links: [
      { href: "/articles/india-steel-scrap-deficit-47-million-tonnes-fy26-analysis", label: "India's Scrap Deficit Analysis" },
      { href: "/articles/rinl-vizag-steel-plant-revival-2026-complete-story", label: "RINL Vizag Turnaround" },
      { href: "/articles/india-steel-demand-story-not-china-2026", label: "India Steel Demand Story" },
      { href: "/articles/can-india-control-global-steel-pricing-2030", label: "The Volume Trap" },
      { href: "/articles/moil-manganese-ore-price-hike-april-2026-steel-impact", label: "MOIL Manganese Hike" },
      { href: "/articles", label: "All Articles →" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="relative z-10 mt-8 bg-paper border-t border-ink">
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 pt-11 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-7">
        {/* Brand column */}
        <div className="col-span-2 md:col-span-3 lg:col-span-1">
          <div className="flex items-baseline gap-1.5 mb-3">
            <span className="text-ink font-extrabold text-[19px] tracking-tight">
              Steel<span className="text-accent">Math</span>
            </span>
            <span className="font-mono text-[10px] text-muted-3 tracking-[0.08em]">.COM</span>
          </div>
          <p className="text-[12.5px] leading-relaxed text-muted-2 mb-4 max-w-[220px]">
            SteelMath — Steel calculations &amp; market intelligence for professionals
          </p>
          <div className="flex flex-col gap-2 text-[13px]">
            <Link href="/" className="text-muted hover:text-accent no-underline transition-colors">Home</Link>
            <Link href="/calculators" className="text-muted hover:text-accent no-underline transition-colors">All Calculators</Link>
            <Link href="/cbam" className="text-muted hover:text-accent no-underline transition-colors">CBAM Hub</Link>
            <Link href="/articles" className="text-muted hover:text-accent no-underline transition-colors">Insights &amp; Reports</Link>
          </div>
        </div>

        {FOOTER_COLS.map((col) => (
          <div key={col.heading}>
            <div className="font-mono text-[10.5px] tracking-[0.14em] text-muted-3 mb-3.5">{col.heading}</div>
            <div className="flex flex-col gap-2">
              {col.links.map((l) => (
                <Link key={l.label} href={l.href}
                  className="text-[12.5px] text-muted hover:text-accent no-underline transition-colors">
                  {l.label}
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Bottom strip */}
      <div className="max-w-[1320px] mx-auto mt-8 px-4 sm:px-6 py-3.5 border-t border-rule flex justify-between items-center flex-wrap gap-2">
        <span className="font-mono text-[10.5px] text-muted-3">
          &copy; 2026 SteelMath. All rights reserved. Developed by MetalX.
        </span>
        <span className="font-mono text-[10.5px] text-muted-3">
          ρ MS = 7,850 KG/M³ · d² ÷ 162.2 · CBAM Q2 €75.28
        </span>
      </div>
    </footer>
  );
}
