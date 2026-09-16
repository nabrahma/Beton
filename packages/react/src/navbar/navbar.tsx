"use client";

import { navbar, type NavbarVariants } from "@beton-ui/recipes";
import { createContext, useContext, type ComponentProps } from "react";
import { renderElement, type RenderProp } from "../utils/render-element.ts";

type Styles = ReturnType<typeof navbar>;

const NavbarContext = createContext<Styles>(navbar());

function useStyles() {
  return useContext(NavbarContext);
}

export interface NavbarProps extends ComponentProps<"header">, NavbarVariants {
  /** Classes for the centred row inside the bar. */
  innerClassName?: string;
  render?: RenderProp;
}

function NavbarRoot({
  size = "md",
  sticky = false,
  className,
  innerClassName,
  children,
  render,
  ...props
}: NavbarProps) {
  const styles = navbar({ size, sticky });
  return (
    <NavbarContext.Provider value={styles}>
      {renderElement(
        "header",
        {
          ...props,
          className: styles.root({ class: className }),
          children: <div className={styles.inner({ class: innerClassName })}>{children}</div>,
        },
        render,
      )}
    </NavbarContext.Provider>
  );
}

export interface NavbarBrandProps extends ComponentProps<"a"> {
  render?: RenderProp;
}

function NavbarBrand({ className, href = "/", render, ...props }: NavbarBrandProps) {
  return renderElement(
    "a",
    { ...props, href, className: useStyles().brand({ class: className }) },
    render,
  );
}

export interface NavbarNavProps extends ComponentProps<"nav"> {
  render?: RenderProp;
}

function NavbarNav({
  className,
  "aria-label": ariaLabel = "Main",
  render,
  ...props
}: NavbarNavProps) {
  return renderElement(
    "nav",
    { ...props, "aria-label": ariaLabel, className: useStyles().nav({ class: className }) },
    render,
  );
}

export interface NavbarLinkProps extends ComponentProps<"a"> {
  /** Marks the page you are on. Sets `aria-current="page"`. */
  active?: boolean;
  render?: RenderProp;
}

function NavbarLink({ className, active = false, render, ...props }: NavbarLinkProps) {
  return renderElement(
    "a",
    {
      ...props,
      "aria-current": active ? "page" : undefined,
      className: useStyles().link({ class: className }),
    },
    render,
  );
}

export interface NavbarActionsProps extends ComponentProps<"div"> {
  render?: RenderProp;
}

function NavbarActions({ className, render, ...props }: NavbarActionsProps) {
  return renderElement(
    "div",
    { ...props, className: useStyles().actions({ class: className }) },
    render,
  );
}

/** The bar across the top of a page: a mark, the main links and a few actions. */
export const Navbar = Object.assign(NavbarRoot, {
  Brand: NavbarBrand,
  Nav: NavbarNav,
  Link: NavbarLink,
  Actions: NavbarActions,
});
