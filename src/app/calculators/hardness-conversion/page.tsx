import type { Metadata } from "next";
import Link from "next/link";
import HardnessCalc from "@/components/calculators/HardnessCalc";
import BreadcrumbSchema from "@/components/seo/BreadcrumbSchema";
import CalculatorSchema from "@/components/seo/CalculatorSchema";
import { HARDNESS_TABLE } from "@/lib/calculators/materials";

export const metadata: Metadata = {
  title:
    "Hardness Conversion Calculator — Brinell, Rockwell, Vickers & Tensile | SteelMath",
  description:
    "Free hardness conversion calculator. Convert between Brinell (HB), Rockwell C (HRC), Rockwell B (HRB), Vickers (HV), and approximate tensile strength (MPa). Complete hardness comparison chart for steel based on ASTM E140.",
  keywords: [
    "hardness conversion calculator",
    "brinell to rockwell",
    "hrc to hb",
    "vickers to brinell",
    "hardness conversion chart",
    "rockwell c to brinell",
    "hb to hrc conversion",
    "steel hardness chart",
    "vickers hardness table",
    "hardness to tensile strength",
    "ASTM E140 hardness",
    "hrc to mpa",
  ],
  alternates: { canonical: "https://steelmath.com/calculators/hardness-conversion" },
  openGraph: {
    title: "Hardness Conversion Calculator — HB, HRC, HRB, HV & MPa | SteelMath",
    description:
      "Convert between Brinell, Rockwell C/B, Vickers hardness scales and tensile strength. Free instant converter with full reference chart.",
    url: "https://steelmath.com/calculators/hardness-conversion",
    type: "website",
  },
};

const FAQS = [
  {
    question: "How to convert Brinell to Rockwell C?",
    answer:
      "Brinell to Rockwell C conversion is not a simple formula — it is based on empirical data from ASTM E140. For example, 300 HB \u2248 32 HRC, 400 HB \u2248 43 HRC, and 500 HB \u2248 49 HRC. Use this calculator for instant lookup of the closest standard conversion.",
  },
  {
    question: "What is the difference between Brinell, Rockwell and Vickers?",
    answer:
      "All three measure indentation hardness but use different indenters and loads. Brinell (HB) uses a 10mm steel ball, Rockwell C (HRC) uses a diamond cone for hard steels, Rockwell B (HRB) uses a 1/16\u2033 ball for softer steels, and Vickers (HV) uses a diamond pyramid. Each scale suits different hardness ranges.",
  },
  {
    question: "What is the relationship between hardness and tensile strength?",
    answer:
      "For carbon and alloy steels, approximate tensile strength (MPa) \u2248 3.45 \u00D7 Brinell hardness (HB). For example, 200 HB \u2248 690 MPa. This relationship is approximate and varies with steel composition and heat treatment.",
  },
];

export default function HardnessConversionPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Calculators", href: "/calculators" },
          { name: "Hardness Converter", href: "/calculators/hardness-conversion" },
        ]}
      />
      <CalculatorSchema
        name="Hardness Conversion Calculator"
        url="https://steelmath.com/calculators/hardness-conversion"
        description="Free hardness conversion calculator. Convert between Brinell (HB), Rockwell C (HRC), Rockwell B (HRB), Vickers (HV), and approximate tensile strength (MPa) based on ASTM E140."
        featureList={[
          "Brinell (HB) to Rockwell, Vickers & tensile",
          "Rockwell C (HRC) and B (HRB) conversion",
          "Vickers (HV) hardness lookup",
          "Approximate tensile strength in MPa",
          "44-row reference table",
        ]}
        faqs={FAQS}
      />

      <div className="relative z-10 max-w-[1400px] mx-auto px-4 sm:px-5 py-5">
        <nav className="flex items-center gap-1.5 text-xs text-white/25 mb-5">
          <Link href="/" className="hover:text-accent no-underline transition-colors">Home</Link>
          <span>/</span>
          <Link href="/calculators" className="hover:text-accent no-underline transition-colors">Calculators</Link>
          <span>/</span>
          <span className="text-white/50">Hardness Converter</span>
        </nav>

        <h1 className="text-white text-2xl sm:text-3xl font-bold mb-5 tracking-tight">
          Hardness Conversion Calculator — Brinell, Rockwell &amp; Vickers
          <span className="block text-white/30 text-sm font-normal mt-1.5">
            Convert between HB, HRC, HRB, HV and approximate tensile strength (MPa)
          </span>
        </h1>

        <div className="mb-8">
          <HardnessCalc />
        </div>

        {/* Full Hardness Table */}
        <section className="glass-panel p-5 sm:p-6 mb-8">
          <h2 className="text-white font-bold text-lg sm:text-xl mb-4">
            Hardness Conversion Reference Table (ASTM E140)
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-right text-white/50 font-semibold py-2.5 px-3">Brinell (HB)</th>
                  <th className="text-right text-white/50 font-semibold py-2.5 px-3">Rockwell C</th>
                  <th className="text-right text-white/50 font-semibold py-2.5 px-3">Rockwell B</th>
                  <th className="text-right text-white/50 font-semibold py-2.5 px-3">Vickers (HV)</th>
                  <th className="text-right text-white/50 font-semibold py-2.5 px-3">Tensile (MPa)</th>
                </tr>
              </thead>
              <tbody>
                {HARDNESS_TABLE.map((row) => (
                  <tr key={row.brinell} className="border-b border-white/5 hover:bg-white/[0.02]">
                    <td className="text-right text-white/70 py-2 px-3 font-mono">{row.brinell}</td>
                    <td className="text-right text-white/50 py-2 px-3 font-mono">{row.rockwellC ?? "\u2014"}</td>
                    <td className="text-right text-white/50 py-2 px-3 font-mono">{row.rockwellB ?? "\u2014"}</td>
                    <td className="text-right text-accent/80 py-2 px-3 font-mono">{row.vickers}</td>
                    <td className="text-right text-white/50 py-2 px-3 font-mono">{row.tensileApproxMPa}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* SEO Content */}
        <section className="glass-panel p-5 sm:p-6 mb-8">
          <h2 className="text-white font-bold text-lg sm:text-xl mb-3">
            Understanding Hardness Scales
          </h2>
          <p className="text-white/40 text-sm leading-relaxed mb-3">
            Hardness testing measures a material&apos;s resistance to indentation. The three most common scales for steel are
            <strong className="text-white/60"> Brinell (HB)</strong> — used for annealed and medium-hardness steels,
            <strong className="text-white/60"> Rockwell C (HRC)</strong> — the standard for hardened steels above ~20 HRC, and
            <strong className="text-white/60"> Vickers (HV)</strong> — a universal scale that works across the full range.
          </p>
          <p className="text-white/40 text-sm leading-relaxed">
            Conversion between scales is based on empirical tables (ASTM E140) rather than direct formulas, because each test
            uses a different indenter geometry and load. The values in this tool are approximate and intended for reference.
            For critical applications, always test in the required scale directly.
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
              { href: "/calculators/metal-weight", title: "Metal Weight Calculator", desc: "Calculate weight for 14 metals and 6 cross-section shapes" },
              { href: "/calculators/gauge-to-mm", title: "Gauge to MM Converter", desc: "Convert sheet metal gauge to mm and inches" },
              { href: "/calculator", title: "Steel Weight Calculator", desc: "All-in-one weight calculator for TMT, plate, pipe & beam" },
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
