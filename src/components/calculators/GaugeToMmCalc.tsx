"use client";

import { useState } from "react";
import { GAUGE_TABLE } from "@/lib/calculators/materials";
import {
  InstrumentShell,
  ResultPanel,
  Field,
  ShowMaths,
} from "@/components/instrument";

export default function GaugeToMmCalc() {
  const [gauge, setGauge] = useState("18");

  const g = parseInt(gauge, 10);
  const result = GAUGE_TABLE.find((e) => e.gauge === g) ?? null;

  const copyText = result
    ? `Gauge ${result.gauge} = ${result.mm} mm · ${result.inches}″ · ${result.kgPerSqm} kg/m² (MS) — via steelmath.com`
    : "Gauge not found — enter 7–30 — via steelmath.com";

  return (
    <div>
      <InstrumentShell
        inputs={
          <>
            <Field
              label="GAUGE NUMBER (7–30)"
              value={gauge}
              onChange={setGauge}
              step={1}
              placeholder="e.g. 18"
            />
            {gauge !== "" && !result && (
              <p className="font-mono text-[11.5px] text-muted border border-rule bg-paper px-3 py-2.5">
                Gauge number not found. Enter a value between 7 and 30.
              </p>
            )}
            <ShowMaths
              lines={[
                "Direct table lookup — SWG number → mm, inches, kg/m²",
                "Sheet weight: kg/m² = thickness (mm) × 7.85 (MS density)",
              ]}
              source="SOURCE: IS 1956 SWG TABLE · LAST VERIFIED 18 JUL 2026"
            />
          </>
        }
        result={
          <ResultPanel
            context="SWG SHEET / WIRE GAUGE"
            headlineLabel={
              result
                ? `GAUGE ${result.gauge} — THICKNESS (MM)`
                : "THICKNESS (MM)"
            }
            headlineValue={result ? `${result.mm}` : "—"}
            subline={
              result
                ? `${result.inches}″ · ${result.kgPerSqm} kg/m² (MS)`
                : "Enter a gauge number between 7 and 30."
            }
            stats={
              result
                ? [
                    { label: "INCHES", value: `${result.inches}″` },
                    {
                      label: "SHEET WEIGHT — MS",
                      value: `${result.kgPerSqm} kg/m²`,
                      accent: true,
                    },
                  ]
                : undefined
            }
            formulaLine={
              result
                ? `SWG ${result.gauge} → ${result.mm} mm — table lookup`
                : undefined
            }
            copyText={copyText}
            shareUrl="https://steelmath.com/calculators/gauge-to-mm"
          />
        }
      />

      {/* Full SWG reference table — tap a row to load it */}
      <div className="border border-rule border-t-0 bg-[#FFFFFF]">
        <div className="px-5 py-3.5 border-b border-ink">
          <span className="font-mono text-[10.5px] tracking-[0.1em] text-muted-3 uppercase">
            SWG REFERENCE — GAUGE 7–30 · TAP A ROW TO LOAD
          </span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b border-ink">
                <th className="font-mono text-[10.5px] tracking-[0.1em] text-muted-3 uppercase font-normal text-left px-5 py-2.5">
                  Gauge
                </th>
                <th className="font-mono text-[10.5px] tracking-[0.1em] text-muted-3 uppercase font-normal text-right px-5 py-2.5">
                  MM
                </th>
                <th className="font-mono text-[10.5px] tracking-[0.1em] text-muted-3 uppercase font-normal text-right px-5 py-2.5">
                  Inches
                </th>
                <th className="font-mono text-[10.5px] tracking-[0.1em] text-muted-3 uppercase font-normal text-right px-5 py-2.5">
                  KG/M² (MS)
                </th>
              </tr>
            </thead>
            <tbody>
              {GAUGE_TABLE.map((e) => (
                <tr
                  key={e.gauge}
                  className={`border-b border-rule-faint ${
                    result?.gauge === e.gauge ? "bg-paper" : ""
                  }`}
                >
                  <td className="px-5 py-2">
                    <button
                      onClick={() => setGauge(String(e.gauge))}
                      aria-pressed={result?.gauge === e.gauge}
                      className="bg-transparent font-mono text-[12.5px] font-semibold text-ink cursor-pointer hover:text-accent text-left"
                    >
                      {e.gauge} g
                    </button>
                  </td>
                  <td className="font-mono text-[12.5px] text-ink text-right px-5 py-2">
                    {e.mm}
                  </td>
                  <td className="font-mono text-[12.5px] text-muted text-right px-5 py-2">
                    {e.inches}
                  </td>
                  <td className="font-mono text-[12.5px] text-muted text-right px-5 py-2">
                    {e.kgPerSqm}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
