import type { Metadata } from "next";
import Link from "next/link";
import ScrapProductionCostCalc from "@/components/calculators/ScrapProductionCostCalc";
import BreadcrumbSchema from "@/components/seo/BreadcrumbSchema";
import CalculatorSchema from "@/components/seo/CalculatorSchema";

export const metadata: Metadata = {
  title:
    "Scrap to Steel Production Cost Calculator — IF/EAF Full Cost Breakdown | SteelMath",
  description:
    "Calculate complete production cost from scrap to finished steel. Enter your own scrap, electricity, alloy, and overhead costs. Full waterfall breakdown. Free.",
  keywords: [
    "steel production cost calculator",
    "scrap to steel cost",
    "steel melting cost",
    "induction furnace cost",
    "EAF production cost",
    "steel manufacturing cost",
    "scrap melting economics",
    "steel cost breakdown",
    "TMT bar production cost",
    "liquid steel cost",
    "breakeven scrap price",
    "steel margin calculator",
  ],
  alternates: {
    canonical: "https://steelmath.com/calculators/scrap-production-cost",
  },
  openGraph: {
    title:
      "Scrap to Steel Production Cost Calculator — Full Breakdown | SteelMath",
    description:
      "Calculate complete steel production cost from scrap to finished product. Enter your own input costs — scrap, electricity, alloys, overheads. Free tool.",
    url: "https://steelmath.com/calculators/scrap-production-cost",
    type: "website",
  },
};

const FAQS = [
  {
    question:
      "How much does it cost to produce one tonne of steel from scrap?",
    answer:
      "Production cost varies by region and input prices. The main cost components are: scrap (50–65% of total), electricity (7–12%), ferro alloys (3–5%), and conversion/overheads (15–25%). Use SteelMath's free Production Cost Calculator to model the cost with your specific input prices.",
  },
  {
    question: "What is the electricity cost to melt one tonne of scrap?",
    answer:
      "At 625 kWh/t (induction furnace standard), the electricity cost equals your local rate × 625. At $0.08/kWh, that's $50/t. At $0.12/kWh, it's $75/t. EAFs are more efficient at ~450 kWh/t. Electricity is the second-largest cost after scrap purchase in every scrap-based steelmaking operation.",
  },
  {
    question: "What is the breakeven scrap price for TMT bar production?",
    answer:
      "Breakeven scrap price depends on your selling price and non-scrap costs. The formula is: Breakeven = (Selling Price − All Non-Scrap Costs) ÷ Rolling Yield Factor × Scrap Yield. Use the Production Cost Calculator with your specific costs and current selling price to calculate your exact breakeven.",
  },
];

