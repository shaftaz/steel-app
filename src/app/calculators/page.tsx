import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title:
    "Free Steel Calculators — Weight, TMT Bar, Plate, Pipe & More | SteelMath",
  description:
    "Free online steel calculators for weight, TMT bar (d²/162), steel plate, MS pipe, angle, channel & beam. Instant results with formulas, charts and all Indian standard sizes. Built for engineers, contractors & fabricators.",
  keywords: [
    "steel calculator",
    "steel weight calculator",
    "tmt bar weight calculator",
    "steel plate weight calculator",
    "ms pipe weight calculator",
    "steel angle weight calculator",
    "steel beam weight calculator",
    "d square by 162 formula",
    "steel calculators online free",
    "steel weight formula india",
    "rebar weight calculator",
    "construction calculator india",
    "fabrication calculator",
    "steel section weight",
  ],
  alternates: { canonical: "https://steelmath.com/calculators" },
  openGraph: {
    title:
      "Free Steel Calculators — Weight, TMT Bar, Plate, Pipe & More | SteelMath",
    description:
      "All-in-one steel calculator hub. Calculate weight for TMT bar, plate, pipe, angle, channel & beam instantly. Free, accurate, built for construction professionals.",
    url: "https://steelmath.com/calculators",
    type: "website",
  },
};

const CALCULATORS = [
  {
    href: "/calculator",
    title: "Steel Weight Calculator",
    description:
      "All sections: TMT bar, plate, pipe, angle, channel, beam. Multiple grades.",
    tag: "All-in-One",
  },
  {
    href: "/calculators/tmt",
    title: "TMT Bar Weight Calculator",
    description:
      "Calculate TMT rebar weight using d\u00B2/162 formula. All standard sizes.",
    tag: "TMT / Rebar",
  },
  {
    href: "/calculators/steel-plate",
    title: "Steel Plate Weight Calculator",
    description:
      "Calculate MS plate weight by length, width & thickness.",
    tag: "Plate / Sheet",
  },
  {
    href: "/calculators/metal-weight",
    title: "Metal Weight Calculator",
    description:
      "Weight for 14 metals: steel, aluminium, copper, brass, titanium & more. 6 shapes.",
    tag: "Multi-Metal",
  },
  {
    href: "/calculators/gauge-to-mm",
    title: "Gauge to MM Converter",
    description:
      "Convert sheet metal gauge (7\u201330) to mm, inches & weight per m\u00B2.",
    tag: "Sheet Metal",
  },
  {
    href: "/calculators/hardness-conversion",
    title: "Hardness Conversion Calculator",
    description:
      "Convert between Brinell, Rockwell C/B, Vickers & tensile strength.",
    tag: "Hardness",
  },
  {
    href: "/calculators/credit-cost",
    title: "Credit Cost Calculator",
    description:
      "Calculate true cost of buying steel on credit including interest charges.",
    tag: "Finance",
  },
  {
    href: "/calculators/rebar",
    title: "Rebar Calculator",
    description:
      "Calculate rebar weight, number of bars & tonnes for TMT 6mm\u201340mm.",
    tag: "Rebar / BBS",
  },
];

const FAQS = [
  {
    question: "How do you calculate steel weight?",
    answer:
      "Steel weight is calculated by multiplying the cross-sectional area of the section by its length and the density of steel (7,850 kg/m\u00B3). Different section shapes — round bar, plate, pipe, angle — each have their own simplified formula. SteelMath provides free calculators for every common section type.",
  },
  {
    question: "What is the d\u00B2/162 formula?",
    answer:
      "The d\u00B2/162 formula is a shortcut to find the weight per metre of round steel bars and TMT rebars. You square the diameter in mm and divide by 162.2. For example, a 12 mm TMT bar weighs 12\u00B2 \u00F7 162.2 = 0.889 kg/m. The constant 162.2 comes from simplifying the full formula: (\u03C0/4) \u00D7 d\u00B2 \u00D7 7850 / 1,000,000.",
  },
  {
    question: "What is the density of steel?",
    answer:
      "Mild steel (MS) and TMT rebar have a density of 7,850 kg/m\u00B3 (7.85 g/cm\u00B3). Stainless steel SS 304 is slightly heavier at 8,000 kg/m\u00B3, and SS 316 is 8,027 kg/m\u00B3. Aluminium is much lighter at 2,700 kg/m\u00B3. SteelMath calculators automatically apply the correct density for the selected grade.",
  },
  {
    question: "Why are steel weight calculators important for construction?",
    answer:
      "Accurate weight calculation is critical for estimating material costs, verifying supplier invoices, designing structural members, and planning transport logistics. Steel is typically purchased by weight (per kg or per tonne), so even small errors in calculation can lead to significant cost differences on large projects.",
  },
];

