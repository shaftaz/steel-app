import type { Metadata } from "next";
import Link from "next/link";
import CbamCalculator from "@/components/cbam/CbamCalculator";

export const metadata: Metadata = {
  title:
    "CBAM Calculator: EU & UK Carbon Border Cost | SteelMath",
  description:
    "Free CBAM cost calculator for EU and UK regimes, iron & steel, aluminium, cement, fertilisers and hydrogen. Country default intensities, carbon-price deductions, certificate counts and the full phase-in to 2034. Q2 2026 price €75.28/tCO₂e.",
  alternates: { canonical: "https://steelmath.com/cbam/calculator" },
  openGraph: {
    images: [{ url: "/og?title=CBAM%20Calculator%20%E2%80%94%20EU%20%26%20UK%20Carbon%20Border%20Cost&accent=blue", width: 1200, height: 630 }],
    title: "CBAM Calculator: EU & UK Carbon Border Cost | SteelMath",
    description:
      "Model your exact CBAM cargo (route, origin, actual vs default values, deductions, phase-in) in under a minute.",
    url: "https://steelmath.com/cbam/calculator",
    type: "website",
  },
};

export default function CbamCalculatorPage() {
  const webAppJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "CBAM Cost Calculator",
    url: "https://steelmath.com/cbam/calculator",
    applicationCategory: "BusinessApplication",
    operatingSystem: "Any",
    offers: { "@type": "Offer", price: "0", priceCurrency: "EUR" },
    description:
      "Free CBAM liability calculator covering the EU definitive regime and UK CBAM, five commodity groups, nine origins, defaults vs verified actuals, carbon-price deductions and certificate counts.",
    featureList: [
      "EU and UK CBAM regimes",
      "Iron & steel, aluminium, cement, fertilisers, hydrogen",
      "Country default intensities and deductible carbon prices",
      "Defaults vs verified-actual basis with BF-BOF / EAF / DRI routes",
      "Free-allocation phase-in 2026–2034",
      "Importer and supplier views, shareable results",
    ],
    dateModified: "2026-07-19",
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://steelmath.com" },
      { "@type": "ListItem", position: 2, name: "CBAM Hub", item: "https://steelmath.com/cbam" },
      { "@type": "ListItem", position: 3, name: "Calculator", item: "https://steelmath.com/cbam/calculator" },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      {/* Breadcrumb + title */}
      <section className="max-w-[1320px] mx-auto px-4 sm:px-6 pt-3.5">
        <div className="font-mono text-[11px] tracking-[0.08em] text-muted-3 mb-4.5">
          <Link href="/" className="text-muted-3 hover:text-ink no-underline transition-colors">HOME</Link>
          <span> / </span>
          <Link href="/cbam" className="text-muted-3 hover:text-ink no-underline transition-colors">CBAM HUB</Link>
          <span> / </span>
          <span className="text-ink">CALCULATOR</span>
        </div>
        <div className="flex items-end justify-between gap-4 lg:gap-8 mb-4.5 flex-wrap">
          <div>
            <div className="font-mono text-[11px] tracking-[0.12em] text-cbam mb-2.5">
              FREE · NO SIGNUP · EU + UK REGIMES · 5 COMMODITIES
            </div>
            <h1 className="text-[clamp(26px,4vw,38px)] leading-[1.06] font-extrabold tracking-[-0.02em] max-w-[720px] [text-wrap:balance]">
              CBAM Cost Calculator
            </h1>
          </div>
          <p className="text-[13.5px] text-muted-2 max-w-[330px] mb-1">
            Pick a border, a commodity and a cargo, the answer appears instantly. Open the detail panels only if you need them.
          </p>
        </div>
      </section>

      {/* Instrument */}
      <section className="max-w-[1320px] mx-auto px-4 sm:px-6 pb-2">
        <CbamCalculator />
      </section>

      {/* Next steps */}
      <section className="max-w-[1320px] mx-auto px-4 sm:px-6 pt-5 pb-16">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
          <Link
            href="/cbam#countries"
            className="border border-input-border bg-[#FFFFFF] px-4.5 py-4 text-ink no-underline hover:border-cbam transition-colors"
          >
            <div className="font-mono text-[10.5px] tracking-[0.1em] text-cbam mb-1.5">
              COUNTRY PLAYBOOKS →
            </div>
            <div className="text-[13.5px] text-muted leading-normal">
              Deductions &amp; default exposure for India, Turkey, China, Vietnam, Korea, UK…
            </div>
          </Link>
          <Link
            href="/cbam#timeline"
            className="border border-input-border bg-[#FFFFFF] px-4.5 py-4 text-ink no-underline hover:border-cbam transition-colors"
          >
            <div className="font-mono text-[10.5px] tracking-[0.1em] text-cbam mb-1.5">
              DEADLINES &amp; TIMELINE →
            </div>
            <div className="text-[13.5px] text-muted leading-normal">
              EU: sales 1 Feb 2027, surrender 30 Sep 2027 · UK: first return 31 May 2028.
            </div>
          </Link>
          <Link
            href="/calculator"
            className="border border-input-border bg-[#FFFFFF] px-4.5 py-4 text-ink no-underline hover:border-cbam transition-colors"
          >
            <div className="font-mono text-[10.5px] tracking-[0.1em] text-cbam mb-1.5">
              STEEL WEIGHT TOOLS →
            </div>
            <div className="text-[13.5px] text-muted leading-normal">
              Weight, yield &amp; production-cost calculators for every section type.
            </div>
          </Link>
        </div>
        <div className="font-mono text-[10.5px] text-muted-3 mt-6 flex justify-between flex-wrap gap-2">
          <span>© 2026 STEELMATH · ESTIMATES ONLY — NOT TAX OR LEGAL ADVICE</span>
          <Link href="/cbam" className="text-muted no-underline hover:text-ink transition-colors">
            ← BACK TO CBAM HUB
          </Link>
        </div>
      </section>
    </>
  );
}
