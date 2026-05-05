import type { Metadata } from "next";
import Link from "next/link";
import BeamWeightCalc from "@/components/calculators/BeamWeightCalc";
import BreadcrumbSchema from "@/components/seo/BreadcrumbSchema";
import CalculatorSchema from "@/components/seo/CalculatorSchema";
import { ismbBeams } from "@/lib/data/section-weights";

export const metadata: Metadata = {
  title: "I-Beam (ISMB) Weight Calculator — All Sizes with Section Properties | SteelMath",
  description: "Free ISMB beam weight calculator for all Indian Standard Medium Beam sizes. Complete chart with depth, flange width, web thickness, weight per metre, section modulus (Zxx) and moment of inertia (Ixx).",
  keywords: ["ismb weight calculator", "i beam weight chart", "ismb beam weight per metre", "steel beam weight calculator", "ismb 200 weight", "ismb 300 weight per metre", "ismb section properties", "i beam weight formula", "ismb moment of inertia", "steel beam sizes india"],
  alternates: { canonical: "https://steelmath.com/calculators/beam-weight" },
  openGraph: { title: "I-Beam (ISMB) Weight Calculator — All Sizes | SteelMath", description: "Calculate ISMB beam weight for all sizes. Complete chart with section properties Zxx & Ixx.", url: "https://steelmath.com/calculators/beam-weight", type: "website" },
};

const FAQS = [
  { question: "How to find ISMB beam weight per metre?", answer: "ISMB beam weights are standardized per IS 808. For example, ISMB 200 weighs 25.4 kg/m, ISMB 300 weighs 44.2 kg/m. Use the chart below or enter the designation in our calculator." },
  { question: "What does ISMB stand for?", answer: "ISMB stands for Indian Standard Medium Weight Beam. It is the most commonly used I-beam section in India for structural applications like columns, beams, and trusses." },
  { question: "What is the weight of ISMB 200 per metre?", answer: "ISMB 200 weighs 25.4 kg per metre. A standard 12m length weighs approximately 304.8 kg." },
  { question: "What is section modulus (Zxx) and why is it important?", answer: "Section modulus (Zxx) indicates a beam's resistance to bending. Higher Zxx means the beam can carry more load. ISMB 300 has Zxx of 573.6 cm³ compared to ISMB 200's 223.5 cm³." },
  { question: "What is the standard length of ISMB beams in India?", answer: "Standard lengths are 10m, 11m, and 12m as per IS 2062. Most mills supply 12m lengths. Custom lengths can be ordered for large quantities." },
];

