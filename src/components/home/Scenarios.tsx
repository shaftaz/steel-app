import Link from "next/link";

/* Real jobs, precomputed — each row opens the tool prefilled with
   these exact inputs (shareable URL state), so the number on the
   right is the number the user lands on. */
const SCENARIOS = [
  {
    kicker: "SITE ORDER",
    job: "100 bars of 12 mm Fe500 rebar × 12 m",
    result: "1.065 t",
    sub: "0.888 kg/m · ₹66k @ ₹62/kg",
    href: "/calculator?shape=round&grade=Fe500&d=12&l=12&pcs=100",
  },
  {
    kicker: "FABRICATION LOT",
    job: "50 MS sheets · 2.5 × 1.25 m × 10 mm",
    result: "12.27 t",
    sub: "78.5 kg/m² · 245.3 kg per sheet",
    href: "/calculator?shape=plate&grade=MS&pl=2.5&pw=1.25&pt=10&pcs=50",
  },
  {
    kicker: "PIPE CARGO",
    job: "100 lengths of 50 NB (2\") MS pipe × 6 m",
    result: "3.02 t",
    sub: "5.03 kg/m · IS 1239 medium",
    href: "/calculators/pipe-weight",
  },
  {
    kicker: "EU EXPORT",
    job: "10,000 t HRC ex India · CBAM 2026",
    result: "≈ €60.6k",
    sub: "defaults 3.22 tCO₂e/t · factor 2.5%",
    href: "/cbam/calculator?regime=eu&commodity=steel&variant=hrc&origin=IN&qty=10000&year=2026&basis=default",
  },
  {
    kicker: "SPEC CHECK",
    job: "18 SWG sheet — how thick is that?",
    result: "1.219 mm",
    sub: "IS 1956 / BS 3737 · US AWG differs",
    href: "/calculators/gauge-to-mm",
  },
];

export default function Scenarios() {
  return (
    <div className="bg-ink text-paper flex flex-col">
      <div className="flex justify-between items-baseline px-5 pt-4.5 pb-3 border-b border-ink-border">
        <span className="text-[17px] font-bold">Real jobs, one tap</span>
        <span className="font-mono text-[10.5px] tracking-[0.08em] text-accent">
          OPENS PREFILLED — ADJUST &amp; SHARE
        </span>
      </div>
      <div className="flex flex-col flex-1">
        {SCENARIOS.map((s) => (
          <Link
            key={s.kicker}
            href={s.href}
            className="grid grid-cols-[minmax(0,1fr)_auto] gap-x-4 gap-y-0.5 items-baseline px-5 py-3 border-b border-ink-border text-paper no-underline hover:bg-panel-dark transition-colors group"
          >
            <span className="font-mono text-[10px] tracking-[0.1em] text-[#7E8085]">
              {s.kicker}
            </span>
            <span className="font-mono text-[15px] font-semibold text-accent text-right row-span-2 self-center group-hover:text-paper transition-colors">
              {s.result} →
            </span>
            <span className="text-[13.5px] font-semibold leading-snug">{s.job}</span>
            <span className="font-mono text-[10.5px] text-[#7E8085] col-start-1">{s.sub}</span>
          </Link>
        ))}
      </div>
      <div className="px-5 py-3 font-mono text-[10.5px] tracking-[0.08em] text-[#7E8085]">
        EVERY RESULT IS A LINK — SEND IT TO A BUYER, MILL OR SITE ENGINEER
      </div>
    </div>
  );
}
