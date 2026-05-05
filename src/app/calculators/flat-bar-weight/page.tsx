import type { Metadata } from "next";
import Link from "next/link";
import FlatBarWeightCalc from "@/components/calculators/FlatBarWeightCalc";
import BreadcrumbSchema from "@/components/seo/BreadcrumbSchema";
import CalculatorSchema from "@/components/seo/CalculatorSchema";
import { flatBars } from "@/lib/data/section-weights";

export const metadata: Metadata = {
  title: "Flat Bar Weight Calculator — All MS Flat Bar Sizes | SteelMath",
  description: "Free MS flat bar weight calculator for all standard sizes. Uses formula W × T × 0.00785 to calculate weight per metre. Complete chart from 20×3 to 100×12 with weight per 6m length.",
  keywords: ["flat bar weight calculator", "ms flat bar weight chart", "flat bar weight per metre", "steel flat bar weight formula", "flat bar weight per foot", "ms flat weight chart", "50x6 flat bar weight", "75x8 flat bar weight", "100x10 flat bar weight", "mild steel flat bar sizes"],
  alternates: { canonical: "https://steelmath.com/calculators/flat-bar-weight" },
  openGraph: { title: "Flat Bar Weight Calculator — All MS Sizes | SteelMath", description: "Calculate MS flat bar weight for all sizes. Complete chart with weight per metre and per 6m.", url: "https://steelmath.com/calculators/flat-bar-weight", type: "website" },
};

const FAQS = [
  { question: "How to calculate flat bar weight?", answer: "Flat bar weight per metre = Width × Thickness × 0.00785, where width and thickness are in mm. Example: 50×6mm flat bar weighs 50 × 6 × 0.00785 = 2.36 kg/m." },
  { question: "What is the weight of 50×6 flat bar per metre?", answer: "A 50×6mm MS flat bar weighs 2.36 kg per metre. A 6m length weighs 14.13 kg." },
  { question: "What are standard flat bar sizes in India?", answer: "Standard widths range from 20mm to 100mm with thicknesses from 3mm to 12mm. Common sizes: 25×5, 40×6, 50×6, 50×8, 75×8, 100×10. Standard length is 6m." },
  { question: "What is the formula constant 0.00785?", answer: "The constant 0.00785 = 7.85/1000, where 7.85 g/cm³ is the density of mild steel. The division by 1000 converts the result from grams to kilograms when dimensions are in mm." },
];

