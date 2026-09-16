import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/page-header";
import { getBlocks } from "@/lib/components";

export const metadata: Metadata = {
  title: "Blocks",
  description: "Whole sections of a page, composed from Béton components.",
};

const accents = ["bg-primary", "bg-secondary", "bg-success", "bg-danger", "bg-raised"];

export default function BlocksIndex() {
  const blocks = getBlocks();
  return (
    <>
      <PageHeader
        eyebrow={`${blocks.length} blocks`}
        title="Blocks"
        description="Whole sections of a page: heroes, pricing, footers. Built from the same components, tested the same way, and yours to edit once installed."
      />
      <ul className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {blocks.map((block, index) => (
          <li key={block.name}>
            <Link
              href={`/docs/blocks/${block.name}`}
              className="group flex h-full flex-col border-3 border-border bg-raised shadow-sm transition-[translate,box-shadow] duration-70 ease-linear active:translate-x-1 active:translate-y-1 active:shadow-none"
            >
              <span
                aria-hidden="true"
                className={`flex h-20 items-end border-b-3 border-border p-3 font-display text-3xl font-black uppercase ${accents[index % accents.length]}`}
              >
                {block.title.slice(0, 2)}
              </span>
              <span className="flex flex-1 flex-col gap-1 p-4">
                <span className="font-display text-lg font-extrabold group-hover:underline">
                  {block.title}
                </span>
                <span className="text-sm">{block.description}</span>
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}
