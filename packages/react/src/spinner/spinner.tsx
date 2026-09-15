import { spinner, type SpinnerVariants } from "@beton-ui/recipes";
import type { ComponentProps } from "react";

export interface SpinnerProps extends Omit<ComponentProps<"span">, "children">, SpinnerVariants {
  /** Text announced to assistive technology. Visible when `showLabel` is set. */
  label?: string;
}

const BLOCKS = [0, 1, 2, 3, 4, 5, 6, 7];

export function Spinner({
  size = "md",
  showLabel = false,
  label = "Loading",
  className,
  ...props
}: SpinnerProps) {
  const styles = spinner({ size, showLabel });
  return (
    <span role="status" data-size={size} {...props} className={styles.root({ class: className })}>
      <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false" className={styles.icon()}>
        {BLOCKS.map((i) => (
          <rect
            key={i}
            x="10.5"
            y="1"
            width="3"
            height="6"
            transform={`rotate(${i * 45} 12 12)`}
            opacity={i === 0 ? 1 : 0.2 + (i / BLOCKS.length) * 0.8}
          />
        ))}
      </svg>
      <span className={styles.label()}>{label}</span>
    </span>
  );
}
