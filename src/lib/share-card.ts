/* ============================================================
   Branded shareable result cards.
   Draws a WhatsApp-ready 1080×1080 PNG of a calculator result
   on a plain <canvas> — no rendering libraries, no network.
   Client-only: every entry point guards for browser APIs and
   fails soft (callers fall back to copying the share link).
   ============================================================ */

export interface ShareCardStat {
  label: string;
  value: string;
  accent?: boolean;
  positive?: boolean;
}

export interface ShareCardSpec {
  /** Tool name, e.g. "TMT Bar Weight Calculator" */
  title: string;
  /** Small context line shown under the title, e.g. "12 MM TMT · 0.889 KG/M" */
  context?: string;
  headlineLabel: string;
  headlineValue: string;
  subline?: string;
  stats?: ShareCardStat[];
  formulaLine?: string;
  /** Prefilled share URL for the footer */
  url?: string;
  /** Accent hex — furnace orange by default, oxide-blue for CBAM */
  accent?: string;
}

const INK = "#17181A";
const HAIRLINE = "#2E2F33";
const GREY_LABEL = "#7E8085";
const GREY_META = "#9A9B9E";
const GREY_TEXT = "#C9CACC";
const WHITE = "#F6F5F2";
const ORANGE = "#FF5C1F";
const POSITIVE = "#7FBF9E";

const W = 1080;
const H = 1080;
const PAD = 72;

function families() {
  try {
    const cs = getComputedStyle(document.documentElement);
    const mono = cs.getPropertyValue("--font-plex-mono").trim();
    const sans = cs.getPropertyValue("--font-archivo").trim();
    return {
      mono: `${mono ? mono + ", " : ""}"IBM Plex Mono", ui-monospace, monospace`,
      sans: `${sans ? sans + ", " : ""}Archivo, system-ui, sans-serif`,
    };
  } catch {
    return {
      mono: '"IBM Plex Mono", ui-monospace, monospace',
      sans: "Archivo, system-ui, sans-serif",
    };
  }
}

/** Shrink font size until text fits maxWidth (floor 26px). */
function fitFont(
  ctx: CanvasRenderingContext2D,
  text: string,
  weight: number,
  startPx: number,
  family: string,
  maxWidth: number
) {
  let px = startPx;
  ctx.font = `${weight} ${px}px ${family}`;
  while (px > 26 && ctx.measureText(text).width > maxWidth) {
    px -= 4;
    ctx.font = `${weight} ${px}px ${family}`;
  }
  return px;
}

function wrap(
  ctx: CanvasRenderingContext2D,
  text: string,
  maxWidth: number,
  maxLines: number
): string[] {
  const words = text.split(/\s+/);
  const lines: string[] = [];
  let line = "";
  for (const w of words) {
    const probe = line ? line + " " + w : w;
    if (ctx.measureText(probe).width <= maxWidth || !line) {
      line = probe;
    } else {
      lines.push(line);
      line = w;
      if (lines.length === maxLines - 1) break;
    }
  }
  if (line && lines.length < maxLines) lines.push(line);
  if (lines.length === maxLines && words.join(" ") !== lines.join(" ")) {
    const last = lines[maxLines - 1];
    lines[maxLines - 1] =
      ctx.measureText(last + "…").width <= maxWidth ? last + "…" : last;
  }
  return lines;
}

function tracked(
  ctx: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  spacing: number
) {
  let cx = x;
  for (const ch of text) {
    ctx.fillText(ch, cx, y);
    cx += ctx.measureText(ch).width + spacing;
  }
  return cx - spacing;
}

