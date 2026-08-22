import {
  tmtBars,
  pipes,
  ismbBeams,
  ismcChannels,
  equalAngles,
  plates,
  flatBars,
} from "@/lib/data/section-weights";

/* ============================================================
   Programmatic per-size weight pages (/weights/<slug>).
   Purely additive: every value comes from the verified
   section-weights tables; slugs target size-specific queries
   ("12mm tmt bar weight") that no existing page targets.
   ============================================================ */

export interface WeightPageFaq {
  q: string;
  a: string;
}

export interface WeightPageRow {
  label: string;
  cells: string[];
  href?: string;
  active?: boolean;
}

export interface WeightPage {
  slug: string;
  family: string;
  familyLabel: string;
  h1: string;
  metaTitle: string;
  metaDescription: string;
  kicker: string;
  answerLabel: string;
  answerValue: string;
  stats: { label: string; value: string }[];
  formula: string;
  formulaNote: string;
  source: string;
  faqs: WeightPageFaq[];
  tableCaption: string;
  tableHeaders: string[];
  rows: WeightPageRow[];
  calcHref: string;
  calcLabel: string;
  related: { label: string; href: string }[];
  ogValue: string;
  ogLabel: string;
}

function f(n: number, dp = 3) {
  return n.toLocaleString("en-IN", {
    minimumFractionDigits: dp,
    maximumFractionDigits: dp,
  });
}

const pagesList: WeightPage[] = [];

/* ---------------- TMT bars ---------------- */
const tmtSlug = (d: number) => `${d}mm-tmt-bar-weight`;
for (const b of tmtBars) {
  const perFoot = b.weightPerMetre * 0.3048;
  pagesList.push({
    slug: tmtSlug(b.diameter),
    family: "tmt",
    familyLabel: "TMT / Rebar",
    h1: `${b.diameter}mm TMT Bar Weight: Per Metre, Per Foot and Per Bar`,
    metaTitle: `${b.diameter}mm TMT Bar Weight: Per Metre, Per Foot and Per Bar`,
    metaDescription: `A ${b.diameter}mm TMT bar weighs ${f(b.weightPerMetre)} kg per metre and ${f(b.weightPer12m, 2)} kg per standard 12 m bar, about ${b.barsPerTonne} bars per tonne. Formula, full size chart and free calculator (IS 1786).`,
    kicker: `TMT / REBAR · d² ÷ 162.2 · IS 1786 · ASTM A615 · JIS G3112`,
    answerLabel: "WEIGHT PER METRE",
    answerValue: `${f(b.weightPerMetre)} kg/m`,
    stats: [
      { label: "PER FOOT", value: `${f(perFoot)} kg/ft` },
      { label: "PER 12 M BAR", value: `${f(b.weightPer12m, 2)} kg` },
      { label: "BARS PER TONNE", value: `≈ ${b.barsPerTonne}` },
      { label: "CROSS-SECTION", value: `${f(b.crossSectionArea, 2)} mm²` },
    ],
    formula: `${b.diameter}² ÷ 162.2 = ${f(b.weightPerMetre)} kg/m`,
    formulaNote:
      "Constant 162.2 = 10⁶ ÷ (π/4 × 7,850), from mild-steel density 7,850 kg/m³",
    source: "SOURCE: IS 1786 · ASTM A615 · JIS G3112 · BS 4449 · LAST VERIFIED 18 JUL 2026",
    faqs: [
      {
        q: `How much does a ${b.diameter}mm TMT bar weigh per metre?`,
        a: `A ${b.diameter}mm TMT bar weighs ${f(b.weightPerMetre)} kg per metre, calculated with the d²/162.2 formula: (${b.diameter} × ${b.diameter}) ÷ 162.2 = ${f(b.weightPerMetre)} kg/m.`,
      },
      {
        q: `What is the weight of a full 12-metre ${b.diameter}mm TMT bar?`,
        a: `A standard 12 m length of ${b.diameter}mm TMT weighs ${f(b.weightPer12m, 2)} kg (${f(b.weightPerMetre)} kg/m × 12 m).`,
      },
      {
        q: `How many ${b.diameter}mm TMT bars are there in one tonne?`,
        a: `Approximately ${b.barsPerTonne} standard 12 m bars of ${b.diameter}mm TMT make one tonne (1,000 ÷ ${f(b.weightPer12m, 2)} kg per bar). Actual counts vary with rolling tolerance under IS 1786.`,
      },
    ],
    tableCaption: "TMT bar weight, all standard sizes (12 m bars)",
    tableHeaders: ["Size", "kg/m", "kg per 12 m bar", "Bars/tonne"],
    rows: tmtBars.map((r) => ({
      label: `${r.diameter}mm`,
      cells: [f(r.weightPerMetre), f(r.weightPer12m, 2), `≈ ${r.barsPerTonne}`],
      href: `/weights/${tmtSlug(r.diameter)}`,
      active: r.diameter === b.diameter,
    })),
    calcHref: `/calculator?shape=round&grade=Fe500&d=${b.diameter}&l=12`,
    calcLabel: `Open the calculator prefilled with ${b.diameter}mm × 12 m →`,
    related: [
      { label: "TMT Bar Weight Calculator", href: "/calculators/tmt" },
      { label: "TMT Bar Weight Chart (All Sizes)", href: "/articles/tmt-bar-weight-per-metre-chart" },
      { label: "How to Calculate Weight of Steel", href: "/articles/how-to-calculate-weight-of-steel-formula-guide" },
    ],
    ogValue: `${f(b.weightPerMetre)} kg/m`,
    ogLabel: `${b.diameter}MM TMT BAR · ${f(b.weightPer12m, 2)} KG PER 12 M BAR`,
  });
}

