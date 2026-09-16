import { footer, type FooterVariants } from "@beton-ui/recipes";
import type { ComponentProps, ReactNode } from "react";

export interface FooterLink {
  label: ReactNode;
  href: string;
}

export interface FooterColumn {
  /** What the group of links is called. */
  title: ReactNode;
  links: FooterLink[];
}

export interface FooterProps extends ComponentProps<"footer">, FooterVariants {
  /** The name of the thing. */
  mark?: ReactNode;
  /** A line about what it is. */
  blurb?: ReactNode;
  /** Groups of links. */
  columns?: FooterColumn[];
  /** The line along the bottom: a licence, a copyright. */
  note?: ReactNode;
  /** Links to wherever you are: GitHub, elsewhere. */
  social?: ReactNode;
}

/** The end of the page: who made it, where everything is, and the licence. */
export function Footer({
  variant = "columns",
  mark,
  blurb,
  columns = [],
  note,
  social,
  className,
  children,
  ...props
}: FooterProps) {
  const styles = footer({ variant });
  return (
    <footer {...props} className={styles.root({ class: className })}>
      <div className={styles.inner()}>
        {mark || blurb ? (
          <div className={styles.brand()}>
            {mark ? <p className={styles.mark()}>{mark}</p> : null}
            {blurb ? <p className={styles.blurb()}>{blurb}</p> : null}
          </div>
        ) : null}
        {columns.length ? (
          <div className={styles.columns()}>
            {columns.map((column, index) => (
              <nav
                key={index}
                aria-label={typeof column.title === "string" ? column.title : undefined}
                className={styles.column()}
              >
                <p className={styles.columnTitle()}>{column.title}</p>
                <ul className={styles.list()}>
                  {column.links.map((link) => (
                    <li key={link.href}>
                      <a href={link.href} className={styles.link()}>
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>
        ) : null}
        {children}
      </div>
      {note || social ? (
        <div className={styles.inner()}>
          <div className={styles.bottom()}>
            {note ? <p className={styles.note()}>{note}</p> : null}
            {social ? <div className={styles.social()}>{social}</div> : null}
          </div>
        </div>
      ) : null}
    </footer>
  );
}
