"use client";

/* ============================================================
   Quote builder store — localStorage-backed list of calculator
   results that /quote assembles into a dispatch-ready quotation
   and loading sheet. Every read is defensively parsed so a
   corrupt or legacy payload can never break a page.
   ============================================================ */

import { useEffect, useState } from "react";

export type RateBasis = "kg" | "t" | "pc";

export interface QuoteItem {
  id: string;
  /** Tool name the item came from, e.g. "MS Pipe Weight Calculator" */
  tool: string;
  /** Path for the "recalculate" backlink, e.g. "/calculators/pipe-weight" */
  path: string;
  /** Line description, e.g. "12mm Fe500 TMT × 12 m" */
  desc: string;
  /** Optional spec detail, e.g. "IS 1786 · d²/162.2" */
  detail?: string;
  pieces: number;
  /** Weight of one piece in kg (0 when not meaningful) */
  unitKg: number;
  totalKg: number;
  rate: number;
  rateBasis: RateBasis;
  addedAt: number;
}

export interface QuoteMeta {
  seller: string;
  sellerDetail: string;
  /** Seller logo as a data URL (raster, ≤512px long edge), "" when unset */
  logo: string;
  buyer: string;
  buyerDetail: string;
  quoteNo: string;
  date: string;
  validity: string;
  terms: string;
  notes: string;
  /** ISO-ish country key from COUNTRY_PRESETS ("" = not chosen yet) */
  country: string;
  /** "landed" (delivered, charges included) | "ex" (ex-works, freight extra) */
  basis: string;
  /** Place the basis refers to, e.g. "Delhi" → "LANDED DELHI" / "EX-WORKS MUMBAI" */
  basisPlace: string;
  /** Tax name shown on the document, e.g. GST / VAT / SALES TAX */
  taxLabel: string;
  /** Tax percentage as a string, e.g. "18" */
  taxRate: string;
  /** Freight amount (quote currency) as a string */
  freight: string;
  /** Loading / other charges amount as a string */
  otherCharges: string;
}

/* ============================================================
   Country presets — currency, tax name and default rate, so a
   country pick (or first-visit locale detection) prefills the
   commercial fields. Rates are editable defaults, not advice.
   ============================================================ */
export interface CountryPreset {
  key: string;
  label: string;
  currency: string;
  taxLabel: string;
  taxRate: string;
  note?: string;
}

export const COUNTRY_PRESETS: CountryPreset[] = [
  { key: "IN", label: "India", currency: "₹", taxLabel: "GST", taxRate: "18" },
  { key: "AE", label: "UAE", currency: "AED", taxLabel: "VAT", taxRate: "5" },
  { key: "SA", label: "Saudi Arabia", currency: "SAR", taxLabel: "VAT", taxRate: "15" },
  { key: "SG", label: "Singapore", currency: "S$", taxLabel: "GST", taxRate: "9" },
  { key: "GB", label: "United Kingdom", currency: "£", taxLabel: "VAT", taxRate: "20" },
  { key: "EU", label: "EU (Eurozone)", currency: "€", taxLabel: "VAT", taxRate: "20", note: "varies by member state" },
  { key: "US", label: "United States", currency: "$", taxLabel: "SALES TAX", taxRate: "0", note: "varies by state" },
  { key: "JP", label: "Japan", currency: "¥", taxLabel: "CONSUMPTION TAX", taxRate: "10" },
  { key: "CN", label: "China", currency: "CN¥", taxLabel: "VAT", taxRate: "13" },
  { key: "KR", label: "South Korea", currency: "₩", taxLabel: "VAT", taxRate: "10" },
  { key: "TR", label: "Türkiye", currency: "₺", taxLabel: "KDV (VAT)", taxRate: "20" },
  { key: "VN", label: "Vietnam", currency: "₫", taxLabel: "VAT", taxRate: "10" },
  { key: "ID", label: "Indonesia", currency: "Rp", taxLabel: "PPN (VAT)", taxRate: "11" },
  { key: "MY", label: "Malaysia", currency: "RM", taxLabel: "SST", taxRate: "10" },
  { key: "AU", label: "Australia", currency: "A$", taxLabel: "GST", taxRate: "10" },
  { key: "CA", label: "Canada", currency: "C$", taxLabel: "GST/HST", taxRate: "5" },
  { key: "OT", label: "Other", currency: "$", taxLabel: "TAX", taxRate: "0" },
];

export function countryPreset(key: string): CountryPreset | undefined {
  return COUNTRY_PRESETS.find((c) => c.key === key);
}

