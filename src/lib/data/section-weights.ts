// ═══════════════════════════════════════════════════════════
// FORMULAS — every value in this file is calculated from these:
//
// TMT/Round Bar: kg/m = d² / 162.2
// Plate/Sheet:   kg/m² = thickness(mm) × 7.85
// Pipe:          kg/m = (OD - WT) × WT × 0.02466
// Equal Angle:   kg/m = (A + B - T) × T × 0.00785
// Flat Bar:      kg/m = W × T × 0.00785
// Square Tube:   kg/m = (Side - WT) × WT × 4 × 0.00785
// Rect Tube:     kg/m = 2 × (W + H - 2×WT) × WT × 0.00785
// Channel/Beam:  IS 808 standard lookup values (not calculated)
// Chequered Plate: kg/m² = thickness(mm) × 7.85 × 1.05 (5% pattern)
// ═══════════════════════════════════════════════════════════

export interface TMTBarData {
  diameter: number;
  weightPerMetre: number;
  weightPer12m: number;
  barsPerTonne: number;
  crossSectionArea: number;
}

export const tmtBars: TMTBarData[] = [
  { diameter: 6,  weightPerMetre: 0.222, weightPer12m: 2.664,   barsPerTonne: 375, crossSectionArea: 28.27 },
  { diameter: 8,  weightPerMetre: 0.395, weightPer12m: 4.740,   barsPerTonne: 211, crossSectionArea: 50.27 },
  { diameter: 10, weightPerMetre: 0.617, weightPer12m: 7.404,   barsPerTonne: 135, crossSectionArea: 78.54 },
  { diameter: 12, weightPerMetre: 0.888, weightPer12m: 10.656,  barsPerTonne: 93,  crossSectionArea: 113.10 },
  { diameter: 16, weightPerMetre: 1.578, weightPer12m: 18.936,  barsPerTonne: 52,  crossSectionArea: 201.06 },
  { diameter: 20, weightPerMetre: 2.466, weightPer12m: 29.592,  barsPerTonne: 33,  crossSectionArea: 314.16 },
  { diameter: 25, weightPerMetre: 3.853, weightPer12m: 46.236,  barsPerTonne: 21,  crossSectionArea: 490.87 },
  { diameter: 28, weightPerMetre: 4.834, weightPer12m: 58.008,  barsPerTonne: 17,  crossSectionArea: 615.75 },
  { diameter: 32, weightPerMetre: 6.316, weightPer12m: 75.792,  barsPerTonne: 13,  crossSectionArea: 804.25 },
  { diameter: 36, weightPerMetre: 7.990, weightPer12m: 95.880,  barsPerTonne: 10,  crossSectionArea: 1017.88 },
  { diameter: 40, weightPerMetre: 9.864, weightPer12m: 118.368, barsPerTonne: 8,   crossSectionArea: 1256.64 },
];

export interface PlateData {
  thickness: number;
  weightPerSqm: number;
  weight1500x6000: number;
  weight2000x6000: number;
}

