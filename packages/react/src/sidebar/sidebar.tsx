"use client";

import { sidebar, type SidebarVariants } from "@beton-ui/recipes";
import { createContext, useContext, type ComponentProps, type ReactNode } from "react";
import { renderElement, type RenderProp } from "../utils/render-element.ts";

interface SidebarState {
  styles: ReturnType<typeof sidebar>;
  size: NonNullable<SidebarVariants["size"]>;
}

const SidebarContext = createContext<SidebarState>({ styles: sidebar(), size: "md" });

function useStyles() {
  return useContext(SidebarContext).styles;
}

export interface SidebarProps extends ComponentProps<"nav">, SidebarVariants {
  render?: RenderProp;
}

function SidebarRoot({
  size = "md",
  bordered = true,
  className,
  "aria-label": ariaLabel = "Sidebar",
  render,
  ...props
}: SidebarProps) {
  const styles = sidebar({ size, bordered });
  return (
    <SidebarContext.Provider value={{ styles, size }}>
      {renderElement(
        "nav",
        { ...props, "aria-label": ariaLabel, className: styles.root({ class: className }) },
        render,
      )}
    </SidebarContext.Provider>
  );
}

export interface SidebarSectionProps extends Omit<ComponentProps<"div">, "title"> {
  /** A heading above the group of links. */
  title?: ReactNode;
  render?: RenderProp;
}

function SidebarSection({ className, title, children, render, ...props }: SidebarSectionProps) {
  const styles = useStyles();
  return renderElement(
    "div",
    {
      ...props,
      className: styles.section({ class: className }),
      children: (
        <>
          {title ? <p className={styles.sectionLabel()}>{title}</p> : null}
          <ul className={styles.list()}>{children}</ul>
        </>
      ),
    },
    render,
  );
}

export interface SidebarItemProps extends ComponentProps<"a"> {
  /** Marks the page you are on. Sets `aria-current="page"`. */
  active?: boolean;
  /** Shown before the label. */
  icon?: ReactNode;
  /** Shown at the end of the row, such as a count. */
  badge?: ReactNode;
  /** Classes for the surrounding list item. */
  itemClassName?: string;
  render?: RenderProp;
}

function SidebarItem({
  className,
  itemClassName,
  active = false,
  icon,
  badge,
  children,
  render,
  ...props
}: SidebarItemProps) {
  const { styles, size } = useContext(SidebarContext);
  return (
    <li className={styles.item({ class: itemClassName })}>
      {renderElement(
        "a",
        {
          ...props,
          "aria-current": active ? "page" : undefined,
          "data-size": size,
          className: styles.link({ class: className }),
          children: (
            <>
              {icon ? <span className={styles.icon()}>{icon}</span> : null}
              {children}
              {badge ? <span className={styles.badge()}>{badge}</span> : null}
            </>
          ),
        },
        render,
      )}
    </li>
  );
}

/** The column of links down the side of an application. */
export const Sidebar = Object.assign(SidebarRoot, {
  Section: SidebarSection,
  Item: SidebarItem,
});
