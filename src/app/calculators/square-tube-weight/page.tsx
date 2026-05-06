import type { Metadata } from "next";
import Link from "next/link";
import SquareTubeWeightCalc from "@/components/calculators/SquareTubeWeightCalc";
import BreadcrumbSchema from "@/components/seo/BreadcrumbSchema";
import CalculatorSchema from "@/components/seo/CalculatorSchema";
import { squareTubes } from "@/lib/data/section-weights";

export const metadata: Metadata = {
  title: "Square Tube (SHS) Weight Calculator — All Sizes | SteelMath",
  description: "Free square tube weight calculator for all SHS (Square Hollow Section) sizes. Uses formula (Side − WT) × WT × 4 × 0.00785. Complete chart from 20×20 to 100×100 with weight per metre.",
  keywords: ["square tube weight calculator", "shs weight chart", "square hollow section weight", "ms square tube weight per metre", "square pipe weight calculator", "square tube weight formula", "50x50 square tube weight", "75x75 square tube weight", "100x100 square tube weight", "steel square tube sizes"],
  alternates: { canonical: "https://steelmath.com/calculators/square-tube-weight" },
  openGraph: { title: "Square Tube (SHS) Weight Calculator — All Sizes | SteelMath", description: "Calculate SHS square tube weight for all sizes. Complete chart with weight per metre.", url: "https://steelmath.com/calculators/square-tube-weight", type: "website" },
};

const FAQS = [
  { question: "How to calculate square tube weight?", answer: "Square tube weight per metre = (Side − WT) × WT × 4 × 0.00785, where Side is the outer dimension and WT is wall thickness in mm. Example: 50×50×3mm tube weighs (50 − 3) × 3 × 4 × 0.00785 = 4.42 kg/m." },
  { question: "What is the weight of 50×50×3 square tube?", answer: "A 50×50×3mm square tube weighs 4.42 kg per metre. A 6m length weighs 26.52 kg." },
  { question: "What is the difference between SHS and square pipe?", answer: "SHS (Square Hollow Section) and square pipe are the same product. SHS is the technical/engineering term used in structural design, while square pipe is the common trade term." },
  { question: "What are standard square tube sizes?", answer: "Standard sizes range from 20×20mm to 100×100mm with wall thicknesses from 1.5mm to 5mm. Common sizes: 25×25, 40×40, 50×50, 75×75, 100×100. Standard length is 6m." },
];

