import type { Metadata } from "next";
import Link from "next/link";
import { weightPages, weightFamilies } from "@/lib/data/weight-pages";

export const metadata: Metadata = {
  title: "Steel Weight Charts by Size: TMT, Pipe, Beam, Channel & Angle",
  description:
    "Size-by-size steel weight reference: every TMT bar diameter, MS pipe NB size, ISMB beam, ISMC channel and equal angle, weight per metre, per length and per tonne, with formulas and calculators.",
  alternates: { canonical: "https://steelmath.com/weights" },
  openGraph: {
    title: "Steel Weight Charts by Size: TMT, Pipe, Beam, Channel & Angle | SteelMath",
    description:
      "Every standard size, one page each: weight per metre, per length, per tonne, with formulas, standards and prefilled calculators.",
    url: "https://steelmath.com/weights",
    type: "website",
    images: [
      {
        url: "/og?title=Steel%20Weight%20Charts%20by%20Size&value=84%20sizes&label=TMT%20%C2%B7%20PIPE%20%C2%B7%20BEAM%20%C2%B7%20CHANNEL%20%C2%B7%20ANGLE&accent=orange",
        width: 1200,
        height: 630,
      },
    ],
  },
};

export default function WeightsIndexPage() {
  const datasetJsonLd = {
    "@context": "https://schema.org",
    "@type": "Dataset",
    name: "Steel section weights by size. TMT, MS pipe, ISMB, ISMC, equal angles",
    description:
      "Unit weights (kg/m), per-length weights and per-tonne counts for standard steel sections: TMT bar diameters 6-40 mm (IS 1786), MS pipe NB 15-200 mm (IS 1239 medium), ISMB 100-600 beams and ISMC 75-400 channels (IS 808), and 36 equal angle sizes. Derived from published standards; density basis 7,850 kg/m3.",
    url: "https://steelmath.com/weights",
    creator: { "@type": "Organization", name: "SteelMath", url: "https://steelmath.com" },
    license: "https://steelmath.com/about",
    keywords: ["steel weight", "TMT bar", "MS pipe", "ISMB", "ISMC", "equal angle", "kg per metre"],
    dateModified: "2026-07-18",
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://steelmath.com" },
      { "@type": "ListItem", position: 2, name: "Weight Charts", item: "https://steelmath.com/weights" },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(datasetJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 py-6">
        <nav
          aria-label="Breadcrumb"
          className="font-mono text-[11px] tracking-[0.08em] text-muted-3 mb-5 uppercase"
        >
          <Link href="/" className="hover:text-ink no-underline transition-colors">Home</Link>
          <span> / </span>
          <span className="text-ink">Weights</span>
        </nav>

        <div className="font-mono text-[11px] tracking-[0.12em] text-accent mb-2.5">
          SIZE-BY-SIZE REFERENCE · IS · ASTM · JIS · EN · GB STANDARDS
        </div>
        <h1 className="text-[clamp(26px,4vw,38px)] leading-[1.08] font-extrabold tracking-[-0.02em] mb-3 [text-wrap:balance]">
          Steel Weight Charts by Size
        </h1>
        <p className="text-sm leading-relaxed text-muted-2 max-w-[640px] mb-9">
          One page per standard size, weight per metre, per length and per tonne, with the
          formula, the governing standard and a prefilled calculator. {weightPages.length} sizes
          across five product families.
        </p>

        {weightFamilies.map((fam) => {
          const pages = weightPages.filter((p) => p.family === fam.key);
          return (
            <section key={fam.key} className="mb-10">
              <div className="flex items-baseline justify-between flex-wrap gap-2 border-t border-ink pt-4 mb-3">
                <h2 className="text-lg font-extrabold tracking-[-0.01em]">{fam.label}</h2>
                <span className="font-mono text-[10.5px] tracking-[0.1em] text-muted-3">
                  {fam.intro.toUpperCase()} · {pages.length} SIZES
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                {pages.map((p) => (
                  <Link
                    key={p.slug}
                    href={`/weights/${p.slug}`}
                    className="border border-input-border bg-[#FFFFFF] px-3 py-2 no-underline hover:border-ink transition-colors"
                  >
                    <span className="font-mono text-[12.5px] font-semibold text-ink block">
                      {p.rows.find((r) => r.active)?.label ?? p.slug}
                    </span>
                    <span className="font-mono text-[10.5px] text-muted-3">{p.answerValue}</span>
                  </Link>
                ))}
              </div>
            </section>
          );
        })}

        <div className="border border-rule bg-[#FFFFFF] px-6 py-5 flex items-center justify-between gap-4 flex-wrap">
          <p className="text-[13.5px] text-muted-2 m-0">
            Need a size that isn&apos;t listed, a different grade, or pieces &amp; cost? The
            calculator covers every section type with nine grades and ten currencies.
          </p>
          <Link href="/calculator" className="btn-glow shrink-0 px-5 py-2.5 text-[13px] no-underline">
            Open the calculator →
          </Link>
        </div>
      </div>
    </>
  );
}
