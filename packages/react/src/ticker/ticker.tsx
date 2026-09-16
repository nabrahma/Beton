"use client";

import { ticker, type TickerVariants } from "@beton-ui/recipes";
import type { ComponentProps, CSSProperties, ReactNode } from "react";

export interface TickerProps extends Omit<ComponentProps<"div">, "children">, TickerVariants {
  /** The chip at the start of the strip, such as LIVE or LATEST. */
  label?: ReactNode;
  /** The items to cycle through. */
  items: ReactNode[];
  /** Drawn between items. */
  separator?: ReactNode;
  /** How long one full pass takes, in seconds. */
  duration?: number;
}

/**
 * A strip of headlines that scrolls past a fixed label. It pauses on hover and
 * holds still under reduced motion.
 */
export function Ticker({
  size = "md",
  label,
  items,
  separator = "//",
  duration = 24,
  className,
  style,
  ...props
}: TickerProps) {
  const styles = ticker({ size });
  const pass = (
    <>
      {items.map((item, index) => (
        <span key={index} className={styles.item()}>
          {item}
          <span aria-hidden="true" className={styles.separator()}>
            {separator}
          </span>
        </span>
      ))}
    </>
  );

  return (
    <div
      {...props}
      className={styles.root({ class: className })}
      style={{ ...style, "--marquee-duration": `${duration}s` } as CSSProperties}
    >
      {label ? <span className={styles.label()}>{label}</span> : null}
      <div className={styles.viewport()}>
        <div className={styles.track()}>{pass}</div>
        <div aria-hidden="true" className={styles.track()}>
          {pass}
        </div>
      </div>
    </div>
  );
}
