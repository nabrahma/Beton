import { tv, type VariantProps } from "./tv.ts";

export const tooltip = tv({
  slots: {
    positioner: "z-50 outline-none",
    popup:
      "max-w-64 border-2 border-border bg-ink px-2.5 py-1.5 font-mono text-xs font-bold text-paper",
  },
});

export type TooltipVariants = VariantProps<typeof tooltip>;
