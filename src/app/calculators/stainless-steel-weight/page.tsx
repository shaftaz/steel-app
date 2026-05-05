import type { Metadata } from "next";
import Link from "next/link";
import StainlessSteelWeightCalc from "@/components/calculators/StainlessSteelWeightCalc";
import BreadcrumbSchema from "@/components/seo/BreadcrumbSchema";
import CalculatorSchema from "@/components/seo/CalculatorSchema";

export const metadata: Metadata = {
  title: "Stainless Steel Weight Calculator — SS 304, 316, 202 | SteelMath",
  description: "Free stainless steel weight calculator for SS 304, SS 316 & SS 202 grades. Calculate weight for round bars, plates/sheets, and pipes with correct density values.",
  keywords: ["stainless steel weight calculator", "ss 304 weight calculator", "ss 316 weight calculator", "ss plate weight", "ss pipe weight", "ss round bar weight", "stainless steel density", "ss 202 weight", "ss sheet weight calculator", "stainless steel weight per metre"],
  alternates: { canonical: "https://steelmath.com/calculators/stainless-steel-weight" },
  openGraph: { title: "Stainless Steel Weight Calculator — SS 304/316/202 | SteelMath", description: "Calculate SS weight for round bars, plates & pipes. Correct density for 304, 316 & 202.", url: "https://steelmath.com/calculators/stainless-steel-weight", type: "website" },
};

const SS_DENSITIES = [
  { grade: "SS 304", density: 8.0, description: "Most common austenitic stainless steel. Used in food processing, kitchen equipment, and general-purpose applications." },
  { grade: "SS 316", density: 8.027, description: "Marine-grade stainless steel with molybdenum. Better corrosion resistance, used in chemical, marine, and pharmaceutical industries." },
  { grade: "SS 202", density: 7.86, description: "Low-nickel austenitic steel. Cost-effective alternative to 304 for less demanding applications." },
];

const FAQS = [
  { question: "What is the density of SS 304?", answer: "SS 304 has a density of 8.0 g/cm³ (8000 kg/m³). This is about 2% denser than mild steel (7.85 g/cm³). For weight calculations, multiply the MS weight by 8.0/7.85 = 1.019." },
  { question: "How to calculate SS plate weight?", answer: "SS plate weight = Length × Width × Thickness × density / 1,000,000 (all dimensions in mm). Example: 1000×500×3mm SS 304 plate weighs 1000 × 500 × 3 × 8.0 / 1000000 = 12.0 kg." },
  { question: "What is the difference between SS 304 and SS 316?", answer: "SS 316 contains 2-3% molybdenum which provides better corrosion resistance, especially against chlorides. SS 316 is slightly denser (8.027 vs 8.0 g/cm³) and more expensive. Choose 316 for marine, chemical, or high-corrosion environments." },
  { question: "How to calculate SS pipe weight?", answer: "SS pipe weight per metre = (OD − WT) × WT × π × density / 1000, where OD is outer diameter and WT is wall thickness in mm. Use the correct density for the SS grade." },
  { question: "Is SS 202 lighter than SS 304?", answer: "Yes, SS 202 (7.86 g/cm³) is about 1.75% lighter than SS 304 (8.0 g/cm³). For the same dimensions, SS 202 will weigh slightly less." },
];

