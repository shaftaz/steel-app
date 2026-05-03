import type { Metadata } from "next";
import Link from "next/link";
import GaugeToMmCalc from "@/components/calculators/GaugeToMmCalc";
import BreadcrumbSchema from "@/components/seo/BreadcrumbSchema";
import CalculatorSchema from "@/components/seo/CalculatorSchema";
import { GAUGE_TABLE } from "@/lib/calculators/materials";

export const metadata: Metadata = {
  title:
    "Sheet Metal Gauge to MM Converter — Thickness Chart 7 to 30 Gauge | SteelMath",
  description:
    "Convert sheet metal gauge to millimetres and inches instantly. Complete gauge chart from 7 to 30 gauge with thickness in mm, inches, and weight per square metre. Standard steel gauge (MSG) reference for fabricators and engineers.",
  keywords: [
    "gauge to mm",
    "sheet metal gauge chart",
    "gauge to mm converter",
    "steel gauge thickness",
    "18 gauge in mm",
    "20 gauge in mm",
    "16 gauge to mm",
    "sheet metal thickness chart",
    "gauge to inches",
    "msg gauge chart",
    "metal gauge converter",
    "steel sheet gauge",
  ],
  alternates: { canonical: "https://steelmath.com/calculators/gauge-to-mm" },
  openGraph: {
    title: "Sheet Metal Gauge to MM Converter — Full Chart | SteelMath",
    description:
      "Convert any sheet metal gauge (7–30) to mm and inches. Free chart with weight per sq metre. Instant lookup tool.",
    url: "https://steelmath.com/calculators/gauge-to-mm",
    type: "website",
  },
};

const FAQS = [
  {
    question: "What is 18 gauge in mm?",
    answer:
      "18 gauge sheet metal is 1.214 mm thick (0.0478 inches). It weighs approximately 9.53 kg per square metre in mild steel. 18 gauge is one of the most commonly used thicknesses for general fabrication and enclosures.",
  },
  {
    question: "What is 20 gauge in mm?",
    answer:
      "20 gauge sheet metal is 0.912 mm thick (0.0359 inches). It weighs approximately 7.16 kg per square metre in mild steel. 20 gauge is commonly used for light fabrication, HVAC ductwork, and decorative panels.",
  },
  {
    question: "How does gauge relate to thickness?",
    answer:
      "Sheet metal gauge is inversely related to thickness — a higher gauge number means thinner metal. For example, 10 gauge (3.416 mm) is much thicker than 24 gauge (0.607 mm). The gauge system originated from wire drawing: more draws (higher gauge) produced thinner wire.",
  },
];

export default function GaugeToMmPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Calculators", href: "/calculators" },
          { name: "Gauge to MM Converter", href: "/calculators/gauge-to-mm" },
        ]}
      />
      <CalculatorSchema
        name="Sheet Metal Gauge to MM Converter"
        url="https://steelmath.com/calculators/gauge-to-mm"
        description="Free online gauge to millimetre converter for sheet metal. Covers standard steel gauge (MSG) from 7 to 30 with thickness in mm, inches, and weight per square metre."
        featureList={[
          "Gauge 7 to 30 coverage",
          "Thickness in mm and inches",
          "Weight per square metre (MS density)",
          "Instant lookup by gauge number",
        ]}
        faqs={FAQS}
      />

      <div className="relative z-10 max-w-[1400px] mx-auto px-4 sm:px-5 py-5">
        <nav className="flex items-center gap-1.5 text-xs text-white/25 mb-5">
          <Link href="/" className="hover:text-accent no-underline transition-colors">Home</Link>
          <span>/</span>
          <Link href="/calculators" className="hover:text-accent no-underline transition-colors">Calculators</Link>
          <span>/</span>
          <span className="text-white/50">Gauge to MM Converter</span>
        </nav>

        <h1 className="text-white text-2xl sm:text-3xl font-bold mb-5 tracking-tight">
          Sheet Metal Gauge to MM Converter
          <span className="block text-white/30 text-sm font-normal mt-1.5">
            Instantly convert any gauge (7–30) to millimetres, inches &amp; weight per m&sup2;
          </span>
        </h1>

        <div className="mb-8">
          <GaugeToMmCalc />
        </div>

        {/* Full Gauge Chart */}
        <section className="glass-panel p-5 sm:p-6 mb-8">
          <h2 className="text-white font-bold text-lg sm:text-xl mb-4">
            Complete Sheet Metal Gauge Chart — 7 to 30 Gauge
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left text-white/50 font-semibold py-2.5 px-3">Gauge</th>
                  <th className="text-right text-white/50 font-semibold py-2.5 px-3">Thickness (mm)</th>
                  <th className="text-right text-white/50 font-semibold py-2.5 px-3">Thickness (inches)</th>
                  <th className="text-right text-white/50 font-semibold py-2.5 px-3">Weight (kg/m&sup2;)</th>
                </tr>
              </thead>
              <tbody>
                {GAUGE_TABLE.map((row) => (
                  <tr key={row.gauge} className="border-b border-white/5 hover:bg-white/[0.02]">
                    <td className="text-white/70 py-2.5 px-3 font-mono">{row.gauge}</td>
                    <td className="text-right text-white/50 py-2.5 px-3 font-mono">{row.mm.toFixed(3)}</td>
                    <td className="text-right text-white/50 py-2.5 px-3 font-mono">{row.inches.toFixed(4)}</td>
                    <td className="text-right text-accent/80 py-2.5 px-3 font-mono">{row.kgPerSqm.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* SEO Content */}
        <section className="glass-panel p-5 sm:p-6 mb-8">
          <h2 className="text-white font-bold text-lg sm:text-xl mb-3">
            Understanding Sheet Metal Gauge
          </h2>
          <p className="text-white/40 text-sm leading-relaxed mb-3">
            The gauge system is a standardised way of specifying sheet metal thickness. In the standard steel gauge (MSG) system,
            gauge numbers range from 7 (thickest, ~4.554 mm) to 30 (thinnest, ~0.305 mm). The system is <strong className="text-white/60">inversely proportional</strong> —
            higher gauge numbers indicate thinner material.
          </p>
          <p className="text-white/40 text-sm leading-relaxed">
            The most commonly used gauges in fabrication are <strong className="text-white/60">14 gauge (1.897 mm)</strong> for structural work,
            <strong className="text-white/60"> 18 gauge (1.214 mm)</strong> for general fabrication, and
            <strong className="text-white/60"> 22 gauge (0.759 mm)</strong> for HVAC and light enclosures.
            This converter covers the complete range from 7 to 30 gauge with weight per square metre calculated at mild steel density (7.85 g/cm&sup3;).
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
              { href: "/calculators/steel-plate", title: "Steel Plate Calculator", desc: "Calculate plate weight by L \u00D7 W \u00D7 T \u00D7 7.85 formula" },
              { href: "/calculators/metal-weight", title: "Metal Weight Calculator", desc: "Weight calculator for 14 metals and 6 shapes" },
              { href: "/calculators/hardness-conversion", title: "Hardness Converter", desc: "Convert between Brinell, Rockwell, Vickers scales" },
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
