"use client";

import { useState } from "react";
import {
  InstrumentShell,
  ResultPanel,
  Field,
  ShowMaths,
} from "@/components/instrument";

interface CreditResult {
  totalMaterial: number;
  interestCost: number;
  totalCost: number;
  effectiveRate: number;
  costPerKg: number;
}

function calcCredit(
  qty: number,
  pricePerKg: number,
  creditDays: number,
  interestRate: number
): CreditResult | null {
  if (qty <= 0 || pricePerKg <= 0 || creditDays <= 0 || interestRate <= 0)
    return null;

  const totalMaterial = qty * pricePerKg;
  const interestCost = totalMaterial * (interestRate / 100) * (creditDays / 365);
  const totalCost = totalMaterial + interestCost;
  const effectiveRate = (interestCost / totalMaterial) * 100;
  const costPerKg = totalCost / qty;

  return { totalMaterial, interestCost, totalCost, effectiveRate, costPerKg };
}

const fmt2 = (n: number) =>
  n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

export default function CreditCostCalc() {
  const [qty, setQty] = useState("10000");
  const [price, setPrice] = useState("55");
  const [days, setDays] = useState("30");
  const [rate, setRate] = useState("12");

  const result = calcCredit(
    parseFloat(qty) || 0,
    parseFloat(price) || 0,
    parseInt(days) || 0,
    parseFloat(rate) || 0
  );

  const copyText = result
    ? `Credit cost: ${qty} kg @ ${price}/kg = ${fmt2(result.totalMaterial)} · ${days} days @ ${rate}% p.a. = +${fmt2(result.interestCost)} interest · total ${fmt2(result.totalCost)} (${result.costPerKg.toFixed(2)}/kg, +${result.effectiveRate.toFixed(3)}%) — via steelmath.com`
    : "Credit cost calculator — via steelmath.com";

  return (
    <InstrumentShell
      inputs={
        <>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(130px,1fr))] gap-3">
            <Field
              label="QUANTITY (KG)"
              value={qty}
              onChange={setQty}
              step={1}
              placeholder="e.g. 10000"
            />
            <Field
              label="PRICE PER KG"
              value={price}
              onChange={setPrice}
              placeholder="e.g. 55"
            />
          </div>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(130px,1fr))] gap-3">
            <Field
              label="CREDIT PERIOD (DAYS)"
              value={days}
              onChange={setDays}
              step={1}
              placeholder="e.g. 30"
            />
            <Field
              label="INTEREST RATE (% P.A.)"
              value={rate}
              onChange={setRate}
              placeholder="e.g. 12"
            />
          </div>
          <ShowMaths
            lines={[
              `Interest = material × rate/100 × days/365${
                result
                  ? ` = ${fmt2(result.totalMaterial)} × ${rate}/100 × ${days}/365 = ${fmt2(result.interestCost)}`
                  : ""
              }`,
              "Material = quantity × price per kg · Total = material + interest",
              "Effective add-on % = interest ÷ material × 100 · Effective cost/kg = total ÷ quantity",
            ]}
            source="BASIS: SIMPLE INTEREST · 365-DAY YEAR · LAST VERIFIED 18 JUL 2026"
          />
        </>
      }
      result={
        <ResultPanel
          context={result ? `${days} DAYS @ ${rate}% P.A.` : "CREDIT COST"}
          headlineLabel="TOTAL COST — MATERIAL + INTEREST"
          headlineValue={result ? fmt2(result.totalCost) : "—"}
          subline={
            result
              ? `${qty} kg @ ${price}/kg on ${days} days credit`
              : "Enter quantity, price, credit period and interest rate (all > 0)."
          }
          stats={
            result
              ? [
                  { label: "MATERIAL COST", value: fmt2(result.totalMaterial) },
                  {
                    label: "INTEREST COST",
                    value: `+${fmt2(result.interestCost)}`,
                    accent: true,
                  },
                  {
                    label: "EFFECTIVE ADD-ON",
                    value: `${result.effectiveRate.toFixed(3)}%`,
                  },
                  {
                    label: "EFFECTIVE COST / KG",
                    value: result.costPerKg.toFixed(2),
                  },
                ]
              : undefined
          }
          formulaLine={`interest = material × ${rate}/100 × ${days}/365`}
          copyText={copyText}
          shareUrl="https://steelmath.com/calculators/credit-cost"
        />
      }
    />
  );
}
