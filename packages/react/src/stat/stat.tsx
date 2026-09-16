import { stat, visuallyHidden, type StatVariants } from "@beton-ui/recipes";
import type { ComponentProps, ReactNode } from "react";
import { ChevronDownIcon, ChevronUpIcon, MinusIcon } from "../utils/icons.tsx";

export interface StatProps extends ComponentProps<"div">, Omit<StatVariants, "trend"> {
  /** What the number measures. */
  label: ReactNode;
  /** The number itself. */
  value: ReactNode;
  /** The change since last time, such as "+12%". */
  delta?: ReactNode;
  /** Which way the change went. Says so in words as well as with an arrow. */
  trend?: "up" | "down" | "flat";
  /** A line of context under the number. */
  description?: ReactNode;
}

const TREND_LABEL = { up: "up", down: "down", flat: "no change" } as const;

/** A single number with its label, its change and a line of context. */
export function Stat({
  size = "md",
  label,
  value,
  delta,
  trend = "flat",
  description,
  className,
  children,
  ...props
}: StatProps) {
  const styles = stat({ size, trend });
  const TrendIcon = trend === "up" ? ChevronUpIcon : trend === "down" ? ChevronDownIcon : MinusIcon;
  return (
    <div {...props} data-trend={trend} className={styles.root({ class: className })}>
      <p className={styles.label()}>{label}</p>
      <p className={styles.value()}>{value}</p>
      {delta ? (
        <p className={styles.delta()}>
          <TrendIcon className={styles.deltaIcon()} />
          {delta}
          <span className={visuallyHidden}> ({TREND_LABEL[trend]})</span>
        </p>
      ) : null}
      {description ? <p className={styles.description()}>{description}</p> : null}
      {children}
    </div>
  );
}
