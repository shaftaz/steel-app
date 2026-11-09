import type { Metadata } from "next";
import Link from "next/link";
import LandedCostCalc from "@/components/calculators/LandedCostCalc";
import BreadcrumbSchema from "@/components/seo/BreadcrumbSchema";
import CalculatorSchema from "@/components/seo/CalculatorSchema";

export const metadata: Metadata = {
  title: "Steel Landed Cost Calculator — FOB/CIF to Duty-Paid Price per Tonne",
  description:
    "Free steel import landed cost calculator. Convert an FOB, CFR or CIF offer into a duty-paid landed price per tonne with import duty, surcharge, safeguard duty, anti-dumping duty, IGST/VAT, port and inland freight. Presets for India, EU, UK, USA and GCC; every rate editable.",
  keywords: [
    "steel landed cost calculator",
    "import landed cost calculator",
    "cif to landed cost",
    "steel import duty calculator india",
    "landed cost per tonne",
    "safeguard duty calculator",
    "anti dumping duty calculation steel",
    "igst on steel imports",
    "fob to landed price",
    "hr coil import cost india",
  ],
  alternates: { canonical: "https://steelmath.com/calculators/landed-cost" },
  openGraph: {
    images: [
      {
        url: "/og?title=Steel%20Landed%20Cost%20Calculator%20%E2%80%94%20FOB%2FCIF%20to%20Duty-Paid%20Price&accent=orange",
        width: 1200,
        height: 630,
      },
    ],
    title: "Steel Landed Cost Calculator — FOB/CIF to Duty-Paid Price",
    description:
      "Duty, surcharge, safeguard, anti-dumping, VAT/GST, port and inland freight in one waterfall. India, EU, UK, US and GCC presets.",
    url: "https://steelmath.com/calculators/landed-cost",
    type: "website",
  },
};

const FAQS = [
  {
    question: "How is the landed cost of imported steel calculated?",
    answer:
      "Start from the CIF value in local currency (FOB + freight + insurance × exchange rate). Add import duty on that assessable value, any surcharge on the duty, safeguard duty, and anti-dumping duty per tonne to get the duty-paid value. VAT or GST is charged on the duty-paid value. Then add port handling and inland freight to the works. If the VAT/GST is creditable, the effective cost excludes it.",
  },
  {
    question: "What duties apply to steel imports into India in 2026?",
    answer:
      "Basic customs duty of 7.5% on most HS 72 products, Social Welfare Surcharge of 10% on the BCD, safeguard duty on flat products (12% from April 2025, 11.5% in the second year to April 2027, 11% thereafter to April 2028) with a price-floor exemption, product-specific anti-dumping duties, and IGST at 18% on the cumulative value. IGST is normally creditable for a registered importer.",
  },
  {
    question: "Do I pay insurance and landing charges if my offer is CFR?",
    answer:
      "Indian customs adds a notional insurance of 1.125% of FOB when actual insurance is not evidenced; the former 1% landing charge was removed from the assessable value in 2017. In the calculator, insurance applies to FOB and CFR offers and the landing-charge field defaults to zero; both are editable for other jurisdictions.",
  },
  {
    question: "How do the US Section 232 and EU safeguard measures enter the calculation?",
    answer:
      "The US preset applies the 50% Section 232 tariff as the import duty (25% for UK-origin steel). For the EU and UK the MFN duty is 0% on most steel; the safeguard field should be set to the out-of-quota rate (50% EU, 25% UK) only for volumes that exceed the tariff-rate quota. EU importers also need CBAM certificates from 2026, which the CBAM calculator estimates separately.",
  },
  {
    question: "Is the result a customs declaration?",
    answer:
      "No. It is a planning estimate using headline rates. Classification, valuation, preferential origin, quota status and current notifications decide the actual duty. Use it to compare offers and set a target price, then confirm with your customs broker.",
  },
];

