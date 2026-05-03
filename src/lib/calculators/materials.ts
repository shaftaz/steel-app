/* ── Material densities (g/cm³) ── */
export interface Material {
  name: string;
  density: number; // g/cm³
}

export const MATERIALS: Material[] = [
  { name: "Mild Steel (MS)", density: 7.85 },
  { name: "Stainless Steel 304", density: 8.0 },
  { name: "Stainless Steel 316", density: 8.027 },
  { name: "Carbon Steel", density: 7.85 },
  { name: "Aluminium", density: 2.7 },
  { name: "Copper", density: 8.96 },
  { name: "Brass", density: 8.5 },
  { name: "Cast Iron", density: 7.2 },
  { name: "Titanium", density: 4.51 },
  { name: "Zinc", density: 7.13 },
  { name: "Lead", density: 11.34 },
  { name: "Nickel", density: 8.9 },
  { name: "Inconel 625", density: 8.44 },
  { name: "Tool Steel", density: 7.72 },
];

/* ── Sheet Metal Gauge Table (Standard Steel Gauge / MSG) ── */
export interface GaugeEntry {
  gauge: number;
  mm: number;
  inches: number;
  kgPerSqm: number; // MS density 7.85
}

export const GAUGE_TABLE: GaugeEntry[] = [
  { gauge: 7, mm: 4.554, inches: 0.1793, kgPerSqm: 35.75 },
  { gauge: 8, mm: 4.176, inches: 0.1644, kgPerSqm: 32.78 },
  { gauge: 9, mm: 3.797, inches: 0.1495, kgPerSqm: 29.81 },
  { gauge: 10, mm: 3.416, inches: 0.1345, kgPerSqm: 26.81 },
  { gauge: 11, mm: 3.038, inches: 0.1196, kgPerSqm: 23.85 },
  { gauge: 12, mm: 2.657, inches: 0.1046, kgPerSqm: 20.86 },
  { gauge: 13, mm: 2.278, inches: 0.0897, kgPerSqm: 17.88 },
  { gauge: 14, mm: 1.897, inches: 0.0747, kgPerSqm: 14.89 },
  { gauge: 15, mm: 1.709, inches: 0.0673, kgPerSqm: 13.42 },
  { gauge: 16, mm: 1.519, inches: 0.0598, kgPerSqm: 11.92 },
  { gauge: 17, mm: 1.367, inches: 0.0538, kgPerSqm: 10.73 },
  { gauge: 18, mm: 1.214, inches: 0.0478, kgPerSqm: 9.53 },
  { gauge: 19, mm: 1.062, inches: 0.0418, kgPerSqm: 8.34 },
  { gauge: 20, mm: 0.912, inches: 0.0359, kgPerSqm: 7.16 },
  { gauge: 21, mm: 0.836, inches: 0.0329, kgPerSqm: 6.56 },
  { gauge: 22, mm: 0.759, inches: 0.0299, kgPerSqm: 5.96 },
  { gauge: 23, mm: 0.683, inches: 0.0269, kgPerSqm: 5.36 },
  { gauge: 24, mm: 0.607, inches: 0.0239, kgPerSqm: 4.76 },
  { gauge: 25, mm: 0.531, inches: 0.0209, kgPerSqm: 4.17 },
  { gauge: 26, mm: 0.455, inches: 0.0179, kgPerSqm: 3.57 },
  { gauge: 27, mm: 0.417, inches: 0.0164, kgPerSqm: 3.27 },
  { gauge: 28, mm: 0.378, inches: 0.0149, kgPerSqm: 2.97 },
  { gauge: 29, mm: 0.343, inches: 0.0135, kgPerSqm: 2.69 },
  { gauge: 30, mm: 0.305, inches: 0.012, kgPerSqm: 2.39 },
];

/* ── Hardness Conversion Table (approximate) ── */
export interface HardnessEntry {
  brinell: number;
  rockwellC: number | null;
  rockwellB: number | null;
  vickers: number;
  tensileApproxMPa: number;
}

