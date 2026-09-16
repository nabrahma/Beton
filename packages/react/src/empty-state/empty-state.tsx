import { emptyState, type EmptyStateVariants } from "@beton-ui/recipes";
import type { ComponentProps, ReactNode } from "react";

export interface EmptyStateProps extends Omit<ComponentProps<"div">, "title">, EmptyStateVariants {
  /** What is missing, in a few words. */
  title: ReactNode;
  /** Why it is missing, or what to do about it. */
  description?: ReactNode;
  /** A mark above the title. Decorative: it is hidden from screen readers. */
  icon?: ReactNode;
  /** Buttons under the text. */
  actions?: ReactNode;
  /** The heading level the title takes. Defaults to h3. */
  headingLevel?: 2 | 3 | 4 | 5 | 6;
}

/** What to show where there is nothing yet: no results, no records, no files. */
export function EmptyState({
  size = "md",
  title,
  description,
  icon,
  actions,
  headingLevel = 3,
  className,
  children,
  ...props
}: EmptyStateProps) {
  const styles = emptyState({ size });
  const Heading = `h${headingLevel}` as const;
  return (
    <div {...props} className={styles.root({ class: className })}>
      {icon ? (
        <span aria-hidden="true" className={styles.icon()}>
          {icon}
        </span>
      ) : null}
      <Heading className={styles.title()}>{title}</Heading>
      {description ? <p className={styles.description()}>{description}</p> : null}
      {children}
      {actions ? <div className={styles.actions()}>{actions}</div> : null}
    </div>
  );
}
