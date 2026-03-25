import type { Metadata } from "next";
import Link from "next/link";
import Calculator from "@/components/Calculator";

export const metadata: Metadata = {
  title:
    "Steel Plate Weight Calculator — MS Plate by Thickness, Length & Width | SteelMath",
  description:
    "Calculate steel plate and sheet weight instantly using the L × W × T × 7.85 formula. Supports MS plate, chequered plate, and all standard thicknesses from 2mm to 50mm. Free online plate weight calculator with reference charts.",
  keywords: [
    "steel plate weight calculator",
    "ms plate weight calculator",
    "steel plate weight per sqm",
    "steel sheet weight",
    "ms plate weight per square metre",
    "steel plate weight formula",
    "chequered plate weight calculator",
    "steel plate thickness chart",
    "ms plate weight chart",
    "steel plate calculator online",
    "plate weight formula l w t 7.85",
    "10mm steel plate weight",
    "mild steel plate weight",
    "steel sheet weight calculator",
  ],
  alternates: { canonical: "https://steelmath.com/calculators/steel-plate" },
  openGraph: {
    title:
      "Steel Plate Weight Calculator — MS Plate by Thickness, Length & Width | SteelMath",
    description:
      "Calculate steel plate and sheet weight instantly. Covers MS plate, chequered plate, all thicknesses. Free online calculator with formula L × W × T × 7.85 and reference charts.",
    url: "https://steelmath.com/calculators/steel-plate",
    type: "website",
  },
};

/* Reference table data: standard plate thicknesses */
const PLATE_THICKNESSES = [2, 3, 4, 5, 6, 8, 10, 12, 16, 20, 25, 32, 40, 50];

function plateRow(t: number) {
  const perSqm = +(t * 7.85).toFixed(2);
  const w2500x1250 = +(perSqm * 2.5 * 1.25).toFixed(2);
  const w2000x1000 = +(perSqm * 2.0 * 1.0).toFixed(2);
  return { thickness: t, perSqm, w2500x1250, w2000x1000 };
}