/* ---------------- MS pipes (IS 1239 medium) ---------------- */
const pipeSlug = (nb: number) => `${nb}mm-ms-pipe-weight`;
for (const p of pipes) {
  pagesList.push({
    slug: pipeSlug(p.nbSize),
    family: "pipe",
    familyLabel: "MS Pipe (IS 1239)",
    h1: `${p.nbSize}mm (${p.nbInch}) MS Pipe Weight Per Metre`,
    metaTitle: `${p.nbSize}mm (${p.nbInch}) MS Pipe Weight Per Metre (IS 1239)`,
    metaDescription: `A ${p.nbSize} NB (${p.nbInch}) MS pipe weighs ${f(p.weightPerMetre, 2)} kg per metre, ${f(p.weightPer6m, 2)} kg per 6 m length (OD ${p.od} mm, wall ${p.wallThickness} mm, IS 1239 medium). Formula, chart and free calculator.`,
    kicker: `MS PIPE · (OD − WT) × WT × 0.02466 · IS 1239 · ASTM A53 · JIS G3452`,
    answerLabel: "WEIGHT PER METRE",
    answerValue: `${f(p.weightPerMetre, 2)} kg/m`,
    stats: [
      { label: "PER 6 M LENGTH", value: `${f(p.weightPer6m, 2)} kg` },
      { label: "OUTER DIAMETER", value: `${p.od} mm` },
      { label: "WALL THICKNESS", value: `${p.wallThickness} mm` },
      { label: "LENGTHS PER TONNE", value: `≈ ${f(1000 / p.weightPer6m, 1)}` },
    ],
    formula: `(${p.od} − ${p.wallThickness}) × ${p.wallThickness} × 0.02466 = ${f(p.weightPerMetre, 2)} kg/m`,
    formulaNote: "0.02466 = π × 7,850 ÷ 10⁶, steel density 7,850 kg/m³",
    source: "SOURCE: IS 1239 (MEDIUM) · ASTM A53 · JIS G3452 · EN 10255 · LAST VERIFIED 18 JUL 2026",
    faqs: [
      {
        q: `What is the weight of a ${p.nbSize}mm (${p.nbInch}) MS pipe per metre?`,
        a: `A ${p.nbSize} NB (${p.nbInch}) medium-class MS pipe weighs ${f(p.weightPerMetre, 2)} kg per metre, based on OD ${p.od} mm and wall thickness ${p.wallThickness} mm under IS 1239.`,
      },
      {
        q: `How much does a 6-metre length of ${p.nbSize} NB pipe weigh?`,
        a: `A standard 6 m length weighs ${f(p.weightPer6m, 2)} kg (${f(p.weightPerMetre, 2)} kg/m × 6 m), roughly ${f(1000 / p.weightPer6m, 1)} lengths per tonne.`,
      },
      {
        q: `What are the dimensions of a ${p.nbSize}mm NB pipe?`,
        a: `Under IS 1239 medium class, ${p.nbSize} NB corresponds to an outer diameter of ${p.od} mm with a ${p.wallThickness} mm wall. Light and heavy classes use the same OD with thinner or thicker walls.`,
      },
    ],
    tableCaption: "MS pipe weight, all NB sizes (IS 1239 medium, 6 m lengths)",
    tableHeaders: ["NB size", "kg/m", "kg per 6 m", "OD × WT (mm)"],
    rows: pipes.map((r) => ({
      label: `${r.nbSize}mm (${r.nbInch})`,
      cells: [f(r.weightPerMetre, 2), f(r.weightPer6m, 2), `${r.od} × ${r.wallThickness}`],
      href: `/weights/${pipeSlug(r.nbSize)}`,
      active: r.nbSize === p.nbSize,
    })),
    calcHref: `/calculators/pipe-weight?nb=${p.nbSize}&l=6`,
    calcLabel: "Open the MS pipe calculator →",
    related: [
      { label: "MS Pipe Weight Calculator", href: "/calculators/pipe-weight" },
      { label: "MS Pipe Weight Chart", href: "/articles/ms-pipe-weight-calculator-chart" },
      { label: "Advanced Steel Weight Calculator", href: "/calculator" },
    ],
    ogValue: `${f(p.weightPerMetre, 2)} kg/m`,
    ogLabel: `${p.nbSize} NB (${p.nbInch}) MS PIPE · IS 1239 MEDIUM`,
  });
}

