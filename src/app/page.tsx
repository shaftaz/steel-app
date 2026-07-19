import type { Metadata } from "next";
import Link from "next/link";
import HeroInstrument from "@/components/home/HeroInstrument";
import YieldMini from "@/components/home/YieldMini";
import { articles, articlesByDate, Article } from "@/lib/data/articles";

export const metadata: Metadata = {
  title:
    "SteelMath — Free Steel Weight Calculator for TMT Bar, Plate, Pipe & Angle",
  description:
    "Free online steel weight calculator for TMT bar, MS plate, pipe, angle, channel & beam. Instant weight per metre, d²/162 formula, weight charts & density tables. Expert steel industry analysis for professionals worldwide.",
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
    "rebar weight calculator",
    "steel yield calculator",
    "steel market analysis",
    "hormuz crisis steel",
    "safeguard duty steel",
    "steel industry news 2026",
  ],
  alternates: { canonical: "https://steelmath.com" },
};

const TOOL_ROWS = [
  { idx: "01", title: "Steel Weight Calculator", desc: "All sections, all grades — the advanced tool.", formula: "A × L × ρ", href: "/calculator" },
  { idx: "02", title: "TMT Bar Calculator", desc: "Per metre, per foot & per bar, 8–40 mm.", formula: "d² ÷ 162.2", href: "/calculators/tmt" },
  { idx: "03", title: "Steel Plate Calculator", desc: "MS & chequered plate by thickness.", formula: "T × 7.85 kg/m²", href: "/calculators/steel-plate" },
  { idx: "04", title: "Scrap Yield Calculator", desc: "Liquid steel recovery by grade & furnace.", formula: "HMS1 90–93%", href: "/calculators/scrap-yield" },
  { idx: "05", title: "Production Cost Calculator", desc: "Scrap → finished steel, full cost waterfall.", formula: "IF 625 kWh/t", href: "/calculators/scrap-production-cost" },
];

function mins(readTime: string) {
  const m = parseInt(readTime, 10);
  return isFinite(m) ? m : 0;
}

function shortDate(date: string) {
  return new Date(date)
    .toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "2-digit" })
    .toUpperCase();
}

function GuideRow({ article }: { article: Article }) {
  return (
    <Link
      href={`/articles/${article.slug}`}
      className="grid grid-cols-[84px_1fr_70px] gap-4 py-4 px-1 border-b border-rule text-ink items-baseline no-underline hover:bg-[#FFFFFF] transition-colors"
    >
      <span className="font-mono text-[10.5px] tracking-[0.08em] text-muted-3">
        {article.category} · {mins(article.readTime)}′
      </span>
      <span>
        <span className="block text-[15.5px] font-bold leading-[1.35] tracking-[-0.01em]">{article.title}</span>
        <span className="block text-[12.5px] leading-normal text-muted-2 mt-1 line-clamp-2">{article.excerpt}</span>
      </span>
      <span className="font-mono text-[10.5px] text-muted-3 text-right">{shortDate(article.date)}</span>
    </Link>
  );
}

