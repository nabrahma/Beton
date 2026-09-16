"use client";

import { navbar } from "@beton-ui/recipes";
import type { ReactNode } from "react";
import { Navbar, type NavbarProps } from "../navbar/navbar.tsx";
import { Sheet } from "../sheet/sheet.tsx";
import { Sidebar } from "../sidebar/sidebar.tsx";
import { Button } from "../button/button.tsx";

export interface HeaderLink {
  label: ReactNode;
  href: string;
  /** Marks the page you are on. */
  active?: boolean;
}

export interface SiteHeaderProps extends Omit<NavbarProps, "children"> {
  /** The name of the site. */
  mark: ReactNode;
  /** Where the mark leads. */
  markHref?: string;
  /** The main links. */
  links?: HeaderLink[];
  /** Buttons at the end of the bar. */
  actions?: ReactNode;
  /** Offer the links in a sheet below the md breakpoint. On by default. */
  mobileMenu?: boolean;
  /** What the button that opens the sheet says. */
  menuLabel?: string;
}

/**
 * The bar across the top of a marketing site: a mark, the main links, a couple
 * of actions, and the same links in a sheet on small screens.
 */
export function SiteHeader({
  mark,
  markHref = "/",
  links = [],
  actions,
  mobileMenu = true,
  menuLabel = "Menu",
  ...props
}: SiteHeaderProps) {
  const styles = navbar({ size: props.size });
  return (
    <Navbar {...props}>
      <Navbar.Brand href={markHref}>{mark}</Navbar.Brand>
      <Navbar.Nav>
        {links.map((link) => (
          <Navbar.Link key={link.href} href={link.href} active={link.active}>
            {link.label}
          </Navbar.Link>
        ))}
      </Navbar.Nav>
      <Navbar.Actions>
        {mobileMenu && links.length ? (
          <Sheet side="left">
            <Sheet.Trigger
              render={
                <Button variant="secondary" size="sm" className={styles.menuButton()}>
                  {menuLabel}
                </Button>
              }
            />
            <Sheet.Content>
              <Sheet.Title>{menuLabel}</Sheet.Title>
              <Sidebar aria-label={menuLabel} bordered={false}>
                <Sidebar.Section>
                  {links.map((link) => (
                    <Sidebar.Item key={link.href} href={link.href} active={link.active}>
                      {link.label}
                    </Sidebar.Item>
                  ))}
                </Sidebar.Section>
              </Sidebar>
            </Sheet.Content>
          </Sheet>
        ) : null}
        {actions}
      </Navbar.Actions>
    </Navbar>
  );
}
