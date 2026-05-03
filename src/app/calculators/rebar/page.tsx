import type { Metadata } from "next";
import Link from "next/link";
import RebarCalc from "@/components/calculators/RebarCalc";
import BreadcrumbSchema from "@/components/seo/BreadcrumbSchema";
import CalculatorSchema from "@/components/seo/CalculatorSchema";
import { REBAR_SIZES } from "@/lib/calculators/materials";

export const metadata: Metadata = {
  title:
    "Rebar Calculator — Weight, Quantity & Bars Needed for TMT 6mm to 40mm | SteelMath",
  description:
    "Free rebar calculator to find total weight, number of bars and tonnes needed for construction. Covers all TMT sizes from 6mm to 40mm with d\u00B2/162 formula. Enter total length to get instant results for BBS and procurement.",
  keywords: [
    "rebar calculator",
    "rebar weight calculator",
    "tmt bar quantity calculator",
    "number of bars calculator",
    "rebar estimator",
    "reinforcement calculator",
    "steel bar schedule calculator",
    "bbs calculator",
    "rebar weight per metre",
    "tmt bar procurement calculator",
    "construction rebar calculator",
    "reinforcement weight estimator",
  ],
  alternates: { canonical: "https://steelmath.com/calculators/rebar" },
  openGraph: {
    title: "Rebar Calculator — Weight, Quantity & Bars Needed | SteelMath",
    description:
      "Calculate rebar weight, number of bars and tonnes for TMT 6mm to 40mm. Free instant calculator for construction procurement.",
    url: "https://steelmath.com/calculators/rebar",
    type: "website",
  },
};

const FAQS = [
  {
    question: "How many 12mm TMT bars are needed for 500 metres?",
    answer:
      "For 500 metres of 12mm TMT bar with standard 12m bar length: 500 \u00F7 12 = 42 bars (rounded up). Total weight: 500 \u00D7 0.889 = 444.5 kg (0.445 tonnes).",
  },
  {
    question: "How to calculate rebar quantity for a slab?",
    answer:
      "To calculate rebar for a slab: 1) Determine the slab dimensions and bar spacing. 2) Calculate total running length = (slab length / spacing + 1) \u00D7 slab width, for both directions. 3) Multiply total length by weight per metre (d\u00B2/162.2) to get the total weight.",
  },
  {
    question: "What is the standard length of a TMT bar?",
    answer:
      "The standard length of a TMT bar is 12 metres in most markets. Some mills also produce 6m and 9m lengths. Custom cutting lengths may be available on request for large orders.",
  },
];

