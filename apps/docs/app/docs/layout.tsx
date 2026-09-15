import type { ReactNode } from "react";
import { DocsSidebar } from "@/components/docs-sidebar";
import { categories, getComponents } from "@/lib/components";
import { docsNav } from "@/lib/site";

export default function DocsLayout({ children }: { children: ReactNode }) {
  const components = getComponents();
  const sections = [
    ...docsNav.map((section) => ({ title: section.title, items: [...section.items] })),
    ...categories
      .map((category) => ({
        title: category.title,
        items: components
          .filter((c) => c.category === category.id)
          .map((c) => ({ title: c.title, href: `/docs/components/${c.name}` })),
      }))
      .filter((section) => section.items.length > 0),
  ];

  return (
    <div className="mx-auto grid w-full max-w-7xl flex-1 gap-10 px-4 sm:px-6 md:grid-cols-[14rem_minmax(0,1fr)]">
      <aside className="hidden md:block">
        <div className="sticky top-16 max-h-[calc(100dvh-4rem)] overflow-y-auto py-10 pr-2">
          <DocsSidebar sections={sections} />
        </div>
      </aside>
      <main className="min-w-0 py-10 pb-24">{children}</main>
    </div>
  );
}
