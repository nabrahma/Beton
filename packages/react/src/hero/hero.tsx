import { hero, type HeroVariants } from "@beton-ui/recipes";
import { useId, type ComponentProps, type ReactNode } from "react";

export interface HeroProps extends Omit<ComponentProps<"section">, "title">, HeroVariants {
  /** The one heading of the page. */
  title: ReactNode;
  /** A short line above the heading, such as a version or a category. */
  eyebrow?: ReactNode;
  /** The paragraph under the heading. */
  description?: ReactNode;
  /** Buttons under the text. */
  actions?: ReactNode;
  /** A line under the buttons: a licence, a size, a reassurance. */
  note?: ReactNode;
  /** What goes beside the text in the split layout: a panel, a picture, a demo. */
  aside?: ReactNode;
  /** Drawn behind everything, such as a grid or a halftone. */
  background?: ReactNode;
  /** The heading level. Defaults to h1: a hero is the top of a page. */
  headingLevel?: 1 | 2;
}

/** The top of a page: what this is, why it matters, and the way in. */
export function Hero({
  variant = "stacked",
  surface = "paper",
  title,
  eyebrow,
  description,
  actions,
  note,
  aside,
  background,
  headingLevel = 1,
  className,
  children,
  ...props
}: HeroProps) {
  const styles = hero({ variant, surface });
  const id = useId();
  const Heading = `h${headingLevel}` as const;

  return (
    <section
      {...props}
      aria-labelledby={`${id}-title`}
      data-variant={variant}
      className={styles.root({ class: className })}
    >
      {background}
      <div className={styles.inner()}>
        <div className={styles.content()}>
          {eyebrow ? <p className={styles.eyebrow()}>{eyebrow}</p> : null}
          <Heading id={`${id}-title`} className={styles.title()}>
            {title}
          </Heading>
          {description ? <p className={styles.description()}>{description}</p> : null}
          {actions ? <div className={styles.actions()}>{actions}</div> : null}
          {note ? <p className={styles.note()}>{note}</p> : null}
          {children}
        </div>
        {aside && variant === "split" ? <div className={styles.aside()}>{aside}</div> : null}
      </div>
    </section>
  );
}
