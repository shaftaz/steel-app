import type { Metadata } from "next";
import Link from "next/link";
import Calculator from "@/components/Calculator";

export const metadata: Metadata = {
  title:
    "Free Steel Weight Calculator — TMT Bar, Plate, Pipe, Angle, Beam | All Grades",
  description:
    "Calculate steel weight instantly for TMT bar (d²/162), plate, MS pipe, angle, channel, I-beam & flat bar. Supports MS, Fe500, SS304, SS316, Aluminium, Copper. Free online calculator with formulas, quick reference charts, and material density factors.",
  keywords: [
    "steel weight calculator",
    "steel weight calculator online",
    "tmt bar weight calculator",
    "steel plate weight calculator",
    "ms pipe weight calculator",
    "steel angle weight calculator",
    "steel beam weight calculator",
    "steel channel weight calculator",
    "d square by 162 formula",
    "steel weight formula",
    "steel density 7850",
    "rebar weight calculator",
    "tmt weight per metre",
    "12mm tmt bar weight",
    "steel calculation formula",
    "steel weight per foot",
    "ms flat weight calculator",
  ],
  alternates: { canonical: "https://steelmath.com/calculator" },
  openGraph: {
    title: "Free Steel Weight Calculator — All Sections & Grades | SteelMath",
    description:
      "Calculate steel weight for TMT bar, plate, pipe, angle & beam. Free, instant, accurate. Supports all common steel grades.",
    url: "https://steelmath.com/calculator",
    type: "website",
  },
};

const QUICK_REF = [
  { size: "8mm TMT", weight: "0.395 kg/m" },
  { size: "10mm TMT", weight: "0.617 kg/m" },
  { size: "12mm TMT", weight: "0.889 kg/m" },
  { size: "16mm TMT", weight: "1.580 kg/m" },
  { size: "20mm TMT", weight: "2.469 kg/m" },
  { size: "25mm TMT", weight: "3.858 kg/m" },
  { size: "32mm TMT", weight: "6.324 kg/m" },
];

const FORMULAS = [
  { name: "Round Bar / TMT", formula: "d² ÷ 162.2 × Length (m)" },
  { name: "Plate / Sheet", formula: "L × W × T × 7.85 ÷ 1,000,000 (mm)" },
  { name: "MS Pipe", formula: "(OD − WT) × WT × 0.02466 (mm, kg/m)" },
  { name: "Square Tube", formula: "(S − WT) × WT × 4 × 0.00785 (mm, kg/m)" },
  { name: "Angle", formula: "(A + B − T) × T × 0.00785 (mm, kg/m)" },
  { name: "Flat Bar", formula: "W × T × 0.00785 (mm, kg/m)" },
];