/* ---------------- ISMB beams ---------------- */
const ismbSlug = (d: string) => d.toLowerCase().replace(" ", "-") + "-weight";
for (const bm of ismbBeams) {
  pagesList.push({
    slug: ismbSlug(bm.designation),
    family: "ismb",
    familyLabel: "ISMB Beams (IS 808)",
    h1: `${bm.designation} Weight Per Metre & Section Properties`,
    metaTitle:
      bm.designation === "ISMB 300"
        ? "ISMB 300 Weight Per Metre: Instant Answer, Chart & Zxx"
        : `${bm.designation} Weight Per Metre & Section Properties`,
    metaDescription: `${bm.designation} weighs ${f(bm.weightPerMetre, 1)} kg per metre, ${f(bm.weightPerMetre * 12, 1)} kg per 12 m length. Depth ${bm.depth} mm, flange ${bm.flangeWidth} mm, Zxx ${f(bm.sectionModulusZxx, 1)} cm³ (IS 808). Chart and free calculator.`,
    kicker: `I-BEAM · IS 808 TABLE VALUES · ASTM A6 · JIS G3192`,
    answerLabel: "WEIGHT PER METRE",
    answerValue: `${f(bm.weightPerMetre, 1)} kg/m`,
    stats: [
      { label: "PER 12 M LENGTH", value: `${f(bm.weightPerMetre * 12, 1)} kg` },
      { label: "DEPTH × FLANGE", value: `${bm.depth} × ${bm.flangeWidth} mm` },
      { label: "WEB / FLANGE THK", value: `${bm.webThickness} / ${bm.flangeThickness} mm` },
      { label: "Zxx · Ixx", value: `${f(bm.sectionModulusZxx, 1)} cm³ · ${f(bm.momentOfInertiaIxx, 0)} cm⁴` },
    ],
    formula: `${bm.designation}: ${f(bm.weightPerMetre, 1)} kg/m (IS 808 tabulated)`,
    formulaNote: "Rolled-section weights are standardised in IS 808, not derived from a simple area formula",
    source: "SOURCE: IS 808 · ASTM A6 / A36 · JIS G3192 · LAST VERIFIED 18 JUL 2026",
    faqs: [
      {
        q: `What is the weight of ${bm.designation} per metre?`,
        a: `${bm.designation} weighs ${f(bm.weightPerMetre, 1)} kg per metre as tabulated in IS 808. A standard 12 m length weighs ${f(bm.weightPerMetre * 12, 1)} kg.`,
      },
      {
        q: `What are the dimensions of ${bm.designation}?`,
        a: `${bm.designation} has a depth of ${bm.depth} mm, flange width ${bm.flangeWidth} mm, web thickness ${bm.webThickness} mm and flange thickness ${bm.flangeThickness} mm.`,
      },
      {
        q: `What is the section modulus of ${bm.designation}?`,
        a: `${bm.designation} has an elastic section modulus (Zxx) of ${f(bm.sectionModulusZxx, 1)} cm³ and a moment of inertia (Ixx) of ${f(bm.momentOfInertiaIxx, 1)} cm⁴ about its major axis.`,
      },
    ],
    tableCaption: "ISMB beam weights. IS 808 (12 m lengths)",
    tableHeaders: ["Designation", "kg/m", "kg per 12 m", "Depth × flange (mm)"],
    rows: ismbBeams.map((r) => ({
      label: r.designation,
      cells: [f(r.weightPerMetre, 1), f(r.weightPerMetre * 12, 1), `${r.depth} × ${r.flangeWidth}`],
      href: `/weights/${ismbSlug(r.designation)}`,
      active: r.designation === bm.designation,
    })),
    calcHref: `/calculators/beam-weight?sec=${encodeURIComponent(bm.designation)}&l=6`,
    calcLabel: "Open the I-beam calculator →",
    related: [
      { label: "I-Beam (ISMB) Calculator", href: "/calculators/beam-weight" },
      { label: "Channel (ISMC) Calculator", href: "/calculators/channel-weight" },
      { label: "Hollow vs Solid Steel Sections", href: "/articles/hollow-vs-solid-steel-sections-structural-efficiency" },
    ],
    ogValue: `${f(bm.weightPerMetre, 1)} kg/m`,
    ogLabel: `${bm.designation.toUpperCase()} · ${bm.depth} × ${bm.flangeWidth} MM · IS 808`,
  });
}