export default function SquareTubeWeightPage() {
  return (
    <>
      <BreadcrumbSchema items={[{ name: "Calculators", href: "/calculators" }, { name: "Square Tube Weight Calculator", href: "/calculators/square-tube-weight" }]} />
      <CalculatorSchema name="Square Tube (SHS) Weight Calculator" url="https://steelmath.com/calculators/square-tube-weight" description="Free SHS square tube weight calculator using (Side − WT) × WT × 4 × 0.00785." featureList={["All SHS sizes from 20mm to 100mm", "Multiple wall thicknesses", "Standard & custom size entry", "Weight per metre and per 6m", "Formula: (Side−WT)×WT×4×0.00785"]} faqs={FAQS} />
      <div className="relative z-10 max-w-[1400px] mx-auto px-4 sm:px-5 py-5">
        <nav className="flex items-center gap-1.5 text-xs text-white/25 mb-5">
          <Link href="/" className="hover:text-accent no-underline transition-colors">Home</Link><span>/</span>
          <Link href="/calculators" className="hover:text-accent no-underline transition-colors">Calculators</Link><span>/</span>
          <span className="text-white/50">Square Tube Weight</span>
        </nav>
        <h1 className="text-white text-2xl sm:text-3xl font-bold mb-5 tracking-tight">Square Tube (SHS) Weight Calculator — All Sizes<span className="block text-white/30 text-sm font-normal mt-1.5">Calculate square hollow section weight using (Side − WT) × WT × 4 × 0.00785</span></h1>
        <div className="mb-8"><SquareTubeWeightCalc /></div>

        <section className="glass-panel p-5 sm:p-6 mb-8">
          <h2 className="text-white font-bold text-lg sm:text-xl mb-4">Complete Square Tube Weight Chart (SHS)</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead><tr className="border-b border-white/10">
                <th className="text-left text-white/50 font-semibold py-2.5 px-3">Size (mm)</th>
                <th className="text-right text-white/50 font-semibold py-2.5 px-3">Side</th>
                <th className="text-right text-white/50 font-semibold py-2.5 px-3">Wall (mm)</th>
                <th className="text-right text-white/50 font-semibold py-2.5 px-3">kg/m</th>
                <th className="text-right text-white/50 font-semibold py-2.5 px-3">kg/6m</th>
              </tr></thead>
              <tbody>{squareTubes.map((row, i) => (
                <tr key={i} className="border-b border-white/5 hover:bg-white/[0.02]">
                  <td className="text-white/70 py-2.5 px-3 font-semibold">{row.side}×{row.side}×{row.wallThickness}</td>
                  <td className="text-right text-white/50 py-2.5 px-3 font-mono">{row.side}</td>
                  <td className="text-right text-white/50 py-2.5 px-3 font-mono">{row.wallThickness}</td>
                  <td className="text-right text-accent/80 py-2.5 px-3 font-mono font-semibold">{row.weightPerMetre.toFixed(2)}</td>
                  <td className="text-right text-white/50 py-2.5 px-3 font-mono">{row.weightPer6m.toFixed(2)}</td>
                </tr>
              ))}</tbody>
            </table>
          </div>
        </section>

        <section className="glass-panel p-5 sm:p-6 mb-8">
          <h2 className="text-white font-bold text-lg sm:text-xl mb-4">Square Tube Weight Formula &amp; Examples</h2>
          <div className="text-white/50 text-sm space-y-4 leading-relaxed">
            <div className="glass-panel p-4 font-mono text-accent text-center text-base">Weight (kg/m) = (Side − WT) × WT × 4 × 0.00785</div>
            <p>The formula calculates the cross-sectional area of the four walls, multiplied by steel density. <strong className="text-white/70">Side</strong> = outer dimension, <strong className="text-white/70">WT</strong> = wall thickness. Hollow sections like SHS are structurally more efficient than solid bars of equal weight &mdash; see our <Link href="/articles/hollow-vs-solid-steel-sections-structural-efficiency" className="text-accent hover:text-accent/80 transition-colors">engineering analysis proving the math</Link>.</p>
            <div className="glass-panel p-4 mt-4">
              <h3 className="text-white font-bold text-sm mb-2">Example — 75×75×4mm SHS</h3>
              <div className="space-y-1.5 font-mono text-xs">
                <p><span className="text-white/30">Step 1:</span> <span className="text-white/70">(75 − 4) = 71</span></p>
                <p><span className="text-white/30">Step 2:</span> <span className="text-white/70">71 × 4 × 4 × 0.00785 = <span className="text-accent">8.90 kg/m</span></span></p>
                <p><span className="text-white/30">Step 3:</span> <span className="text-white/70">6m piece = 8.90 × 6 = 53.40 kg</span></p>
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
            {[{ href: "/calculators/rect-tube-weight", title: "Rectangular Tube Calculator", desc: "RHS weight for all sizes" },{ href: "/calculators/pipe-weight", title: "MS Pipe Calculator", desc: "All NB sizes 15mm to 200mm" },{ href: "/calculators/round-bar-weight", title: "Round Bar Calculator", desc: "Multi-material round bar weight" },{ href: "/calculators/angle-weight", title: "Steel Angle Calculator", desc: "Equal & unequal angles IS 808" },{ href: "/calculators/steel-plate", title: "Steel Plate Calculator", desc: "Plate weight by L×W×T×7.85" },{ href: "/calculator", title: "All-in-One Calculator", desc: "All section types in one tool" }].map((c) => (
              <Link key={c.href} href={c.href} className="block p-3 rounded-lg bg-white/[0.03] border border-white/5 hover:border-accent/20 transition-colors no-underline group"><div className="text-white/80 font-semibold text-sm group-hover:text-accent transition-colors">{c.title}</div><div className="text-white/30 text-xs mt-1">{c.desc}</div></Link>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
