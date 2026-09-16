import { backdrop, popupSurface } from "./shared.ts";
import { tv, type VariantProps } from "./tv.ts";

export const dialog = tv({
  slots: {
    backdrop,
    viewport: "fixed inset-0 z-50 flex items-center justify-center overflow-y-auto p-4 sm:p-6",
    popup: [
      "relative flex max-h-[calc(100dvh-2rem)] w-full flex-col overflow-hidden rounded-lg shadow-lg",
      popupSurface,
    ],
    header: "flex flex-col gap-2 border-b-3 border-border p-6 pr-16",
    title: "font-display text-2xl font-black leading-tight tracking-tight",
    description: "text-base",
    body: "flex flex-1 flex-col gap-4 overflow-y-auto p-6",
    footer: "flex flex-wrap items-center justify-end gap-3 border-t-3 border-border bg-surface p-6",
    close: "absolute top-4 right-4",
  },
  variants: {
    variant: {
      primary: { header: "bg-primary" },
      secondary: { header: "bg-secondary" },
      ghost: { header: "bg-raised" },
      danger: { header: "bg-danger" },
    },
    size: {
      sm: { popup: "max-w-sm" },
      md: { popup: "max-w-lg" },
      lg: { popup: "max-w-2xl" },
    },
  },
  defaultVariants: {
    variant: "ghost",
    size: "md",
  },
});

export type DialogVariants = VariantProps<typeof dialog>;