export const plates: PlateData[] = [
  { thickness: 1,  weightPerSqm: 7.85,   weight1500x6000: 70.65,   weight2000x6000: 94.20 },
  { thickness: 2,  weightPerSqm: 15.70,  weight1500x6000: 141.30,  weight2000x6000: 188.40 },
  { thickness: 3,  weightPerSqm: 23.55,  weight1500x6000: 211.95,  weight2000x6000: 282.60 },
  { thickness: 4,  weightPerSqm: 31.40,  weight1500x6000: 282.60,  weight2000x6000: 376.80 },
  { thickness: 5,  weightPerSqm: 39.25,  weight1500x6000: 353.25,  weight2000x6000: 471.00 },
  { thickness: 6,  weightPerSqm: 47.10,  weight1500x6000: 423.90,  weight2000x6000: 565.20 },
  { thickness: 8,  weightPerSqm: 62.80,  weight1500x6000: 565.20,  weight2000x6000: 753.60 },
  { thickness: 10, weightPerSqm: 78.50,  weight1500x6000: 706.50,  weight2000x6000: 942.00 },
  { thickness: 12, weightPerSqm: 94.20,  weight1500x6000: 847.80,  weight2000x6000: 1130.40 },
  { thickness: 14, weightPerSqm: 109.90, weight1500x6000: 989.10,  weight2000x6000: 1318.80 },
  { thickness: 16, weightPerSqm: 125.60, weight1500x6000: 1130.40, weight2000x6000: 1507.20 },
  { thickness: 18, weightPerSqm: 141.30, weight1500x6000: 1271.70, weight2000x6000: 1695.60 },
  { thickness: 20, weightPerSqm: 157.00, weight1500x6000: 1413.00, weight2000x6000: 1884.00 },
  { thickness: 22, weightPerSqm: 172.70, weight1500x6000: 1554.30, weight2000x6000: 2072.40 },
  { thickness: 25, weightPerSqm: 196.25, weight1500x6000: 1766.25, weight2000x6000: 2355.00 },
  { thickness: 28, weightPerSqm: 219.80, weight1500x6000: 1978.20, weight2000x6000: 2637.60 },
  { thickness: 30, weightPerSqm: 235.50, weight1500x6000: 2119.50, weight2000x6000: 2826.00 },
  { thickness: 32, weightPerSqm: 251.20, weight1500x6000: 2260.80, weight2000x6000: 3014.40 },
  { thickness: 36, weightPerSqm: 282.60, weight1500x6000: 2543.40, weight2000x6000: 3391.20 },
  { thickness: 40, weightPerSqm: 314.00, weight1500x6000: 2826.00, weight2000x6000: 3768.00 },
  { thickness: 45, weightPerSqm: 353.25, weight1500x6000: 3179.25, weight2000x6000: 4239.00 },
  { thickness: 50, weightPerSqm: 392.50, weight1500x6000: 3532.50, weight2000x6000: 4710.00 },
];

export interface PipeData {
  nbSize: number;
  nbInch: string;
  od: number;
  wallThickness: number;
  weightPerMetre: number;
  weightPer6m: number;
}

export const pipes: PipeData[] = [
  { nbSize: 15,  nbInch: '½"',   od: 21.3,  wallThickness: 2.6, weightPerMetre: 1.21,  weightPer6m: 7.26 },
  { nbSize: 20,  nbInch: '¾"',   od: 26.9,  wallThickness: 2.6, weightPerMetre: 1.56,  weightPer6m: 9.36 },
  { nbSize: 25,  nbInch: '1"',   od: 33.7,  wallThickness: 3.2, weightPerMetre: 2.41,  weightPer6m: 14.46 },
  { nbSize: 32,  nbInch: '1¼"',  od: 42.4,  wallThickness: 3.2, weightPerMetre: 3.10,  weightPer6m: 18.60 },
  { nbSize: 40,  nbInch: '1½"',  od: 48.3,  wallThickness: 3.2, weightPerMetre: 3.56,  weightPer6m: 21.36 },
  { nbSize: 50,  nbInch: '2"',   od: 60.3,  wallThickness: 3.6, weightPerMetre: 5.03,  weightPer6m: 30.18 },
  { nbSize: 65,  nbInch: '2½"',  od: 76.1,  wallThickness: 3.6, weightPerMetre: 6.42,  weightPer6m: 38.52 },
  { nbSize: 80,  nbInch: '3"',   od: 88.9,  wallThickness: 4.0, weightPerMetre: 8.38,  weightPer6m: 50.28 },
  { nbSize: 100, nbInch: '4"',   od: 114.3, wallThickness: 4.5, weightPerMetre: 12.18, weightPer6m: 73.08 },
  { nbSize: 125, nbInch: '5"',   od: 139.7, wallThickness: 5.0, weightPerMetre: 16.62, weightPer6m: 99.72 },
  { nbSize: 150, nbInch: '6"',   od: 168.3, wallThickness: 5.0, weightPerMetre: 20.11, weightPer6m: 120.66 },
  { nbSize: 200, nbInch: '8"',   od: 219.1, wallThickness: 6.3, weightPerMetre: 33.05, weightPer6m: 198.30 },
];

export interface AngleData {
  legA: number;
  legB: number;
  thickness: number;
  weightPerMetre: number;
  weightPer6m: number;
}

