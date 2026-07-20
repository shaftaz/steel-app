import type { MetadataRoute } from "next";
import { weightPages } from "@/lib/data/weight-pages";
import { articles } from "@/lib/data/articles";

const BASE_URL = "https://steelmath.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const articleEntries = articles.map((article) => ({
    url: `${BASE_URL}/articles/${article.slug}`,
    lastModified: new Date(article.date),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  const TOOLS_VERIFIED = new Date("2026-07-18");
  const CBAM_VERIFIED = new Date("2026-07-19");

  return [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/cbam`,
      lastModified: CBAM_VERIFIED,
      changeFrequency: "weekly",
      priority: 0.95,
    },
    {
      url: `${BASE_URL}/cbam/calculator`,
      lastModified: CBAM_VERIFIED,
      changeFrequency: "weekly",
      priority: 0.95,
    },
    {
      url: `${BASE_URL}/weights`,
      lastModified: TOOLS_VERIFIED,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    ...weightPages.map((w) => ({
      url: `${BASE_URL}/weights/${w.slug}`,
      lastModified: TOOLS_VERIFIED,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    {
      url: `${BASE_URL}/calculator`,
      lastModified: TOOLS_VERIFIED,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/calculators`,
      lastModified: TOOLS_VERIFIED,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/calculators/tmt`,
      lastModified: TOOLS_VERIFIED,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/calculators/steel-plate`,
      lastModified: TOOLS_VERIFIED,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/calculators/metal-weight`,
      lastModified: TOOLS_VERIFIED,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/calculators/gauge-to-mm`,
      lastModified: TOOLS_VERIFIED,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/calculators/hardness-conversion`,
      lastModified: TOOLS_VERIFIED,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/calculators/credit-cost`,
      lastModified: TOOLS_VERIFIED,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/calculators/rebar`,
      lastModified: TOOLS_VERIFIED,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/calculators/pipe-weight`,
      lastModified: TOOLS_VERIFIED,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/calculators/angle-weight`,
      lastModified: TOOLS_VERIFIED,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/calculators/beam-weight`,
      lastModified: TOOLS_VERIFIED,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/calculators/channel-weight`,
      lastModified: TOOLS_VERIFIED,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/calculators/flat-bar-weight`,
      lastModified: TOOLS_VERIFIED,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/calculators/square-tube-weight`,
      lastModified: TOOLS_VERIFIED,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/calculators/rect-tube-weight`,
      lastModified: TOOLS_VERIFIED,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/calculators/round-bar-weight`,
      lastModified: TOOLS_VERIFIED,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/calculators/stainless-steel-weight`,
      lastModified: TOOLS_VERIFIED,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/calculators/chequered-plate-weight`,
      lastModified: TOOLS_VERIFIED,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/calculators/scrap-yield`,
      lastModified: TOOLS_VERIFIED,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/calculators/scrap-production-cost`,
      lastModified: TOOLS_VERIFIED,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/articles`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.8,
    },
    ...articleEntries,
  ];
}
