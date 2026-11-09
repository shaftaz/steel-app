"use client";

import { useState } from "react";
import Link from "next/link";
import {
  InstrumentShell,
  ResultPanel,
  Field,
  SelectField,
  Chip,
  ModeTab,
  ShowMaths,
  LABEL_CLS,
  fmt,
  num,
  useUrlState,
  track,
} from "@/components/instrument";

/* Landed cost — FOB or CIF per tonne in a trade currency → duty-paid
   price per tonne in the buyer's currency, as a waterfall.
   Presets hold the headline rates the site's trade guides already cite;
   every field stays editable because real shipments differ. */

type Basis = "FOB" | "CFR" | "CIF";

interface Preset {
  key: string;
  label: string;
  local: string; // local currency symbol
  localCode: string;
  fx: string; // trade currency → local
  duty: string; // basic import duty %
  surcharge: string; // surcharge as % of duty (India SWS 10%)
  safeguard: string; // % of assessable value
  add: string; // anti-dumping, per tonne in local currency
  vat: string; // VAT / GST %
  vatCredit: boolean; // input tax credit usually available
  insurancePct: string; // % of FOB when actual unknown
  landingPct: string; // landing charges % (legacy; 0 in India since 2017)
  port: string; // port, CHA, handling per tonne, local
  inland: string; // inland freight per tonne, local
  note: string;
}

const PRESETS: Preset[] = [
  {
    key: "IN",
    label: "India",
    local: "₹",
    localCode: "INR",
    fx: "84",
    duty: "7.5",
    surcharge: "10",
    safeguard: "11.5",
    add: "0",
    vat: "18",
    vatCredit: true,
    insurancePct: "1.125",
    landingPct: "0",
    port: "1200",
    inland: "1800",
    note: "BCD 7.5% on most HS 72 · SWS 10% of BCD · safeguard on flat products 11.5% (year 2, to Apr 2027) · IGST 18%, creditable",
  },
  {
    key: "EU",
    label: "EU",
    local: "€",
    localCode: "EUR",
    fx: "0.86",
    duty: "0",
    surcharge: "0",
    safeguard: "0",
    add: "0",
    vat: "21",
    vatCredit: true,
    insurancePct: "0.5",
    landingPct: "0",
    port: "18",
    inland: "35",
    note: "MFN duty 0% on most steel · set safeguard to 50% only for out-of-quota volumes · VAT by member state · CBAM certificates are a separate cost from 2026",
  },
  {
    key: "UK",
    label: "UK",
    local: "£",
    localCode: "GBP",
    fx: "0.75",
    duty: "0",
    surcharge: "0",
    safeguard: "0",
    add: "0",
    vat: "20",
    vatCredit: true,
    insurancePct: "0.5",
    landingPct: "0",
    port: "15",
    inland: "30",
    note: "UKGT 0% on most steel · set safeguard to 25% only for out-of-quota volumes · VAT 20%, reclaimable · UK CBAM from 1 Jan 2027",
  },
  {
    key: "US",
    label: "USA",
    local: "$",
    localCode: "USD",
    fx: "1",
    duty: "50",
    surcharge: "0",
    safeguard: "0",
    add: "0",
    vat: "0",
    vatCredit: false,
    insurancePct: "0.5",
    landingPct: "0",
    port: "22",
    inland: "45",
    note: "Section 232 at 50% on steel content (25% for UK-origin) · MPF/HMF are small and folded into port charges · no federal VAT",
  },
  {
    key: "GCC",
    label: "GCC",
    local: "$",
    localCode: "USD",
    fx: "1",
    duty: "5",
    surcharge: "0",
    safeguard: "0",
    add: "0",
    vat: "5",
    vatCredit: true,
    insurancePct: "0.5",
    landingPct: "0",
    port: "12",
    inland: "20",
    note: "GCC common external tariff 5% · VAT 5% (UAE, KSA 15%) · check product-specific anti-dumping measures",
  },
  {
    key: "XX",
    label: "Custom",
    local: "$",
    localCode: "USD",
    fx: "1",
    duty: "0",
    surcharge: "0",
    safeguard: "0",
    add: "0",
    vat: "0",
    vatCredit: false,
    insurancePct: "0.5",
    landingPct: "0",
    port: "0",
    inland: "0",
    note: "Enter your own tariff schedule",
  },
];

const TRADE_CCY = ["USD", "EUR", "CNY", "JPY", "GBP", "AED", "INR"];

