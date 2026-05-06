import type { Metadata } from "next";
import Link from "next/link";
import PipeWeightCalc from "@/components/calculators/PipeWeightCalc";
import BreadcrumbSchema from "@/components/seo/BreadcrumbSchema";
import CalculatorSchema from "@/components/seo/CalculatorSchema";
import { pipes } from "@/lib/data/section-weights";

export const metadata: Metadata = {
  title: "MS Pipe Weight Calculator — All NB Sizes 15mm to 200mm | SteelMath",
  description: "Free MS pipe weight calculator for all Nominal Bore sizes from 15mm to 200mm. Uses formula (OD − WT) × WT × 0.02466. Covers IS 1239 Light, Medium & Heavy classes with complete weight chart.",
  keywords: ["ms pipe weight calculator", "pipe weight calculator", "ms pipe weight per metre", "gi pipe weight chart", "steel pipe weight formula", "pipe weight per foot", "is 1239 pipe weight", "ms pipe weight chart", "pipe od wt weight", "nominal bore pipe size"],
  alternates: { canonical: "https://steelmath.com/calculators/pipe-weight" },
  openGraph: { title: "MS Pipe Weight Calculator — All NB Sizes | SteelMath", description: "Calculate MS pipe weight for all NB sizes. Complete chart with OD, wall thickness & weight per metre.", url: "https://steelmath.com/calculators/pipe-weight", type: "website" },
};

const FAQS = [
  { question: "How to calculate MS pipe weight?", answer: "MS pipe weight per metre = (OD − WT) × WT × 0.02466, where OD is outer diameter in mm and WT is wall thickness in mm. Example: 2\" NB pipe (OD 60.3mm, WT 3.6mm) weighs (60.3 − 3.6) × 3.6 × 0.02466 = 5.03 kg/m." },
  { question: "What is the difference between NB and OD?", answer: "NB (Nominal Bore) is the approximate internal diameter used for classification, while OD (Outer Diameter) is the actual external measurement. A 50mm NB pipe has an actual OD of 60.3mm." },
  { question: "What are Light, Medium and Heavy class pipes?", answer: "IS 1239 classifies steel pipes into Light (A), Medium (B) and Heavy (C) based on wall thickness. Medium class is most common. This calculator uses Medium class values by default." },
  { question: "How much does a 1 inch MS pipe weigh per metre?", answer: "A 1 inch (25mm NB) MS pipe in Medium class weighs 2.41 kg per metre with OD 33.7mm and WT 3.2mm. A 6m length weighs 14.46 kg." },
  { question: "What is the standard length of MS pipe in India?", answer: "Standard length is 6 metres as per IS 1239. GI pipes are also 6m. Custom cut lengths may be available for large orders." },
];

