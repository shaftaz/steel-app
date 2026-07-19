"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type Door = "export" | "import";

const DOORS: Record<
  Door,
  {
    heading: string;
    steps: string[];
    links: { label: string; href: string }[];
    note: string;
  }
> = {
  export: {
    heading: "YOUR NEXT 6 STEPS — NON-EU MILL / TRADER SELLING INTO THE EU",
    steps: [
      "Confirm your CN codes are covered (iron & steel Ch. 72–73, incl. precursors like pig iron, DRI, ferro-alloys, pre-consumer scrap).",
      "Set up installation-level emissions monitoring — direct + precursor emissions, EU methodology.",
      "Book an accredited verifier: actual values require on-site verification in 2026.",
      "Issue verified data to your EU buyers in the Commission template — defaults can cost them 5× more, and that cost lands in your price negotiation.",
      "Log any carbon price paid at home — your buyers deduct it from certificates owed.",
      "Selling finished goods (fasteners, structures, assemblies)? Map exposure now — downstream scope lands 1 Jan 2028.",
    ],
    links: [
      { label: "CBAM Cost Estimator", href: "/cbam/calculator" },
      { label: "Country Playbooks", href: "#countries" },
      { label: "CBAM & Indian Steel Exports Guide", href: "/articles/cbam-indian-steel-exports-2026" },
      { label: "Full Timeline & Deadlines", href: "#timeline" },
    ],
    note: "THE OBLIGATION SITS WITH YOUR EU BUYER — BUT THE DATA, AND THE COMPETITIVENESS, SIT WITH YOU.",
  },
  import: {
    heading: "YOUR NEXT 6 STEPS — EU IMPORTER / DECLARANT",
    steps: [
      "Check the de minimis: ≤ 50 t of CBAM goods per year exempts you entirely (not hydrogen/electricity).",
      "Hold authorised CBAM declarant status — unauthorised imports are refused at the border in real time.",
      "Collect verified emissions data from every supplier; chase precursors, not just final goods.",
      "Budget certificates at the quarterly reference price (Q2 2026: €75.28/tCO₂e) × the 2.5% CBAM factor for 2026.",
      "Diary the money dates: sales open 1 Feb 2027 · declaration & surrender 30 Sep 2027 · 50% quarter-end holding from 2027.",
      "Importing downstream steel goods? The 2028 extension will pull fasteners, structures & appliances into scope — screen your catalogue.",
    ],
    links: [
      { label: "CBAM Liability Calculator", href: "/cbam/calculator" },
      { label: "50 t Threshold Check — Run Your Tonnage", href: "/cbam/calculator" },
      { label: "Country Playbooks", href: "#countries" },
      { label: "Certificate Price Schedule", href: "#prices" },
    ],
    note: "DE MINIMIS — ≤ 50 T / YR EXEMPT · DEFAULT VALUES ARE SET FROM THE WORST EMITTERS: VERIFIED ACTUALS ALMOST ALWAYS WIN.",
  },
};

export default function TwoDoor() {
  const [door, setDoor] = useState<Door>("export");

  useEffect(() => {
    try {
      const d = localStorage.getItem("sm_cbam_door");
      if (d === "export" || d === "import") setDoor(d);
    } catch {}
  }, []);

  const pick = (d: Door) => {
    setDoor(d);
    try {
      localStorage.setItem("sm_cbam_door", d);
    } catch {}
  };

  const D = DOORS[door];

  return (
    <div className="bg-[#FFFFFF] border border-cbam-rule">
      <div className="grid grid-cols-1 sm:grid-cols-2">
        <button
          onClick={() => pick("export")}
          aria-pressed={door === "export"}
          className={`py-4.5 px-3.5 cursor-pointer text-center text-base font-bold tracking-[-0.01em] ${
            door === "export" ? "bg-cbam text-[#FFFFFF]" : "bg-transparent text-ink"
          }`}
        >
          I export to Europe
          <span className="block font-mono text-[10.5px] tracking-[0.1em] mt-1 opacity-75 font-normal">
            MILLS &amp; TRADERS — IN / TR / VN / CN / KR
          </span>
        </button>
        <button
          onClick={() => pick("import")}
          aria-pressed={door === "import"}
          className={`py-4.5 px-3.5 cursor-pointer text-center text-base font-bold tracking-[-0.01em] ${
            door === "import" ? "bg-cbam text-[#FFFFFF]" : "bg-transparent text-ink"
          }`}
        >
          I import into Europe
          <span className="block font-mono text-[10.5px] tracking-[0.1em] mt-1 opacity-75 font-normal">
            EU BUYERS &amp; DECLARANTS
          </span>
        </button>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-7 p-6 border-t border-[#E2E5EC]">
        <div>
          <div className="font-mono text-[10.5px] tracking-[0.12em] text-[#7A8094] mb-3">
            {D.heading}
          </div>
          <div className="flex flex-col">
            {D.steps.map((text, i) => (
              <div
                key={i}
                className="grid grid-cols-[28px_1fr] gap-2.5 py-2.5 border-b border-[#E2E5EC] items-baseline"
              >
                <span className="font-mono text-xs text-cbam">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="text-[13.5px] leading-relaxed text-[#2A2D35]">{text}</span>
              </div>
            ))}
          </div>
        </div>
        <div>
          <div className="font-mono text-[10.5px] tracking-[0.12em] text-[#7A8094] mb-3">
            START HERE
          </div>
          <div className="flex flex-col gap-2.5">
            {D.links.map((l) =>
              l.href.startsWith("#") ? (
                <a
                  key={l.label}
                  href={l.href}
                  className="flex justify-between items-baseline border border-cbam-rule px-3.5 py-3 text-[13.5px] font-semibold text-ink no-underline hover:border-cbam hover:text-cbam transition-colors"
                >
                  <span>{l.label}</span>
                  <span className="font-mono text-[11px]">→</span>
                </a>
              ) : (
                <Link
                  key={l.label}
                  href={l.href}
                  className="flex justify-between items-baseline border border-cbam-rule px-3.5 py-3 text-[13.5px] font-semibold text-ink no-underline hover:border-cbam hover:text-cbam transition-colors"
                >
                  <span>{l.label}</span>
                  <span className="font-mono text-[11px]">→</span>
                </Link>
              )
            )}
          </div>
          <div className="font-mono text-[11px] leading-[1.7] text-[#7A8094] mt-3.5">{D.note}</div>
        </div>
      </div>
    </div>
  );
}
