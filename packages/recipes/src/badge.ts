import { focusRing } from "./shared.ts";
import { tv, type VariantProps } from "./tv.ts";

// Classes prefixed with [&:is(a,button)] apply only when a badge is rendered as a
// link or button. They are written out in full so Tailwind's scanner finds them.
export const badge = tv({
  base: [
    "inline-flex w-fit shrink-0 items-center gap-1 whitespace-nowrap",
    "border-2 border-border font-mono font-bold uppercase text-foreground",
    "[&:is(a,button)]:relative [&:is(a,button)]:min-w-11 [&:is(a,button)]:justify-center [&:is(a,button)]:hover:underline",
    "[&:is(a,button)]:after:absolute [&:is(a,button)]:after:inset-x-0 [&:is(a,button)]:after:content-['']",
    focusRing,
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
      // Hit-area extensions bring each interactive size to 44px tall.
      sm: "h-5 px-1.5 text-[0.6875rem] [&:is(a,button)]:after:-inset-y-3",
      md: "h-6 px-2 text-xs [&:is(a,button)]:after:-inset-y-2.5",
      lg: "h-8 px-3 text-sm [&:is(a,button)]:after:-inset-y-1.5",
    },
  },
  defaultVariants: {
    variant: "primary",
    size: "md",
  },
});

export type BadgeVariants = VariantProps<typeof badge>;
