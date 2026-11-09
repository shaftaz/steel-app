import Link from "next/link";
import { weightPages } from "@/lib/data/weight-pages";

/* Size-by-size links from a calculator into its /weights family.
   Server component: the links are in the HTML, which is the point —
   the size pages earn impressions but need internal authority. */

function shortName(h1: string): string {
  const cut = h1.split(/ weight/i)[0];
  return cut.length > 0 && cut.length < 40 ? cut : h1.split(":")[0];
}

export default function WeightPagesIndex({
  family,
  heading,
}: {
  family: string;
  heading?: string;
}) {
  const pages = weightPages.filter((p) => p.family === family);
  if (pages.length === 0) return null;
  const label = heading ?? `${pages[0].familyLabel} — weight by size`;
  return (
    <section className="glass-panel p-5 sm:p-6 mb-8">
      <div className="flex items-baseline justify-between gap-3 flex-wrap mb-3">
        <h2 className="text-white font-bold text-lg sm:text-xl m-0">{label}</h2>
        <Link
          href="/weights"
          className="font-mono text-[11px] tracking-[0.08em] text-accent no-underline hover:text-ink"
        >
          ALL SIZE PAGES →
        </Link>
      </div>
      <p className="text-white/40 text-sm mb-4">
        One page per standard size, with the answer above the fold, the formula and the
        governing standard. {pages.length} sizes in this family.
      </p>
      <ul className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-0 list-none p-0 m-0">
        {pages.map((p) => (
          <li
            key={p.slug}
            className="border-b border-white/5 py-2 flex items-baseline justify-between gap-2"
          >
            <Link
              href={`/weights/${p.slug}`}
              className="text-white/75 text-[13px] no-underline hover:text-accent transition-colors"
            >
              {shortName(p.h1)}
            </Link>
            <span className="font-mono text-[11px] text-white/35 whitespace-nowrap">
              {p.answerValue}
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}
