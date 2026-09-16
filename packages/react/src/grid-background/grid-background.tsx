import { gridBackground, type GridBackgroundVariants } from "@beton-ui/recipes";
import type { ComponentProps } from "react";

export interface GridBackgroundProps
  extends Omit<ComponentProps<"div">, "children">, GridBackgroundVariants {
  /** How far apart the lines are, in pixels. */
  cell?: number;
  /** How thick the lines are, in pixels. */
  stroke?: number;
}

/**
 * Graph paper behind a section. Decorative, so it is hidden from screen
 * readers and never gets in the way of a pointer.
 */
export function GridBackground({
  weight = "medium",
  cell = 32,
  stroke = 1,
  className,
  ...props
}: GridBackgroundProps) {
  const styles = gridBackground({ weight });
  const id = `beton-grid-${cell}-${stroke}`;
  return (
    <div {...props} aria-hidden="true" className={styles.root({ class: className })}>
      <svg width="100%" height="100%">
        <defs>
          <pattern id={id} width={cell} height={cell} patternUnits="userSpaceOnUse">
            <path
              d={`M ${cell} 0 L 0 0 0 ${cell}`}
              fill="none"
              stroke="currentColor"
              strokeWidth={stroke}
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#${id})`} />
      </svg>
    </div>
  );
}
