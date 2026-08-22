import type { Metadata } from "next";
import Link from "next/link";
import QuoteVerify from "@/components/quote/QuoteVerify";

export const metadata: Metadata = {
  title: "Check These Weights on SteelMath",
  description:
    "A verified steel weight sheet shared from the SteelMath Quote Builder. Weights computed per IS/ASTM/JIS/EN/GB standard densities — recalculate any line free, no signup.",
  robots: { index: false, follow: true },
};

export default async function VerifyQuotePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <section className="max-w-[860px] mx-auto px-4 sm:px-6 pt-3.5 pb-16">
      <div className="font-mono text-[11px] tracking-[0.08em] text-muted-3 mb-4.5">
        <Link href="/" className="text-muted-3 hover:text-ink no-underline transition-colors">
          HOME
        </Link>
        <span> / </span>
        <Link href="/quote" className="text-muted-3 hover:text-ink no-underline transition-colors">
          QUOTE BUILDER
        </Link>
        <span> / </span>
        <span className="text-ink">{decodeURIComponent(id).toUpperCase().slice(0, 40)}</span>
      </div>

      <div className="mb-5">
        <div className="font-mono text-[11px] tracking-[0.12em] text-accent mb-2.5">
          CHECK THESE WEIGHTS ON STEELMATH
        </div>
        <h1 className="text-[clamp(24px,4vw,34px)] leading-[1.08] font-extrabold tracking-[-0.02em]">
          Verified steel weights
        </h1>
      </div>

      <QuoteVerify />

      <div className="font-mono text-[10.5px] text-muted-3 mt-6 flex justify-between flex-wrap gap-2">
        <span>© 2026 STEELMATH · WEIGHTS ARE CALCULATED ESTIMATES — NOT A TAX INVOICE</span>
        <Link href="/calculators" className="text-muted no-underline hover:text-ink transition-colors">
          ALL CALCULATORS →
        </Link>
      </div>
    </section>
  );
}