function AnalysisCard({ article }: { article: Article }) {
  return (
    <Link
      href={`/articles/${article.slug}`}
      className="flex flex-col p-6 pb-5 border-r border-b border-rule text-ink min-h-[228px] bg-[#FFFFFF] no-underline hover:bg-paper transition-colors"
    >
      <div className="flex justify-between items-baseline mb-4">
        <span className="font-mono text-[10.5px] tracking-[0.1em] text-accent">
          {article.category} · {mins(article.readTime)}′
        </span>
        <span className="font-mono text-[10.5px] text-muted-3">{shortDate(article.date)}</span>
      </div>
      <div className="text-[16.5px] font-bold leading-[1.3] tracking-[-0.01em] mb-2.5 line-clamp-3">{article.title}</div>
      <div className="text-[12.5px] leading-normal text-muted-2 mb-4 line-clamp-3">{article.excerpt}</div>
      <div className="mt-auto font-mono text-[11.5px]">READ →</div>
    </Link>
  );
}

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

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://steelmath.com",
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />

      {/* Hero — the answer above the fold */}
      <section className="max-w-[1320px] mx-auto px-4 sm:px-6 pt-10">
        <div className="flex items-end justify-between gap-4 lg:gap-10 mb-7 flex-wrap">
          <div>
            <div className="font-mono text-[11px] tracking-[0.14em] text-muted-3 mb-3">
              FREE · NO SIGNUP · IS-STANDARD FORMULAS
            </div>
            <h1 className="text-[clamp(28px,4.5vw,36px)] leading-[1.08] font-extrabold tracking-[-0.02em] max-w-[720px] [text-wrap:balance]">
              Free Steel Weight Calculator &amp; Industry Analysis
            </h1>
          </div>
          <p className="text-sm leading-relaxed text-muted-2 max-w-[380px] lg:text-right">
            Calculate steel weight instantly for TMT bar, MS plate, pipe, angle, channel &amp; beam. Expert industry analysis, weight charts &amp; guides for steel professionals.
          </p>
        </div>

        <HeroInstrument />

        <div className="flex flex-wrap items-center justify-center gap-3 mt-5 no-print">
          <Link href="/calculator" className="btn-glow px-6 py-2.5 text-sm no-underline">
            Open Calculator
          </Link>
          <Link
            href="/calculators"
            className="px-6 py-2.5 text-sm border border-rule text-muted hover:text-ink hover:border-ink no-underline transition-all"
          >
            All Calculators
          </Link>
          <Link
            href="/articles"
            className="px-6 py-2.5 text-sm border border-rule text-muted hover:text-ink hover:border-ink no-underline transition-all"
          >
            Browse Insights
          </Link>
        </div>

      </section>

      {/* CBAM strip — the one market number that changes what you quote */}
      <section className="max-w-[1320px] mx-auto px-4 sm:px-6 pt-10">
        <div className="grid grid-cols-1 md:grid-cols-[auto_1fr_auto] items-center bg-[#FFFFFF] border border-cbam-rule">
          <div className="px-5 py-4 md:border-r border-cbam-rule border-b md:border-b-0">
            <div className="font-mono text-[10.5px] tracking-[0.12em] text-[#7A8094] mb-1">
              EU CARBON BORDER PRICE — Q2 2026
            </div>
            <div className="font-mono text-[26px] font-semibold text-cbam leading-none">
              €75.28<span className="text-xs text-[#7A8094]"> /tCO₂e</span>
            </div>
          </div>
          <div className="px-5 py-4 border-b md:border-b-0">
            <p className="text-[13.5px] leading-normal text-[#2A2D35] m-0">
              Every tonne of steel entering the EU now carries this price on its embedded carbon.
            </p>
            <div className="font-mono text-[11px] text-[#7A8094] mt-1.5">
              Q3 PRICE — 5 OCT 2026 · CERTIFICATE SALES OPEN — 1 FEB 2027
            </div>
          </div>
          <div className="px-5 py-4 flex flex-col gap-2 items-start md:items-end">
            <Link
              href="/cbam/calculator"
              className="btn-cbam text-[13px] px-4 py-2.5 no-underline"
            >
              Estimate your cargo&apos;s cost →
            </Link>
            <Link
              href="/cbam"
              className="font-mono text-[10.5px] tracking-[0.06em] text-[#5A6070] no-underline hover:text-cbam transition-colors"
            >
              HUB · TIMELINE · COUNTDOWN →
            </Link>
          </div>
        </div>
      </section>

      {/* Pillars — what you get, in one line each */}
      <section className="max-w-[1320px] mx-auto px-4 sm:px-6 pt-12 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-3 border-t border-ink">
          <div className="pt-5 md:pr-6">
            <div className="font-mono text-[11px] tracking-[0.12em] text-accent mb-2.5">01 — CALCULATE</div>
            <div className="text-[15px] leading-normal text-muted">
              <a href="#tools" className="font-bold text-ink no-underline">Quote any section in seconds.</a>{" "}
              Twenty free calculators — weight, yield &amp; production cost. No signup, works offline on site.
            </div>
          </div>
          <div className="pt-5 md:px-6 md:border-l border-rule mt-5 md:mt-0">
            <div className="font-mono text-[11px] tracking-[0.12em] text-cbam mb-2.5">02 — COMPLY</div>
            <div className="text-[15px] leading-normal text-muted">
              <Link href="/cbam" className="font-bold text-ink no-underline">Know your CBAM cost before your buyer asks.</Link>{" "}
              Deadlines, certificate prices &amp; checklists for both sides of the border.
            </div>
          </div>
          <div className="pt-5 md:pl-6 md:border-l border-rule mt-5 md:mt-0">
            <div className="font-mono text-[11px] tracking-[0.12em] text-accent mb-2.5">03 — UNDERSTAND</div>
            <div className="text-[15px] leading-normal text-muted">
              <a href="#insights" className="font-bold text-ink no-underline">Buy and sell with the full picture.</a>{" "}
              {articles.length} articles &amp; guides — pricing, policy &amp; supply chains, every claim sourced and dated.
            </div>
          </div>
        </div>
      </section>

      {/* 01 — Tools */}
      <section id="tools" className="max-w-[1320px] mx-auto px-4 sm:px-6 pb-18">
        <div className="flex items-end justify-between gap-4 lg:gap-8 mb-8 flex-wrap">
          <div>
            <div className="font-mono text-[11px] tracking-[0.14em] text-accent mb-3">01 — TOOLS</div>
            <h2 className="text-[clamp(24px,3.5vw,32px)] font-extrabold tracking-[-0.02em]">
              Essential Calculators
            </h2>
          </div>
          <p className="text-sm text-muted-2 mb-1 lg:text-right">
            Steel weight &amp; yield — instant results for every section type
          </p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-7 items-start">
          <div className="border-t border-ink">
            {TOOL_ROWS.map((c) => (
              <Link
                key={c.idx}
                href={c.href}
                className="grid grid-cols-[44px_minmax(140px,1.2fr)_minmax(80px,1fr)_64px] gap-3.5 items-baseline py-4 px-1 border-b border-rule text-ink no-underline hover:bg-[#FFFFFF] transition-colors"
              >
                <span className="font-mono text-[11.5px] text-muted-3">{c.idx}</span>
                <span>
                  <span className="block text-[16.5px] font-bold tracking-[-0.01em]">{c.title}</span>
                  <span className="block text-[12.5px] text-muted-2 mt-0.5">{c.desc}</span>
                </span>
                <span className="font-mono text-xs text-muted hidden sm:block">{c.formula}</span>
                <span className="font-mono text-xs text-right text-accent">OPEN →</span>
              </Link>
            ))}
            <Link
              href="/calculators"
              className="block py-3.5 px-1 font-mono text-xs tracking-[0.06em] text-ink no-underline hover:text-accent transition-colors"
            >
              ALL 20 CALCULATORS →
            </Link>
          </div>
          <YieldMini />
        </div>
      </section>

      {/* 02 — Guides */}
      <section id="insights" className="max-w-[1320px] mx-auto px-4 sm:px-6 pb-16">
        <div className="flex items-end justify-between gap-4 lg:gap-8 mb-8 flex-wrap">
          <div>
            <div className="font-mono text-[11px] tracking-[0.14em] text-accent mb-3">02 — REFERENCE</div>
            <h2 className="text-[clamp(24px,3.5vw,32px)] font-extrabold tracking-[-0.02em]">
              Guides &amp; Weight Charts
            </h2>
            <p className="text-muted-2 text-xs sm:text-sm mt-1.5">
              Reference charts, calculators &amp; step-by-step guides for steel professionals
            </p>
          </div>
          <Link
            href="/articles"
            className="font-mono text-xs tracking-[0.06em] text-ink border-b border-ink pb-0.5 no-underline hover:text-accent hover:border-accent transition-colors"
          >
            View All →
          </Link>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-12 border-t border-ink">
          {guides.slice(0, 6).map((article) => (
            <GuideRow key={article.slug} article={article} />
          ))}
        </div>
      </section>

      {/* 03 — Analysis */}
      <section className="max-w-[1320px] mx-auto px-4 sm:px-6 pb-18">
        <div className="flex items-end justify-between gap-4 lg:gap-8 mb-8 flex-wrap">
          <div>
            <div className="font-mono text-[11px] tracking-[0.14em] text-accent mb-3">03 — INTELLIGENCE</div>
            <h2 className="text-[clamp(24px,3.5vw,32px)] font-extrabold tracking-[-0.02em]">
              Industry Analysis
            </h2>
          </div>
          <p className="text-sm text-muted-2 mb-1 lg:text-right">
            Market trends, policy impact &amp; supply chain deep-dives
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 border-t border-ink border-l border-l-rule">
          {[...analysis, ...crisis].slice(0, 6).map((article) => (
            <AnalysisCard key={article.slug} article={article} />
          ))}
        </div>

        {/* CTA banner */}
        <div className="flex items-center justify-between gap-4 lg:gap-8 flex-wrap border border-rule border-t-0 px-7 py-6 bg-[#FFFFFF]">
          <div>
            <h2 className="text-xl font-extrabold tracking-[-0.01em] mb-1.5">
              All {articles.length} Articles &amp; Guides
            </h2>
            <p className="text-[13px] text-muted-2 max-w-xl">
              From TMT bar weight charts to Hormuz crisis analysis — everything steel professionals need in one place.
            </p>
          </div>
          <Link
            href="/articles"
            className="shrink-0 btn-glow inline-block px-6 py-3 text-sm no-underline"
          >
            Explore All Insights →
          </Link>
        </div>

        <p className="text-[12.5px] leading-[1.65] text-muted-3 mt-8 mx-auto max-w-[880px] text-center">
          SteelMath is a free steel weight calculator supporting all common sections — TMT bar (rebar), mild steel plate, MS pipe, angle, channel, I-beam, flat bar &amp; square tube. Use the d&sup2;/162 formula for round bars or enter dimensions for instant weight-per-metre results. Our tools support multiple steel grades including MS (7,850 kg/m&sup3;), SS 304, SS 316, Aluminium &amp; Copper with accurate density factors.
        </p>
      </section>
    </>
  );
}
