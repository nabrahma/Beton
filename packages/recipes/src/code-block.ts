import { focusRing } from "./shared.ts";
import { tv, type VariantProps } from "./tv.ts";

export const codeBlock = tv({
  slots: {
    root: "w-full overflow-hidden border-3 border-border bg-ink text-paper shadow-sm",
    header: "flex items-center justify-between gap-3 border-b-3 border-border bg-surface px-3 py-2",
    filename: "truncate font-mono text-xs font-bold tracking-widest uppercase text-foreground",
    copy: "shrink-0",
    scroller: ["overflow-x-auto", focusRing],
    pre: "w-max min-w-full p-4 font-mono text-sm leading-relaxed",
    code: "font-mono",
    lineNumbers: "pointer-events-none select-none pr-4 text-right opacity-60",
  },
  variants: {
    size: {
      sm: { pre: "p-3 text-xs" },
      md: { pre: "p-4 text-sm" },
      lg: { pre: "p-5 text-base" },
    },
  },
  defaultVariants: {
    size: "md",
  },
});

export type CodeBlockVariants = VariantProps<typeof codeBlock>;
