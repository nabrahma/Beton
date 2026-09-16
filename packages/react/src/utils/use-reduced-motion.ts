"use client";

import { useEffect, useState } from "react";

const QUERY = "(prefers-reduced-motion: reduce)";

/**
 * Whether the person has asked for less motion. Starts false so the server and
 * the first client render agree, then corrects itself before paint.
 *
 * Anything that can be expressed in CSS should use the motion-safe and
 * motion-reduce variants instead; this is for effects driven by JavaScript,
 * which have to know whether to run at all.
 */
export function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(QUERY);
    const update = () => setReduced(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  return reduced;
}
