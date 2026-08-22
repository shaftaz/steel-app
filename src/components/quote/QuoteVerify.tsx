"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { decodeQuotePayload, VerifyPayload } from "@/lib/quote-link";
import { fmt, track } from "@/components/instrument";

const TH =
  "font-mono text-[10px] tracking-[0.08em] text-muted-3 uppercase text-left font-semibold px-2 py-2 border-b border-ink";
const TD = "px-2 py-2.5 border-b border-rule-faint font-mono text-[12.5px] align-top";

export default function QuoteVerify() {
  const [state, setState] = useState<"loading" | "ok" | "bad">("loading");
  const [data, setData] = useState<VerifyPayload | null>(null);

  useEffect(() => {
    const hash = window.location.hash;
    const m = hash.match(/[#&]d=([^&]+)/);
    if (!m) {
      setState("bad");
      return;
    }
    decodeQuotePayload(m[1]).then((payload) => {
      if (payload) {
        setData(payload);
        setState("ok");
        track("quote_verify_view", { items: String(payload.items.length) });
      } else {
        setState("bad");
      }
    });
  }, []);

  if (state === "loading") {
    return (
      <div className="border border-rule bg-[#FFFFFF] p-8 font-mono text-[12px] text-muted-3">
        DECODING QUOTE…
      </div>
    );
  }

  if (state === "bad" || !data) {
    return (
      <div className="border border-ink bg-[#FFFFFF] p-8 sm:p-12 text-center">
        <div className="font-mono text-[11px] tracking-[0.12em] text-accent mb-3">
          LINK INCOMPLETE
        </div>
        <h2 className="text-[21px] font-extrabold tracking-[-0.01em] mb-2.5">
          This verify link doesn’t carry a quote
        </h2>
        <p className="text-[14px] text-muted max-w-[520px] mx-auto leading-relaxed mb-6">
          The weights are encoded in the link itself, and this one arrived
          without its data (some apps trim long links). Ask the sender to
          re-share it — or build and check your own numbers in seconds.
        </p>
        <div className="flex justify-center gap-3 flex-wrap">
          <Link href="/calculator" className="btn-glow inline-block px-6 py-3 no-underline text-[13px] font-semibold">
            Open Weight Calculator
          </Link>
          <Link
            href="/quote"
            className="inline-block px-6 py-3 no-underline text-[13px] font-semibold border border-rule text-ink hover:border-ink transition-colors"
          >
            Build your own quote →
          </Link>
        </div>
      </div>
    );
  }

  const totals = data.items.reduce(
    (a, it) => {
      a.pieces += it.pieces;
      a.kg += it.totalKg;
      return a;
    },
    { pieces: 0, kg: 0 }
  );

  return (
    <div>
      <div className="border border-ink bg-[#FFFFFF]">
        <div className="flex justify-between items-start gap-4 flex-wrap px-6 pt-5 pb-4 border-b border-ink">
          <div>
            <div className="font-mono text-[10.5px] tracking-[0.12em] text-accent mb-1.5">
              VERIFIED WEIGHT SHEET
            </div>
            <div className="text-[18px] font-extrabold tracking-[-0.01em]">
              {data.meta.seller || "Steel quotation"}
            </div>
            {data.meta.sellerDetail && (
              <div className="font-mono text-[10.5px] text-muted-2 mt-0.5 whitespace-pre-line">
                {data.meta.sellerDetail}
              </div>
            )}
          </div>
          <div className="text-right font-mono text-[11px] text-muted-2">
            <div className="font-semibold text-ink text-[13px]">{data.meta.quoteNo}</div>
            <div className="mt-1">
              {data.meta.date}
              {data.meta.validity ? ` · VALID ${data.meta.validity.toUpperCase()}` : ""}
            </div>
            {data.meta.buyer && <div className="mt-1">TO: {data.meta.buyer.toUpperCase()}</div>}
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse min-w-[560px]">
            <thead>
              <tr>
                <th className={`${TH} w-[24px]`}>#</th>
                <th className={TH}>ITEM</th>
                <th className={`${TH} text-right`}>PCS</th>
                <th className={`${TH} text-right`}>UNIT WT (KG)</th>
                <th className={`${TH} text-right`}>TOTAL WT (KG)</th>
              </tr>
            </thead>
            <tbody>
              {data.items.map((it, i) => (
                <tr key={i}>
                  <td className={`${TD} text-muted-3`}>{i + 1}</td>
                  <td className={TD}>
                    <div className="font-semibold text-[13px] font-sans">{it.desc}</div>
                    {it.detail && (
                      <div className="text-[10.5px] text-muted-3 mt-0.5">{it.detail}</div>
                    )}
                  </td>
                  <td className={`${TD} text-right`}>{fmt(it.pieces, 0)}</td>
                  <td className={`${TD} text-right text-muted-2`}>
                    {it.unitKg > 0 ? fmt(it.unitKg, 2) : "—"}
                  </td>
                  <td className={`${TD} text-right font-semibold`}>{fmt(it.totalKg, 1)}</td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <td className="px-2 py-3 border-t-2 border-ink" />
                <td className="px-2 py-3 border-t-2 border-ink font-mono text-[11px] tracking-[0.08em] font-semibold">
                  TOTAL — {data.items.length} ITEM{data.items.length === 1 ? "" : "S"}
                </td>
                <td className="px-2 py-3 border-t-2 border-ink text-right font-mono text-[13px] font-semibold">
                  {fmt(totals.pieces, 0)}
                </td>
                <td className="px-2 py-3 border-t-2 border-ink" />
                <td className="px-2 py-3 border-t-2 border-ink text-right font-mono text-[13px] font-semibold">
                  {fmt(totals.kg, 1)}
                  <div className="text-[10.5px] text-muted-2 font-normal">
                    {fmt(totals.kg / 1000, 3)} t
                  </div>
                </td>
              </tr>
            </tfoot>
          </table>
        </div>

        <div className="px-6 py-2.5 border-t border-ink font-mono text-[9.5px] tracking-[0.05em] text-muted-3">
          WEIGHTS COMPUTED PER IS/ASTM/JIS/EN/GB STANDARD DENSITIES · RATES AND TERMS ARE
          BETWEEN BUYER AND SELLER · VERIFY AGAINST WEIGHBRIDGE BEFORE DISPATCH
        </div>
      </div>

      <div className="border border-rule border-t-0 bg-[#FFFFFF] px-6 py-4 flex items-center justify-between gap-4 flex-wrap">
        <p className="text-[13px] text-muted-2 max-w-[480px]">
          These weights were computed with SteelMath’s free calculators. Re-run
          any line yourself, or start your own quotation — no signup.
        </p>
        <div className="flex gap-2.5 flex-wrap">
          <Link href="/calculator" className="btn-glow inline-block px-5 py-2.5 no-underline text-[12.5px] font-semibold">
            Recalculate →
          </Link>
          <Link
            href="/quote"
            className="inline-block px-5 py-2.5 no-underline text-[12.5px] font-semibold border border-rule text-ink hover:border-ink transition-colors"
          >
            Build your own quote
          </Link>
        </div>
      </div>
    </div>
  );
}