export default function CalculatorPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "SteelMath Steel Weight Calculator",
    url: "https://steelmath.com/calculator",
    applicationCategory: "BusinessApplication",
    operatingSystem: "Any",
    offers: { "@type": "Offer", price: "0", priceCurrency: "INR" },
    description:
      "Free online steel weight calculator supporting round bar, TMT, plate, pipe, angle, channel, beam, flat bar. All common steel grades included.",
    featureList: [
      "Round bar / TMT weight (d²/162 formula)",
      "Steel plate & sheet weight by dimensions",
      "MS pipe weight by OD and wall thickness",
      "Angle section weight (equal & unequal)",
      "Square & rectangular tube weight",
      "Flat bar weight calculation",
      "Multiple material grades: MS, Fe500, SS304, SS316, Aluminium, Copper",
      "WhatsApp share, download & print results",
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="relative z-10 max-w-[1400px] mx-auto px-4 sm:px-5 py-5">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-white/25 hover:text-accent text-xs no-underline transition-colors mb-5"
        >
          ← Back to Dashboard
        </Link>

        <h1 className="text-white text-2xl sm:text-3xl font-bold mb-5 tracking-tight">
          Steel Weight Calculator
          <span className="block text-white/30 text-sm font-normal mt-1.5">
            Free online calculator for TMT bar, plate, pipe, angle, channel &amp; beam — all grades
          </span>
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
          {/* Calculator — 2/3 width */}
          <div className="lg:col-span-2">
            <Calculator />
          </div>

          {/* Sidebar — 1/3 width */}
          <div className="space-y-3">
            {/* Quick reference */}
            <div className="glass-panel glass-panel-hover p-5">
              <h2 className="text-white font-bold text-sm mb-3">
                TMT Bar Quick Reference
              </h2>
              <div className="space-y-1.5">
                {QUICK_REF.map((row) => (
                  <div
                    key={row.size}
                    className="flex justify-between text-xs py-1.5 border-b border-white/[0.03] last:border-0"
                  >
                    <span className="text-white/45">{row.size}</span>
                    <span className="text-white/70 font-semibold">
                      {row.weight}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Formulas */}
            <div className="glass-panel glass-panel-hover p-5">
              <h2 className="text-white font-bold text-sm mb-3">
                Common Formulas
              </h2>
              <div className="space-y-2">
                {FORMULAS.map((f) => (
                  <div
                    key={f.name}
                    className="py-1.5 border-b border-white/[0.03] last:border-0"
                  >
                    <div className="text-accent/70 text-[11px] font-semibold uppercase tracking-wider">
                      {f.name}
                    </div>
                    <div className="text-white/50 text-xs font-mono mt-0.5">
                      {f.formula}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Material factors */}
            <div className="glass-panel glass-panel-hover p-5">
              <h2 className="text-white font-bold text-sm mb-3">
                Material Density Factors
              </h2>
              <div className="space-y-1.5">
                {[
                  {
                    mat: "Mild Steel",
                    density: "7,850 kg/m³",
                    factor: "1.000",
                  },
                  { mat: "SS 304", density: "8,000 kg/m³", factor: "1.019" },
                  { mat: "SS 316", density: "8,027 kg/m³", factor: "1.023" },
                  {
                    mat: "Aluminium",
                    density: "2,700 kg/m³",
                    factor: "0.344",
                  },
                  { mat: "Copper", density: "8,940 kg/m³", factor: "1.139" },
                ].map((m) => (
                  <div
                    key={m.mat}
                    className="flex items-center justify-between text-xs py-1.5 border-b border-white/[0.03] last:border-0"
                  >
                    <span className="text-white/45">{m.mat}</span>
                    <div className="flex items-center gap-3">
                      <span className="text-white/30">{m.density}</span>
                      <span className="text-accent/60 font-bold">
                        ×{m.factor}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Related articles for internal linking */}
            <div className="glass-panel glass-panel-hover p-5">
              <h2 className="text-white font-bold text-sm mb-3">
                Related Guides
              </h2>
              <div className="space-y-2.5">
                <Link
                  href="/articles/steel-weight-calculator-guide"
                  className="block text-white/40 hover:text-accent text-xs no-underline transition-colors"
                >
                  Steel Weight Calculator — Complete Guide With Formulas →
                </Link>
                <Link
                  href="/articles/tmt-bar-weight-per-metre-chart"
                  className="block text-white/40 hover:text-accent text-xs no-underline transition-colors"
                >
                  TMT Bar Weight Per Metre — Chart for All Sizes →
                </Link>
                <Link
                  href="/articles/ms-pipe-weight-calculator-chart"
                  className="block text-white/40 hover:text-accent text-xs no-underline transition-colors"
                >
                  MS Pipe Weight Calculator — Formula &amp; All Sizes →
                </Link>
                <Link
                  href="/articles/steel-plate-weight-calculator-thickness-chart"
                  className="block text-white/40 hover:text-accent text-xs no-underline transition-colors"
                >
                  Steel Plate Weight — Formula &amp; Thickness Chart →
                </Link>
                <Link
                  href="/articles/steel-angle-weight-chart-sizes-formula"
                  className="block text-white/40 hover:text-accent text-xs no-underline transition-colors"
                >
                  Steel Angle Weight Chart — All Sizes &amp; Formula →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
