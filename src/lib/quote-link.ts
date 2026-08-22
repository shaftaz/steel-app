/* ============================================================
   Verify-link codec: serialize a quote into a URL fragment so
   /q/[id] can re-render it with no backend and no signup.
   Payload format: "<flag>.<base64url>" where flag 1 = gzip
   (CompressionStream) and 0 = plain UTF-8 JSON. Decoding is
   fully defensive — a corrupt link renders a friendly fallback,
   never an error page. The logo is deliberately excluded
   (data URLs don't belong in URLs).
   ============================================================ */

import type { QuoteItem, QuoteMeta, RateBasis } from "@/lib/quote";

export interface VerifyPayload {
  meta: Pick<
    QuoteMeta,
    "seller" | "sellerDetail" | "buyer" | "quoteNo" | "date" | "validity" | "terms"
  >;
  items: Pick<
    QuoteItem,
    "desc" | "detail" | "pieces" | "unitKg" | "totalKg" | "rate" | "rateBasis"
  >[];
}

/* base64url over raw bytes */
function bytesToB64url(bytes: Uint8Array): string {
  let bin = "";
  const CHUNK = 0x8000;
  for (let i = 0; i < bytes.length; i += CHUNK) {
    bin += String.fromCharCode(...bytes.subarray(i, i + CHUNK));
  }
  return btoa(bin).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function b64urlToBytes(s: string): Uint8Array {
  const b64 = s.replace(/-/g, "+").replace(/_/g, "/");
  const pad = b64.length % 4 === 0 ? "" : "=".repeat(4 - (b64.length % 4));
  const bin = atob(b64 + pad);
  const bytes = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
  return bytes;
}

async function gzip(bytes: Uint8Array): Promise<Uint8Array | null> {
  try {
    if (typeof CompressionStream === "undefined") return null;
    const stream = new Blob([bytes as BlobPart])
      .stream()
      .pipeThrough(new CompressionStream("gzip"));
    return new Uint8Array(await new Response(stream).arrayBuffer());
  } catch {
    return null;
  }
}

async function gunzip(bytes: Uint8Array): Promise<Uint8Array | null> {
  try {
    if (typeof DecompressionStream === "undefined") return null;
    const stream = new Blob([bytes as BlobPart])
      .stream()
      .pipeThrough(new DecompressionStream("gzip"));
    return new Uint8Array(await new Response(stream).arrayBuffer());
  } catch {
    return null;
  }
}

export async function encodeQuotePayload(
  meta: QuoteMeta,
  items: QuoteItem[]
): Promise<string> {
  // Compact wire shape: versioned, arrays for items.
  const wire = {
    v: 1,
    m: [meta.seller, meta.sellerDetail, meta.buyer, meta.quoteNo, meta.date, meta.validity, meta.terms],
    i: items.map((it) => [
      it.desc,
      it.detail || "",
      it.pieces,
      Math.round(it.unitKg * 1000) / 1000,
      Math.round(it.totalKg * 1000) / 1000,
      it.rate,
      it.rateBasis,
    ]),
  };
  const raw = new TextEncoder().encode(JSON.stringify(wire));
  const zipped = await gzip(raw);
  if (zipped && zipped.length < raw.length) return "1." + bytesToB64url(zipped);
  return "0." + bytesToB64url(raw);
}

function num(v: unknown): number {
  return typeof v === "number" && isFinite(v) && v >= 0 ? v : 0;
}

export async function decodeQuotePayload(payload: string): Promise<VerifyPayload | null> {
  try {
    const dot = payload.indexOf(".");
    if (dot !== 1) return null;
    const flag = payload.slice(0, 1);
    let bytes = b64urlToBytes(payload.slice(2));
    if (flag === "1") {
      const un = await gunzip(bytes);
      if (!un) return null;
      bytes = un;
    } else if (flag !== "0") {
      return null;
    }
    const wire = JSON.parse(new TextDecoder().decode(bytes));
    if (!wire || wire.v !== 1 || !Array.isArray(wire.m) || !Array.isArray(wire.i)) return null;
    const m = wire.m.map((x: unknown) => (typeof x === "string" ? x : ""));
    const items = (wire.i as unknown[][])
      .filter((r) => Array.isArray(r) && typeof r[0] === "string")
      .slice(0, 60)
      .map((r) => ({
        desc: String(r[0]).slice(0, 200),
        detail: r[1] ? String(r[1]).slice(0, 200) : undefined,
        pieces: Math.max(1, Math.round(num(r[2])) || 1),
        unitKg: num(r[3]),
        totalKg: num(r[4]),
        rate: num(r[5]),
        rateBasis: (r[6] === "t" || r[6] === "pc" ? r[6] : "kg") as RateBasis,
      }));
    if (items.length === 0) return null;
    return {
      meta: {
        seller: m[0].slice(0, 120),
        sellerDetail: m[1].slice(0, 300),
        buyer: m[2].slice(0, 120),
        quoteNo: m[3].slice(0, 40),
        date: m[4].slice(0, 20),
        validity: m[5].slice(0, 40),
        terms: m[6].slice(0, 1200),
      },
      items,
    };
  } catch {
    return null;
  }
}

export async function buildVerifyUrl(meta: QuoteMeta, items: QuoteItem[]): Promise<string> {
  const payload = await encodeQuotePayload(meta, items);
  const id = encodeURIComponent(meta.quoteNo || "quote");
  return `https://steelmath.com/q/${id}#d=${payload}`;
}
