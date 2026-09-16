import { button } from "@beton-ui/recipes";
import type { Metadata } from "next";
import { PageHeader } from "@/components/page-header";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Showcase",
  description: "Sites and apps built with Béton.",
};

export default function ShowcasePage() {
  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6">
      <PageHeader
        eyebrow="Showcase"
        title="Built with Béton"
        description="Real projects using Béton components. Yours could be the first slab."
      />
      <div className="grid gap-6 md:grid-cols-3">
        <div className="flex min-h-64 flex-col justify-between border-3 border-dashed border-border p-6 md:col-span-2">
          <p className="font-display text-3xl font-black">Your project here.</p>
          <p className="max-w-md text-lg">
            Shipped something with Béton? Open a pull request adding it to the showcase with a
            screenshot and a link.
          </p>
          <a
            href={`${site.github}/issues/new?title=Showcase:%20&labels=showcase`}
            className={button({ class: "w-fit" })}
          >
            Submit a project
          </a>
        </div>
        <div className="flex min-h-64 flex-col justify-between border-3 border-border bg-secondary p-6 shadow-lg">
          <p className="font-mono text-sm font-bold uppercase">This site</p>
          <p className="font-display text-2xl font-black">
            beton.dev is built with Béton, Next.js and Tailwind CSS.
          </p>
          <a
            href={`${site.github}/tree/main/apps/docs`}
            className="font-display font-extrabold underline decoration-3 underline-offset-4"
          >
            Read the source →
          </a>
        </div>
      </div>
    </main>
  );
}
