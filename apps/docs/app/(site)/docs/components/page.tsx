import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/page-header";
import { categories, getComponents } from "@/lib/components";

export const metadata: Metadata = {
  title: "Components",
  description: "Every Béton component, grouped by category.",
};

const accents = ["bg-primary", "bg-secondary", "bg-success", "bg-danger", "bg-raised"];

export default function ComponentsIndex() {
  const components = getComponents();
  return (
    <>
      <PageHeader
        eyebrow={`${components.length} components`}
        title="Components"
        description="Readable source you own. Every component ships with axe, keyboard and accessible-name tests."
      />
      <div className="flex flex-col gap-14">
        {categories
          .filter((category) => category.id !== "marketing")
          .map((category) => {
            const items = components.filter((c) => c.category === category.id);
            return (
              <section key={category.id} aria-labelledby={`category-${category.id}`}>
                <div className="mb-5 flex flex-wrap items-baseline justify-between gap-2">
                  <h2 id={`category-${category.id}`} className="font-display text-3xl font-black">
                    {category.title}
                  </h2>
                  <p className="text-sm">{category.blurb}</p>
                </div>
                {items.length ? (
                  <ul className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                    {items.map((c, i) => (
                      <li key={c.name}>
                        <Link
                          href={`/docs/components/${c.name}`}
                          className="group flex h-full flex-col border-3 border-border bg-raised shadow-sm transition-[translate,box-shadow] duration-70 ease-linear active:translate-x-1 active:translate-y-1 active:shadow-none"
                        >
                          <span
                            aria-hidden="true"
                            className={`flex h-20 items-end border-b-3 border-border p-3 font-display text-3xl font-black uppercase ${accents[i % accents.length]}`}
                          >
                            {c.title.slice(0, 2)}
                          </span>
                          <span className="flex flex-1 flex-col gap-1 p-4">
                            <span className="font-display text-lg font-extrabold group-hover:underline">
                              {c.title}
                            </span>
                            <span className="text-sm">{c.description}</span>
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="border-3 border-dashed border-border p-5 font-display font-bold">
                    Coming soon. Follow progress on{" "}
                    <a href="https://github.com/nabrahma/Beton" className="underline">
                      GitHub
                    </a>
                    .
                  </p>
                )}
              </section>
            );
          })}
      </div>
    </>
  );
}
