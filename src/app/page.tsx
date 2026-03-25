import type { Metadata } from "next";
import Link from "next/link";
import LandingCalculator from "@/components/dashboard/LandingCalculator";
import ArticleCard from "@/components/ArticleCard";
import { articles, articlesByDate, CATEGORY_STYLES } from "@/lib/data/articles";

export const metadata: Metadata = {
  title:
    "SteelMath — Free Steel Weight Calculator for TMT Bar, Plate, Pipe & Angle | India",
  description:
    "Free online steel weight calculator for TMT bar, MS plate, pipe, angle, channel & beam. Instant weight per metre, d²/162 formula, weight charts & density tables. Expert steel industry analysis for Indian professionals.",
  keywords: [
    "steel weight calculator",
    "steelmath",
    "steel math",
    "steel calculator online free",
    "tmt bar weight calculator",
    "tmt bar weight per metre",
    "steel plate weight calculator",
    "ms pipe weight calculator",
    "steel angle weight chart",
    "steel beam weight calculator",
    "d square by 162 formula",
    "steel weight formula",
    "steel density 7850",
    "rebar weight calculator india",
    "steel yield calculator",
    "steel market analysis india",
    "hormuz crisis steel",
    "safeguard duty steel india",
    "steel industry news india 2026",
  ],
  alternates: { canonical: "https://steelmath.com" },
};

export default function Home() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "SteelMath Steel Weight Calculator",
    url: "https://steelmath.com",
    applicationCategory: "BusinessApplication",
    operatingSystem: "Any",
    offers: { "@type": "Offer", price: "0", priceCurrency: "INR" },
    description:
      "Free online steel weight calculator for TMT bar, plate, pipe, angle, channel, beam and more. Supports all common grades. Instant results.",
    featureList: [
      "TMT Bar / Round Bar weight calculation",
      "Steel plate & sheet weight calculation",
      "MS pipe weight calculation",
      "Steel angle weight calculation",
      "Yield & waste calculator",
      "Multiple steel grades supported",
    ],
  };

  // Split articles by category for grouped display, sorted by recency
  const guides = articlesByDate.filter((a) => a.category === "GUIDE");
  const analysis = articlesByDate.filter((a) => a.category === "ANALYSIS");
  const crisis = articlesByDate.filter((a) => a.category === "CRISIS");

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="relative z-10 max-w-[1400px] mx-auto px-4 sm:px-5 py-5 space-y-8">

        {/* Hero Section */}
        <section className="text-center py-6 sm:py-10">
          <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight mb-3">
            Free Steel Weight Calculator &amp; Industry Analysis — India
          </h1>
          <p className="text-white/40 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            Calculate steel weight instantly for TMT bar, MS plate, pipe, angle, channel &amp; beam. Expert industry analysis, weight charts &amp; guides for Indian steel professionals.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 mt-5">
            <Link
              href="/calculator"
              className="btn-glow px-6 py-2.5 text-sm no-underline"
            >
              Open Calculator
            </Link>
            <Link
              href="/calculators"
              className="px-6 py-2.5 text-sm rounded-lg border border-white/10 text-white/50 hover:text-white/80 hover:border-white/20 no-underline transition-all"
            >
              All Calculators
            </Link>
            <Link
              href="/articles"
              className="px-6 py-2.5 text-sm rounded-lg border border-white/10 text-white/50 hover:text-white/80 hover:border-white/20 no-underline transition-all"
            >
              Browse Insights
            </Link>
          </div>
          <p className="text-white/20 text-xs max-w-3xl mx-auto mt-6 leading-relaxed">
            SteelMath is India&apos;s free steel weight calculator supporting all common sections — TMT bar (rebar), mild steel plate, MS pipe, angle, channel, I-beam, flat bar &amp; square tube. Use the d&sup2;/162 formula for round bars or enter dimensions for instant weight-per-metre results. Our tools support multiple steel grades including MS (7,850 kg/m&sup3;), SS 304, SS 316, Aluminium &amp; Copper with accurate density factors.
          </p>
        </section>

        {/* Section 1: Calculators */}
        <section id="tools">
          <div className="mb-4">
            <h2 className="text-white font-bold text-xl sm:text-2xl tracking-tight">
              Essential Calculators
            </h2>
            <p className="text-white/30 text-xs sm:text-sm mt-0.5">
              Steel weight &amp; yield — instant results for every section type
            </p>
          </div>
          <LandingCalculator />
        </section>

        {/* Section 2: Guides & Weight Charts */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-white font-bold text-xl sm:text-2xl tracking-tight">
                Guides &amp; Weight Charts
              </h2>
              <p className="text-white/30 text-xs sm:text-sm mt-0.5">
                Reference charts, calculators &amp; step-by-step guides for steel professionals
              </p>
            </div>
            <Link
              href="/articles"
              className="text-accent/60 hover:text-accent text-xs font-semibold no-underline transition-colors"
            >
              View All →
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {guides.slice(0, 6).map((article) => (
              <ArticleCard key={article.slug} article={article} />
            ))}
          </div>
        </section>

        {/* Section 3: Industry Analysis */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-white font-bold text-xl sm:text-2xl tracking-tight">
                Industry Analysis
              </h2>
              <p className="text-white/30 text-xs sm:text-sm mt-0.5">
                Market trends, policy impact &amp; supply chain deep-dives
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {[...analysis, ...crisis].slice(0, 6).map((article) => (
              <ArticleCard key={article.slug} article={article} />
            ))}
          </div>
        </section>

        {/* CTA Banner */}
        <section className="glass-panel overflow-hidden">
          <div className="p-6 sm:p-8 text-center">
            <h2 className="text-white font-bold text-lg sm:text-xl mb-2">
              All {articles.length} Articles &amp; Guides
            </h2>
            <p className="text-white/30 text-sm mb-4 max-w-xl mx-auto">
              From TMT bar weight charts to Hormuz crisis analysis — everything Indian steel professionals need in one place.
            </p>
            <Link
              href="/articles"
              className="btn-glow inline-block px-8 py-3 text-sm no-underline"
            >
              Explore All Insights →
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}
