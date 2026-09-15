import Link from "next/link";
import { LogoMark } from "@/components/logo";
import { site } from "@/lib/site";

const columns = [
  {
    title: "Docs",
    links: [
      { href: "/docs/introduction", label: "Introduction" },
      { href: "/docs/installation", label: "Installation" },
      { href: "/docs/cli", label: "CLI" },
      { href: "/docs/theming", label: "Theming" },
    ],
  },
  {
    title: "Library",
    links: [
      { href: "/docs/components", label: "Components" },
      { href: "/docs/accessibility", label: "Accessibility" },
      { href: "/docs/agents", label: "Coding agents" },
      { href: "/changelog", label: "Changelog" },
    ],
  },
  {
    title: "Project",
    links: [
      { href: site.github, label: "GitHub" },
      { href: `${site.github}/blob/main/CONTRIBUTING.md`, label: "Contributing" },
      { href: `${site.github}/blob/main/LICENSE`, label: "License" },
      { href: "/showcase", label: "Showcase" },
    ],
  },
];

export function SiteFooter() {
  return (
    <footer className="border-t-3 border-border bg-ink text-paper">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-[1.5fr_repeat(3,1fr)]">
        <div className="flex flex-col gap-4">
          <span className="flex items-center gap-3">
            <LogoMark className="size-10" />
            <span className="font-display text-3xl font-black uppercase font-stretch-wide">
              Béton
            </span>
          </span>
          <p className="max-w-xs text-paper">
            Neobrutalist components for React. Loud on the surface, WCAG AA underneath.
          </p>
        </div>
        {columns.map((column) => (
          <nav key={column.title} aria-label={column.title}>
            <p className="mb-3 font-mono text-xs font-bold tracking-widest text-secondary uppercase">
              {column.title}
            </p>
            <ul className="flex flex-col gap-2">
              {column.links.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="font-medium text-paper hover:underline">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>
      <div className="border-t-2 border-paper/30">
        <p className="mx-auto max-w-7xl px-4 py-5 font-mono text-xs text-paper sm:px-6">
          MIT with Commons Clause. Built by{" "}
          <a href={site.authorUrl} className="underline">
            {site.author}
          </a>
          .
        </p>
      </div>
    </footer>
  );
}
