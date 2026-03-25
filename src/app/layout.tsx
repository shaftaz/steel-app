import type { Metadata } from "next";
import Script from "next/script";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "./globals.css";

const BASE_URL = "https://steelmath.com";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default:
      "SteelMath — Free Steel Weight Calculator, Industry Analysis & Guides for India",
    template: "%s | SteelMath",
  },
  description:
    "Free online steel weight calculator for TMT bar, plate, pipe, angle, channel & beam. Expert analysis on Hormuz crisis, safeguard duty, CBAM, GST on steel & more. Built for Indian steel professionals.",
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
  ],
  authors: [{ name: "Special Correspondent", url: BASE_URL }],
  creator: "MetalX",
  publisher: "SteelMath",
  formatDetection: { telephone: true, email: true },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: BASE_URL,
    siteName: "SteelMath",
    title:
      "SteelMath — Free Steel Weight Calculator & Industry Analysis India",
    description:
      "Free steel weight calculator for TMT bar, pipe, plate, angle & beam. Expert industry analysis, weight charts & guides for steel professionals.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "SteelMath — Steel Calculator & Market Intelligence for India",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "SteelMath — Steel Weight Calculator & Industry Analysis India",
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
      "Free steel calculators, weight charts, and expert analysis for Indian steel professionals.",
    sameAs: [],
  };

  const websiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "SteelMath",
    url: BASE_URL,
    description:
      "Steel weight calculator, industry analysis, and expert guides for Indian steel professionals.",
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
        {children}
        <Footer />
      </body>
    </html>
  );
}
