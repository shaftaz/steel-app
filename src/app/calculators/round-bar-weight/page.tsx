import type { Metadata } from "next";
import Link from "next/link";
import RoundBarWeightCalc from "@/components/calculators/RoundBarWeightCalc";
import BreadcrumbSchema from "@/components/seo/BreadcrumbSchema";
import CalculatorSchema from "@/components/seo/CalculatorSchema";
import { roundBars } from "@/lib/data/section-weights";

export const metadata: Metadata = {
  title: "Round Bar Weight Calculator — MS, SS 304/316, Aluminium, Brass | SteelMath",
  description: "Free round bar weight calculator for MS, SS 304, SS 316, EN24, aluminium & brass. Uses formula d²/162.2 with density correction. Complete chart from 6mm to 100mm diameter.",
  keywords: ["round bar weight calculator", "ms round bar weight chart", "ss round bar weight", "round bar weight per metre", "round bar weight formula", "d2/162 formula", "bright bar weight calculator", "en24 round bar weight", "aluminium round bar weight", "brass round bar weight"],
  alternates: { canonical: "https://steelmath.com/calculators/round-bar-weight" },
  openGraph: { title: "Round Bar Weight Calculator — Multi-Material | SteelMath", description: "Calculate round bar weight for MS, SS, EN24, aluminium & brass. d²/162.2 formula.", url: "https://steelmath.com/calculators/round-bar-weight", type: "website" },
};

const FAQS = [
  { question: "How to calculate round bar weight?", answer: "Round bar weight per metre = d²/162.2, where d is diameter in mm. For non-MS materials, multiply by (density/7.85). Example: 25mm MS bar weighs 25²/162.2 = 3.85 kg/m." },
  { question: "What is the weight of 25mm round bar per metre?", answer: "A 25mm MS round bar weighs 3.85 kg/m. In SS 304 it weighs 3.93 kg/m (density 8.0 vs 7.85). In aluminium it weighs 1.33 kg/m." },
  { question: "What is the d²/162.2 formula?", answer: "d²/162.2 calculates mild steel round bar weight per metre. The constant 162.2 = (4 × 1,000,000) / (π × 7850). For other materials, multiply result by (material density / 7.85)." },
  { question: "What is the difference between round bar and TMT bar?", answer: "Round bars are plain smooth bars used for shafts, pins, and machining. TMT bars have ribbed surface deformations for concrete reinforcement. Both use the same d²/162.2 formula for weight." },
  { question: "What is the weight of 50mm MS round bar per metre?", answer: "A 50mm MS round bar weighs 15.41 kg per metre. d²/162.2 = 2500/162.2 = 15.41 kg/m." },
];

