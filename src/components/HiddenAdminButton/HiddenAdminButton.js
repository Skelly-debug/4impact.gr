"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

export default function HiddenAdminButton() {
  const router = useRouter();
  const keysRef = useRef([]);

  const secretSequenceEN = ["a", "d", "m", "i", "n"];
  const secretSequenceGR = ["α", "δ", "μ", "ι", "ν"];

  // Use the longer sequence length so neither gets cut short
  const maxLen = Math.max(secretSequenceEN.length, secretSequenceGR.length);

  useEffect(() => {
    const handler = (e) => {
      const key = e.key.toLowerCase();

      keysRef.current.push(key);
      keysRef.current = keysRef.current.slice(-maxLen); // single slice

      const match =
        JSON.stringify(keysRef.current) === JSON.stringify(secretSequenceEN) ||
        JSON.stringify(keysRef.current) === JSON.stringify(secretSequenceGR); // || not ;

      if (match) {
        router.push("/admin");
      }
    };

    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [router, maxLen]);

  return null;
}