import type { Metadata } from "next";
import Link from "next/link";
import MetalWeightCalc from "@/components/calculators/MetalWeightCalc";
import BreadcrumbSchema from "@/components/seo/BreadcrumbSchema";
import CalculatorSchema from "@/components/seo/CalculatorSchema";
import { MATERIALS } from "@/lib/calculators/materials";

export const metadata: Metadata = {
  title:
    "Metal Weight Calculator — Steel, Aluminium, Copper, Brass & 14 Metals | SteelMath",
  description:
    "Free online metal weight calculator for round bar, square bar, rectangular bar, sheet, pipe & hexagonal sections. Supports 14 metals including mild steel, stainless steel SS304/SS316, aluminium, copper, brass, titanium & more. Instant results with density reference table.",
  keywords: [
    "metal weight calculator",
    "steel weight calculator",
    "aluminium weight calculator",
    "copper weight calculator",
    "brass weight calculator",
    "metal density calculator",
    "round bar weight",
    "pipe weight calculator",
    "hexagonal bar weight",
    "sheet metal weight",
    "metal weight per metre",
    "material density table",
  ],
  alternates: { canonical: "https://steelmath.com/calculators/metal-weight" },
  openGraph: {
    title: "Metal Weight Calculator — 14 Metals, All Shapes | SteelMath",
    description:
      "Calculate weight for round, square, rectangular, pipe, sheet & hex bar in steel, aluminium, copper, brass, titanium & more. Free instant calculator.",
    url: "https://steelmath.com/calculators/metal-weight",
    type: "website",
  },
};

const FAQS = [
  {
    question: "How do you calculate the weight of a metal bar?",
    answer:
      "Metal bar weight = cross-sectional area \u00D7 length \u00D7 density. For a round bar: \u03C0/4 \u00D7 d\u00B2 \u00D7 L \u00D7 \u03C1. For mild steel (density 7.85 g/cm\u00B3), a 25mm round bar of 6m length weighs approximately 23.12 kg.",
  },
  {
    question: "What is the density of mild steel?",
    answer:
      "Mild steel (MS) has a density of 7.85 g/cm\u00B3 or 7,850 kg/m\u00B3. This is the standard density used in all steel weight calculations. Stainless steel SS304 is slightly denser at 8.0 g/cm\u00B3.",
  },
  {
    question: "How to calculate pipe weight?",
    answer:
      "Pipe weight = \u03C0/4 \u00D7 (OD\u00B2 \u2212 ID\u00B2) \u00D7 L \u00D7 density, where OD is outer diameter, ID is inner diameter (OD \u2212 2 \u00D7 wall thickness), and L is length. All dimensions in consistent units.",
  },
];

export default function MetalWeightCalculatorPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Calculators", href: "/calculators" },
          { name: "Metal Weight Calculator", href: "/calculators/metal-weight" },
        ]}
      />
      <CalculatorSchema
        name="Metal Weight Calculator"
        url="https://steelmath.com/calculators/metal-weight"
        description="Free online metal weight calculator for round, square, rectangular, sheet, pipe and hexagonal bar sections. Supports 14 metals including steel, aluminium, copper, brass and titanium."
        featureList={[
          "6 cross-section shapes: round, square, rectangular, sheet, pipe, hexagonal",
          "14 metals with accurate densities",
          "Instant weight calculation in kg and tonnes",
          "Material density reference table",
        ]}
        faqs={FAQS}
      />

      <div className="relative z-10 max-w-[1400px] mx-auto px-4 sm:px-5 py-5">
        <nav className="flex items-center gap-1.5 text-xs text-white/25 mb-5">
          <Link href="/" className="hover:text-accent no-underline transition-colors">Home</Link>
          <span>/</span>
          <Link href="/calculators" className="hover:text-accent no-underline transition-colors">Calculators</Link>
          <span>/</span>
          <span className="text-white/50">Metal Weight Calculator</span>
        </nav>

        <h1 className="text-white text-2xl sm:text-3xl font-bold mb-5 tracking-tight">
          Metal Weight Calculator — All Shapes &amp; Materials
          <span className="block text-white/30 text-sm font-normal mt-1.5">
            Calculate weight for round, square, rectangular, sheet, pipe &amp; hexagonal sections in 14 metals
          </span>
        </h1>

        <div className="mb-8">
          <MetalWeightCalc />
        </div>

        {/* Material Density Reference */}
        <section className="glass-panel p-5 sm:p-6 mb-8">
          <h2 className="text-white font-bold text-lg sm:text-xl mb-4">
            Material Density Reference Table
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left text-white/50 font-semibold py-2.5 px-3">Material</th>
                  <th className="text-right text-white/50 font-semibold py-2.5 px-3">Density (g/cm&sup3;)</th>
                  <th className="text-right text-white/50 font-semibold py-2.5 px-3">Density (kg/m&sup3;)</th>
                </tr>
              </thead>
              <tbody>
                {MATERIALS.map((m) => (
                  <tr key={m.name} className="border-b border-white/5 hover:bg-white/[0.02]">
                    <td className="text-white/70 py-2.5 px-3">{m.name}</td>
                    <td className="text-right text-white/50 py-2.5 px-3 font-mono">{m.density.toFixed(2)}</td>
                    <td className="text-right text-white/50 py-2.5 px-3 font-mono">{(m.density * 1000).toFixed(0)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* SEO Content */}
        <section className="glass-panel p-5 sm:p-6 mb-8">
          <h2 className="text-white font-bold text-lg sm:text-xl mb-3">
            How to Calculate Metal Weight
          </h2>
          <p className="text-white/40 text-sm leading-relaxed mb-3">
            Metal weight is calculated by multiplying the volume of the section by the material density.
            The volume formula depends on the cross-sectional shape: for a round bar it is <strong className="text-white/60">&pi;/4 &times; d&sup2; &times; L</strong>,
            for a plate it is <strong className="text-white/60">L &times; W &times; T</strong>, and for a pipe it is
            <strong className="text-white/60"> &pi;/4 &times; (OD&sup2; &minus; ID&sup2;) &times; L</strong>.
          </p>
          <p className="text-white/40 text-sm leading-relaxed">
            This calculator supports 14 common engineering metals including mild steel, stainless steel (SS304 &amp; SS316),
            aluminium, copper, brass, cast iron, titanium, and more. All densities are based on standard reference values
            at room temperature.
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
              { href: "/calculator", title: "Steel Weight Calculator", desc: "All-in-one weight calculator for TMT, plate, pipe, angle & beam" },
              { href: "/calculators/tmt", title: "TMT Bar Calculator", desc: "d\u00B2/162 formula for 6mm to 40mm TMT bars" },
              { href: "/calculators/rebar", title: "Rebar Calculator", desc: "Calculate rebar weight, quantity & cutting lengths" },
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
