"use client";

import { ReactNode, useEffect, useState } from "react";
import Link from "next/link";
import { shareResultCard, ShareCardStat } from "@/lib/share-card";
import { addQuoteItem, useQuoteCount } from "@/lib/quote";

/* ============================================================
   Precision Instrument primitives — shared by every calculator.
   Inputs panel (white) + result panel (dark) inside a single
   1px ink border, with a status strip underneath.
   ============================================================ */

export function fmt(n: number, dp?: number) {
  return n.toLocaleString("en-IN", {
    minimumFractionDigits: dp ?? 0,
    maximumFractionDigits: dp ?? 0,
  });
}

export function track(event: string, params?: Record<string, string>) {
  try {
    (window as unknown as { gtag?: (...a: unknown[]) => void }).gtag?.("event", event, params);
  } catch {}
}

export function num(v: string) {
  const n = parseFloat(v);
  return isFinite(n) && n >= 0 ? n : 0;
}

/** Major trade currencies. `sym` is what gets stored/prefixed to amounts. */
export const CURRENCIES: { sym: string; code: string }[] = [
  { sym: "₹", code: "INR" },
  { sym: "$", code: "USD" },
  { sym: "€", code: "EUR" },
  { sym: "£", code: "GBP" },
  { sym: "AED", code: "AED" },
  { sym: "SAR", code: "SAR" },
  { sym: "S$", code: "SGD" },
  { sym: "¥", code: "JPY" },
  { sym: "CN¥", code: "CNY" },
  { sym: "₩", code: "KRW" },
  { sym: "₺", code: "TRY" },
  { sym: "₫", code: "VND" },
  { sym: "RM", code: "MYR" },
  { sym: "Rp", code: "IDR" },
  { sym: "A$", code: "AUD" },
  { sym: "C$", code: "CAD" },
];

export function CurrencyOptions() {
  return (
    <>
      {CURRENCIES.map((c) => (
        <option key={c.code} value={c.sym}>
          {c.sym === c.code ? c.code : `${c.sym} ${c.code}`}
        </option>
      ))}
    </>
  );
}

export function useCurrency(): [string, (c: string) => void] {
  const [currency, setCurrency] = useState("₹");
  useEffect(() => {
    try {
      const c = localStorage.getItem("sm_currency");
      if (c) setCurrency(c);
    } catch {}
  }, []);
  const set = (c: string) => {
    setCurrency(c);
    try {
      localStorage.setItem("sm_currency", c);
    } catch {}
  };
  return [currency, set];
}

export function useUnit(): ["kg" | "t", (u: "kg" | "t") => void] {
  const [unit, setUnit] = useState<"kg" | "t">("kg");
  useEffect(() => {
    try {
      const u = localStorage.getItem("sm_unit");
      if (u === "t" || u === "kg") setUnit(u);
    } catch {}
  }, []);
  const set = (u: "kg" | "t") => {
    setUnit(u);
    try {
      localStorage.setItem("sm_unit", u);
    } catch {}
  };
  return [unit, set];
}

export const LABEL_CLS =
  "font-mono text-[10.5px] tracking-[0.1em] text-muted-3 uppercase";
export const INPUT_CLS =
  "bg-[#FFFFFF] border border-input-border text-ink font-mono text-base px-3 py-2.5 outline-none w-full focus:border-accent";

export function Field({
  label,
  value,
  onChange,
  step,
  placeholder,
}: {
  label: string;
  value: number | string;
  onChange: (v: string) => void;
  step?: number | string;
  placeholder?: string;
}) {
  return (
    <label className="flex flex-col gap-1.5 min-w-0">
      <span className={LABEL_CLS}>{label}</span>
      <input
        type="number"
        step={step ?? 0.5}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className={INPUT_CLS}
      />
    </label>
  );
}

