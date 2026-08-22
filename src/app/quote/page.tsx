import type { Metadata } from "next";
import Link from "next/link";
import QuoteBuilder from "@/components/quote/QuoteBuilder";

export const metadata: Metadata = {
  title: "Steel Quote Builder: Dispatch-Ready Quotation & Loading Sheet",
  description:
    "Combine results from SteelMath's weight calculators into one branded, dispatch-ready quotation and loading sheet: items, pieces, weights, rates, totals and terms. Print or save as PDF. Free, no signup.",
  alternates: { canonical: "https://steelmath.com/quote" },
  openGraph: {
    title: "Steel Quote Builder: Dispatch-Ready Quotation & Loading Sheet",
    description:
      "Turn calculator results into a branded quotation and loading sheet: items, weights, totals, terms. Print or save as PDF.",
    url: "https://steelmath.com/quote",
    type: "website",
    images: [
      {
        url: "/og?title=Steel%20Quote%20Builder%20%E2%80%94%20Quotation%20%26%20Loading%20Sheet&accent=orange",
        width: 1200,
        height: 630,
      },
    ],
  },
};

export default function QuotePage() {
  const webAppJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "SteelMath Quote Builder",
    url: "https://steelmath.com/quote",
    applicationCategory: "BusinessApplication",
    operatingSystem: "Any",
    offers: { "@type": "Offer", price: "0", priceCurrency: "INR" },
    description:
      "Free quote builder for steel traders and fabricators: combine weight-calculator results into a dispatch-ready quotation and loading sheet with pieces, weights, rates, totals and terms, then print or save as PDF.",
    featureList: [
      "Collects line items from every SteelMath weight calculator",
      "Editable pieces, rates (per kg / per tonne / per piece) and terms",
      "Total pieces, total weight and quoted amount",
      "Print / save-as-PDF loading sheet",
      "Shareable branded summary card",
    ],
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://steelmath.com" },
      { "@type": "ListItem", position: 2, name: "Quote Builder", item: "https://steelmath.com/quote" },
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

      <section className="max-w-[1100px] mx-auto px-4 sm:px-6 pt-3.5 pb-16">
        <div className="font-mono text-[11px] tracking-[0.08em] text-muted-3 mb-4.5 no-print">
          <Link href="/" className="text-muted-3 hover:text-ink no-underline transition-colors">
            HOME
          </Link>
          <span> / </span>
          <span className="text-ink">QUOTE BUILDER</span>
        </div>

        <div className="flex items-end justify-between gap-4 mb-5 flex-wrap no-print">
          <div>
            <div className="font-mono text-[11px] tracking-[0.12em] text-accent mb-2.5">
              FREE · NO SIGNUP · SAVED IN YOUR BROWSER
            </div>
            <h1 className="text-[clamp(26px,4vw,38px)] leading-[1.06] font-extrabold tracking-[-0.02em]">
              Steel Quote Builder
            </h1>
          </div>
          <p className="text-[13.5px] text-muted-2 max-w-[360px] mb-1">
            Add results from any weight calculator, set pieces and rates, and
            print a dispatch-ready quotation &amp; loading sheet.
          </p>
        </div>

        <QuoteBuilder />

        <div className="font-mono text-[10.5px] text-muted-3 mt-6 flex justify-between flex-wrap gap-2 no-print">
          <span>© 2026 STEELMATH · QUOTES ARE ESTIMATES — VERIFY WEIGHTS AND RATES BEFORE DISPATCH</span>
          <Link href="/calculators" className="text-muted no-underline hover:text-ink transition-colors">
            ← ALL CALCULATORS
          </Link>
        </div>
      </section>
    </>
  );
}
