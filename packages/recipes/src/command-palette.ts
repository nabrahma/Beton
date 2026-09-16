import { backdrop, popupSurface } from "./shared.ts";
import { tv, type VariantProps } from "./tv.ts";

export const commandPalette = tv({
  slots: {
    backdrop,
    viewport: "fixed inset-0 z-50 flex items-start justify-center p-4 pt-[12dvh]",
    popup: ["flex max-h-[76dvh] w-full max-w-xl flex-col overflow-hidden shadow-lg", popupSurface],
    inputGroup:
      "flex items-center gap-3 border-b-3 border-border px-4 has-focus-visible:border-b-5",
    icon: "size-5 shrink-0",
    input:
      "h-14 w-full min-w-0 bg-transparent font-sans text-lg outline-none placeholder:text-disabled-foreground",
    list: "min-h-0 flex-1 scroll-py-2 overflow-y-auto py-2",
    group: "py-1",
    groupLabel: "px-4 pt-2 pb-1 font-mono text-xs font-bold uppercase",
    item: [
      "flex min-h-11 cursor-pointer select-none items-center gap-3 px-4 font-medium outline-none",
      "data-highlighted:bg-secondary data-disabled:cursor-not-allowed data-disabled:text-disabled-foreground",
    ],
    itemHint: "ml-auto font-mono text-xs font-bold",
    empty: "px-4 py-10 text-center font-display text-lg font-extrabold",
    footer: [
      "flex flex-wrap items-center justify-between gap-3 border-t-3 border-border bg-surface px-4 py-2.5",
      "font-mono text-xs font-bold",
    ],
  },
});

export type CommandPaletteVariants = VariantProps<typeof commandPalette>;
