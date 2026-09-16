import { focusRing } from "./shared.ts";
import { tv, type VariantProps } from "./tv.ts";

export const accordion = tv({
  slots: {
    root: "flex w-full flex-col border-3 border-border bg-raised",
    item: "border-b-3 border-border last:border-b-0",
    header: "flex",
    trigger: [
      "group flex w-full cursor-pointer items-center justify-between gap-4 text-left",
      "font-display font-extrabold text-foreground",
      "hover:bg-secondary data-panel-open:bg-secondary",
      "data-disabled:cursor-not-allowed data-disabled:bg-disabled data-disabled:text-disabled-foreground",
      focusRing,
    ],
    icon: [
      "size-5 shrink-0 transition-transform duration-70 ease-linear motion-reduce:transition-none",
      "group-data-panel-open:rotate-180",
    ],
    panel: [
      "h-(--accordion-panel-height) overflow-hidden border-t-3 border-border",
      "transition-[height] duration-100 ease-linear motion-reduce:transition-none",
      "data-starting-style:h-0 data-ending-style:h-0",
    ],
    content: "flex flex-col gap-3",
  },
  variants: {
    size: {
      sm: { trigger: "min-h-11 px-4 text-base", content: "px-4 py-3 text-sm" },
      md: { trigger: "min-h-14 px-5 text-lg", content: "px-5 py-4" },
      lg: { trigger: "min-h-16 px-6 text-xl", content: "px-6 py-5 text-lg" },
    },
  },
  defaultVariants: {
    size: "md",
  },
});

export type AccordionVariants = VariantProps<typeof accordion>;