export default function CalculatorsPage() {
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://steelmath.com",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Calculators",
        item: "https://steelmath.com/calculators",
      },
    ],
  };

  const collectionJsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Free Steel Calculators",
    description:
      "Free online steel calculators for weight, TMT bar, plate, pipe, angle, channel and beam sections.",
    url: "https://steelmath.com/calculators",
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: CALCULATORS.length,
      itemListElement: CALCULATORS.map((calc, index) => ({
        "@type": "ListItem",
        position: index + 1,
        url: `https://steelmath.com${calc.href}`,
        name: calc.title,
      })),
    },
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQS.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <div className="relative z-10 max-w-[1400px] mx-auto px-4 sm:px-5 py-5">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-1.5 text-xs text-white/25 mb-5">
          <Link
            href="/"
            className="hover:text-accent no-underline transition-colors"
          >
            Home
          </Link>
          <span>/</span>
          <span className="text-white/50">Calculators</span>
        </nav>

        {/* Hero */}
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2 tracking-tight">
            Free Steel Calculators for Every Section Type
          </h1>
          <p className="text-white/30 text-sm max-w-2xl">
            Instant, accurate weight calculations for TMT bar, steel plate, MS
            pipe, angle, channel &amp; beam. Pick a calculator below or use the
            all-in-one tool.
          </p>
        </div>

        {/* Calculator cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-12">
          {CALCULATORS.map((calc) => (
            <Link
              key={calc.href}
              href={calc.href}
              className="glass-panel glass-panel-hover p-5 no-underline group transition-all block"
            >
              <span className="inline-block text-[10px] uppercase tracking-wider font-semibold text-accent/70 mb-2">
                {calc.tag}
              </span>
              <h2 className="text-white font-bold text-base mb-1.5 group-hover:text-accent transition-colors">
                {calc.title}
              </h2>
              <p className="text-white/30 text-xs leading-relaxed mb-4">
                {calc.description}
              </p>
              <span className="btn-glow inline-flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-md font-medium">
                Open Calculator &rarr;
              </span>
            </Link>
          ))}
        </div>

        {/* SEO content section */}
        <div className="glass-panel p-6 sm:p-8 mb-8">
          <h2 className="text-white font-bold text-lg mb-4">
            What Are Steel Weight Calculators?
          </h2>
          <div className="space-y-3 text-white/40 text-sm leading-relaxed">
            <p>
              Steel weight calculators are specialised tools that compute the
              mass of steel sections based on their dimensions and material
              grade. Whether you are working with TMT rebar, mild steel plates,
              MS pipes, structural angles, channels or I-beams, these
              calculators apply the correct engineering formula so you get an
              accurate weight in kilograms or tonnes — instantly.
            </p>
            <p>
              In construction and fabrication, steel is bought and sold by
              weight. A contractor estimating a residential slab needs to know
              the total TMT rebar weight to generate a Bill of Quantities. A
              fabricator cutting steel plates for a tank must calculate plate
              weight to verify the supplier&apos;s invoice. A structural
              engineer sizing an I-beam needs section weight to check dead-load
              assumptions.
            </p>
            <p>
              Each section shape has its own formula. Round bars and TMT rebars
              use the well-known <strong className="text-white/60">d&sup2;/162</strong>{" "}
              shortcut. Plates use{" "}
              <strong className="text-white/60">
                Length &times; Width &times; Thickness &times; 7.85
              </strong>{" "}
              (dimensions in mm, result in kg). Pipes use{" "}
              <strong className="text-white/60">
                (OD &minus; WT) &times; WT &times; 0.02466
              </strong>
              . All of these formulas derive from the base density of mild steel:{" "}
              <strong className="text-white/60">7,850 kg/m&sup3;</strong>.
            </p>
            <p>
              SteelMath&apos;s calculators handle the maths for you. Just select
              a section type, enter your dimensions, and get the result. We
              support multiple material grades — MS, Fe500, SS&nbsp;304,
              SS&nbsp;316, Aluminium and Copper — with automatic density
              correction. Results can be shared via WhatsApp, downloaded or
              printed.
            </p>
          </div>
        </div>

        {/* FAQ section */}
        <div className="glass-panel p-6 sm:p-8 mb-8">
          <h2 className="text-white font-bold text-lg mb-5">
            Frequently Asked Questions
          </h2>
          <div className="space-y-5">
            {FAQS.map((faq) => (
              <div
                key={faq.question}
                className="border-b border-white/[0.04] pb-4 last:border-0 last:pb-0"
              >
                <h3 className="text-white/80 font-semibold text-sm mb-1.5">
                  {faq.question}
                </h3>
                <p className="text-white/30 text-xs leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Related guides */}
        <div className="glass-panel glass-panel-hover p-6 sm:p-8">
          <h2 className="text-white font-bold text-sm mb-4">
            Related Guides &amp; Articles
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2.5">
            <Link
              href="/articles/steel-weight-calculator-guide"
              className="block text-white/40 hover:text-accent text-xs no-underline transition-colors"
            >
              Steel Weight Calculator — Complete Guide With Formulas &rarr;
            </Link>
            <Link
              href="/articles/tmt-bar-weight-per-metre-chart"
              className="block text-white/40 hover:text-accent text-xs no-underline transition-colors"
            >
              TMT Bar Weight Per Metre — Chart for All Sizes &rarr;
            </Link>
            <Link
              href="/articles/ms-pipe-weight-calculator-chart"
              className="block text-white/40 hover:text-accent text-xs no-underline transition-colors"
            >
              MS Pipe Weight Calculator — Formula &amp; All Sizes &rarr;
            </Link>
            <Link
              href="/articles/steel-plate-weight-calculator-thickness-chart"
              className="block text-white/40 hover:text-accent text-xs no-underline transition-colors"
            >
              Steel Plate Weight — Formula &amp; Thickness Chart &rarr;
            </Link>
            <Link
              href="/articles/steel-angle-weight-chart-sizes-formula"
              className="block text-white/40 hover:text-accent text-xs no-underline transition-colors"
            >
              Steel Angle Weight Chart — All Sizes &amp; Formula &rarr;
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
