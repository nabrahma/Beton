import { featureGrid, type FeatureGridVariants } from "@beton-ui/recipes";
import type { ComponentProps, ReactNode } from "react";
import { Section, type SectionProps } from "../section/section.tsx";

export interface Feature {
  /** What the feature is called. */
  title: ReactNode;
  /** One or two sentences on what it does. */
  description: ReactNode;
  /** A mark above the title. Decorative: it is hidden from screen readers. */
  icon?: ReactNode;
  /** Makes the whole card a link. */
  href?: string;
}

export interface FeatureGridProps extends Omit<SectionProps, "children">, FeatureGridVariants {
  /** The features, in order. */
  features: Feature[];
  /** The heading level of each feature. One below the section heading. */
  itemHeadingLevel?: 3 | 4 | 5;
  /** Classes for the grid itself. */
  listClassName?: string;
}

/** A grid of what a thing does, one card per feature. */
export function FeatureGrid({
  features,
  columns = 3,
  itemHeadingLevel = 3,
  listClassName,
  ...props
}: FeatureGridProps) {
  const styles = featureGrid({ columns });
  const Heading = `h${itemHeadingLevel}` as const;

  return (
    <Section {...props}>
      <ul className={styles.list({ class: listClassName })}>
        {features.map((feature, index) => (
          <li key={index} className={styles.item()}>
            {feature.icon ? (
              <span aria-hidden="true" className={styles.icon()}>
                {feature.icon}
              </span>
            ) : null}
            <Heading className={styles.itemTitle()}>
              {feature.href ? <a href={feature.href}>{feature.title}</a> : feature.title}
            </Heading>
            <p className={styles.itemDescription()}>{feature.description}</p>
          </li>
        ))}
      </ul>
    </Section>
  );
}

export type FeatureGridItemProps = ComponentProps<"li">;
