"use client";

import Link from "next/link";
import { articles } from "@/lib/data/articles";
import { newsHeadlines } from "@/lib/data/market";

const TAG_COLORS: Record<string, string> = {
  MARKETS: "text-accent",
  POLICY: "text-teal",
  PRICING: "text-green-up",
  SUPPLY: "text-warn",
  INDUSTRY: "text-blue-400",
};

export default function InsightsFeed() {
  return (
    <div className="glass-panel glass-panel-hover h-full flex flex-col">
      <div className="widget-header">
        <h2 className="text-white font-bold text-xs tracking-tight">News & Insights</h2>
        <Link href="/articles" className="text-accent/50 hover:text-accent text-[9px] font-semibold uppercase tracking-wider no-underline transition-colors">
          All →
        </Link>
      </div>

      <div className="flex-1 px-3 pb-3 overflow-auto">
        {newsHeadlines.map((item, i) => (
          <div key={i} className="flex items-start gap-2 py-2 border-b border-white/[0.03] last:border-0 group cursor-pointer hover:bg-white/[0.02] -mx-1 px-1 rounded transition-colors">
            <div className="w-0.5 min-h-[28px] rounded-full shrink-0 bg-accent/20" />
            <div className="flex-1 min-w-0">
              <h4 className="text-white/70 text-[10px] font-medium leading-snug group-hover:text-white transition-colors line-clamp-2">
                {item.title}
              </h4>
              <div className="flex items-center gap-1.5 mt-1">
                <span className={`text-[8px] font-bold uppercase tracking-wider ${TAG_COLORS[item.tag] || "text-white/20"}`}>{item.tag}</span>
                <span className="text-white/10 text-[8px]">{item.time}</span>
              </div>
            </div>
          </div>
        ))}

        <div className="pt-2 mt-1 border-t border-white/[0.03]">
          <div className="text-[8px] text-white/15 uppercase tracking-wider font-semibold mb-1">Deep Dives</div>
          {articles.slice(0, 2).map((a) => (
            <Link key={a.slug} href={`/articles/${a.slug}`}
              className="block py-1.5 text-white/30 text-[10px] no-underline hover:text-accent transition-colors leading-snug line-clamp-1">
              {a.title}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
