import type { Metadata } from "next";
import Link from "next/link";
import RectTubeWeightCalc from "@/components/calculators/RectTubeWeightCalc";
import BreadcrumbSchema from "@/components/seo/BreadcrumbSchema";
import CalculatorSchema from "@/components/seo/CalculatorSchema";
import { rectTubes } from "@/lib/data/section-weights";

export const metadata: Metadata = {
  title: "Rectangular Tube (RHS) Weight Calculator — All Sizes | SteelMath",
  description: "Free rectangular tube weight calculator for all RHS (Rectangular Hollow Section) sizes. Uses formula 2 × (W + H − 2×WT) × WT × 0.00785. Complete chart from 40×20 to 200×100.",
  keywords: ["rectangular tube weight calculator", "rhs weight chart", "rectangular hollow section weight", "ms rectangular tube weight", "rectangular pipe weight calculator", "rect tube weight formula", "80x40 rect tube weight", "100x50 rect tube weight", "200x100 rect tube weight", "steel rectangular tube sizes"],
  alternates: { canonical: "https://steelmath.com/calculators/rect-tube-weight" },
  openGraph: { title: "Rectangular Tube (RHS) Weight Calculator — All Sizes | SteelMath", description: "Calculate RHS rectangular tube weight for all sizes. Complete chart with weight per metre.", url: "https://steelmath.com/calculators/rect-tube-weight", type: "website" },
};

const FAQS = [
  { question: "How to calculate rectangular tube weight?", answer: "Rect tube weight per metre = 2 × (W + H − 2×WT) × WT × 0.00785, where W is width, H is height, and WT is wall thickness in mm. Example: 80×40×3mm tube weighs 2 × (80 + 40 − 6) × 3 × 0.00785 = 5.25 kg/m." },
  { question: "What is the weight of 100×50×4 rectangular tube?", answer: "A 100×50×4mm rectangular tube weighs 8.64 kg per metre. A 6m length weighs 51.82 kg." },
  { question: "What is the difference between RHS and rectangular pipe?", answer: "RHS (Rectangular Hollow Section) and rectangular pipe are the same product. RHS is the technical term used in structural engineering specifications." },
  { question: "What are standard rectangular tube sizes?", answer: "Standard sizes range from 40×20mm to 200×100mm with wall thicknesses from 2mm to 6mm. Common sizes: 50×25, 60×40, 80×40, 100×50, 150×75, 200×100. Standard length is 6m." },
];

