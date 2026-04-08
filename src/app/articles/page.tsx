import type { Metadata } from "next";
import Link from "next/link";
import { articlesByDate, CATEGORY_STYLES } from "@/lib/data/articles";
import ArticleCard from "@/components/ArticleCard";

export const metadata: Metadata = {
  title:
    "Steel Industry Insights, Analysis & Guides — Hormuz Crisis, Pricing, Calculators",
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
  const featured = sorted[0];
  const rest = sorted.slice(1);
  const featuredStyle = CATEGORY_STYLES[featured.category];

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
            Data-driven analysis for steel professionals — pricing, supply chains, calculators &amp; guides
          </p>
        </div>

        {/* Featured / most recent article */}
        <Link
          href={`/articles/${featured.slug}`}
          className="group block glass-panel glass-panel-hover overflow-hidden no-underline mb-5"
        >
          <div className="p-5 sm:p-8">
            <div className="flex items-center gap-2.5 mb-3">
              <span className="bg-accent/15 text-accent text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                Latest
              </span>
              <span className={`${featuredStyle.bg} ${featuredStyle.text} text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider`}>
                {featured.category}
              </span>
              <span className="text-white/20 text-xs">{featured.readTime}</span>
            </div>
            <h2 className="text-white text-lg sm:text-xl font-bold mb-2 leading-snug group-hover:text-accent transition-colors">
              {featured.title}
            </h2>
            <p className="text-white/30 text-sm leading-relaxed mb-3 max-w-3xl">
              {featured.excerpt}
            </p>
            <div className="flex items-center gap-3">
              <span className="text-white/15 text-xs">
                {new Date(featured.date).toLocaleDateString("en-IN", { year: "numeric", month: "long", day: "numeric" })}
              </span>
              <span className="text-accent/50 text-xs font-semibold">
                Read Article →
              </span>
            </div>
          </div>
        </Link>

        {/* Remaining articles */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {rest.map((article) => (
            <ArticleCard key={article.slug} article={article} />
          ))}
        </div>
      </div>
    </>
  );
}