export const equalAngles: AngleData[] = [
  { legA: 25,  legB: 25,  thickness: 3,  weightPerMetre: 1.11,  weightPer6m: 6.66 },
  { legA: 25,  legB: 25,  thickness: 5,  weightPerMetre: 1.77,  weightPer6m: 10.62 },
  { legA: 30,  legB: 30,  thickness: 3,  weightPerMetre: 1.36,  weightPer6m: 8.16 },
  { legA: 30,  legB: 30,  thickness: 5,  weightPerMetre: 2.16,  weightPer6m: 12.96 },
  { legA: 35,  legB: 35,  thickness: 3,  weightPerMetre: 1.60,  weightPer6m: 9.60 },
  { legA: 35,  legB: 35,  thickness: 5,  weightPerMetre: 2.54,  weightPer6m: 15.24 },
  { legA: 40,  legB: 40,  thickness: 3,  weightPerMetre: 1.83,  weightPer6m: 10.98 },
  { legA: 40,  legB: 40,  thickness: 5,  weightPerMetre: 2.95,  weightPer6m: 17.70 },
  { legA: 40,  legB: 40,  thickness: 6,  weightPerMetre: 3.48,  weightPer6m: 20.88 },
  { legA: 45,  legB: 45,  thickness: 5,  weightPerMetre: 3.34,  weightPer6m: 20.04 },
  { legA: 45,  legB: 45,  thickness: 6,  weightPerMetre: 3.95,  weightPer6m: 23.70 },
  { legA: 50,  legB: 50,  thickness: 5,  weightPerMetre: 3.73,  weightPer6m: 22.38 },
  { legA: 50,  legB: 50,  thickness: 6,  weightPerMetre: 4.42,  weightPer6m: 26.52 },
  { legA: 55,  legB: 55,  thickness: 5,  weightPerMetre: 4.12,  weightPer6m: 24.72 },
  { legA: 55,  legB: 55,  thickness: 6,  weightPerMetre: 4.89,  weightPer6m: 29.34 },
  { legA: 60,  legB: 60,  thickness: 5,  weightPerMetre: 4.52,  weightPer6m: 27.12 },
  { legA: 60,  legB: 60,  thickness: 6,  weightPerMetre: 5.36,  weightPer6m: 32.16 },
  { legA: 65,  legB: 65,  thickness: 5,  weightPerMetre: 4.91,  weightPer6m: 29.46 },
  { legA: 65,  legB: 65,  thickness: 6,  weightPerMetre: 5.83,  weightPer6m: 34.98 },
  { legA: 75,  legB: 75,  thickness: 6,  weightPerMetre: 6.77,  weightPer6m: 40.62 },
  { legA: 75,  legB: 75,  thickness: 8,  weightPerMetre: 8.90,  weightPer6m: 53.40 },
  { legA: 80,  legB: 80,  thickness: 6,  weightPerMetre: 7.24,  weightPer6m: 43.44 },
  { legA: 80,  legB: 80,  thickness: 8,  weightPerMetre: 9.50,  weightPer6m: 57.00 },
  { legA: 90,  legB: 90,  thickness: 6,  weightPerMetre: 8.18,  weightPer6m: 49.08 },
  { legA: 90,  legB: 90,  thickness: 8,  weightPerMetre: 10.75, weightPer6m: 64.50 },
  { legA: 100, legB: 100, thickness: 6,  weightPerMetre: 9.12,  weightPer6m: 54.72 },
  { legA: 100, legB: 100, thickness: 8,  weightPerMetre: 11.98, weightPer6m: 71.88 },
  { legA: 100, legB: 100, thickness: 10, weightPerMetre: 14.73, weightPer6m: 88.38 },
  { legA: 110, legB: 110, thickness: 8,  weightPerMetre: 13.23, weightPer6m: 79.38 },
  { legA: 110, legB: 110, thickness: 10, weightPerMetre: 16.26, weightPer6m: 97.56 },
  { legA: 130, legB: 130, thickness: 10, weightPerMetre: 19.63, weightPer6m: 117.78 },
  { legA: 130, legB: 130, thickness: 12, weightPerMetre: 23.18, weightPer6m: 139.08 },
  { legA: 150, legB: 150, thickness: 10, weightPerMetre: 22.74, weightPer6m: 136.44 },
  { legA: 150, legB: 150, thickness: 12, weightPerMetre: 26.87, weightPer6m: 161.22 },
  { legA: 200, legB: 200, thickness: 12, weightPerMetre: 36.53, weightPer6m: 219.18 },
  { legA: 200, legB: 200, thickness: 16, weightPerMetre: 48.07, weightPer6m: 288.42 },
];

