"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

/* GA4 sends its initial page_view via the gtag config call; App Router
   client-side navigations never re-fire it, undercounting SPA journeys.
   This sends page_view on every route change after the first render. */
export default function GaRouteTracker() {
  const pathname = usePathname();
  const first = useRef(true);

  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    try {
      (window as unknown as { gtag?: (...a: unknown[]) => void }).gtag?.(
        "event",
        "page_view",
        {
          page_location: window.location.href,
          page_path: pathname,
          page_title: document.title,
        }
      );
    } catch {}
  }, [pathname]);

  return null;
}
