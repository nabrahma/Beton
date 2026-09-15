import { tv, type VariantProps } from "./tv.ts";

export const kbd = tv({
  base: [
    "inline-flex shrink-0 items-center justify-center whitespace-nowrap",
    "border-2 border-b-4 border-border bg-raised font-mono font-bold text-foreground",
  ],
  variants: {
    size: {
      sm: "h-5 min-w-5 px-1 text-[0.6875rem]",
      md: "h-6 min-w-6 px-1.5 text-xs",
      lg: "h-8 min-w-8 px-2 text-sm",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

export type KbdVariants = VariantProps<typeof kbd>;
