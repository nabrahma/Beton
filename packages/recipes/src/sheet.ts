import { backdrop } from "./shared.ts";
import { tv, type VariantProps } from "./tv.ts";

export const sheet = tv({
  slots: {
    backdrop,
    popup: "fixed z-50 flex flex-col border-border bg-raised text-foreground outline-none",
    header: "flex flex-col gap-2 border-b-3 border-border p-6 pr-16",
    title: "font-display text-2xl font-black leading-tight tracking-tight",
    description: "text-base",
    body: "flex flex-1 flex-col gap-4 overflow-y-auto p-6",
    footer: "flex flex-wrap items-center justify-end gap-3 border-t-3 border-border bg-surface p-6",
    close: "absolute top-4 right-4",
  },
  variants: {
    side: {
      right: { popup: "inset-y-0 right-0 h-dvh w-full border-l-5" },
      left: { popup: "inset-y-0 left-0 h-dvh w-full border-r-5" },
      top: { popup: "inset-x-0 top-0 max-h-[85dvh] border-b-5" },
      bottom: { popup: "inset-x-0 bottom-0 max-h-[85dvh] border-t-5" },
    },
    size: {
      sm: {},
      md: {},
      lg: {},
    },
    variant: {
      primary: { header: "bg-primary" },
      secondary: { header: "bg-secondary" },
      ghost: { header: "bg-raised" },
      danger: { header: "bg-danger" },
    },
  },
  compoundVariants: [
    { side: ["left", "right"], size: "sm", class: { popup: "max-w-xs" } },
    { side: ["left", "right"], size: "md", class: { popup: "max-w-md" } },
    { side: ["left", "right"], size: "lg", class: { popup: "max-w-2xl" } },
  ],
  defaultVariants: {
    side: "right",
    size: "md",
    variant: "ghost",
  },
});

export type SheetVariants = VariantProps<typeof sheet>;
