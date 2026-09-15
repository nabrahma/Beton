export const site = {
  name: "Béton",
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? "https://beton.dev").replace(/\/$/, ""),
  title: "Béton: the complete neobrutalist toolkit for React",
  headline: "The complete neobrutalist toolkit for React.",
  description: "Components, blocks and templates. Loud on the surface, WCAG AA underneath.",
  github: "https://github.com/nabrahma/Beton",
  author: "Nabaskar Brahma",
  authorUrl: "https://github.com/nabrahma",
  registry: "https://beton.dev/r",
} as const;

export const docsNav = [
  {
    title: "Getting started",
    items: [
      { title: "Introduction", href: "/docs/introduction" },
      { title: "Installation", href: "/docs/installation" },
      { title: "CLI", href: "/docs/cli" },
      { title: "Theming", href: "/docs/theming" },
      { title: "Accessibility", href: "/docs/accessibility" },
      { title: "Coding agents", href: "/docs/agents" },
    ],
  },
] as const;
