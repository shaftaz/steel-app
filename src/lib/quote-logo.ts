/* ============================================================
   Seller-logo intake for the quote builder. Accepts PNG/JPG/SVG
   up to 1 MB, rasterizes to a PNG data URL at ≤512px on the
   long edge (which also strips any embedded SVG scripting), and
   rejects anything it cannot decode. Client-only.
   ============================================================ */

const MAX_BYTES = 1024 * 1024;
const MAX_EDGE = 512;
const TYPES = ["image/png", "image/jpeg", "image/svg+xml"];

export class LogoError extends Error {}

export async function processLogoFile(file: File): Promise<string> {
  if (!TYPES.includes(file.type)) {
    throw new LogoError("Use a PNG, JPG or SVG file.");
  }
  if (file.size > MAX_BYTES) {
    throw new LogoError("Logo must be 1 MB or smaller.");
  }

  const objectUrl = URL.createObjectURL(file);
  try {
    const img = await new Promise<HTMLImageElement>((resolve, reject) => {
      const el = new Image();
      el.onload = () => resolve(el);
      el.onerror = () => reject(new LogoError("Couldn't read that image."));
      el.src = objectUrl;
    });

    // SVGs without intrinsic size report 0×0 in some browsers.
    const w0 = img.naturalWidth || img.width || MAX_EDGE;
    const h0 = img.naturalHeight || img.height || MAX_EDGE;
    const scale = Math.min(1, MAX_EDGE / Math.max(w0, h0));
    const w = Math.max(1, Math.round(w0 * scale));
    const h = Math.max(1, Math.round(h0 * scale));

    const canvas = document.createElement("canvas");
    canvas.width = w;
    canvas.height = h;
    const ctx = canvas.getContext("2d");
    if (!ctx) throw new LogoError("Couldn't process the image.");
    ctx.drawImage(img, 0, 0, w, h);

    const dataUrl = canvas.toDataURL("image/png");
    if (!dataUrl.startsWith("data:image/png") || dataUrl.length < 100) {
      throw new LogoError("Couldn't process the image.");
    }
    // localStorage safety valve — a pathological PNG could still be big.
    if (dataUrl.length > 900_000) {
      throw new LogoError("Logo is too detailed to store — try a simpler file.");
    }
    return dataUrl;
  } finally {
    URL.revokeObjectURL(objectUrl);
  }
}