export default function LandedCostCalc() {
  const [preset, setPreset] = useState("IN");
  const [basis, setBasis] = useState<Basis>("CFR");
  const [tradeCcy, setTradeCcy] = useState("USD");
  const [price, setPrice] = useState("560");
  const [freight, setFreight] = useState("45");
  const [insurancePct, setInsurancePct] = useState(PRESETS[0].insurancePct);
  const [fx, setFx] = useState(PRESETS[0].fx);
  const [landingPct, setLandingPct] = useState(PRESETS[0].landingPct);
  const [duty, setDuty] = useState(PRESETS[0].duty);
  const [surcharge, setSurcharge] = useState(PRESETS[0].surcharge);
  const [safeguard, setSafeguard] = useState(PRESETS[0].safeguard);
  const [add, setAdd] = useState(PRESETS[0].add);
  const [vat, setVat] = useState(PRESETS[0].vat);
  const [vatCredit, setVatCredit] = useState(PRESETS[0].vatCredit);
  const [port, setPort] = useState(PRESETS[0].port);
  const [inland, setInland] = useState(PRESETS[0].inland);
  const [tonnes, setTonnes] = useState("500");
  const [domestic, setDomestic] = useState("");

  const applyPreset = (key: string) => {
    const p = PRESETS.find((x) => x.key === key);
    if (!p) return;
    setPreset(key);
    setFx(p.fx);
    setDuty(p.duty);
    setSurcharge(p.surcharge);
    setSafeguard(p.safeguard);
    setAdd(p.add);
    setVat(p.vat);
    setVatCredit(p.vatCredit);
    setInsurancePct(p.insurancePct);
    setLandingPct(p.landingPct);
    setPort(p.port);
    setInland(p.inland);
    track("landed_cost_preset", { preset: key });
  };

  useUrlState((p) => {
    const pk = p.get("c");
    if (pk && PRESETS.some((x) => x.key === pk)) applyPreset(pk);
    const b = p.get("b");
    if (b === "FOB" || b === "CFR" || b === "CIF") setBasis(b);
    if (p.get("ccy") && TRADE_CCY.includes(p.get("ccy")!)) setTradeCcy(p.get("ccy")!);
    const setIf = (k: string, fn: (v: string) => void, min = 0) => {
      const v = p.get(k);
      if (v !== null && v !== "" && num(v) >= min) fn(v);
    };
    setIf("p", setPrice);
    setIf("fr", setFreight);
    setIf("ins", setInsurancePct);
    setIf("fx", setFx);
    setIf("d", setDuty);
    setIf("s", setSurcharge);
    setIf("sg", setSafeguard);
    setIf("add", setAdd);
    setIf("v", setVat);
    setIf("port", setPort);
    setIf("inl", setInland);
    setIf("t", setTonnes);
    setIf("dom", setDomestic);
    if (p.get("vc") === "0") setVatCredit(false);
    if (p.get("vc") === "1") setVatCredit(true);
  });

  const P = PRESETS.find((x) => x.key === preset) ?? PRESETS[0];
  const sym = P.local;

  /* ---- waterfall, all per tonne ---- */
  const priceV = num(price);
  const freightV = basis === "FOB" ? num(freight) : 0;
  const fobLike = basis === "CIF" ? priceV : priceV + freightV; // trade ccy, before insurance
  const insuranceV = basis === "CIF" ? 0 : priceV * (num(insurancePct) / 100);
  const cifTrade = fobLike + insuranceV; // trade currency
  const fxV = num(fx) || 1;
  const cifLocal = cifTrade * fxV;
  const landingV = cifLocal * (num(landingPct) / 100);
  const assessable = cifLocal + landingV;
  const dutyV = assessable * (num(duty) / 100);
  const surchargeV = dutyV * (num(surcharge) / 100);
  const safeguardV = assessable * (num(safeguard) / 100);
  const addV = num(add);
  const dutyPaid = assessable + dutyV + surchargeV + safeguardV + addV;
  const vatBase = dutyPaid;
  const vatV = vatBase * (num(vat) / 100);
  const portV = num(port);
  const inlandV = num(inland);
  const landedGross = dutyPaid + vatV + portV + inlandV;
  const landedNet = vatCredit ? landedGross - vatV : landedGross; // effective cost when VAT is creditable
  const t = num(tonnes);
  const totalNet = landedNet * t;
  const domV = num(domestic);
  const delta = domV > 0 ? landedNet - domV : 0;
  const effectiveTaxPct = cifLocal > 0 ? ((dutyPaid - cifLocal) / cifLocal) * 100 : 0;

  const context = `${basis} ${tradeCcy} ${fmt(priceV, 0)}/t → ${P.label}`;
  const shareUrl =
    `https://steelmath.com/calculators/landed-cost?c=${preset}&b=${basis}&ccy=${tradeCcy}&p=${price}&fr=${freight}&ins=${insurancePct}&fx=${fx}` +
    `&d=${duty}&s=${surcharge}&sg=${safeguard}&add=${add}&v=${vat}&vc=${vatCredit ? 1 : 0}&port=${port}&inl=${inland}&t=${tonnes}${domV > 0 ? `&dom=${domestic}` : ""}`;
  const copyText = `Landed cost ${P.label}: ${basis} ${tradeCcy} ${fmt(priceV, 0)}/t → ${sym}${fmt(landedNet, 0)}/t ${
    vatCredit && num(vat) > 0 ? "ex-creditable VAT" : "all-in"
  } (duty-paid ${sym}${fmt(dutyPaid, 0)}, +${fmt(effectiveTaxPct, 1)}% over CIF)${
    domV > 0 ? ` · vs domestic ${sym}${fmt(domV, 0)}: ${delta >= 0 ? "+" : "−"}${sym}${fmt(Math.abs(delta), 0)}/t` : ""
  } — via steelmath.com`;
  const formulaLine = `CIF ${sym}${fmt(cifLocal, 0)} + duty ${fmt(dutyV, 0)} + surcharge ${fmt(surchargeV, 0)} + safeguard ${fmt(
    safeguardV,
    0
  )} + ADD ${fmt(addV, 0)} = duty-paid ${sym}${fmt(dutyPaid, 0)}/t`;

  const pct = (v: string) => `${v}%`;

  return (
    <InstrumentShell
      header={
        <div className="flex flex-wrap border-b border-rule">
          {PRESETS.map((p) => (
            <ModeTab key={p.key} active={preset === p.key} onClick={() => applyPreset(p.key)}>
              {p.label.toUpperCase()}
            </ModeTab>
          ))}
        </div>
      }
      inputs={
        <>
          <div className="font-mono text-[11px] text-muted-3 -mt-1">{P.note}</div>

          <div className="flex flex-col gap-1.5">
            <span className={LABEL_CLS}>PRICE BASIS (INCOTERM)</span>
            <div className="flex flex-wrap gap-1.5">
              {(["FOB", "CFR", "CIF"] as Basis[]).map((b) => (
                <Chip key={b} active={basis === b} onClick={() => setBasis(b)}>
                  {b}
                </Chip>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            <SelectField label="TRADE CURRENCY" value={tradeCcy} onChange={setTradeCcy}>
              {TRADE_CCY.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </SelectField>
            <Field label={`${basis} PRICE / TONNE (${tradeCcy})`} value={price} onChange={setPrice} step={5} />
            {basis === "FOB" && (
              <Field label={`OCEAN FREIGHT / T (${tradeCcy})`} value={freight} onChange={setFreight} step={1} />
            )}
            {basis !== "CIF" && (
              <Field label="INSURANCE (% OF FOB)" value={insurancePct} onChange={setInsurancePct} step={0.125} />
            )}
            <Field label={`FX — 1 ${tradeCcy} = ? ${P.localCode}`} value={fx} onChange={setFx} step={0.01} />
            <Field label="QUANTITY (TONNES)" value={tonnes} onChange={setTonnes} step={10} />
          </div>

          <div className="flex flex-col gap-1.5">
            <span className={LABEL_CLS}>DUTIES &amp; TAXES — {P.label.toUpperCase()}</span>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              <Field label="IMPORT DUTY (%)" value={duty} onChange={setDuty} step={0.5} />
              <Field label="SURCHARGE (% OF DUTY)" value={surcharge} onChange={setSurcharge} step={1} />
              <Field label="SAFEGUARD (%)" value={safeguard} onChange={setSafeguard} step={0.5} />
              <Field label={`ANTI-DUMPING / T (${P.localCode})`} value={add} onChange={setAdd} step={10} />
              <Field label="LANDING CHARGES (%)" value={landingPct} onChange={setLandingPct} step={0.5} />
              <Field label={`${preset === "IN" ? "IGST" : "VAT / GST"} (%)`} value={vat} onChange={setVat} step={1} />
            </div>
            <label className="flex items-center gap-2 text-[12.5px] text-ink cursor-pointer mt-1">
              <input
                type="checkbox"
                checked={vatCredit}
                onChange={(e) => setVatCredit(e.target.checked)}
                className="accent-[var(--accent)]"
              />
              {preset === "IN" ? "IGST" : "VAT / GST"} is creditable (registered importer) — show cost net of it
            </label>
          </div>

          <div className="flex flex-col gap-1.5">
            <span className={LABEL_CLS}>LOCAL COSTS — PER TONNE ({P.localCode})</span>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              <Field label="PORT · CHA · HANDLING" value={port} onChange={setPort} step={10} />
              <Field label="INLAND FREIGHT TO WORKS" value={inland} onChange={setInland} step={10} />
              <Field
                label={`DOMESTIC OFFER / T (${P.localCode})`}
                value={domestic}
                onChange={setDomestic}
                placeholder="optional, to compare"
                step={100}
              />
            </div>
          </div>

          <div className="font-mono text-[11px] text-muted-3">
            Assessable = CIF × FX (+ landing %) · duty-paid = assessable + duty + surcharge + safeguard + ADD · VAT on duty-paid value
          </div>

          <ShowMaths
            lines={[
              `CIF (${tradeCcy}) = ${fmt(priceV, 0)}${basis === "FOB" ? ` + freight ${fmt(freightV, 0)}` : ""}${
                basis !== "CIF" ? ` + insurance ${fmt(insuranceV, 2)}` : ""
              } = ${fmt(cifTrade, 2)} → × ${fx} = ${sym}${fmt(cifLocal, 0)}`,
              `Assessable value = ${sym}${fmt(cifLocal, 0)}${num(landingPct) > 0 ? ` × (1 + ${landingPct}%)` : ""} = ${sym}${fmt(assessable, 0)}`,
              `Duty ${pct(duty)} = ${sym}${fmt(dutyV, 0)} · surcharge ${pct(surcharge)} of duty = ${sym}${fmt(
                surchargeV,
                0
              )} · safeguard ${pct(safeguard)} = ${sym}${fmt(safeguardV, 0)} · ADD = ${sym}${fmt(addV, 0)}`,
              `${preset === "IN" ? "IGST" : "VAT"} ${pct(vat)} on ${sym}${fmt(vatBase, 0)} = ${sym}${fmt(vatV, 0)}${
                vatCredit ? " (creditable, excluded from net cost)" : ""
              }`,
              `Net landed = ${sym}${fmt(dutyPaid, 0)} + port ${fmt(portV, 0)} + inland ${fmt(inlandV, 0)}${
                !vatCredit ? ` + tax ${fmt(vatV, 0)}` : ""
              } = ${sym}${fmt(landedNet, 0)} per tonne`,
              <span key="cbam">
                EU and UK buyers: add CBAM certificates from the{" "}
                <Link href="/cbam/calculator" className="text-accent">
                  CBAM calculator
                </Link>{" "}
                on top of this figure.
              </span>,
            ]}
            source="RATES: INDIA BCD/SWS/IGST (CBIC), SAFEGUARD NOTIF. 2025 · US SEC. 232 (JUN 2025) · EU/UK SAFEGUARD QUOTAS · LAST VERIFIED 9 NOV 2026 · ESTIMATE, NOT CUSTOMS ADVICE"
          />
        </>
      }
      result={
        <ResultPanel
          kicker={`LANDED COST — ${P.label.toUpperCase()}`}
          context={context}
          headlineLabel={`NET LANDED / TONNE — ${P.localCode}${vatCredit && num(vat) > 0 ? " · EX-CREDITABLE TAX" : ""}`}
          headlineValue={`${sym}${fmt(landedNet, 0)}`}
          subline={`${fmt(effectiveTaxPct, 1)}% duties over CIF · all-in incl. tax ${sym}${fmt(landedGross, 0)}/t`}
          stats={[
            { label: "CIF IN LOCAL CCY", value: `${sym}${fmt(cifLocal, 0)}` },
            { label: "DUTY-PAID VALUE", value: `${sym}${fmt(dutyPaid, 0)}` },
            {
              label: `DUTIES + SAFEGUARD + ADD`,
              value: `${sym}${fmt(dutyV + surchargeV + safeguardV + addV, 0)}`,
            },
            { label: `${preset === "IN" ? "IGST" : "VAT / GST"} ${vat}%`, value: `${sym}${fmt(vatV, 0)}` },
            {
              label: `TOTAL — ${fmt(t, 0)} T`,
              value: t > 0 ? `${sym}${fmt(totalNet, 0)}` : "—",
              accent: true,
            },
            {
              label: "VS DOMESTIC OFFER",
              value:
                domV > 0
                  ? `${delta >= 0 ? "+" : "−"}${sym}${fmt(Math.abs(delta), 0)}/t ${delta >= 0 ? "(import dearer)" : "(import cheaper)"}`
                  : "— enter offer",
              positive: domV > 0 ? delta < 0 : undefined,
            },
          ]}
          formulaLine={formulaLine}
          copyText={copyText}
          shareUrl={shareUrl}
        />
      }
    />
  );
}
