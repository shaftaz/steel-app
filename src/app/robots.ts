import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/og"],
      },
      // Explicitly welcome AI / answer-engine crawlers (search assistants
      // and their user-triggered fetchers). Maximum answer-engine visibility
      // is intentional; /og stays open to them (harmless image endpoint).
      {
        userAgent: [
          "GPTBot",
          "OAI-SearchBot",
          "ChatGPT-User",
          "ClaudeBot",
          "Claude-User",
          "Claude-SearchBot",
          "PerplexityBot",
          "Perplexity-User",
          "Google-Extended",
          "Bingbot",
          "Applebot",
          "Applebot-Extended",
          "meta-externalagent",
          "CCBot",
          "Amazonbot",
          "DuckAssistBot",
        ],
        allow: "/",
      },
    ],
    sitemap: "https://steelmath.com/sitemap.xml",
  };
}