export function SelectField({
  label,
  value,
  onChange,
  children,
}: {
  label: string;
  value: string | number;
  onChange: (v: string) => void;
  children: ReactNode;
}) {
  return (
    <label className="flex flex-col gap-1.5 min-w-0">
      <span className={LABEL_CLS}>{label}</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="bg-[#FFFFFF] border border-input-border text-ink font-mono text-[13px] px-2.5 py-2.5 outline-none w-full focus:border-accent"
      >
        {children}
      </select>
    </label>
  );
}

export function Chip({
  active,
  onClick,
  children,
}: {
  active?: boolean;
  onClick: () => void;
  children: ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      aria-pressed={!!active}
      className={`font-mono text-[11.5px] px-2.5 py-1.5 cursor-pointer border transition-colors ${
        active
          ? "bg-ink text-[#FFFFFF] border-ink"
          : "bg-transparent text-muted border-input-border hover:border-ink hover:text-ink"
      }`}
    >
      {children}
    </button>
  );
}

export function ModeTab({
  active,
  onClick,
  children,
}: {
  active?: boolean;
  onClick: () => void;
  children: ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      aria-pressed={!!active}
      className={`font-mono text-[11.5px] px-3 py-2.5 cursor-pointer border-r border-rule-faint last:border-r-0 transition-colors ${
        active ? "bg-ink text-[#FFFFFF]" : "bg-transparent text-ink hover:bg-paper"
      }`}
    >
      {children}
    </button>
  );
}

export function ShowMaths({
  lines,
  source,
}: {
  lines: ReactNode[];
  source?: string;
}) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        className="bg-transparent border-t border-dashed border-rule pt-3 cursor-pointer flex items-baseline gap-2 font-mono text-[11px] tracking-[0.08em] text-muted hover:text-ink text-left w-full"
      >
        <span>{open ? "▾" : "▸"}</span>
        <span>SHOW THE MATHS</span>
      </button>
      {open && (
        <div className="font-mono text-xs leading-[1.8] text-muted bg-paper border border-rule px-4 py-3.5">
          {lines.map((l, i) => (
            <div key={i} className={i === 0 ? "text-ink" : undefined}>
              {l}
            </div>
          ))}
          {source && <div className="text-muted-3 mt-1.5">{source}</div>}
        </div>
      )}
    </>
  );
}

export interface Stat {
  label: string;
  value: string;
  accent?: boolean;
  positive?: boolean;
}

/** Seed for the quote builder — provided by weight-producing calculators. */
export interface QuoteSeed {
  /** Line description, e.g. "12mm Fe500 TMT × 12 m" */
  desc: string;
  detail?: string;
  pieces?: number;
  unitKg?: number;
  totalKg: number;
}

function pageTool(): string {
  try {
    // The title tag is authored per page and cleaner than a composed <h1>.
    const t = document.title.split("|")[0].trim();
    if (t) return t;
    return document.querySelector("h1")?.textContent?.trim() || "SteelMath Calculator";
  } catch {
    return "SteelMath Calculator";
  }
}

