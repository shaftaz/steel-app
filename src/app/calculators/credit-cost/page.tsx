import type { Metadata } from "next";
import Link from "next/link";
import CreditCostCalc from "@/components/calculators/CreditCostCalc";
import BreadcrumbSchema from "@/components/seo/BreadcrumbSchema";
import CalculatorSchema from "@/components/seo/CalculatorSchema";

export const metadata: Metadata = {
  title:
    "Steel Credit Cost Calculator — Interest on Deferred Payment | SteelMath",
  description:
    "Calculate the true cost of buying steel on credit. Enter quantity, price, credit period and interest rate to see the effective cost per kg including financing charges. Free tool for steel traders, stockists and procurement managers.",
  keywords: [
    "steel credit cost calculator",
    "steel payment terms calculator",
    "credit cost calculator",
    "interest on steel purchase",
    "deferred payment calculator",
    "steel procurement cost",
    "effective price per kg steel",
    "steel finance cost",
    "trade credit calculator",
    "steel working capital cost",
    "steel purchase interest",
    "credit period steel",
  ],
  alternates: { canonical: "https://steelmath.com/calculators/credit-cost" },
  openGraph: {
    title: "Steel Credit Cost Calculator — True Cost of Buying on Credit | SteelMath",
    description:
      "Calculate effective steel cost including credit interest. Enter quantity, price, credit days & interest rate. Free tool for traders & procurement.",
    url: "https://steelmath.com/calculators/credit-cost",
    type: "website",
  },
};

const FAQS = [
  {
    question: "How does credit period affect steel cost?",
    answer:
      "A 30-day credit at 12% p.a. adds approximately 0.99% to your material cost. For a 10-tonne order at 55/kg, that is roughly 5,425 in interest. Longer credit periods increase the effective price proportionally — 60 days at 12% adds ~1.97%.",
  },
  {
    question: "What is a typical credit period for steel purchases?",
    answer:
      "In the steel trade, credit periods typically range from 15 to 90 days depending on the buyer-seller relationship, order volume, and market conditions. Large mills may offer 30-45 days to established distributors, while spot purchases are usually cash or 7-day payment.",
  },
  {
    question: "Why calculate effective cost per kg?",
    answer:
      "When comparing quotes from different suppliers, the headline price per kg does not tell the full story. A supplier offering 54/kg on 7-day payment may be cheaper than one offering 53/kg on 60-day credit once financing charges are factored in. This calculator helps make apples-to-apples comparisons.",
  },
];

const EXAMPLES = [
  { qty: "10,000 kg", price: "55/kg", days: 30, rate: 12, interest: "~5,425", effective: "55.54/kg" },
  { qty: "25,000 kg", price: "48/kg", days: 45, rate: 14, interest: "~20,548", effective: "48.82/kg" },
  { qty: "5,000 kg", price: "72/kg", days: 60, rate: 10, interest: "~5,918", effective: "73.18/kg" },
];

