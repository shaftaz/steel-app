import type { Metadata } from "next";
import Script from "next/script";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PriceTicker from "@/components/dashboard/PriceTicker";
import "./globals.css";

const BASE_URL = "https://steelmath.com";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default:
      "SteelMath — Free Steel Weight Calculator, Industry Analysis & Guides",
    template: "%s | SteelMath",
  },
  description:
    "Free online steel weight calculator for TMT bar, plate, pipe, angle, channel & beam. Expert analysis on Hormuz crisis, safeguard duty, CBAM, GST on steel & more. Built for steel professionals worldwide.",
  keywords: [
    "steel weight calculator",
    "steel weight calculator india",
    "tmt bar weight calculator",
    "tmt bar weight per metre",
    "ms pipe weight calculator",
    "steel plate weight calculator",
    "steel angle weight chart",
    "steel price today india",
    "steel price per kg india",
    "hrc price today",
    "tmt bar price today",
    "steel market analysis india",
    "hormuz crisis steel impact",
    "safeguard duty steel india",
    "CBAM indian steel",
    "steel production cost india",
    "gst on steel india",
    "mill price circular steel",
    "steel yield calculator",
    "steel density calculator",
    "rebar weight chart",
    "steel weight formula",
    "d square by 162",
    "Tata Steel EAF Ludhiana",
    "electric arc furnace India",
    "AMNS India Andhra Pradesh steel plant",
    "Gujarat steel mills gas shortage",
    "LNG shortage steel India 2026",
    "propane shortage coated steel India",
    "scrap based steel India",
    "greenfield steel plant India",
    "SSAB Mumbai service center",
    "Hardox wear plate India",
    "Strenx performance steel India",
    "nippon steel us steel acquisition",
    "global steel industry consolidation 2026",
    "RINL Vizag Steel Plant turnaround",
    "Visakhapatnam Steel Plant production 2026",
    "iron ore imports india FY26",
    "JSW Steel iron ore imports",
    "MSME steel gas crisis India 2026",
    "LPG shortage steel industry India",
    "mandi gobindgarh gas cut steel",
    "PNG supply steel India 2026",
    "secondary steel MSME crisis India",
    "EU one market strategy steel 2026",
    "EUROFER energy prices steel",
    "EU industrial policy steel CBAM",
    "Punjab specialty steel hub PPIS 2026",
    "Mandi Gobindgarh steel mills",
    "India steel hub map",
    "IREPAS long steel outlook 2026",
    "global long steel market crisis",
    "US steel tariffs Supreme Court 2026",
    "MOIL manganese ore price hike April 2026",
    "manganese ore price India 2026",
    "ferroalloy cost increase India",
    "silico manganese price India",
    "NMDC iron ore price hike April 2026",
    "NMDC iron ore price today",
    "iron ore price India 2026",
    "NMDC Baila Lump price",
    "BF-BOF iron ore cost India",
    "India steel demand growth",
    "India per capita steel consumption",
    "India vs China steel",
    "India steel capacity 300 MT",
    "India steel demand forecast",
    "India steel market 2026",
    "India steel production outlook",
    "Aatmanirbhar steel India",
    "India urbanisation steel demand",
    "500 MT steel capacity India 2047",
    "India steel pricing power 2030",
    "ArcelorMittal India greenfield",
    "coking coal import India",
    "specialty steel India PLI",
    "Mission Coking Coal India",
    "India steel value chain",
    "green steel India",
    "SteelWatch scorecard 2026",
    "green steel transition readiness",
    "steel decarbonisation 2026",
    "SSAB thyssenkrupp green steel",
    "Tata Steel JSW green transition",
    "steel coal phase out",
    "green hydrogen DRI steel",
    "net zero emissions steel",
    "India iron ore production 2026",
    "NMDC record production FY26",
    "Lloyds Metals Surjagarh mine",
    "iron ore grade India",
    "iron ore exports India decline",
    "Odisha iron ore mining",
    "iron ore pellet India",
    "India ductile iron pipe market 2026",
    "DI pipe manufacturers India",
    "Jal Jeevan Mission DI pipes",
    "Electrosteel Castings DI pipe",
    "Jindal Saw ductile iron",
    "EPC steel pipe India",
    "Tata Metaliks DI pipe",
    "Welspun Corp pipes",
    "Jal Jeevan Mission steel pipe demand",
    "JJM 2.0 steel demand",
    "water infrastructure steel india 2026",
    "DI pipe demand india 2026",
    "MS ERW pipe demand india",
    "jal jeevan mission extension 2028",
    "rural water supply steel demand",
    "pipe market india 2026",
    "india infrastructure steel demand 2030",
    "port expansion steel demand",
    "renewable energy steel consumption",
    "airport construction steel",
    "india capex plan steel consumption",
    "galvanised steel demand solar",
    "structural steel demand infrastructure",
    "telecom tower steel demand india",
    "5G tower steel requirement",
    "galvanised steel telecom tower",
    "tower fabrication steel",
    "digital infrastructure steel demand",
    "BSNL tower programme steel",
    "Iran steel capacity destroyed 2026",
    "Hormuz ceasefire steel market",
    "Jaisalmer limestone steel mills",
    "RSMM limestone steel supply 2026",
    "Gulf limestone imports stranded Hormuz",
    "limestone flux blast furnace India",
    "SAIL limestone UAE imports",
    "Stevin Rock limestone India",
    "domestic limestone steel India cost",
    "limestone price India 2026",
    "EGA Al Taweelah damage 2026",
    "aluminium shortage GCC 2026",
    "Iranian strikes UAE steel aluminium",
    "Gulf construction material crisis",
    "India steel export GCC opportunity",
    "Alba Bahrain shutdown",
    "aluminium supply disruption 2026",
    "GCC industrial infrastructure war",
  ],
  authors: [{ name: "Special Correspondent", url: BASE_URL }],
  creator: "MetalX",
  publisher: "SteelMath",
  formatDetection: { telephone: true, email: true },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: BASE_URL,
    siteName: "SteelMath",
    title:
      "SteelMath — Free Steel Weight Calculator & Industry Analysis",
    description:
      "Free steel weight calculator for TMT bar, pipe, plate, angle & beam. Expert industry analysis, weight charts & guides for steel professionals.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "SteelMath — Steel Calculator & Market Intelligence",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "SteelMath — Steel Weight Calculator & Industry Analysis",
    description:
      "Free steel weight calculator. Expert industry analysis and weight charts. Built for steel professionals.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: BASE_URL,
  },
  verification: {
    // Add Google Search Console verification when available
    // google: "verification-code",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const orgJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "SteelMath",
    url: BASE_URL,
    logo: `${BASE_URL}/logo.png`,
    description:
      "Free steel calculators, weight charts, and expert analysis for steel professionals.",
    sameAs: [],
  };

  const websiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "SteelMath",
    url: BASE_URL,
    description:
      "Steel weight calculator, industry analysis, and expert guides for steel professionals.",
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${BASE_URL}/articles?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <html lang="en">
      <head>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-V0FPXV02V5"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'G-V0FPXV02V5');`}
        </Script>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
      </head>
      <body className="antialiased relative">
        <Header />
        <PriceTicker />
        {children}
        <Footer />
      </body>
    </html>
  );
}
