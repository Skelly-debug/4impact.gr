"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

export default function HiddenAdminButton() {
  const router = useRouter();
  const keysRef = useRef([]);

  // Change this to any key sequence you want
  const secretSequence = ["a", "d", "m", "i", "n"];

  useEffect(() => {
    const handler = (e) => {
      const key = e.key.toLowerCase();

      // Store keys without triggering rerenders
      keysRef.current.push(key);
      keysRef.current = keysRef.current.slice(-secretSequence.length);

      const match =
        JSON.stringify(keysRef.current) === JSON.stringify(secretSequence);

      if (match) {
        // Redirect only AFTER the event, not during render
        router.push("/admin");
      }
    };

    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [router]);

  return null;
}