export interface ISMBData {
  designation: string;
  depth: number;
  flangeWidth: number;
  webThickness: number;
  flangeThickness: number;
  weightPerMetre: number;
  sectionModulusZxx: number;
  momentOfInertiaIxx: number;
}

export const ismbBeams: ISMBData[] = [
  { designation: 'ISMB 100', depth: 100, flangeWidth: 75,  webThickness: 4.0, flangeThickness: 7.2,  weightPerMetre: 11.5,  sectionModulusZxx: 36.6,   momentOfInertiaIxx: 182.8 },
  { designation: 'ISMB 125', depth: 125, flangeWidth: 75,  webThickness: 4.4, flangeThickness: 7.6,  weightPerMetre: 13.0,  sectionModulusZxx: 53.2,   momentOfInertiaIxx: 332.6 },
  { designation: 'ISMB 150', depth: 150, flangeWidth: 80,  webThickness: 4.8, flangeThickness: 7.6,  weightPerMetre: 14.9,  sectionModulusZxx: 72.7,   momentOfInertiaIxx: 545.2 },
  { designation: 'ISMB 175', depth: 175, flangeWidth: 90,  webThickness: 5.1, flangeThickness: 8.6,  weightPerMetre: 19.3,  sectionModulusZxx: 105.3,  momentOfInertiaIxx: 921.2 },
  { designation: 'ISMB 200', depth: 200, flangeWidth: 100, webThickness: 5.7, flangeThickness: 10.8, weightPerMetre: 25.4,  sectionModulusZxx: 156.2,  momentOfInertiaIxx: 1561.8 },
  { designation: 'ISMB 225', depth: 225, flangeWidth: 110, webThickness: 6.5, flangeThickness: 11.8, weightPerMetre: 31.2,  sectionModulusZxx: 218.5,  momentOfInertiaIxx: 2458.4 },
  { designation: 'ISMB 250', depth: 250, flangeWidth: 125, webThickness: 6.9, flangeThickness: 12.5, weightPerMetre: 37.3,  sectionModulusZxx: 298.8,  momentOfInertiaIxx: 3717.8 },
  { designation: 'ISMB 300', depth: 300, flangeWidth: 140, webThickness: 7.7, flangeThickness: 13.1, weightPerMetre: 46.1,  sectionModulusZxx: 430.5,  momentOfInertiaIxx: 6452.8 },
  { designation: 'ISMB 350', depth: 350, flangeWidth: 140, webThickness: 8.1, flangeThickness: 14.2, weightPerMetre: 52.4,  sectionModulusZxx: 572.8,  momentOfInertiaIxx: 10028.0 },
  { designation: 'ISMB 400', depth: 400, flangeWidth: 140, webThickness: 8.9, flangeThickness: 16.0, weightPerMetre: 61.6,  sectionModulusZxx: 750.6,  momentOfInertiaIxx: 15012.0 },
  { designation: 'ISMB 450', depth: 450, flangeWidth: 150, webThickness: 9.4, flangeThickness: 17.4, weightPerMetre: 72.4,  sectionModulusZxx: 963.5,  momentOfInertiaIxx: 21678.8 },
  { designation: 'ISMB 500', depth: 500, flangeWidth: 180, webThickness: 10.2, flangeThickness: 17.2, weightPerMetre: 86.9,  sectionModulusZxx: 1279.4, momentOfInertiaIxx: 31986.0 },
  { designation: 'ISMB 550', depth: 550, flangeWidth: 190, webThickness: 11.2, flangeThickness: 19.3, weightPerMetre: 103.7, sectionModulusZxx: 1642.0, momentOfInertiaIxx: 45218.0 },
  { designation: 'ISMB 600', depth: 600, flangeWidth: 210, webThickness: 12.0, flangeThickness: 20.8, weightPerMetre: 122.6, sectionModulusZxx: 2139.0, momentOfInertiaIxx: 64134.0 },
];

