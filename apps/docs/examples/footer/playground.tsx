"use client";

import { Footer, type FooterProps } from "@beton-ui/react";

const columns = [
  {
    title: "Docs",
    links: [
      { label: "Installation", href: "#" },
      { label: "Theming", href: "#" },
      { label: "Accessibility", href: "#" },
    ],
  },
  {
    title: "Library",
    links: [
      { label: "Components", href: "#" },
      { label: "Blocks", href: "#" },
      { label: "Changelog", href: "#" },
    ],
  },
  {
    title: "Project",
    links: [
      { label: "GitHub", href: "#" },
      { label: "Licence", href: "#" },
    ],
  },
];

export default function FooterPlayground(props: FooterProps) {
  return (
    <Footer
      {...props}
      mark="Béton"
      blurb="Components that look like they were poured, not designed."
      columns={columns}
      note="MIT with Commons Clause"
    />
  );
}
