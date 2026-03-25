import type { Metadata } from "next";
import Link from "next/link";
import Calculator from "@/components/Calculator";

export const metadata: Metadata = {
  title:
    "TMT Bar Weight Calculator — Per Metre Chart for 8mm to 40mm | SteelMath",
  description:
    "Calculate TMT bar weight per metre, per foot & per bar using the d²/162 formula. Instant rebar weight calculator for 8mm, 10mm, 12mm, 16mm, 20mm, 25mm, 32mm & 40mm TMT bars. Free online tool with reference chart.",
  keywords: [
    "tmt bar weight calculator",
    "tmt bar weight per metre",
    "12mm tmt bar weight",
    "d square by 162",
    "d²/162 formula",
    "tmt bar weight chart",
    "rebar weight calculator",
    "tmt bar weight per foot",
    "10mm tmt bar weight per foot",
    "16mm tmt bar weight",
    "8mm tmt bar weight per metre",
    "tmt saria weight",
    "steel bar weight calculator",
    "20mm tmt bar weight",
    "25mm tmt bar weight per metre",
    "32mm tmt bar weight",
    "40mm tmt bar weight",
  ],
  alternates: { canonical: "https://steelmath.com/calculators/tmt" },
  openGraph: {
    title:
      "TMT Bar Weight Calculator — Per Metre Chart for 8mm to 40mm | SteelMath",
    description:
      "Calculate TMT bar weight instantly using d²/162 formula. Free chart covering 6mm to 40mm bars — weight per metre, per foot & per 12m bar.",
    url: "https://steelmath.com/calculators/tmt",
    type: "article",
  },
};

const TMT_SIZES = [6, 8, 10, 12, 16, 20, 25, 28, 32, 36, 40];

function kgPerMetre(d: number) {
  return (d * d) / 162.2;
}

function round4(n: number) {
  return Math.round(n * 10000) / 10000;
}

function fmt(n: number) {
  return n.toFixed(3);
}

const TABLE_DATA = TMT_SIZES.map((d) => {
  const perMetre = round4(kgPerMetre(d));
  const perFoot = round4(perMetre * 0.3048);
  const perBar = round4(perMetre * 12);
  return { d, perMetre, perFoot, perBar };
});

