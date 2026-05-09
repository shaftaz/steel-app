"use client";

import { useState, useEffect, useCallback } from "react";

/* ── Toast ── */
function Toast({
  message,
  type,
  onDone,
}: {
  message: string;
  type: "success" | "error";
  onDone: () => void;
}) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    requestAnimationFrame(() => setVisible(true));
    const t = setTimeout(() => {
      setVisible(false);
      setTimeout(onDone, 300);
    }, 4000);
    return () => clearTimeout(t);
  }, [onDone]);

  return (
    <div
      className={`fixed bottom-6 right-6 z-[9999] max-w-sm rounded-lg shadow-xl border transition-all duration-300 ${
        visible
          ? "translate-y-0 opacity-100"
          : "translate-y-4 opacity-0"
      } ${
        type === "success"
          ? "bg-[#0d1117] border-emerald-500/30"
          : "bg-[#0d1117] border-red-500/30"
      }`}
    >
      <div className="flex items-start gap-3 p-4">
        <div
          className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${
            type === "success"
              ? "bg-emerald-500/15 text-emerald-400"
              : "bg-red-500/15 text-red-400"
          }`}
        >
          <span className="text-xs font-bold">
            {type === "success" ? "\u2713" : "\u2717"}
          </span>
        </div>
        <p className="text-white/70 text-sm leading-snug">{message}</p>
      </div>
    </div>
  );
}

/* ── EmailCapture ── */
export default function EmailCapture({
  variant = "inline",
}: {
  variant?: "inline" | "banner" | "sidebar";
}) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [subscribed, setSubscribed] = useState(false);
  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);

  useEffect(() => {
    try {
      if (localStorage.getItem("steelmath_subscribed") === "true") {
        setSubscribed(true);
      }
    } catch {
      /* SSR / private browsing */
    }
  }, []);

  const dismissToast = useCallback(() => setToast(null), []);

  function isValidEmail(e: string) {
    const atIdx = e.indexOf("@");
    return atIdx > 0 && e.indexOf(".", atIdx) > atIdx + 1;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!isValidEmail(email)) {
      setToast({ message: "Please enter a valid email address.", type: "error" });
      return;
    }
    setStatus("loading");
    try {
      const res = await fetch("https://formspree.io/f/xgodnqyj", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          email,
          _subject: "New SteelMath Subscriber",
          source: window.location.pathname,
        }),
      });
      if (res.ok) {
        setStatus("success");
        setEmail("");
        setSubscribed(true);
        try {
          localStorage.setItem("steelmath_subscribed", "true");
        } catch {
          /* ignore */
        }
        setToast({
          message: "You\u2019re in! Welcome to SteelMath Intelligence.",
          type: "success",
        });
      } else {
        throw new Error("not ok");
      }
    } catch {
      setStatus("error");
      setToast({
        message: "Something went wrong. Please try again.",
        type: "error",
      });
    }
  }

  function resetForm() {
    setSubscribed(false);
    setStatus("idle");
    try {
      localStorage.removeItem("steelmath_subscribed");
    } catch {
      /* ignore */
    }
  }

  /* ── Subscribed state ── */
  if (subscribed && status !== "loading") {
    if (variant === "sidebar") {
      return (
        <div className="glass-panel p-4 bg-gradient-to-br from-accent/[0.04] to-transparent">
          <div className="flex items-center gap-2 text-emerald-400 text-xs font-semibold">
            {"✓"} Successfully Subscribed
          </div>
          <button
            onClick={resetForm}
            className="text-white/25 hover:text-white/50 text-[10px] mt-1.5 transition-colors"
          >
            Subscribe another email?
          </button>
          {toast && (
            <Toast message={toast.message} type={toast.type} onDone={dismissToast} />
          )}
        </div>
      );
    }
    return (
      <div className={variant === "banner" ? "text-center py-4" : "py-3"}>
        <div className="flex items-center justify-center gap-2 text-emerald-400 text-xs font-semibold">
          {"✓"} Successfully Subscribed
        </div>
        <button
          onClick={resetForm}
          className="text-white/25 hover:text-white/50 text-[10px] mt-1 transition-colors block mx-auto"
        >
          Subscribe another email?
        </button>
        {toast && (
          <Toast message={toast.message} type={toast.type} onDone={dismissToast} />
        )}
      </div>
    );
  }

  /* ── Sidebar variant ── */
  if (variant === "sidebar") {
    return (
      <>
        <div className="glass-panel p-4 bg-gradient-to-br from-accent/[0.04] to-transparent">
          <h3 className="text-white/60 font-bold text-xs uppercase tracking-wider mb-1.5">
            Steel Intelligence
          </h3>
          <p className="text-white/25 text-[11px] mb-3 leading-relaxed">
            Weekly pricing moves, policy changes &amp; technical guides. Free
            for steel professionals.
          </p>
          <form onSubmit={handleSubmit} className="flex gap-2">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@company.com"
              className="flex-1 bg-white/[0.04] border border-white/5 rounded-md px-2.5 py-1.5 text-xs text-white/60 placeholder:text-white/15 focus:outline-none focus:border-accent/30 transition-colors"
            />
            <button
              type="submit"
              disabled={status === "loading"}
              className="px-3 py-1.5 bg-accent/15 text-accent border border-accent/20 rounded-md text-xs font-semibold hover:bg-accent/25 transition-colors shrink-0 disabled:opacity-50"
            >
              {status === "loading" ? "..." : "Subscribe"}
            </button>
          </form>
        </div>
        {toast && (
          <Toast message={toast.message} type={toast.type} onDone={dismissToast} />
        )}
      </>
    );
  }

  /* ── Banner variant ── */
  if (variant === "banner") {
    return (
      <>
        <section className="glass-panel overflow-hidden">
          <div className="p-6 sm:p-8 text-center">
            <h2 className="text-white font-bold text-lg sm:text-xl mb-2">
              Steel Market Intelligence &mdash; Delivered Weekly
            </h2>
            <p className="text-white/30 text-sm mb-5 max-w-xl mx-auto">
              Analysis, data, and decision tools for global steel leaders.
            </p>
            <form
              onSubmit={handleSubmit}
              className="flex flex-col sm:flex-row items-center justify-center gap-3 max-w-md mx-auto"
            >
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your work email"
                className="w-full sm:flex-1 bg-white/[0.04] border border-white/5 rounded-lg px-4 py-2.5 text-sm text-white/70 placeholder:text-white/20 focus:outline-none focus:border-accent/30 transition-colors"
              />
              <button
                type="submit"
                disabled={status === "loading"}
                className="btn-glow px-6 py-2.5 text-sm shrink-0 disabled:opacity-50 w-full sm:w-auto"
              >
                {status === "loading" ? "Subscribing..." : "Subscribe \u2014 Free"}
              </button>
            </form>
            <p className="text-white/15 text-[11px] mt-3">
              No spam &middot; Unsubscribe anytime &middot; Used across 7+ countries
            </p>
          </div>
        </section>
        {toast && (
          <Toast message={toast.message} type={toast.type} onDone={dismissToast} />
        )}
      </>
    );
  }

  /* ── Inline variant (default) ── */
  return (
    <>
      <div className="glass-panel p-5 sm:p-6">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3"
        >
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your work email"
            className="flex-1 bg-white/[0.04] border border-white/5 rounded-lg px-4 py-2.5 text-sm text-white/70 placeholder:text-white/20 focus:outline-none focus:border-accent/30 transition-colors"
          />
          <button
            type="submit"
            disabled={status === "loading"}
            className="btn-glow px-6 py-2.5 text-sm shrink-0 disabled:opacity-50"
          >
            {status === "loading" ? "Subscribing..." : "Subscribe"}
          </button>
        </form>
        <p className="text-white/20 text-[11px] mt-2">
          Join steel professionals worldwide. No spam.
        </p>
      </div>
      {toast && (
        <Toast message={toast.message} type={toast.type} onDone={dismissToast} />
      )}
    </>
  );
}
