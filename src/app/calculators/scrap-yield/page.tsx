import type { Metadata } from "next";
import Link from "next/link";
import ScrapYieldCalc from "@/components/calculators/ScrapYieldCalc";
import BreadcrumbSchema from "@/components/seo/BreadcrumbSchema";
import CalculatorSchema from "@/components/seo/CalculatorSchema";

export const metadata: Metadata = {
  title:
    "Scrap Yield Calculator — Liquid Steel Recovery by Grade & Furnace | SteelMath",
  description:
    "Model scrap-to-steel yield by grade and furnace type. HMS 1 yields 90-93%, turnings 82-87%. Calculate liquid steel output, slag, and effective cost. Free tool.",
  keywords: [
    "scrap yield calculator",
    "steel scrap yield",
    "liquid steel recovery",
    "HMS 1 yield",
    "HMS 2 yield",
    "shredded scrap yield",
    "induction furnace yield",
    "EAF yield",
    "scrap melting yield",
    "steel scrap grades yield",
    "scrap to steel conversion",
    "ferrous scrap yield rate",
  ],
  alternates: { canonical: "https://steelmath.com/calculators/scrap-yield" },
  openGraph: {
    title:
      "Scrap Yield Calculator — Liquid Steel Recovery by Grade & Furnace | SteelMath",
    description:
      "Model scrap-to-steel yield by grade and furnace type. HMS 1, HMS 2, shredded, turnings — calculate liquid steel output, slag, and effective cost.",
    url: "https://steelmath.com/calculators/scrap-yield",
    type: "website",
  },
};

const FAQS = [
  {
    question: "What is the difference between HMS 1 and HMS 2 scrap?",
    answer:
      "HMS 1 is clean, heavy steel and wrought iron scrap — minimum ¼ inch (6.35mm) thick — that does not contain galvanised or blackened steel. It falls under ISRI codes 200–202. HMS 2 is lighter scrap — minimum ⅛ inch (3.175mm) thick — that may include galvanised and blackened materials, and is classified under ISRI codes 203–206. HMS 1 has a bulk density of at least 0.7 t/m³ and yields 90–93% liquid steel. HMS 2 yields 88–91%. The price premium for HMS 1 over HMS 2 is typically 2–5% in global markets.",
  },
  {
    question: "Which type of scrap is best for induction furnaces?",
    answer:
      "Shredded scrap and HMS 1 are preferred for induction furnaces due to their high bulk density (0.7–1.2 t/m³), clean composition, and consistent chemistry. Shredded scrap is considered premium because its uniform piece size enables rapid, efficient melting. Turnings and borings should be avoided unless significantly discounted — their low density (0.3–0.5 t/m³), high oil contamination, and poor yield (82–87%) make them uneconomical at comparable prices.",
  },
  {
    question: "What is the typical scrap yield in steelmaking?",
    answer:
      "Liquid steel yield varies by scrap grade and furnace type. In induction furnaces: HMS 1 yields 90–93%, shredded 91–93%, busheling 92–95%, HMS 2 yields 88–91%, and turnings yield 82–87%. In EAFs, yields are similar but slightly lower for some grades due to longer tap-to-tap times and oxygen usage. The remainder becomes slag, fumes, and oxidation losses.",
  },
  {
    question: "How much electricity does it take to melt steel scrap?",
    answer:
      "Standard electricity consumption is approximately 550–650 kWh per tonne of liquid steel in an induction furnace, and 380–550 kWh per tonne in a modern EAF. Actual consumption varies with scrap quality (denser, cleaner scrap melts faster), furnace condition, and operating practice. Electricity is the second-largest cost in scrap-based steelmaking after the scrap itself.",
  },
  {
    question: "What is the density of different scrap grades?",
    answer:
      "Bulk density varies significantly: Shredded scrap: 0.9–1.2 t/m³ (highest). HMS 1: 0.7–1.0 t/m³. Plate & Structural: 0.8–1.1 t/m³. HMS 2: 0.5–0.7 t/m³. #1 Busheling: 0.4–0.6 t/m³. Turnings (loose): 0.3–0.5 t/m³. Turnings (briquetted): 3.0–5.0 t/m³. Higher density means more metal per furnace charge, fewer charges per heat, and lower melting cost per tonne.",
  },
  {
    question: "What are the ISRI codes for steel scrap?",
    answer:
      "ISRI (Institute of Scrap Recycling Industries) codes: HMS 1 = ISRI 200–202 (variations by piece dimension). HMS 2 = ISRI 203–206 (may include galvanised/auto scrap). Shredded = ISRI 210–213. #1 Busheling = ISRI 207. Plate & Structural = ISRI 232. Machine Shop Turnings = ISRI 220. Cast Iron Borings = ISRI 224. These codes are the global standard used in international scrap trade.",
  },
];

