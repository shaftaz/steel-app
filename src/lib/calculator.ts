export type ProductType = "round" | "square" | "rectangular" | "sheet";

export interface CalculationResult {
  weight: number;
  volume: number;
}

const STEEL_DENSITY = 7.85; // g/cm³

export function calculateSteelWeight(
  type: ProductType,
  dimensions: Record<string, number>
): CalculationResult | null {
  let volume = 0;

  switch (type) {
    case "round": {
      const { diameter, length } = dimensions;
      if (!diameter || !length) return null;
      const radiusCm = diameter / 20;
      const lengthCm = length * 100;
      volume = Math.PI * Math.pow(radiusCm, 2) * lengthCm;
      break;
    }
    case "square": {
      const { side, length } = dimensions;
      if (!side || !length) return null;
      const sideCm = side / 10;
      const lengthCm = length * 100;
      volume = Math.pow(sideCm, 2) * lengthCm;
      break;
    }
    case "rectangular": {
      const { width, height, length } = dimensions;
      if (!width || !height || !length) return null;
      const widthCm = width / 10;
      const heightCm = height / 10;
      const lengthCm = length * 100;
      volume = widthCm * heightCm * lengthCm;
      break;
    }
    case "sheet": {
      const { length, width, thickness } = dimensions;
      if (!length || !width || !thickness) return null;
      const lengthCm = length / 10;
      const widthCm = width / 10;
      const thicknessCm = thickness / 10;
      volume = lengthCm * widthCm * thicknessCm;
      break;
    }
  }

  if (volume <= 0) return null;

  const weight = (volume * STEEL_DENSITY) / 1000;
  return { weight, volume };
}
