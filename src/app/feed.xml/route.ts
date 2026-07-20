import { articlesByDate } from "@/lib/data/articles";

const BASE = "https://steelmath.com";

function esc(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export const dynamic = "force-static";

export async function GET() {
  const items = articlesByDate
    .slice(0, 30)
    .map(
      (a) => `    <item>
      <title>${esc(a.title)}</title>
      <link>${BASE}/articles/${a.slug}</link>
      <guid isPermaLink="true">${BASE}/articles/${a.slug}</guid>
      <pubDate>${new Date(a.lastUpdated || a.date).toUTCString()}</pubDate>
      <category>${esc(a.category)}</category>
      <description>${esc(a.excerpt)}</description>
    </item>`
    )
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>SteelMath — Insights &amp; Reports</title>
    <link>${BASE}/articles</link>
    <atom:link href="${BASE}/feed.xml" rel="self" type="application/rss+xml"/>
    <description>Steel market intelligence, price analysis, trade policy and weight-chart guides for steel professionals worldwide.</description>
    <language>en</language>
${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: { "Content-Type": "application/rss+xml; charset=utf-8" },
  });
}
