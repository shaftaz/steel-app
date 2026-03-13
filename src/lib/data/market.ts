export interface PriceTick {
  label: string;
  value: string;
  change: number;
  currency: "₹" | "$" | "";
}

export interface MatrixCell {
  price: number;
  change: number;
}

export type Region = "China" | "India" | "SE Asia" | "Europe" | "USA";
export type Product = "HRC" | "Rebar" | "Billets";

export const priceTicker: PriceTick[] = [
  { label: "LME HRC Futures", value: "612.5", change: 2.8, currency: "$" },
  { label: "Iron Ore 62% Fe", value: "108.3", change: -1.2, currency: "$" },
  { label: "Scrap HMS 1&2", value: "385.0", change: 4.5, currency: "$" },
  { label: "Coking Coal FOB", value: "218.7", change: 3.1, currency: "$" },
  { label: "Brent Crude", value: "92.4", change: 1.9, currency: "$" },
  { label: "USD/INR", value: "85.62", change: 0.18, currency: "" },
  { label: "India HRC (Avg)", value: "52,800", change: 1.4, currency: "₹" },
  { label: "India TMT", value: "48,500", change: 0.9, currency: "₹" },
];

export const priceMatrix: Record<Product, Record<Region, MatrixCell>> = {
  HRC: {
    China: { price: 540, change: -5 },
    India: { price: 620, change: 18 },
    "SE Asia": { price: 565, change: 8 },
    Europe: { price: 690, change: 12 },
    USA: { price: 780, change: -10 },
  },
  Rebar: {
    China: { price: 495, change: -3 },
    India: { price: 560, change: 15 },
    "SE Asia": { price: 520, change: 5 },
    Europe: { price: 640, change: 8 },
    USA: { price: 720, change: -6 },
  },
  Billets: {
    China: { price: 460, change: -8 },
    India: { price: 510, change: 12 },
    "SE Asia": { price: 485, change: 3 },
    Europe: { price: 580, change: 10 },
    USA: { price: 650, change: -4 },
  },
};

export const regions: Region[] = ["China", "India", "SE Asia", "Europe", "USA"];
export const products: Product[] = ["HRC", "Rebar", "Billets"];

// Indian city-wise prices in ₹/MT
export type IndianCity = "Mumbai" | "Delhi" | "Chennai" | "Kolkata" | "Raipur" | "Ahmedabad";
export const indianCities: IndianCity[] = ["Mumbai", "Delhi", "Chennai", "Kolkata", "Raipur", "Ahmedabad"];

export type IndianProduct = "HRC" | "CRC" | "TMT Bar" | "Plate" | "Rebar";
export const indianProducts: IndianProduct[] = ["HRC", "CRC", "TMT Bar", "Plate", "Rebar"];

export const indianPrices: Record<IndianProduct, Record<IndianCity, MatrixCell>> = {
  HRC: {
    Mumbai: { price: 52800, change: 1200 },
    Delhi: { price: 53500, change: 1100 },
    Chennai: { price: 53200, change: 1000 },
    Kolkata: { price: 52500, change: 1300 },
    Raipur: { price: 51800, change: 900 },
    Ahmedabad: { price: 52200, change: 1100 },
  },
  CRC: {
    Mumbai: { price: 58500, change: 800 },
    Delhi: { price: 59200, change: 700 },
    Chennai: { price: 58800, change: 900 },
    Kolkata: { price: 58000, change: 600 },
    Raipur: { price: 57500, change: 500 },
    Ahmedabad: { price: 58100, change: 750 },
  },
  "TMT Bar": {
    Mumbai: { price: 48500, change: 600 },
    Delhi: { price: 49200, change: 500 },
    Chennai: { price: 48800, change: 700 },
    Kolkata: { price: 47800, change: 400 },
    Raipur: { price: 47200, change: 550 },
    Ahmedabad: { price: 48000, change: 650 },
  },
  Plate: {
    Mumbai: { price: 55200, change: 1500 },
    Delhi: { price: 56000, change: 1400 },
    Chennai: { price: 55800, change: 1300 },
    Kolkata: { price: 54800, change: 1200 },
    Raipur: { price: 54200, change: 1100 },
    Ahmedabad: { price: 54600, change: 1350 },
  },
  Rebar: {
    Mumbai: { price: 47500, change: 500 },
    Delhi: { price: 48200, change: 450 },
    Chennai: { price: 47800, change: 550 },
    Kolkata: { price: 46900, change: 400 },
    Raipur: { price: 46300, change: 350 },
    Ahmedabad: { price: 47100, change: 500 },
  },
};

export const forecastData = {
  label: "HRC Price Trend — Next 3 Months",
  direction: "bullish" as const,
  points: [48, 50, 49, 52, 55, 53, 56, 58, 61, 60, 63, 66, 65, 68, 70, 72],
  low: [45, 46, 45, 47, 49, 48, 50, 51, 53, 52, 54, 56, 55, 57, 59, 60],
  high: [52, 54, 53, 57, 60, 59, 62, 65, 68, 67, 71, 74, 73, 77, 80, 83],
};

export const newsHeadlines = [
  { title: "Chinese Property Stimulus Impacts Steel Demand — Q2 Outlook Shifts", time: "2h ago", tag: "MARKETS" },
  { title: "New Green Steel Regulations Announced for EU Steel Imports", time: "5h ago", tag: "POLICY" },
  { title: "Indian Mills Announce Fourth Round of Price Hikes Amid Hormuz Crisis", time: "8h ago", tag: "PRICING" },
  { title: "Australian Coking Coal Exports Hit Record Levels in February", time: "12h ago", tag: "SUPPLY" },
  { title: "EAF Capacity Additions in Gujarat May Ease Domestic Rebar Supply", time: "1d ago", tag: "INDUSTRY" },
];
