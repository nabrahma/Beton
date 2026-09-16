import { statsBand, type StatsBandVariants } from "@beton-ui/recipes";
import type { ReactNode } from "react";
import { Section, type SectionProps } from "../section/section.tsx";

export interface BandStat {
  /** The number, already formatted, or a Counter. */
  value: ReactNode;
  /** What the number measures. */
  label: ReactNode;
  /** A line of context under it. */
  description?: ReactNode;
}

export interface StatsBandProps extends Omit<SectionProps, "children">, StatsBandVariants {
  /** The numbers, in order. */
  stats: BandStat[];
  /** Classes for the strip itself. */
  listClassName?: string;
}

/** A strip of numbers that say how much, how many, how fast. */
export function StatsBand({
  stats,
  columns = 4,
  size = "md",
  listClassName,
  ...props
}: StatsBandProps) {
  const styles = statsBand({ columns, size });
  return (
    <Section {...props}>
      <dl className={styles.list({ class: listClassName })}>
        {stats.map((stat, index) => (
          <div key={index} className={styles.item()}>
            <dt className={styles.label()}>{stat.label}</dt>
            <dd className={styles.value()}>{stat.value}</dd>
            {stat.description ? <dd className={styles.description()}>{stat.description}</dd> : null}
          </div>
        ))}
      </dl>
    </Section>
  );
}
