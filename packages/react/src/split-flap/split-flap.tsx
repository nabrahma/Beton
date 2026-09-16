"use client";

import { splitFlap, visuallyHidden, type SplitFlapVariants } from "@beton-ui/recipes";
import { useEffect, useState, type ComponentProps } from "react";
import { useReducedMotion } from "../utils/use-reduced-motion.ts";

const ALPHABET = " ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789.,:-";

export interface SplitFlapProps extends Omit<ComponentProps<"div">, "children">, SplitFlapVariants {
  /** The words to land on. Anything outside the alphabet is shown as it is. */
  children: string;
  /** Milliseconds between flaps. */
  interval?: number;
  /** How many cells to draw. Defaults to the length of the text. */
  cells?: number;
}

/**
 * A departure board. Each cell flaps through the alphabet until it reaches its
 * letter. Screen readers get the words at once, as does anyone who has asked
 * for less motion.
 */
export function SplitFlap({
  size = "md",
  children,
  interval = 60,
  cells,
  className,
  ...props
}: SplitFlapProps) {
  const target = children.toUpperCase();
  const width = Math.max(1, cells ?? target.length);
  const wanted = target.padEnd(width, " ").slice(0, width);
  const reduced = useReducedMotion();
  const [shown, setShown] = useState(() => " ".repeat(width));

  useEffect(() => {
    if (reduced) {
      setShown(wanted);
      return;
    }
    setShown(" ".repeat(width));
    const timer = setInterval(() => {
      setShown((current) => {
        let settled = true;
        const next = wanted
          .split("")
          .map((letter, index) => {
            const at = current[index] ?? " ";
            if (at === letter) return at;
            settled = false;
            const from = ALPHABET.indexOf(at);
            // A letter the board cannot show simply appears.
            if (!ALPHABET.includes(letter)) return letter;
            return ALPHABET[(from + 1) % ALPHABET.length] ?? " ";
          })
          .join("");
        if (settled) clearInterval(timer);
        return next;
      });
    }, interval);
    return () => clearInterval(timer);
  }, [interval, reduced, wanted, width]);

  const styles = splitFlap({ size });
  return (
    <div {...props} className={styles.root({ class: className })}>
      {shown.split("").map((letter, index) => (
        <span key={index} aria-hidden="true" className={styles.cell()}>
          <span key={letter} className={styles.char()}>
            {letter}
          </span>
          <span className={styles.seam()} />
        </span>
      ))}
      <span className={visuallyHidden}>{target}</span>
    </div>
  );
}