export default function SteelPlateCalculatorPage() {
  /* ── JSON-LD: BreadcrumbList ── */
  const breadcrumbLd = {
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
        name: "Steel Plate Calculator",
        item: "https://steelmath.com/calculators/steel-plate",
      },
    ],
  };

  /* ── JSON-LD: WebApplication ── */
  const webAppLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Steel Plate Weight Calculator",
    url: "https://steelmath.com/calculators/steel-plate",
    applicationCategory: "BusinessApplication",
    operatingSystem: "Any",
    offers: { "@type": "Offer", price: "0", priceCurrency: "INR" },
    description:
      "Free online steel plate weight calculator. Enter length, width, and thickness to get instant weight using L × W × T × 7.85 formula. Supports MS plate, chequered plate, and all standard thicknesses.",
    featureList: [
      "Steel plate weight by length, width & thickness",
      "MS plate and chequered plate support",
      "Weight per square metre reference",
      "Standard plate sizes: 2500×1250mm, 2000×1000mm",
      "Multiple material grades supported",
    ],
  };

  /* ── JSON-LD: FAQPage ── */
  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "How to calculate steel plate weight?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Multiply Length (mm) × Width (mm) × Thickness (mm) × 7.85, then divide by 1,000,000 to get weight in kilograms. The constant 7.85 represents mild steel density in g/cm³.",
        },
      },
      {
        "@type": "Question",
        name: "What is the formula for MS plate weight?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "MS plate weight (kg) = L (mm) × W (mm) × T (mm) × 7.85 ÷ 1,000,000. Alternatively, weight per square metre = Thickness (mm) × 7.85 kg/m².",
        },
      },
      {
        "@type": "Question",
        name: "How much does a 10mm steel plate weigh per square metre?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "A 10mm mild steel plate weighs 78.5 kg per square metre. This is calculated as 10 × 7.85 = 78.5 kg/m².",
        },
      },
      {
        "@type": "Question",
        name: "What is the density of mild steel?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "The density of mild steel (MS) is 7,850 kg/m³, which equals 7.85 g/cm³. This value is used as the standard constant in all steel plate weight calculations.",
        },
      },
    ],
  };

  const rows = PLATE_THICKNESSES.map(plateRow);

  return (
    <>
      {/* Structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
      />

      <div className="relative z-10 max-w-[1400px] mx-auto px-4 sm:px-5 py-5">
        {/* Breadcrumb nav */}
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
          <span className="text-white/50">Steel Plate Calculator</span>
        </nav>

        {/* H1 */}
        <h1 className="text-white text-2xl sm:text-3xl font-bold mb-5 tracking-tight">
          Steel Plate Weight Calculator
          <span className="block text-white/30 text-sm font-normal mt-1.5">
            MS Plate, Sheet &amp; Chequered Plate
          </span>
        </h1>

        {/* Calculator */}
        <div className="mb-8">
          <Calculator />
        </div>

        {/* ── Plate Weight Reference Table ── */}
        <section className="glass-panel p-5 sm:p-6 mb-8">
          <h2 className="text-white font-bold text-lg mb-4">
            Steel Plate Weight Reference Table
          </h2>
          <p className="text-white/30 text-sm mb-4">
            Standard mild steel plate weights calculated using density 7.85
            g/cm³. Formula: Thickness&nbsp;(mm) &times; 7.85 = kg/m².
          </p>

          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b border-white/[0.08]">
                  <th className="text-left text-accent/70 text-xs font-semibold uppercase tracking-wider py-2 pr-4">
                    Thickness (mm)
                  </th>
                  <th className="text-right text-accent/70 text-xs font-semibold uppercase tracking-wider py-2 px-4">
                    Weight per m² (kg)
                  </th>
                  <th className="text-right text-accent/70 text-xs font-semibold uppercase tracking-wider py-2 px-4">
                    2500 &times; 1250 mm (kg)
                  </th>
                  <th className="text-right text-accent/70 text-xs font-semibold uppercase tracking-wider py-2 pl-4">
                    2000 &times; 1000 mm (kg)
                  </th>
                </tr>
              </thead>
              <tbody>
                {rows.map((r) => (
                  <tr
                    key={r.thickness}
                    className="border-b border-white/[0.03] last:border-0"
                  >
                    <td className="text-white/70 font-semibold py-2 pr-4">
                      {r.thickness}
                    </td>
                    <td className="text-white/50 text-right py-2 px-4">
                      {r.perSqm}
                    </td>
                    <td className="text-white/50 text-right py-2 px-4">
                      {r.w2500x1250}
                    </td>
                    <td className="text-white/50 text-right py-2 pl-4">
                      {r.w2000x1000}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* ── Formula Explanation ── */}
        <section className="glass-panel p-5 sm:p-6 mb-8">
          <h2 className="text-white font-bold text-lg mb-4">
            Steel Plate Weight Formula
          </h2>

          <div className="text-white/50 text-sm space-y-4 leading-relaxed">
            <p>
              The weight of a steel plate is calculated by multiplying its
              volume by the density of mild steel (7,850&nbsp;kg/m³ or
              7.85&nbsp;g/cm³):
            </p>

            <div className="glass-panel p-4 font-mono text-accent text-center text-base">
              Weight (kg) = L (mm) &times; W (mm) &times; T (mm) &times; 7.85
              &divide; 1,000,000
            </div>

            <p>
              For quick per-square-metre estimates, simply multiply the plate
              thickness in millimetres by 7.85:
            </p>

            <div className="glass-panel p-4 font-mono text-accent text-center text-base">
              Weight per m² (kg) = Thickness (mm) &times; 7.85
            </div>

            <h3 className="text-white font-bold text-base mt-6 mb-2">
              Worked Example
            </h3>
            <p>
              Find the weight of a <strong className="text-white/70">10mm thick MS plate</strong> measuring{" "}
              <strong className="text-white/70">2500 mm &times; 1250 mm</strong>:
            </p>
            <ol className="list-decimal list-inside space-y-1.5 text-white/40">
              <li>
                Volume factor: 2500 &times; 1250 &times; 10 = 31,250,000 mm³
              </li>
              <li>
                Multiply by density: 31,250,000 &times; 7.85 = 245,312,500
              </li>
              <li>
                Divide by 1,000,000: <strong className="text-white/70">245.31 kg</strong>
              </li>
            </ol>
            <p className="text-white/30 text-xs mt-2">
              Quick check: 10 mm &times; 7.85 = 78.5 kg/m², and 2.5 &times;
              1.25 = 3.125 m², so 78.5 &times; 3.125 = 245.31 kg.
            </p>
          </div>
        </section>

        {/* ── FAQ Section ── */}
        <section className="glass-panel p-5 sm:p-6 mb-8">
          <h2 className="text-white font-bold text-lg mb-4">
            Frequently Asked Questions
          </h2>

          <div className="space-y-5 text-sm">
            <div>
              <h3 className="text-white/70 font-semibold mb-1">
                How to calculate steel plate weight?
              </h3>
              <p className="text-white/40 leading-relaxed">
                Multiply Length (mm) &times; Width (mm) &times; Thickness (mm)
                &times; 7.85, then divide by 1,000,000 to get weight in
                kilograms. The constant 7.85 represents mild steel density in
                g/cm³.
              </p>
            </div>

            <div>
              <h3 className="text-white/70 font-semibold mb-1">
                What is the formula for MS plate weight?
              </h3>
              <p className="text-white/40 leading-relaxed">
                MS plate weight (kg) = L (mm) &times; W (mm) &times; T (mm)
                &times; 7.85 &divide; 1,000,000. Alternatively, weight per
                square metre = Thickness (mm) &times; 7.85 kg/m².
              </p>
            </div>

            <div>
              <h3 className="text-white/70 font-semibold mb-1">
                How much does a 10mm steel plate weigh per square metre?
              </h3>
              <p className="text-white/40 leading-relaxed">
                A 10mm mild steel plate weighs 78.5 kg per square metre,
                calculated as 10 &times; 7.85 = 78.5 kg/m².
              </p>
            </div>

            <div>
              <h3 className="text-white/70 font-semibold mb-1">
                What is the density of mild steel?
              </h3>
              <p className="text-white/40 leading-relaxed">
                The density of mild steel (MS) is 7,850 kg/m³, which equals
                7.85 g/cm³. This value is used as the standard constant in all
                steel plate weight calculations.
              </p>
            </div>
          </div>
        </section>

        {/* ── Related Links ── */}
        <section className="glass-panel p-5 sm:p-6 mb-8">
          <h2 className="text-white font-bold text-sm mb-3">
            Related Guides
          </h2>
          <div className="space-y-2.5">
            <Link
              href="/articles/steel-plate-weight-calculator-thickness-chart"
              className="block text-white/40 hover:text-accent text-xs no-underline transition-colors"
            >
              Steel Plate Weight — Formula &amp; Thickness Chart &rarr;
            </Link>
            <Link
              href="/articles/steel-weight-calculator-guide"
              className="block text-white/40 hover:text-accent text-xs no-underline transition-colors"
            >
              Steel Weight Calculator — Complete Guide With Formulas &rarr;
            </Link>
          </div>
        </section>

        {/* Back to calculator hub */}
        <div className="text-center">
          <Link
            href="/calculators"
            className="btn-glow inline-flex items-center gap-2 px-6 py-2.5 text-sm font-semibold text-white no-underline transition-colors"
          >
            &larr; All Calculators
          </Link>
        </div>
      </div>
    </>
  );
}
