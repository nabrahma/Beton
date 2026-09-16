"use client";

import { typewriter, visuallyHidden, type TypewriterVariants } from "@beton-ui/recipes";
import { useEffect, useState, type ComponentProps } from "react";
import { useReducedMotion } from "../utils/use-reduced-motion.ts";

export interface TypewriterProps
  extends Omit<ComponentProps<"span">, "children">, TypewriterVariants {
  /** The lines to type, one after another. */
  children: string | string[];
  /** Milliseconds per character. */
  speed?: number;
  /** How long a finished line stays before it is deleted. */
  pause?: number;
  /** Start again at the first line once the last one is done. */
  loop?: boolean;
  /** Show the blinking block after the text. */
  caret?: boolean;
}

/**
 * Words typed out one character at a time. The full text is always available
 * to screen readers, and reduced motion shows it at once.
 */
export function Typewriter({
  size = "md",
  children,
  speed = 60,
  pause = 1400,
  loop = true,
  caret = true,
  className,
  ...props
}: TypewriterProps) {
  const lines = Array.isArray(children) ? children : [children];
  const full = lines.join(". ");
  const reduced = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [count, setCount] = useState(0);
  const [deleting, setDeleting] = useState(false);

  const line = lines[index % lines.length] ?? "";

  useEffect(() => {
    if (reduced) return;
    const done = count === line.length;
    if (done && !deleting) {
      const last = index === lines.length - 1;
      if (last && !loop) return;
      const timer = setTimeout(() => setDeleting(true), pause);
      return () => clearTimeout(timer);
    }
    if (deleting && count === 0) {
      setDeleting(false);
      setIndex((current) => (current + 1) % lines.length);
      return;
    }
    const timer = setTimeout(
      () => setCount((current) => current + (deleting ? -1 : 1)),
      deleting ? speed / 2 : speed,
    );
    return () => clearTimeout(timer);
  }, [count, deleting, index, line.length, lines.length, loop, pause, reduced, speed]);

  const styles = typewriter({ size });
  return (
    <span {...props} className={styles.root({ class: className })}>
      <span aria-hidden="true">{reduced ? line : line.slice(0, count)}</span>
      {caret && !reduced ? <span aria-hidden="true" className={styles.caret()} /> : null}
      <span className={visuallyHidden}>{full}</span>
    </span>
  );
}