/* ---------------- ISMC channels ---------------- */
const ismcSlug = (d: string) => d.toLowerCase().replace(" ", "-") + "-weight";
for (const ch of ismcChannels) {
  pagesList.push({
    slug: ismcSlug(ch.designation),
    family: "ismc",
    familyLabel: "ISMC Channels (IS 808)",
    h1: `${ch.designation} Weight Per Metre & Dimensions`,
    metaTitle: `${ch.designation} Weight Per Metre & Dimensions`,
    metaDescription: `${ch.designation} weighs ${f(ch.weightPerMetre, 1)} kg per metre, ${f(ch.weightPerMetre * 12, 1)} kg per 12 m length. Depth ${ch.depth} mm, flange ${ch.flangeWidth} mm (IS 808). Full channel chart and free calculator.`,
    kicker: `CHANNEL · IS 808 TABLE VALUES · ASTM A6 · JIS G3192`,
    answerLabel: "WEIGHT PER METRE",
    answerValue: `${f(ch.weightPerMetre, 1)} kg/m`,
    stats: [
      { label: "PER 12 M LENGTH", value: `${f(ch.weightPerMetre * 12, 1)} kg` },
      { label: "DEPTH × FLANGE", value: `${ch.depth} × ${ch.flangeWidth} mm` },
      { label: "WEB / FLANGE THK", value: `${ch.webThickness} / ${ch.flangeThickness} mm` },
      { label: "LENGTHS PER TONNE", value: `≈ ${f(1000 / (ch.weightPerMetre * 12), 1)}` },
    ],
    formula: `${ch.designation}: ${f(ch.weightPerMetre, 1)} kg/m (IS 808 tabulated)`,
    formulaNote: "Rolled-section weights are standardised in IS 808, not derived from a simple area formula",
    source: "SOURCE: IS 808 · ASTM A6 / A36 · JIS G3192 · LAST VERIFIED 18 JUL 2026",
    faqs: [
      {
        q: `What is the weight of ${ch.designation} per metre?`,
        a: `${ch.designation} weighs ${f(ch.weightPerMetre, 1)} kg per metre as tabulated in IS 808. A 12 m length weighs ${f(ch.weightPerMetre * 12, 1)} kg.`,
      },
      {
        q: `What are the dimensions of ${ch.designation}?`,
        a: `${ch.designation} has a depth of ${ch.depth} mm, flange width ${ch.flangeWidth} mm, web thickness ${ch.webThickness} mm and flange thickness ${ch.flangeThickness} mm.`,
      },
      {
        q: `How many lengths of ${ch.designation} make a tonne?`,
        a: `Approximately ${f(1000 / (ch.weightPerMetre * 12), 1)} twelve-metre lengths of ${ch.designation} weigh one tonne.`,
      },
    ],
    tableCaption: "ISMC channel weights. IS 808 (12 m lengths)",
    tableHeaders: ["Designation", "kg/m", "kg per 12 m", "Depth × flange (mm)"],
    rows: ismcChannels.map((r) => ({
      label: r.designation,
      cells: [f(r.weightPerMetre, 1), f(r.weightPerMetre * 12, 1), `${r.depth} × ${r.flangeWidth}`],
      href: `/weights/${ismcSlug(r.designation)}`,
      active: r.designation === ch.designation,
    })),
    calcHref: `/calculators/channel-weight?sec=${encodeURIComponent(ch.designation)}&l=6`,
    calcLabel: "Open the channel calculator →",
    related: [
      { label: "Channel (ISMC) Calculator", href: "/calculators/channel-weight" },
      { label: "I-Beam (ISMB) Calculator", href: "/calculators/beam-weight" },
      { label: "Steel Weight Calculator Guide", href: "/articles/steel-weight-calculator-guide" },
    ],
    ogValue: `${f(ch.weightPerMetre, 1)} kg/m`,
    ogLabel: `${ch.designation.toUpperCase()} · ${ch.depth} × ${ch.flangeWidth} MM · IS 808`,
  });
}