export async function generateShareCard(spec: ShareCardSpec): Promise<Blob> {
  if (typeof document === "undefined") throw new Error("client only");
  try {
    // Ensure webfonts are usable inside the canvas before measuring.
    await Promise.race([
      document.fonts?.ready,
      new Promise((r) => setTimeout(r, 1200)),
    ]);
  } catch {}

  const canvas = document.createElement("canvas");
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("canvas unavailable");

  const { mono, sans } = families();
  const accent = spec.accent || ORANGE;
  const innerW = W - PAD * 2;

  // Ground
  ctx.fillStyle = INK;
  ctx.fillRect(0, 0, W, H);
  ctx.textBaseline = "alphabetic";

  // ---- Header: wordmark + tool title ----
  let y = PAD + 44;
  ctx.font = `800 46px ${sans}`;
  ctx.fillStyle = WHITE;
  ctx.fillText("Steel", PAD, y);
  const steelW = ctx.measureText("Steel").width;
  ctx.fillStyle = accent;
  ctx.fillText("Math", PAD + steelW, y);
  const mathW = ctx.measureText("Math").width;
  ctx.font = `500 20px ${mono}`;
  ctx.fillStyle = GREY_META;
  ctx.fillText(".COM", PAD + steelW + mathW + 10, y);

  y += 52;
  ctx.font = `600 25px ${mono}`;
  ctx.fillStyle = GREY_META;
  const titleUp = spec.title.toUpperCase();
  const titleLines = wrap(ctx, titleUp, innerW - 40, 2);
  for (const l of titleLines) {
    tracked(ctx, l, PAD, y, 2.5);
    y += 36;
  }
  if (spec.context) {
    ctx.font = `500 22px ${mono}`;
    ctx.fillStyle = GREY_LABEL;
    ctx.fillText(spec.context.toUpperCase(), PAD, y + 4);
    y += 34;
  }

  y += 14;
  ctx.strokeStyle = HAIRLINE;
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(PAD, y);
  ctx.lineTo(W - PAD, y);
  ctx.stroke();

  // ---- Headline ----
  y += 64;
  ctx.font = `600 24px ${mono}`;
  ctx.fillStyle = GREY_LABEL;
  tracked(ctx, spec.headlineLabel.toUpperCase(), PAD, y, 2.5);

  y += 118;
  const hlPx = fitFont(ctx, spec.headlineValue, 700, 128, mono, innerW);
  ctx.fillStyle = accent;
  ctx.fillText(spec.headlineValue, PAD, y);
  y += Math.max(0, (hlPx - 128) * 0.3);

  if (spec.subline) {
    y += 46;
    ctx.font = `500 28px ${mono}`;
    ctx.fillStyle = GREY_TEXT;
    const sub = wrap(ctx, spec.subline, innerW, 2);
    for (const l of sub) {
      ctx.fillText(l, PAD, y);
      y += 38;
    }
    y -= 38;
  }

  // ---- Stats grid (2-col, max 6) ----
  const stats = (spec.stats || []).slice(0, 6);
  if (stats.length) {
    y += 66;
    const colW = (innerW - 48) / 2;
    const rowH = 108;
    stats.forEach((s, i) => {
      const col = i % 2;
      const row = Math.floor(i / 2);
      const x = PAD + col * (colW + 48);
      const ty = y + row * rowH;
      ctx.strokeStyle = HAIRLINE;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(x, ty);
      ctx.lineTo(x + colW, ty);
      ctx.stroke();
      ctx.font = `500 21px ${mono}`;
      ctx.fillStyle = GREY_LABEL;
      const lab = wrap(ctx, s.label.toUpperCase(), colW, 1)[0] || "";
      ctx.fillText(lab, x, ty + 34);
      ctx.fillStyle = s.accent ? accent : s.positive ? POSITIVE : WHITE;
      const vPx = fitFont(ctx, s.value, 600, 36, mono, colW);
      ctx.font = `600 ${vPx}px ${mono}`;
      ctx.fillText(s.value, x, ty + 78);
    });
    y += Math.ceil(stats.length / 2) * rowH;
  }

  // ---- Formula line ----
  if (spec.formulaLine) {
    y += 48;
    ctx.font = `500 23px ${mono}`;
    ctx.fillStyle = GREY_LABEL;
    for (const l of wrap(ctx, spec.formulaLine, innerW, 2)) {
      ctx.fillText(l, PAD, y);
      y += 32;
    }
  }

  // ---- Footer (fixed to bottom) ----
  const fy = H - PAD - 46;
  ctx.strokeStyle = HAIRLINE;
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(PAD, fy);
  ctx.lineTo(W - PAD, fy);
  ctx.stroke();

  ctx.font = `500 23px ${mono}`;
  ctx.fillStyle = GREY_META;
  const shortUrl = (spec.url || "https://steelmath.com")
    .replace(/^https?:\/\//, "")
    .split("?")[0];
  ctx.fillText(shortUrl.length > 52 ? shortUrl.slice(0, 52) + "…" : shortUrl, PAD, fy + 40);

  const dateStr = new Date()
    .toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })
    .toUpperCase();
  const dw = ctx.measureText(dateStr).width;
  ctx.fillText(dateStr, W - PAD - dw, fy + 40);

  const blob: Blob | null = await new Promise((resolve) =>
    canvas.toBlob(resolve, "image/png")
  );
  if (!blob) throw new Error("toBlob failed");

  try {
    window.dispatchEvent(
      new CustomEvent("sm-share-card-generated", {
        detail: { width: W, height: H, bytes: blob.size },
      })
    );
  } catch {}
  return blob;
}

/**
 * Generate the card, then hand it to the native share sheet when the
 * device supports sharing files (mobile → WhatsApp etc.), otherwise
 * download it as a PNG. Returns how it was delivered.
 */
export async function shareResultCard(
  spec: ShareCardSpec,
  fileBase: string
): Promise<"shared" | "downloaded" | "cancelled"> {
  const blob = await generateShareCard(spec);
  const safeBase =
    fileBase.replace(/[^a-z0-9-]+/gi, "-").replace(/^-+|-+$/g, "").toLowerCase() ||
    "steelmath-result";
  const file = new File([blob], `${safeBase}.png`, { type: "image/png" });

  const nav = navigator as Navigator & {
    canShare?: (d: { files: File[] }) => boolean;
    share?: (d: { files: File[]; title?: string; text?: string }) => Promise<void>;
  };
  if (nav.canShare && nav.share && nav.canShare({ files: [file] })) {
    try {
      await nav.share({
        files: [file],
        title: spec.title,
        text: spec.url ? `${spec.title} — ${spec.url}` : spec.title,
      });
      return "shared";
    } catch (e) {
      if ((e as Error)?.name === "AbortError") return "cancelled";
      // fall through to download
    }
  }

  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = file.name;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 4000);
  return "downloaded";
}