export interface ISMCData {
  designation: string;
  depth: number;
  flangeWidth: number;
  webThickness: number;
  flangeThickness: number;
  weightPerMetre: number;
}

export const ismcChannels: ISMCData[] = [
  { designation: 'ISMC 75',  depth: 75,  flangeWidth: 40,  webThickness: 4.4, flangeThickness: 7.3, weightPerMetre: 6.8 },
  { designation: 'ISMC 100', depth: 100, flangeWidth: 50,  webThickness: 4.7, flangeThickness: 7.5, weightPerMetre: 9.2 },
  { designation: 'ISMC 125', depth: 125, flangeWidth: 65,  webThickness: 5.0, flangeThickness: 8.1, weightPerMetre: 12.7 },
  { designation: 'ISMC 150', depth: 150, flangeWidth: 75,  webThickness: 5.4, flangeThickness: 9.0, weightPerMetre: 16.4 },
  { designation: 'ISMC 175', depth: 175, flangeWidth: 75,  webThickness: 5.7, flangeThickness: 9.5, weightPerMetre: 19.1 },
  { designation: 'ISMC 200', depth: 200, flangeWidth: 75,  webThickness: 6.1, flangeThickness: 11.4, weightPerMetre: 22.1 },
  { designation: 'ISMC 225', depth: 225, flangeWidth: 80,  webThickness: 6.4, flangeThickness: 12.4, weightPerMetre: 25.9 },
  { designation: 'ISMC 250', depth: 250, flangeWidth: 80,  webThickness: 7.1, flangeThickness: 14.1, weightPerMetre: 30.4 },
  { designation: 'ISMC 300', depth: 300, flangeWidth: 90,  webThickness: 7.6, flangeThickness: 13.6, weightPerMetre: 36.3 },
  { designation: 'ISMC 350', depth: 350, flangeWidth: 100, webThickness: 8.1, flangeThickness: 13.5, weightPerMetre: 42.1 },
  { designation: 'ISMC 400', depth: 400, flangeWidth: 100, webThickness: 8.6, flangeThickness: 15.3, weightPerMetre: 49.4 },
];

export interface FlatBarData {
  width: number;
  thickness: number;
  weightPerMetre: number;
  weightPer6m: number;
}

export const flatBars: FlatBarData[] = [
  { width: 20,  thickness: 3,  weightPerMetre: 0.47,  weightPer6m: 2.83 },
  { width: 25,  thickness: 3,  weightPerMetre: 0.59,  weightPer6m: 3.53 },
  { width: 25,  thickness: 5,  weightPerMetre: 0.98,  weightPer6m: 5.89 },
  { width: 25,  thickness: 6,  weightPerMetre: 1.18,  weightPer6m: 7.07 },
  { width: 30,  thickness: 5,  weightPerMetre: 1.18,  weightPer6m: 7.07 },
  { width: 30,  thickness: 6,  weightPerMetre: 1.41,  weightPer6m: 8.48 },
  { width: 40,  thickness: 5,  weightPerMetre: 1.57,  weightPer6m: 9.42 },
  { width: 40,  thickness: 6,  weightPerMetre: 1.88,  weightPer6m: 11.30 },
  { width: 40,  thickness: 8,  weightPerMetre: 2.51,  weightPer6m: 15.07 },
  { width: 50,  thickness: 5,  weightPerMetre: 1.96,  weightPer6m: 11.78 },
  { width: 50,  thickness: 6,  weightPerMetre: 2.36,  weightPer6m: 14.13 },
  { width: 50,  thickness: 8,  weightPerMetre: 3.14,  weightPer6m: 18.84 },
  { width: 50,  thickness: 10, weightPerMetre: 3.93,  weightPer6m: 23.55 },
  { width: 65,  thickness: 6,  weightPerMetre: 3.06,  weightPer6m: 18.37 },
  { width: 65,  thickness: 8,  weightPerMetre: 4.08,  weightPer6m: 24.49 },
  { width: 65,  thickness: 10, weightPerMetre: 5.10,  weightPer6m: 30.62 },
  { width: 75,  thickness: 6,  weightPerMetre: 3.53,  weightPer6m: 21.20 },
  { width: 75,  thickness: 8,  weightPerMetre: 4.71,  weightPer6m: 28.26 },
  { width: 75,  thickness: 10, weightPerMetre: 5.89,  weightPer6m: 35.33 },
  { width: 100, thickness: 6,  weightPerMetre: 4.71,  weightPer6m: 28.26 },
  { width: 100, thickness: 8,  weightPerMetre: 6.28,  weightPer6m: 37.68 },
  { width: 100, thickness: 10, weightPerMetre: 7.85,  weightPer6m: 47.10 },
  { width: 100, thickness: 12, weightPerMetre: 9.42,  weightPer6m: 56.52 },
];

