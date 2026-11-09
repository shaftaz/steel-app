import type { Metadata } from "next";
import Link from "next/link";
import CoilWeightCalc from "@/components/calculators/CoilWeightCalc";
import BreadcrumbSchema from "@/components/seo/BreadcrumbSchema";
import CalculatorSchema from "@/components/seo/CalculatorSchema";

export const metadata: Metadata = {
  title: "Coil Weight Calculator — HR, CR, GI & Stainless Steel Coils",
  description:
    "Free steel coil weight calculator. Enter OD, ID and width to get coil weight, strip length and m² per coil, or enter a target weight to get the outer diameter. HR, CR, GI, stainless and aluminium coils. Formula: π/4 × (OD² − ID²) × W × ρ.",
  keywords: [
    "coil weight calculator",
    "steel coil weight calculator",
    "hr coil weight calculator",
    "cr coil weight",
    "gi coil weight calculator",
    "coil weight formula",
    "coil length calculator",
    "steel coil od calculator",
    "coil weight from od id width",
    "stainless steel coil weight",
  ],
  alternates: { canonical: "https://steelmath.com/calculators/coil-weight" },
  openGraph: {
    images: [
      {
        url: "/og?title=Coil%20Weight%20Calculator%20%E2%80%94%20HR%2C%20CR%2C%20GI%20%26%20Stainless%20Coils&accent=orange",
        width: 1200,
        height: 630,
      },
    ],
    title: "Coil Weight Calculator — HR, CR, GI & Stainless Coils",
    description:
      "Coil weight from OD, ID and width; strip length and OD from a target weight. HR, CR, GI, SS and aluminium.",
    url: "https://steelmath.com/calculators/coil-weight",
    type: "website",
  },
};

const FAQS = [
  {
    question: "How do you calculate the weight of a steel coil?",
    answer:
      "Coil weight = π/4 × (OD² − ID²) × width × density ÷ 10⁹, with OD, ID and width in millimetres and density in kg/m³ (7,850 for carbon steel). Example: a 1,250 mm wide HR coil with OD 1,600 mm and ID 610 mm weighs π/4 × (1600² − 610²) × 1250 × 7850 ÷ 10⁹ ≈ 16,860 kg.",
  },
  {
    question: "How do you calculate strip length from coil weight?",
    answer:
      "Strip length (m) = coil weight (kg) ÷ (width (mm) × thickness (mm) × density ÷ 10⁶). A 16,860 kg coil, 1,250 mm wide and 2 mm thick, holds 16,860 ÷ (1250 × 2 × 7850 ÷ 10⁶) ≈ 859 metres of strip. The same length follows from geometry: π/4 × (OD² − ID²) ÷ thickness.",
  },
  {
    question: "What are standard coil inner diameters?",
    answer:
      "Hot-rolled coils are most often supplied on 762 mm (30 inch) or 610 mm (24 inch) eyes; cold-rolled and galvanised coils commonly use 508 mm (20 inch) or 610 mm. Always confirm the ID with the mill test certificate, because it drives both strip length and your decoiler mandrel setting.",
  },
  {
    question: "How many coils fit on a truck?",
    answer:
      "Divide the legal payload by coil weight. In India a standard multi-axle trailer carries about 25 tonnes, so a 16.9 t coil travels alone and two 12 t coils share a load. The calculator shows coils per 25 t load for the dimensions you enter.",
  },
  {
    question: "Why does the actual coil weight differ from the calculated weight?",
    answer:
      "Thickness and width tolerances (IS 1079, IS 513, EN 10051) allow the real section to sit a little above or below nominal, and coil wraps are not perfectly tight. Expect ±2 to 3% between theoretical and weighbridge weight; invoices follow the weighbridge, not the formula.",
  },
];

