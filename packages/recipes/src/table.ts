import { focusRing } from "./shared.ts";
import { tv, type VariantProps } from "./tv.ts";

export const table = tv({
  slots: {
    root: "w-full overflow-hidden border-3 border-border bg-raised",
    scroller: "w-full overflow-x-auto",
    table: "w-full border-collapse text-left",
    caption:
      "border-b-3 border-border bg-surface px-4 py-3 text-left font-mono text-xs font-bold tracking-widest uppercase",
    head: "border-b-3 border-border bg-secondary",
    headerCell: "font-display font-extrabold tracking-wide text-foreground uppercase",
    sortButton: [
      "group flex w-full items-center gap-2 text-left font-display font-extrabold tracking-wide uppercase",
      "cursor-pointer hover:underline",
      focusRing,
    ],
    sortIcon: "size-4 shrink-0",
    body: "",
    row: "border-b-3 border-border last:border-b-0 data-selected:bg-secondary",
    cell: "align-middle text-foreground",
    footer: "border-t-3 border-border bg-surface",
    actions: "flex items-center justify-end gap-2",
    empty: "px-4 py-12 text-center",
  },
  variants: {
    size: {
      sm: { headerCell: "px-3 py-2 text-xs", cell: "px-3 py-2 text-sm", sortButton: "text-xs" },
      md: { headerCell: "px-4 py-3 text-sm", cell: "px-4 py-3 text-base", sortButton: "text-sm" },
      lg: { headerCell: "px-5 py-4 text-base", cell: "px-5 py-4 text-lg", sortButton: "text-base" },
    },
    striped: {
      true: { row: "even:bg-surface" },
    },
    hoverable: {
      true: { row: "hover:bg-surface" },
    },
  },
  defaultVariants: {
    size: "md",
    striped: false,
    hoverable: false,
  },
});

export type TableVariants = VariantProps<typeof table>;
