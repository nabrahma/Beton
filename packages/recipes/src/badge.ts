import { tv, type VariantProps } from "./tv.ts";

export const badge = tv({
  base: [
    "inline-flex w-fit shrink-0 items-center gap-1 whitespace-nowrap",
    "border-2 border-border font-mono font-bold uppercase text-foreground",
  ],
  variants: {
    variant: {
      primary: "bg-primary",
      secondary: "bg-secondary",
      ghost: "bg-raised",
      danger: "bg-danger",
      success: "bg-success",
    },
    size: {
      sm: "h-5 px-1.5 text-[0.6875rem]",
      md: "h-6 px-2 text-xs",
      lg: "h-8 px-3 text-sm",
    },
  },
  defaultVariants: {
    variant: "primary",
    size: "md",
  },
});

export type BadgeVariants = VariantProps<typeof badge>;
