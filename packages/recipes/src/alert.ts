import { tv, type VariantProps } from "./tv.ts";

export const alert = tv({
  slots: {
    root: "flex w-full items-start gap-3 border-3 border-border shadow-sm",
    icon: "shrink-0",
    content: "flex min-w-0 flex-1 flex-col gap-1",
    title: "font-display font-extrabold tracking-wide uppercase text-foreground",
    description: "text-foreground",
    actions: "flex flex-wrap items-center gap-3 pt-1",
    close: "-mt-1 -mr-1 shrink-0",
  },
  variants: {
    variant: {
      info: { root: "bg-raised" },
      success: { root: "bg-success/20" },
      warning: { root: "bg-secondary/40" },
      danger: { root: "bg-danger/15" },
    },
    size: {
      sm: { root: "p-3", title: "text-sm", description: "text-sm", icon: "size-5" },
      md: { root: "p-4", title: "text-base", description: "text-base", icon: "size-6" },
      lg: { root: "p-5", title: "text-lg", description: "text-lg", icon: "size-7" },
    },
  },
  defaultVariants: {
    variant: "info",
    size: "md",
  },
});

export type AlertVariants = VariantProps<typeof alert>;