export interface SquareTubeData {
  side: number;
  wallThickness: number;
  weightPerMetre: number;
  weightPer6m: number;
}

export const squareTubes: SquareTubeData[] = [
  { side: 20,  wallThickness: 1.5, weightPerMetre: 0.87,  weightPer6m: 5.21 },
  { side: 20,  wallThickness: 2.0, weightPerMetre: 1.13,  weightPer6m: 6.78 },
  { side: 25,  wallThickness: 1.5, weightPerMetre: 1.11,  weightPer6m: 6.63 },
  { side: 25,  wallThickness: 2.0, weightPerMetre: 1.44,  weightPer6m: 8.67 },
  { side: 25,  wallThickness: 2.5, weightPerMetre: 1.77,  weightPer6m: 10.60 },
  { side: 30,  wallThickness: 2.0, weightPerMetre: 1.76,  weightPer6m: 10.55 },
  { side: 30,  wallThickness: 2.5, weightPerMetre: 2.16,  weightPer6m: 12.94 },
  { side: 40,  wallThickness: 2.0, weightPerMetre: 2.39,  weightPer6m: 14.32 },
  { side: 40,  wallThickness: 2.5, weightPerMetre: 2.94,  weightPer6m: 17.66 },
  { side: 40,  wallThickness: 3.0, weightPerMetre: 3.48,  weightPer6m: 20.88 },
  { side: 50,  wallThickness: 2.5, weightPerMetre: 3.73,  weightPer6m: 22.38 },
  { side: 50,  wallThickness: 3.0, weightPerMetre: 4.42,  weightPer6m: 26.52 },
  { side: 50,  wallThickness: 4.0, weightPerMetre: 5.77,  weightPer6m: 34.62 },
  { side: 60,  wallThickness: 2.5, weightPerMetre: 4.52,  weightPer6m: 27.09 },
  { side: 60,  wallThickness: 3.0, weightPerMetre: 5.36,  weightPer6m: 32.16 },
  { side: 60,  wallThickness: 4.0, weightPerMetre: 7.02,  weightPer6m: 42.12 },
  { side: 75,  wallThickness: 3.0, weightPerMetre: 6.77,  weightPer6m: 40.62 },
  { side: 75,  wallThickness: 4.0, weightPerMetre: 8.90,  weightPer6m: 53.40 },
  { side: 75,  wallThickness: 5.0, weightPerMetre: 10.99, weightPer6m: 65.94 },
  { side: 80,  wallThickness: 3.0, weightPerMetre: 7.24,  weightPer6m: 43.44 },
  { side: 80,  wallThickness: 4.0, weightPerMetre: 9.50,  weightPer6m: 57.00 },
  { side: 100, wallThickness: 3.0, weightPerMetre: 9.12,  weightPer6m: 54.72 },
  { side: 100, wallThickness: 4.0, weightPerMetre: 11.98, weightPer6m: 71.88 },
  { side: 100, wallThickness: 5.0, weightPerMetre: 14.92, weightPer6m: 89.52 },
];

export interface RectTubeData {
  width: number;
  height: number;
  wallThickness: number;
  weightPerMetre: number;
  weightPer6m: number;
}

