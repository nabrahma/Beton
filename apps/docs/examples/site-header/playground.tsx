"use client";

import { Button, SiteHeader, type SiteHeaderProps } from "@beton-ui/react";

const links = [
  { label: "Docs", href: "#", active: true },
  { label: "Components", href: "#" },
  { label: "Blocks", href: "#" },
  { label: "Showcase", href: "#" },
];

export default function SiteHeaderPlayground(props: Partial<SiteHeaderProps>) {
  return (
    <SiteHeader
      {...props}
      mark="Béton"
      links={links}
      actions={<Button size="sm">Install</Button>}
      className="w-full"
    />
  );
}
