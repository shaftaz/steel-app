"use client";

import { ReactNode, useState } from "react";
import {
  InstrumentShell,
  ResultPanel,
  Field,
  SelectField,
  Chip,
  ModeTab,
  ShowMaths,
  fmt,
  LABEL_CLS,
  Stat,
} from "@/components/instrument";

function StepHeader({ step, title }: { step: number; title: string }) {
  return (
    <div className="flex items-baseline gap-2 border-t border-rule-faint pt-3 first:border-t-0 first:pt-0">
      <span className="font-mono text-[10.5px] text-accent">{step}</span>
      <span className={LABEL_CLS}>{title}</span>
    </div>
  );
}

function BreakdownRow({
  label,
  value,
  pct,
  strong,
  accent,
}: {
  label: ReactNode;
  value: string;
  pct?: string;
  strong?: boolean;
  accent?: boolean;
}) {
  return (
    <div
      className={`flex items-baseline justify-between gap-3 py-2 ${
        strong ? "border-t border-rule" : "border-b border-rule-faint"
      }`}
    >
      <span
        className={`font-mono text-[11.5px] ${strong ? "text-ink tracking-[0.06em]" : "text-muted"}`}
      >
        {label}
      </span>
      <span className="font-mono text-[12.5px] text-right whitespace-nowrap">
        <span className={accent ? "text-accent font-semibold" : strong ? "text-ink font-semibold" : "text-ink"}>
          {value}
        </span>
        {pct && <span className="text-muted-3"> ({pct})</span>}
      </span>
    </div>
  );
}