export const HARDNESS_TABLE: HardnessEntry[] = [
  { brinell: 739, rockwellC: 65, rockwellB: null, vickers: 832, tensileApproxMPa: 2530 },
  { brinell: 712, rockwellC: 63, rockwellB: null, vickers: 800, tensileApproxMPa: 2445 },
  { brinell: 682, rockwellC: 61, rockwellB: null, vickers: 765, tensileApproxMPa: 2355 },
  { brinell: 653, rockwellC: 59, rockwellB: null, vickers: 730, tensileApproxMPa: 2240 },
  { brinell: 627, rockwellC: 57, rockwellB: null, vickers: 697, tensileApproxMPa: 2150 },
  { brinell: 601, rockwellC: 55, rockwellB: null, vickers: 667, tensileApproxMPa: 2070 },
  { brinell: 578, rockwellC: 53, rockwellB: null, vickers: 640, tensileApproxMPa: 1985 },
  { brinell: 555, rockwellC: 51, rockwellB: null, vickers: 615, tensileApproxMPa: 1900 },
  { brinell: 532, rockwellC: 49, rockwellB: null, vickers: 591, tensileApproxMPa: 1830 },
  { brinell: 512, rockwellC: 47, rockwellB: null, vickers: 569, tensileApproxMPa: 1760 },
  { brinell: 492, rockwellC: 45, rockwellB: null, vickers: 547, tensileApproxMPa: 1690 },
  { brinell: 472, rockwellC: 43, rockwellB: null, vickers: 525, tensileApproxMPa: 1620 },
  { brinell: 451, rockwellC: 41, rockwellB: null, vickers: 501, tensileApproxMPa: 1550 },
  { brinell: 432, rockwellC: 39, rockwellB: null, vickers: 480, tensileApproxMPa: 1485 },
  { brinell: 415, rockwellC: 37, rockwellB: null, vickers: 461, tensileApproxMPa: 1420 },
  { brinell: 397, rockwellC: 35, rockwellB: null, vickers: 442, tensileApproxMPa: 1360 },
  { brinell: 380, rockwellC: 33, rockwellB: null, vickers: 423, tensileApproxMPa: 1300 },
  { brinell: 363, rockwellC: 31, rockwellB: null, vickers: 404, tensileApproxMPa: 1240 },
  { brinell: 347, rockwellC: 29, rockwellB: null, vickers: 385, tensileApproxMPa: 1180 },
  { brinell: 331, rockwellC: 27, rockwellB: null, vickers: 366, tensileApproxMPa: 1120 },
  { brinell: 316, rockwellC: 25, rockwellB: null, vickers: 350, tensileApproxMPa: 1080 },
  { brinell: 302, rockwellC: 23, rockwellB: null, vickers: 334, tensileApproxMPa: 1030 },
  { brinell: 286, rockwellC: 21, rockwellB: null, vickers: 316, tensileApproxMPa: 980 },
  { brinell: 271, rockwellC: 19, rockwellB: null, vickers: 299, tensileApproxMPa: 930 },
  { brinell: 258, rockwellC: 17, rockwellB: null, vickers: 284, tensileApproxMPa: 885 },
  { brinell: 247, rockwellC: 15, rockwellB: 100, vickers: 271, tensileApproxMPa: 845 },
  { brinell: 237, rockwellC: 13, rockwellB: 99, vickers: 260, tensileApproxMPa: 810 },
  { brinell: 226, rockwellC: null, rockwellB: 98, vickers: 248, tensileApproxMPa: 775 },
  { brinell: 217, rockwellC: null, rockwellB: 96, vickers: 238, tensileApproxMPa: 745 },
  { brinell: 207, rockwellC: null, rockwellB: 95, vickers: 228, tensileApproxMPa: 710 },
  { brinell: 197, rockwellC: null, rockwellB: 93, vickers: 217, tensileApproxMPa: 675 },
  { brinell: 187, rockwellC: null, rockwellB: 91, vickers: 206, tensileApproxMPa: 640 },
  { brinell: 179, rockwellC: null, rockwellB: 89, vickers: 196, tensileApproxMPa: 615 },
  { brinell: 170, rockwellC: null, rockwellB: 87, vickers: 186, tensileApproxMPa: 585 },
  { brinell: 163, rockwellC: null, rockwellB: 85, vickers: 178, tensileApproxMPa: 560 },
  { brinell: 156, rockwellC: null, rockwellB: 83, vickers: 171, tensileApproxMPa: 535 },
  { brinell: 149, rockwellC: null, rockwellB: 81, vickers: 163, tensileApproxMPa: 515 },
  { brinell: 143, rockwellC: null, rockwellB: 79, vickers: 156, tensileApproxMPa: 490 },
  { brinell: 137, rockwellC: null, rockwellB: 77, vickers: 150, tensileApproxMPa: 470 },
  { brinell: 131, rockwellC: null, rockwellB: 75, vickers: 143, tensileApproxMPa: 450 },
  { brinell: 126, rockwellC: null, rockwellB: 72, vickers: 137, tensileApproxMPa: 435 },
  { brinell: 121, rockwellC: null, rockwellB: 69, vickers: 131, tensileApproxMPa: 415 },
  { brinell: 116, rockwellC: null, rockwellB: 67, vickers: 126, tensileApproxMPa: 400 },
  { brinell: 111, rockwellC: null, rockwellB: 65, vickers: 121, tensileApproxMPa: 385 },
];

/* ── Standard Rebar Sizes ── */
export interface RebarSize {
  diameter: number; // mm
  area: number; // mm²
  kgPerMetre: number;
}

export const REBAR_SIZES: RebarSize[] = [
  { diameter: 6, area: 28.27, kgPerMetre: 0.222 },
  { diameter: 8, area: 50.27, kgPerMetre: 0.395 },
  { diameter: 10, area: 78.54, kgPerMetre: 0.617 },
  { diameter: 12, area: 113.1, kgPerMetre: 0.889 },
  { diameter: 16, area: 201.1, kgPerMetre: 1.58 },
  { diameter: 20, area: 314.2, kgPerMetre: 2.469 },
  { diameter: 25, area: 490.9, kgPerMetre: 3.854 },
  { diameter: 28, area: 615.8, kgPerMetre: 4.834 },
  { diameter: 32, area: 804.2, kgPerMetre: 6.313 },
  { diameter: 36, area: 1017.9, kgPerMetre: 7.99 },
  { diameter: 40, area: 1256.6, kgPerMetre: 9.864 },
];
