import type { Metadata } from "next";
import Link from "next/link";
import Countdown from "@/components/cbam/Countdown";
import TwoDoor from "@/components/cbam/TwoDoor";
import CiteButton from "@/components/cbam/CiteButton";

export const metadata: Metadata = {
  title: "CBAM Compliance Hub — Deadlines, Prices, Country Playbooks | SteelMath",
  description:
    "The EU carbon border levy is live. Every CBAM deadline, certificate price and obligation for the steel trade — plain language, verified against the Official Journal, for exporters and EU importers.",
  alternates: { canonical: "https://steelmath.com/cbam" },
  openGraph: {
    images: [{ url: "/og?title=CBAM%20Compliance%20Hub%20%E2%80%94%20Deadlines%2C%20Prices%2C%20Country%20Playbooks&accent=blue", width: 1200, height: 630 }],
    title: "CBAM Compliance Hub — Deadlines, Prices, Country Playbooks | SteelMath",
    description:
      "Every CBAM deadline, certificate price and obligation for the steel trade — verified against the Official Journal.",
    url: "https://steelmath.com/cbam",
    type: "website",
  },
};

const EXPLAINER = [
  { n: "01", head: "Europe prices carbon at its border.", body: "Importers of iron & steel (plus cement, aluminium, fertilisers, hydrogen, electricity) pay for the CO₂ embedded in the goods — same price EU mills pay under the ETS." },
  { n: "02", head: "Only authorised declarants can import.", body: "Since 1 Jan 2026, CBAM goods above 50 t/year clear EU customs only for authorised CBAM declarants. No status, no entry." },
  { n: "03", head: "Emissions data flows from the mill.", body: "The producer measures emissions per tonne (verified by an accredited verifier); the importer declares them. No data → punitive default values." },
  { n: "04", head: "Money moves in 2027.", body: "Certificates (1 tCO₂e each, ETS-linked price) go on sale 1 Feb 2027. First declaration & surrender for 2026 imports: 30 Sep 2027." },
];

const PHASE_IN = [
  { year: "2026", v: 2.5 }, { year: "2027", v: 5 }, { year: "2028", v: 10 },
  { year: "2029", v: 22.5 }, { year: "2030", v: 48.5 }, { year: "2031", v: 61 },
  { year: "2032", v: 73.5 }, { year: "2033", v: 86 }, { year: "2034", v: 100 },
];

const PRICES = [
  { q: "Q1", note: "PUBLISHED 7 APR 2026", val: "€75.36", cls: "text-ink" },
  { q: "Q2", note: "PUBLISHED 6 JUL 2026 — LATEST", val: "€75.28", cls: "text-cbam" },
  { q: "Q3", note: "DUE 5 OCT 2026", val: "—", cls: "text-[#A0A6B4]" },
  { q: "Q4", note: "DUE 4 JAN 2027", val: "—", cls: "text-[#A0A6B4]" },
];

const COUNTRIES = [
  { name: "India", badge: "NO DEDUCTION YET", badgeColor: "#B4540A", carbon: "CCTS compliance market phasing in for steel; no effective carbon price paid yet → nothing to deduct today.", route: "BF-BOF heavy (~55%) + coal-DRI — high intensity; defaults punitive.", action: "Verified actual values + precursor data are your price weapon. Track CCTS for future deductions." },
  { name: "Turkey", badge: "ETS PILOT", badgeColor: "#2447C9", carbon: "TR-ETS pilot live (aligning to CBAM); free allocation heavy → effective price paid ≈ 0 for now.", route: "~70% EAF scrap — among the lowest embedded emissions of major exporters.", action: "Lead with verified actuals; your EAF route is a genuine CBAM cost advantage into the EU." },
  { name: "China", badge: "PARTIAL DEDUCTION", badgeColor: "#2447C9", carbon: "National ETS covers steel since 2024/25; price low (≈ €8–12) → small but real deduction.", route: "BF-BOF ~90% — high intensity; data sharing can face state constraints.", action: "Document ETS payments per installation; expect verifier scrutiny on data provenance." },
  { name: "Vietnam", badge: "DEFAULTS RISK", badgeColor: "#B4540A", carbon: "Pilot ETS scheduled (2025–28), no effective price yet → no deduction.", route: "New BF capacity + EAF mix; fast-growing HRC exporter to the EU.", action: "Move early on verified actuals — defaults set from worst emitters erase your margin." },
  { name: "South Korea", badge: "K-ETS DEDUCTION", badgeColor: "#2447C9", carbon: "K-ETS since 2015 (≈ €6–9 recent); generous free allocation cuts the deductible “price effectively paid”.", route: "BF-BOF majors + EAF; strong MRV culture — verification is straightforward.", action: "Compute deduction net of free allocation — claiming gross K-ETS price will fail review." },
  { name: "Japan", badge: "GX TRANSITION", badgeColor: "#5A6070", carbon: "GX-ETS turning mandatory FY2026; carbon levy from 2028 → deductions emerging, small at first.", route: "BF-BOF heavy; high-grade products with strong data systems.", action: "Prepare installation-level actuals now; deduction paperwork matures with GX pricing." },
  { name: "United Kingdom", badge: "LINKING PATH", badgeColor: "#2447C9", carbon: "UK ETS ≈ EU levels; UK–EU linkage agreed in principle — linked ETS would exempt UK goods from EU CBAM.", route: "EAF transition underway (Port Talbot, Scunthorpe plans).", action: "Track linkage timing; also prepare for the UK’s own CBAM on your imports from 1 Jan 2027." },
  { name: "EU (domestic)", badge: "REFERENCE", badgeColor: "#5A6070", carbon: "Full EU ETS price (~€75); free allocation phasing out 2026–34 in step with CBAM.", route: "All routes; benchmark for the “level playing field”.", action: "Buyers: your imported and domestic carbon costs now converge — compare total landed cost, not base price." },
];

