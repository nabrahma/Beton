import { focusRing } from "./shared.ts";
import { tv, type VariantProps } from "./tv.ts";

export const card = tv({
  slots: {
    root: "flex flex-col rounded-md border-3 border-border text-foreground",
    header: "flex flex-col gap-1.5 p-6 pb-0",
    title: "font-display text-2xl font-extrabold leading-tight tracking-tight",
    description: "text-base text-foreground",
    body: "flex flex-col gap-4 p-6",
    footer: "mt-auto flex flex-wrap items-center gap-3 border-t-3 border-border p-6",
  },
  variants: {
    variant: {
      primary: { root: "bg-primary" },
      secondary: { root: "bg-secondary" },
      ghost: { root: "bg-raised" },
      danger: { root: "bg-danger" },
    },
    elevation: {
      none: { root: "shadow-none" },
      sm: { root: "shadow-sm" },
      lg: { root: "shadow-lg" },
    },
    interactive: {
      true: {
        root: [
          "cursor-pointer transition-[translate,box-shadow] duration-70 ease-linear motion-reduce:transition-none",
          focusRing,
        ],
      },
    },
  },
  compoundVariants: [
    {
      interactive: true,
      elevation: "sm",
      class: { root: "active:translate-x-1 active:translate-y-1 active:shadow-none" },
    },
    {
      interactive: true,
      elevation: "lg",
      class: { root: "active:translate-x-3 active:translate-y-3 active:shadow-none" },
    },
  ],
  defaultVariants: {
    variant: "ghost",
    elevation: "sm",
    interactive: false,
  },
});

export type CardVariants = VariantProps<typeof card>;
