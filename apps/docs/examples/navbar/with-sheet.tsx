/**
 * On small screens
 * The links are hidden below the md breakpoint. Put the same links in a Sheet
 * and open it from a button that only shows at small widths.
 */
"use client";

import { Button, Navbar, Sheet, Sidebar } from "@beton-ui/react";

export default function NavbarWithSheet() {
  return (
    <Navbar className="w-full">
      <Navbar.Brand href="#">Béton</Navbar.Brand>
      <Navbar.Nav>
        <Navbar.Link href="#" active>
          Docs
        </Navbar.Link>
        <Navbar.Link href="#">Components</Navbar.Link>
      </Navbar.Nav>
      <Navbar.Actions>
        <Sheet side="left">
          <Sheet.Trigger
            render={
              <Button variant="secondary" size="sm" className="md:hidden">
                Menu
              </Button>
            }
          />
          <Sheet.Content>
            <Sheet.Title>Navigation</Sheet.Title>
            <Sidebar aria-label="Mobile" bordered={false}>
              <Sidebar.Section>
                <Sidebar.Item href="#" active>
                  Docs
                </Sidebar.Item>
                <Sidebar.Item href="#">Components</Sidebar.Item>
              </Sidebar.Section>
            </Sidebar>
          </Sheet.Content>
        </Sheet>
        <Button size="sm">Get started</Button>
      </Navbar.Actions>
    </Navbar>
  );
}
