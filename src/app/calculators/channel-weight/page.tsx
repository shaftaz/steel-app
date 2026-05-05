import type { Metadata } from "next";
import Link from "next/link";
import ChannelWeightCalc from "@/components/calculators/ChannelWeightCalc";
import BreadcrumbSchema from "@/components/seo/BreadcrumbSchema";
import CalculatorSchema from "@/components/seo/CalculatorSchema";
import { ismcChannels } from "@/lib/data/section-weights";

export const metadata: Metadata = {
  title: "Channel (ISMC) Weight Calculator — All Sizes 75 to 400 | SteelMath",
  description: "Free ISMC channel weight calculator for all Indian Standard Medium Channel sizes from ISMC 75 to ISMC 400. Complete chart with depth, flange width, web & flange thickness, and weight per metre.",
  keywords: ["ismc weight calculator", "channel weight chart", "ismc channel weight per metre", "steel channel weight calculator", "ismc 150 weight", "ismc 200 weight per metre", "c channel weight chart", "ismc section properties", "steel channel sizes india", "ismc weight per foot"],
  alternates: { canonical: "https://steelmath.com/calculators/channel-weight" },
  openGraph: { title: "Channel (ISMC) Weight Calculator — All Sizes | SteelMath", description: "Calculate ISMC channel weight for all sizes. Complete chart with section dimensions.", url: "https://steelmath.com/calculators/channel-weight", type: "website" },
};

const FAQS = [
  { question: "How to find ISMC channel weight per metre?", answer: "ISMC channel weights are standardized per IS 808. For example, ISMC 150 weighs 16.4 kg/m, ISMC 200 weighs 22.1 kg/m. Use the chart below or enter the designation in our calculator." },
  { question: "What does ISMC stand for?", answer: "ISMC stands for Indian Standard Medium Weight Channel. It is the most commonly used C-channel section in India for structural applications like purlins, bracings, and frames." },
  { question: "What is the weight of ISMC 150 per metre?", answer: "ISMC 150 weighs 16.4 kg per metre. A standard 12m length weighs approximately 196.8 kg." },
  { question: "What is the standard length of ISMC channels in India?", answer: "Standard lengths are 6m, 9m, 10m, 11m, and 12m as per IS 2062. Most mills supply 6m and 12m lengths." },
  { question: "What is the difference between ISMC and ISLC?", answer: "ISMC is Indian Standard Medium Channel with wider flanges and thicker web, while ISLC is Indian Standard Light Channel which is lighter and has narrower flanges. ISMC is more commonly used in structural applications." },
];

