import { tv, type VariantProps } from "./tv.ts";

export const notFoundPage = tv({
  slots: {
    root: "relative isolate flex min-h-[70dvh] w-full items-center justify-center overflow-hidden px-4 py-20",
    inner: "flex max-w-xl flex-col items-center gap-6 text-center",
    code: "font-display text-[clamp(5rem,20vw,12rem)] leading-none font-black tracking-tight text-foreground",
    title: "font-display text-h2 font-black tracking-tight text-balance text-foreground",
    description: "text-pretty text-lg text-foreground",
    actions: "flex flex-wrap items-center justify-center gap-4 pt-2",
  },
});

export type NotFoundPageVariants = VariantProps<typeof notFoundPage>;
