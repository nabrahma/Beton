import { halftoneBackground, type HalftoneBackgroundVariants } from "@beton-ui/recipes";
import type { ComponentProps } from "react";

export interface HalftoneBackgroundProps
  extends Omit<ComponentProps<"div">, "children">, HalftoneBackgroundVariants {
  /** How far apart the dots are, in pixels. */
  cell?: number;
  /** How big each dot is, as a share of the cell. */
  dot?: number;
}

/**
 * A field of printed dots, as though the section had been run off a press.
 * Decorative, and hidden from screen readers.
 */
export function HalftoneBackground({
  weight = "medium",
  cell = 12,
  dot = 0.28,
  className,
  ...props
}: HalftoneBackgroundProps) {
  const styles = halftoneBackground({ weight });
  const id = `beton-halftone-${cell}-${String(dot).replace(".", "-")}`;
  return (
    <div {...props} aria-hidden="true" className={styles.root({ class: className })}>
      <svg width="100%" height="100%">
        <defs>
          <pattern id={id} width={cell} height={cell} patternUnits="userSpaceOnUse">
            <circle cx={cell / 2} cy={cell / 2} r={cell * dot} fill="currentColor" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#${id})`} />
      </svg>
    </div>
  );
}