export default function ScrapProductionCostCalc() {
  // Step 1
  const [scrapPrice, setScrapPrice] = useState("38000");
  const [scrapYield, setScrapYield] = useState("91");

  // Step 2
  const [furnaceType, setFurnaceType] = useState<"IF" | "EAF">("IF");
  const [electricityRate, setElectricityRate] = useState("8");
  const [electricityConsumption, setElectricityConsumption] = useState("625");

  // Step 3
  const [ferroSiliconPrice, setFerroSiliconPrice] = useState("");
  const [ferroSiliconKg, setFerroSiliconKg] = useState("8");
  const [silicoManganesePrice, setSilicoManganesePrice] = useState("");
  const [silicoManganeseKg, setSilicoManganeseKg] = useState("10");
  const [carbonPrice, setCarbonPrice] = useState("");
  const [carbonKg, setCarbonKg] = useState("15");
  const [refractoryCost, setRefractoryCost] = useState("");
  const [otherConsumables, setOtherConsumables] = useState("");

  // Step 4
  const [finishedProduct, setFinishedProduct] = useState("Billet");
  const [rollingYield, setRollingYield] = useState("97");
  const [rollingConversionCost, setRollingConversionCost] = useState("");

  // Step 5
  const [labourCost, setLabourCost] = useState("");
  const [adminCost, setAdminCost] = useState("");
  const [financeCost, setFinanceCost] = useState("");
  const [transportCost, setTransportCost] = useState("");

  // Step 6
  const [sellingPrice, setSellingPrice] = useState("");

  const yieldChips = [85, 88, 90, 91, 93, 95];

  function handleFurnaceToggle(type: "IF" | "EAF") {
    setFurnaceType(type);
    setElectricityConsumption(type === "IF" ? "625" : "450");
  }

  // ---- Instant recalc (same maths as before, derived every render) ----
  const sp = parseFloat(scrapPrice) || 0;
  const sy = parseFloat(scrapYield) || 91;
  const er = parseFloat(electricityRate) || 0;
  const ec = parseFloat(electricityConsumption) || 0;
  const fsp = parseFloat(ferroSiliconPrice) || 0;
  const fsk = parseFloat(ferroSiliconKg) || 0;
  const smp = parseFloat(silicoManganesePrice) || 0;
  const smk = parseFloat(silicoManganeseKg) || 0;
  const cp = parseFloat(carbonPrice) || 0;
  const ck = parseFloat(carbonKg) || 0;
  const rc = parseFloat(refractoryCost) || 0;
  const oc = parseFloat(otherConsumables) || 0;
  const ry = parseFloat(rollingYield) || 97;
  const rcc = parseFloat(rollingConversionCost) || 0;
  const lc = parseFloat(labourCost) || 0;
  const ac = parseFloat(adminCost) || 0;
  const fc = parseFloat(financeCost) || 0;
  const tc = parseFloat(transportCost) || 0;
  const sellP = parseFloat(sellingPrice) || 0;

  const scrapConsumption = 1 / (sy / 100);
  const rawMaterialCost = sp * scrapConsumption;
  const electricityCost = er * ec;
  const ferroSiliconCost = fsp ? (fsp / 1000) * fsk : 0;
  const silicoManganeseCost = smp ? (smp / 1000) * smk : 0;
  const carbonCost = cp ? (cp / 1000) * ck : 0;
  const totalAlloys = ferroSiliconCost + silicoManganeseCost + carbonCost;
  const liquidSteelCost = rawMaterialCost + electricityCost + totalAlloys + rc + oc;
  const rollingYieldFactor = 1 / (ry / 100);
  const finishedProductCost = liquidSteelCost * rollingYieldFactor + rcc;
  const totalOverhead = lc + ac + fc + tc;
  const totalDeliveredCost = finishedProductCost + totalOverhead;

  const margin = sellP ? sellP - totalDeliveredCost : null;
  const marginPercent = sellP && margin !== null ? (margin / sellP) * 100 : null;
  const breakevenScrap = sellP
    ? ((sellP - totalOverhead - rcc - electricityCost - totalAlloys - rc - oc) /
        rollingYieldFactor) *
      (sy / 100)
    : null;

  const scrapYieldNum = parseFloat(scrapYield) || 0;
  const scrapConsumptionFactor = scrapYieldNum > 0 ? 1 / (scrapYieldNum / 100) : 0;
  const elecRatePreview = parseFloat(electricityRate) || 0;
  const electricityCostPreview = elecRatePreview * (parseFloat(electricityConsumption) || 0);

  function calcDeliveredForSensitivity(scrapMult: number, elecMult: number): number {
    const spS = (parseFloat(scrapPrice) || 0) * scrapMult;
    const syS = parseFloat(scrapYield) || 91;
    const erS = (parseFloat(electricityRate) || 0) * elecMult;
    const ecS = parseFloat(electricityConsumption) || 0;
    const fspS = parseFloat(ferroSiliconPrice) || 0;
    const fskS = parseFloat(ferroSiliconKg) || 0;
    const smpS = parseFloat(silicoManganesePrice) || 0;
    const smkS = parseFloat(silicoManganeseKg) || 0;
    const cpS = parseFloat(carbonPrice) || 0;
    const ckS = parseFloat(carbonKg) || 0;
    const rcS = parseFloat(refractoryCost) || 0;
    const ocS = parseFloat(otherConsumables) || 0;
    const ryS = parseFloat(rollingYield) || 97;
    const rccS = parseFloat(rollingConversionCost) || 0;
    const lcS = parseFloat(labourCost) || 0;
    const acS = parseFloat(adminCost) || 0;
    const fcS = parseFloat(financeCost) || 0;
    const tcS = parseFloat(transportCost) || 0;

    const scrapCons = 1 / (syS / 100);
    const rawMat = spS * scrapCons;
    const elecCost = erS * ecS;
    const fsCost = fspS ? (fspS / 1000) * fskS : 0;
    const smCost = smpS ? (smpS / 1000) * smkS : 0;
    const cCost = cpS ? (cpS / 1000) * ckS : 0;
    const alloys = fsCost + smCost + cCost;
    const liquid = rawMat + elecCost + alloys + rcS + ocS;
    const ryf = 1 / (ryS / 100);
    const finished = liquid * ryf + rccS;
    const overhead = lcS + acS + fcS + tcS;
    return finished + overhead;
  }

  const pct = (amount: number) =>
    `${(totalDeliveredCost > 0 ? (amount / totalDeliveredCost) * 100 : 0).toFixed(1)}%`;

  const stats: Stat[] = [
    { label: "LIQUID STEEL COST / MT", value: fmt(liquidSteelCost, 2) },
    { label: "FINISHED PRODUCT COST / MT", value: fmt(finishedProductCost, 2) },
  ];
  if (margin !== null) {
    stats.push(
      {
        label: `MARGIN / MT (${marginPercent!.toFixed(1)}%)`,
        value: fmt(margin, 2),
        positive: margin >= 0,
      },
      { label: "BREAKEVEN SCRAP PRICE / MT", value: fmt(breakevenScrap!, 2) }
    );
  }

  const copyText = `Scrap-to-steel cost (${finishedProduct}) — liquid ${fmt(liquidSteelCost, 2)}/MT · finished ${fmt(finishedProductCost, 2)}/MT · delivered ${fmt(totalDeliveredCost, 2)}/MT${margin !== null ? ` · margin ${fmt(margin, 2)}/MT (${marginPercent!.toFixed(1)}%)` : ""} — via steelmath.com`;

  return (
    <div>
      <InstrumentShell
        inputs={
          <>
            {/* Step 1 */}
            <StepHeader step={1} title="RAW MATERIAL & YIELD" />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Field
                label="SCRAP PRICE (PER MT)"
                value={scrapPrice}
                onChange={setScrapPrice}
                placeholder="e.g. 350 $/MT or 38,000 ₹/MT"
              />
              <div className="flex flex-col gap-1.5">
                <Field label="SCRAP YIELD (%)" value={scrapYield} onChange={setScrapYield} />
                <div className="flex flex-wrap gap-1.5">
                  {yieldChips.map((y) => (
                    <Chip
                      key={y}
                      active={parseFloat(scrapYield) === y}
                      onClick={() => setScrapYield(String(y))}
                    >
                      {y}%
                    </Chip>
                  ))}
                </div>
              </div>
            </div>
            {scrapYieldNum > 0 && (
              <div className="font-mono text-[11px] text-muted-3">
                Scrap consumption factor:{" "}
                <span className="text-muted">{scrapConsumptionFactor.toFixed(3)}</span> MT scrap
                per MT liquid steel
              </div>
            )}

            {/* Step 2 */}
            <StepHeader step={2} title="ENERGY" />
            <div className="flex flex-col gap-1.5">
              <span className={LABEL_CLS}>FURNACE TYPE</span>
              <div className="flex border border-input-border w-fit">
                {(["IF", "EAF"] as const).map((t) => (
                  <ModeTab key={t} active={furnaceType === t} onClick={() => handleFurnaceToggle(t)}>
                    {t}
                  </ModeTab>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Field
                label="ELECTRICITY RATE (PER KWH)"
                value={electricityRate}
                onChange={setElectricityRate}
                placeholder="Enter your rate"
              />
              <Field
                label="CONSUMPTION (KWH/T)"
                value={electricityConsumption}
                onChange={setElectricityConsumption}
              />
            </div>
            {elecRatePreview > 0 && (
              <div className="font-mono text-[11px] text-muted-3">
                Electricity cost per tonne:{" "}
                <span className="text-muted">{fmt(electricityCostPreview, 2)}</span>
              </div>
            )}

            {/* Step 3 */}
            <StepHeader step={3} title="ALLOYS & CONSUMABLES" />
            <div className="grid grid-cols-2 gap-3">
              <Field
                label="FERRO SILICON PRICE (PER MT)"
                value={ferroSiliconPrice}
                onChange={setFerroSiliconPrice}
                placeholder="Price per MT"
              />
              <Field
                label="CONSUMPTION (KG/T)"
                value={ferroSiliconKg}
                onChange={setFerroSiliconKg}
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <Field
                label="SILICO MANGANESE PRICE (PER MT)"
                value={silicoManganesePrice}
                onChange={setSilicoManganesePrice}
                placeholder="Price per MT"
              />
              <Field
                label="CONSUMPTION (KG/T)"
                value={silicoManganeseKg}
                onChange={setSilicoManganeseKg}
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <Field
                label="CARBON (ANTHRACITE/ELECTRODE) PRICE (PER MT)"
                value={carbonPrice}
                onChange={setCarbonPrice}
                placeholder="Price per MT"
              />
              <Field label="CONSUMPTION (KG/T)" value={carbonKg} onChange={setCarbonKg} />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Field
                label="REFRACTORY/LINING (PER T LIQUID STEEL)"
                value={refractoryCost}
                onChange={setRefractoryCost}
                placeholder="e.g. 300"
              />
              <Field
                label="OTHER CONSUMABLES (PER T)"
                value={otherConsumables}
                onChange={setOtherConsumables}
                placeholder="e.g. 200"
              />
            </div>
            <div className="font-mono text-[11px] text-muted-3">
              Leave price blank to exclude from calculation
            </div>

            {/* Step 4 */}
            <StepHeader step={4} title="CONVERSION (ROLLING/FINISHING)" />
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <SelectField
                label="FINISHED PRODUCT"
                value={finishedProduct}
                onChange={setFinishedProduct}
              >
                {["Billet", "TMT Bar", "Wire Rod", "Structural", "Flat Bar"].map((p) => (
                  <option key={p} value={p}>
                    {p}
                  </option>
                ))}
              </SelectField>
              <Field label="ROLLING YIELD (%)" value={rollingYield} onChange={setRollingYield} />
              <Field
                label="ROLLING/CONVERSION COST (PER T)"
                value={rollingConversionCost}
                onChange={setRollingConversionCost}
                placeholder="e.g. 1500"
              />
            </div>

            {/* Step 5 */}
            <StepHeader step={5} title="OVERHEADS (ALL OPTIONAL)" />
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <Field
                label="LABOUR (PER T)"
                value={labourCost}
                onChange={setLabourCost}
                placeholder="e.g. 500"
              />
              <Field
                label="ADMIN OVERHEAD (PER T)"
                value={adminCost}
                onChange={setAdminCost}
                placeholder="e.g. 300"
              />
              <Field
                label="FINANCE/INTEREST (PER T)"
                value={financeCost}
                onChange={setFinanceCost}
                placeholder="e.g. 400"
              />
              <Field
                label="TRANSPORT (PER T)"
                value={transportCost}
                onChange={setTransportCost}
                placeholder="e.g. 500"
              />
            </div>

            {/* Step 6 */}
            <StepHeader step={6} title="SELLING PRICE (OPTIONAL)" />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Field
                label="SELLING PRICE OF FINISHED PRODUCT (PER MT)"
                value={sellingPrice}
                onChange={setSellingPrice}
                placeholder="Optional - for margin analysis"
              />
            </div>

            <ShowMaths
              lines={[
                `Raw material = ${fmt(sp, 2)} × ${scrapConsumption.toFixed(3)} = ${fmt(rawMaterialCost, 2)} /t liquid`,
                `Liquid steel = raw ${fmt(rawMaterialCost, 2)} + electricity ${fmt(electricityCost, 2)} + alloys ${fmt(totalAlloys, 2)} + refractory ${fmt(rc, 2)} + other ${fmt(oc, 2)} = ${fmt(liquidSteelCost, 2)}`,
                `Finished = liquid × ${rollingYieldFactor.toFixed(3)} + conversion ${fmt(rcc, 2)} = ${fmt(finishedProductCost, 2)}`,
                `Delivered = finished + overheads ${fmt(totalOverhead, 2)} = ${fmt(totalDeliveredCost, 2)}`,
              ]}
              source="BASIS: YOUR INPUTS · TYPICAL IF 625 / EAF 450 KWH/T · LEAVE PRICE BLANK TO EXCLUDE · LAST VERIFIED 18 JUL 2026"
            />
          </>
        }
        result={
          <ResultPanel
            context={`${furnaceType} · ${finishedProduct.toUpperCase()}`}
            headlineLabel="TOTAL DELIVERED COST — PER MT"
            headlineValue={fmt(totalDeliveredCost, 0)}
            subline={`exact ${fmt(totalDeliveredCost, 2)} /MT · scrap ${scrapConsumption.toFixed(3)} MT per MT liquid · rolling factor ${rollingYieldFactor.toFixed(3)}`}
            stats={stats}
            formulaLine={`liquid ${fmt(liquidSteelCost, 2)} × ${rollingYieldFactor.toFixed(3)} + ${fmt(rcc, 2)} + overheads ${fmt(totalOverhead, 2)} = ${fmt(totalDeliveredCost, 2)}`}
            copyText={copyText}
            shareUrl="https://steelmath.com/calculators/scrap-production-cost"
          />
        }
      />

      {/* Cost waterfall */}
      <div className="border border-rule border-t-0 bg-[#FFFFFF]">
        <div className="px-5 py-3.5 border-b border-rule-faint">
          <span className="font-mono text-[10.5px] tracking-[0.12em] text-muted-3 uppercase">
            COST WATERFALL — SHARE OF TOTAL DELIVERED COST
          </span>
        </div>
        <div className="px-5 py-2">
          <BreakdownRow
            label="RAW MATERIAL"
            value={fmt(rawMaterialCost, 2)}
            pct={pct(rawMaterialCost)}
          />
          <BreakdownRow
            label="ELECTRICITY"
            value={fmt(electricityCost, 2)}
            pct={pct(electricityCost)}
          />
          <BreakdownRow label="FERRO ALLOYS" value={fmt(totalAlloys, 2)} pct={pct(totalAlloys)} />
          <BreakdownRow label="CARBON & CONSUMABLES" value={fmt(0, 2)} pct={pct(0)} />
          <BreakdownRow
            label="REFRACTORY & OTHER"
            value={fmt(rc + oc, 2)}
            pct={pct(rc + oc)}
          />
          <BreakdownRow label="LIQUID STEEL COST" value={fmt(liquidSteelCost, 2)} strong />
          <BreakdownRow
            label="ROLLING CONVERSION"
            value={fmt(rcc, 2)}
            pct={pct(rcc)}
          />
          <BreakdownRow label="FINISHED PRODUCT COST" value={fmt(finishedProductCost, 2)} strong />
          <BreakdownRow
            label="LABOUR + OVERHEAD"
            value={fmt(lc + ac, 2)}
            pct={pct(lc + ac)}
          />
          <BreakdownRow
            label="FINANCE + TRANSPORT"
            value={fmt(fc + tc, 2)}
            pct={pct(fc + tc)}
          />
          <BreakdownRow
            label="TOTAL DELIVERED COST"
            value={fmt(totalDeliveredCost, 2)}
            strong
            accent
          />
        </div>
      </div>

      {/* Sensitivity matrix */}
      <div className="border border-rule border-t-0 bg-[#FFFFFF]">
        <div className="px-5 py-3.5 border-b border-rule-faint">
          <span className="font-mono text-[10.5px] tracking-[0.12em] text-muted-3 uppercase">
            SENSITIVITY MATRIX — TOTAL DELIVERED COST
          </span>
        </div>
        <div className="px-5 py-3 overflow-x-auto">
          <table className="w-full font-mono text-xs">
            <thead>
              <tr>
                <th className="text-left p-1.5"></th>
                {["ELEC −20%", "ELEC BASE", "ELEC +20%"].map((h) => (
                  <th
                    key={h}
                    className="p-1.5 text-center font-normal text-[10.5px] tracking-[0.08em] text-muted-3"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                { label: "SCRAP −10%", scrapMult: 0.9 },
                { label: "SCRAP BASE", scrapMult: 1.0 },
                { label: "SCRAP +10%", scrapMult: 1.1 },
              ].map((row) => (
                <tr key={row.label}>
                  <td className="p-1.5 whitespace-nowrap text-[10.5px] tracking-[0.08em] text-muted-3">
                    {row.label}
                  </td>
                  {[0.8, 1.0, 1.2].map((elecMult) => {
                    const val = calcDeliveredForSensitivity(row.scrapMult, elecMult);
                    const isBase = row.scrapMult === 1.0 && elecMult === 1.0;
                    return (
                      <td
                        key={elecMult}
                        className={`p-1.5 text-center border border-rule-faint ${
                          isBase ? "text-accent font-semibold border-ink" : "text-ink"
                        }`}
                      >
                        {fmt(val, 2)}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