export default function RoundBarWeightPage() {
  return (
    <>
      <BreadcrumbSchema items={[{ name: "Calculators", href: "/calculators" }, { name: "Round Bar Weight Calculator", href: "/calculators/round-bar-weight" }]} />
      <CalculatorSchema name="Round Bar Weight Calculator" url="https://steelmath.com/calculators/round-bar-weight" description="Free round bar weight calculator for MS, SS 304/316, EN24, aluminium & brass using d²/162.2." featureList={["MS, SS 304, SS 316, EN24, Aluminium, Brass", "d²/162.2 formula with density correction", "Diameter quick-select 6mm to 100mm", "Weight per metre and total weight", "Multi-material comparison"]} faqs={FAQS} />
      <div className="relative z-10 max-w-[1400px] mx-auto px-4 sm:px-5 py-5">
        <nav className="flex items-center gap-1.5 text-xs text-white/25 mb-5">
          <Link href="/" className="hover:text-accent no-underline transition-colors">Home</Link><span>/</span>
          <Link href="/calculators" className="hover:text-accent no-underline transition-colors">Calculators</Link><span>/</span>
          <span className="text-white/50">Round Bar Weight</span>
        </nav>
        <h1 className="text-white text-2xl sm:text-3xl font-bold mb-5 tracking-tight">Round Bar Weight Calculator — Multi-Material<span className="block text-white/30 text-sm font-normal mt-1.5">Calculate weight using d²/162.2 for MS, SS 304/316, EN24, aluminium &amp; brass</span></h1>
        <div className="mb-8"><RoundBarWeightCalc /></div>

        <section className="glass-panel p-5 sm:p-6 mb-8">
          <h2 className="text-white font-bold text-lg sm:text-xl mb-4">Round Bar Weight Chart — MS, SS 304 &amp; SS 316</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead><tr className="border-b border-white/10">
                <th className="text-left text-white/50 font-semibold py-2.5 px-3">Dia (mm)</th>
                <th className="text-right text-white/50 font-semibold py-2.5 px-3">MS (kg/m)</th>
                <th className="text-right text-white/50 font-semibold py-2.5 px-3">SS 304 (kg/m)</th>
                <th className="text-right text-white/50 font-semibold py-2.5 px-3">SS 316 (kg/m)</th>
              </tr></thead>
              <tbody>{roundBars.map((row) => (
                <tr key={row.diameter} className="border-b border-white/5 hover:bg-white/[0.02]">
                  <td className="text-white/70 py-2.5 px-3 font-semibold">{row.diameter}</td>
                  <td className="text-right text-accent/80 py-2.5 px-3 font-mono font-semibold">{row.weightPerMetreMS.toFixed(3)}</td>
                  <td className="text-right text-white/50 py-2.5 px-3 font-mono">{row.weightPerMetreSS304.toFixed(3)}</td>
                  <td className="text-right text-white/50 py-2.5 px-3 font-mono">{row.weightPerMetreSS316.toFixed(3)}</td>
                </tr>
              ))}</tbody>
            </table>
          </div>
        </section>

        <section className="glass-panel p-5 sm:p-6 mb-8">
          <h2 className="text-white font-bold text-lg sm:text-xl mb-4">Round Bar Weight Formula &amp; Examples</h2>
          <div className="text-white/50 text-sm space-y-4 leading-relaxed">
            <div className="glass-panel p-4 font-mono text-accent text-center text-base">Weight (kg/m) = d² / 162.2 × (density / 7.85)</div>
            <p>For mild steel (density 7.85), the formula simplifies to <strong className="text-white/70">d²/162.2</strong>. For other materials, multiply by the density ratio.</p>
            <div className="glass-panel p-4 mt-4">
              <h3 className="text-white font-bold text-sm mb-2">Example — 40mm SS 304 Round Bar × 3m</h3>
              <div className="space-y-1.5 font-mono text-xs">
                <p><span className="text-white/30">Step 1:</span> <span className="text-white/70">d²/162.2 = 1600/162.2 = 9.86 kg/m (MS base)</span></p>
                <p><span className="text-white/30">Step 2:</span> <span className="text-white/70">9.86 × (8.0/7.85) = <span className="text-accent">10.05 kg/m</span></span></p>
                <p><span className="text-white/30">Step 3:</span> <span className="text-white/70">10.05 × 3m = 30.16 kg</span></p>
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
            {[{ href: "/calculators/tmt", title: "TMT Bar Calculator", desc: "Rebar weight d²/162 all sizes" },{ href: "/calculators/stainless-steel-weight", title: "Stainless Steel Calculator", desc: "SS 304/316/202 all sections" },{ href: "/calculators/flat-bar-weight", title: "Flat Bar Calculator", desc: "MS flat bar all sizes" },{ href: "/calculators/pipe-weight", title: "MS Pipe Calculator", desc: "All NB sizes 15mm to 200mm" },{ href: "/calculators/steel-plate", title: "Steel Plate Calculator", desc: "Plate weight by L×W×T×7.85" },{ href: "/calculator", title: "All-in-One Calculator", desc: "All section types in one tool" }].map((c) => (
              <Link key={c.href} href={c.href} className="block p-3 rounded-lg bg-white/[0.03] border border-white/5 hover:border-accent/20 transition-colors no-underline group"><div className="text-white/80 font-semibold text-sm group-hover:text-accent transition-colors">{c.title}</div><div className="text-white/30 text-xs mt-1">{c.desc}</div></Link>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
