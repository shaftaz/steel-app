import type { Metadata } from "next";
import Link from "next/link";
import { articles } from "@/lib/data/articles";
import ArticleCard from "@/components/ArticleCard";

export const metadata: Metadata = {
  title:
    "Steel Industry Insights, Analysis & Guides — Hormuz Crisis, Pricing, Calculators",
  description:
    "Expert analysis on Indian steel pricing, Hormuz crisis impact, safeguard duty, CBAM, TMT bar weight charts, MS pipe weight formula, steel plate calculator, GST on steel, and mill price circulars. Data-driven insights for steel professionals.",
  keywords: [
    "steel industry analysis india",
    "steel price analysis",
    "hormuz crisis steel",
    "steel weight chart",
    "tmt bar weight chart",
    "steel import duty india",
    "CBAM steel india",
    "steel production cost",
    "gst on steel",
    "mill price circular",
    "steel guides india",
  ],
  alternates: { canonical: "https://steelmath.com/articles" },
  openGraph: {
    title: "Steel Industry Insights & Analysis | SteelMath",
    description:
      "Expert analysis on steel pricing, supply chain disruptions, freight costs, and industry guides. Data-driven insights for Indian steel professionals.",
    url: "https://steelmath.com/articles",
    type: "website",
  },
};

export default function ArticlesPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Steel Industry Insights & Analysis",
    description:
      "Expert analysis on Indian steel pricing, market trends, and industry guides.",
    url: "https://steelmath.com/articles",
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: articles.length,
      itemListElement: articles.map((article, index) => ({
        "@type": "ListItem",
        position: index + 1,
        url: `https://steelmath.com/articles/${article.slug}`,
        name: article.title,
      })),
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="relative z-10 max-w-[1400px] mx-auto px-4 sm:px-5 py-5">
        <Link
          href="/"
          className="inline-flex items-center gap-1 text-white/25 hover:text-accent text-xs no-underline transition-colors mb-5"
        >
          ← Back to Dashboard
        </Link>

        <div className="mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-1.5 tracking-tight">
            Insights &amp; Reports
          </h1>
          <p className="text-white/30 text-sm">
            Data-driven analysis for Indian steel professionals — pricing, supply chains, calculators &amp; guides
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {articles.map((article) => (
            <ArticleCard key={article.slug} article={article} />
          ))}
        </div>
      </div>
    </>
  );
}
