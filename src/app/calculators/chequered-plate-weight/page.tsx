import type { Metadata } from "next";
import Link from "next/link";
import ChequeredPlateWeightCalc from "@/components/calculators/ChequeredPlateWeightCalc";
import BreadcrumbSchema from "@/components/seo/BreadcrumbSchema";
import CalculatorSchema from "@/components/seo/CalculatorSchema";
import { chequeredPlates } from "@/lib/data/section-weights";

export const metadata: Metadata = {
  title: "Chequered Plate Weight Calculator — All Thicknesses 3mm to 25mm | SteelMath",
  description: "Free chequered plate weight calculator for all thicknesses from 3mm to 25mm. Uses formula thickness × 7.85 × 1.05 (5% extra for diamond pattern). Complete weight chart.",
  keywords: ["chequered plate weight calculator", "checkered plate weight", "diamond plate weight", "chequered plate weight chart", "chequered plate weight per sqm", "ms chequered plate weight", "pattern plate weight", "anti slip plate weight", "tear plate weight", "chequered plate 6mm weight"],
  alternates: { canonical: "https://steelmath.com/calculators/chequered-plate-weight" },
  openGraph: { title: "Chequered Plate Weight Calculator — All Thicknesses | SteelMath", description: "Calculate chequered plate weight with 5% pattern factor. Chart from 3mm to 25mm.", url: "https://steelmath.com/calculators/chequered-plate-weight", type: "website" },
};

const FAQS = [
  { question: "How to calculate chequered plate weight?", answer: "Chequered plate weight per m² = Thickness × 7.85 × 1.05. The 1.05 factor adds 5% for the raised diamond pattern. Example: 6mm chequered plate weighs 6 × 7.85 × 1.05 = 49.46 kg/m²." },
  { question: "What is the extra weight of chequered pattern?", answer: "The diamond/chequered pattern adds approximately 5% extra weight over a plain plate of the same thickness. This is accounted for by the 1.05 multiplier in the formula." },
  { question: "What is the weight of 6mm chequered plate?", answer: "A 6mm chequered plate weighs 49.46 kg/m². A standard 1500×6000mm sheet weighs 445.10 kg, and a 2000×6000mm sheet weighs 593.46 kg." },
  { question: "What are common chequered plate thicknesses?", answer: "Common thicknesses are 3mm, 4mm, 5mm, 6mm, 8mm, 10mm, 12mm. For industrial flooring, 6mm and 8mm are most common. Thicker plates (14-25mm) are used for heavy-duty applications." },
  { question: "What is the difference between chequered and plain plate weight?", answer: "Chequered plate weighs 5% more than plain plate of the same base thickness due to the raised pattern. A 6mm plain plate weighs 47.10 kg/m² while chequered weighs 49.46 kg/m²." },
];