export default function StainlessSteelWeightPage() {
  return (
    <>
      <BreadcrumbSchema items={[{ name: "Calculators", href: "/calculators" }, { name: "Stainless Steel Weight Calculator", href: "/calculators/stainless-steel-weight" }]} />
      <CalculatorSchema name="Stainless Steel Weight Calculator" url="https://steelmath.com/calculators/stainless-steel-weight" description="Free SS weight calculator for 304, 316 & 202 grades. Round bars, plates & pipes." featureList={["SS 304, SS 316, SS 202 grades", "Round bar, plate & pipe sections", "Correct density per grade", "Custom dimensions entry", "Weight per unit and total"]} faqs={FAQS} />
      <div className="relative z-10 max-w-[1400px] mx-auto px-4 sm:px-5 py-5">
        <nav className="flex items-center gap-1.5 text-xs text-white/25 mb-5">
          <Link href="/" className="hover:text-accent no-underline transition-colors">Home</Link><span>/</span>
          <Link href="/calculators" className="hover:text-accent no-underline transition-colors">Calculators</Link><span>/</span>
          <span className="text-white/50">Stainless Steel Weight</span>
        </nav>
        <h1 className="text-white text-2xl sm:text-3xl font-bold mb-5 tracking-tight">Stainless Steel Weight Calculator — SS 304, 316 &amp; 202<span className="block text-white/30 text-sm font-normal mt-1.5">Calculate weight for round bars, plates/sheets &amp; pipes with grade-specific density</span></h1>
        <div className="mb-8"><StainlessSteelWeightCalc /></div>

        <section className="glass-panel p-5 sm:p-6 mb-8">
          <h2 className="text-white font-bold text-lg sm:text-xl mb-4">Stainless Steel Grade Density Reference</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {SS_DENSITIES.map((ss) => (
              <div key={ss.grade} className="glass-panel p-4">
                <div className="text-accent font-bold text-lg mb-1">{ss.grade}</div>
                <div className="text-white/70 font-mono text-sm mb-2">{ss.density} g/cm³</div>
                <p className="text-white/40 text-xs leading-relaxed">{ss.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="glass-panel p-5 sm:p-6 mb-8">
          <h2 className="text-white font-bold text-lg sm:text-xl mb-4">Stainless Steel Weight Formulas</h2>
          <div className="text-white/50 text-sm space-y-4 leading-relaxed">
            <div className="space-y-3">
              <div className="glass-panel p-4">
                <h3 className="text-white font-bold text-sm mb-2">Round Bar</h3>
                <div className="font-mono text-accent text-center">d² / 162.2 × (density / 7.85)</div>
              </div>
              <div className="glass-panel p-4">
                <h3 className="text-white font-bold text-sm mb-2">Plate / Sheet</h3>
                <div className="font-mono text-accent text-center">L × W × T × density / 1,000,000</div>
                <div className="text-white/30 text-xs text-center mt-1">All dimensions in mm, result in kg</div>
              </div>
              <div className="glass-panel p-4">
                <h3 className="text-white font-bold text-sm mb-2">Pipe</h3>
                <div className="font-mono text-accent text-center">(OD − WT) × WT × π × density / 1000</div>
                <div className="text-white/30 text-xs text-center mt-1">Result in kg/m</div>
              </div>
            </div>
          </div>
        </section>

        <section className="glass-panel p-5 sm:p-6 mb-8">
          <h2 className="text-white font-bold text-lg sm:text-xl mb-4">Frequently Asked Questions</h2>
          <div className="space-y-4">{FAQS.map((faq) => (<div key={faq.question}><h3 className="text-white/80 font-semibold text-sm mb-1">{faq.question}</h3><p className="text-white/40 text-sm leading-relaxed">{faq.answer}</p></div>))}</div>
        </section>

        <section className="glass-panel p-5 sm:p-6">
          <h2 className="text-white font-bold text-lg sm:text-xl mb-4">Related Calculators</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {[{ href: "/calculators/round-bar-weight", title: "Round Bar Calculator", desc: "Multi-material round bar weight" },{ href: "/calculators/steel-plate", title: "Steel Plate Calculator", desc: "MS plate weight by L×W×T×7.85" },{ href: "/calculators/pipe-weight", title: "MS Pipe Calculator", desc: "All NB sizes 15mm to 200mm" },{ href: "/calculators/flat-bar-weight", title: "Flat Bar Calculator", desc: "MS flat bar all sizes" },{ href: "/calculators/chequered-plate-weight", title: "Chequered Plate Calculator", desc: "Pattern plate with 5% extra" },{ href: "/calculator", title: "All-in-One Calculator", desc: "All section types in one tool" }].map((c) => (
              <Link key={c.href} href={c.href} className="block p-3 rounded-lg bg-white/[0.03] border border-white/5 hover:border-accent/20 transition-colors no-underline group"><div className="text-white/80 font-semibold text-sm group-hover:text-accent transition-colors">{c.title}</div><div className="text-white/30 text-xs mt-1">{c.desc}</div></Link>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
