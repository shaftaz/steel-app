import type { Metadata } from "next";
import Link from "next/link";
import { articlesByDate } from "@/lib/data/articles";
import ArticlesClient from "@/components/blog/ArticlesClient";

export const metadata: Metadata = {
  title:
    "Steel Industry Insights, Analysis & Guides: Hormuz Crisis, Pricing, Calculators",
  description:
    "Expert analysis on steel pricing, Hormuz crisis impact, safeguard duty, CBAM, TMT bar weight charts, MS pipe weight formula, steel plate calculator, GST on steel, and mill price circulars. Data-driven insights for steel professionals.",
  keywords: [
    "steel industry analysis",
    "steel price analysis",
    "hormuz crisis steel",
    "steel weight chart",
    "tmt bar weight chart",
    "steel import duty",
    "CBAM steel",
    "steel production cost",
    "gst on steel",
    "mill price circular",
    "steel guides",
    "BIS certification steel",
    "anti-dumping duty steel India",
    "steel QCO 2024",
    "DGTR investigations steel",
  ],
  alternates: { canonical: "https://steelmath.com/articles" },
  openGraph: {
    title: "Steel Industry Insights & Analysis | SteelMath",
    description:
      "Expert analysis on steel pricing, supply chain disruptions, freight costs, and industry guides. Data-driven insights for steel professionals.",
    url: "https://steelmath.com/articles",
    type: "website",
  },
};

export default function ArticlesPage() {
  const sorted = articlesByDate;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Steel Industry Insights & Analysis",
    description:
      "Expert analysis on steel pricing, market trends, and industry guides.",
    url: "https://steelmath.com/articles",
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: sorted.length,
      itemListElement: sorted.map((article, index) => ({
        "@type": "ListItem",
        position: index + 1,
        url: `https://steelmath.com/articles/${article.slug}`,
        name: article.title,
      })),
    },
  };

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
        name: "Insights & Reports",
        item: "https://steelmath.com/articles",
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <div className="relative z-10 max-w-[1400px] mx-auto px-4 sm:px-5 py-5">
        {/* Breadcrumb navigation */}
        <nav
          aria-label="Breadcrumb"
          className="flex items-center gap-1.5 text-white/25 text-xs mb-5"
        >
          <Link
            href="/"
            className="hover:text-accent no-underline transition-colors"
          >
            Home
          </Link>
          <span>/</span>
          <span className="text-white/35">Insights &amp; Reports</span>
        </nav>

        <div className="mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-1.5 tracking-tight">
            Insights &amp; Reports
          </h1>
          <p className="text-white/30 text-sm">
            Data-driven analysis for steel professionals — pricing, supply
            chains, calculators &amp; guides
          </p>
        </div>

        {/* Client-side interactive listing with filters, search, sidebar */}
        <ArticlesClient articles={sorted} />
      </div>
    </>
  );
}
