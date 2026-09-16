"use client";

import { Progress as BaseProgress } from "@base-ui/react/progress";
import { progress, type ProgressVariants } from "@beton-ui/recipes";
import type { ReactNode } from "react";

export interface ProgressProps
  extends Omit<BaseProgress.Root.Props, "className">, ProgressVariants {
  className?: string;
  /** Names the bar. Required unless you pass aria-label or aria-labelledby. */
  label?: ReactNode;
  /** Shows the percentage beside the label. On by default when there is a label. */
  showValue?: boolean;
}

/** How far along a task is, from zero to done. */
export function Progress({
  variant = "primary",
  size = "md",
  label,
  showValue,
  className,
  ...props
}: ProgressProps) {
  const styles = progress({ variant, size });
  const withValue = showValue ?? Boolean(label);
  return (
    <BaseProgress.Root {...props} className={styles.root({ class: className })}>
      {label || withValue ? (
        <div className={styles.header()}>
          {label ? (
            <BaseProgress.Label className={styles.label()}>{label}</BaseProgress.Label>
          ) : null}
          {withValue ? <BaseProgress.Value className={styles.value()} /> : null}
        </div>
      ) : null}
      <BaseProgress.Track className={styles.track()}>
        <BaseProgress.Indicator className={styles.indicator()} />
      </BaseProgress.Track>
    </BaseProgress.Root>
  );
}
