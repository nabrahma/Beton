import { focusRing } from "./shared.ts";
import { tv, type VariantProps } from "./tv.ts";

export const menubar = tv({
  slots: {
    root: "flex w-fit items-center gap-1 border-3 border-border bg-raised p-1 shadow-sm",
    trigger: [
      "flex min-h-11 cursor-pointer select-none items-center gap-2 border-3 border-transparent px-3",
      "font-display font-extrabold uppercase tracking-wide text-foreground",
      "hover:border-border data-popup-open:border-border data-popup-open:bg-secondary",
      "data-disabled:cursor-not-allowed data-disabled:text-disabled-foreground",
      focusRing,
    ],
  },
  variants: {
    size: {
      sm: { trigger: "text-xs" },
      md: { trigger: "text-sm" },
      lg: { trigger: "min-h-12 text-base" },
    },
  },
  defaultVariants: {
    size: "md",
  },
});

export type MenubarVariants = VariantProps<typeof menubar>;
