import { tv, type VariantProps } from "./tv.ts";

export const scrollArea = tv({
  slots: {
    root: "relative overflow-hidden",
    viewport: "size-full overscroll-contain outline-none",
    content: "min-w-full",
    scrollbar: [
      "flex touch-none select-none border-border bg-surface p-0.5",
      "data-[orientation=vertical]:w-4 data-[orientation=vertical]:border-l-3",
      "data-[orientation=horizontal]:h-4 data-[orientation=horizontal]:flex-col data-[orientation=horizontal]:border-t-3",
    ],
    thumb: "flex-1 bg-foreground",
    corner: "bg-surface",
  },
});

export type ScrollAreaVariants = VariantProps<typeof scrollArea>;