export function ResultPanel({
  kicker = "RESULT — RECALCULATES AS YOU TYPE",
  context,
  headlineLabel,
  headlineValue,
  subline,
  stats,
  formulaLine,
  copyText,
  shareUrl,
  quote,
}: {
  kicker?: string;
  context?: string;
  headlineLabel: string;
  headlineValue: string;
  subline?: string;
  stats?: Stat[];
  formulaLine?: string;
  copyText: string;
  shareUrl?: string;
  quote?: QuoteSeed;
}) {
  const [copied, setCopied] = useState(false);
  const [shared, setShared] = useState(false);
  const [cardState, setCardState] = useState<"idle" | "busy" | "shared" | "saved" | "link">("idle");
  const [addedFlash, setAddedFlash] = useState(false);
  const quoteCount = useQuoteCount();

  const doShareCard = async () => {
    if (cardState === "busy") return;
    setCardState("busy");
    track("share_card", { page: typeof window !== "undefined" ? window.location.pathname : "" });
    const url = shareUrl ?? (typeof window !== "undefined" ? window.location.href : "");
    const title = pageTool();
    try {
      const outcome = await shareResultCard(
        {
          title,
          context,
          headlineLabel,
          headlineValue,
          subline,
          // Placeholder stats ("— enter rate") don't belong on a shared card.
          stats: (stats as ShareCardStat[] | undefined)?.filter(
            (s) => !/enter rate|^—$/.test(s.value.trim())
          ),
          formulaLine,
          url,
          accent:
            typeof window !== "undefined" && window.location.pathname.startsWith("/cbam")
              ? "#8FA3E8"
              : undefined,
        },
        `steelmath-${title.slice(0, 40)}`
      );
      setCardState(outcome === "shared" ? "shared" : outcome === "downloaded" ? "saved" : "idle");
    } catch {
      // Never break the page: fall back to copying the share link.
      try {
        await navigator.clipboard?.writeText(url);
        setCardState("link");
      } catch {
        setCardState("idle");
      }
    }
    setTimeout(() => setCardState("idle"), 2200);
  };

  const doAddToQuote = () => {
    if (!quote) return;
    const item = addQuoteItem({
      tool: pageTool(),
      path: typeof window !== "undefined" ? window.location.pathname : "/calculators",
      desc: quote.desc,
      detail: quote.detail,
      pieces: quote.pieces ?? 1,
      unitKg: quote.unitKg ?? 0,
      totalKg: quote.totalKg,
    });
    if (item) {
      track("quote_add_item", { page: typeof window !== "undefined" ? window.location.pathname : "" });
      setAddedFlash(true);
      setTimeout(() => setAddedFlash(false), 2200);
    }
  };

  useEffect(() => {
    try {
      const w = window as unknown as { __smCalcFired?: Set<string> };
      const fired = (w.__smCalcFired = w.__smCalcFired ?? new Set());
      const tool = window.location.pathname;
      if (!fired.has(tool)) {
        fired.add(tool);
        track("calculator_result", { tool_name: tool });
      }
    } catch {}
  }, []);

  const doCopy = (text: string, done: (v: boolean) => void, event?: string) => {
    if (event) track(event, { page: typeof window !== "undefined" ? window.location.pathname : "" });
    const finish = () => {
      done(true);
      setTimeout(() => done(false), 1600);
    };
    if (navigator.clipboard?.writeText)
      navigator.clipboard.writeText(text).then(finish, finish);
    else finish();
  };

  return (
    <div className="bg-ink text-paper flex flex-col">
      <div className="px-5 py-3.5 border-b border-ink-border flex justify-between items-baseline gap-2 flex-wrap">
        <span className="font-mono text-[11px] tracking-[0.12em] text-[#9A9B9E] inline-flex items-center gap-2">
          <span className="w-1.5 h-1.5 bg-accent rounded-full inline-block pulse-dot" />
          {kicker}
        </span>
        {context && (
          <span className="font-mono text-[10.5px] text-[#7E8085]">{context}</span>
        )}
      </div>
      <div className="px-5 pt-6 pb-4">
        <div className="font-mono text-[10.5px] tracking-[0.12em] text-[#7E8085] mb-2">
          {headlineLabel}
        </div>
        <div className="font-mono text-[clamp(38px,5vw,54px)] font-semibold text-accent leading-none">
          {headlineValue}
        </div>
        {subline && (
          <div className="font-mono text-[12.5px] text-[#C9CACC] mt-2.5">{subline}</div>
        )}
      </div>
      {stats && stats.length > 0 && (
        <div className="px-5 pb-4 grid grid-cols-2 gap-x-4 gap-y-2.5">
          {stats.map((s) => (
            <div key={s.label} className="border-t border-ink-border pt-2.5">
              <div className="font-mono text-[10px] tracking-[0.1em] text-[#7E8085]">
                {s.label}
              </div>
              <div
                className={`font-mono text-[17px] font-semibold mt-1 ${
                  s.accent ? "text-accent" : s.positive ? "text-positive" : ""
                }`}
              >
                {s.value}
              </div>
            </div>
          ))}
        </div>
      )}
      {formulaLine && (
        <div className="px-5 py-3 border-t border-ink-border font-mono text-[11.5px] text-[#7E8085]">
          {formulaLine}
        </div>
      )}
      <div className="mt-auto grid grid-cols-2 sm:grid-cols-4 border-t border-ink-border no-print">
        <button
          onClick={() => doCopy(copyText, setCopied, "copy_result")}
          className="bg-transparent border-r border-b sm:border-b-0 border-ink-border text-paper font-mono text-[10.5px] tracking-[0.05em] py-3 px-1 cursor-pointer hover:bg-panel-dark"
        >
          {copied ? "COPIED ✓" : "COPY RESULT"}
        </button>
        <button
          onClick={doShareCard}
          className="bg-transparent border-b sm:border-b-0 sm:border-r border-ink-border text-paper font-mono text-[10.5px] tracking-[0.05em] py-3 px-1 cursor-pointer hover:bg-panel-dark"
        >
          {cardState === "busy"
            ? "RENDERING…"
            : cardState === "shared"
              ? "SHARED ✓"
              : cardState === "saved"
                ? "PNG SAVED ✓"
                : cardState === "link"
                  ? "LINK COPIED ✓"
                  : "SHARE CARD"}
        </button>
        <button
          onClick={() =>
            doCopy(
              shareUrl ?? (typeof window !== "undefined" ? window.location.href : ""),
              setShared,
              "share_link"
            )
          }
          className="bg-transparent border-r border-ink-border text-paper font-mono text-[10.5px] tracking-[0.05em] py-3 px-1 cursor-pointer hover:bg-panel-dark"
        >
          {shared ? "LINK COPIED ✓" : "SHARE LINK"}
        </button>
        <button
          onClick={() => { track("download_pdf"); window.print(); }}
          className="bg-transparent text-paper font-mono text-[10.5px] tracking-[0.05em] py-3 px-1 cursor-pointer hover:bg-panel-dark"
        >
          DOWNLOAD PDF
        </button>
      </div>
      {quote && (
        <div className="grid grid-cols-2 border-t border-ink-border no-print">
          <button
            onClick={doAddToQuote}
            className="bg-transparent border-r border-ink-border text-accent font-mono text-[11px] tracking-[0.06em] font-semibold py-3 px-1.5 cursor-pointer hover:bg-panel-dark"
          >
            {addedFlash ? "ADDED TO QUOTE ✓" : "+ ADD TO QUOTE"}
          </button>
          <Link
            href="/quote"
            className="flex items-center justify-center text-paper font-mono text-[11px] tracking-[0.06em] py-3 px-1.5 no-underline hover:bg-panel-dark"
          >
            {quoteCount > 0 ? `VIEW QUOTE (${quoteCount}) →` : "QUOTE BUILDER →"}
          </Link>
        </div>
      )}
    </div>
  );
}

export function InstrumentShell({
  inputs,
  result,
  statusLeft = "INSTANT RECALC · WORKS OFFLINE (PWA) · SHAREABLE RESULTS",
  statusRight = "FORMULAS LAST VERIFIED — 18 JUL 2026",
  header,
}: {
  inputs: ReactNode;
  result: ReactNode;
  statusLeft?: string;
  statusRight?: string;
  header?: ReactNode;
}) {
  return (
    <div className="print-block">
      <div className="border border-ink bg-[#FFFFFF] grid grid-cols-1 lg:grid-cols-2">
        <div className="lg:border-r border-rule flex flex-col">
          {header}
          <div className="p-5 flex flex-col gap-3.5 flex-1">{inputs}</div>
        </div>
        {result}
      </div>
      <div className="flex justify-between items-center border border-rule border-t-0 bg-[#FFFFFF] px-5 py-2.5 flex-wrap gap-2">
        <span className="font-mono text-[10.5px] tracking-[0.08em] text-muted-3">
          {statusLeft}
        </span>
        <span className="font-mono text-[10.5px] tracking-[0.08em] text-muted-3">
          {statusRight}
        </span>
      </div>
    </div>
  );
}
