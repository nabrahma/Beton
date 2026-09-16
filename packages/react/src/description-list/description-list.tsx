import { descriptionList, type DescriptionListVariants } from "@beton-ui/recipes";
import type { ComponentProps, ReactNode } from "react";
import { renderElement, type RenderProp } from "../utils/render-element.ts";

export interface DescriptionListProps extends ComponentProps<"dl">, DescriptionListVariants {
  render?: RenderProp;
}

function DescriptionListRoot({
  layout = "stacked",
  size = "md",
  className,
  render,
  ...props
}: DescriptionListProps) {
  const styles = descriptionList({ layout, size });
  return renderElement(
    "dl",
    { ...props, "data-layout": layout, className: styles.root({ class: className }) },
    render,
  );
}

export interface DescriptionListItemProps
  extends Omit<ComponentProps<"div">, "children">, DescriptionListVariants {
  /** The name of the field. */
  term: ReactNode;
  /** Its value. */
  children: ReactNode;
}

function DescriptionListItem({
  layout = "stacked",
  size = "md",
  term,
  children,
  className,
  ...props
}: DescriptionListItemProps) {
  const styles = descriptionList({ layout, size });
  return (
    <div {...props} className={styles.group({ class: className })}>
      <dt className={styles.term()}>{term}</dt>
      <dd className={styles.description()}>{children}</dd>
    </div>
  );
}

/** Pairs of terms and their values: metadata, receipts, specifications. */
export const DescriptionList = Object.assign(DescriptionListRoot, { Item: DescriptionListItem });
