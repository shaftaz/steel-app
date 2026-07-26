"use client";

import { useState } from "react";
import { FORMSUBMIT_ALIAS } from "@/lib/report-config";

/* Lightweight retention hook: one consistent email-capture strip for
   article and calculator pages. Submissions arrive via the same private
   FormSubmit alias as the report form; the address is never exposed. */
export default function NewsletterCta() {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "sending" | "done" | "error">("idle");

  const submit = async () => {
    const value = email.trim();
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(value)) {
      setState("error");
      return;
    }
    setState("sending");
    const payload = {
      name: "Newsletter signup",
      email: value,
      _subject: "SteelMath newsletter signup",
      message: `Weekly steel price snapshot signup: ${value}\nPage: ${window.location.href}`,
    };
    try {
      let ok = false;
      if (FORMSUBMIT_ALIAS) {
        const res = await fetch(`https://formsubmit.co/ajax/${FORMSUBMIT_ALIAS}`, {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify(payload),
        });
        const data = await res.json().catch(() => null);
        ok = res.ok && data && String(data.success) !== "false";
      }
      if (!ok) {
        const res = await fetch("/api/report", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name: "Newsletter signup", email: value, type: "Newsletter", message: payload.message }),
        });
        ok = (await res.json().catch(() => null))?.ok === true;
      }
      if (ok) {
        setState("done");
        try {
          (window as unknown as { gtag?: (...a: unknown[]) => void }).gtag?.("event", "newsletter_signup", { method: "article_cta" });
        } catch {}
      } else {
        setState("error");
      }
    } catch {
      setState("error");
    }
  };

  if (state === "done") {
    return (
      <div className="bg-ink text-paper px-5 py-4 mt-8 no-print">
        <span className="font-mono text-[11px] tracking-[0.12em] text-accent">SIGNED UP ✓</span>
        <p className="text-[13px] text-[#C9CACC] mt-1 mb-0">
          You are on the list for the weekly steel price snapshot.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-ink text-paper px-5 py-4 mt-8 flex items-center gap-3 flex-wrap no-print">
      <div className="min-w-[200px]">
        <div className="font-mono text-[10.5px] tracking-[0.12em] text-[#7E8085]">
          WEEKLY STEEL PRICE SNAPSHOT
        </div>
        <div className="text-[13.5px] font-semibold mt-0.5">
          Prices, duties &amp; CBAM moves, once a week. No spam.
        </div>
      </div>
      <div className="flex flex-1 min-w-[240px] gap-0">
        <input
          type="email"
          value={email}
          onChange={(e) => { setEmail(e.target.value); if (state === "error") setState("idle"); }}
          onKeyDown={(e) => e.key === "Enter" && submit()}
          placeholder="you@company.com"
          aria-label="Email address for the weekly steel price snapshot"
          className="flex-1 bg-panel-dark border border-[#34353A] text-paper font-mono text-[13px] px-3 py-2.5 outline-none focus:border-accent min-w-0"
        />
        <button
          onClick={submit}
          disabled={state === "sending"}
          className="btn-glow px-4 py-2.5 text-[12.5px] cursor-pointer disabled:opacity-50 whitespace-nowrap"
        >
          {state === "sending" ? "…" : "Get it →"}
        </button>
      </div>
      {state === "error" && (
        <span className="font-mono text-[11px] text-accent w-full">
          Please enter a valid email address and try again.
        </span>
      )}
    </div>
  );
}
