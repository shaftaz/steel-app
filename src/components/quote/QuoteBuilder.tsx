"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  QuoteItem,
  QuoteMeta,
  RateBasis,
  clearQuote,
  itemAmount,
  loadQuoteMeta,
  quoteTotals,
  removeQuoteItem,
  saveQuoteMeta,
  updateQuoteItem,
  useQuoteItems,
} from "@/lib/quote";
import { fmt, track, useCurrency, LABEL_CLS } from "@/components/instrument";
import { shareResultCard } from "@/lib/share-card";

const TH =
  "font-mono text-[10px] tracking-[0.08em] text-muted-3 uppercase text-left font-semibold px-2 py-2 border-b border-ink";
const TD = "px-2 py-2.5 border-b border-rule-faint font-mono text-[12.5px] align-top";

function basisLabel(b: RateBasis, currency: string) {
  return b === "t" ? `${currency}/t` : b === "pc" ? `${currency}/pc` : `${currency}/kg`;
}

function buildSummaryText(
  items: QuoteItem[],
  meta: QuoteMeta,
  currency: string
): string {
  const t = quoteTotals(items);
  const lines = [
    `QUOTATION ${meta.quoteNo} · ${meta.date}`,
    meta.seller ? `From: ${meta.seller}` : "",
    meta.buyer ? `To: ${meta.buyer}` : "",
    "",
    ...items.map((it, i) => {
      const amt = itemAmount(it);
      return `${i + 1}. ${it.desc} — ${it.pieces} pc · ${fmt(it.totalKg, 1)} kg${
        amt > 0 ? ` · ${currency}${fmt(amt, 0)}` : ""
      }`;
    }),
    "",
    `TOTAL: ${fmt(t.pieces, 0)} pcs · ${fmt(t.kg, 1)} kg (${fmt(t.kg / 1000, 3)} t)${
      t.amount > 0 ? ` · ${currency}${fmt(t.amount, 0)}` : ""
    }`,
    "",
    "Built with the SteelMath Quote Builder — steelmath.com/quote",
  ];
  return lines.filter((l) => l !== null).join("\n");
}