/* ---------------- Equal angles ---------------- */
const angleSlug = (a: number, b: number, t: number) => `${a}x${b}x${t}-angle-weight`;
for (const an of equalAngles) {
  const name = `${an.legA}×${an.legB}×${an.thickness}`;
  pagesList.push({
    slug: angleSlug(an.legA, an.legB, an.thickness),
    family: "angle",
    familyLabel: "Equal Angles (IS 808)",
    h1: `${name} mm MS Angle Weight Per Metre`,
    metaTitle: `${name} MS Angle Weight Per Metre`,
    metaDescription: `A ${name} mm mild-steel equal angle weighs ${f(an.weightPerMetre, 2)} kg per metre, ${f(an.weightPer6m, 2)} kg per 6 m length. Formula, full angle chart and free calculator (IS 808).`,
    kicker: `EQUAL ANGLE · (A + B − T) × T × 0.00785 · IS 808 · ASTM A6 · JIS G3192`,
    answerLabel: "WEIGHT PER METRE",
    answerValue: `${f(an.weightPerMetre, 2)} kg/m`,
    stats: [
      { label: "PER 6 M LENGTH", value: `${f(an.weightPer6m, 2)} kg` },
      { label: "LEG × LEG", value: `${an.legA} × ${an.legB} mm` },
      { label: "THICKNESS", value: `${an.thickness} mm` },
      { label: "LENGTHS PER TONNE", value: `≈ ${f(1000 / an.weightPer6m, 1)}` },
    ],
    formula: `(${an.legA} + ${an.legB} − ${an.thickness}) × ${an.thickness} × 0.00785 = ${f(an.weightPerMetre, 2)} kg/m`,
    formulaNote: "0.00785 = 7,850 ÷ 10⁶, sharp-corner approximation; IS 808 tabulated values differ slightly",
    source: "SOURCE: IS 808 · ASTM A6 · JIS G3192 · LAST VERIFIED 18 JUL 2026",
    faqs: [
      {
        q: `What is the weight of a ${name} mm angle per metre?`,
        a: `A ${name} mm mild-steel equal angle weighs ${f(an.weightPerMetre, 2)} kg per metre, from (${an.legA} + ${an.legB} − ${an.thickness}) × ${an.thickness} × 0.00785.`,
      },
      {
        q: `How much does a 6-metre length of ${name} angle weigh?`,
        a: `A standard 6 m length weighs ${f(an.weightPer6m, 2)} kg (${f(an.weightPerMetre, 2)} kg/m × 6 m).`,
      },
      {
        q: `How many ${name} angle lengths make one tonne?`,
        a: `Approximately ${f(1000 / an.weightPer6m, 1)} six-metre lengths of ${name} mm angle weigh one tonne.`,
      },
    ],
    tableCaption: "Equal angle weights, common sizes (6 m lengths)",
    tableHeaders: ["Size (mm)", "kg/m", "kg per 6 m"],
    rows: equalAngles.map((r) => ({
      label: `${r.legA}×${r.legB}×${r.thickness}`,
      cells: [f(r.weightPerMetre, 2), f(r.weightPer6m, 2)],
      href: `/weights/${angleSlug(r.legA, r.legB, r.thickness)}`,
      active: r.legA === an.legA && r.legB === an.legB && r.thickness === an.thickness,
    })),
    calcHref: `/calculators/angle-weight?a=${an.legA}&b=${an.legB}&t=${an.thickness}&l=6`,
    calcLabel: "Open the angle calculator →",
    related: [
      { label: "Steel Angle Calculator", href: "/calculators/angle-weight" },
      { label: "Steel Angle Weight Chart", href: "/articles/steel-angle-weight-chart-sizes-formula" },
      { label: "Advanced Steel Weight Calculator", href: "/calculator" },
    ],
    ogValue: `${f(an.weightPerMetre, 2)} kg/m`,
    ogLabel: `${name} MM EQUAL ANGLE · IS 808`,
  });
}

