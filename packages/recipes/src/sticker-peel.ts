import { tv, type VariantProps } from "./tv.ts";

export const stickerPeel = tv({
  slots: {
    root: [
      "group relative isolate inline-block border-3 border-border bg-raised shadow-sm",
      "transition-[translate,box-shadow] duration-70 ease-linear motion-reduce:transition-none",
      "hover:-translate-y-1 hover:shadow-lg",
    ],
    corner: [
      "pointer-events-none absolute top-0 right-0 size-0",
      "border-t-transparent border-l-transparent border-r-border border-b-border",
      "transition-[border-width] duration-70 ease-linear motion-reduce:transition-none",
    ],
    content: "relative z-10 block",
  },
  variants: {
    size: {
      sm: { content: "p-3", corner: "group-hover:border-[12px]" },
      md: { content: "p-4", corner: "group-hover:border-[16px]" },
      lg: { content: "p-6", corner: "group-hover:border-[24px]" },
    },
  },
  defaultVariants: {
    size: "md",
  },
});

export type StickerPeelVariants = VariantProps<typeof stickerPeel>;