export default function FlatBarWeightPage() {
  return (
    <>
      <BreadcrumbSchema items={[{ name: "Calculators", href: "/calculators" }, { name: "Flat Bar Weight Calculator", href: "/calculators/flat-bar-weight" }]} />
      <CalculatorSchema name="Flat Bar Weight Calculator" url="https://steelmath.com/calculators/flat-bar-weight" description="Free MS flat bar weight calculator using W × T × 0.00785 for all standard sizes." featureList={["All standard flat bar sizes", "Custom width and thickness entry", "Weight per metre and per 6m", "Quick-select common sizes", "Formula: W × T × 0.00785"]} faqs={FAQS} />
      <div className="relative z-10 max-w-[1400px] mx-auto px-4 sm:px-5 py-5">
        <nav className="flex items-center gap-1.5 text-xs text-white/25 mb-5">
          <Link href="/" className="hover:text-accent no-underline transition-colors">Home</Link><span>/</span>
          <Link href="/calculators" className="hover:text-accent no-underline transition-colors">Calculators</Link><span>/</span>
          <span className="text-white/50">Flat Bar Weight</span>
        </nav>
        <h1 className="text-white text-2xl sm:text-3xl font-bold mb-5 tracking-tight">Flat Bar Weight Calculator — All MS Sizes<span className="block text-white/30 text-sm font-normal mt-1.5">Calculate mild steel flat bar weight using W × T × 0.00785</span></h1>
        <div className="mb-8"><FlatBarWeightCalc /></div>

        <section className="glass-panel p-5 sm:p-6 mb-8">
          <h2 className="text-white font-bold text-lg sm:text-xl mb-4">Complete MS Flat Bar Weight Chart</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead><tr className="border-b border-white/10">
                <th className="text-left text-white/50 font-semibold py-2.5 px-3">Size (mm)</th>
                <th className="text-right text-white/50 font-semibold py-2.5 px-3">Width</th>
                <th className="text-right text-white/50 font-semibold py-2.5 px-3">Thickness</th>
                <th className="text-right text-white/50 font-semibold py-2.5 px-3">kg/m</th>
                <th className="text-right text-white/50 font-semibold py-2.5 px-3">kg/6m</th>
              </tr></thead>
              <tbody>{flatBars.map((row, i) => (
                <tr key={i} className="border-b border-white/5 hover:bg-white/[0.02]">
                  <td className="text-white/70 py-2.5 px-3 font-semibold">{row.width}×{row.thickness}</td>
                  <td className="text-right text-white/50 py-2.5 px-3 font-mono">{row.width}</td>
                  <td className="text-right text-white/50 py-2.5 px-3 font-mono">{row.thickness}</td>
                  <td className="text-right text-accent/80 py-2.5 px-3 font-mono font-semibold">{row.weightPerMetre.toFixed(2)}</td>
                  <td className="text-right text-white/50 py-2.5 px-3 font-mono">{row.weightPer6m.toFixed(2)}</td>
                </tr>
              ))}</tbody>
            </table>
          </div>
        </section>

        <section className="glass-panel p-5 sm:p-6 mb-8">
          <h2 className="text-white font-bold text-lg sm:text-xl mb-4">Flat Bar Weight Formula &amp; Examples</h2>
          <div className="text-white/50 text-sm space-y-4 leading-relaxed">
            <div className="glass-panel p-4 font-mono text-accent text-center text-base">Weight (kg/m) = Width × Thickness × 0.00785</div>
            <p>Where <strong className="text-white/70">Width</strong> and <strong className="text-white/70">Thickness</strong> are in mm. The constant 0.00785 = density of MS (7.85 g/cm³) ÷ 1000.</p>
            <div className="glass-panel p-4 mt-4">
              <h3 className="text-white font-bold text-sm mb-2">Example — 50×8mm Flat Bar</h3>
              <div className="space-y-1.5 font-mono text-xs">
                <p><span className="text-white/30">Given:</span> <span className="text-white/70">Width = 50mm, Thickness = 8mm</span></p>
                <p><span className="text-white/30">Step 1:</span> <span className="text-white/70">50 × 8 × 0.00785 = <span className="text-accent">3.14 kg/m</span></span></p>
                <p><span className="text-white/30">Step 2:</span> <span className="text-white/70">6m piece = 3.14 × 6 = 18.84 kg</span></p>
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
            {[{ href: "/calculators/angle-weight", title: "Steel Angle Calculator", desc: "Equal & unequal angles IS 808" },{ href: "/calculators/steel-plate", title: "Steel Plate Calculator", desc: "Plate weight by L×W×T×7.85" },{ href: "/calculators/round-bar-weight", title: "Round Bar Calculator", desc: "Multi-material round bar weight" },{ href: "/calculators/beam-weight", title: "I-Beam (ISMB) Calculator", desc: "All ISMB sizes with Zxx & Ixx" },{ href: "/calculators/channel-weight", title: "Channel (ISMC) Calculator", desc: "All ISMC channel sizes" },{ href: "/calculator", title: "All-in-One Calculator", desc: "All section types in one tool" }].map((c) => (
              <Link key={c.href} href={c.href} className="block p-3 rounded-lg bg-white/[0.03] border border-white/5 hover:border-accent/20 transition-colors no-underline group"><div className="text-white/80 font-semibold text-sm group-hover:text-accent transition-colors">{c.title}</div><div className="text-white/30 text-xs mt-1">{c.desc}</div></Link>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
