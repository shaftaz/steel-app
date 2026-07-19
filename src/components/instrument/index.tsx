"use client";

import { ReactNode, useEffect, useState } from "react";

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

export function num(v: string) {
  const n = parseFloat(v);
  return isFinite(n) && n >= 0 ? n : 0;
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
}) {
  const [copied, setCopied] = useState(false);
  const [shared, setShared] = useState(false);

  const doCopy = (text: string, done: (v: boolean) => void) => {
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
      <div className="mt-auto grid grid-cols-3 border-t border-ink-border no-print">
        <button
          onClick={() => doCopy(copyText, setCopied)}
          className="bg-transparent border-r border-ink-border text-paper font-mono text-[11px] tracking-[0.06em] py-3 px-1.5 cursor-pointer hover:bg-panel-dark"
        >
          {copied ? "COPIED ✓" : "COPY RESULT"}
        </button>
        <button
          onClick={() =>
            doCopy(
              shareUrl ?? (typeof window !== "undefined" ? window.location.href : ""),
              setShared
            )
          }
          className="bg-transparent border-r border-ink-border text-paper font-mono text-[11px] tracking-[0.06em] py-3 px-1.5 cursor-pointer hover:bg-panel-dark"
        >
          {shared ? "LINK COPIED ✓" : "SHARE LINK"}
        </button>
        <button
          onClick={() => window.print()}
          className="bg-transparent text-paper font-mono text-[11px] tracking-[0.06em] py-3 px-1.5 cursor-pointer hover:bg-panel-dark"
        >
          DOWNLOAD PDF
        </button>
      </div>
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
