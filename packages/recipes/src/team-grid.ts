import { tv, type VariantProps } from "./tv.ts";

export const teamGrid = tv({
  slots: {
    list: "grid gap-6",
    item: "flex h-full flex-col gap-3 border-3 border-border bg-raised p-5 shadow-sm",
    portrait: "flex items-center gap-4",
    name: "font-display text-h4 font-extrabold text-foreground",
    role: "font-mono text-xs font-bold tracking-widest uppercase",
    bio: "text-pretty text-sm text-foreground",
    links: "mt-auto flex flex-wrap items-center gap-3 pt-2",
  },
  variants: {
    columns: {
      2: { list: "sm:grid-cols-2" },
      3: { list: "sm:grid-cols-2 lg:grid-cols-3" },
      4: { list: "sm:grid-cols-2 lg:grid-cols-4" },
    },
  },
  defaultVariants: {
    columns: 3,
  },
});

export type TeamGridVariants = VariantProps<typeof teamGrid>;