const TZ_COUNTRY: [RegExp, string][] = [
  [/^Asia\/(Kolkata|Calcutta|Colombo)/, "IN"],
  [/^Asia\/Dubai/, "AE"],
  [/^Asia\/(Riyadh|Qatar|Bahrain|Kuwait)/, "SA"],
  [/^Asia\/Singapore/, "SG"],
  [/^Asia\/Tokyo/, "JP"],
  [/^Asia\/(Shanghai|Chongqing|Urumqi|Hong_Kong|Macau)/, "CN"],
  [/^Asia\/Seoul/, "KR"],
  [/^Europe\/Istanbul/, "TR"],
  [/^Asia\/(Ho_Chi_Minh|Saigon|Hanoi)/, "VN"],
  [/^Asia\/(Jakarta|Makassar|Jayapura)/, "ID"],
  [/^Asia\/(Kuala_Lumpur|Kuching)/, "MY"],
  [/^Europe\/(London|Belfast)/, "GB"],
  [/^(America|US)\//, "US"],
  [/^Australia\//, "AU"],
  [/^Canada\//, "CA"],
  [/^Europe\//, "EU"],
];

/** Best-effort country guess from the browser locale/timezone. Never throws. */
export function detectCountry(): string {
  try {
    const region = (navigator.language || "").split("-")[1]?.toUpperCase();
    if (region && COUNTRY_PRESETS.some((c) => c.key === region)) return region;
    if (region === "DE" || region === "FR" || region === "IT" || region === "ES" || region === "NL") return "EU";
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || "";
    for (const [re, key] of TZ_COUNTRY) if (re.test(tz)) return key;
  } catch {}
  return "IN";
}

const ITEMS_KEY = "sm_quote_items";
const META_KEY = "sm_quote_meta";
const EVT = "sm-quote-changed";
const MAX_ITEMS = 60;

export const DEFAULT_TERMS =
  "Prices exclusive of GST and freight unless stated. Weights are calculated (standard density basis) and may differ from weighbridge readings within rolling-tolerance limits. Quotation valid for the period stated; supply subject to stock and mill confirmation.";

function isFiniteNum(n: unknown): n is number {
  return typeof n === "number" && isFinite(n);
}

function sanitizeItem(raw: unknown): QuoteItem | null {
  if (!raw || typeof raw !== "object") return null;
  const r = raw as Record<string, unknown>;
  if (typeof r.id !== "string" || typeof r.desc !== "string") return null;
  if (!isFiniteNum(r.totalKg) || (r.totalKg as number) < 0) return null;
  const basis = r.rateBasis === "t" || r.rateBasis === "pc" ? r.rateBasis : "kg";
  return {
    id: r.id,
    tool: typeof r.tool === "string" ? r.tool : "Calculator",
    path: typeof r.path === "string" && (r.path as string).startsWith("/") ? (r.path as string) : "/calculators",
    desc: r.desc,
    detail: typeof r.detail === "string" ? r.detail : undefined,
    pieces: isFiniteNum(r.pieces) && (r.pieces as number) > 0 ? Math.round(r.pieces as number) : 1,
    unitKg: isFiniteNum(r.unitKg) && (r.unitKg as number) >= 0 ? (r.unitKg as number) : 0,
    totalKg: r.totalKg as number,
    rate: isFiniteNum(r.rate) && (r.rate as number) >= 0 ? (r.rate as number) : 0,
    rateBasis: basis,
    addedAt: isFiniteNum(r.addedAt) ? (r.addedAt as number) : Date.now(),
  };
}

export function loadQuoteItems(): QuoteItem[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = JSON.parse(localStorage.getItem(ITEMS_KEY) || "[]");
    if (!Array.isArray(raw)) return [];
    return raw.map(sanitizeItem).filter((x): x is QuoteItem => x !== null).slice(0, MAX_ITEMS);
  } catch {
    return [];
  }
}

function persist(items: QuoteItem[]) {
  try {
    localStorage.setItem(ITEMS_KEY, JSON.stringify(items.slice(0, MAX_ITEMS)));
  } catch {}
  try {
    window.dispatchEvent(new CustomEvent(EVT));
  } catch {}
}

export function addQuoteItem(
  seed: Omit<QuoteItem, "id" | "addedAt" | "rate" | "rateBasis"> &
    Partial<Pick<QuoteItem, "rate" | "rateBasis">>
): QuoteItem | null {
  if (!isFiniteNum(seed.totalKg) || seed.totalKg < 0) return null;
  const item: QuoteItem = {
    rate: 0,
    rateBasis: "kg",
    ...seed,
    pieces: isFiniteNum(seed.pieces) && seed.pieces > 0 ? Math.round(seed.pieces) : 1,
    unitKg: isFiniteNum(seed.unitKg) && seed.unitKg >= 0 ? seed.unitKg : 0,
    id: `q${Date.now().toString(36)}${Math.random().toString(36).slice(2, 7)}`,
    addedAt: Date.now(),
  };
  const items = loadQuoteItems();
  items.push(item);
  persist(items);
  return item;
}

export function updateQuoteItem(id: string, patch: Partial<QuoteItem>) {
  const items = loadQuoteItems().map((it) => {
    if (it.id !== id) return it;
    const merged = { ...it, ...patch };
    // Keep totals coherent when pieces change on a per-piece weight item.
    if (patch.pieces !== undefined && it.unitKg > 0) {
      merged.pieces = Math.max(1, Math.round(patch.pieces || 1));
      merged.totalKg = merged.unitKg * merged.pieces;
    }
    return sanitizeItem(merged) ?? it;
  });
  persist(items);
}

export function removeQuoteItem(id: string) {
  persist(loadQuoteItems().filter((it) => it.id !== id));
}

export function clearQuote() {
  persist([]);
}

export function itemAmount(it: QuoteItem): number {
  if (!(it.rate > 0)) return 0;
  if (it.rateBasis === "t") return (it.totalKg / 1000) * it.rate;
  if (it.rateBasis === "pc") return it.pieces * it.rate;
  return it.totalKg * it.rate;
}

function parseAmt(s: string): number {
  const n = parseFloat(String(s).replace(/[,\s]/g, ""));
  return isFinite(n) && n >= 0 ? n : 0;
}

export interface QuotePricing {
  /** Σ priced line amounts */
  goods: number;
  /** freight + other charges (0 on ex-works basis) */
  charges: number;
  freight: number;
  other: number;
  taxable: number;
  taxRate: number;
  tax: number;
  /** goods + charges + tax — the buyer's final payable */
  payable: number;
  landed: boolean;
  /** true when at least one line item carries a rate */
  priced: boolean;
}

/** The complete buyer-payable picture: goods → charges → tax → total. */
export function computeQuotePricing(items: QuoteItem[], meta: QuoteMeta): QuotePricing {
  const goods = items.reduce((a, it) => a + itemAmount(it), 0);
  const landed = meta.basis !== "ex";
  const freight = landed ? parseAmt(meta.freight) : 0;
  const other = landed ? parseAmt(meta.otherCharges) : 0;
  const charges = freight + other;
  const taxable = goods + charges;
  const taxRate = Math.min(100, Math.max(0, parseAmt(meta.taxRate)));
  const tax = (taxable * taxRate) / 100;
  return {
    goods,
    charges,
    freight,
    other,
    taxable,
    taxRate,
    tax,
    payable: taxable + tax,
    landed,
    priced: items.some((it) => it.rate > 0),
  };
}

export function quoteTotals(items: QuoteItem[]) {
  return items.reduce(
    (acc, it) => {
      acc.pieces += it.pieces;
      acc.kg += it.totalKg;
      acc.amount += itemAmount(it);
      if (!(it.rate > 0)) acc.unpriced += 1;
      return acc;
    },
    { pieces: 0, kg: 0, amount: 0, unpriced: 0 }
  );
}

function defaultQuoteNo(): string {
  const d = new Date();
  const ymd = `${d.getFullYear()}${String(d.getMonth() + 1).padStart(2, "0")}${String(
    d.getDate()
  ).padStart(2, "0")}`;
  return `SM-Q-${ymd}-${String(Math.floor(Math.random() * 900) + 100)}`;
}

export function loadQuoteMeta(): QuoteMeta {
  const base: QuoteMeta = {
    seller: "",
    sellerDetail: "",
    logo: "",
    buyer: "",
    buyerDetail: "",
    quoteNo: defaultQuoteNo(),
    date: new Date().toISOString().slice(0, 10),
    validity: "7 days",
    terms: DEFAULT_TERMS,
    notes: "",
    country: "",
    basis: "landed",
    basisPlace: "",
    taxLabel: "GST",
    taxRate: "18",
    freight: "",
    otherCharges: "",
  };
  if (typeof window === "undefined") return base;
  try {
    const raw = JSON.parse(localStorage.getItem(META_KEY) || "{}");
    if (!raw || typeof raw !== "object") return base;
    const r = raw as Record<string, unknown>;
    (Object.keys(base) as (keyof QuoteMeta)[]).forEach((k) => {
      if (typeof r[k] === "string") base[k] = r[k] as string;
    });
  } catch {}
  return base;
}

export function saveQuoteMeta(meta: QuoteMeta) {
  try {
    localStorage.setItem(META_KEY, JSON.stringify(meta));
  } catch {}
}

/** Live item list — updates on add/remove in this tab and across tabs. */
export function useQuoteItems(): QuoteItem[] {
  const [items, setItems] = useState<QuoteItem[]>([]);
  useEffect(() => {
    const sync = () => setItems(loadQuoteItems());
    sync();
    window.addEventListener(EVT, sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener(EVT, sync);
      window.removeEventListener("storage", sync);
    };
  }, []);
  return items;
}

export function useQuoteCount(): number {
  return useQuoteItems().length;
}