export default function ChannelWeightPage() {
  return (
    <>
      <BreadcrumbSchema items={[{ name: "Calculators", href: "/calculators" }, { name: "Channel (ISMC) Weight Calculator", href: "/calculators/channel-weight" }]} />
      <CalculatorSchema name="Channel (ISMC) Weight Calculator" url="https://steelmath.com/calculators/channel-weight" description="Free ISMC channel weight calculator for all Indian Standard sizes from 75 to 400." featureList={["All ISMC sizes from 75 to 400", "Depth, flange & web dimensions", "Weight per metre and total weight", "Flange thickness values", "IS 808 standard values"]} faqs={FAQS} />
      <div className="relative z-10 max-w-[1400px] mx-auto px-4 sm:px-5 py-5">
        <nav className="flex items-center gap-1.5 text-xs text-white/25 mb-5">
          <Link href="/" className="hover:text-accent no-underline transition-colors">Home</Link><span>/</span>
          <Link href="/calculators" className="hover:text-accent no-underline transition-colors">Calculators</Link><span>/</span>
          <span className="text-white/50">Channel (ISMC) Weight</span>
        </nav>
        <h1 className="text-white text-2xl sm:text-3xl font-bold mb-5 tracking-tight">Channel (ISMC) Weight Calculator — All Sizes<span className="block text-white/30 text-sm font-normal mt-1.5">Complete ISMC weight chart with section dimensions as per IS 808</span></h1>
        <div className="mb-8"><ChannelWeightCalc /></div>

        <section className="glass-panel p-5 sm:p-6 mb-8">
          <h2 className="text-white font-bold text-lg sm:text-xl mb-4">Complete ISMC Channel Weight Chart</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead><tr className="border-b border-white/10">
                <th className="text-left text-white/50 font-semibold py-2.5 px-3">Designation</th>
                <th className="text-right text-white/50 font-semibold py-2.5 px-3">Depth (mm)</th>
                <th className="text-right text-white/50 font-semibold py-2.5 px-3">Flange (mm)</th>
                <th className="text-right text-white/50 font-semibold py-2.5 px-3">Web (mm)</th>
                <th className="text-right text-white/50 font-semibold py-2.5 px-3">Flange t (mm)</th>
                <th className="text-right text-white/50 font-semibold py-2.5 px-3">kg/m</th>
              </tr></thead>
              <tbody>{ismcChannels.map((row) => (
                <tr key={row.designation} className="border-b border-white/5 hover:bg-white/[0.02]">
                  <td className="text-white/70 py-2.5 px-3 font-semibold">{row.designation}</td>
                  <td className="text-right text-white/50 py-2.5 px-3 font-mono">{row.depth}</td>
                  <td className="text-right text-white/50 py-2.5 px-3 font-mono">{row.flangeWidth}</td>
                  <td className="text-right text-white/50 py-2.5 px-3 font-mono">{row.webThickness}</td>
                  <td className="text-right text-white/50 py-2.5 px-3 font-mono">{row.flangeThickness}</td>
                  <td className="text-right text-accent/80 py-2.5 px-3 font-mono font-semibold">{row.weightPerMetre.toFixed(1)}</td>
                </tr>
              ))}</tbody>
            </table>
          </div>
        </section>

        <section className="glass-panel p-5 sm:p-6 mb-8">
          <h2 className="text-white font-bold text-lg sm:text-xl mb-4">ISMC Channel Weight — How to Calculate</h2>
          <div className="text-white/50 text-sm space-y-4 leading-relaxed">
            <p>ISMC channel weights are standardized values from IS 808 tables. The weight depends on depth, flange width, web thickness, flange thickness, and root radius of the C-channel profile.</p>
            <div className="glass-panel p-4 font-mono text-accent text-center text-base">Total Weight = Weight per metre × Length × Quantity</div>
            <div className="glass-panel p-4 mt-4">
              <h3 className="text-white font-bold text-sm mb-2">Example — ISMC 200 × 6m</h3>
              <div className="space-y-1.5 font-mono text-xs">
                <p><span className="text-white/30">Given:</span> <span className="text-white/70">ISMC 200, Length = 6m, Qty = 10</span></p>
                <p><span className="text-white/30">Step 1:</span> <span className="text-white/70">Weight/m from table = 22.1 kg/m</span></p>
                <p><span className="text-white/30">Step 2:</span> <span className="text-white/70">22.1 × 6 × 10 = <span className="text-accent">1,326 kg (1.33 MT)</span></span></p>
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
            {[{ href: "/calculators/beam-weight", title: "I-Beam (ISMB) Calculator", desc: "All ISMB sizes with section properties" },{ href: "/calculators/angle-weight", title: "Steel Angle Calculator", desc: "Equal & unequal angles IS 808" },{ href: "/calculators/pipe-weight", title: "MS Pipe Calculator", desc: "All NB sizes 15mm to 200mm" },{ href: "/calculators/flat-bar-weight", title: "Flat Bar Calculator", desc: "MS flat bar all sizes" },{ href: "/calculators/steel-plate", title: "Steel Plate Calculator", desc: "Plate weight by L×W×T×7.85" },{ href: "/calculator", title: "All-in-One Calculator", desc: "All section types in one tool" }].map((c) => (
              <Link key={c.href} href={c.href} className="block p-3 rounded-lg bg-white/[0.03] border border-white/5 hover:border-accent/20 transition-colors no-underline group"><div className="text-white/80 font-semibold text-sm group-hover:text-accent transition-colors">{c.title}</div><div className="text-white/30 text-xs mt-1">{c.desc}</div></Link>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