export const rectTubes: RectTubeData[] = [
  { width: 40,  height: 20,  wallThickness: 2.0, weightPerMetre: 1.76,  weightPer6m: 10.55 },
  { width: 40,  height: 20,  wallThickness: 2.5, weightPerMetre: 2.16,  weightPer6m: 12.94 },
  { width: 50,  height: 25,  wallThickness: 2.0, weightPerMetre: 2.20,  weightPer6m: 13.20 },
  { width: 50,  height: 25,  wallThickness: 2.5, weightPerMetre: 2.71,  weightPer6m: 16.28 },
  { width: 50,  height: 25,  wallThickness: 3.0, weightPerMetre: 3.21,  weightPer6m: 19.24 },
  { width: 60,  height: 30,  wallThickness: 2.0, weightPerMetre: 2.64,  weightPer6m: 15.84 },
  { width: 60,  height: 30,  wallThickness: 2.5, weightPerMetre: 3.26,  weightPer6m: 19.56 },
  { width: 60,  height: 30,  wallThickness: 3.0, weightPerMetre: 3.86,  weightPer6m: 23.15 },
  { width: 60,  height: 40,  wallThickness: 2.5, weightPerMetre: 3.65,  weightPer6m: 21.88 },
  { width: 60,  height: 40,  wallThickness: 3.0, weightPerMetre: 4.33,  weightPer6m: 25.96 },
  { width: 80,  height: 40,  wallThickness: 2.5, weightPerMetre: 4.42,  weightPer6m: 26.52 },
  { width: 80,  height: 40,  wallThickness: 3.0, weightPerMetre: 5.25,  weightPer6m: 31.49 },
  { width: 80,  height: 40,  wallThickness: 4.0, weightPerMetre: 6.88,  weightPer6m: 41.26 },
  { width: 100, height: 50,  wallThickness: 2.5, weightPerMetre: 5.58,  weightPer6m: 33.46 },
  { width: 100, height: 50,  wallThickness: 3.0, weightPerMetre: 6.60,  weightPer6m: 39.60 },
  { width: 100, height: 50,  wallThickness: 4.0, weightPerMetre: 8.64,  weightPer6m: 51.82 },
  { width: 100, height: 50,  wallThickness: 5.0, weightPerMetre: 10.60, weightPer6m: 63.59 },
  { width: 120, height: 60,  wallThickness: 3.0, weightPerMetre: 7.96,  weightPer6m: 47.73 },
  { width: 120, height: 60,  wallThickness: 4.0, weightPerMetre: 10.43, weightPer6m: 62.58 },
  { width: 120, height: 60,  wallThickness: 5.0, weightPerMetre: 12.80, weightPer6m: 76.81 },
  { width: 150, height: 75,  wallThickness: 4.0, weightPerMetre: 13.19, weightPer6m: 79.14 },
  { width: 150, height: 75,  wallThickness: 5.0, weightPerMetre: 16.25, weightPer6m: 97.49 },
  { width: 200, height: 100, wallThickness: 4.0, weightPerMetre: 17.58, weightPer6m: 105.50 },
  { width: 200, height: 100, wallThickness: 5.0, weightPerMetre: 21.67, weightPer6m: 130.03 },
  { width: 200, height: 100, wallThickness: 6.0, weightPerMetre: 25.66, weightPer6m: 153.95 },
];

export interface ChequeredPlateData {
  thickness: number;
  weightPerSqm: number;
  weight1500x6000: number;
  weight2000x6000: number;
}

export const chequeredPlates: ChequeredPlateData[] = [
  { thickness: 3,  weightPerSqm: 24.73,  weight1500x6000: 222.55, weight2000x6000: 296.73 },
  { thickness: 4,  weightPerSqm: 32.97,  weight1500x6000: 296.73, weight2000x6000: 395.64 },
  { thickness: 5,  weightPerSqm: 41.21,  weight1500x6000: 370.91, weight2000x6000: 494.55 },
  { thickness: 6,  weightPerSqm: 49.46,  weight1500x6000: 445.10, weight2000x6000: 593.46 },
  { thickness: 8,  weightPerSqm: 65.94,  weight1500x6000: 593.46, weight2000x6000: 791.28 },
  { thickness: 10, weightPerSqm: 82.43,  weight1500x6000: 741.83, weight2000x6000: 989.10 },
  { thickness: 12, weightPerSqm: 98.91,  weight1500x6000: 890.19, weight2000x6000: 1186.92 },
  { thickness: 14, weightPerSqm: 115.40, weight1500x6000: 1038.56, weight2000x6000: 1384.74 },
  { thickness: 16, weightPerSqm: 131.88, weight1500x6000: 1186.92, weight2000x6000: 1582.56 },
  { thickness: 20, weightPerSqm: 164.85, weight1500x6000: 1483.65, weight2000x6000: 1978.20 },
  { thickness: 25, weightPerSqm: 206.06, weight1500x6000: 1854.56, weight2000x6000: 2472.75 },
];

