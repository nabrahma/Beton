import { focusRing } from "./shared.ts";
import { tv, type VariantProps } from "./tv.ts";

export const list = tv({
  slots: {
    root: "flex w-full flex-col border-3 border-border bg-raised",
    item: [
      "flex items-stretch border-b-3 border-border last:border-b-0",
      "data-selected:bg-secondary",
    ],
    row: "flex min-w-0 flex-1 items-center gap-4",
    interactive: ["cursor-pointer text-left hover:bg-surface", focusRing],
    media: "flex shrink-0 items-center justify-center",
    content: "flex min-w-0 flex-1 flex-col gap-0.5",
    title: "font-display font-extrabold text-foreground",
    description: "truncate text-foreground",
    meta: "shrink-0 font-mono text-xs font-bold",
    actions: "flex shrink-0 items-center gap-2 self-center",
  },
  variants: {
    size: {
      sm: {
        row: "min-h-14 px-3 py-2",
        actions: "pr-3",
        title: "text-sm",
        description: "text-xs",
      },
      md: {
        row: "min-h-16 px-4 py-3",
        actions: "pr-4",
        title: "text-base",
        description: "text-sm",
      },
      lg: {
        row: "min-h-20 px-5 py-4",
        actions: "pr-5",
        title: "text-lg",
        description: "text-base",
      },
    },
  },
  defaultVariants: {
    size: "md",
  },
});

export type ListVariants = VariantProps<typeof list>;
