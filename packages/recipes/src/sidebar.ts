import { focusRing } from "./shared.ts";
import { tv, type VariantProps } from "./tv.ts";

export const sidebar = tv({
  slots: {
    root: "flex h-full w-full flex-col gap-6 border-border bg-raised p-4",
    section: "flex flex-col gap-1",
    sectionLabel: "px-2 pb-1 font-mono text-xs font-bold tracking-widest uppercase",
    list: "flex flex-col gap-0.5",
    item: "flex",
    link: [
      "flex min-h-11 w-full items-center gap-3 border-l-4 border-transparent px-3",
      "font-medium text-foreground",
      "hover:border-border hover:bg-surface",
      "aria-[current=page]:border-border aria-[current=page]:bg-secondary aria-[current=page]:font-bold",
      focusRing,
    ],
    icon: "size-5 shrink-0",
    badge: "ml-auto",
  },
  variants: {
    size: {
      sm: { root: "gap-4 p-3", link: "text-sm" },
      md: { root: "gap-6 p-4", link: "text-base" },
      lg: { root: "gap-8 p-5", link: "text-lg" },
    },
    bordered: {
      true: { root: "border-r-3" },
    },
  },
  defaultVariants: {
    size: "md",
    bordered: true,
  },
});

export type SidebarVariants = VariantProps<typeof sidebar>;