/* ---------------- MS plates (per thickness) ---------------- */
const plateSlug = (t: number) => `${t}mm-ms-plate-weight`;
for (const pl of plates) {
  pagesList.push({
    slug: plateSlug(pl.thickness),
    family: "plate",
    familyLabel: "MS Plate (IS 2062)",
    h1: `${pl.thickness}mm MS Plate Weight Per Square Metre & Per Sheet`,
    metaTitle: `${pl.thickness}mm MS Plate Weight: Per m² & Standard Sheets`,
    metaDescription: `A ${pl.thickness}mm MS plate weighs ${f(pl.weightPerSqm, 2)} kg per square metre. A 1500×6000 sheet weighs ${f(pl.weight1500x6000, 1)} kg and a 2000×6000 sheet ${f(pl.weight2000x6000, 1)} kg. Formula, chart and free calculator.`,
    kicker: `MS PLATE · T × 7.85 = KG/M² · IS 2062 · ASTM A36 · JIS G3101 · EN 10025`,
    answerLabel: "WEIGHT PER SQUARE METRE",
    answerValue: `${f(pl.weightPerSqm, 2)} kg/m²`,
    stats: [
      { label: "1500 × 6000 SHEET", value: `${f(pl.weight1500x6000, 1)} kg` },
      { label: "2000 × 6000 SHEET", value: `${f(pl.weight2000x6000, 1)} kg` },
      { label: "THICKNESS", value: `${pl.thickness} mm` },
      { label: "SHEETS (1.5×6) / TONNE", value: `≈ ${f(1000 / pl.weight1500x6000, 1)}` },
    ],
    formula: `${pl.thickness} × 7.85 = ${f(pl.weightPerSqm, 2)} kg/m²`,
    formulaNote: "7.85 = density 7,850 kg/m³ expressed per mm of thickness per m²",
    source: "SOURCE: IS 2062 · ASTM A36 · JIS G3101 · EN 10025 · LAST VERIFIED 18 JUL 2026",
    faqs: [
      {
        q: `What is the weight of ${pl.thickness}mm MS plate per square metre?`,
        a: `A ${pl.thickness}mm mild-steel plate weighs ${f(pl.weightPerSqm, 2)} kg per square metre, from thickness × 7.85 (${pl.thickness} × 7.85 = ${f(pl.weightPerSqm, 2)}).`,
      },
      {
        q: `How much does a standard ${pl.thickness}mm plate sheet weigh?`,
        a: `A 1500 × 6000 mm sheet of ${pl.thickness}mm plate weighs ${f(pl.weight1500x6000, 1)} kg; a 2000 × 6000 mm sheet weighs ${f(pl.weight2000x6000, 1)} kg.`,
      },
      {
        q: `How many ${pl.thickness}mm plate sheets make one tonne?`,
        a: `Approximately ${f(1000 / pl.weight1500x6000, 1)} sheets of 1500 × 6000 mm ${pl.thickness}mm plate weigh one tonne (1,000 ÷ ${f(pl.weight1500x6000, 1)} kg per sheet).`,
      },
    ],
    tableCaption: "MS plate weight by thickness (kg/m² and standard sheets)",
    tableHeaders: ["Thickness", "kg/m²", "1500×6000 (kg)", "2000×6000 (kg)"],
    rows: plates.map((r) => ({
      label: `${r.thickness}mm`,
      cells: [f(r.weightPerSqm, 2), f(r.weight1500x6000, 1), f(r.weight2000x6000, 1)],
      href: `/weights/${plateSlug(r.thickness)}`,
      active: r.thickness === pl.thickness,
    })),
    calcHref: `/calculator?shape=plate&grade=MS&pl=6&pw=1.5&pt=${pl.thickness}`,
    calcLabel: `Open the calculator prefilled with a ${pl.thickness}mm sheet →`,
    related: [
      { label: "Steel Plate Weight Calculator", href: "/calculators/steel-plate" },
      { label: "Steel Plate Weight Chart", href: "/articles/steel-plate-weight-calculator-thickness-chart" },
      { label: "Chequered Plate Calculator", href: "/calculators/chequered-plate-weight" },
    ],
    ogValue: `${f(pl.weightPerSqm, 2)} kg/m²`,
    ogLabel: `${pl.thickness}MM MS PLATE · IS 2062`,
  });
}

