"use client";

import { textEffect, visuallyHidden, type TextEffectVariants } from "@beton-ui/recipes";
import { useEffect, useRef, useState, type ComponentProps } from "react";
import { useReducedMotion } from "../utils/use-reduced-motion.ts";

export interface CounterProps extends Omit<ComponentProps<"span">, "children">, TextEffectVariants {
  /** The number to land on. */
  value: number;
  /** Where to start counting. */
  from?: number;
  /** How long the count takes, in milliseconds. */
  duration?: number;
  /** How the number is written. Also used for the value screen readers get. */
  format?: Intl.NumberFormatOptions;
  /** Which locale formats the number. */
  locale?: string;
  /** Text before and after the number, such as a currency sign or a unit. */
  prefix?: string;
  suffix?: string;
}

/**
 * A number that counts up in hard steps. Screen readers are given the final
 * number straight away, and reduced motion skips the count.
 */
export function Counter({
  size = "md",
  value,
  from = 0,
  duration = 1200,
  format,
  locale,
  prefix = "",
  suffix = "",
  className,
  ...props
}: CounterProps) {
  const reduced = useReducedMotion();
  const [shown, setShown] = useState(from);
  const frame = useRef(0);

  useEffect(() => {
    if (reduced || duration <= 0) {
      setShown(value);
      return;
    }
    const start = performance.now();
    const step = (now: number) => {
      const progress = Math.min(1, (now - start) / duration);
      // Stepped, not eased: the number lands on twenty stops along the way.
      const stepped = Math.round(progress * 20) / 20;
      setShown(from + (value - from) * stepped);
      if (progress < 1) frame.current = requestAnimationFrame(step);
      else setShown(value);
    };
    frame.current = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame.current);
  }, [duration, from, reduced, value]);

  const formatter = new Intl.NumberFormat(locale, format);
  const label = `${prefix}${formatter.format(value)}${suffix}`;

  return (
    <span {...props} className={textEffect({ size, class: className })}>
      <span aria-hidden="true">
        {prefix}
        {formatter.format(Number.isInteger(value) ? Math.round(shown) : shown)}
        {suffix}
      </span>
      <span className={visuallyHidden}>{label}</span>
    </span>
  );
}