export default function LandedCostPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Calculators", href: "/calculators" },
          { name: "Landed Cost Calculator", href: "/calculators/landed-cost" },
        ]}
      />
      <CalculatorSchema
        name="Steel Landed Cost Calculator"
        url="https://steelmath.com/calculators/landed-cost"
        description="FOB, CFR or CIF steel price to duty-paid landed cost per tonne with duty, surcharge, safeguard, anti-dumping, VAT/GST, port and inland freight."
        featureList={[
          "FOB, CFR and CIF price basis",
          "India, EU, UK, USA and GCC duty presets",
          "Safeguard and anti-dumping duty fields",
          "VAT/GST with input-credit toggle",
          "Compare against a domestic offer per tonne",
        ]}
        faqs={FAQS}
      />
      <div className="relative z-10 max-w-[1400px] mx-auto px-4 sm:px-5 py-5">
        <nav className="flex items-center gap-1.5 text-xs text-white/25 mb-5">
          <Link href="/" className="hover:text-accent no-underline transition-colors">Home</Link><span>/</span>
          <Link href="/calculators" className="hover:text-accent no-underline transition-colors">Calculators</Link><span>/</span>
          <span className="text-white/50">Landed Cost</span>
        </nav>
        <h1 className="text-white text-2xl sm:text-3xl font-bold mb-5 tracking-tight">
          Steel Landed Cost Calculator — FOB/CIF to Duty-Paid Price
          <span className="block text-white/30 text-sm font-normal mt-1.5">
            Duty, surcharge, safeguard, anti-dumping, IGST/VAT, port and inland freight in one waterfall, per tonne
          </span>
        </h1>
        <div className="mb-8"><LandedCostCalc /></div>

        <section className="glass-panel p-5 sm:p-6 mb-8">
          <h2 className="text-white font-bold text-lg sm:text-xl mb-4">Worked Example — HR Coil into India at CFR $560/t</h2>
          <div className="text-white/50 text-sm space-y-4 leading-relaxed">
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead><tr className="border-b border-white/10">
                  <th className="text-left text-white/50 font-semibold py-2.5 px-3">Step</th>
                  <th className="text-left text-white/50 font-semibold py-2.5 px-3">Basis</th>
                  <th className="text-right text-white/50 font-semibold py-2.5 px-3">₹ per tonne</th>
                </tr></thead>
                <tbody>{[
                  ["CIF value", "($560 + 1.125% insurance) × ₹84", "47,569"],
                  ["Basic customs duty", "7.5% of assessable value", "3,568"],
                  ["Social Welfare Surcharge", "10% of BCD", "357"],
                  ["Safeguard duty", "11.5% of assessable value", "5,470"],
                  ["Duty-paid value", "sum of the above", "56,964"],
                  ["IGST", "18% on duty-paid value (creditable)", "10,254"],
                  ["Port, CHA, handling", "typical, editable", "1,200"],
                  ["Inland freight to works", "typical, editable", "1,800"],
                  ["Net landed cost", "excluding creditable IGST", "59,964"],
                ].map((r, i) => (
                  <tr key={r[0]} className={`border-b border-white/5 ${i === 8 ? "font-semibold" : ""}`}>
                    <td className={`py-2.5 px-3 ${i === 8 ? "text-accent" : "text-white/70"}`}>{r[0]}</td>
                    <td className="text-white/40 py-2.5 px-3">{r[1]}</td>
                    <td className={`text-right py-2.5 px-3 font-mono ${i === 8 ? "text-accent" : "text-white/60"}`}>{r[2]}</td>
                  </tr>
                ))}</tbody>
              </table>
            </div>
            <p>Duties alone add about 19.8% to the CIF value before IGST; with IGST not creditable (an unregistered buyer) the all-in figure rises to roughly ₹70,200 per tonne. Compare that with the domestic ex-works offer plus freight to decide whether the import clears. The <Link href="/articles/safeguard-duty-steel-imports-india-2026" className="text-accent hover:text-accent/80 transition-colors">safeguard duty guide</Link> and <Link href="/articles/anti-dumping-duty-steel-imports-india-2026-active-cases" className="text-accent hover:text-accent/80 transition-colors">anti-dumping tracker</Link> explain which products and origins the extra duties cover.</p>
          </div>
        </section>

        <section className="glass-panel p-5 sm:p-6 mb-8">
          <h2 className="text-white font-bold text-lg sm:text-xl mb-4">Frequently Asked Questions</h2>
          <div className="space-y-4">{FAQS.map((faq) => (<div key={faq.question}><h3 className="text-white/80 font-semibold text-sm mb-1">{faq.question}</h3><p className="text-white/40 text-sm leading-relaxed">{faq.answer}</p></div>))}</div>
        </section>

        <section className="glass-panel p-5 sm:p-6">
          <h2 className="text-white font-bold text-lg sm:text-xl mb-4">Related Tools &amp; Guides</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {[{ href: "/cbam/calculator", title: "CBAM Liability Calculator", desc: "EU and UK carbon border cost per tonne" },{ href: "/calculators/credit-cost", title: "Credit Cost Calculator", desc: "True cost of buying on credit" },{ href: "/calculators/coil-weight", title: "Coil Weight Calculator", desc: "Tonnes per coil and per truck" },{ href: "/articles/gst-steel-products-india-rates-itc", title: "GST on Steel", desc: "Rates and input tax credit" },{ href: "/articles/bis-certification-steel-imports-india-2026-complete-guide", title: "BIS Certification Guide", desc: "Import compliance for steel into India" },{ href: "/quote", title: "Quote Builder", desc: "Landed or ex-works quotations" }].map((c) => (
              <Link key={c.href} href={c.href} className="block p-3 rounded-lg bg-white/[0.03] border border-white/5 hover:border-accent/20 transition-colors no-underline group"><div className="text-white/80 font-semibold text-sm group-hover:text-accent transition-colors">{c.title}</div><div className="text-white/30 text-xs mt-1">{c.desc}</div></Link>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