/* ---------------- Flat bars ---------------- */
const flatSlug = (w: number, t: number) => `${w}x${t}-flat-bar-weight`;
for (const fb of flatBars) {
  const name = `${fb.width}×${fb.thickness}`;
  pagesList.push({
    slug: flatSlug(fb.width, fb.thickness),
    family: "flat",
    familyLabel: "Flat Bars (IS 2062)",
    h1: `${name} mm MS Flat Bar Weight Per Metre`,
    metaTitle: `${name} MS Flat Bar Weight Per Metre`,
    metaDescription: `A ${name} mm mild-steel flat bar weighs ${f(fb.weightPerMetre, 2)} kg per metre, ${f(fb.weightPer6m, 2)} kg per 6 m length. Formula (W × T × 0.00785), full flat chart and free calculator.`,
    kicker: `FLAT BAR · W × T × 0.00785 · IS 2062 · ASTM A36 · JIS G3101`,
    answerLabel: "WEIGHT PER METRE",
    answerValue: `${f(fb.weightPerMetre, 2)} kg/m`,
    stats: [
      { label: "PER 6 M LENGTH", value: `${f(fb.weightPer6m, 2)} kg` },
      { label: "WIDTH × THICK", value: `${fb.width} × ${fb.thickness} mm` },
      { label: "SECTION AREA", value: `${f(fb.width * fb.thickness, 0)} mm²` },
      { label: "LENGTHS PER TONNE", value: `≈ ${f(1000 / fb.weightPer6m, 1)}` },
    ],
    formula: `${fb.width} × ${fb.thickness} × 0.00785 = ${f(fb.weightPerMetre, 2)} kg/m`,
    formulaNote: "0.00785 = 7,850 ÷ 10⁶, steel density 7,850 kg/m³",
    source: "SOURCE: IS 2062 · ASTM A36 · JIS G3101 · LAST VERIFIED 18 JUL 2026",
    faqs: [
      {
        q: `What is the weight of a ${name} mm flat bar per metre?`,
        a: `A ${name} mm mild-steel flat weighs ${f(fb.weightPerMetre, 2)} kg per metre, from width × thickness × 0.00785 (${fb.width} × ${fb.thickness} × 0.00785).`,
      },
      {
        q: `How much does a 6-metre ${name} flat bar weigh?`,
        a: `A standard 6 m length of ${name} mm flat weighs ${f(fb.weightPer6m, 2)} kg (${f(fb.weightPerMetre, 2)} kg/m × 6 m).`,
      },
      {
        q: `How many ${name} flat lengths make one tonne?`,
        a: `Approximately ${f(1000 / fb.weightPer6m, 1)} six-metre lengths of ${name} mm flat bar weigh one tonne.`,
      },
    ],
    tableCaption: "Flat bar weight, common sizes (6 m lengths)",
    tableHeaders: ["Size (mm)", "kg/m", "kg per 6 m"],
    rows: flatBars.map((r) => ({
      label: `${r.width}×${r.thickness}`,
      cells: [f(r.weightPerMetre, 2), f(r.weightPer6m, 2)],
      href: `/weights/${flatSlug(r.width, r.thickness)}`,
      active: r.width === fb.width && r.thickness === fb.thickness,
    })),
    calcHref: `/calculator?shape=flat&grade=MS&w=${fb.width}&t=${fb.thickness}&l=6`,
    calcLabel: `Open the calculator prefilled with ${name} × 6 m →`,
    related: [
      { label: "Flat Bar Weight Calculator", href: "/calculators/flat-bar-weight" },
      { label: "Formula Guide (All Sections)", href: "/articles/how-to-calculate-weight-of-steel-formula-guide" },
      { label: "Advanced Steel Weight Calculator", href: "/calculator" },
    ],
    ogValue: `${f(fb.weightPerMetre, 2)} kg/m`,
    ogLabel: `${name} MM FLAT BAR · IS 2062`,
  });
}

export const weightPages: WeightPage[] = pagesList;

export function getWeightPage(slug: string): WeightPage | undefined {
  return weightPages.find((p) => p.slug === slug);
}

export const weightFamilies = [
  { key: "tmt", label: "TMT / Rebar", intro: "d² ÷ 162.2 · IS 1786" },
  { key: "pipe", label: "MS Pipe", intro: "IS 1239 medium class" },
  { key: "ismb", label: "ISMB Beams", intro: "IS 808 rolled sections" },
  { key: "ismc", label: "ISMC Channels", intro: "IS 808 rolled sections" },
  { key: "angle", label: "Equal Angles", intro: "(A + B − T) × T × 0.00785" },
  { key: "plate", label: "MS Plate", intro: "T × 7.85 = kg/m² · IS 2062" },
  { key: "flat", label: "Flat Bars", intro: "W × T × 0.00785" },
];
