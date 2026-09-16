import { notFoundPage } from "@beton-ui/recipes";
import { useId, type ComponentProps, type ReactNode } from "react";

export interface NotFoundPageProps extends Omit<ComponentProps<"main">, "title"> {
  /** The number, or whatever stands in for it. */
  code?: ReactNode;
  /** What went wrong, in plain words. */
  title?: ReactNode;
  /** What to do about it. */
  description?: ReactNode;
  /** The way back. */
  actions?: ReactNode;
  /** Drawn behind everything, such as a grid or a halftone. */
  background?: ReactNode;
  /** The heading level. Defaults to h1: this is the page. */
  headingLevel?: 1 | 2;
}

/** The page for an address that leads nowhere. */
export function NotFoundPage({
  code = "404",
  title = "Page not found",
  description = "The address is wrong, or the page has moved. Neither is your fault.",
  actions,
  background,
  headingLevel = 1,
  className,
  children,
  ...props
}: NotFoundPageProps) {
  const styles = notFoundPage();
  const id = useId();
  const Heading = `h${headingLevel}` as const;

  return (
    <main {...props} aria-labelledby={`${id}-title`} className={styles.root({ class: className })}>
      {background}
      <div className={styles.inner()}>
        <p aria-hidden="true" className={styles.code()}>
          {code}
        </p>
        <Heading id={`${id}-title`} className={styles.title()}>
          {title}
        </Heading>
        {description ? <p className={styles.description()}>{description}</p> : null}
        {actions ? <div className={styles.actions()}>{actions}</div> : null}
        {children}
      </div>
    </main>
  );
}