export default function ScrapYieldPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Calculators", href: "/calculators" },
          { name: "Scrap Yield Calculator", href: "/calculators/scrap-yield" },
        ]}
      />
      <CalculatorSchema
        name="Scrap Yield Calculator"
        url="https://steelmath.com/calculators/scrap-yield"
        description="Model scrap-to-steel yield by grade and furnace type. Calculate liquid steel output, process losses, and effective cost per tonne."
        featureList={[
          "Yield calculation for 12 scrap/charge material types",
          "Induction furnace and EAF yield data",
          "Multi-material charge mix builder",
          "Weighted average yield calculation",
          "Process loss breakdown (slag, fumes, oxidation)",
          "Optional cost analysis with user-entered prices",
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
          <span className="text-white/50">Scrap Yield Calculator</span>
        </nav>

        <h1 className="text-white text-2xl sm:text-3xl font-bold mb-5 tracking-tight">
          Scrap Yield Calculator
          <span className="block text-white/30 text-sm font-normal mt-1.5">
            Model liquid steel recovery by scrap grade and furnace type — HMS 1,
            HMS 2, shredded, turnings & more
          </span>
        </h1>

        <div className="mb-8">
          <ScrapYieldCalc />
        </div>

        {/* Yield Reference Table */}
        <section className="glass-panel p-5 sm:p-6 mb-8">
          <h2 className="text-white font-bold text-lg sm:text-xl mb-4">
            Scrap Yield Reference by Grade
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left text-white/50 font-semibold py-2.5 px-3">
                    Grade
                  </th>
                  <th className="text-left text-white/50 font-semibold py-2.5 px-3">
                    ISRI Code
                  </th>
                  <th className="text-right text-white/50 font-semibold py-2.5 px-3">
                    Yield (IF)
                  </th>
                  <th className="text-right text-white/50 font-semibold py-2.5 px-3">
                    Yield (EAF)
                  </th>
                  <th className="text-right text-white/50 font-semibold py-2.5 px-3">
                    Bulk Density
                  </th>
                </tr>
              </thead>
              <tbody>
                {[
                  { grade: "HMS 1", isri: "200–202", yif: "90–93%", yeaf: "89–93%", density: "0.7–1.0 t/m³" },
                  { grade: "HMS 2", isri: "203–206", yif: "88–91%", yeaf: "87–91%", density: "0.5–0.7 t/m³" },
                  { grade: "Shredded", isri: "210–213", yif: "91–93%", yeaf: "90–93%", density: "0.9–1.2 t/m³" },
                  { grade: "#1 Busheling", isri: "207", yif: "92–95%", yeaf: "91–95%", density: "0.4–0.6 t/m³" },
                  { grade: "Plate & Structural", isri: "232", yif: "91–94%", yeaf: "90–94%", density: "0.8–1.1 t/m³" },
                  { grade: "Turnings (loose)", isri: "220", yif: "82–87%", yeaf: "80–86%", density: "0.3–0.5 t/m³" },
                  { grade: "Turnings (briq.)", isri: "—", yif: "85–90%", yeaf: "84–89%", density: "3.0–5.0 t/m³" },
                  { grade: "Cast Iron", isri: "250–257", yif: "85–88%", yeaf: "84–88%", density: "Variable" },
                  { grade: "Sponge Iron (DRI)", isri: "—", yif: "82–88%", yeaf: "80–86%", density: "1.6–1.9 t/m³" },
                  { grade: "Pig Iron", isri: "—", yif: "93–97%", yeaf: "92–97%", density: "7.0–7.2 t/m³" },
                ].map((row) => (
                  <tr
                    key={row.grade}
                    className="border-b border-white/5 hover:bg-white/[0.02]"
                  >
                    <td className="text-white/80 py-2.5 px-3 font-medium">
                      {row.grade}
                    </td>
                    <td className="text-white/50 py-2.5 px-3 font-mono text-xs">
                      {row.isri}
                    </td>
                    <td className="text-right text-accent/80 py-2.5 px-3 font-mono">
                      {row.yif}
                    </td>
                    <td className="text-right text-accent/80 py-2.5 px-3 font-mono">
                      {row.yeaf}
                    </td>
                    <td className="text-right text-white/50 py-2.5 px-3 font-mono text-xs">
                      {row.density}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* SEO Content */}
        <section className="glass-panel p-5 sm:p-6 mb-8">
          <h2 className="text-white font-bold text-lg sm:text-xl mb-3">
            How Scrap Yield Affects Steelmaking Economics
          </h2>
          <div className="space-y-3 text-white/40 text-sm leading-relaxed">
            <p>
              Scrap yield is the percentage of charged material that converts
              into usable liquid steel. The remainder becomes slag, fumes, and
              oxidation losses. This single number determines how much scrap you
              need to buy per tonne of finished steel — and therefore drives
              your raw material cost.
            </p>
            <p>
              A furnace charging HMS 1 at 91.5% yield needs 1.093 MT of scrap
              per MT of liquid steel. Turnings at 84.5% yield need 1.183 MT —
              that&apos;s 8.2% more material for the same output. At $350/MT
              scrap, this difference is $31.50 per tonne of liquid steel before
              accounting for higher electricity consumption with low-density
              material.
            </p>
            <p>
              Read our comprehensive{" "}
              <Link
                href="/articles/steel-scrap-grades-classification-guide"
                className="text-accent hover:text-accent/80 transition-colors"
              >
                Steel Scrap Grades Classification Guide
              </Link>{" "}
              for detailed specifications, melting characteristics, and trading
              practices for every grade. Or use the{" "}
              <Link
                href="/calculators/scrap-production-cost"
                className="text-accent hover:text-accent/80 transition-colors"
              >
                Scrap-to-Steel Production Cost Calculator
              </Link>{" "}
              to build a complete cost waterfall from scrap to finished product.
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
                href: "/calculators/scrap-production-cost",
                title: "Scrap-to-Steel Production Cost",
                desc: "Full cost waterfall from scrap to finished steel product",
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
