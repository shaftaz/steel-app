import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "SteelMath — Steel Weight Calculator & CBAM Hub",
    short_name: "SteelMath",
    description:
      "Free steel weight calculators, CBAM compliance hub and industry analysis for steel professionals. Works offline.",
    start_url: "/calculator",
    display: "standalone",
    background_color: "#F6F5F2",
    theme_color: "#17181A",
    icons: [
      {
        src: "/icon.svg",
        sizes: "any",
        type: "image/svg+xml",
        purpose: "any",
      },
    ],
  };
}
