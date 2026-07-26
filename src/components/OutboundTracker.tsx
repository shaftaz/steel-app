"use client";

import { useEffect } from "react";

/* Fires outbound_source_click when a reader follows a cited source.
   Delegated listener; no per-link markup needed. */
export default function OutboundTracker() {
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement | null)?.closest?.("a[href^='http']") as
        | HTMLAnchorElement
        | null;
      if (!a) return;
      try {
        const url = new URL(a.href);
        if (url.hostname.endsWith("steelmath.com") || url.hostname === window.location.hostname) return;
        (window as unknown as { gtag?: (...a: unknown[]) => void }).gtag?.(
          "event",
          "outbound_source_click",
          { link_domain: url.hostname, link_url: a.href.slice(0, 200) }
        );
      } catch {}
    };
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, []);
  return null;
}