export default function QuoteBuilder() {
  const items = useQuoteItems();
  const [currency, setCurrency] = useCurrency();
  const [meta, setMeta] = useState<QuoteMeta | null>(null);
  const [copied, setCopied] = useState(false);
  const [cardState, setCardState] = useState<"idle" | "busy" | "done">("idle");
  const [confirmClear, setConfirmClear] = useState(false);

  useEffect(() => {
    setMeta(loadQuoteMeta());
  }, []);

  const patchMeta = (patch: Partial<QuoteMeta>) => {
    setMeta((m) => {
      if (!m) return m;
      const next = { ...m, ...patch };
      saveQuoteMeta(next);
      return next;
    });
  };

  const totals = quoteTotals(items);

  const doCopySummary = () => {
    if (!meta) return;
    track("quote_copy_summary");
    const text = buildSummaryText(items, meta, currency);
    const done = () => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    };
    if (navigator.clipboard?.writeText) navigator.clipboard.writeText(text).then(done, done);
    else done();
  };

  const doShareCard = async () => {
    if (!meta || cardState === "busy") return;
    setCardState("busy");
    track("quote_share_card");
    try {
      await shareResultCard(
        {
          title: "Quotation / Loading Sheet",
          context: `${meta.quoteNo} · ${meta.date}${meta.buyer ? ` · TO ${meta.buyer}` : ""}`,
          headlineLabel: "TOTAL WEIGHT — KG",
          headlineValue: fmt(totals.kg, 1),
          subline: `${items.length} line item${items.length === 1 ? "" : "s"} · ${fmt(
            totals.pieces,
            0
          )} pieces · ${fmt(totals.kg / 1000, 3)} t`,
          stats: [
            ...items.slice(0, 4).map((it) => ({
              label: it.desc.slice(0, 40),
              value: `${fmt(it.totalKg, 1)} kg`,
            })),
            ...(totals.amount > 0
              ? [{ label: "QUOTED AMOUNT", value: `${currency}${fmt(totals.amount, 0)}`, accent: true }]
              : []),
          ],
          formulaLine:
            items.length > 4 ? `+ ${items.length - 4} more line items on the full sheet` : undefined,
          url: "https://steelmath.com/quote",
        },
        `steelmath-quote-${meta.quoteNo}`
      );
      setCardState("done");
    } catch {
      setCardState("idle");
    }
    setTimeout(() => setCardState("idle"), 2200);
  };

  if (!meta) {
    return (
      <div className="border border-rule bg-[#FFFFFF] p-8 font-mono text-[12px] text-muted-3">
        LOADING QUOTE…
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="border border-ink bg-[#FFFFFF] p-8 sm:p-12 text-center">
        <div className="font-mono text-[11px] tracking-[0.12em] text-accent mb-3">
          QUOTE BUILDER — EMPTY
        </div>
        <h2 className="text-[21px] font-extrabold tracking-[-0.01em] mb-2.5">
          No line items yet
        </h2>
        <p className="text-[14px] text-muted max-w-[520px] mx-auto leading-relaxed mb-6">
          Run any weight calculator and press <span className="font-mono text-[12.5px] text-ink font-semibold">+ ADD TO QUOTE</span> under
          the result. Items collect here into a dispatch-ready quotation and
          loading sheet you can print, save as PDF, or share.
        </p>
        <div className="flex justify-center gap-3 flex-wrap">
          <Link href="/calculator" className="btn-glow inline-block px-6 py-3 no-underline text-[13px] font-semibold">
            Open Weight Calculator
          </Link>
          <Link
            href="/calculators"
            className="inline-block px-6 py-3 no-underline text-[13px] font-semibold border border-rule text-ink hover:border-ink transition-colors"
          >
            All calculators →
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Toolbar */}
      <div className="flex flex-wrap gap-2 mb-4 no-print">
        <button
          onClick={() => {
            track("quote_print");
            window.print();
          }}
          className="btn-glow px-5 py-2.5 text-[12px] font-semibold cursor-pointer"
        >
          PRINT / SAVE PDF
        </button>
        <button
          onClick={doShareCard}
          className="px-5 py-2.5 text-[12px] font-mono font-semibold border border-rule text-ink hover:border-ink transition-colors cursor-pointer bg-[#FFFFFF]"
        >
          {cardState === "busy" ? "RENDERING…" : cardState === "done" ? "CARD READY ✓" : "SHARE SUMMARY CARD"}
        </button>
        <button
          onClick={doCopySummary}
          className="px-5 py-2.5 text-[12px] font-mono font-semibold border border-rule text-ink hover:border-ink transition-colors cursor-pointer bg-[#FFFFFF]"
        >
          {copied ? "COPIED ✓" : "COPY AS TEXT"}
        </button>
        <div className="ml-auto flex gap-2 items-center">
          <select
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
            className="bg-[#FFFFFF] border border-input-border text-ink font-mono text-[12px] px-2 py-2.5 outline-none cursor-pointer"
            aria-label="Currency"
          >
            {["₹", "$", "€", "£"].map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
          <button
            onClick={() => {
              if (confirmClear) {
                clearQuote();
                setConfirmClear(false);
              } else {
                setConfirmClear(true);
                setTimeout(() => setConfirmClear(false), 3000);
              }
            }}
            className={`px-4 py-2.5 text-[12px] font-mono border cursor-pointer transition-colors bg-[#FFFFFF] ${
              confirmClear ? "border-red-down text-red-down" : "border-rule text-muted-2 hover:border-ink hover:text-ink"
            }`}
          >
            {confirmClear ? "CONFIRM CLEAR?" : "CLEAR ALL"}
          </button>
        </div>
      </div>

      {/* The sheet — this block is what prints */}
      <div className="quote-sheet border border-ink bg-[#FFFFFF]">
        {/* Sheet header */}
        <div className="flex justify-between items-start gap-4 flex-wrap px-6 pt-6 pb-5 border-b border-ink">
          <div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-[22px] font-extrabold tracking-[-0.02em]">
                Steel<span className="text-accent">Math</span>
              </span>
              <span className="font-mono text-[10px] text-muted-3">.COM</span>
            </div>
            <div className="font-mono text-[10.5px] tracking-[0.1em] text-muted-3 mt-1">
              QUOTATION · LOADING SHEET
            </div>
          </div>
          <div className="text-right">
            <div className="font-mono text-[13px] font-semibold">
              <input
                value={meta.quoteNo}
                onChange={(e) => patchMeta({ quoteNo: e.target.value })}
                className="bg-transparent border-0 border-b border-dashed border-rule text-right font-mono text-[13px] font-semibold outline-none w-[210px] focus:border-accent"
                aria-label="Quote number"
              />
            </div>
            <div className="font-mono text-[11px] text-muted-2 mt-1.5 flex gap-2 justify-end items-center">
              <input
                type="date"
                value={meta.date}
                onChange={(e) => patchMeta({ date: e.target.value })}
                className="bg-transparent border-0 border-b border-dashed border-rule text-right font-mono text-[11px] outline-none focus:border-accent"
                aria-label="Quote date"
              />
              <span>· VALID</span>
              <input
                value={meta.validity}
                onChange={(e) => patchMeta({ validity: e.target.value })}
                className="bg-transparent border-0 border-b border-dashed border-rule font-mono text-[11px] outline-none w-[70px] focus:border-accent"
                aria-label="Validity"
              />
            </div>
          </div>
        </div>

        {/* Parties */}
        <div className="grid grid-cols-1 sm:grid-cols-2 border-b border-rule">
          <div className="px-6 py-4 sm:border-r border-rule">
            <div className={LABEL_CLS}>FROM (SELLER)</div>
            <input
              value={meta.seller}
              onChange={(e) => patchMeta({ seller: e.target.value })}
              placeholder="Your firm name"
              className="mt-1.5 w-full bg-transparent border-0 border-b border-dashed border-rule font-semibold text-[15px] outline-none focus:border-accent placeholder:text-muted-3 placeholder:font-normal"
            />
            <textarea
              value={meta.sellerDetail}
              onChange={(e) => patchMeta({ sellerDetail: e.target.value })}
              placeholder="Address · GSTIN · phone"
              rows={2}
              className="mt-1.5 w-full bg-transparent border-0 font-mono text-[11.5px] text-muted outline-none resize-none placeholder:text-muted-3"
            />
          </div>
          <div className="px-6 py-4 border-t sm:border-t-0 border-rule">
            <div className={LABEL_CLS}>TO (BUYER)</div>
            <input
              value={meta.buyer}
              onChange={(e) => patchMeta({ buyer: e.target.value })}
              placeholder="Buyer / consignee"
              className="mt-1.5 w-full bg-transparent border-0 border-b border-dashed border-rule font-semibold text-[15px] outline-none focus:border-accent placeholder:text-muted-3 placeholder:font-normal"
            />
            <textarea
              value={meta.buyerDetail}
              onChange={(e) => patchMeta({ buyerDetail: e.target.value })}
              placeholder="Address · site / delivery point"
              rows={2}
              className="mt-1.5 w-full bg-transparent border-0 font-mono text-[11.5px] text-muted outline-none resize-none placeholder:text-muted-3"
            />
          </div>
        </div>

        {/* Items table */}
        <div className="overflow-x-auto">
          <table className="w-full border-collapse min-w-[720px]">
            <thead>
              <tr>
                <th className={`${TH} w-[24px]`}>#</th>
                <th className={TH}>ITEM</th>
                <th className={`${TH} text-right`}>PCS</th>
                <th className={`${TH} text-right`}>UNIT WT (KG)</th>
                <th className={`${TH} text-right`}>TOTAL WT (KG)</th>
                <th className={`${TH} text-right`}>RATE</th>
                <th className={`${TH} text-right`}>AMOUNT</th>
                <th className={`${TH} w-[30px] no-print`}></th>
              </tr>
            </thead>
            <tbody>
              {items.map((it, i) => {
                const amt = itemAmount(it);
                return (
                  <tr key={it.id}>
                    <td className={`${TD} text-muted-3`}>{i + 1}</td>
                    <td className={TD}>
                      <div className="font-semibold text-[13px] font-sans">{it.desc}</div>
                      <div className="text-[10.5px] text-muted-3 mt-0.5">
                        {it.detail ? `${it.detail} · ` : ""}
                        <Link href={it.path} className="text-muted-3 underline decoration-dotted hover:text-accent no-print-link">
                          {it.tool}
                        </Link>
                      </div>
                    </td>
                    <td className={`${TD} text-right`}>
                      <input
                        type="number"
                        min={1}
                        value={it.pieces}
                        onChange={(e) =>
                          updateQuoteItem(it.id, { pieces: Math.max(1, Math.round(Number(e.target.value) || 1)) })
                        }
                        className="w-[62px] bg-transparent border border-rule-faint text-right font-mono text-[12.5px] px-1 py-0.5 outline-none focus:border-accent no-print-border"
                        aria-label="Pieces"
                      />
                    </td>
                    <td className={`${TD} text-right text-muted-2`}>
                      {it.unitKg > 0 ? fmt(it.unitKg, 2) : "—"}
                    </td>
                    <td className={`${TD} text-right font-semibold`}>{fmt(it.totalKg, 1)}</td>
                    <td className={`${TD} text-right`}>
                      <span className="inline-flex items-center gap-1 justify-end">
                        <input
                          type="number"
                          min={0}
                          value={it.rate || ""}
                          placeholder="0"
                          onChange={(e) =>
                            updateQuoteItem(it.id, { rate: Math.max(0, Number(e.target.value) || 0) })
                          }
                          className="w-[78px] bg-transparent border border-rule-faint text-right font-mono text-[12.5px] px-1 py-0.5 outline-none focus:border-accent no-print-border"
                          aria-label="Rate"
                        />
                        <select
                          value={it.rateBasis}
                          onChange={(e) => updateQuoteItem(it.id, { rateBasis: e.target.value as RateBasis })}
                          className="bg-transparent border border-rule-faint font-mono text-[10.5px] px-0.5 py-0.5 outline-none cursor-pointer no-print-border"
                          aria-label="Rate basis"
                        >
                          <option value="kg">{basisLabel("kg", currency)}</option>
                          <option value="t">{basisLabel("t", currency)}</option>
                          <option value="pc">{basisLabel("pc", currency)}</option>
                        </select>
                      </span>
                    </td>
                    <td className={`${TD} text-right font-semibold`}>
                      {amt > 0 ? `${currency}${fmt(amt, 0)}` : "—"}
                    </td>
                    <td className={`${TD} no-print`}>
                      <button
                        onClick={() => removeQuoteItem(it.id)}
                        aria-label={`Remove ${it.desc}`}
                        className="text-muted-3 hover:text-red-down cursor-pointer bg-transparent border-0 font-mono text-[13px] px-1"
                      >
                        ×
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
            <tfoot>
              <tr>
                <td className="px-2 py-3 border-t-2 border-ink" />
                <td className="px-2 py-3 border-t-2 border-ink font-mono text-[11px] tracking-[0.08em] font-semibold">
                  TOTAL — {items.length} ITEM{items.length === 1 ? "" : "S"}
                </td>
                <td className="px-2 py-3 border-t-2 border-ink text-right font-mono text-[13px] font-semibold">
                  {fmt(totals.pieces, 0)}
                </td>
                <td className="px-2 py-3 border-t-2 border-ink" />
                <td className="px-2 py-3 border-t-2 border-ink text-right font-mono text-[13px] font-semibold">
                  {fmt(totals.kg, 1)}
                  <div className="text-[10.5px] text-muted-2 font-normal">{fmt(totals.kg / 1000, 3)} t</div>
                </td>
                <td className="px-2 py-3 border-t-2 border-ink" />
                <td className="px-2 py-3 border-t-2 border-ink text-right font-mono text-[14px] font-semibold text-accent">
                  {totals.amount > 0 ? `${currency}${fmt(totals.amount, 0)}` : "—"}
                </td>
                <td className="border-t-2 border-ink no-print" />
              </tr>
            </tfoot>
          </table>
        </div>
        {totals.unpriced > 0 && totals.amount > 0 && (
          <div className="px-6 py-2 font-mono text-[10.5px] text-muted-3 border-t border-rule-faint">
            NOTE: {totals.unpriced} ITEM{totals.unpriced === 1 ? "" : "S"} WITHOUT A RATE — EXCLUDED FROM THE AMOUNT TOTAL.
          </div>
        )}

        {/* Terms + notes */}
        <div className="grid grid-cols-1 sm:grid-cols-2 border-t border-rule">
          <div className="px-6 py-4 sm:border-r border-rule">
            <div className={LABEL_CLS}>TERMS</div>
            <textarea
              value={meta.terms}
              onChange={(e) => patchMeta({ terms: e.target.value })}
              rows={4}
              className="mt-1.5 w-full bg-transparent border-0 font-mono text-[11px] leading-relaxed text-muted outline-none resize-none"
              aria-label="Terms"
            />
          </div>
          <div className="px-6 py-4 border-t sm:border-t-0 border-rule">
            <div className={LABEL_CLS}>NOTES / LOADING INSTRUCTIONS</div>
            <textarea
              value={meta.notes}
              onChange={(e) => patchMeta({ notes: e.target.value })}
              placeholder="Vehicle no., loading sequence, bundling, delivery window…"
              rows={4}
              className="mt-1.5 w-full bg-transparent border-0 font-mono text-[11px] leading-relaxed text-muted outline-none resize-none placeholder:text-muted-3"
              aria-label="Notes"
            />
          </div>
        </div>

        <div className="px-6 py-3 border-t border-ink flex justify-between gap-2 flex-wrap font-mono text-[9.5px] tracking-[0.06em] text-muted-3">
          <span>WEIGHTS CALCULATED WITH STEELMATH.COM — VERIFY AGAINST WEIGHBRIDGE BEFORE DISPATCH · NOT A TAX INVOICE</span>
          <span>STEELMATH.COM/QUOTE</span>
        </div>
      </div>
    </div>
  );
}
