import { pricingTable, visuallyHidden, type PricingTableVariants } from "@beton-ui/recipes";
import type { ReactNode } from "react";
import { CheckIcon, MinusIcon } from "../utils/icons.tsx";
import { Section, type SectionProps } from "../section/section.tsx";

export interface PricingPlan {
  /** What the plan is called. */
  name: ReactNode;
  /** The amount, already formatted. */
  price: ReactNode;
  /** What the amount is per: a month, a seat, a project. */
  period?: ReactNode;
  /** A line on who the plan is for. */
  description?: ReactNode;
  /** What is in it. Pass false as the second item to show it as missing. */
  features: (ReactNode | [ReactNode, boolean])[];
  /** The button. */
  action?: ReactNode;
  /** A word above the name, such as Most popular. */
  badge?: ReactNode;
  /** Thickens the border and drops a longer shadow. */
  featured?: boolean;
  /** Small print under the button. */
  footnote?: ReactNode;
}

export interface PricingTableProps
  extends Omit<SectionProps, "children">, Pick<PricingTableVariants, "columns"> {
  /** The plans, in order. */
  plans: PricingPlan[];
  /** The heading level of each plan. One below the section heading. */
  itemHeadingLevel?: 3 | 4 | 5;
  /** Classes for the grid itself. */
  listClassName?: string;
}

/** What each plan costs and what is in it. */
export function PricingTable({
  plans,
  columns = 3,
  itemHeadingLevel = 3,
  listClassName,
  ...props
}: PricingTableProps) {
  const Heading = `h${itemHeadingLevel}` as const;
  const list = pricingTable({ columns }).list({ class: listClassName });

  return (
    <Section {...props}>
      <ul className={list}>
        {plans.map((plan, index) => {
          const styles = pricingTable({ columns, featured: plan.featured ?? false });
          return (
            <li
              key={index}
              data-featured={plan.featured ? "" : undefined}
              className={styles.plan()}
            >
              {plan.badge ? <p className={styles.badge()}>{plan.badge}</p> : null}
              <Heading className={styles.name()}>{plan.name}</Heading>
              <p className={styles.price()}>
                <span className={styles.amount()}>{plan.price}</span>
                {plan.period ? <span className={styles.period()}>{plan.period}</span> : null}
              </p>
              {plan.description ? <p className={styles.description()}>{plan.description}</p> : null}
              <ul className={styles.features()}>
                {plan.features.map((entry, featureIndex) => {
                  const [feature, included] = Array.isArray(entry) ? entry : [entry, true];
                  return (
                    <li key={featureIndex} className={styles.feature()}>
                      {included ? (
                        <CheckIcon className={styles.featureIcon()} />
                      ) : (
                        <MinusIcon className={styles.featureIcon()} />
                      )}
                      <span className={visuallyHidden}>
                        {included ? "Included: " : "Not included: "}
                      </span>
                      <span>{feature}</span>
                    </li>
                  );
                })}
              </ul>
              {plan.action ? <div className={styles.action()}>{plan.action}</div> : null}
              {plan.footnote ? <p className={styles.footnote()}>{plan.footnote}</p> : null}
            </li>
          );
        })}
      </ul>
    </Section>
  );
}