// Round bar data for non-rebar applications (bright bar, EN series)
export interface RoundBarData {
  diameter: number;
  weightPerMetreMS: number;
  weightPerMetreSS304: number;
  weightPerMetreSS316: number;
}

export const roundBars: RoundBarData[] = [
  { diameter: 6,   weightPerMetreMS: 0.222, weightPerMetreSS304: 0.226, weightPerMetreSS316: 0.227 },
  { diameter: 8,   weightPerMetreMS: 0.395, weightPerMetreSS304: 0.402, weightPerMetreSS316: 0.403 },
  { diameter: 10,  weightPerMetreMS: 0.617, weightPerMetreSS304: 0.628, weightPerMetreSS316: 0.630 },
  { diameter: 12,  weightPerMetreMS: 0.888, weightPerMetreSS304: 0.905, weightPerMetreSS316: 0.908 },
  { diameter: 14,  weightPerMetreMS: 1.208, weightPerMetreSS304: 1.231, weightPerMetreSS316: 1.235 },
  { diameter: 16,  weightPerMetreMS: 1.578, weightPerMetreSS304: 1.608, weightPerMetreSS316: 1.613 },
  { diameter: 18,  weightPerMetreMS: 1.998, weightPerMetreSS304: 2.036, weightPerMetreSS316: 2.042 },
  { diameter: 20,  weightPerMetreMS: 2.466, weightPerMetreSS304: 2.513, weightPerMetreSS316: 2.521 },
  { diameter: 22,  weightPerMetreMS: 2.984, weightPerMetreSS304: 3.041, weightPerMetreSS316: 3.051 },
  { diameter: 25,  weightPerMetreMS: 3.853, weightPerMetreSS304: 3.927, weightPerMetreSS316: 3.939 },
  { diameter: 28,  weightPerMetreMS: 4.834, weightPerMetreSS304: 4.927, weightPerMetreSS316: 4.942 },
  { diameter: 30,  weightPerMetreMS: 5.549, weightPerMetreSS304: 5.655, weightPerMetreSS316: 5.672 },
  { diameter: 32,  weightPerMetreMS: 6.316, weightPerMetreSS304: 6.436, weightPerMetreSS316: 6.456 },
  { diameter: 36,  weightPerMetreMS: 7.990, weightPerMetreSS304: 8.143, weightPerMetreSS316: 8.168 },
  { diameter: 40,  weightPerMetreMS: 9.864, weightPerMetreSS304: 10.053, weightPerMetreSS316: 10.084 },
  { diameter: 45,  weightPerMetreMS: 12.485, weightPerMetreSS304: 12.724, weightPerMetreSS316: 12.763 },
  { diameter: 50,  weightPerMetreMS: 15.413, weightPerMetreSS304: 15.708, weightPerMetreSS316: 15.756 },
  { diameter: 55,  weightPerMetreMS: 18.647, weightPerMetreSS304: 19.007, weightPerMetreSS316: 19.065 },
  { diameter: 60,  weightPerMetreMS: 22.195, weightPerMetreSS304: 22.619, weightPerMetreSS316: 22.688 },
  { diameter: 65,  weightPerMetreMS: 26.050, weightPerMetreSS304: 26.547, weightPerMetreSS316: 26.628 },
  { diameter: 70,  weightPerMetreMS: 30.210, weightPerMetreSS304: 30.788, weightPerMetreSS316: 30.882 },
  { diameter: 75,  weightPerMetreMS: 34.677, weightPerMetreSS304: 35.343, weightPerMetreSS316: 35.451 },
  { diameter: 80,  weightPerMetreMS: 39.458, weightPerMetreSS304: 40.212, weightPerMetreSS316: 40.335 },
  { diameter: 90,  weightPerMetreMS: 49.940, weightPerMetreSS304: 50.894, weightPerMetreSS316: 51.050 },
  { diameter: 100, weightPerMetreMS: 61.654, weightPerMetreSS304: 62.832, weightPerMetreSS316: 63.024 },
];