export default function TmtCalculatorPage() {
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
        name: "TMT Bar Calculator",
        item: "https://steelmath.com/calculators/tmt",
      },
    ],
  };

  const webAppJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "TMT Bar Weight Calculator",
    url: "https://steelmath.com/calculators/tmt",
    applicationCategory: "BusinessApplication",
    operatingSystem: "Any",
    offers: { "@type": "Offer", price: "0", priceCurrency: "INR" },
    description:
      "Free online TMT bar weight calculator using d²/162 formula. Covers all standard sizes from 6mm to 40mm with weight per metre, per foot and per 12m bar.",
    featureList: [
      "TMT bar weight using d²/162 formula",
      "Weight per metre, per foot, per bar",
      "All standard sizes: 6mm to 40mm",
      "Multiple material grades supported",
      "WhatsApp share, download & print results",
    ],
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "How much does a 12mm TMT bar weigh per metre?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "A 12mm TMT bar weighs approximately 0.888 kg per metre. This is calculated using the d²/162.2 formula: (12 × 12) / 162.2 = 0.888 kg/m. A standard 12-metre bar weighs about 10.656 kg.",
        },
      },
      {
        "@type": "Question",
        name: "What is the d²/162 formula?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "The d²/162 formula (more precisely d²/162.2) calculates the weight of a round steel bar per metre in kilograms. 'd' is the diameter in millimetres. It is derived from the cross-sectional area formula (π/4 × d²) multiplied by the density of steel (7,850 kg/m³) and unit conversions, which simplifies to d²/162.2.",
        },
      },
      {
        "@type": "Question",
        name: "How to calculate TMT bar weight for construction?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "To calculate TMT bar weight for construction: 1) Determine the bar diameter (e.g. 12mm). 2) Use the formula: Weight (kg/m) = d²/162.2. 3) Multiply by the total length in metres required. For example, 100 metres of 12mm TMT bar weighs (12²/162.2) × 100 = 88.78 kg.",
        },
      },
      {
        "@type": "Question",
        name: "What is the weight of 10mm TMT bar per foot?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "A 10mm TMT bar weighs approximately 0.188 kg per foot. This is derived from the per-metre weight of 0.617 kg/m multiplied by 0.3048 (the number of metres in one foot).",
        },
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <div className="relative z-10 max-w-[1400px] mx-auto px-4 sm:px-5 py-5">
        {/* Breadcrumb navigation */}
        <nav className="flex items-center gap-1.5 text-xs text-white/25 mb-5">
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
          <span className="text-white/50">TMT Bar Calculator</span>
        </nav>

        <h1 className="text-white text-2xl sm:text-3xl font-bold mb-5 tracking-tight">
          TMT Bar Weight Calculator — All Sizes, Per Metre &amp; Per Foot
          <span className="block text-white/30 text-sm font-normal mt-1.5">
            Instantly calculate TMT rebar weight using the d&sup2;/162 formula
            for 6mm to 40mm bars
          </span>
        </h1>

        {/* Calculator */}
        <div className="mb-8">
          <Calculator />
        </div>

        {/* TMT Weight Reference Table */}
        <section className="glass-panel p-5 sm:p-6 mb-8">
          <h2 className="text-white font-bold text-lg sm:text-xl mb-4">
            TMT Bar Weight Reference Table — 6mm to 40mm
          </h2>
          <p className="text-white/30 text-sm mb-4">
            All values calculated using the standard{" "}
            <strong className="text-accent">d&sup2;/162.2</strong> formula for
            mild steel (density 7,850 kg/m&sup3;).
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left text-white/50 font-semibold py-2.5 px-3">
                    Diameter (mm)
                  </th>
                  <th className="text-right text-white/50 font-semibold py-2.5 px-3">
                    Weight per Metre (kg/m)
                  </th>
                  <th className="text-right text-white/50 font-semibold py-2.5 px-3">
                    Weight per Foot (kg/ft)
                  </th>
                  <th className="text-right text-white/50 font-semibold py-2.5 px-3">
                    Weight per 12m Bar (kg)
                  </th>
                </tr>
              </thead>
              <tbody>
                {TABLE_DATA.map((row) => (
                  <tr
                    key={row.d}
                    className="border-b border-white/[0.04] hover:bg-white/[0.02] transition-colors"
                  >
                    <td className="py-2.5 px-3 text-white font-semibold">
                      {row.d}mm
                    </td>
                    <td className="py-2.5 px-3 text-right text-white/70 font-mono">
                      {fmt(row.perMetre)}
                    </td>
                    <td className="py-2.5 px-3 text-right text-white/70 font-mono">
                      {fmt(row.perFoot)}
                    </td>
                    <td className="py-2.5 px-3 text-right text-white/70 font-mono">
                      {fmt(row.perBar)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Formula Explanation */}
        <section className="glass-panel p-5 sm:p-6 mb-8">
          <h2 className="text-white font-bold text-lg sm:text-xl mb-4">
            How the d&sup2;/162 Formula Works
          </h2>
          <div className="text-white/50 text-sm space-y-4 leading-relaxed">
            <p>
              The <strong className="text-white/70">d&sup2;/162.2</strong>{" "}
              formula is the industry-standard shortcut to calculate the weight
              of a round steel bar (including TMT rebar) per metre. Here,{" "}
              <strong className="text-white/70">d</strong> is the bar diameter
              in millimetres.
            </p>
            <p>It is derived from first principles:</p>
            <ol className="list-decimal list-inside space-y-1.5 pl-2">
              <li>
                Cross-sectional area of a circle ={" "}
                <span className="text-accent font-mono">
                  &pi;/4 &times; d&sup2;
                </span>
              </li>
              <li>
                Convert mm&sup2; to m&sup2;: divide by{" "}
                <span className="font-mono">1,000,000</span>
              </li>
              <li>
                Multiply by density of steel:{" "}
                <span className="font-mono">7,850 kg/m&sup3;</span>
              </li>
              <li>
                Simplify:{" "}
                <span className="text-accent font-mono">
                  (&pi;/4 &times; 7850) / 1,000,000 = 1/162.2
                </span>
              </li>
            </ol>

            <div className="glass-panel p-4 mt-4">
              <h3 className="text-white font-bold text-sm mb-2">
                Worked Example — 16mm TMT Bar
              </h3>
              <div className="space-y-1.5 font-mono text-xs">
                <p>
                  <span className="text-white/30">Step 1:</span>{" "}
                  <span className="text-white/70">d = 16mm</span>
                </p>
                <p>
                  <span className="text-white/30">Step 2:</span>{" "}
                  <span className="text-white/70">
                    d&sup2; = 16 &times; 16 = 256
                  </span>
                </p>
                <p>
                  <span className="text-white/30">Step 3:</span>{" "}
                  <span className="text-white/70">
                    Weight per metre = 256 / 162.2 ={" "}
                    <span className="text-accent">1.579 kg/m</span>
                  </span>
                </p>
                <p>
                  <span className="text-white/30">Step 4:</span>{" "}
                  <span className="text-white/70">
                    Weight per foot = 1.579 &times; 0.3048 ={" "}
                    <span className="text-accent">0.481 kg/ft</span>
                  </span>
                </p>
                <p>
                  <span className="text-white/30">Step 5:</span>{" "}
                  <span className="text-white/70">
                    Weight per 12m bar = 1.579 &times; 12 ={" "}
                    <span className="text-accent">18.943 kg</span>
                  </span>
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Related Links */}
        <section className="glass-panel p-5 sm:p-6 mb-8">
          <h2 className="text-white font-bold text-lg sm:text-xl mb-4">
            Related Guides &amp; Tools
          </h2>
          <div className="space-y-3">
            <Link
              href="/articles/tmt-bar-weight-per-metre-chart"
              className="block text-white/40 hover:text-accent text-sm no-underline transition-colors"
            >
              TMT Bar Weight Per Metre — Chart for All Sizes &rarr;
            </Link>
            <Link
              href="/articles/steel-weight-calculator-guide"
              className="block text-white/40 hover:text-accent text-sm no-underline transition-colors"
            >
              Steel Weight Calculator — Complete Guide With Formulas &rarr;
            </Link>
            <Link
              href="/calculators"
              className="inline-flex items-center gap-1.5 text-accent hover:text-white text-sm no-underline transition-colors mt-2 btn-glow px-4 py-2 rounded-lg"
            >
              &larr; All Calculators
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}
