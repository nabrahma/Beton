import { breadcrumbs, type BreadcrumbsVariants } from "@beton-ui/recipes";
import {
  Children,
  cloneElement,
  isValidElement,
  type ComponentProps,
  type ReactElement,
  type ReactNode,
} from "react";
import { renderElement, type RenderProp } from "../utils/render-element.ts";

export interface BreadcrumbsProps
  extends Omit<ComponentProps<"nav">, "children">, BreadcrumbsVariants {
  children?: ReactNode;
  /** Drawn between items and hidden from screen readers. Defaults to a slash. */
  separator?: ReactNode;
  /** Classes for the inner list. */
  listClassName?: string;
}

function BreadcrumbsRoot({
  size = "md",
  separator = "/",
  className,
  listClassName,
  children,
  "aria-label": ariaLabel = "Breadcrumb",
  ...props
}: BreadcrumbsProps) {
  const styles = breadcrumbs({ size });
  const items = Children.toArray(children).filter(isValidElement);
  return (
    <nav {...props} aria-label={ariaLabel} className={styles.root({ class: className })}>
      <ol className={styles.list({ class: listClassName })}>
        {items.map((item, index) =>
          cloneElement(item as ReactElement<BreadcrumbsItemProps>, {
            size,
            separator: index > 0 ? separator : null,
          }),
        )}
      </ol>
    </nav>
  );
}

export interface BreadcrumbsItemProps extends ComponentProps<"li">, BreadcrumbsVariants {
  /** Where the crumb leads. Leave it off for the page you are on. */
  href?: string;
  /** Marks the page you are on. It is announced and is not a link. */
  current?: boolean;
  render?: RenderProp;
  /** Set by Breadcrumbs. */
  separator?: ReactNode;
}

function BreadcrumbsItem({
  size = "md",
  href,
  current = false,
  separator,
  className,
  children,
  render,
  ...props
}: BreadcrumbsItemProps) {
  const styles = breadcrumbs({ size });
  const label = current
    ? renderElement(
        "span",
        { "aria-current": "page", className: styles.current(), children },
        render,
      )
    : renderElement("a", { href, className: styles.link(), children }, render);
  return (
    <li {...props} className={styles.item({ class: className })}>
      {separator == null ? null : (
        <span aria-hidden="true" className={styles.separator()}>
          {separator}
        </span>
      )}
      {label}
    </li>
  );
}

/** The trail of pages above the one you are on. */
export const Breadcrumbs = Object.assign(BreadcrumbsRoot, {
  Item: BreadcrumbsItem,
});
