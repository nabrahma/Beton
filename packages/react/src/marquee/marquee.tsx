"use client";

import { marquee, type MarqueeVariants } from "@beton-ui/recipes";
import type { ComponentProps, CSSProperties, ReactNode } from "react";

export interface MarqueeProps extends ComponentProps<"div">, MarqueeVariants {
  /** How long one full pass takes, in seconds. */
  duration?: number;
  /** How many copies to draw. Two is enough unless the content is very short. */
  copies?: number;
  children?: ReactNode;
}

/**
 * Content that slides past, forever. It pauses on hover, and holds still for
 * anyone who has asked for less motion.
 */
export function Marquee({
  direction = "left",
  gap = "md",
  bordered = false,
  duration = 20,
  copies = 2,
  className,
  style,
  children,
  ...props
}: MarqueeProps) {
  const styles = marquee({ direction, gap, bordered });
  const passes = Math.max(2, Math.trunc(copies));
  return (
    <div
      {...props}
      data-direction={direction}
      className={styles.root({ class: className })}
      style={{ ...style, "--marquee-duration": `${duration}s` } as CSSProperties}
    >
      {Array.from({ length: passes }, (_, index) => (
        // Only the first pass is read out; the rest are the same words again.
        <div key={index} aria-hidden={index > 0} className={styles.track()}>
          {children}
        </div>
      ))}
    </div>
  );
}
