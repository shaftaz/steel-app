"use client";

import { useState } from "react";
import {
  InstrumentShell,
  ResultPanel,
  Field,
  SelectField,
  ModeTab,
  ShowMaths,
  fmt,
  LABEL_CLS,
  Stat,
} from "@/components/instrument";

const MATERIALS = [
  { value: "hms1", label: "HMS 1" },
  { value: "hms2", label: "HMS 2" },
  { value: "hms8020", label: "HMS 80:20 Blend" },
  { value: "shredded", label: "Shredded" },
  { value: "busheling", label: "#1 Busheling" },
  { value: "plate", label: "Plate & Structural" },
  { value: "turnings_loose", label: "Turnings (Loose)" },
  { value: "turnings_briq", label: "Turnings (Briquetted)" },
  { value: "cast_iron", label: "Cast Iron" },
  { value: "sponge_iron", label: "Sponge Iron (DRI)" },
  { value: "pig_iron", label: "Pig Iron" },
  { value: "returns", label: "In-House Returns" },
];

const YIELD_RATES: Record<string, Record<string, { low: number; mid: number; high: number }>> = {
  induction_furnace: {
    hms1: { low: 90, mid: 91.5, high: 93 },
    hms2: { low: 88, mid: 89.5, high: 91 },
    hms8020: { low: 89.6, mid: 91.1, high: 92.6 },
    shredded: { low: 91, mid: 92, high: 93 },
    busheling: { low: 92, mid: 93.5, high: 95 },
    plate: { low: 91, mid: 92.5, high: 94 },
    turnings_loose: { low: 82, mid: 84.5, high: 87 },
    turnings_briq: { low: 85, mid: 87.5, high: 90 },
    cast_iron: { low: 85, mid: 86.5, high: 88 },
    sponge_iron: { low: 82, mid: 85, high: 88 },
    pig_iron: { low: 93, mid: 95, high: 97 },
    returns: { low: 95, mid: 96.5, high: 98 },
  },
  eaf: {
    hms1: { low: 89, mid: 91, high: 93 },
    hms2: { low: 87, mid: 89, high: 91 },
    hms8020: { low: 88.6, mid: 90.6, high: 92.6 },
    shredded: { low: 90, mid: 91.5, high: 93 },
    busheling: { low: 91, mid: 93, high: 95 },
    plate: { low: 90, mid: 92, high: 94 },
    turnings_loose: { low: 80, mid: 83, high: 86 },
    turnings_briq: { low: 84, mid: 86.5, high: 89 },
    cast_iron: { low: 84, mid: 86, high: 88 },
    sponge_iron: { low: 80, mid: 83, high: 86 },
    pig_iron: { low: 92, mid: 94.5, high: 97 },
    returns: { low: 94, mid: 96, high: 98 },
  },
};

interface ChargeRow {
  material: string;
  qty: string;
  price: string;
}