export default function ChequeredPlateWeightPage() {
  return (
    <>
      <BreadcrumbSchema items={[{ name: "Calculators", href: "/calculators" }, { name: "Chequered Plate Weight Calculator", href: "/calculators/chequered-plate-weight" }]} />
      <CalculatorSchema name="Chequered Plate Weight Calculator" url="https://steelmath.com/calculators/chequered-plate-weight" description="Free chequered plate weight calculator with 5% pattern factor for all thicknesses." featureList={["All thicknesses 3mm to 25mm", "5% pattern weight factor", "Custom length and width entry", "Weight per m² and total weight", "Standard 1500×6000 & 2000×6000 weights"]} faqs={FAQS} />
      <div className="relative z-10 max-w-[1400px] mx-auto px-4 sm:px-5 py-5">
        <nav className="flex items-center gap-1.5 text-xs text-white/25 mb-5">
          <Link href="/" className="hover:text-accent no-underline transition-colors">Home</Link><span>/</span>
          <Link href="/calculators" className="hover:text-accent no-underline transition-colors">Calculators</Link><span>/</span>
          <span className="text-white/50">Chequered Plate Weight</span>
        </nav>
        <h1 className="text-white text-2xl sm:text-3xl font-bold mb-5 tracking-tight">Chequered Plate Weight Calculator — All Thicknesses<span className="block text-white/30 text-sm font-normal mt-1.5">Calculate diamond pattern plate weight using thickness × 7.85 × 1.05 (5% pattern)</span></h1>
        <div className="mb-8"><ChequeredPlateWeightCalc /></div>

        <section className="glass-panel p-5 sm:p-6 mb-8">
          <h2 className="text-white font-bold text-lg sm:text-xl mb-4">Complete Chequered Plate Weight Chart</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead><tr className="border-b border-white/10">
                <th className="text-left text-white/50 font-semibold py-2.5 px-3">Thickness (mm)</th>
                <th className="text-right text-white/50 font-semibold py-2.5 px-3">kg/m²</th>
                <th className="text-right text-white/50 font-semibold py-2.5 px-3">1500×6000 (kg)</th>
                <th className="text-right text-white/50 font-semibold py-2.5 px-3">2000×6000 (kg)</th>
              </tr></thead>
              <tbody>{chequeredPlates.map((row) => (
                <tr key={row.thickness} className="border-b border-white/5 hover:bg-white/[0.02]">
                  <td className="text-white/70 py-2.5 px-3 font-semibold">{row.thickness}mm</td>
                  <td className="text-right text-accent/80 py-2.5 px-3 font-mono font-semibold">{row.weightPerSqm.toFixed(2)}</td>
                  <td className="text-right text-white/50 py-2.5 px-3 font-mono">{row.weight1500x6000.toFixed(2)}</td>
                  <td className="text-right text-white/50 py-2.5 px-3 font-mono">{row.weight2000x6000.toFixed(2)}</td>
                </tr>
              ))}</tbody>
            </table>
          </div>
        </section>

        <section className="glass-panel p-5 sm:p-6 mb-8">
          <h2 className="text-white font-bold text-lg sm:text-xl mb-4">Chequered Plate Weight Formula &amp; Examples</h2>
          <div className="text-white/50 text-sm space-y-4 leading-relaxed">
            <div className="glass-panel p-4 font-mono text-accent text-center text-base">Weight (kg/m²) = Thickness × 7.85 × 1.05</div>
            <p>The factor <strong className="text-white/70">1.05</strong> accounts for the 5% extra weight of the raised diamond/chequered pattern on the plate surface.</p>
            <div className="glass-panel p-4 mt-4">
              <h3 className="text-white font-bold text-sm mb-2">Example — 8mm Chequered Plate (1500×6000)</h3>
              <div className="space-y-1.5 font-mono text-xs">
                <p><span className="text-white/30">Step 1:</span> <span className="text-white/70">8 × 7.85 × 1.05 = 65.94 kg/m²</span></p>
                <p><span className="text-white/30">Step 2:</span> <span className="text-white/70">Area = 1.5 × 6.0 = 9.0 m²</span></p>
                <p><span className="text-white/30">Step 3:</span> <span className="text-white/70">65.94 × 9.0 = <span className="text-accent">593.46 kg</span></span></p>
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
            {[{ href: "/calculators/steel-plate", title: "Steel Plate Calculator", desc: "Plain plate weight by L×W×T×7.85" },{ href: "/calculators/stainless-steel-weight", title: "Stainless Steel Calculator", desc: "SS 304/316/202 all sections" },{ href: "/calculators/flat-bar-weight", title: "Flat Bar Calculator", desc: "MS flat bar all sizes" },{ href: "/calculators/angle-weight", title: "Steel Angle Calculator", desc: "Equal & unequal angles IS 808" },{ href: "/calculators/tmt", title: "TMT Bar Calculator", desc: "Rebar weight d²/162 all sizes" },{ href: "/calculator", title: "All-in-One Calculator", desc: "All section types in one tool" }].map((c) => (
              <Link key={c.href} href={c.href} className="block p-3 rounded-lg bg-white/[0.03] border border-white/5 hover:border-accent/20 transition-colors no-underline group"><div className="text-white/80 font-semibold text-sm group-hover:text-accent transition-colors">{c.title}</div><div className="text-white/30 text-xs mt-1">{c.desc}</div></Link>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