export default function CreditCostPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Calculators", href: "/calculators" },
          { name: "Credit Cost Calculator", href: "/calculators/credit-cost" },
        ]}
      />
      <CalculatorSchema
        name="Steel Credit Cost Calculator"
        url="https://steelmath.com/calculators/credit-cost"
        description="Calculate the true cost of buying steel on credit including interest charges. See effective price per kg and total financing cost."
        featureList={[
          "Interest cost calculation for any credit period",
          "Effective price per kg including financing",
          "Percentage add-on for credit terms",
          "Compare cash vs credit pricing",
        ]}
        faqs={FAQS}
      />

      <div className="relative z-10 max-w-[1400px] mx-auto px-4 sm:px-5 py-5">
        <nav className="flex items-center gap-1.5 text-xs text-white/25 mb-5">
          <Link href="/" className="hover:text-accent no-underline transition-colors">Home</Link>
          <span>/</span>
          <Link href="/calculators" className="hover:text-accent no-underline transition-colors">Calculators</Link>
          <span>/</span>
          <span className="text-white/50">Credit Cost Calculator</span>
        </nav>

        <h1 className="text-white text-2xl sm:text-3xl font-bold mb-5 tracking-tight">
          Steel Credit Cost Calculator
          <span className="block text-white/30 text-sm font-normal mt-1.5">
            Calculate the true cost of buying steel on credit — interest, effective price per kg &amp; total financing charges
          </span>
        </h1>

        <div className="mb-8">
          <CreditCostCalc />
        </div>

        {/* Example Scenarios */}
        <section className="glass-panel p-5 sm:p-6 mb-8">
          <h2 className="text-white font-bold text-lg sm:text-xl mb-4">
            Example Scenarios
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left text-white/50 font-semibold py-2.5 px-3">Quantity</th>
                  <th className="text-left text-white/50 font-semibold py-2.5 px-3">Price</th>
                  <th className="text-right text-white/50 font-semibold py-2.5 px-3">Credit Days</th>
                  <th className="text-right text-white/50 font-semibold py-2.5 px-3">Rate (p.a.)</th>
                  <th className="text-right text-white/50 font-semibold py-2.5 px-3">Interest</th>
                  <th className="text-right text-white/50 font-semibold py-2.5 px-3">Effective/kg</th>
                </tr>
              </thead>
              <tbody>
                {EXAMPLES.map((ex, i) => (
                  <tr key={i} className="border-b border-white/5 hover:bg-white/[0.02]">
                    <td className="text-white/70 py-2.5 px-3">{ex.qty}</td>
                    <td className="text-white/70 py-2.5 px-3">{ex.price}</td>
                    <td className="text-right text-white/50 py-2.5 px-3 font-mono">{ex.days}</td>
                    <td className="text-right text-white/50 py-2.5 px-3 font-mono">{ex.rate}%</td>
                    <td className="text-right text-red-400/80 py-2.5 px-3 font-mono">{ex.interest}</td>
                    <td className="text-right text-accent/80 py-2.5 px-3 font-mono">{ex.effective}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* SEO Content */}
        <section className="glass-panel p-5 sm:p-6 mb-8">
          <h2 className="text-white font-bold text-lg sm:text-xl mb-3">
            Why Credit Cost Matters in Steel Trading
          </h2>
          <p className="text-white/40 text-sm leading-relaxed mb-3">
            In the steel supply chain, credit terms are a critical component of the total procurement cost.
            A seemingly small difference in payment terms can significantly impact margins, especially on high-volume orders.
            For example, buying 25 tonnes of HRC at 48/kg on 45-day credit at 14% p.a. adds over 20,000 in financing charges.
          </p>
          <p className="text-white/40 text-sm leading-relaxed">
            This calculator uses simple interest: <strong className="text-white/60">Interest = Principal &times; Rate &times; Time</strong>,
            where Time is the credit period as a fraction of 365 days. The effective cost per kg includes this interest charge,
            giving you a true comparison basis when evaluating supplier quotes with different payment terms.
          </p>
        </section>

        {/* FAQs */}
        <section className="glass-panel p-5 sm:p-6 mb-8">
          <h2 className="text-white font-bold text-lg sm:text-xl mb-4">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {FAQS.map((faq) => (
              <div key={faq.question}>
                <h3 className="text-white/80 font-semibold text-sm mb-1">{faq.question}</h3>
                <p className="text-white/40 text-sm leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Related Calculators */}
        <section className="glass-panel p-5 sm:p-6">
          <h2 className="text-white font-bold text-lg sm:text-xl mb-4">Related Calculators</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {[
              { href: "/calculator", title: "Steel Weight Calculator", desc: "Calculate weight for TMT, plate, pipe, angle & beam" },
              { href: "/calculators/metal-weight", title: "Metal Weight Calculator", desc: "Weight for 14 metals and all common shapes" },
              { href: "/calculators/rebar", title: "Rebar Calculator", desc: "Calculate rebar weight, quantity & BBS" },
            ].map((c) => (
              <Link key={c.href} href={c.href} className="block p-3 rounded-lg bg-white/[0.03] border border-white/5 hover:border-accent/20 transition-colors no-underline group">
                <div className="text-white/80 font-semibold text-sm group-hover:text-accent transition-colors">{c.title}</div>
                <div className="text-white/30 text-xs mt-1">{c.desc}</div>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
