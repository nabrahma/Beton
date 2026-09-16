import { tv, type VariantProps } from "./tv.ts";

export const toast = tv({
  slots: {
    viewport: [
      "fixed right-4 bottom-4 z-[60] flex w-[calc(100vw-2rem)] flex-col-reverse gap-3 outline-none",
      "sm:right-6 sm:bottom-6 sm:w-96",
    ],
    root: [
      "relative flex w-full items-start gap-3 border-3 border-border bg-raised p-4 pr-14 text-foreground shadow-sm outline-none",
      "data-[type=success]:bg-success data-[type=error]:bg-danger data-[type=warning]:bg-secondary data-[type=info]:bg-primary",
      "data-limited:hidden",
    ],
    content: "flex min-w-0 flex-1 flex-col gap-1",
    title: "font-display text-base font-extrabold leading-tight",
    description: "text-sm",
    actions: "mt-2 flex flex-wrap gap-2",
    close: "absolute top-2 right-2",
  },
});

export type ToastVariants = VariantProps<typeof toast>;
