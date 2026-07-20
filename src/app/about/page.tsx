import type { Metadata } from "next";
import Link from "next/link";
import ReportDialog from "@/components/ReportDialog";

export const metadata: Metadata = {
  title: "About SteelMath: Methodology & Verification",
  description:
    "What SteelMath is, where its numbers come from, and how they are verified: formulas from IS/ASTM/JIS/EN/GB standards, CBAM figures checked against the Official Journal, and LAST VERIFIED dates on every data surface.",
  alternates: { canonical: "https://steelmath.com/about" },
  openGraph: {
    title: "About SteelMath: Methodology & Verification",
    description:
      "Where SteelMath's numbers come from and how they are verified.",
    url: "https://steelmath.com/about",
    type: "website",
    images: [
      {
        url: "/og?title=About%20SteelMath%20%E2%80%94%20Methodology%20%26%20Verification&accent=orange",
        width: 1200,
        height: 630,
      },
    ],
  },
};

const SECTIONS = [
  {
    kicker: "01 — WHAT STEELMATH IS",
    title: "Calculations and market intelligence for the steel trade",
    body: "SteelMath provides free steel weight calculators, size-by-size weight reference pages, a CBAM (EU/UK carbon border) compliance hub and calculator, and sourced market analysis. It is built for buyers, traders, fabricators, mill teams and site engineers across India, China, Southeast Asia, Japan, the Americas, Europe and Oceania. All tools are free, require no signup, and work offline once loaded.",
  },
  {
    kicker: "02 — WHERE THE NUMBERS COME FROM",
    title: "Standards first, always cited",
    body: "Weight formulas derive from published standards: IS 1786/2062/1239/4923/808 (India), ASTM A615/A36/A53/A500/A6 (US), JIS G3112/G3101/G3452/G3466/G3192 (Japan), EN 10025/10255/10219 (Europe), GB/T 1499/700 (China) and BS 4449/3737 (UK). The carbon-steel density basis is 7,850 kg/m³; the round-bar shortcut d²/162.2 is derived, not assumed. The derivation is shown in every calculator's 'Show the maths' panel. Rolled-section weights (ISMB/ISMC) are IS 808 tabulated values, not approximations.",
  },
  {
    kicker: "03 — CBAM FIGURES",
    title: "Verified against the Official Journal",
    body: "CBAM deadlines, thresholds and the free-allocation phase-in schedule are taken from Regulation (EU) 2023/956 as amended by (EU) 2025/2083, and UK CBAM figures from HM Treasury/HMRC policy publications. Quarterly certificate prices are updated when the European Commission publishes them (Q2 2026: €75.28/tCO₂e, published 6 Jul 2026). The hub carries a one-line changelog of every update. CBAM outputs are planning estimates, not tax or legal advice.",
  },
  {
    kicker: "04 — VERIFICATION DISCIPLINE",
    title: "Every data surface carries a LAST VERIFIED date",
    body: "Calculators, reference tables, country playbooks and market figures each state when they were last checked. Market analysis articles cite their sources inline and separate verified figures from directional judgment. Where a number cannot be verified, the article says so rather than inventing one. When regulations or prices change, the affected pages and their dates are updated together.",
  },
  {
    kicker: "05 — CITING STEELMATH",
    title: "How to reference this site",
    body: "Cite the specific page rather than the homepage. Every page has a stable canonical URL, and key reference blocks (CBAM phase-in table, certificate price schedule, country playbooks) have stable anchors with one-click citation buttons that include the retrieval date. Attribution as 'SteelMath (steelmath.com)' with the page URL and its LAST VERIFIED date is appreciated.",
  },
];

export default function AboutPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: "About SteelMath: Methodology & Verification",
    url: "https://steelmath.com/about",
    mainEntity: {
      "@type": "Organization",
      name: "SteelMath",
      url: "https://steelmath.com",
      logo: "https://steelmath.com/logo.png",
      description:
        "Free steel calculators, size-by-size weight references, CBAM compliance tools and sourced market analysis for steel professionals worldwide.",
      knowsAbout: [
        "steel weight calculation",
        "IS 1786 / IS 2062 / IS 808 standards",
        "ASTM, JIS, EN and GB steel grades",
        "EU and UK CBAM compliance",
        "steel market and trade-policy analysis",
      ],
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="max-w-[860px] mx-auto px-4 sm:px-6 py-6">
        <nav
          aria-label="Breadcrumb"
          className="font-mono text-[11px] tracking-[0.08em] text-muted-3 mb-5 uppercase"
        >
          <Link href="/" className="hover:text-ink no-underline transition-colors">Home</Link>
          <span> / </span>
          <span className="text-ink">About</span>
        </nav>

        <div className="font-mono text-[11px] tracking-[0.12em] text-accent mb-2.5">
          METHODOLOGY · VERIFICATION · ATTRIBUTION
        </div>
        <h1 className="text-[clamp(26px,4vw,38px)] leading-[1.08] font-extrabold tracking-[-0.02em] mb-8 [text-wrap:balance]">
          About SteelMath
        </h1>

        {SECTIONS.map((s) => (
          <section key={s.kicker} className="border-t border-ink pt-5 pb-8">
            <div className="font-mono text-[11px] tracking-[0.12em] text-accent mb-2">
              {s.kicker}
            </div>
            <h2 className="text-lg font-extrabold tracking-[-0.01em] mb-2.5">{s.title}</h2>
            <p className="text-sm leading-[1.7] text-muted">{s.body}</p>
          </section>
        ))}

        <div className="border border-rule bg-[#FFFFFF] px-6 py-5 flex items-center justify-between gap-4 flex-wrap">
          <p className="text-[13.5px] text-muted-2 m-0">
            Questions, corrections or data requests are welcome. We treat reported errors as
            priority fixes.
          </p>
          <div className="flex gap-3 flex-wrap">
            <ReportDialog />
            <Link
              href="/calculator"
              className="border border-input-border text-ink font-semibold px-5 py-2.5 text-[13px] no-underline shrink-0 hover:border-ink transition-colors"
            >
              Open the calculator →
            </Link>
          </div>
        </div>

        <p className="font-mono text-[10.5px] text-muted-3 mt-6">
          © 2026 STEELMATH · DEVELOPED BY METALX · FIGURES CARRY LAST VERIFIED DATES · CBAM OUTPUTS ARE ESTIMATES, NOT TAX OR LEGAL ADVICE
        </p>
      </div>
    </>
  );
}
