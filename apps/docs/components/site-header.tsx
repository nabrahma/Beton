import { button } from "@beton-ui/recipes";
import Link from "next/link";
import { GitHubIcon } from "@/components/icons";
import { Logo } from "@/components/logo";
import { MobileNav } from "@/components/mobile-nav";
import { NavLink } from "@/components/nav-link";
import { getComponents } from "@/lib/components";
import { site } from "@/lib/site";

const links = [
  { href: "/docs/introduction", label: "Docs", match: "/docs" },
  { href: "/docs/components", label: "Components", match: "/docs/components" },
  { href: "/docs/accessibility", label: "Accessibility", match: "/docs/accessibility" },
  { href: "/showcase", label: "Showcase", match: "/showcase" },
];

export function SiteHeader() {
  const components = getComponents().map(({ name, title }) => ({ name, title }));
  return (
    <header className="sticky top-0 z-40 border-b-3 border-border bg-raised">
      <div className="mx-auto flex h-16 max-w-7xl items-center gap-6 px-4 sm:px-6">
        <Link href="/" aria-label="Béton home" className="shrink-0">
          <Logo />
        </Link>
        <nav aria-label="Main" className="hidden flex-1 items-center gap-1 md:flex">
          {links.map((link) => (
            <NavLink key={link.href} href={link.href} match={link.match}>
              {link.label}
            </NavLink>
          ))}
        </nav>
        <div className="ml-auto flex items-center gap-3">
          <a
            href={site.github}
            className={button({
              variant: "secondary",
              size: "sm",
              class: "hidden gap-2 sm:inline-flex",
            })}
          >
            <GitHubIcon className="size-4" />
            GitHub
          </a>
          <MobileNav links={links} components={components} />
        </div>
      </div>
    </header>
  );
}
