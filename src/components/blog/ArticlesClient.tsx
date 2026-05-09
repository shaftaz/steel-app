"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import type { Article, Category } from "@/lib/data/articles";
import { CATEGORY_STYLES } from "@/lib/data/articles";

/* ── helpers ── */
function fmtDate(d: string) {
  return new Date(d).toLocaleDateString("en-IN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

const FILTERS: { label: string; value: Category | "ALL" }[] = [
  { label: "All", value: "ALL" },
  { label: "Crisis", value: "CRISIS" },
  { label: "Analysis", value: "ANALYSIS" },
  { label: "Guide", value: "GUIDE" },
];

const MOST_READ_SLUGS = [
  "tmt-bar-weight-per-metre-chart",
  "ms-pipe-weight-calculator-chart",
  "steel-plate-weight-calculator-thickness-chart",
  "steel-weight-calculator-guide",
  "steel-angle-weight-chart-sizes-formula",
];

const CALC_LINKS = [
  { href: "/calculators/tmt", label: "TMT Bar Calculator" },
  { href: "/calculators/steel-plate", label: "Steel Plate Calculator" },
  { href: "/calculators/pipe-weight", label: "MS Pipe Calculator" },
  { href: "/calculators/angle-weight", label: "Steel Angle Calculator" },
  { href: "/calculators/scrap-yield", label: "Scrap Yield Calculator" },
  { href: "/calculator", label: "All-in-One Calculator" },
];

/* ── main component ── */
export default function ArticlesClient({ articles }: { articles: Article[] }) {
  const [activeFilter, setActiveFilter] = useState<Category | "ALL">("ALL");
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    let list = articles;
    if (activeFilter !== "ALL") {
      list = list.filter((a) => a.category === activeFilter);
    }
    if (search.trim()) {
      const q = search.toLowerCase().trim();
      list = list.filter(
        (a) =>
          a.title.toLowerCase().includes(q) ||
          a.excerpt.toLowerCase().includes(q)
      );
    }
    return list;
  }, [articles, activeFilter, search]);

  const featured = activeFilter === "ALL" && !search.trim() ? articles[0] : null;
  const gridArticles = featured ? filtered.slice(1) : filtered;

  const mostRead = MOST_READ_SLUGS.map((s) =>
    articles.find((a) => a.slug === s)
  ).filter(Boolean) as Article[];

  return (
    <>
      {/* ── Filter + Search bar ── */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-5">
        <div className="flex flex-wrap items-center gap-2">
          {FILTERS.map((f) => (
            <button
              key={f.value}
              onClick={() => setActiveFilter(f.value)}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-colors border ${
                activeFilter === f.value
                  ? "bg-accent/15 text-accent border-accent/30"
                  : "bg-white/[0.03] text-white/35 border-white/5 hover:text-white/60 hover:border-white/10"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
        <div className="relative w-full sm:w-64">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search articles…"
            className="w-full bg-white/[0.03] border border-white/5 rounded-lg px-3 py-2 text-sm text-white/70 placeholder:text-white/20 focus:outline-none focus:border-accent/30 transition-colors"
          />
          {search && (
            <button
              onClick={() => setSearch("")}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-white/20 hover:text-white/50 text-xs"
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {/* ── Two-column layout ── */}
      <div className="flex flex-col lg:flex-row gap-5">
        {/* Main column */}
        <div className="flex-1 min-w-0">
          {/* Featured article */}
          {featured && (
            <FeaturedCard article={featured} />
          )}

          {/* Article grid */}
          {gridArticles.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {gridArticles.map((article) => (
                <ArticleCardNew key={article.slug} article={article} />
              ))}
            </div>
          ) : (
            <div className="glass-panel p-8 text-center">
              <p className="text-white/30 text-sm">No articles match your search.</p>
              <button
                onClick={() => { setSearch(""); setActiveFilter("ALL"); }}
                className="text-accent text-xs mt-2 hover:underline"
              >
                Clear filters
              </button>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <aside className="w-full lg:w-72 xl:w-80 shrink-0 space-y-4">
          {/* Most Read */}
          <div className="glass-panel p-4">
            <h3 className="text-white/60 font-bold text-xs uppercase tracking-wider mb-3">
              Most Read
            </h3>
            <ol className="space-y-2.5">
              {mostRead.map((a, i) => (
                <li key={a.slug} className="flex gap-2.5 items-start">
                  <span className="text-accent/40 font-bold text-sm leading-snug min-w-[16px]">
                    {i + 1}
                  </span>
                  <Link
                    href={`/articles/${a.slug}`}
                    className="text-white/50 hover:text-accent text-xs leading-snug no-underline transition-colors line-clamp-2"
                  >
                    {a.title}
                  </Link>
                </li>
              ))}
            </ol>
          </div>

          {/* Newsletter Signup */}
          <div className="glass-panel p-4 bg-gradient-to-br from-accent/[0.04] to-transparent">
            <h3 className="text-white/60 font-bold text-xs uppercase tracking-wider mb-1.5">
              Steel Intelligence
            </h3>
            <p className="text-white/25 text-[11px] mb-3 leading-relaxed">
              Weekly pricing moves, policy changes &amp; technical guides. Free for steel professionals.
            </p>
            <form
              onSubmit={(e) => e.preventDefault()}
              className="flex gap-2"
            >
              <input
                type="email"
                placeholder="you@company.com"
                className="flex-1 bg-white/[0.04] border border-white/5 rounded-md px-2.5 py-1.5 text-xs text-white/60 placeholder:text-white/15 focus:outline-none focus:border-accent/30 transition-colors"
              />
              <button
                type="submit"
                className="px-3 py-1.5 bg-accent/15 text-accent border border-accent/20 rounded-md text-xs font-semibold hover:bg-accent/25 transition-colors shrink-0"
              >
                Subscribe
              </button>
            </form>
          </div>

          {/* Calculator Quick Links */}
          <div className="glass-panel p-4">
            <h3 className="text-white/60 font-bold text-xs uppercase tracking-wider mb-3">
              Quick Calculators
            </h3>
            <div className="grid grid-cols-2 gap-1.5">
              {CALC_LINKS.map((c) => (
                <Link
                  key={c.href}
                  href={c.href}
                  className="text-white/35 hover:text-accent text-[11px] no-underline transition-colors py-1"
                >
                  {c.label}
                </Link>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </>
  );
}

/* ── Featured card ── */
function FeaturedCard({ article }: { article: Article }) {
  const style = CATEGORY_STYLES[article.category];
  return (
    <Link
      href={`/articles/${article.slug}`}
      className="group block glass-panel glass-panel-hover overflow-hidden no-underline mb-5"
    >
      <div className="p-5 sm:p-8">
        <div className="flex items-center gap-2.5 mb-3">
          <span className="bg-accent/15 text-accent text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
            Latest
          </span>
          <span
            className={`${style.bg} ${style.text} text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider`}
          >
            {article.category}
          </span>
          <span className="text-white/20 text-xs">{article.readTime}</span>
        </div>
        <h2 className="text-white text-lg sm:text-xl font-bold mb-2 leading-snug group-hover:text-accent transition-colors">
          {article.title}
        </h2>
        <p className="text-white/30 text-sm leading-relaxed mb-3 max-w-3xl">
          {article.excerpt}
        </p>
        <div className="flex items-center gap-3">
          <span className="text-white/15 text-xs">{fmtDate(article.date)}</span>
          <span className="text-accent/50 text-xs font-semibold">
            Read Article →
          </span>
        </div>
      </div>
    </Link>
  );
}

/* ── Regular article card ── */
function ArticleCardNew({ article }: { article: Article }) {
  const style = CATEGORY_STYLES[article.category];
  return (
    <Link
      href={`/articles/${article.slug}`}
      className="group block glass-panel glass-panel-hover overflow-hidden no-underline"
    >
      <div className="p-4 sm:p-5">
        <div className="flex items-center gap-2 mb-2">
          <span
            className={`${style.bg} ${style.text} text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider`}
          >
            {article.category}
          </span>
          <span className="text-white/20 text-xs">{article.readTime}</span>
        </div>
        <h3 className="text-white/70 text-sm font-semibold mb-1.5 leading-snug group-hover:text-accent transition-colors line-clamp-2">
          {article.title}
        </h3>
        <p className="text-white/25 text-xs leading-relaxed mb-2 line-clamp-2">
          {article.excerpt}
        </p>
        <div className="text-white/15 text-[11px]">{fmtDate(article.date)}</div>
      </div>
    </Link>
  );
}
