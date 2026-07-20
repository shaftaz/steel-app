import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { weightPages, getWeightPage } from "@/lib/data/weight-pages";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return weightPages.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const page = getWeightPage(slug);
  if (!page) return {};
  const og = `/og?title=${encodeURIComponent(page.metaTitle)}&value=${encodeURIComponent(page.ogValue)}&label=${encodeURIComponent(page.ogLabel)}&accent=orange`;
  return {
    title: page.metaTitle,
    description: page.metaDescription,
    alternates: { canonical: `https://steelmath.com/weights/${page.slug}` },
    openGraph: {
      title: page.metaTitle,
      description: page.metaDescription,
      url: `https://steelmath.com/weights/${page.slug}`,
      type: "website",
      images: [{ url: og, width: 1200, height: 630, alt: page.h1 }],
    },
    twitter: {
      card: "summary_large_image",
      title: page.metaTitle,
      description: page.metaDescription,
      images: [og],
    },
  };
}

export default async function WeightPage({ params }: PageProps) {
  const { slug } = await params;
  const page = getWeightPage(slug);
  if (!page) notFound();

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: page.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: { "@type": "Answer", text: faq.a },
    })),
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://steelmath.com" },
      { "@type": "ListItem", position: 2, name: "Weight Charts", item: "https://steelmath.com/weights" },
      { "@type": "ListItem", position: 3, name: page.h1, item: `https://steelmath.com/weights/${page.slug}` },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <div className="max-w-[1000px] mx-auto px-4 sm:px-6 py-5">
        {/* Breadcrumb */}
        <nav
          aria-label="Breadcrumb"
          className="font-mono text-[11px] tracking-[0.08em] text-muted-3 mb-5 uppercase"
        >
          <Link href="/" className="hover:text-ink no-underline transition-colors">Home</Link>
          <span> / </span>
          <Link href="/weights" className="hover:text-ink no-underline transition-colors">Weights</Link>
          <span> / </span>
          <span className="text-ink normal-case">{page.h1}</span>
        </nav>

        <div className="font-mono text-[11px] tracking-[0.12em] text-accent mb-2.5">
          {page.kicker}
        </div>
        <h1 className="text-[clamp(24px,3.5vw,34px)] leading-[1.1] font-extrabold tracking-[-0.02em] mb-6 [text-wrap:balance]">
          {page.h1}
        </h1>

        {/* Answer panel, the number above the fold */}
        <div className="print-block border border-ink">
          <div className="bg-ink text-paper px-5 sm:px-6 pt-5 pb-5">
            <div className="font-mono text-[10.5px] tracking-[0.12em] text-[#7E8085] mb-2">
              {page.answerLabel}
            </div>
            <div className="font-mono text-[clamp(36px,5vw,52px)] font-semibold text-accent leading-none">
              {page.answerValue}
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-x-4 gap-y-2.5 mt-5">
              {page.stats.map((s) => (
                <div key={s.label} className="border-t border-ink-border pt-2">
                  <div className="font-mono text-[10px] tracking-[0.1em] text-[#7E8085]">{s.label}</div>
                  <div className="font-mono text-[15px] font-semibold mt-0.5">{s.value}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-[#FFFFFF] px-5 sm:px-6 py-3.5 border-t border-rule">
            <div className="font-mono text-xs text-ink">{page.formula}</div>
            <div className="font-mono text-[11px] text-muted-2 mt-1">{page.formulaNote}</div>
            <div className="font-mono text-[10.5px] text-muted-3 mt-2">{page.source}</div>
          </div>
        </div>

        <div className="mt-4 no-print">
          <Link href={page.calcHref} className="btn-glow inline-block px-5 py-2.5 text-[13px] no-underline">
            {page.calcLabel}
          </Link>
        </div>

        {/* Family table, every row links to its size page */}
        <section className="mt-10">
          <h2 className="font-mono text-[11px] tracking-[0.14em] text-accent uppercase mb-3">
            {page.tableCaption}
          </h2>
          <div className="border border-rule bg-[#FFFFFF] overflow-x-auto">
            <table className="w-full text-sm border-collapse min-w-[440px]">
              <thead>
                <tr className="border-b border-ink">
                  {page.tableHeaders.map((h, i) => (
                    <th
                      key={h}
                      className={`font-mono text-[10.5px] tracking-[0.08em] uppercase text-muted-3 font-semibold py-2.5 px-4 ${i === 0 ? "text-left" : "text-right"}`}
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {page.rows.map((r) => (
                  <tr
                    key={r.label}
                    className={`border-b border-rule-faint ${r.active ? "bg-paper" : ""}`}
                  >
                    <td className="py-2 px-4">
                      {r.active ? (
                        <span className="font-mono text-[12.5px] font-semibold text-accent">
                          {r.label} ●
                        </span>
                      ) : (
                        <Link
                          href={r.href ?? "#"}
                          className="font-mono text-[12.5px] font-semibold text-ink no-underline hover:text-accent transition-colors"
                        >
                          {r.label}
                        </Link>
                      )}
                    </td>
                    {r.cells.map((c, i) => (
                      <td key={i} className="py-2 px-4 text-right font-mono text-[12.5px] text-muted">
                        {c}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* FAQ, visible content, mirrored in FAQPage JSON-LD above */}
        <section className="mt-10">
          <h2 className="font-mono text-[11px] tracking-[0.14em] text-accent uppercase mb-1">
            Frequently asked questions
          </h2>
          {page.faqs.map((faq) => (
            <div key={faq.q} className="border-b border-rule py-4">
              <h3 className="text-[15px] font-bold tracking-[-0.01em] mb-1.5">{faq.q}</h3>
              <p className="text-sm leading-relaxed text-muted max-w-[720px]">{faq.a}</p>
            </div>
          ))}
        </section>

        {/* Related */}
        <section className="mt-8 flex flex-col gap-2.5">
          <h2 className="font-mono text-[11px] tracking-[0.14em] text-accent uppercase mb-0.5">
            Related tools &amp; charts
          </h2>
          {page.related.map((r) => (
            <Link
              key={r.href}
              href={r.href}
              className="text-[13.5px] font-semibold text-ink no-underline hover:text-accent transition-colors"
            >
              {r.label} →
            </Link>
          ))}
          <Link
            href="/weights"
            className="font-mono text-[11.5px] tracking-[0.06em] text-muted-2 no-underline hover:text-ink transition-colors mt-1"
          >
            ← ALL SIZE-BY-SIZE WEIGHT PAGES
          </Link>
        </section>
      </div>
    </>
  );
}
