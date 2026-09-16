import { changelogEntry, type ChangelogEntryVariants } from "@beton-ui/recipes";
import { useId, type ComponentProps, type ReactNode } from "react";

export type ChangeKind = NonNullable<ChangelogEntryVariants["kind"]>;

export interface Change {
  /** Added, changed, fixed or removed. */
  kind: ChangeKind;
  /** What happened, in one line. */
  summary: ReactNode;
}

export interface ChangelogEntryProps extends Omit<ComponentProps<"article">, "title"> {
  /** The version this entry covers. */
  version: ReactNode;
  /** When it went out. */
  date?: ReactNode;
  /** A machine-readable date, so the entry means something to a machine. */
  dateTime?: string;
  /** A headline for the release. */
  title?: ReactNode;
  /** What changed, grouped by kind. */
  changes?: Change[];
  /** The heading level. Defaults to h3, under a page heading and a year. */
  headingLevel?: 2 | 3 | 4;
}

/** One release: its version, its date and what changed. */
export function ChangelogEntry({
  version,
  date,
  dateTime,
  title,
  changes = [],
  headingLevel = 3,
  className,
  children,
  ...props
}: ChangelogEntryProps) {
  const styles = changelogEntry();
  const id = useId();
  const Heading = `h${headingLevel}` as const;

  return (
    <article
      {...props}
      aria-labelledby={`${id}-title`}
      className={styles.root({ class: className })}
    >
      <div className={styles.aside()}>
        <p className={styles.version()}>{version}</p>
        {date ? (
          <time dateTime={dateTime} className={styles.date()}>
            {date}
          </time>
        ) : null}
      </div>
      <div className={styles.body()}>
        <Heading id={`${id}-title`} className={styles.title()}>
          {title ?? version}
        </Heading>
        {changes.length ? (
          <ul className={styles.changes()}>
            {changes.map((change, index) => (
              <li key={index} className={styles.change()}>
                <span className={changelogEntry({ kind: change.kind }).kind()}>{change.kind}</span>
                <span>{change.summary}</span>
              </li>
            ))}
          </ul>
        ) : null}
        {children}
      </div>
    </article>
  );
}