const FINISHED = [
  { n: "01", text: "Exporters of finished goods: compute the steel/aluminium mass share per product now — the levy will follow the embedded metal." },
  { n: "02", text: "Importers: screen your catalogue against the proposed downstream CN list (Ch. 73 articles, mountings, cylinders, radiators, selected appliances)." },
  { n: "03", text: "Anti-circumvention is tightening in parallel — minimal processing outside the EU will not strip goods of CBAM exposure." },
  { n: "04", text: "Contracts signed today for 2028 delivery should already allocate who bears the CBAM cost. Put it in writing." },
];

const MILESTONES = [
  { date: "31 DEC 2025", label: "Transitional phase & quarterly reporting end", status: "DONE", done: true },
  { date: "1 JAN 2026", label: "Definitive regime live — declarant status required at the border", status: "DONE", done: true },
  { date: "6 JUL 2026", label: "Q2 2026 certificate price published — €75.28", status: "DONE", done: true },
  { date: "5 OCT 2026", label: "Q3 2026 certificate price publication", status: "NEXT", done: false },
  { date: "1 FEB 2027", label: "Certificate sales open on EU central platform", status: "AHEAD", done: false },
  { date: "30 SEP 2027", label: "First annual declaration & certificate surrender (2026 imports)", status: "AHEAD", done: false },
  { date: "1 JAN 2028", label: "Proposed: downstream finished-goods scope + tighter anti-circumvention", status: "AHEAD", done: false },
];

const FAQS = [
  { q: "I sell FOB to an EU trader. Is CBAM my problem?", a: "Legally the obligation sits with the EU importer of record. Commercially it is yours: buyers now compare offers on landed cost including CBAM, and they need your verified emissions data to avoid punitive defaults. Mills that supply clean data win the order." },
  { q: "What if I import less than 50 tonnes a year?", a: "You are exempt under the de minimis threshold (cumulative net mass of all CBAM goods, per importer, per year). Hydrogen and electricity are excluded from the exemption. Cross the line and full obligations apply — the Commission monitors for artificial splitting." },
  { q: "What actually happens if we just use default values?", a: "Defaults are set from the highest-emitting producers with a mark-up, so they nearly always overstate your real emissions — analyses of Q1 2026 showed default-based HRC costs up to 5× higher than verified actuals. They are a fallback, not a strategy." },
  { q: "Can we deduct the carbon price already paid at home?", a: "Yes — a carbon price effectively paid in the country of production (net of any rebates or free allocation) reduces certificates owed. From 2027 the Commission publishes default carbon-price references per country. Keep installation-level proof of payment." },
  { q: "When does money actually leave our account?", a: "Not before 1 February 2027. That is when certificate sales open, covering 2026 imports retroactively at each quarter’s published price. The first declaration and surrender fall due 30 September 2027; from 2027 you must also hold 50% of the year-to-date obligation at each quarter end." },
  { q: "Are finished steel products covered?", a: "Today only the listed iron & steel goods and precursors are in scope. The December 2025 proposal extends CBAM to steel- and aluminium-intensive downstream products from 1 January 2028 — fasteners, structures, mountings and selected appliances. If you trade finished goods, start mapping metal content now." },
];