export default function RebarPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Calculators", href: "/calculators" },
          { name: "Rebar Calculator", href: "/calculators/rebar" },
        ]}
      />
      <CalculatorSchema
        name="Rebar Calculator"
        url="https://steelmath.com/calculators/rebar"
        description="Free rebar calculator to find total weight, number of bars and tonnes needed. Covers TMT sizes 6mm to 40mm with d\u00B2/162 formula."
        featureList={[
          "All TMT sizes: 6mm to 40mm",
          "Total weight and tonnes calculation",
          "Number of bars needed",
          "Custom bar length support",
          "Weight per metre reference",
        ]}
        faqs={FAQS}
      />

      <div className="relative z-10 max-w-[1400px] mx-auto px-4 sm:px-5 py-5">
        <nav className="flex items-center gap-1.5 text-xs text-white/25 mb-5">
          <Link href="/" className="hover:text-accent no-underline transition-colors">Home</Link>
          <span>/</span>
          <Link href="/calculators" className="hover:text-accent no-underline transition-colors">Calculators</Link>
          <span>/</span>
          <span className="text-white/50">Rebar Calculator</span>
        </nav>

        <h1 className="text-white text-2xl sm:text-3xl font-bold mb-5 tracking-tight">
          Rebar Calculator — Weight, Quantity &amp; Bars Needed
          <span className="block text-white/30 text-sm font-normal mt-1.5">
            Calculate total rebar weight, number of bars &amp; tonnes for TMT 6mm to 40mm
          </span>
        </h1>

        <div className="mb-8">
          <RebarCalc />
        </div>

        {/* Rebar Weight Reference Table */}
        <section className="glass-panel p-5 sm:p-6 mb-8">
          <h2 className="text-white font-bold text-lg sm:text-xl mb-4">
            TMT Rebar Weight &amp; Area Reference — 6mm to 40mm
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left text-white/50 font-semibold py-2.5 px-3">Diameter (mm)</th>
                  <th className="text-right text-white/50 font-semibold py-2.5 px-3">Area (mm&sup2;)</th>
                  <th className="text-right text-white/50 font-semibold py-2.5 px-3">Weight (kg/m)</th>
                  <th className="text-right text-white/50 font-semibold py-2.5 px-3">Weight per 12m Bar (kg)</th>
                </tr>
              </thead>
              <tbody>
                {REBAR_SIZES.map((row) => (
                  <tr key={row.diameter} className="border-b border-white/5 hover:bg-white/[0.02]">
                    <td className="text-white/70 py-2.5 px-3 font-mono">{row.diameter}mm</td>
                    <td className="text-right text-white/50 py-2.5 px-3 font-mono">{row.area.toFixed(1)}</td>
                    <td className="text-right text-accent/80 py-2.5 px-3 font-mono">{row.kgPerMetre.toFixed(3)}</td>
                    <td className="text-right text-white/50 py-2.5 px-3 font-mono">{(row.kgPerMetre * 12).toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* SEO Content */}
        <section className="glass-panel p-5 sm:p-6 mb-8">
          <h2 className="text-white font-bold text-lg sm:text-xl mb-3">
            How to Estimate Rebar for Construction
          </h2>
          <p className="text-white/40 text-sm leading-relaxed mb-3">
            Rebar estimation starts with the structural drawings — specifically the Bar Bending Schedule (BBS).
            The BBS lists every bar by diameter, shape, cutting length, and quantity. The total running length
            for each diameter is then multiplied by the unit weight (d&sup2;/162.2 kg/m) to get the total weight.
          </p>
          <p className="text-white/40 text-sm leading-relaxed mb-3">
            For quick procurement estimates, this calculator lets you enter the total length needed for a given diameter
            and instantly returns the total weight and number of standard bars required. A typical wastage allowance
            of 3–5% should be added for cutting and lapping losses.
          </p>
          <p className="text-white/40 text-sm leading-relaxed">
            The most commonly used rebar sizes in construction are <strong className="text-white/60">8mm &amp; 10mm</strong> for stirrups and ties,
            <strong className="text-white/60"> 12mm &amp; 16mm</strong> for slab reinforcement, and
            <strong className="text-white/60"> 20mm, 25mm &amp; 32mm</strong> for beams, columns and footings.
          </p>
        </section>

        {/* FAQs */}
        <section className="glass-panel p-5 sm:p-6 mb-8">
          <h2 className="text-white font-bold text-lg sm:text-xl mb-4">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {FAQS.map((faq) => (
              <div key={faq.question}>
                <h3 className="text-white/80 font-semibold text-sm mb-1">{faq.question}</h3>
                <p className="text-white/40 text-sm leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Related Calculators */}
        <section className="glass-panel p-5 sm:p-6">
          <h2 className="text-white font-bold text-lg sm:text-xl mb-4">Related Calculators</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {[
              { href: "/calculators/tmt", title: "TMT Bar Calculator", desc: "d\u00B2/162 per-metre chart for all TMT sizes" },
              { href: "/calculator", title: "Steel Weight Calculator", desc: "All-in-one weight for TMT, plate, pipe, angle & beam" },
              { href: "/calculators/credit-cost", title: "Credit Cost Calculator", desc: "True cost of buying steel on credit terms" },
            ].map((c) => (
              <Link key={c.href} href={c.href} className="block p-3 rounded-lg bg-white/[0.03] border border-white/5 hover:border-accent/20 transition-colors no-underline group">
                <div className="text-white/80 font-semibold text-sm group-hover:text-accent transition-colors">{c.title}</div>
                <div className="text-white/30 text-xs mt-1">{c.desc}</div>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
