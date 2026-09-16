"use client";

import { list, type ListVariants } from "@beton-ui/recipes";
import { createContext, useContext, type ComponentProps, type ReactNode } from "react";
import { renderElement, type RenderProp } from "../utils/render-element.ts";

interface ListState {
  styles: ReturnType<typeof list>;
  size: NonNullable<ListVariants["size"]>;
}

const ListContext = createContext<ListState>({ styles: list(), size: "md" });

export interface ListProps extends ComponentProps<"ul">, ListVariants {
  render?: RenderProp;
}

function ListRoot({ size = "md", className, render, ...props }: ListProps) {
  const styles = list({ size });
  return (
    <ListContext.Provider value={{ styles, size }}>
      {renderElement("ul", { ...props, className: styles.root({ class: className }) }, render)}
    </ListContext.Provider>
  );
}

export interface ListItemProps extends Omit<ComponentProps<"li">, "title"> {
  /** The line that names the item. */
  title?: ReactNode;
  /** A second line under the title. */
  description?: ReactNode;
  /** Shown before the text: an avatar, an icon, a thumbnail. */
  media?: ReactNode;
  /** Shown after the text, such as a timestamp. */
  meta?: ReactNode;
  /** Buttons at the end of the row. */
  actions?: ReactNode;
  /** Turns the whole row into a link. Actions inside stay separately reachable. */
  href?: string;
  /** Marks the row as the one being shown, on screen and to screen readers. */
  selected?: boolean;
  render?: RenderProp;
}

function ListItem({
  className,
  title,
  description,
  media,
  meta,
  actions,
  href,
  selected,
  children,
  render,
  ...props
}: ListItemProps) {
  const { styles, size } = useContext(ListContext);
  const body = (
    <>
      {media ? <span className={styles.media()}>{media}</span> : null}
      <span className={styles.content()}>
        {title ? <span className={styles.title()}>{title}</span> : null}
        {description ? <span className={styles.description()}>{description}</span> : null}
        {children}
      </span>
      {meta ? <span className={styles.meta()}>{meta}</span> : null}
    </>
  );

  return (
    <li
      {...props}
      // aria-selected belongs to listboxes and grids, not to a plain list, so
      // the row says it is the current one instead.
      aria-current={selected ? "true" : undefined}
      data-selected={selected ? "" : undefined}
      className={styles.item({ class: className })}
    >
      {href || render ? (
        renderElement(
          "a",
          {
            href,
            "data-size": size,
            className: styles.interactive({ class: styles.row() }),
            children: body,
          },
          render,
        )
      ) : (
        <div className={styles.row()}>{body}</div>
      )}
      {actions ? <span className={styles.actions()}>{actions}</span> : null}
    </li>
  );
}

/** A vertical list of records: avatars, titles, meta and row actions. */
export const List = Object.assign(ListRoot, { Item: ListItem });
