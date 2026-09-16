import { bentoGrid, type BentoGridVariants } from "@beton-ui/recipes";
import type { ReactNode } from "react";
import { Section, type SectionProps } from "../section/section.tsx";

export interface BentoCell extends Omit<BentoGridVariants, "span"> {
  /** What the cell is called. */
  title: ReactNode;
  /** A line or two under the title. */
  description?: ReactNode;
  /** Anything to show inside: a component, a picture, a number. */
  media?: ReactNode;
  /** How many columns the cell takes. */
  span?: 1 | 2 | 3;
  /** Makes the whole cell a link. */
  href?: string;
}

export interface BentoGridProps extends Omit<SectionProps, "children"> {
  /** The cells, in order. */
  cells: BentoCell[];
  /** The heading level of each cell. One below the section heading. */
  itemHeadingLevel?: 3 | 4 | 5;
  /** Classes for the grid itself. */
  listClassName?: string;
}

/** A grid of boxes of different sizes: the one that gets screenshotted. */
export function BentoGrid({
  cells,
  itemHeadingLevel = 3,
  listClassName,
  ...props
}: BentoGridProps) {
  const Heading = `h${itemHeadingLevel}` as const;
  const list = bentoGrid().list({ class: listClassName });

  return (
    <Section {...props}>
      <ul className={list}>
        {cells.map((cell, index) => {
          const styles = bentoGrid({
            span: cell.span ?? 1,
            tall: cell.tall ?? false,
            accent: cell.accent ?? "none",
          });
          return (
            <li key={index} className={styles.item()}>
              <div>
                <Heading className={styles.itemTitle()}>
                  {cell.href ? <a href={cell.href}>{cell.title}</a> : cell.title}
                </Heading>
                {cell.description ? (
                  <p className={styles.itemDescription()}>{cell.description}</p>
                ) : null}
              </div>
              {cell.media ? <div className={styles.media()}>{cell.media}</div> : null}
            </li>
          );
        })}
      </ul>
    </Section>
  );
}
