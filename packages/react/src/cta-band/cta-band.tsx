import { ctaBand, type CtaBandVariants } from "@beton-ui/recipes";
import { useId, type ComponentProps, type ReactNode } from "react";

export interface CtaBandProps extends Omit<ComponentProps<"section">, "title">, CtaBandVariants {
  /** What you want people to do. */
  title: ReactNode;
  /** One line of reason. */
  description?: ReactNode;
  /** The buttons. */
  actions?: ReactNode;
  /** The heading level. Defaults to h2. */
  headingLevel?: 2 | 3;
}

/** A loud strip across the page with one thing to do. */
export function CtaBand({
  surface = "accent",
  layout = "inline",
  title,
  description,
  actions,
  headingLevel = 2,
  className,
  children,
  ...props
}: CtaBandProps) {
  const styles = ctaBand({ surface, layout });
  const id = useId();
  const Heading = `h${headingLevel}` as const;

  return (
    <section
      {...props}
      aria-labelledby={`${id}-title`}
      data-surface={surface}
      className={styles.root({ class: className })}
    >
      <div className={styles.inner()}>
        <div>
          <Heading id={`${id}-title`} className={styles.title()}>
            {title}
          </Heading>
          {description ? <p className={styles.description()}>{description}</p> : null}
        </div>
        {actions ? <div className={styles.actions()}>{actions}</div> : null}
        {children}
      </div>
    </section>
  );
}
