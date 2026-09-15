"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface Section {
  title: string;
  items: { title: string; href: string; badge?: string }[];
}

export function DocsSidebar({ sections }: { sections: Section[] }) {
  const pathname = usePathname();
  return (
    <nav aria-label="Documentation" className="flex flex-col gap-8">
      {sections.map((section) => (
        <div key={section.title}>
          <p className="mb-2 font-mono text-xs font-bold tracking-widest uppercase">
            {section.title}
          </p>
          <ul className="flex flex-col">
            {section.items.map((item) => {
              const active = pathname === item.href;
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className="-ml-3 flex min-h-9 items-center justify-between gap-2 border-l-4 border-transparent py-1 pr-2 pl-3 font-medium hover:border-border aria-[current=page]:border-border aria-[current=page]:bg-secondary aria-[current=page]:font-bold"
                  >
                    {item.title}
                    {item.badge ? (
                      <span className="border-2 border-border bg-raised px-1 font-mono text-[0.625rem] font-bold uppercase">
                        {item.badge}
                      </span>
                    ) : null}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </nav>
  );
}
