"use client";

import { useState } from "react";

interface CostBreakdown {
  rawMaterialCost: number;
  electricityCost: number;
  ferroSiliconCost: number;
  silicoManganeseCost: number;
  carbonCost: number;
  totalAlloys: number;
  refractoryCost: number;
  otherConsumables: number;
  liquidSteelCost: number;
  rollingConversionCost: number;
  finishedProductCost: number;
  labourCost: number;
  adminCost: number;
  financeCost: number;
  transportCost: number;
  totalOverhead: number;
  totalDeliveredCost: number;
  margin: number | null;
  marginPercent: number | null;
  breakevenScrap: number | null;
  scrapConsumption: number;
  rollingYieldFactor: number;
}

export default function ScrapProductionCostCalc() {
  // Step 1
  const [scrapPrice, setScrapPrice] = useState("");
  const [scrapYield, setScrapYield] = useState("91");

  // Step 2
  const [furnaceType, setFurnaceType] = useState<"IF" | "EAF">("IF");
  const [electricityRate, setElectricityRate] = useState("");
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

  const [result, setResult] = useState<CostBreakdown | null>(null);

  const yieldChips = [85, 88, 90, 91, 93, 95];

  const inputClass =
    "w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 text-white text-sm focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/25 transition-colors";
  const selectClass =
    "w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 text-white text-sm focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/25 transition-colors";

  const fmt = (n: number) =>
    n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  const scrapYieldNum = parseFloat(scrapYield) || 0;
  const scrapConsumptionFactor = scrapYieldNum > 0 ? 1 / (scrapYieldNum / 100) : 0;

  const elecRate = parseFloat(electricityRate) || 0;
  const elecConsumption = parseFloat(electricityConsumption) || 0;
  const electricityCostPreview = elecRate * elecConsumption;

  function handleFurnaceToggle(type: "IF" | "EAF") {
    setFurnaceType(type);
    setElectricityConsumption(type === "IF" ? "625" : "450");
  }

  function handleCalculate() {
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
      ? ((sellP - totalOverhead - rcc - electricityCost - totalAlloys - rc - oc) / rollingYieldFactor) * (sy / 100)
      : null;

    setResult({
      rawMaterialCost,
      electricityCost,
      ferroSiliconCost,
      silicoManganeseCost,
      carbonCost,
      totalAlloys,
      refractoryCost: rc,
      otherConsumables: oc,
      liquidSteelCost,
      rollingConversionCost: rcc,
      finishedProductCost,
      labourCost: lc,
      adminCost: ac,
      financeCost: fc,
      transportCost: tc,
      totalOverhead,
      totalDeliveredCost,
      margin,
      marginPercent,
      breakevenScrap,
      scrapConsumption,
      rollingYieldFactor,
    });
  }

  function calcDeliveredForSensitivity(scrapMult: number, elecMult: number): number {
    const sp = (parseFloat(scrapPrice) || 0) * scrapMult;
    const sy = parseFloat(scrapYield) || 91;
    const er = (parseFloat(electricityRate) || 0) * elecMult;
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

    const scrapCons = 1 / (sy / 100);
    const rawMat = sp * scrapCons;
    const elecCost = er * ec;
    const fsCost = fsp ? (fsp / 1000) * fsk : 0;
    const smCost = smp ? (smp / 1000) * smk : 0;
    const cCost = cp ? (cp / 1000) * ck : 0;
    const alloys = fsCost + smCost + cCost;
    const liquid = rawMat + elecCost + alloys + rc + oc;
    const ryf = 1 / (ry / 100);
    const finished = liquid * ryf + rcc;
    const overhead = lc + ac + fc + tc;
    return finished + overhead;
  }

  function shareWhatsApp() {
    if (!result) return;
    const lines = [
      "Scrap-to-Steel Production Cost Breakdown:",
      `Raw Material: ${fmt(result.rawMaterialCost)}/MT`,
      `Electricity: ${fmt(result.electricityCost)}/MT`,
      `Ferro Alloys: ${fmt(result.totalAlloys)}/MT`,
      `Liquid Steel Cost: ${fmt(result.liquidSteelCost)}/MT`,
      `Finished Product Cost: ${fmt(result.finishedProductCost)}/MT`,
      `Total Delivered Cost: ${fmt(result.totalDeliveredCost)}/MT`,
    ];
    if (result.margin !== null) {
      lines.push(`Margin: ${fmt(result.margin)}/MT (${result.marginPercent!.toFixed(1)}%)`);
    }
    lines.push("Calculated using SteelMath Calculator");
    window.open(`https://wa.me/?text=${encodeURIComponent(lines.join("\n"))}`, "_blank");
  }

  function SectionHeader({ step, title }: { step: number; title: string }) {
    return (
      <div className="flex items-center gap-2 mb-3 mt-1">
        <span className="flex items-center justify-center w-6 h-6 rounded-full bg-accent/20 text-accent text-xs font-bold">
          {step}
        </span>
        <span className="text-white/70 text-sm font-medium">{title}</span>
      </div>
    );
  }

  function CostBar({
    label,
    amount,
    total,
    color,
  }: {
    label: string;
    amount: number;
    total: number;
    color: string;
  }) {
    const pct = total > 0 ? (amount / total) * 100 : 0;
    return (
      <div className="flex items-center gap-2 py-1">
        <div className="w-36 sm:w-44 text-white/60 text-xs truncate">{label}</div>
        <div className="flex-1 h-5 rounded bg-white/5 overflow-hidden">
          <div
            className={`h-full rounded ${color}`}
            style={{ width: `${Math.max(pct, 1)}%` }}
          />
        </div>
        <div className="w-28 text-right text-white font-mono text-xs">
          {fmt(amount)}{" "}
          <span className="text-white/30">({pct.toFixed(1)}%)</span>
        </div>
      </div>
    );
  }

  return (
    <div className="glass-panel p-5 sm:p-6">
      {/* Step 1 */}
      <SectionHeader step={1} title="Raw Material & Yield" />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-3">
        <div>
          <label className="block text-white/40 text-xs mb-1.5">Scrap Price (per MT)</label>
          <input
            type="number"
            className={inputClass}
            placeholder="e.g. 350 $/MT or 38,000 ₹/MT"
            value={scrapPrice}
            onChange={(e) => setScrapPrice(e.target.value)}
          />
        </div>
        <div>
          <label className="block text-white/40 text-xs mb-1.5">Scrap Yield (%)</label>
          <input
            type="number"
            className={inputClass}
            value={scrapYield}
            onChange={(e) => setScrapYield(e.target.value)}
          />
          <div className="flex flex-wrap gap-1.5 mt-2">
            {yieldChips.map((y) => (
              <button
                key={y}
                onClick={() => setScrapYield(String(y))}
                className={`px-2.5 py-1 rounded-full text-xs font-medium transition-colors cursor-pointer ${
                  parseFloat(scrapYield) === y
                    ? "bg-accent/20 border border-accent/60 text-accent"
                    : "bg-white/5 border border-white/10 text-white/50 hover:bg-white/10"
                }`}
              >
                {y}%
              </button>
            ))}
          </div>
        </div>
      </div>
      {scrapYieldNum > 0 && (
        <div className="text-white/40 text-xs mb-5 pl-1">
          Scrap consumption factor:{" "}
          <span className="font-mono text-white/70">{scrapConsumptionFactor.toFixed(3)}</span> MT
          scrap per MT liquid steel
        </div>
      )}

      {/* Step 2 */}
      <SectionHeader step={2} title="Energy" />
      <div className="mb-3">
        <label className="block text-white/40 text-xs mb-1.5">Furnace Type</label>
        <div className="flex rounded-lg overflow-hidden border border-white/10 w-fit">
          {(["IF", "EAF"] as const).map((t) => (
            <button
              key={t}
              onClick={() => handleFurnaceToggle(t)}
              className={`px-5 py-2 text-sm font-medium transition-colors cursor-pointer ${
                furnaceType === t
                  ? "bg-accent/20 text-accent"
                  : "bg-white/5 text-white/50 hover:bg-white/10"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-2">
        <div>
          <label className="block text-white/40 text-xs mb-1.5">Electricity Rate (per kWh)</label>
          <input
            type="number"
            className={inputClass}
            placeholder="Enter your rate"
            value={electricityRate}
            onChange={(e) => setElectricityRate(e.target.value)}
          />
        </div>
        <div>
          <label className="block text-white/40 text-xs mb-1.5">
            Electricity Consumption (kWh/t)
          </label>
          <input
            type="number"
            className={inputClass}
            value={electricityConsumption}
            onChange={(e) => setElectricityConsumption(e.target.value)}
          />
        </div>
      </div>
      {elecRate > 0 && (
        <div className="text-white/40 text-xs mb-5 pl-1">
          Electricity cost per tonne:{" "}
          <span className="font-mono text-white/70">{fmt(electricityCostPreview)}</span>
        </div>
      )}

      {/* Step 3 */}
      <SectionHeader step={3} title="Alloys & Consumables" />
      <div className="space-y-3 mb-2">
        {/* Ferro Silicon */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-white/40 text-xs mb-1.5">Ferro Silicon Price (per MT)</label>
            <input
              type="number"
              className={inputClass}
              placeholder="Price per MT"
              value={ferroSiliconPrice}
              onChange={(e) => setFerroSiliconPrice(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-white/40 text-xs mb-1.5">Consumption (kg/t)</label>
            <input
              type="number"
              className={inputClass}
              value={ferroSiliconKg}
              onChange={(e) => setFerroSiliconKg(e.target.value)}
            />
          </div>
        </div>
        {/* Silico Manganese */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-white/40 text-xs mb-1.5">
              Silico Manganese Price (per MT)
            </label>
            <input
              type="number"
              className={inputClass}
              placeholder="Price per MT"
              value={silicoManganesePrice}
              onChange={(e) => setSilicoManganesePrice(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-white/40 text-xs mb-1.5">Consumption (kg/t)</label>
            <input
              type="number"
              className={inputClass}
              value={silicoManganeseKg}
              onChange={(e) => setSilicoManganeseKg(e.target.value)}
            />
          </div>
        </div>
        {/* Carbon */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-white/40 text-xs mb-1.5">
              Carbon (anthracite/electrode) Price (per MT)
            </label>
            <input
              type="number"
              className={inputClass}
              placeholder="Price per MT"
              value={carbonPrice}
              onChange={(e) => setCarbonPrice(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-white/40 text-xs mb-1.5">Consumption (kg/t)</label>
            <input
              type="number"
              className={inputClass}
              value={carbonKg}
              onChange={(e) => setCarbonKg(e.target.value)}
            />
          </div>
        </div>
        {/* Refractory */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block text-white/40 text-xs mb-1.5">
              Refractory/Lining (per t liquid steel)
            </label>
            <input
              type="number"
              className={inputClass}
              placeholder="e.g. 300"
              value={refractoryCost}
              onChange={(e) => setRefractoryCost(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-white/40 text-xs mb-1.5">Other Consumables (per t)</label>
            <input
              type="number"
              className={inputClass}
              placeholder="e.g. 200"
              value={otherConsumables}
              onChange={(e) => setOtherConsumables(e.target.value)}
            />
          </div>
        </div>
      </div>
      <div className="text-white/30 text-xs mb-5 pl-1">
        Leave price blank to exclude from calculation
      </div>

      {/* Step 4 */}
      <SectionHeader step={4} title="Conversion (Rolling/Finishing)" />
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-5">
        <div>
          <label className="block text-white/40 text-xs mb-1.5">Finished Product</label>
          <select
            className={selectClass}
            value={finishedProduct}
            onChange={(e) => setFinishedProduct(e.target.value)}
          >
            {["Billet", "TMT Bar", "Wire Rod", "Structural", "Flat Bar"].map((p) => (
              <option key={p} value={p} className="bg-[#0d1929]">
                {p}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-white/40 text-xs mb-1.5">Rolling Yield (%)</label>
          <input
            type="number"
            className={inputClass}
            value={rollingYield}
            onChange={(e) => setRollingYield(e.target.value)}
          />
        </div>
        <div>
          <label className="block text-white/40 text-xs mb-1.5">
            Rolling/Conversion Cost (per t)
          </label>
          <input
            type="number"
            className={inputClass}
            placeholder="e.g. 1500"
            value={rollingConversionCost}
            onChange={(e) => setRollingConversionCost(e.target.value)}
          />
        </div>
      </div>

      {/* Step 5 */}
      <SectionHeader step={5} title="Overheads (all optional)" />
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-5">
        <div>
          <label className="block text-white/40 text-xs mb-1.5">Labour (per t)</label>
          <input
            type="number"
            className={inputClass}
            placeholder="e.g. 500"
            value={labourCost}
            onChange={(e) => setLabourCost(e.target.value)}
          />
        </div>
        <div>
          <label className="block text-white/40 text-xs mb-1.5">Admin Overhead (per t)</label>
          <input
            type="number"
            className={inputClass}
            placeholder="e.g. 300"
            value={adminCost}
            onChange={(e) => setAdminCost(e.target.value)}
          />
        </div>
        <div>
          <label className="block text-white/40 text-xs mb-1.5">Finance/Interest (per t)</label>
          <input
            type="number"
            className={inputClass}
            placeholder="e.g. 400"
            value={financeCost}
            onChange={(e) => setFinanceCost(e.target.value)}
          />
        </div>
        <div>
          <label className="block text-white/40 text-xs mb-1.5">Transport (per t)</label>
          <input
            type="number"
            className={inputClass}
            placeholder="e.g. 500"
            value={transportCost}
            onChange={(e) => setTransportCost(e.target.value)}
          />
        </div>
      </div>

      {/* Step 6 */}
      <SectionHeader step={6} title="Selling Price (optional)" />
      <div className="mb-5">
        <label className="block text-white/40 text-xs mb-1.5">
          Selling Price of Finished Product (per MT)
        </label>
        <input
          type="number"
          className={`${inputClass} sm:w-1/2`}
          placeholder="Optional - for margin analysis"
          value={sellingPrice}
          onChange={(e) => setSellingPrice(e.target.value)}
        />
      </div>

      {/* Calculate Button */}
      <button onClick={handleCalculate} className="btn-glow px-6 py-2.5 text-sm w-full sm:w-auto">
        Calculate Production Cost
      </button>

      {/* Results */}
      {result && (
        <div className="mt-6 space-y-5">
          {/* Cost Waterfall */}
          <div className="rounded-lg bg-accent/5 border border-accent/20 p-4">
            <h3 className="text-white/70 text-sm font-medium mb-3">Cost Waterfall</h3>
            <div className="space-y-0.5">
              <CostBar
                label="Raw Material"
                amount={result.rawMaterialCost}
                total={result.totalDeliveredCost}
                color="bg-blue-500/40"
              />
              <CostBar
                label="Electricity"
                amount={result.electricityCost}
                total={result.totalDeliveredCost}
                color="bg-yellow-500/40"
              />
              <CostBar
                label="Ferro Alloys"
                amount={result.totalAlloys}
                total={result.totalDeliveredCost}
                color="bg-purple-500/40"
              />
              <CostBar
                label="Carbon & Consumables"
                amount={result.refractoryCost > 0 ? 0 : 0}
                total={result.totalDeliveredCost}
                color="bg-orange-500/40"
              />
              <CostBar
                label="Refractory & Other"
                amount={result.refractoryCost + result.otherConsumables}
                total={result.totalDeliveredCost}
                color="bg-pink-500/40"
              />
            </div>
            <div className="my-2 text-center text-white/30 text-xs font-mono tracking-wider">
              ── LIQUID STEEL COST ──{" "}
              <span className="text-white/70 font-semibold">{fmt(result.liquidSteelCost)}</span>
            </div>
            <div className="space-y-0.5">
              <CostBar
                label="Rolling Conversion"
                amount={result.rollingConversionCost}
                total={result.totalDeliveredCost}
                color="bg-teal-500/40"
              />
            </div>
            <div className="my-2 text-center text-white/30 text-xs font-mono tracking-wider">
              ── FINISHED PRODUCT COST ──{" "}
              <span className="text-white/70 font-semibold">{fmt(result.finishedProductCost)}</span>
            </div>
            <div className="space-y-0.5">
              <CostBar
                label="Labour + Overhead"
                amount={result.labourCost + result.adminCost}
                total={result.totalDeliveredCost}
                color="bg-green-500/40"
              />
              <CostBar
                label="Finance + Transport"
                amount={result.financeCost + result.transportCost}
                total={result.totalDeliveredCost}
                color="bg-red-500/40"
              />
            </div>
            <div className="mt-3 pt-2 border-t border-white/10 text-center font-mono text-xs tracking-wider text-white/40">
              ══ TOTAL DELIVERED COST ══{" "}
              <span className="text-accent font-bold text-base">
                {fmt(result.totalDeliveredCost)}
              </span>
            </div>
          </div>

          {/* Key Numbers Panel */}
          <div className="rounded-lg bg-white/5 border border-white/10 p-4">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-white/40 text-xs">Liquid Steel Cost</div>
                <div className="text-white font-mono font-semibold mt-1">
                  {fmt(result.liquidSteelCost)}
                  <span className="text-white/30 text-xs">/MT</span>
                </div>
              </div>
              <div>
                <div className="text-white/40 text-xs">Finished Product Cost</div>
                <div className="text-white font-mono font-semibold mt-1">
                  {fmt(result.finishedProductCost)}
                  <span className="text-white/30 text-xs">/MT</span>
                </div>
              </div>
              <div>
                <div className="text-white/40 text-xs">Total Delivered Cost</div>
                <div className="text-accent font-mono font-bold text-lg mt-1">
                  {fmt(result.totalDeliveredCost)}
                  <span className="text-accent/50 text-xs">/MT</span>
                </div>
              </div>
            </div>
          </div>

          {/* Margin Analysis */}
          {result.margin !== null && (
            <div className="rounded-lg bg-accent/5 border border-accent/20 p-4">
              <h3 className="text-white/70 text-sm font-medium mb-3">Margin Analysis</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                <div>
                  <div className="text-white/40 text-xs">Margin</div>
                  <div
                    className={`font-mono font-semibold mt-1 ${
                      result.margin! >= 0 ? "text-green-400" : "text-red-400"
                    }`}
                  >
                    {fmt(result.margin!)}
                    <span className="text-xs">/MT</span>
                    <span className="text-xs ml-1">
                      ({result.marginPercent!.toFixed(1)}%)
                    </span>
                  </div>
                </div>
                <div>
                  <div className="text-white/40 text-xs">Breakeven Scrap Price</div>
                  <div className="text-white font-mono font-semibold mt-1">
                    {fmt(result.breakevenScrap!)}
                    <span className="text-white/30 text-xs">/MT</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Sensitivity Matrix */}
          <div className="rounded-lg bg-accent/5 border border-accent/20 p-4">
            <h3 className="text-white/70 text-sm font-medium mb-3">Sensitivity Matrix</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-xs font-mono">
                <thead>
                  <tr>
                    <th className="text-white/30 text-left p-1.5"></th>
                    <th className="text-white/50 p-1.5">Elec -20%</th>
                    <th className="text-white/50 p-1.5">Elec base</th>
                    <th className="text-white/50 p-1.5">Elec +20%</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { label: "Scrap -10%", scrapMult: 0.9 },
                    { label: "Scrap base", scrapMult: 1.0 },
                    { label: "Scrap +10%", scrapMult: 1.1 },
                  ].map((row) => (
                    <tr key={row.label}>
                      <td className="text-white/50 p-1.5 whitespace-nowrap">{row.label}</td>
                      {[0.8, 1.0, 1.2].map((elecMult) => {
                        const val = calcDeliveredForSensitivity(row.scrapMult, elecMult);
                        const isBase = row.scrapMult === 1.0 && elecMult === 1.0;
                        return (
                          <td
                            key={elecMult}
                            className={`p-1.5 text-center ${
                              isBase
                                ? "text-accent font-bold border border-accent/40 rounded"
                                : "text-white/70"
                            }`}
                          >
                            {fmt(val)}
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* WhatsApp Share */}
          <button
            onClick={shareWhatsApp}
            className="w-full sm:w-auto py-2 px-4 rounded-lg text-sm font-medium cursor-pointer transition-all bg-[#25d366]/15 border border-[#25d366]/20 text-[#25d366] hover:bg-[#25d366]/25"
          >
            Share on WhatsApp
          </button>
        </div>
      )}
    </div>
  );
}