export default function ScrapProductionCostPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Calculators", href: "/calculators" },
          {
            name: "Scrap-to-Steel Production Cost",
            href: "/calculators/scrap-production-cost",
          },
        ]}
      />
      <CalculatorSchema
        name="Scrap-to-Steel Production Cost Calculator"
        url="https://steelmath.com/calculators/scrap-production-cost"
        description="Calculate complete production cost from scrap to finished steel product. Full cost waterfall with margin analysis and sensitivity matrix."
        featureList={[
          "Complete cost waterfall from scrap to delivered product",
          "Yield-adjusted raw material cost calculation",
          "IF and EAF electricity consumption models",
          "Ferro alloy and consumable cost inputs",
          "Rolling/conversion cost and yield adjustment",
          "Margin analysis with breakeven scrap price",
          "Sensitivity matrix for scrap price and electricity rate",
          "WhatsApp share for results",
        ]}
        faqs={FAQS}
      />

      <div className="relative z-10 max-w-[1400px] mx-auto px-4 sm:px-5 py-5">
        <nav className="flex items-center gap-1.5 text-xs text-white/25 mb-5">
          <Link
            href="/"
            className="hover:text-accent no-underline transition-colors"
          >
            Home
          </Link>
          <span>/</span>
          <Link
            href="/calculators"
            className="hover:text-accent no-underline transition-colors"
          >
            Calculators
          </Link>
          <span>/</span>
          <span className="text-white/50">
            Scrap-to-Steel Production Cost
          </span>
        </nav>

        <h1 className="text-white text-2xl sm:text-3xl font-bold mb-5 tracking-tight">
          Scrap-to-Steel Production Cost Calculator
          <span className="block text-white/30 text-sm font-normal mt-1.5">
            Full cost waterfall from scrap to finished steel — enter your own
            prices for scrap, electricity, alloys &amp; overheads
          </span>
        </h1>

        <div className="mb-8">
          <ScrapProductionCostCalc />
        </div>

        {/* SEO Content */}
        <section className="glass-panel p-5 sm:p-6 mb-8">
          <h2 className="text-white font-bold text-lg sm:text-xl mb-3">
            Understanding Steel Production Cost Structure
          </h2>
          <div className="space-y-3 text-white/40 text-sm leading-relaxed">
            <p>
              In scrap-based steelmaking (EAF and induction furnace routes),
              raw material cost is the dominant component — typically 50–65% of
              the total delivered cost of finished steel. But the headline scrap
              price is only the starting point. The actual raw material cost per
              tonne of liquid steel depends on the{" "}
              <strong className="text-white/60">yield</strong> — how much of
              the charged scrap converts to usable metal.
            </p>
            <p>
              At 91% yield, you need 1.099 MT of scrap per MT of liquid steel.
              At 85% yield (turnings-heavy charge), you need 1.176 MT — 7%
              more scrap for the same output. This calculator captures that
              yield adjustment and builds a complete cost picture including
              electricity, ferro alloys, consumables, rolling conversion, and
              overheads.
            </p>
            <p>
              Use the{" "}
              <Link
                href="/calculators/scrap-yield"
                className="text-accent hover:text-accent/80 transition-colors"
              >
                Scrap Yield Calculator
              </Link>{" "}
              to determine the weighted average yield for your specific charge
              mix, then import that figure here. Read our{" "}
              <Link
                href="/articles/steel-scrap-grades-classification-guide"
                className="text-accent hover:text-accent/80 transition-colors"
              >
                Steel Scrap Grades Guide
              </Link>{" "}
              or{" "}
              <Link
                href="/articles/steel-production-cost-india-bf-bof-eaf-2026"
                className="text-accent hover:text-accent/80 transition-colors"
              >
                India&apos;s Steel Production Cost Breakdown
              </Link>{" "}
              for detailed context on cost drivers.
            </p>
          </div>
        </section>

        {/* FAQs */}
        <section className="glass-panel p-5 sm:p-6 mb-8">
          <h2 className="text-white font-bold text-lg sm:text-xl mb-4">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {FAQS.map((faq) => (
              <div key={faq.question}>
                <h3 className="text-white/80 font-semibold text-sm mb-1">
                  {faq.question}
                </h3>
                <p className="text-white/40 text-sm leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Related Calculators */}
        <section className="glass-panel p-5 sm:p-6">
          <h2 className="text-white font-bold text-lg sm:text-xl mb-4">
            Related Calculators
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {[
              {
                href: "/calculators/scrap-yield",
                title: "Scrap Yield Calculator",
                desc: "Model yield by scrap grade and furnace type for your charge mix",
              },
              {
                href: "/calculator",
                title: "Steel Weight Calculator",
                desc: "Calculate weight for TMT, plate, pipe, angle & beam",
              },
              {
                href: "/calculators/credit-cost",
                title: "Credit Cost Calculator",
                desc: "True cost of buying steel on credit with interest",
              },
            ].map((c) => (
              <Link
                key={c.href}
                href={c.href}
                className="block p-3 rounded-lg bg-white/[0.03] border border-white/5 hover:border-accent/20 transition-colors no-underline group"
              >
                <div className="text-white/80 font-semibold text-sm group-hover:text-accent transition-colors">
                  {c.title}
                </div>
                <div className="text-white/30 text-xs mt-1">{c.desc}</div>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
