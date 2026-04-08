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

const TMT_TABLE = [
  { dia: 6, kgm: 0.222 },
  { dia: 8, kgm: 0.395 },
  { dia: 10, kgm: 0.617 },
  { dia: 12, kgm: 0.889 },
  { dia: 16, kgm: 1.580 },
  { dia: 20, kgm: 2.469 },
  { dia: 25, kgm: 3.858 },
  { dia: 28, kgm: 4.834 },
  { dia: 32, kgm: 6.316 },
  { dia: 36, kgm: 7.990 },
  { dia: 40, kgm: 9.864 },
];

const PLATE_TABLE = [
  { t: 3, kgm2: 23.55 },
  { t: 5, kgm2: 39.25 },
  { t: 6, kgm2: 47.10 },
  { t: 8, kgm2: 62.80 },
  { t: 10, kgm2: 78.50 },
  { t: 12, kgm2: 94.20 },
  { t: 16, kgm2: 125.60 },
  { t: 20, kgm2: 157.00 },
  { t: 25, kgm2: 196.25 },
  { t: 32, kgm2: 251.20 },
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

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://steelmath.com",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Calculators",
        item: "https://steelmath.com/calculators",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "Steel Weight Calculator",
        item: "https://steelmath.com/calculator",
      },
    ],
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "How to calculate steel weight?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Steel weight depends on the section type. For round bars/TMT: Weight (kg/m) = d² ÷ 162.2, where d is the diameter in mm. For plates: Weight (kg) = Length × Width × Thickness × 7.85 ÷ 1,000,000 (all in mm). For pipes: Weight (kg/m) = (OD − Wall Thickness) × Wall Thickness × 0.02466. The standard density of mild steel is 7,850 kg/m³ (7.85 g/cm³).",
        },
      },
      {
        "@type": "Question",
        name: "What is the d²/162 formula for TMT bar weight?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "The d²/162 formula (more precisely d²/162.2) calculates the weight of round steel bars per metre. Divide the square of the diameter (in mm) by 162.2 to get the weight in kg per metre. For example, a 12mm TMT bar weighs 12² ÷ 162.2 = 0.889 kg/m. This formula is derived from the cross-sectional area of a circle multiplied by the density of steel (7,850 kg/m³).",
        },
      },
      {
        "@type": "Question",
        name: "What is the density of mild steel?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "The density of mild steel (MS) is 7,850 kg/m³ or 7.85 g/cm³. Stainless steel SS304 has a density of 8,000 kg/m³, and SS316 is 8,027 kg/m³. Aluminium is 2,700 kg/m³ and copper is 8,940 kg/m³. SteelMath's calculator supports all these materials with accurate density factors.",
        },
      },
      {
        "@type": "Question",
        name: "How much does a 12mm TMT bar weigh?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "A 12mm TMT bar weighs 0.889 kg per metre. A standard 12-metre length bar weighs approximately 10.67 kg. This is calculated using the formula: 12² ÷ 162.2 = 0.889 kg/m. For Fe500/Fe500D grade TMT bars commonly used in construction, the weight remains the same as the grade affects strength, not density.",
        },
      },
      {
        "@type": "Question",
        name: "How to calculate steel plate weight in kg?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Steel plate weight (kg) = Length (mm) × Width (mm) × Thickness (mm) × 7.85 ÷ 1,000,000. For example, a 2000mm × 1000mm × 10mm MS plate weighs: 2000 × 1000 × 10 × 7.85 ÷ 1,000,000 = 157 kg. You can also use the quick formula: Thickness (mm) × 7.85 = weight per square metre (kg/m²).",
        },
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <div className="relative z-10 max-w-[1400px] mx-auto px-4 sm:px-5 py-5">
        {/* Breadcrumb navigation */}
        <nav
          aria-label="Breadcrumb"
          className="flex items-center gap-1.5 text-white/25 text-xs mb-5"
        >
          <Link
            href="/"
            className="hover:text-accent no-underline transition-colors"
          >
            Home
          </Link>
          <span>/</span>
          <Link
            href="/calculators"
            className="hover:text-accent no-underline transition-colors"
          >
            Calculators
          </Link>
          <span>/</span>
          <span className="text-white/35">Steel Weight Calculator</span>
        </nav>

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

            {/* Dedicated calculators */}
            <div className="glass-panel glass-panel-hover p-5">
              <h2 className="text-white font-bold text-sm mb-3">
                Dedicated Calculators
              </h2>
              <div className="space-y-2.5">
                <Link
                  href="/calculators/tmt"
                  className="block text-white/40 hover:text-accent text-xs no-underline transition-colors"
                >
                  TMT Bar Weight Calculator — Per Metre Chart →
                </Link>
                <Link
                  href="/calculators/steel-plate"
                  className="block text-white/40 hover:text-accent text-xs no-underline transition-colors"
                >
                  Steel Plate Weight Calculator — Thickness Chart →
                </Link>
                <Link
                  href="/calculators"
                  className="block text-white/40 hover:text-accent text-xs no-underline transition-colors"
                >
                  All Calculators →
                </Link>
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

        {/* Full TMT Weight Reference Table */}
        <section className="mt-8">
          <h2 className="text-white font-bold text-lg sm:text-xl mb-4 tracking-tight">
            TMT Bar Weight Chart — All Standard Sizes
          </h2>
          <div className="glass-panel overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/[0.06]">
                    <th className="text-left text-white/50 font-semibold text-xs uppercase tracking-wider px-5 py-3">Diameter (mm)</th>
                    <th className="text-right text-white/50 font-semibold text-xs uppercase tracking-wider px-5 py-3">Weight per Metre (kg/m)</th>
                    <th className="text-right text-white/50 font-semibold text-xs uppercase tracking-wider px-5 py-3">Weight per Foot (kg/ft)</th>
                    <th className="text-right text-white/50 font-semibold text-xs uppercase tracking-wider px-5 py-3">Weight per 12m Bar (kg)</th>
                  </tr>
                </thead>
                <tbody>
                  {TMT_TABLE.map((row) => (
                    <tr key={row.dia} className="border-b border-white/[0.03] hover:bg-white/[0.02]">
                      <td className="text-white/60 px-5 py-2.5 font-medium">{row.dia} mm</td>
                      <td className="text-white/70 text-right px-5 py-2.5 font-semibold">{row.kgm.toFixed(3)}</td>
                      <td className="text-white/50 text-right px-5 py-2.5">{(row.kgm * 0.3048).toFixed(3)}</td>
                      <td className="text-white/50 text-right px-5 py-2.5">{(row.kgm * 12).toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="px-5 py-3 border-t border-white/[0.04] text-white/20 text-[11px]">
              Formula: d&sup2; &divide; 162.2 = kg/m &middot; Based on steel density 7,850 kg/m&sup3;
            </div>
          </div>
        </section>

        {/* Steel Plate Weight Reference Table */}
        <section className="mt-6">
          <h2 className="text-white font-bold text-lg sm:text-xl mb-4 tracking-tight">
            Steel Plate Weight Chart — By Thickness
          </h2>
          <div className="glass-panel overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/[0.06]">
                    <th className="text-left text-white/50 font-semibold text-xs uppercase tracking-wider px-5 py-3">Thickness (mm)</th>
                    <th className="text-right text-white/50 font-semibold text-xs uppercase tracking-wider px-5 py-3">Weight per m&sup2; (kg)</th>
                    <th className="text-right text-white/50 font-semibold text-xs uppercase tracking-wider px-5 py-3">2500&times;1250 mm Plate (kg)</th>
                    <th className="text-right text-white/50 font-semibold text-xs uppercase tracking-wider px-5 py-3">2000&times;1000 mm Plate (kg)</th>
                  </tr>
                </thead>
                <tbody>
                  {PLATE_TABLE.map((row) => (
                    <tr key={row.t} className="border-b border-white/[0.03] hover:bg-white/[0.02]">
                      <td className="text-white/60 px-5 py-2.5 font-medium">{row.t} mm</td>
                      <td className="text-white/70 text-right px-5 py-2.5 font-semibold">{row.kgm2.toFixed(2)}</td>
                      <td className="text-white/50 text-right px-5 py-2.5">{(row.kgm2 * 2.5 * 1.25).toFixed(1)}</td>
                      <td className="text-white/50 text-right px-5 py-2.5">{(row.kgm2 * 2.0 * 1.0).toFixed(1)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="px-5 py-3 border-t border-white/[0.04] text-white/20 text-[11px]">
              Formula: Thickness (mm) &times; 7.85 = kg/m&sup2; &middot; Based on mild steel density 7,850 kg/m&sup3;
            </div>
          </div>
        </section>

        {/* How Steel Weight Calculation Works — SEO content */}
        <section className="mt-8">
          <div className="glass-panel p-6 sm:p-8">
            <h2 className="text-white font-bold text-lg mb-4">
              How Steel Weight Calculation Works
            </h2>
            <div className="space-y-4 text-white/40 text-sm leading-relaxed">
              <p>
                Steel weight calculation is essential for construction estimation, logistics planning, and material procurement across India. The weight of any steel section depends on three factors: the <strong className="text-white/60">cross-sectional area</strong>, the <strong className="text-white/60">length</strong>, and the <strong className="text-white/60">density of the material</strong> (7,850 kg/m&sup3; for mild steel).
              </p>
              <h3 className="text-white/60 font-semibold text-sm">Round Bar &amp; TMT Rebar: d&sup2;/162 Formula</h3>
              <p>
                The most commonly used formula in steel construction is <strong className="text-white/60">d&sup2; &divide; 162.2</strong>, where d is the bar diameter in mm. This gives weight in kg per metre. For example, a 16mm TMT bar: 16&sup2; &divide; 162.2 = <strong className="text-white/60">1.580 kg/m</strong>. A standard 12-metre bar weighs 18.96 kg. This formula is derived from the circular cross-section area (&pi;d&sup2;/4) multiplied by the density of steel.
              </p>
              <h3 className="text-white/60 font-semibold text-sm">Steel Plate &amp; Sheet</h3>
              <p>
                For flat products, use: <strong className="text-white/60">Weight (kg) = L &times; W &times; T &times; 7.85 &divide; 1,000,000</strong> (all dimensions in mm). A quicker method: <strong className="text-white/60">Thickness (mm) &times; 7.85 = weight per square metre</strong>. So a 10mm plate weighs 78.5 kg/m&sup2;.
              </p>
              <h3 className="text-white/60 font-semibold text-sm">MS Pipe</h3>
              <p>
                For hollow round sections: <strong className="text-white/60">Weight (kg/m) = (OD &minus; WT) &times; WT &times; 0.02466</strong>, where OD is outer diameter and WT is wall thickness, both in mm.
              </p>
            </div>
          </div>
        </section>

        {/* FAQ Section — visible on page for users */}
        <section className="mt-6">
          <div className="glass-panel p-6 sm:p-8">
            <h2 className="text-white font-bold text-lg mb-4">
              Frequently Asked Questions
            </h2>
            <div className="space-y-5">
              <div>
                <h3 className="text-white/60 font-semibold text-sm mb-1">How to calculate steel weight?</h3>
                <p className="text-white/35 text-sm leading-relaxed">
                  Use the appropriate formula for the section type. For round bars/TMT: d&sup2; &divide; 162.2 = kg/m. For plates: L &times; W &times; T &times; 7.85 &divide; 1,000,000. For pipes: (OD &minus; WT) &times; WT &times; 0.02466 = kg/m. All formulas assume mild steel density of 7,850 kg/m&sup3;.
                </p>
              </div>
              <div>
                <h3 className="text-white/60 font-semibold text-sm mb-1">What is the d&sup2;/162 formula?</h3>
                <p className="text-white/35 text-sm leading-relaxed">
                  The d&sup2;/162 formula (precisely d&sup2;/162.2) calculates TMT bar or round bar weight per metre. Square the diameter in mm, divide by 162.2, and you get kg/m. Example: 12mm bar = 144 &divide; 162.2 = 0.889 kg/m.
                </p>
              </div>
              <div>
                <h3 className="text-white/60 font-semibold text-sm mb-1">How much does a 12mm TMT bar weigh?</h3>
                <p className="text-white/35 text-sm leading-relaxed">
                  A 12mm TMT bar weighs 0.889 kg per metre. A standard 12-metre bar weighs approximately 10.67 kg. This applies to all grades (Fe500, Fe500D) as the grade affects strength, not weight.
                </p>
              </div>
              <div>
                <h3 className="text-white/60 font-semibold text-sm mb-1">What is the density of mild steel?</h3>
                <p className="text-white/35 text-sm leading-relaxed">
                  Mild steel density is 7,850 kg/m&sup3; (7.85 g/cm&sup3;). Stainless steel SS304 is 8,000 kg/m&sup3; and SS316 is 8,027 kg/m&sup3;. Our calculator adjusts automatically when you select a different grade.
                </p>
              </div>
              <div>
                <h3 className="text-white/60 font-semibold text-sm mb-1">How to calculate steel plate weight in kg?</h3>
                <p className="text-white/35 text-sm leading-relaxed">
                  Multiply Length &times; Width &times; Thickness (all in mm), then multiply by 7.85 and divide by 1,000,000. Quick shortcut: thickness in mm &times; 7.85 gives you weight per square metre in kg.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
