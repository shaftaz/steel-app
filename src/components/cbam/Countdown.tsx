"use client";

import { useEffect, useState } from "react";

const TARGET = new Date("2027-02-01T00:00:00+01:00").getTime();

function pad(n: number) {
  return String(n).padStart(2, "0");
}

export default function Countdown() {
  const [now, setNow] = useState<number | null>(null);

  useEffect(() => {
    setNow(Date.now());
    const t = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(t);
  }, []);

  let text = "— : — : — : —";
  if (now !== null) {
    let diff = Math.max(TARGET - now, 0) / 1000;
    const days = Math.floor(diff / 86400);
    diff -= days * 86400;
    const hrs = Math.floor(diff / 3600);
    diff -= hrs * 3600;
    const mins = Math.floor(diff / 60);
    const secs = Math.floor(diff - mins * 60);
    text = `${days} : ${pad(hrs)} : ${pad(mins)} : ${pad(secs)}`;
  }

  return (
    <div
      className="font-mono text-[clamp(21px,2.6vw,38px)] font-semibold text-cbam leading-none whitespace-nowrap"
      aria-label="Countdown to certificate sales opening on 1 February 2027"
    >
      {text}
    </div>
  );
}
