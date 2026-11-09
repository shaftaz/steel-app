import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { articles, getArticleBySlug } from "@/lib/data/articles";
import NewsletterCta from "@/components/NewsletterCta";
import OutboundTracker from "@/components/OutboundTracker";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return articles.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) return {};
  const ogImage = article.ogImage ?? {
    url: `/og?title=${encodeURIComponent(article.metaTitle)}&accent=orange`,
    alt: article.title,
  };
  return {
    title: article.metaTitle,
    description: article.metaDescription,
    alternates: {
      canonical: `https://steelmath.com/articles/${article.slug}`,
    },
    openGraph: {
      type: "article",
      title: article.metaTitle,
      description: article.metaDescription,
      images: [{ url: ogImage.url, width: 1200, height: 630, alt: ogImage.alt }],
      url: `https://steelmath.com/articles/${article.slug}`,
      siteName: "SteelMath",
      locale: "en_IN",
      publishedTime: article.date,
      modifiedTime: article.lastUpdated || article.date,
      section: article.category,
      authors: ["SteelMath Research"],
      tags: [
        article.category.toLowerCase(),
        "steel",
        "india",
        ...article.metaTitle.toLowerCase().split(/\s+/).filter((w) => w.length > 4),
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: article.metaTitle,
      description: article.metaDescription,
      images: [ogImage.url],
    },
  };
}

const VALID_CALCS = new Set([
  "tmt", "steel-plate", "pipe-weight", "angle-weight", "beam-weight",
  "channel-weight", "flat-bar-weight", "round-bar-weight", "rebar",
  "square-tube-weight", "rect-tube-weight", "chequered-plate-weight",
  "stainless-steel-weight", "metal-weight", "gauge-to-mm",
  "hardness-conversion", "credit-cost", "scrap-yield",
  "scrap-production-cost", "coil-weight", "landed-cost",
]);
const CALC_ALIASES: Record<string, string> = {
  weight: "calculator",
  calculator: "calculator",
  "Steel Weight Calculator": "calculator",
};

function resolveCalc(slug: string): string | null {
  if (VALID_CALCS.has(slug)) return `/calculators/${slug}`;
  if (CALC_ALIASES[slug]) return "/calculator";
  return null;
}

function getRelatedArticles(currentSlug: string) {
  const current = getArticleBySlug(currentSlug);
  if (!current) return [];
  const sameCategory = articles.filter(
    (a) => a.slug !== currentSlug && a.category === current.category
  );
  const otherCategory = articles.filter(
    (a) => a.slug !== currentSlug && a.category !== current.category
  );
  return [...sameCategory, ...otherCategory].slice(0, 3);
}

function extractFaqs(html: string): { question: string; answer: string }[] {
  const faqSection = html.match(
    /<h2>Frequently Asked Questions<\/h2>([\s\S]*?)(?=<h2>|$)/i
  );
  if (!faqSection) return [];
  const faqs: { question: string; answer: string }[] = [];
  const qaPairs = faqSection[1].matchAll(
    /<h3>([^<]+)<\/h3>\s*<p>([\s\S]*?)(?=<h3>|$)/gi
  );
  for (const match of qaPairs) {
    const question = match[1].trim();
    const answer = match[2]
      .replace(/<[^>]*>/g, "")
      .replace(/\s+/g, " ")
      .trim();
    if (question && answer) faqs.push({ question, answer });
  }
  return faqs;
}