const kicker = "font-mono text-[11px] tracking-[0.14em] text-cbam";

export default function CbamHubPage() {
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQS.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://steelmath.com" },
      { "@type": "ListItem", position: 2, name: "CBAM Hub", item: "https://steelmath.com/cbam" },
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

      {/* Breadcrumb */}
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 pt-3.5 font-mono text-[11px] tracking-[0.08em] text-muted-3">
        <Link href="/" className="text-muted-3 hover:text-ink no-underline transition-colors">HOME</Link>
        <span> / </span>
        <span className="text-ink">CBAM HUB</span>
      </div>

      {/* Hero */}
      <section className="max-w-[1320px] mx-auto px-4 sm:px-6 pt-6 pb-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-7 items-end">
          <div>
            <div className={`${kicker} mb-3`}>
              REGULATION (EU) 2023/956 · AMENDED (EU) 2025/2083 · LIVE SINCE 1 JAN 2026
            </div>
            <h1 className="text-[clamp(30px,4.5vw,44px)] leading-[1.05] font-extrabold tracking-[-0.02em] mb-4 [text-wrap:balance]">
              CBAM Compliance Hub
            </h1>
            <p className="text-[15.5px] leading-relaxed text-muted max-w-[560px]">
              Europe now charges for the carbon inside imported steel. This hub gives you every deadline, price and obligation — in plain language, verified against the Official Journal, for both sides of the border.
            </p>
            <div className="flex gap-2.5 mt-5 flex-wrap">
              <Link href="/cbam/calculator" className="btn-cbam text-sm px-5 py-3 no-underline">
                Estimate my liability →
              </Link>
              <a
                href="#countries"
                className="border border-input-border text-ink font-semibold text-sm px-5 py-3 no-underline hover:border-ink transition-colors"
              >
                Country playbooks
              </a>
            </div>
          </div>
          {/* Countdown + price instrument */}
          <div className="border border-ink bg-[#FFFFFF]">
            <div className="px-5 py-4 border-b border-[#E2E5EC]">
              <div className="flex justify-between items-baseline mb-3 gap-2 flex-wrap">
                <span className="font-mono text-[10.5px] tracking-[0.12em] text-[#7A8094]">
                  NEXT MILESTONE — CERTIFICATE SALES OPEN
                </span>
                <span className="font-mono text-[10.5px] tracking-[0.08em] text-cbam">1 FEB 2027</span>
              </div>
              <Countdown />
              <div className="font-mono text-[10px] tracking-[0.1em] text-[#A0A6B4] mt-1.5">
                DAYS · HRS · MIN · SEC
              </div>
            </div>
            <div className="px-5 py-3.5 flex justify-between items-baseline gap-2.5 flex-wrap">
              <span className="font-mono text-[10.5px] tracking-[0.1em] text-[#7A8094]">
                CERT PRICE Q2 2026
              </span>
              <span className="font-mono text-[22px] font-semibold text-ink">
                €75.28<span className="text-[11px] text-[#7A8094]"> /tCO₂e</span>
              </span>
              <span className="font-mono text-[10.5px] text-[#7A8094]">VERIFIED 6 JUL 2026</span>
            </div>
          </div>
        </div>
      </section>

      {/* CBAM in 60 seconds */}
      <section className="max-w-[1320px] mx-auto px-4 sm:px-6 pb-14">
        <div className="border-t border-ink pt-5">
          <div className={`${kicker} mb-4`}>CBAM IN 60 SECONDS</div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {EXPLAINER.map((e) => (
              <div key={e.n} className="border-l border-rule pl-4">
                <div className="font-mono text-xs text-cbam mb-2">{e.n}</div>
                <div className="text-[14.5px] leading-relaxed text-[#2A2D35]">
                  <b>{e.head}</b> {e.body}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Two-door */}
      <section id="doors" className="bg-cbam-bg border-t border-b border-cbam-rule">
        <div className="max-w-[1320px] mx-auto px-4 sm:px-6 py-12">
          <h2 className="text-[clamp(24px,3vw,30px)] font-extrabold tracking-[-0.02em] mb-1.5">
            Which side of the border are you on?
          </h2>
          <p className="text-sm text-[#5A6070] mb-6">
            Pick once — the hub remembers and tailors everything below.
          </p>
          <TwoDoor />
        </div>
      </section>

      {/* Money maths */}
      <section id="phase-in" className="max-w-[1320px] mx-auto px-4 sm:px-6 py-14">
        <div className="flex items-end justify-between gap-6 mb-6 flex-wrap">
          <div>
            <div className={`${kicker} mb-3`}>THE MONEY MATHS</div>
            <h2 className="text-[clamp(24px,3vw,30px)] font-extrabold tracking-[-0.02em]">
              Why 2026 feels cheap — and 2034 won&apos;t
            </h2>
          </div>
          <p className="text-[13.5px] text-muted-2 max-w-[380px]">
            You only pay for the share of emissions that EU mills no longer get free. That share climbs every year.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-7">
          {/* Phase-in table */}
          <div className="border border-rule bg-[#FFFFFF]">
            <div className="px-4.5 py-3.5 border-b border-[#E2E5EC] flex justify-between flex-wrap gap-1.5 items-center">
              <span className="font-mono text-[10.5px] tracking-[0.12em] text-[#7A8094]">
                CBAM FACTOR — SHARE OF EMISSIONS PAYABLE
              </span>
              <CiteButton anchor="#phase-in" label="CBAM factor phase-in schedule 2026–2034" />
            </div>
            <div className="px-4.5 pt-2 pb-3.5">
              {PHASE_IN.map((p) => (
                <div
                  key={p.year}
                  className="grid grid-cols-[52px_1fr_58px] gap-3 items-center py-[7px] border-b border-rule-faint"
                >
                  <span className="font-mono text-[12.5px] text-ink">{p.year}</span>
                  <span className="h-1.5 bg-cbam-bg relative block">
                    <span
                      className="absolute left-0 top-0 bottom-0 bg-cbam block"
                      style={{ width: `${p.v}%` }}
                    />
                  </span>
                  <span className="font-mono text-[12.5px] text-right text-cbam font-semibold">
                    {p.v}%
                  </span>
                </div>
              ))}
            </div>
            <div className="px-4.5 pb-3 font-mono text-[10.5px] text-[#7A8094]">ANNEX, REG. 2023/956</div>
          </div>
          {/* Worked example */}
          <div className="border border-rule bg-[#FFFFFF] flex flex-col">
            <div className="px-4.5 py-3.5 border-b border-[#E2E5EC] flex justify-between flex-wrap gap-1.5">
              <span className="font-mono text-[10.5px] tracking-[0.12em] text-[#7A8094]">
                WORKED EXAMPLE — ILLUSTRATIVE
              </span>
              <span className="font-mono text-[10.5px] text-[#7A8094]">
                10,000 t HRC · 2.6 tCO₂e/t · €75.28
              </span>
            </div>
            <div className="p-4.5 flex flex-col gap-3 flex-1">
              <div className="flex justify-between items-baseline border-b border-rule-faint pb-3">
                <span className="text-[13.5px] text-muted">Embedded emissions</span>
                <span className="font-mono text-[15px] font-semibold">26,000 tCO₂e</span>
              </div>
              <div className="flex justify-between items-baseline border-b border-rule-faint pb-3">
                <span className="text-[13.5px] text-muted">2026 · factor 2.5%</span>
                <span className="font-mono text-[15px] font-semibold text-cbam">
                  €48,932 <span className="text-[11.5px] text-[#7A8094]">≈ €4.9/t</span>
                </span>
              </div>
              <div className="flex justify-between items-baseline border-b border-rule-faint pb-3">
                <span className="text-[13.5px] text-muted">2030 · factor 48.5%</span>
                <span className="font-mono text-[15px] font-semibold text-cbam">
                  €949,281 <span className="text-[11.5px] text-[#7A8094]">≈ €95/t</span>
                </span>
              </div>
              <div className="flex justify-between items-baseline">
                <span className="text-[13.5px] text-muted">2034 · factor 100%</span>
                <span className="font-mono text-[15px] font-semibold text-cbam">
                  €1,957,280 <span className="text-[11.5px] text-[#7A8094]">≈ €196/t</span>
                </span>
              </div>
              <div className="mt-auto text-[13px] leading-relaxed text-muted-2 border-t border-dashed border-rule pt-3">
                Same cargo, 40× the levy by 2034 — at a flat carbon price. Cleaner routes and verified actual values are the only levers that shrink it.
              </div>
              <Link
                href="/cbam/calculator"
                className="btn-cbam text-[13.5px] py-3 text-center no-underline"
              >
                Run your own numbers →
              </Link>
            </div>
          </div>
          {/* Price schedule */}
          <div id="prices" className="border border-rule bg-[#FFFFFF] md:col-span-2 xl:col-span-1">
            <div className="px-4.5 py-3.5 border-b border-[#E2E5EC] flex justify-between items-center flex-wrap gap-1.5">
              <span className="font-mono text-[10.5px] tracking-[0.12em] text-[#7A8094]">
                CERTIFICATE PRICE — 2026 QUARTERLY
              </span>
              <CiteButton anchor="#prices" label="CBAM certificate price schedule 2026" />
            </div>
            <div className="px-4.5 pt-2 pb-1.5">
              {PRICES.map((p) => (
                <div
                  key={p.q}
                  className="grid grid-cols-[36px_1fr_auto] gap-3 items-baseline py-2.5 border-b border-rule-faint"
                >
                  <span className="font-mono text-[12.5px] text-ink">{p.q}</span>
                  <span className="font-mono text-[11px] text-[#7A8094]">{p.note}</span>
                  <span className={`font-mono text-sm font-semibold ${p.cls}`}>{p.val}</span>
                </div>
              ))}
            </div>
            <div className="px-4.5 py-3.5 text-[12.5px] leading-relaxed text-muted-2">
              2026 = quarterly average of EU ETS auctions, published the week after each quarter. Weekly prices from 2027. You buy certificates from <b>1 Feb 2027</b>, retroactively covering 2026 imports.
            </div>
          </div>
        </div>
      </section>

      {/* Country playbooks */}
      <section id="countries" className="max-w-[1320px] mx-auto px-4 sm:px-6 pb-14">
        <div className="flex items-end justify-between gap-6 mb-6 border-t border-ink pt-10 flex-wrap">
          <div>
            <div className={`${kicker} mb-3 flex items-center gap-3`}>
              <span>COUNTRY PLAYBOOKS</span>
              <CiteButton anchor="#countries" label="CBAM country playbooks" />
            </div>
            <h2 className="text-[clamp(24px,3vw,30px)] font-extrabold tracking-[-0.02em]">
              The same regulation lands differently in every country
            </h2>
          </div>
          <p className="text-[13.5px] text-muted-2 max-w-[360px]">
            Carbon price at home is deductible from CBAM. Production route drives default-value exposure. Know your position.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 border-t border-l border-rule">
          {COUNTRIES.map((c) => (
            <div
              key={c.name}
              className="border-r border-b border-rule bg-[#FFFFFF] px-5 py-5 flex flex-col gap-2.5"
            >
              <div className="flex justify-between items-baseline gap-2">
                <span className="text-[17px] font-extrabold tracking-[-0.01em]">{c.name}</span>
                <span
                  className="font-mono text-[10px] tracking-[0.08em] px-1.5 py-0.5 border"
                  style={{ color: c.badgeColor, borderColor: c.badgeColor }}
                >
                  {c.badge}
                </span>
              </div>
              <div className="grid grid-cols-[92px_1fr] gap-x-2.5 gap-y-1 text-[12.5px] leading-normal">
                <span className="font-mono text-[10px] tracking-[0.06em] text-muted-3 pt-0.5">CARBON PRICE</span>
                <span className="text-[#2A2D35]">{c.carbon}</span>
                <span className="font-mono text-[10px] tracking-[0.06em] text-muted-3 pt-0.5">ROUTE MIX</span>
                <span className="text-[#2A2D35]">{c.route}</span>
                <span className="font-mono text-[10px] tracking-[0.06em] text-muted-3 pt-0.5">DO THIS</span>
                <span className="text-[#2A2D35] font-semibold">{c.action}</span>
              </div>
            </div>
          ))}
        </div>
        <div className="font-mono text-[11px] text-muted-3 mt-3">
          INDICATIVE POSITIONS · LAST VERIFIED 18 JUL 2026 · CONFIRM DEDUCTIBILITY WITH YOUR NCA / ADVISER BEFORE FILING
        </div>
      </section>

      {/* Finished goods 2028 */}
      <section className="bg-ink text-paper">
        <div className="max-w-[1320px] mx-auto px-4 sm:px-6 py-13">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-9">
            <div>
              <div className="font-mono text-[11px] tracking-[0.14em] text-accent mb-3">
                FINISHED GOODS — THE 2028 EXTENSION
              </div>
              <h2 className="text-[clamp(24px,3vw,30px)] font-extrabold tracking-[-0.02em] mb-3.5 [text-wrap:balance]">
                Downstream products are next
              </h2>
              <p className="text-[14.5px] leading-[1.65] text-[#B9BABD]">
                The Commission&apos;s December 2025 proposal extends CBAM to steel- and aluminium-intensive downstream goods — fasteners, structures, mountings, cylinders, radiators and selected appliances — targeted from <b className="text-paper">1 January 2028</b>, alongside tighter anti-circumvention rules. If you trade finished goods, the clock started for you too.
              </p>
            </div>
            <div className="flex flex-col border-t border-ink-border">
              {FINISHED.map((f) => (
                <div
                  key={f.n}
                  className="grid grid-cols-[28px_1fr] gap-3 py-3 border-b border-ink-border items-baseline"
                >
                  <span className="font-mono text-xs text-accent">{f.n}</span>
                  <span className="text-[13.5px] leading-relaxed text-[#C9CACC]">{f.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Timeline + changelog */}
      <section id="timeline" className="max-w-[1320px] mx-auto px-4 sm:px-6 pt-14 pb-12">
        <div className={`${kicker} mb-4`}>FULL TIMELINE</div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7 border-t border-[#9AA3B8]">
          {MILESTONES.map((m) => (
            <div key={m.date} className="pt-4 pr-4 pb-3">
              <div className="flex items-center gap-2 mb-2">
                <span
                  className={`w-2 h-2 rounded-full inline-block ${
                    m.done
                      ? "bg-[#9AA3B8]"
                      : m.status === "NEXT"
                      ? "bg-cbam pulse-dot"
                      : "bg-transparent border border-cbam"
                  }`}
                />
                <span className="font-mono text-[10.5px] tracking-[0.08em] text-[#7A8094]">
                  {m.status}
                </span>
              </div>
              <div className="font-mono text-[12.5px] font-semibold text-ink mb-1">{m.date}</div>
              <div className="text-xs leading-snug text-[#5A6070]">{m.label}</div>
            </div>
          ))}
        </div>
        <div className="font-mono text-[11px] tracking-[0.04em] text-[#7A8094] mt-4 border-t border-rule pt-3.5 leading-[1.8]">
          CHANGELOG — 06 JUL 2026: Q2 price €75.28 published · 17 DEC 2025: implementing acts package + downstream proposal · 20 OCT 2025: Omnibus (EU) 2025/2083 in force — 50 t threshold, surrender → 30 SEP, sales → 1 FEB 2027
        </div>
      </section>

      {/* FAQ */}
      <section className="max-w-[1320px] mx-auto px-4 sm:px-6 pb-16">
        <div className={`${kicker} mb-4 border-t border-ink pt-10`}>PLAIN-LANGUAGE FAQ</div>
        <div className="max-w-[860px]">
          {FAQS.map((f) => (
            <details key={f.q} className="border-b border-rule group">
              <summary className="py-4 px-1 cursor-pointer flex justify-between items-baseline gap-4 list-none [&::-webkit-details-marker]:hidden">
                <span className="text-[15.5px] font-bold tracking-[-0.01em] text-ink">{f.q}</span>
                <span className="font-mono text-[13px] text-cbam group-open:hidden">▸</span>
                <span className="font-mono text-[13px] text-cbam hidden group-open:inline">▾</span>
              </summary>
              <div className="text-sm leading-[1.65] text-muted px-1 pb-4 max-w-[760px]">{f.a}</div>
            </details>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-[1320px] mx-auto px-4 sm:px-6 pb-16">
        <div className="border border-ink bg-[#FFFFFF] p-7 flex items-center justify-between gap-6 flex-wrap">
          <div>
            <h2 className="text-[21px] font-extrabold tracking-[-0.01em] mb-1.5">Put a number on it</h2>
            <p className="text-[13.5px] text-muted-2">
              The CBAM calculator models your exact cargo — route, country, actual vs default values, deductions, phase-in — in under a minute.
            </p>
          </div>
          <Link
            href="/cbam/calculator"
            className="shrink-0 btn-cbam text-sm px-6 py-3.5 no-underline"
          >
            Open CBAM Calculator →
          </Link>
        </div>
        <div className="font-mono text-[10.5px] text-muted-3 mt-6 flex justify-between flex-wrap gap-2">
          <span>© 2026 STEELMATH · ESTIMATES ONLY — NOT TAX OR LEGAL ADVICE</span>
          <span>CBAM Q2 €75.28 · SALES OPEN 1 FEB 2027 · SURRENDER 30 SEP 2027</span>
        </div>
      </section>
    </>
  );
}
