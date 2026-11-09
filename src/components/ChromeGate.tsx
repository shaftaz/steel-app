"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

/** Hides site chrome (footer etc.) on the embeddable widget route. */
export default function ChromeGate({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  if (pathname?.startsWith("/embed")) return null;
  return <>{children}</>;
}
