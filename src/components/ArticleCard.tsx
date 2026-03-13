import Link from "next/link";
import { Article, CATEGORY_STYLES } from "@/lib/data/articles";

export default function ArticleCard({ article }: { article: Article }) {
  const style = CATEGORY_STYLES[article.category];

  return (
    <Link
      href={`/articles/${article.slug}`}
      className="group block glass-panel glass-panel-hover overflow-hidden no-underline"
    >
      <div className="p-4 sm:p-5">
        <div className="flex items-center gap-2 mb-2">
          <span className={`${style.bg} ${style.text} text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider`}>
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
        <div className="text-white/15 text-[11px]">
          {new Date(article.date).toLocaleDateString("en-IN", { year: "numeric", month: "long", day: "numeric" })}
        </div>
      </div>
    </Link>
  );
}
