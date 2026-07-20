"use client";

import { useEffect, useState, useMemo } from "react";
import Link from "next/link";
import type { Article, Category } from "@/lib/data/articles";

/* Precision Instrument index for /articles:
   instrument tabs with counts, mono search, a featured lead story,
   then a dense ruled list. Ships the same data as before. */

function fmtDate(d: string) {
  return new Date(d)
    .toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "2-digit" })
    .toUpperCase();
}

function mins(readTime: string) {
  const m = parseInt(readTime, 10);
  return isFinite(m) ? `${m}′` : readTime;
}

const FILTERS: { label: string; value: Category | "ALL" }[] = [
  { label: "All", value: "ALL" },
  { label: "Analysis", value: "ANALYSIS" },
  { label: "Guides", value: "GUIDE" },
  { label: "Crisis", value: "CRISIS" },
];

const CATEGORY_COLOR: Record<Category, string> = {
  GUIDE: "text-accent",
  ANALYSIS: "text-cbam",
  CRISIS: "text-red-down",
};

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

export default function ArticlesClient({ articles }: { articles: Article[] }) {
  const [activeFilter, setActiveFilter] = useState<Category | "ALL">("ALL");
  const [search, setSearch] = useState("");

  useEffect(() => {
    try {
      const q = new URLSearchParams(window.location.search).get("q");
      if (q) setSearch(q);
    } catch {}
  }, []);

  const counts = useMemo(() => {
    const c: Record<string, number> = { ALL: articles.length };
    for (const a of articles) c[a.category] = (c[a.category] ?? 0) + 1;
    return c;
  }, [articles]);

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
  const listArticles = featured ? filtered.slice(1) : filtered;

  const mostRead = MOST_READ_SLUGS.map((s) =>
    articles.find((a) => a.slug === s)
  ).filter(Boolean) as Article[];

  return (
    <>
      {/* Filter instrument */}
      <div className="border border-ink bg-[#FFFFFF] mb-7 flex flex-col sm:flex-row sm:items-stretch">
        <div className="flex flex-wrap" role="tablist" aria-label="Filter by category">
          {FILTERS.map((f) => (
            <button
              key={f.value}
              role="tab"
              aria-selected={activeFilter === f.value}
              onClick={() => setActiveFilter(f.value)}
              className={`font-mono text-[11.5px] tracking-[0.04em] px-4 py-3 cursor-pointer border-r border-rule-faint transition-colors min-h-[44px] ${
                activeFilter === f.value
                  ? "bg-ink text-[#FFFFFF]"
                  : "bg-transparent text-ink hover:bg-paper"
              }`}
            >
              {f.label.toUpperCase()}
              <span className={activeFilter === f.value ? "opacity-60" : "text-muted-3"}>
                {" "}
                {counts[f.value] ?? 0}
              </span>
            </button>
          ))}
        </div>
        <div className="flex items-center gap-2.5 flex-1 px-4 border-t sm:border-t-0 sm:border-l border-rule-faint">
          <span className="font-mono text-xs text-muted-3" aria-hidden="true">→</span>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search titles and summaries…"
            aria-label="Search articles"
            className="flex-1 bg-transparent border-none outline-none font-mono text-[13px] text-ink py-3 placeholder:text-muted-3 min-w-0"
          />
          {search && (
            <button
              onClick={() => setSearch("")}
              className="border border-rule text-muted-3 font-mono text-[10.5px] px-1.5 py-0.5 cursor-pointer hover:border-ink hover:text-ink"
            >
              CLEAR
            </button>
          )}
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Main column */}
        <div className="flex-1 min-w-0">
          {featured && (
            <Link
              href={`/articles/${featured.slug}`}
              className="group block border border-ink bg-[#FFFFFF] no-underline mb-7 hover:bg-paper transition-colors"
            >
              <div className="p-6 sm:p-8">
                <div className="flex items-baseline gap-3 mb-3 font-mono text-[10.5px] tracking-[0.1em] uppercase">
                  <span className="text-accent font-semibold">Latest</span>
                  <span className={`${CATEGORY_COLOR[featured.category]} font-semibold`}>
                    {featured.category}
                  </span>
                  <span className="text-muted-3">{mins(featured.readTime)}</span>
                  <span className="text-muted-3 ml-auto">{fmtDate(featured.date)}</span>
                </div>
                <h2 className="text-ink text-xl sm:text-[24px] font-extrabold mb-2.5 leading-snug tracking-[-0.01em] group-hover:text-accent transition-colors [text-wrap:balance]">
                  {featured.title}
                </h2>
                <p className="text-muted-2 text-sm leading-relaxed mb-3 max-w-3xl">
                  {featured.excerpt}
                </p>
                <span className="font-mono text-[11.5px] text-accent">READ →</span>
              </div>
            </Link>
          )}

          {listArticles.length > 0 ? (
            <div className="border-t border-ink">
              {listArticles.map((article) => (
                <Link
                  key={article.slug}
                  href={`/articles/${article.slug}`}
                  className="group grid grid-cols-[86px_1fr] sm:grid-cols-[86px_1fr_64px] gap-x-4 gap-y-1 items-baseline py-4 px-1 border-b border-rule text-ink no-underline hover:bg-[#FFFFFF] transition-colors"
                >
                  <span className={`font-mono text-[10px] tracking-[0.08em] uppercase font-semibold ${CATEGORY_COLOR[article.category]}`}>
                    {article.category}
                    <span className="block text-muted-3 font-normal mt-0.5">
                      {mins(article.readTime)} · {fmtDate(article.date)}
                    </span>
                  </span>
                  <span>
                    <span className="block text-[15.5px] font-bold leading-[1.35] tracking-[-0.01em] group-hover:text-accent transition-colors">
                      {article.title}
                    </span>
                    <span className="block text-[12.5px] leading-normal text-muted-2 mt-1 line-clamp-2">
                      {article.excerpt}
                    </span>
                  </span>
                  <span className="hidden sm:block font-mono text-[11px] text-muted-3 text-right group-hover:text-accent transition-colors">
                    READ →
                  </span>
                </Link>
              ))}
            </div>
          ) : (
            <div className="border border-rule bg-[#FFFFFF] p-8 text-center">
              <p className="text-muted-2 text-sm">No articles match your search.</p>
              <button
                onClick={() => {
                  setSearch("");
                  setActiveFilter("ALL");
                }}
                className="font-mono text-xs text-accent mt-2 cursor-pointer"
              >
                CLEAR FILTERS →
              </button>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <aside className="w-full lg:w-72 xl:w-80 shrink-0 space-y-7 lg:pt-0">
          <div>
            <h3 className="font-mono text-[11px] tracking-[0.14em] text-accent uppercase font-medium border-t border-ink pt-3 mb-1">
              Most read
            </h3>
            <ol>
              {mostRead.map((a, i) => (
                <li key={a.slug} className="border-b border-rule">
                  <Link
                    href={`/articles/${a.slug}`}
                    className="grid grid-cols-[26px_1fr] gap-2.5 py-3 items-baseline text-ink no-underline group"
                  >
                    <span className="font-mono text-[11.5px] text-muted-3">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="text-[13px] font-semibold leading-snug group-hover:text-accent transition-colors line-clamp-2">
                      {a.title}
                    </span>
                  </Link>
                </li>
              ))}
            </ol>
          </div>

          <div>
            <h3 className="font-mono text-[11px] tracking-[0.14em] text-accent uppercase font-medium border-t border-ink pt-3 mb-1">
              Quick calculators
            </h3>
            <div>
              {CALC_LINKS.map((c) => (
                <Link
                  key={c.href}
                  href={c.href}
                  className="flex justify-between items-baseline gap-2 py-2.5 border-b border-rule text-[13px] font-semibold text-ink no-underline hover:text-accent transition-colors"
                >
                  <span>{c.label}</span>
                  <span className="font-mono text-[10.5px] text-accent">→</span>
                </Link>
              ))}
            </div>
          </div>

          <div className="bg-ink text-paper p-5">
            <div className="font-mono text-[10.5px] tracking-[0.12em] text-[#7E8085] mb-1.5">
              NEVER MISS AN UPDATE
            </div>
            <p className="text-[12.5px] leading-relaxed text-[#C9CACC] mb-3">
              Every article, sourced and dated, in your feed reader.
            </p>
            <a
              href="/feed.xml"
              className="font-mono text-[11.5px] tracking-[0.06em] text-accent no-underline hover:text-paper transition-colors"
            >
              RSS FEED →
            </a>
          </div>
        </aside>
      </div>
    </>
  );
}
