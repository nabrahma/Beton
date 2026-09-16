import { tv, type VariantProps } from "./tv.ts";

export const changelogEntry = tv({
  slots: {
    root: "flex flex-col gap-4 border-b-3 border-border py-8 first:pt-0 last:border-b-0 lg:flex-row lg:gap-10",
    aside: "flex shrink-0 flex-row items-center gap-3 lg:w-44 lg:flex-col lg:items-start",
    version:
      "w-fit border-3 border-border bg-secondary px-2 py-0.5 font-mono text-sm font-bold tabular-nums",
    date: "font-mono text-xs font-bold tracking-widest uppercase",
    body: "flex min-w-0 flex-1 flex-col gap-4",
    title: "font-display text-h3 font-black tracking-tight text-foreground",
    changes: "flex flex-col gap-2",
    change: "flex items-start gap-3",
    kind: "mt-0.5 w-20 shrink-0 border-2 border-border px-1.5 py-0.5 text-center font-mono text-xs font-bold tracking-widest uppercase",
  },
  variants: {
    kind: {
      added: { kind: "bg-success" },
      changed: { kind: "bg-secondary" },
      fixed: { kind: "bg-primary" },
      removed: { kind: "bg-danger" },
    },
  },
  defaultVariants: {
    kind: "added",
  },
});

export type ChangelogEntryVariants = VariantProps<typeof changelogEntry>;
