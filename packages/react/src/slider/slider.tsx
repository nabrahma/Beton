"use client";

import { Slider as BaseSlider } from "@base-ui/react/slider";
import { slider, type SliderVariants } from "@beton-ui/recipes";
import type { ReactNode } from "react";

export interface SliderProps
  extends Omit<BaseSlider.Root.Props, "className" | "children">, SliderVariants {
  className?: string;
  /** Visible label, associated with every thumb. */
  label?: ReactNode;
  /** Shows the formatted value next to the label. */
  showValue?: boolean;
  /** Accessible names for each thumb of a range slider, e.g. ["Minimum", "Maximum"]. */
  thumbLabels?: string[];
}

/** Select a value, or a range with an array value, by dragging or with the arrow keys. */
export function Slider({
  variant = "primary",
  size = "md",
  label,
  showValue = false,
  thumbLabels,
  className,
  "aria-label": ariaLabel,
  ...props
}: SliderProps) {
  const styles = slider({ variant, size });
  const current = props.value ?? props.defaultValue;
  const count = Array.isArray(current) ? current.length : 1;

  return (
    <BaseSlider.Root
      {...props}
      data-variant={variant}
      data-size={size}
      className={styles.root({ class: className })}
    >
      {label || showValue ? (
        <div className={styles.header()}>
          {label ? <BaseSlider.Label className={styles.label()}>{label}</BaseSlider.Label> : null}
          {showValue ? <BaseSlider.Value className={styles.value()} /> : null}
        </div>
      ) : null}
      <BaseSlider.Control className={styles.control()}>
        <BaseSlider.Track className={styles.track()}>
          <BaseSlider.Indicator className={styles.indicator()} />
          {Array.from({ length: count }, (_, index) => (
            <BaseSlider.Thumb
              key={index}
              index={index}
              aria-label={thumbLabels?.[index] ?? (label ? undefined : ariaLabel)}
              className={styles.thumb()}
            />
          ))}
        </BaseSlider.Track>
      </BaseSlider.Control>
    </BaseSlider.Root>
  );
}