export default function ScrapYieldCalc() {
  const [furnace, setFurnace] = useState<"induction_furnace" | "eaf">("induction_furnace");
  const [rows, setRows] = useState<ChargeRow[]>([{ material: "hms1", qty: "10", price: "" }]);
  const [showElectricity, setShowElectricity] = useState(false);
  const [elecRate, setElecRate] = useState("");
  const [elecConsumption, setElecConsumption] = useState("625");

  function handleFurnaceToggle(type: "induction_furnace" | "eaf") {
    setFurnace(type);
    setElecConsumption(type === "induction_furnace" ? "625" : "450");
  }

  function updateRow(index: number, field: keyof ChargeRow, value: string) {
    setRows((prev) => prev.map((r, i) => (i === index ? { ...r, [field]: value } : r)));
  }

  function addRow() {
    setRows((prev) => [...prev, { material: "hms1", qty: "", price: "" }]);
  }

  function removeRow(index: number) {
    setRows((prev) => prev.filter((_, i) => i !== index));
  }

  // ---- Instant recalc (same maths as before, derived every render) ----
  const yieldTable = YIELD_RATES[furnace];
  let totalCharge = 0;
  let weightedSumMid = 0;
  let weightedSumLow = 0;
  let weightedSumHigh = 0;
  let totalCost = 0;
  let hasCost = false;
  const materialYields: { label: string; qty: number; mid: number }[] = [];

  for (const row of rows) {
    const qty = parseFloat(row.qty) || 0;
    if (qty <= 0) continue;
    const rates = yieldTable[row.material];
    if (!rates) continue;

    totalCharge += qty;
    weightedSumMid += qty * rates.mid;
    weightedSumLow += qty * rates.low;
    weightedSumHigh += qty * rates.high;

    const label = MATERIALS.find((m) => m.value === row.material)?.label || row.material;
    materialYields.push({ label, qty, mid: rates.mid });

    const price = parseFloat(row.price) || 0;
    if (price > 0) {
      totalCost += qty * price;
      hasCost = true;
    }
  }

  const hasCharge = totalCharge > 0;
  const weightedYieldMid = hasCharge ? weightedSumMid / totalCharge : 0;
  const weightedYieldLow = hasCharge ? weightedSumLow / totalCharge : 0;
  const weightedYieldHigh = hasCharge ? weightedSumHigh / totalCharge : 0;
  const liquidSteelMid = (totalCharge * weightedYieldMid) / 100;
  const liquidSteelLow = (totalCharge * weightedYieldLow) / 100;
  const liquidSteelHigh = (totalCharge * weightedYieldHigh) / 100;
  const totalLoss = totalCharge - liquidSteelMid;
  const slagLoss = totalLoss * 0.65;
  const fumesLoss = totalLoss * 0.35;

  let totalMaterialCost: number | null = null;
  let effectiveCostPerTonne: number | null = null;
  let electricityCostPerTonne: number | null = null;
  let totalMeltCostPerTonne: number | null = null;

  if (hasCharge && hasCost) {
    totalMaterialCost = totalCost;
    effectiveCostPerTonne = totalCost / liquidSteelMid;
  }

  const eRate = parseFloat(elecRate) || 0;
  const eCons = parseFloat(elecConsumption) || 0;
  if (showElectricity && eRate > 0 && eCons > 0) {
    electricityCostPerTonne = eRate * eCons;
    if (effectiveCostPerTonne !== null) {
      totalMeltCostPerTonne = effectiveCostPerTonne + electricityCostPerTonne;
    }
  }

  const furnaceLabel = furnace === "induction_furnace" ? "IF" : "EAF";

  const stats: Stat[] = [
    {
      label: "WEIGHTED AVG YIELD",
      value: hasCharge ? `${weightedYieldMid.toFixed(1)}%` : "—",
      accent: true,
    },
    { label: "TOTAL CHARGE", value: hasCharge ? `${fmt(totalCharge, 2)} MT` : "—" },
    {
      label: hasCharge
        ? `YIELD RANGE — ${weightedYieldLow.toFixed(1)}–${weightedYieldHigh.toFixed(1)}%`
        : "YIELD RANGE",
      value: hasCharge ? `${fmt(liquidSteelLow, 2)}–${fmt(liquidSteelHigh, 2)} MT` : "—",
    },
    { label: "PROCESS LOSSES", value: hasCharge ? `${fmt(totalLoss, 2)} MT` : "—" },
  ];
  if (totalMaterialCost !== null) {
    stats.push(
      { label: "TOTAL MATERIAL COST", value: fmt(totalMaterialCost, 2) },
      { label: "COST / T LIQUID STEEL", value: fmt(effectiveCostPerTonne!, 2) }
    );
  }
  if (electricityCostPerTonne !== null) {
    stats.push({ label: "ELECTRICITY COST / T", value: fmt(electricityCostPerTonne, 2) });
  }
  if (totalMeltCostPerTonne !== null) {
    stats.push({
      label: "TOTAL MELT COST / T",
      value: fmt(totalMeltCostPerTonne, 2),
      accent: true,
    });
  }

  const copyText = hasCharge
    ? `Scrap yield (${furnaceLabel}) — ${fmt(totalCharge, 2)} MT charge · ${weightedYieldMid.toFixed(1)}% yield → ${fmt(liquidSteelMid, 2)} MT liquid steel (${fmt(liquidSteelLow, 2)}–${fmt(liquidSteelHigh, 2)} MT)${totalMeltCostPerTonne !== null ? ` · melt cost ${fmt(totalMeltCostPerTonne, 2)}/t` : effectiveCostPerTonne !== null ? ` · ${fmt(effectiveCostPerTonne, 2)}/t liquid` : ""} — via steelmath.com`
    : "Scrap yield calculator — via steelmath.com";

  return (
    <div>
      <InstrumentShell
        header={
          <div className="flex border-b border-rule">
            <ModeTab
              active={furnace === "induction_furnace"}
              onClick={() => handleFurnaceToggle("induction_furnace")}
            >
              Induction Furnace (IF)
            </ModeTab>
            <ModeTab active={furnace === "eaf"} onClick={() => handleFurnaceToggle("eaf")}>
              Electric Arc Furnace (EAF)
            </ModeTab>
          </div>
        }
        inputs={
          <>
            <div className="flex flex-col gap-1.5">
              <span className={LABEL_CLS}>CHARGE MIX</span>
              <div className="flex flex-col gap-3">
                {rows.map((row, i) => (
                  <div key={i} className="grid grid-cols-[1fr_0.6fr_0.8fr_auto] gap-2 items-end">
                    <SelectField
                      label="MATERIAL"
                      value={row.material}
                      onChange={(v) => updateRow(i, "material", v)}
                    >
                      {MATERIALS.map((m) => (
                        <option key={m.value} value={m.value}>
                          {m.label}
                        </option>
                      ))}
                    </SelectField>
                    <Field
                      label="QTY (MT)"
                      value={row.qty}
                      onChange={(v) => updateRow(i, "qty", v)}
                      placeholder="MT"
                    />
                    <Field
                      label="PRICE / MT (OPT)"
                      value={row.price}
                      onChange={(v) => updateRow(i, "price", v)}
                      placeholder="For cost analysis"
                    />
                    <button
                      onClick={() => removeRow(i)}
                      disabled={rows.length <= 1}
                      aria-label="Remove material row"
                      className="font-mono text-[13px] border border-input-border text-muted px-3 py-2.5 cursor-pointer hover:border-ink hover:text-ink disabled:opacity-30 disabled:cursor-not-allowed"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
              <button
                onClick={addRow}
                className="self-start font-mono text-[11px] tracking-[0.06em] text-accent hover:text-ink cursor-pointer mt-1"
              >
                + ADD MATERIAL
              </button>
            </div>

            {!showElectricity ? (
              <button
                onClick={() => setShowElectricity(true)}
                aria-pressed={false}
                className="self-start font-mono text-[11px] tracking-[0.06em] text-accent hover:text-ink cursor-pointer"
              >
                + ADD ELECTRICITY COST
              </button>
            ) : (
              <div className="border border-rule p-3.5 flex flex-col gap-3">
                <div className="flex items-baseline justify-between">
                  <span className={LABEL_CLS}>ELECTRICITY COST</span>
                  <button
                    onClick={() => setShowElectricity(false)}
                    aria-pressed={true}
                    className="font-mono text-[10.5px] tracking-[0.06em] text-muted-3 hover:text-ink cursor-pointer"
                  >
                    REMOVE
                  </button>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <Field
                    label="RATE (PER KWH)"
                    value={elecRate}
                    onChange={setElecRate}
                    placeholder="e.g. 8"
                  />
                  <Field
                    label="CONSUMPTION (KWH/T)"
                    value={elecConsumption}
                    onChange={setElecConsumption}
                  />
                </div>
              </div>
            )}

            <ShowMaths
              lines={[
                hasCharge
                  ? `Weighted yield = Σ(qty × yield) ÷ Σqty = ${weightedYieldMid.toFixed(1)}%`
                  : "Weighted yield = Σ(qty × yield) ÷ Σqty",
                hasCharge
                  ? `Liquid steel = ${fmt(totalCharge, 2)} MT × ${weightedYieldMid.toFixed(1)}% = ${fmt(liquidSteelMid, 2)} MT`
                  : "Liquid steel = charge × weighted yield",
                `Loss split — slag est. 65% (${hasCharge ? fmt(slagLoss, 2) : "—"} MT) · fumes & oxidation 35% (${hasCharge ? fmt(fumesLoss, 2) : "—"} MT)`,
              ]}
              source={`BASIS: TYPICAL ${furnaceLabel} YIELD RANGES BY SCRAP GRADE · SLAG 65% / FUMES 35% OF LOSS (EST.) · LAST VERIFIED 18 JUL 2026`}
            />
          </>
        }
        result={
          <ResultPanel
            context={furnace === "induction_furnace" ? "INDUCTION FURNACE" : "ELECTRIC ARC FURNACE"}
            headlineLabel="EXPECTED LIQUID STEEL — MT"
            headlineValue={hasCharge ? fmt(liquidSteelMid, 2) : "—"}
            subline={
              hasCharge
                ? `range ${fmt(liquidSteelLow, 2)} – ${fmt(liquidSteelHigh, 2)} MT at ${weightedYieldLow.toFixed(1)}–${weightedYieldHigh.toFixed(1)}% yield`
                : "enter charge quantities to see yield"
            }
            stats={stats}
            formulaLine={
              hasCharge
                ? `${fmt(totalCharge, 2)} MT × ${weightedYieldMid.toFixed(1)}% = ${fmt(liquidSteelMid, 2)} MT liquid steel`
                : undefined
            }
            copyText={copyText}
            shareUrl="https://steelmath.com/calculators/scrap-yield"
          />
        }
      />

      {/* Individual material yields */}
      {materialYields.length > 0 && (
        <div className="border border-rule border-t-0 bg-[#FFFFFF]">
          <div className="px-5 py-3.5 border-b border-rule-faint">
            <span className="font-mono text-[10.5px] tracking-[0.12em] text-muted-3 uppercase">
              INDIVIDUAL MATERIAL YIELDS — {furnaceLabel} MID ESTIMATE
            </span>
          </div>
          <div className="px-5 py-2">
            {materialYields.map((m, i) => (
              <div
                key={i}
                className="flex items-baseline justify-between gap-3 py-2 border-b border-rule-faint last:border-b-0"
              >
                <span className="font-mono text-[11.5px] text-muted">
                  {m.label} — {fmt(m.qty, 2)} MT
                </span>
                <span className="font-mono text-[12.5px] text-ink">{m.mid.toFixed(1)}%</span>
              </div>
            ))}
            {hasCharge && (
              <>
                <div className="flex items-baseline justify-between gap-3 py-2 border-t border-rule">
                  <span className="font-mono text-[11.5px] text-muted">SLAG (EST. 65%)</span>
                  <span className="font-mono text-[12.5px] text-ink">{fmt(slagLoss, 2)} MT</span>
                </div>
                <div className="flex items-baseline justify-between gap-3 py-2 border-t border-rule-faint">
                  <span className="font-mono text-[11.5px] text-muted">
                    FUMES &amp; OXIDATION (35%)
                  </span>
                  <span className="font-mono text-[12.5px] text-ink">{fmt(fumesLoss, 2)} MT</span>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
