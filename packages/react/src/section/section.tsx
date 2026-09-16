import { section, type SectionVariants } from "@beton-ui/recipes";
import { useId, type ComponentProps, type ReactNode } from "react";

export interface SectionProps extends Omit<ComponentProps<"section">, "title">, SectionVariants {
  /** The heading of the section. Every landmark needs one. */
  title?: ReactNode;
  /** A short line above the heading. */
  eyebrow?: ReactNode;
  /** A paragraph under the heading. */
  description?: ReactNode;
  /** Buttons under the text. */
  actions?: ReactNode;
  /** The heading level. Defaults to h2, which is right inside a page with one h1. */
  headingLevel?: 2 | 3 | 4;
}

/**
 * The frame every marketing block sits in: a named landmark, a heading, and a
 * centred column that never gets wider than the measure.
 */
export function Section({
  size = "md",
  align = "start",
  surface = "paper",
  bordered = false,
  title,
  eyebrow,
  description,
  actions,
  headingLevel = 2,
  className,
  children,
  ...props
}: SectionProps) {
  const styles = section({ size, align, surface, bordered });
  const id = useId();
  const Heading = `h${headingLevel}` as const;

  return (
    <section
      {...props}
      aria-labelledby={title ? `${id}-title` : props["aria-labelledby"]}
      data-surface={surface}
      className={styles.root({ class: className })}
    >
      <div className={styles.inner()}>
        {title || description || eyebrow ? (
          <div className={styles.header()}>
            {eyebrow ? <p className={styles.eyebrow()}>{eyebrow}</p> : null}
            {title ? (
              <Heading id={`${id}-title`} className={styles.title()}>
                {title}
              </Heading>
            ) : null}
            {description ? <p className={styles.description()}>{description}</p> : null}
            {actions ? <div className={styles.actions()}>{actions}</div> : null}
          </div>
        ) : null}
        {children}
      </div>
    </section>
  );
}
