"use client";

import { useState } from "react";
import { HARDNESS_TABLE, type HardnessEntry } from "@/lib/calculators/materials";
import {
  InstrumentShell,
  ResultPanel,
  Field,
  ModeTab,
  ShowMaths,
} from "@/components/instrument";

type Scale = "brinell" | "rockwellC" | "rockwellB" | "vickers";

const SCALES: { value: Scale; label: string; unit: string; example: string }[] = [
  { value: "brinell", label: "Brinell (HB)", unit: "HB", example: "300" },
  { value: "rockwellC", label: "Rockwell C (HRC)", unit: "HRC", example: "45" },
  { value: "rockwellB", label: "Rockwell B (HRB)", unit: "HRB", example: "85" },
  { value: "vickers", label: "Vickers (HV)", unit: "HV", example: "350" },
];

function findClosest(scale: Scale, value: number): HardnessEntry | null {
  const filtered = HARDNESS_TABLE.filter((e) => e[scale] !== null);
  if (filtered.length === 0) return null;

  let best = filtered[0];
  let bestDiff = Math.abs((best[scale] as number) - value);
  for (const entry of filtered) {
    const diff = Math.abs((entry[scale] as number) - value);
    if (diff < bestDiff) {
      best = entry;
      bestDiff = diff;
    }
  }
  return best;
}

export default function HardnessCalc() {
  const [scale, setScale] = useState<Scale>("brinell");
  const [input, setInput] = useState("300");

  const scaleInfo = SCALES.find((s) => s.value === scale)!;
  const val = parseFloat(input);
  const result = isNaN(val) || val <= 0 ? null : findClosest(scale, val);

  const copyText = result
    ? `Hardness ≈ HB ${result.brinell} · HRC ${result.rockwellC ?? "—"} · HRB ${result.rockwellB ?? "—"} · HV ${result.vickers} · ~${result.tensileApproxMPa} MPa (closest match to ${val} ${scaleInfo.unit}) — via steelmath.com`
    : "Hardness conversion — enter a value — via steelmath.com";

  return (
    <InstrumentShell
      header={
        <div className="flex flex-wrap border-b border-rule">
          {SCALES.map((s) => (
            <ModeTab
              key={s.value}
              active={scale === s.value}
              onClick={() => {
                setScale(s.value);
                setInput(s.example);
              }}
            >
              {s.label}
            </ModeTab>
          ))}
        </div>
      }
      inputs={
        <>
          <Field
            label={`VALUE (${scaleInfo.unit})`}
            value={input}
            onChange={setInput}
            step={1}
            placeholder={`e.g. ${scaleInfo.example}`}
          />
          <p className="font-mono text-[11.5px] text-muted-3">
            Conversion result is the closest match in the reference table — hardness
            scale conversions are approximate.
          </p>
          <ShowMaths
            lines={[
              `Nearest-row lookup: table row with the smallest |row ${scaleInfo.unit} − ${isNaN(val) ? "input" : val}|`,
              "There is no exact algebraic relation between hardness scales — table values are approximate correlations.",
              "Tensile strength (MPa) is an approximation for steel only.",
            ]}
            source="SOURCE: APPROXIMATE CONVERSION TABLE · LAST VERIFIED 18 JUL 2026"
          />
        </>
      }
      result={
        <ResultPanel
          kicker="RESULT — CLOSEST MATCH, RECALCULATES AS YOU TYPE"
          context={scaleInfo.label.toUpperCase()}
          headlineLabel={
            result
              ? `CLOSEST MATCH — ${scaleInfo.unit}`
              : "CLOSEST MATCH"
          }
          headlineValue={result ? `${result[scale]}` : "—"}
          subline={
            result
              ? `nearest table row to ${val} ${scaleInfo.unit}`
              : "Enter a hardness value greater than zero."
          }
          stats={
            result
              ? [
                  { label: "BRINELL (HB)", value: `${result.brinell}` },
                  {
                    label: "ROCKWELL C (HRC)",
                    value: result.rockwellC !== null ? `${result.rockwellC}` : "—",
                  },
                  {
                    label: "ROCKWELL B (HRB)",
                    value: result.rockwellB !== null ? `${result.rockwellB}` : "—",
                  },
                  { label: "VICKERS (HV)", value: `${result.vickers}` },
                  {
                    label: "TENSILE ≈ (MPA)",
                    value: `${result.tensileApproxMPa}`,
                    accent: true,
                  },
                ]
              : undefined
          }
          formulaLine={
            result
              ? `closest row to ${val} ${scaleInfo.unit} — approximate conversion`
              : undefined
          }
          copyText={copyText}
          shareUrl="https://steelmath.com/calculators/hardness-conversion"
        />
      }
    />
  );
}
