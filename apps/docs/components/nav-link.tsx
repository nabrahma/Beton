"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

export function NavLink({
  href,
  match,
  children,
}: {
  href: string;
  match: string;
  children: ReactNode;
}) {
  const pathname = usePathname();
  const active =
    match === "/docs"
      ? pathname.startsWith("/docs") &&
        !pathname.startsWith("/docs/components") &&
        !pathname.startsWith("/docs/accessibility")
      : pathname.startsWith(match);

  return (
    <Link
      href={href}
      aria-current={active ? "page" : undefined}
      className="border-3 border-transparent px-3 py-1.5 font-display text-sm font-extrabold tracking-wide uppercase hover:border-border aria-[current=page]:border-border aria-[current=page]:bg-secondary"
    >
      {children}
    </Link>
  );
}
