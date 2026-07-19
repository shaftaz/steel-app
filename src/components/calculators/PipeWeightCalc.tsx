"use client";

import { useState } from "react";
import { pipes } from "@/lib/data/section-weights";
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
  useCurrency,
} from "@/components/instrument";

export default function PipeWeightCalc() {
  const [selectedNB, setSelectedNB] = useState(50);
  const [customOD, setCustomOD] = useState("60.3");
  const [customWT, setCustomWT] = useState("3.6");
  const [length, setLength] = useState("6");
  const [quantity, setQuantity] = useState("1");
  const [useCustom, setUseCustom] = useState(false);
  const [rate, setRate] = useState("");
  const [currency, setCurrency] = useCurrency();

  const selectedPipe = pipes.find((p) => p.nbSize === selectedNB);

  let weightPerMetre = selectedPipe?.weightPerMetre || 0;
  if (useCustom && customOD && customWT) {
    const od = parseFloat(customOD);
    const wt = parseFloat(customWT);
    if (od > 0 && wt > 0 && wt < od / 2) {
      weightPerMetre = (od - wt) * wt * 0.02466;
    }
  }

  const l = parseFloat(length) || 0;
  const q = parseInt(quantity) || 1;
  const r = num(rate);

  const perPiece = weightPerMetre * l;
  const totalWeight = weightPerMetre * l * q;
  const cost = totalWeight * r;
  const perTonne = perPiece > 0 ? 1000 / perPiece : 0;

  const od = useCustom ? parseFloat(customOD) || 0 : selectedPipe?.od || 0;
  const wt = useCustom
    ? parseFloat(customWT) || 0
    : selectedPipe?.wallThickness || 0;

  const name = useCustom
    ? `PIPE ${customOD || 0} × ${customWT || 0}`
    : `PIPE ${selectedNB} NB`;
  const shareUrl = "https://steelmath.com/calculators/pipe-weight";
  const copyText = `${name} — ${fmt(weightPerMetre, 2)} kg/m · ${q} pcs = ${fmt(
    totalWeight,
    2
  )} kg${r > 0 ? ` · ${currency}${fmt(cost, 0)}` : ""} — via steelmath.com`;
  const formulaLine = `(${od} − ${wt}) × ${wt} × 0.02466 = ${fmt(
    weightPerMetre,
    2
  )} kg/m`;

  return (
    <InstrumentShell
      header={
        <div className="flex border-b border-rule">
          <ModeTab active={!useCustom} onClick={() => setUseCustom(false)}>
            Standard NB Size
          </ModeTab>
          <ModeTab active={useCustom} onClick={() => setUseCustom(true)}>
            Custom OD × WT
          </ModeTab>
        </div>
      }
      inputs={
        <>
          {!useCustom ? (
            <div className="flex flex-col gap-1.5">
              <span className={LABEL_CLS}>NOMINAL BORE SIZE</span>
              <div className="flex flex-wrap gap-1.5">
                {pipes.map((p) => (
                  <Chip
                    key={p.nbSize}
                    active={selectedNB === p.nbSize}
                    onClick={() => setSelectedNB(p.nbSize)}
                  >
                    {p.nbSize}mm ({p.nbInch})
                  </Chip>
                ))}
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-3">
              <Field
                label="OUTER DIAMETER (MM)"
                value={customOD}
                onChange={setCustomOD}
                step={0.1}
                placeholder="e.g. 60.3"
              />
              <Field
                label="WALL THICKNESS (MM)"
                value={customWT}
                onChange={setCustomWT}
                step={0.1}
                placeholder="e.g. 3.6"
              />
            </div>
          )}

          <div className="grid grid-cols-2 gap-3">
            <Field label="LENGTH (METRES)" value={length} onChange={setLength} />
            <Field
              label="PIECES (PCS)"
              value={quantity}
              onChange={setQuantity}
              step={1}
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <Field
              label="RATE / KG (OPTIONAL)"
              value={rate}
              onChange={setRate}
              placeholder="e.g. 62"
            />
            <SelectField label="CURRENCY" value={currency} onChange={setCurrency}>
              <option value="₹">₹ INR</option>
              <option value="€">€ EUR</option>
              <option value="$">$ USD</option>
              <option value="£">£ GBP</option>
            </SelectField>
          </div>

          {!useCustom && selectedPipe && (
            <div className="font-mono text-[11px] text-muted-3">
              OD: {selectedPipe.od}mm | WT: {selectedPipe.wallThickness}mm |
              Formula: (OD − WT) × WT × 0.02466
            </div>
          )}

          <ShowMaths
            lines={[
              formulaLine,
              useCustom
                ? "Custom mode — weight from (OD − WT) × WT × 0.02466"
                : `IS 1239 medium class table — ${selectedNB} NB (${
                    selectedPipe?.nbInch ?? ""
                  }) = ${fmt(weightPerMetre, 2)} kg/m`,
              "Constant 0.02466 = π × 7,850 ÷ 10⁶ (steel density 7,850 kg/m³)",
            ]}
            source="SOURCE: IS 1239 · LAST VERIFIED 18 JUL 2026"
          />
        </>
      }
      result={
        <ResultPanel
          context={name}
          headlineLabel="WEIGHT / METRE — KG/M"
          headlineValue={fmt(weightPerMetre, 2)}
          stats={[
            {
              label: `PER PIECE · ${l} M`,
              value: `${fmt(perPiece, 2)} kg`,
            },
            {
              label: `TOTAL — ${q} PCS`,
              value:
                totalWeight >= 1000
                  ? `${fmt(totalWeight / 1000, 3)} t`
                  : `${fmt(totalWeight, 2)} kg`,
            },
            {
              label: "PIECES PER TONNE",
              value: perTonne > 0 ? `≈ ${fmt(perTonne, 1)}` : "—",
            },
            {
              label: "TOTAL COST",
              value: r > 0 ? `${currency}${fmt(cost, 0)}` : "— enter rate",
              accent: true,
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
