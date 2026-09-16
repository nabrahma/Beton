import { testimonial, type TestimonialVariants } from "@beton-ui/recipes";
import type { ReactNode } from "react";
import { Section, type SectionProps } from "../section/section.tsx";

export interface Quote {
  /** What they said. */
  quote: ReactNode;
  /** Who said it. */
  name: ReactNode;
  /** What they do, and where. */
  role?: ReactNode;
  /** A picture or an avatar. */
  portrait?: ReactNode;
}

export interface TestimonialProps extends Omit<SectionProps, "children">, TestimonialVariants {
  /** The quotes, in order. */
  quotes: Quote[];
  /** Classes for the grid itself. */
  listClassName?: string;
}

/** What people say, attributed to the people who said it. */
export function Testimonial({
  quotes,
  size = "md",
  columns = 3,
  listClassName,
  ...props
}: TestimonialProps) {
  const styles = testimonial({ size, columns });
  return (
    <Section {...props}>
      <ul className={styles.list({ class: listClassName })}>
        {quotes.map((entry, index) => (
          <li key={index}>
            <figure className={styles.root()}>
              <span aria-hidden="true" className={styles.mark()}>
                &ldquo;
              </span>
              <blockquote className={styles.quote()}>{entry.quote}</blockquote>
              <figcaption className={styles.footer()}>
                {entry.portrait}
                <span className={styles.person()}>
                  <span className={styles.name()}>{entry.name}</span>
                  {entry.role ? <span className={styles.role()}>{entry.role}</span> : null}
                </span>
              </figcaption>
            </figure>
          </li>
        ))}
      </ul>
    </Section>
  );
}
