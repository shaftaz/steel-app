import type { Metadata } from "next";
import Calculator from "@/components/Calculator";

/* Embeddable widget. Third-party sites iframe this route; the Header
   and Footer hide themselves on /embed. The attribution line below
   the tool is the backlink that makes the embed programme worthwhile. */

export const metadata: Metadata = {
  title: "Steel Weight Calculator Widget",
  description: "Embeddable SteelMath steel weight calculator.",
  robots: { index: false, follow: true },
};

type Shape = "round" | "square" | "hex" | "flat" | "pipe" | "shs" | "rhs" | "angle" | "plate";
const SHAPES: Shape[] = ["round", "square", "hex", "flat", "pipe", "shs", "rhs", "angle", "plate"];

export default async function EmbedPage({
  searchParams,
}: {
  searchParams: Promise<{ shape?: string; grade?: string }>;
}) {
  const sp = await searchParams;
  const shape: Shape = SHAPES.includes(sp.shape as Shape) ? (sp.shape as Shape) : "round";
  const grade = sp.grade && /^[A-Za-z0-9]{1,12}$/.test(sp.grade) ? sp.grade : shape === "plate" ? "MS" : "Fe500";

  return (
    <div className="relative z-10 max-w-[720px] mx-auto px-3 py-3">
      <Calculator initialShape={shape} initialGrade={grade} />
      <p className="font-mono text-[11px] tracking-[0.06em] text-muted-3 mt-2 mb-0 flex items-center justify-between gap-2 flex-wrap">
        <span>
          CALCULATOR BY{" "}
          <a
            href="https://steelmath.com/calculator?utm_source=embed&utm_medium=widget"
            target="_blank"
            rel="noopener"
            className="text-ink font-semibold no-underline hover:text-accent"
          >
            STEELMATH.COM
          </a>
        </span>
        <a
          href="https://steelmath.com/calculators?utm_source=embed&utm_medium=widget"
          target="_blank"
          rel="noopener"
          className="text-accent no-underline hover:text-ink"
        >
          21+ FREE STEEL TOOLS →
        </a>
      </p>
    </div>
  );
}