export default function RectTubeWeightPage() {
  return (
    <>
      <BreadcrumbSchema items={[{ name: "Calculators", href: "/calculators" }, { name: "Rectangular Tube Weight Calculator", href: "/calculators/rect-tube-weight" }]} />
      <CalculatorSchema name="Rectangular Tube (RHS) Weight Calculator" url="https://steelmath.com/calculators/rect-tube-weight" description="Free RHS rectangular tube weight calculator using 2×(W+H−2×WT)×WT×0.00785." featureList={["All RHS sizes from 40×20 to 200×100", "Multiple wall thicknesses", "Standard & custom size entry", "Weight per metre and per 6m", "Formula: 2×(W+H−2×WT)×WT×0.00785"]} faqs={FAQS} />
      <div className="relative z-10 max-w-[1400px] mx-auto px-4 sm:px-5 py-5">
        <nav className="flex items-center gap-1.5 text-xs text-white/25 mb-5">
          <Link href="/" className="hover:text-accent no-underline transition-colors">Home</Link><span>/</span>
          <Link href="/calculators" className="hover:text-accent no-underline transition-colors">Calculators</Link><span>/</span>
          <span className="text-white/50">Rectangular Tube Weight</span>
        </nav>
        <h1 className="text-white text-2xl sm:text-3xl font-bold mb-5 tracking-tight">Rectangular Tube (RHS) Weight Calculator — All Sizes<span className="block text-white/30 text-sm font-normal mt-1.5">Calculate rectangular hollow section weight using 2 × (W + H − 2×WT) × WT × 0.00785</span></h1>
        <div className="mb-8"><RectTubeWeightCalc /></div>

        <section className="glass-panel p-5 sm:p-6 mb-8">
          <h2 className="text-white font-bold text-lg sm:text-xl mb-4">Complete Rectangular Tube Weight Chart (RHS)</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead><tr className="border-b border-white/10">
                <th className="text-left text-white/50 font-semibold py-2.5 px-3">Size (mm)</th>
                <th className="text-right text-white/50 font-semibold py-2.5 px-3">Width</th>
                <th className="text-right text-white/50 font-semibold py-2.5 px-3">Height</th>
                <th className="text-right text-white/50 font-semibold py-2.5 px-3">Wall (mm)</th>
                <th className="text-right text-white/50 font-semibold py-2.5 px-3">kg/m</th>
                <th className="text-right text-white/50 font-semibold py-2.5 px-3">kg/6m</th>
              </tr></thead>
              <tbody>{rectTubes.map((row, i) => (
                <tr key={i} className="border-b border-white/5 hover:bg-white/[0.02]">
                  <td className="text-white/70 py-2.5 px-3 font-semibold">{row.width}×{row.height}×{row.wallThickness}</td>
                  <td className="text-right text-white/50 py-2.5 px-3 font-mono">{row.width}</td>
                  <td className="text-right text-white/50 py-2.5 px-3 font-mono">{row.height}</td>
                  <td className="text-right text-white/50 py-2.5 px-3 font-mono">{row.wallThickness}</td>
                  <td className="text-right text-accent/80 py-2.5 px-3 font-mono font-semibold">{row.weightPerMetre.toFixed(2)}</td>
                  <td className="text-right text-white/50 py-2.5 px-3 font-mono">{row.weightPer6m.toFixed(2)}</td>
                </tr>
              ))}</tbody>
            </table>
          </div>
        </section>

        <section className="glass-panel p-5 sm:p-6 mb-8">
          <h2 className="text-white font-bold text-lg sm:text-xl mb-4">Rectangular Tube Weight Formula &amp; Examples</h2>
          <div className="text-white/50 text-sm space-y-4 leading-relaxed">
            <div className="glass-panel p-4 font-mono text-accent text-center text-base">Weight (kg/m) = 2 × (W + H − 2×WT) × WT × 0.00785</div>
            <p>Where <strong className="text-white/70">W</strong> = width, <strong className="text-white/70">H</strong> = height, <strong className="text-white/70">WT</strong> = wall thickness, all in mm. Hollow sections like RHS are structurally more efficient than solid bars of equal weight &mdash; see our <Link href="/articles/hollow-vs-solid-steel-sections-structural-efficiency" className="text-accent hover:text-accent/80 transition-colors">engineering analysis proving the math</Link>.</p>
            <div className="glass-panel p-4 mt-4">
              <h3 className="text-white font-bold text-sm mb-2">Example — 100×50×4mm RHS</h3>
              <div className="space-y-1.5 font-mono text-xs">
                <p><span className="text-white/30">Step 1:</span> <span className="text-white/70">2 × (100 + 50 − 8) = 284</span></p>
                <p><span className="text-white/30">Step 2:</span> <span className="text-white/70">284 × 4 × 0.00785 = <span className="text-accent">8.64 kg/m</span></span></p>
                <p><span className="text-white/30">Step 3:</span> <span className="text-white/70">6m piece = 8.64 × 6 = 51.82 kg</span></p>
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
            {[{ href: "/calculators/square-tube-weight", title: "Square Tube Calculator", desc: "SHS weight for all sizes" },{ href: "/calculators/pipe-weight", title: "MS Pipe Calculator", desc: "All NB sizes 15mm to 200mm" },{ href: "/calculators/round-bar-weight", title: "Round Bar Calculator", desc: "Multi-material round bar weight" },{ href: "/calculators/angle-weight", title: "Steel Angle Calculator", desc: "Equal & unequal angles IS 808" },{ href: "/calculators/beam-weight", title: "I-Beam (ISMB) Calculator", desc: "All ISMB sizes with Zxx & Ixx" },{ href: "/calculator", title: "All-in-One Calculator", desc: "All section types in one tool" }].map((c) => (
              <Link key={c.href} href={c.href} className="block p-3 rounded-lg bg-white/[0.03] border border-white/5 hover:border-accent/20 transition-colors no-underline group"><div className="text-white/80 font-semibold text-sm group-hover:text-accent transition-colors">{c.title}</div><div className="text-white/30 text-xs mt-1">{c.desc}</div></Link>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