export default function CoilWeightPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Calculators", href: "/calculators" },
          { name: "Coil Weight Calculator", href: "/calculators/coil-weight" },
        ]}
      />
      <CalculatorSchema
        name="Coil Weight Calculator"
        url="https://steelmath.com/calculators/coil-weight"
        description="Steel coil weight from OD, ID and width; strip length and OD from target weight. HR, CR, GI, stainless and aluminium coils."
        featureList={[
          "Weight from OD, ID and width",
          "Outer diameter from a target coil weight",
          "Strip length and m² per coil",
          "HR, CR, GI, SS 304/316/430, aluminium, copper",
          "Coils per 25 t truck and cost at your rate",
        ]}
        faqs={FAQS}
      />
      <div className="relative z-10 max-w-[1400px] mx-auto px-4 sm:px-5 py-5">
        <nav className="flex items-center gap-1.5 text-xs text-white/25 mb-5">
          <Link href="/" className="hover:text-accent no-underline transition-colors">Home</Link><span>/</span>
          <Link href="/calculators" className="hover:text-accent no-underline transition-colors">Calculators</Link><span>/</span>
          <span className="text-white/50">Coil Weight</span>
        </nav>
        <h1 className="text-white text-2xl sm:text-3xl font-bold mb-5 tracking-tight">
          Coil Weight Calculator — HR, CR, GI &amp; Stainless Coils
          <span className="block text-white/30 text-sm font-normal mt-1.5">
            Weight from OD, ID and width; strip length and OD from a target weight. π/4 × (OD² − ID²) × W × ρ
          </span>
        </h1>
        <div className="mb-8"><CoilWeightCalc /></div>

        <section className="glass-panel p-5 sm:p-6 mb-8">
          <h2 className="text-white font-bold text-lg sm:text-xl mb-4">Quick Reference — HR Coil Weight by OD (1,250 mm wide, ID 610)</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead><tr className="border-b border-white/10">
                <th className="text-left text-white/50 font-semibold py-2.5 px-3">OD (mm)</th>
                <th className="text-right text-white/50 font-semibold py-2.5 px-3">Weight (kg)</th>
                <th className="text-right text-white/50 font-semibold py-2.5 px-3">Strip @ 2 mm (m)</th>
                <th className="text-right text-white/50 font-semibold py-2.5 px-3">Strip @ 3 mm (m)</th>
                <th className="text-right text-white/50 font-semibold py-2.5 px-3">Coils / 25 t</th>
              </tr></thead>
              <tbody>{[1000, 1200, 1400, 1600, 1800, 2000].map((od) => {
                const area = (Math.PI / 4) * (od * od - 610 * 610);
                const kg = (area * 1250 * 7850) / 1e9;
                return (
                  <tr key={od} className="border-b border-white/5 hover:bg-white/[0.02]">
                    <td className="text-white/70 py-2.5 px-3 font-semibold">{od}</td>
                    <td className="text-right text-accent/80 py-2.5 px-3 font-mono font-semibold">{Math.round(kg).toLocaleString("en-IN")}</td>
                    <td className="text-right text-white/50 py-2.5 px-3 font-mono">{Math.round(area / 2 / 1000).toLocaleString("en-IN")}</td>
                    <td className="text-right text-white/50 py-2.5 px-3 font-mono">{Math.round(area / 3 / 1000).toLocaleString("en-IN")}</td>
                    <td className="text-right text-white/50 py-2.5 px-3 font-mono">{Math.floor(25000 / kg)}</td>
                  </tr>
                );
              })}</tbody>
            </table>
          </div>
          <p className="text-white/30 text-xs mt-3">Carbon steel at 7,850 kg/m³. Scale linearly for other widths; use the calculator for other IDs and materials.</p>
        </section>

        <section className="glass-panel p-5 sm:p-6 mb-8">
          <h2 className="text-white font-bold text-lg sm:text-xl mb-4">How to Calculate Coil Weight — Formula &amp; Example</h2>
          <div className="text-white/50 text-sm space-y-4 leading-relaxed">
            <p>A coil is a hollow cylinder. Its volume is the annulus area (outer circle minus the eye) times the width; multiply by density to get mass:</p>
            <div className="glass-panel p-4 font-mono text-accent text-center text-base">Weight (kg) = π/4 × (OD² − ID²) × W × ρ ÷ 10⁹</div>
            <p>Where <strong className="text-white/70">OD</strong> and <strong className="text-white/70">ID</strong> are the outer and inner diameters in mm, <strong className="text-white/70">W</strong> is the coil width in mm and <strong className="text-white/70">ρ</strong> is density in kg/m³ (7,850 for carbon steel, 8,000 for SS 304, 2,700 for aluminium).</p>
            <div className="glass-panel p-4 mt-4">
              <h3 className="text-white font-bold text-sm mb-2">Example — 1,250 mm HR coil, OD 1,600, ID 610, 2 mm thick</h3>
              <div className="space-y-1.5 font-mono text-xs">
                <p><span className="text-white/30">Step 1:</span> <span className="text-white/70">π/4 × (1600² − 610²) = 1,718,373 mm²</span></p>
                <p><span className="text-white/30">Step 2:</span> <span className="text-white/70">× 1,250 × 7,850 ÷ 10⁹ = <span className="text-accent">16,862 kg</span></span></p>
                <p><span className="text-white/30">Length:</span> <span className="text-white/70">1,718,373 ÷ 2 ÷ 1,000 = <span className="text-accent">859 m</span> of strip</span></p>
              </div>
            </div>
            <p>Working the other way, buyers who specify a maximum coil weight for their decoiler can enter the weight and get the OD the mill must hold. Pair this with the <Link href="/calculators/steel-plate" className="text-accent hover:text-accent/80 transition-colors">plate and sheet calculator</Link> for cut-to-length yields, or the <Link href="/calculators/gauge-to-mm" className="text-accent hover:text-accent/80 transition-colors">gauge converter</Link> when a coil is quoted in gauge.</p>
          </div>
        </section>

        <section className="glass-panel p-5 sm:p-6 mb-8">
          <h2 className="text-white font-bold text-lg sm:text-xl mb-4">Frequently Asked Questions</h2>
          <div className="space-y-4">{FAQS.map((faq) => (<div key={faq.question}><h3 className="text-white/80 font-semibold text-sm mb-1">{faq.question}</h3><p className="text-white/40 text-sm leading-relaxed">{faq.answer}</p></div>))}</div>
        </section>

        <section className="glass-panel p-5 sm:p-6">
          <h2 className="text-white font-bold text-lg sm:text-xl mb-4">Related Calculators</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {[{ href: "/calculators/steel-plate", title: "Steel Plate Calculator", desc: "Plate and sheet weight by L×W×T" },{ href: "/calculators/gauge-to-mm", title: "Gauge to MM Converter", desc: "Sheet gauge to mm and kg/m²" },{ href: "/calculators/stainless-steel-weight", title: "Stainless Steel Calculator", desc: "SS 304, 316 and 202" },{ href: "/calculators/landed-cost", title: "Landed Cost Calculator", desc: "FOB/CIF to duty-paid price per tonne" },{ href: "/quote", title: "Quote Builder", desc: "Turn coil weights into a dispatch sheet" },{ href: "/calculator", title: "All-in-One Calculator", desc: "All section types in one tool" }].map((c) => (
              <Link key={c.href} href={c.href} className="block p-3 rounded-lg bg-white/[0.03] border border-white/5 hover:border-accent/20 transition-colors no-underline group"><div className="text-white/80 font-semibold text-sm group-hover:text-accent transition-colors">{c.title}</div><div className="text-white/30 text-xs mt-1">{c.desc}</div></Link>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
