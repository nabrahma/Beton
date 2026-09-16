"use client";

import { Button, Navbar, type NavbarProps } from "@beton-ui/react";

export default function NavbarPlayground(props: NavbarProps) {
  return (
    <Navbar {...props} className="w-full">
      <Navbar.Brand href="#">Béton</Navbar.Brand>
      <Navbar.Nav>
        <Navbar.Link href="#" active>
          Docs
        </Navbar.Link>
        <Navbar.Link href="#">Components</Navbar.Link>
        <Navbar.Link href="#">Showcase</Navbar.Link>
      </Navbar.Nav>
      <Navbar.Actions>
        <Button size="sm">Get started</Button>
      </Navbar.Actions>
    </Navbar>
  );
}
