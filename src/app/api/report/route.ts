import { NextRequest, NextResponse } from "next/server";

/* Server-only relay for the About-page report form.
   The destination address is never sent to the client, never rendered
   into HTML, and never echoed in responses. Set REPORT_EMAIL in the
   environment to override the encoded default. */

function target(): string {
  if (process.env.REPORT_EMAIL) return process.env.REPORT_EMAIL;
  return Buffer.from("aW5ub3ZhdGlvbm1ldHNAZ21haWwuY29t", "base64").toString("utf-8");
}

export async function POST(req: NextRequest) {
  let body: Record<string, string>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  const { name = "", email = "", type = "Question", page = "", message = "", website = "" } = body;

  // Honeypot: bots fill the hidden "website" field
  if (website) return NextResponse.json({ ok: true });

  const msg = String(message).trim();
  if (msg.length < 10 || msg.length > 5000) {
    return NextResponse.json(
      { ok: false, error: "Please write a few more details (at least 10 characters)." },
      { status: 400 }
    );
  }

  const composed = [
    `Type: ${String(type).slice(0, 60)}`,
    `Page: ${String(page).slice(0, 300)}`,
    `From: ${String(name).slice(0, 120) || "(not given)"} <${String(email).slice(0, 200) || "no email"}>`,
    "",
    msg,
  ].join("\n");

  try {
    const res = await fetch(`https://formsubmit.co/ajax/${target()}`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({
        name: String(name).slice(0, 120) || "SteelMath visitor",
        email: String(email).slice(0, 200) || "noreply@steelmath.com",
        _subject: `SteelMath report: ${String(type).slice(0, 60)}`,
        message: composed,
      }),
      signal: AbortSignal.timeout(10000),
    });
    if (!res.ok) throw new Error(String(res.status));
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      { ok: false, error: "Could not send right now. Please try again in a minute." },
      { status: 502 }
    );
  }
}