export default function BeamWeightPage() {
  return (
    <>
      <BreadcrumbSchema items={[{ name: "Calculators", href: "/calculators" }, { name: "I-Beam (ISMB) Weight Calculator", href: "/calculators/beam-weight" }]} />
      <CalculatorSchema name="I-Beam (ISMB) Weight Calculator" url="https://steelmath.com/calculators/beam-weight" description="Free ISMB beam weight calculator with section properties for all Indian Standard sizes." featureList={["All ISMB sizes from 100 to 600", "Section modulus Zxx values", "Moment of inertia Ixx values", "Weight per metre and total weight", "Depth, flange & web dimensions"]} faqs={FAQS} />
      <div className="relative z-10 max-w-[1400px] mx-auto px-4 sm:px-5 py-5">
        <nav className="flex items-center gap-1.5 text-xs text-white/25 mb-5">
          <Link href="/" className="hover:text-accent no-underline transition-colors">Home</Link><span>/</span>
          <Link href="/calculators" className="hover:text-accent no-underline transition-colors">Calculators</Link><span>/</span>
          <span className="text-white/50">I-Beam (ISMB) Weight</span>
        </nav>
        <h1 className="text-white text-2xl sm:text-3xl font-bold mb-5 tracking-tight">I-Beam (ISMB) Weight Calculator — All Sizes<span className="block text-white/30 text-sm font-normal mt-1.5">Complete ISMB weight chart with section properties Zxx &amp; Ixx as per IS 808</span></h1>
        <div className="mb-8"><BeamWeightCalc /></div>

        <section className="glass-panel p-5 sm:p-6 mb-8">
          <h2 className="text-white font-bold text-lg sm:text-xl mb-4">Complete ISMB Weight Chart with Section Properties</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead><tr className="border-b border-white/10">
                <th className="text-left text-white/50 font-semibold py-2.5 px-3">Designation</th>
                <th className="text-right text-white/50 font-semibold py-2.5 px-3">Depth (mm)</th>
                <th className="text-right text-white/50 font-semibold py-2.5 px-3">Flange (mm)</th>
                <th className="text-right text-white/50 font-semibold py-2.5 px-3">Web (mm)</th>
                <th className="text-right text-white/50 font-semibold py-2.5 px-3">kg/m</th>
                <th className="text-right text-white/50 font-semibold py-2.5 px-3">Zxx (cm³)</th>
                <th className="text-right text-white/50 font-semibold py-2.5 px-3">Ixx (cm⁴)</th>
              </tr></thead>
              <tbody>{ismbBeams.map((row) => (
                <tr key={row.designation} className="border-b border-white/5 hover:bg-white/[0.02]">
                  <td className="text-white/70 py-2.5 px-3 font-semibold">{row.designation}</td>
                  <td className="text-right text-white/50 py-2.5 px-3 font-mono">{row.depth}</td>
                  <td className="text-right text-white/50 py-2.5 px-3 font-mono">{row.flangeWidth}</td>
                  <td className="text-right text-white/50 py-2.5 px-3 font-mono">{row.webThickness}</td>
                  <td className="text-right text-accent/80 py-2.5 px-3 font-mono font-semibold">{row.weightPerMetre.toFixed(1)}</td>
                  <td className="text-right text-white/50 py-2.5 px-3 font-mono">{row.sectionModulusZxx.toFixed(1)}</td>
                  <td className="text-right text-white/50 py-2.5 px-3 font-mono">{row.momentOfInertiaIxx.toFixed(1)}</td>
                </tr>
              ))}</tbody>
            </table>
          </div>
        </section>

        <section className="glass-panel p-5 sm:p-6 mb-8">
          <h2 className="text-white font-bold text-lg sm:text-xl mb-4">ISMB Beam Weight — How to Calculate</h2>
          <div className="text-white/50 text-sm space-y-4 leading-relaxed">
            <p>ISMB beam weights are standardized values from IS 808 tables. Unlike simple shapes, I-beam weight depends on the exact profile dimensions (depth, flange width, flange thickness, web thickness, and root radius).</p>
            <div className="glass-panel p-4 font-mono text-accent text-center text-base">Total Weight = Weight per metre × Length × Quantity</div>
            <div className="glass-panel p-4 mt-4">
              <h3 className="text-white font-bold text-sm mb-2">Example — ISMB 300 × 12m</h3>
              <div className="space-y-1.5 font-mono text-xs">
                <p><span className="text-white/30">Given:</span> <span className="text-white/70">ISMB 300, Length = 12m, Qty = 5</span></p>
                <p><span className="text-white/30">Step 1:</span> <span className="text-white/70">Weight/m from table = 44.2 kg/m</span></p>
                <p><span className="text-white/30">Step 2:</span> <span className="text-white/70">44.2 × 12 × 5 = <span className="text-accent">2,652 kg (2.65 MT)</span></span></p>
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
            {[{ href: "/calculators/channel-weight", title: "Channel (ISMC) Calculator", desc: "All ISMC channel sizes" },{ href: "/calculators/angle-weight", title: "Steel Angle Calculator", desc: "Equal & unequal angles IS 808" },{ href: "/calculators/pipe-weight", title: "MS Pipe Calculator", desc: "All NB sizes 15mm to 200mm" },{ href: "/calculators/flat-bar-weight", title: "Flat Bar Calculator", desc: "MS flat bar all sizes" },{ href: "/calculators/steel-plate", title: "Steel Plate Calculator", desc: "Plate weight by L×W×T×7.85" },{ href: "/calculator", title: "All-in-One Calculator", desc: "All section types in one tool" }].map((c) => (
              <Link key={c.href} href={c.href} className="block p-3 rounded-lg bg-white/[0.03] border border-white/5 hover:border-accent/20 transition-colors no-underline group"><div className="text-white/80 font-semibold text-sm group-hover:text-accent transition-colors">{c.title}</div><div className="text-white/30 text-xs mt-1">{c.desc}</div></Link>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
