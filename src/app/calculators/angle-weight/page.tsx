import type { Metadata } from "next";
import Link from "next/link";
import AngleWeightCalc from "@/components/calculators/AngleWeightCalc";
import BreadcrumbSchema from "@/components/seo/BreadcrumbSchema";
import CalculatorSchema from "@/components/seo/CalculatorSchema";
import { equalAngles } from "@/lib/data/section-weights";

export const metadata: Metadata = {
  title: "Steel Angle Weight Calculator — Equal & Unequal IS 808 Chart | SteelMath",
  description: "Free steel angle weight calculator for all equal and unequal angle sizes as per IS 808. Calculate weight using (A + B − T) × T × 0.00785. Complete chart from 25×25×3 to 200×200×16.",
  keywords: ["steel angle weight calculator", "ms angle weight chart", "angle weight per metre", "steel angle weight formula", "equal angle weight chart", "is 808 angle sizes", "50x50x5 angle weight", "75x75x6 angle weight", "100x100x10 angle weight", "l angle weight chart"],
  alternates: { canonical: "https://steelmath.com/calculators/angle-weight" },
  openGraph: { title: "Steel Angle Weight Calculator — Equal & Unequal IS 808 | SteelMath", description: "Calculate steel angle weight for all IS 808 sizes. Complete chart from 25×25 to 200×200.", url: "https://steelmath.com/calculators/angle-weight", type: "website" },
};

const FAQS = [
  { question: "How to calculate steel angle weight?", answer: "Weight per metre = (A + B − T) × T × 0.00785, where A and B are leg sizes in mm and T is thickness in mm. For 50×50×5: (50 + 50 − 5) × 5 × 0.00785 = 3.73 kg/m." },
  { question: "What is the weight of 50×50×5 angle per metre?", answer: "A 50×50×5mm equal angle weighs 3.73 kg per metre. A 6m length weighs 22.38 kg." },
  { question: "What are standard angle sizes in India?", answer: "Standard equal angles per IS 808 range from 20×20×3 to 200×200×25. Common sizes: 25×25, 40×40, 50×50, 65×65, 75×75, 100×100 in various thicknesses. Standard length is 6m." },
  { question: "How much does 75×75×6 angle weigh per 6m?", answer: "A 75×75×6mm angle weighs 6.77 kg/m, so a 6m piece weighs 40.62 kg." },
];

export default function AngleWeightPage() {
  return (
    <>
      <BreadcrumbSchema items={[{ name: "Calculators", href: "/calculators" }, { name: "Steel Angle Weight Calculator", href: "/calculators/angle-weight" }]} />
      <CalculatorSchema name="Steel Angle Weight Calculator" url="https://steelmath.com/calculators/angle-weight" description="Free steel angle weight calculator for all IS 808 equal and unequal sizes." featureList={["All IS 808 equal angle sizes", "Custom angle dimensions", "Weight per metre and per 6m", "Quick-select common sizes", "Formula: (A+B−T)×T×0.00785"]} faqs={FAQS} />
      <div className="relative z-10 max-w-[1400px] mx-auto px-4 sm:px-5 py-5">
        <nav className="flex items-center gap-1.5 text-xs text-white/25 mb-5">
          <Link href="/" className="hover:text-accent no-underline transition-colors">Home</Link><span>/</span>
          <Link href="/calculators" className="hover:text-accent no-underline transition-colors">Calculators</Link><span>/</span>
          <span className="text-white/50">Steel Angle Weight</span>
        </nav>
        <h1 className="text-white text-2xl sm:text-3xl font-bold mb-5 tracking-tight">Steel Angle Weight Calculator — All IS 808 Sizes<span className="block text-white/30 text-sm font-normal mt-1.5">Calculate MS angle weight using (A + B − T) × T × 0.00785 for equal &amp; unequal angles</span></h1>
        <div className="mb-8"><AngleWeightCalc /></div>

        <section className="glass-panel p-5 sm:p-6 mb-8">
          <h2 className="text-white font-bold text-lg sm:text-xl mb-4">Complete Steel Angle Weight Chart — Equal Angles (IS 808)</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead><tr className="border-b border-white/10">
                <th className="text-left text-white/50 font-semibold py-2.5 px-3">Size (mm)</th>
                <th className="text-right text-white/50 font-semibold py-2.5 px-3">Thickness</th>
                <th className="text-right text-white/50 font-semibold py-2.5 px-3">kg/m</th>
                <th className="text-right text-white/50 font-semibold py-2.5 px-3">kg/6m</th>
              </tr></thead>
              <tbody>{equalAngles.map((row, i) => (
                <tr key={i} className="border-b border-white/5 hover:bg-white/[0.02]">
                  <td className="text-white/70 py-2.5 px-3 font-semibold">{row.legA}×{row.legB}</td>
                  <td className="text-right text-white/50 py-2.5 px-3 font-mono">{row.thickness}</td>
                  <td className="text-right text-accent/80 py-2.5 px-3 font-mono font-semibold">{row.weightPerMetre.toFixed(2)}</td>
                  <td className="text-right text-white/50 py-2.5 px-3 font-mono">{row.weightPer6m.toFixed(2)}</td>
                </tr>
              ))}</tbody>
            </table>
          </div>
        </section>

        <section className="glass-panel p-5 sm:p-6 mb-8">
          <h2 className="text-white font-bold text-lg sm:text-xl mb-4">Steel Angle Weight Formula &amp; Examples</h2>
          <div className="text-white/50 text-sm space-y-4 leading-relaxed">
            <div className="glass-panel p-4 font-mono text-accent text-center text-base">Weight (kg/m) = (A + B − T) × T × 0.00785</div>
            <div className="glass-panel p-4 mt-4">
              <h3 className="text-white font-bold text-sm mb-2">Example — 50×50×5 Equal Angle</h3>
              <div className="space-y-1.5 font-mono text-xs">
                <p><span className="text-white/30">Step 1:</span> <span className="text-white/70">(50 + 50 − 5) = 95</span></p>
                <p><span className="text-white/30">Step 2:</span> <span className="text-white/70">95 × 5 × 0.00785 = <span className="text-accent">3.73 kg/m</span></span></p>
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
            {[{ href: "/calculators/beam-weight", title: "I-Beam (ISMB) Calculator", desc: "All ISMB sizes with section properties" },{ href: "/calculators/channel-weight", title: "Channel (ISMC) Calculator", desc: "All ISMC channel sizes" },{ href: "/calculators/flat-bar-weight", title: "Flat Bar Calculator", desc: "MS flat bar all sizes" },{ href: "/calculators/pipe-weight", title: "MS Pipe Calculator", desc: "All NB sizes 15mm to 200mm" },{ href: "/calculators/tmt", title: "TMT Bar Calculator", desc: "d²/162 for rebar sizes" },{ href: "/calculator", title: "All-in-One Calculator", desc: "All section types in one tool" }].map((c) => (
              <Link key={c.href} href={c.href} className="block p-3 rounded-lg bg-white/[0.03] border border-white/5 hover:border-accent/20 transition-colors no-underline group"><div className="text-white/80 font-semibold text-sm group-hover:text-accent transition-colors">{c.title}</div><div className="text-white/30 text-xs mt-1">{c.desc}</div></Link>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
