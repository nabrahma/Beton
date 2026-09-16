"use client";

import { textEffect, visuallyHidden, type TextEffectVariants } from "@beton-ui/recipes";
import { useEffect, useState, type ComponentProps } from "react";
import { useReducedMotion } from "../utils/use-reduced-motion.ts";

const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#%&@";

export interface ScrambleTextProps
  extends Omit<ComponentProps<"span">, "children">, TextEffectVariants {
  /** The words to settle on. */
  children: string;
  /** Milliseconds between frames. */
  interval?: number;
  /** How many frames each character churns for before it settles. */
  churn?: number;
  /** Scramble again whenever this changes. */
  runKey?: string | number;
}

/**
 * Letters churn through junk and settle into the real words. Screen readers
 * only ever get the real words, and reduced motion skips the churn entirely.
 */
export function ScrambleText({
  size = "md",
  children,
  interval = 40,
  churn = 6,
  runKey,
  className,
  ...props
}: ScrambleTextProps) {
  const reduced = useReducedMotion();
  const [shown, setShown] = useState(children);

  useEffect(() => {
    if (reduced) {
      setShown(children);
      return;
    }
    let frame = 0;
    const steps = children.length + churn;
    const timer = setInterval(() => {
      frame += 1;
      if (frame >= steps) {
        setShown(children);
        clearInterval(timer);
        return;
      }
      const settled = Math.max(0, frame - churn);
      setShown(
        children
          .split("")
          .map((character, index) => {
            if (index < settled || character === " ") return character;
            return GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
          })
          .join(""),
      );
    }, interval);
    return () => clearInterval(timer);
  }, [children, churn, interval, reduced, runKey]);

  return (
    <span {...props} className={textEffect({ size, class: className })}>
      <span aria-hidden="true">{shown}</span>
      <span className={visuallyHidden}>{children}</span>
    </span>
  );
}