export default async function ArticlePage({ params }: PageProps) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) notFound();

  const related = getRelatedArticles(slug);
  const faqs = extractFaqs(article.content);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.metaDescription,
    image: [
      `https://steelmath.com${(article.ogImage ?? { url: `/og?title=${encodeURIComponent(article.metaTitle)}&accent=orange` }).url}`,
    ],
    datePublished: article.date,
    dateModified: article.lastUpdated || article.date,
    author: {
      "@type": "Person",
      name: "Special Correspondent",
      url: "https://steelmath.com",
    },
    publisher: {
      "@type": "Organization",
      name: "SteelMath",
      url: "https://steelmath.com",
      logo: {
        "@type": "ImageObject",
        url: "https://steelmath.com/logo.png",
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://steelmath.com/articles/${article.slug}`,
    },
    articleSection: article.category,
    wordCount: Math.round(
      article.content.replace(/<[^>]*>/g, "").split(/\s+/).length
    ),
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
        name: "Insights",
        item: "https://steelmath.com/articles",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: article.title,
        item: `https://steelmath.com/articles/${article.slug}`,
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
      {faqs.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: faqs.map((faq) => ({
                "@type": "Question",
                name: faq.question,
                acceptedAnswer: {
                  "@type": "Answer",
                  text: faq.answer,
                },
              })),
            }),
          }}
        />
      )}
      <OutboundTracker />
      <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 py-5">
        {/* Breadcrumb navigation */}
        <nav
          aria-label="Breadcrumb"
          className="flex items-center gap-1.5 font-mono text-[11px] tracking-[0.08em] text-muted-3 mb-5 uppercase"
        >
          <Link
            href="/"
            className="hover:text-ink no-underline transition-colors"
          >
            Home
          </Link>
          <span>/</span>
          <Link
            href="/articles"
            className="hover:text-ink no-underline transition-colors"
          >
            Insights
          </Link>
          <span>/</span>
          <span className="text-ink truncate max-w-[250px] normal-case">
            {article.title}
          </span>
        </nav>

        <article className="glass-panel overflow-hidden">
          <div className="p-6 sm:p-10">
            <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1.5 mb-5 font-mono text-[10.5px] tracking-[0.1em] uppercase">
              <span className={`font-semibold ${article.category === "GUIDE" ? "text-accent" : article.category === "CRISIS" ? "text-red-down" : "text-cbam"}`}>
                {article.category}
              </span>
              <span className="text-muted-3">·</span>
              <span className="text-muted-3">
                {article.readTime} read
              </span>
              <span className="text-muted-3">·</span>
              <time
                dateTime={article.date}
                className="text-muted-3"
              >
                {new Date(article.date).toLocaleDateString("en-IN", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </time>
              <span className="text-muted-3">·</span>
              <span className="text-muted-3">
                Last verified{" "}
                <time dateTime={article.lastUpdated || article.date}>
                  {new Date(article.lastUpdated || article.date).toLocaleDateString("en-IN", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </time>
              </span>
            </div>

            <h1 className="text-ink text-[clamp(26px,4.5vw,38px)] font-extrabold mb-4 leading-[1.12] tracking-[-0.02em]">
              {article.title}
            </h1>
            <p className="font-mono text-[11px] tracking-[0.06em] text-muted-3 uppercase pb-5 mb-8 border-b border-rule">
              By <span className="text-muted font-medium">Special Correspondent</span> &middot; SteelMath
            </p>

            <div
              className="prose max-w-none prose-glass prose-editorial"
              dangerouslySetInnerHTML={{ __html: article.content }}
            />

            {/* CTA section */}
            <div className="mt-10 pt-6 border-t border-rule flex flex-col sm:flex-row items-start sm:items-center gap-3">
              <Link
                href="/calculator"
                className="btn-glow inline-block px-6 py-2.5 no-underline text-xs font-semibold"
              >
                Open Calculator
              </Link>
              <Link
                href="/"
                className="btn-glow inline-block px-6 py-2.5 no-underline text-xs font-semibold"
              >
                Dashboard
              </Link>
              <Link
                href="/articles"
                className="text-muted-2 hover:text-ink text-xs no-underline transition-colors"
              >
                More Insights →
              </Link>
            </div>
          </div>
        </article>

        {/* Related tools — contextual calculator links from article data */}
        {article.relatedCalculators.some((c) => resolveCalc(c)) && (
          <section className="mt-8">
            <h2 className="font-mono text-[11px] tracking-[0.14em] text-accent font-medium mb-0 uppercase pb-3">
              Related tools
            </h2>
            <div className="border-t border-ink">
              {article.relatedCalculators
                .map((calc) => ({ calc, href: resolveCalc(calc) }))
                .filter((x): x is { calc: string; href: string } => !!x.href)
                .map(({ calc, href }) => (
                  <Link
                    key={calc}
                    href={href}
                    className="flex justify-between items-baseline gap-3 py-3 px-1 border-b border-rule text-[13.5px] font-semibold text-ink no-underline hover:text-accent transition-colors"
                  >
                    <span className="capitalize">
                      {href === "/calculator" ? "Steel weight calculator" : `${calc.replace(/-/g, " ")} calculator`}
                    </span>
                    <span className="font-mono text-[11px] text-accent">OPEN →</span>
                  </Link>
                ))}
            </div>
          </section>
        )}

        <NewsletterCta />

        {/* Related Articles — critical for internal linking & SEO */}
        {related.length > 0 && (
          <section className="mt-8">
            <h2 className="font-mono text-[11px] tracking-[0.14em] text-accent font-medium mb-0 uppercase pb-3">
              Related Articles
            </h2>
            <div className="border-t border-ink">
              {related.map((rel) => (
                <Link
                  key={rel.slug}
                  href={`/articles/${rel.slug}`}
                  className="group grid grid-cols-[84px_1fr_70px] gap-4 items-baseline py-3.5 px-1 border-b border-rule text-ink no-underline hover:bg-[#FFFFFF] transition-colors"
                >
                  <span className="font-mono text-[10.5px] tracking-[0.08em] text-muted-3 uppercase">
                    {rel.category}
                  </span>
                  <h3 className="text-[13.5px] font-bold leading-snug group-hover:text-accent transition-colors line-clamp-2 m-0">
                    {rel.title}
                  </h3>
                  <span className="font-mono text-[10.5px] text-muted-3 text-right">
                    {rel.readTime}
                  </span>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </>
  );
}
