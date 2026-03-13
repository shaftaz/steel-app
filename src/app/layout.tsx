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
      "SteelMath — Free Steel Weight Calculator, Market Prices & Industry Analysis for India",
    template: "%s | SteelMath",
  },
  description:
    "Free online steel weight calculator for TMT bar, plate, pipe, angle, channel & beam. Live Indian steel prices city-wise in ₹/MT. Expert analysis on Hormuz crisis, safeguard duty, CBAM & more. Built for Indian steel professionals.",
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
  ],
  authors: [{ name: "SteelMath", url: BASE_URL }],
  creator: "MetalX",
  publisher: "SteelMath",
  formatDetection: { telephone: true, email: true },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: BASE_URL,
    siteName: "SteelMath",
    title:
      "SteelMath — Free Steel Weight Calculator & Market Prices India",
    description:
      "Free steel weight calculator for TMT bar, pipe, plate, angle & beam. Live Indian steel prices in ₹/MT. Industry analysis for steel professionals.",
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
    title: "SteelMath — Steel Weight Calculator & Market Prices India",
    description:
      "Free steel weight calculator. Live Indian steel prices. Expert market analysis. Built for steel professionals.",
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
      "Free steel calculators, live market prices, and expert analysis for Indian steel professionals.",
    sameAs: [],
  };

  const websiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "SteelMath",
    url: BASE_URL,
    description:
      "Steel weight calculator, market prices, and industry analysis for Indian steel professionals.",
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