export default function PipeWeightPage() {
  return (
    <>
      <BreadcrumbSchema items={[{ name: "Calculators", href: "/calculators" }, { name: "MS Pipe Weight Calculator", href: "/calculators/pipe-weight" }]} />
      <CalculatorSchema name="MS Pipe Weight Calculator" url="https://steelmath.com/calculators/pipe-weight" description="Free MS pipe weight calculator for all NB sizes 15mm to 200mm using (OD − WT) × WT × 0.02466." featureList={["All NB sizes: 15mm to 200mm", "Standard & custom OD/WT entry", "Weight per metre and per 6m", "IS 1239 Medium class values", "Quantity and length calculation"]} faqs={FAQS} />
      <div className="relative z-10 max-w-[1400px] mx-auto px-4 sm:px-5 py-5">
        <nav className="flex items-center gap-1.5 text-xs text-white/25 mb-5">
          <Link href="/" className="hover:text-accent no-underline transition-colors">Home</Link><span>/</span>
          <Link href="/calculators" className="hover:text-accent no-underline transition-colors">Calculators</Link><span>/</span>
          <span className="text-white/50">MS Pipe Weight</span>
        </nav>
        <h1 className="text-white text-2xl sm:text-3xl font-bold mb-5 tracking-tight">MS Pipe Weight Calculator — All NB Sizes<span className="block text-white/30 text-sm font-normal mt-1.5">Calculate mild steel pipe weight using (OD − WT) × WT × 0.02466 for IS 1239 sizes</span></h1>
        <div className="mb-8"><PipeWeightCalc /></div>

        <section className="glass-panel p-5 sm:p-6 mb-8">
          <h2 className="text-white font-bold text-lg sm:text-xl mb-4">Complete MS Pipe Weight Chart — IS 1239 Medium Class</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead><tr className="border-b border-white/10">
                <th className="text-left text-white/50 font-semibold py-2.5 px-3">NB (mm)</th>
                <th className="text-left text-white/50 font-semibold py-2.5 px-3">Inch</th>
                <th className="text-right text-white/50 font-semibold py-2.5 px-3">OD (mm)</th>
                <th className="text-right text-white/50 font-semibold py-2.5 px-3">WT (mm)</th>
                <th className="text-right text-white/50 font-semibold py-2.5 px-3">kg/m</th>
                <th className="text-right text-white/50 font-semibold py-2.5 px-3">kg/6m</th>
              </tr></thead>
              <tbody>{pipes.map((row) => (
                <tr key={row.nbSize} className="border-b border-white/5 hover:bg-white/[0.02]">
                  <td className="text-white/70 py-2.5 px-3 font-semibold">{row.nbSize}</td>
                  <td className="text-white/50 py-2.5 px-3">{row.nbInch}</td>
                  <td className="text-right text-white/50 py-2.5 px-3 font-mono">{row.od}</td>
                  <td className="text-right text-white/50 py-2.5 px-3 font-mono">{row.wallThickness}</td>
                  <td className="text-right text-accent/80 py-2.5 px-3 font-mono font-semibold">{row.weightPerMetre.toFixed(2)}</td>
                  <td className="text-right text-white/50 py-2.5 px-3 font-mono">{row.weightPer6m.toFixed(2)}</td>
                </tr>
              ))}</tbody>
            </table>
          </div>
        </section>

        <section className="glass-panel p-5 sm:p-6 mb-8">
          <h2 className="text-white font-bold text-lg sm:text-xl mb-4">How to Calculate MS Pipe Weight — Formula &amp; Examples</h2>
          <div className="text-white/50 text-sm space-y-4 leading-relaxed">
            <p>The weight of a mild steel pipe is determined by its cross-sectional area multiplied by the length and density of steel:</p>
            <div className="glass-panel p-4 font-mono text-accent text-center text-base">Weight (kg/m) = (OD − WT) × WT × 0.02466</div>
            <p>Where <strong className="text-white/70">OD</strong> = Outer Diameter in mm, <strong className="text-white/70">WT</strong> = Wall Thickness in mm. The constant 0.02466 = π × 7850 / 1,000,000.</p>
            <div className="glass-panel p-4 mt-4">
              <h3 className="text-white font-bold text-sm mb-2">Example — 2&quot; NB Pipe (50mm NB)</h3>
              <div className="space-y-1.5 font-mono text-xs">
                <p><span className="text-white/30">Given:</span> <span className="text-white/70">OD = 60.3mm, WT = 3.6mm</span></p>
                <p><span className="text-white/30">Step 1:</span> <span className="text-white/70">(60.3 − 3.6) = 56.7</span></p>
                <p><span className="text-white/30">Step 2:</span> <span className="text-white/70">56.7 × 3.6 × 0.02466 = <span className="text-accent">5.03 kg/m</span></span></p>
              </div>
            </div>
            <p>GI pipes weigh approximately 3-5% more than MS pipes due to the zinc coating. Multiply MS weight by 1.04 for GI pipe weight.</p>
            <p className="mt-3">Want to understand <em>why</em> hollow pipes are structurally superior to solid bars at equal weight? Read our engineering deep-dive: <Link href="/articles/hollow-vs-solid-steel-sections-structural-efficiency" className="text-accent hover:text-accent/80 transition-colors">Why Hollow Steel Sections Are Stronger Than Solid &mdash; The Math</Link>.</p>
          </div>
        </section>

        <section className="glass-panel p-5 sm:p-6 mb-8">
          <h2 className="text-white font-bold text-lg sm:text-xl mb-4">Frequently Asked Questions</h2>
          <div className="space-y-4">{FAQS.map((faq) => (<div key={faq.question}><h3 className="text-white/80 font-semibold text-sm mb-1">{faq.question}</h3><p className="text-white/40 text-sm leading-relaxed">{faq.answer}</p></div>))}</div>
        </section>

        <section className="glass-panel p-5 sm:p-6">
          <h2 className="text-white font-bold text-lg sm:text-xl mb-4">Related Calculators</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {[{ href: "/calculators/square-tube-weight", title: "Square Tube Calculator", desc: "SHS weight for all sizes" },{ href: "/calculators/rect-tube-weight", title: "Rectangular Tube Calculator", desc: "RHS weight for all sizes" },{ href: "/calculators/tmt", title: "TMT Bar Calculator", desc: "d²/162 for all rebar sizes" },{ href: "/calculators/angle-weight", title: "Steel Angle Calculator", desc: "Equal & unequal angles IS 808" },{ href: "/calculators/steel-plate", title: "Steel Plate Calculator", desc: "Plate weight by L×W×T×7.85" },{ href: "/calculator", title: "All-in-One Calculator", desc: "All section types in one tool" }].map((c) => (
              <Link key={c.href} href={c.href} className="block p-3 rounded-lg bg-white/[0.03] border border-white/5 hover:border-accent/20 transition-colors no-underline group"><div className="text-white/80 font-semibold text-sm group-hover:text-accent transition-colors">{c.title}</div><div className="text-white/30 text-xs mt-1">{c.desc}</div></Link>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
