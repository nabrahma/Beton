import { tv, type VariantProps } from "./tv.ts";

export const faq = tv({
  slots: {
    layout: "flex flex-col gap-10 lg:flex-row lg:items-start lg:gap-16",
    aside: "flex flex-col gap-4 lg:w-80 lg:shrink-0",
    list: "min-w-0 flex-1",
  },
});

export type FaqVariants = VariantProps<typeof faq>;
