import { noiseOverlay, type NoiseOverlayVariants } from "@beton-ui/recipes";
import type { ComponentProps } from "react";

export interface NoiseOverlayProps
  extends Omit<ComponentProps<"div">, "children">, NoiseOverlayVariants {
  /** How fine the grain is. Higher is finer. */
  frequency?: number;
}

/**
 * Print grain over a section, drawn by the browser rather than loaded as an
 * image. Decorative, and hidden from screen readers.
 */
export function NoiseOverlay({
  weight = "medium",
  frequency = 0.8,
  className,
  ...props
}: NoiseOverlayProps) {
  const styles = noiseOverlay({ weight });
  const id = `beton-noise-${String(frequency).replace(".", "-")}`;
  return (
    <div {...props} aria-hidden="true" className={styles.root({ class: className })}>
      <svg width="100%" height="100%">
        <filter id={id}>
          <feTurbulence type="fractalNoise" baseFrequency={frequency} numOctaves={3} />
          {/* Grain, not confetti: drop the colour the turbulence generates. */}
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter={`url(#${id})`} />
      </svg>
    </div>
  );
}
