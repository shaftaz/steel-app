"use client";

import { useEffect, useRef, useState } from "react";
import { FORMSUBMIT_ALIAS } from "@/lib/report-config";

const LABEL = "font-mono text-[10.5px] tracking-[0.1em] text-muted-3 uppercase";
const INPUT =
  "bg-[#FFFFFF] border border-input-border text-ink font-mono text-[13.5px] px-3 py-2.5 outline-none w-full focus:border-accent";

export default function ReportDialog() {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [type, setType] = useState("Correction");
  const [message, setMessage] = useState("");
  const [website, setWebsite] = useState(""); // honeypot
  const [state, setState] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [error, setError] = useState("");
  const firstFieldRef = useRef<HTMLSelectElement>(null);

  useEffect(() => {
    if (!open) return;
    firstFieldRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const submit = async () => {
    setState("sending");
    setError("");
    if (website) {
      // honeypot tripped: pretend success
      setState("sent");
      return;
    }
    const page = typeof window !== "undefined" ? window.location.href : "";

    // Preferred path: browser-direct via FormSubmit's privacy alias.
    // Real browsers pass FormSubmit's bot protection; the alias never
    // reveals the destination address.
    if (FORMSUBMIT_ALIAS) {
      try {
        const res = await fetch(`https://formsubmit.co/ajax/${FORMSUBMIT_ALIAS}`, {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify({
            name: name || "SteelMath visitor",
            email: email || "noreply@steelmath.com",
            _subject: `SteelMath report: ${type}`,
            message: `Type: ${type}\nPage: ${page}\nFrom: ${name || "(not given)"} <${email || "no email"}>\n\n${message}`,
          }),
        });
        const data = await res.json().catch(() => null);
        if (res.ok && data && String(data.success) !== "false") {
          setState("sent");
          return;
        }
      } catch {
        /* fall through to relay */
      }
    }

    // Fallback: server relay
    try {
      const res = await fetch("/api/report", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, type, message, website, page }),
      });
      const data = await res.json().catch(() => null);
      if (data?.ok) {
        setState("sent");
      } else {
        setState("error");
        setError(data?.error || "The reporting service is briefly unavailable. Please try again shortly.");
      }
    } catch {
      setState("error");
      setError("Could not reach the reporting service. Please try again shortly.");
    }
  };

  const reset = () => {
    setOpen(false);
    setState("idle");
    setMessage("");
    setError("");
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="btn-glow px-5 py-2.5 text-[13px] cursor-pointer shrink-0"
      >
        Report or request →
      </button>

      {open && (
        <div
          onClick={reset}
          className="fixed inset-0 bg-[rgba(23,24,26,0.55)] z-[100] flex justify-center items-start pt-[10vh] px-4"
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Report an issue or request data"
            onClick={(e) => e.stopPropagation()}
            className="w-[min(560px,100%)] bg-paper border border-ink"
          >
            <div className="flex justify-between items-center px-5 py-3.5 border-b border-rule">
              <span className="font-mono text-[11px] tracking-[0.12em] text-muted-3">
                REPORT / REQUEST — GOES STRAIGHT TO THE DESK
              </span>
              <button
                onClick={reset}
                aria-label="Close"
                className="border border-rule text-muted-3 font-mono text-[10.5px] px-1.5 py-0.5 cursor-pointer hover:border-ink hover:text-ink"
              >
                ESC
              </button>
            </div>

            {state === "sent" ? (
              <div className="p-6">
                <div className="font-mono text-[11px] tracking-[0.12em] text-accent mb-2">
                  RECEIVED ✓
                </div>
                <p className="text-sm leading-relaxed text-muted mb-5">
                  Thank you. Reported errors are treated as priority fixes; if you
                  left an email address, you will hear back once it is resolved.
                </p>
                <button onClick={reset} className="btn-glow px-5 py-2.5 text-[13px] cursor-pointer">
                  Done
                </button>
              </div>
            ) : (
              <div className="p-5 flex flex-col gap-3.5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <label className="flex flex-col gap-1.5">
                    <span className={LABEL}>TYPE</span>
                    <select
                      ref={firstFieldRef}
                      value={type}
                      onChange={(e) => setType(e.target.value)}
                      className={INPUT}
                    >
                      <option>Correction</option>
                      <option>Data request</option>
                      <option>Question</option>
                      <option>Other</option>
                    </select>
                  </label>
                  <label className="flex flex-col gap-1.5">
                    <span className={LABEL}>NAME (OPTIONAL)</span>
                    <input value={name} onChange={(e) => setName(e.target.value)} className={INPUT} />
                  </label>
                </div>
                <label className="flex flex-col gap-1.5">
                  <span className={LABEL}>EMAIL — FOR A REPLY (OPTIONAL)</span>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={INPUT}
                  />
                </label>
                <label className="flex flex-col gap-1.5">
                  <span className={LABEL}>DETAILS</span>
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    rows={5}
                    placeholder="What did you find, or what do you need? Page links help."
                    className={`${INPUT} resize-y`}
                  />
                </label>
                {/* Honeypot: hidden from humans, tempting to bots */}
                <input
                  type="text"
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                  className="absolute -left-[9999px] h-0 w-0 opacity-0"
                  placeholder="website"
                />
                {state === "error" && (
                  <p className="font-mono text-[11.5px] text-red-down">{error}</p>
                )}
                <div className="flex items-center gap-3 pt-1">
                  <button
                    onClick={submit}
                    disabled={state === "sending" || message.trim().length < 10}
                    className="btn-glow px-6 py-2.5 text-[13px] cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    {state === "sending" ? "Sending…" : "Submit"}
                  </button>
                  <span className="font-mono text-[10px] tracking-[0.06em] text-muted-3">
                    NO SIGNUP · NOTHING SHARED PUBLICLY
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
