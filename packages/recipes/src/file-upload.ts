import { focusRingWithin } from "./shared.ts";
import { tv, type VariantProps } from "./tv.ts";

export const fileUpload = tv({
  slots: {
    root: "flex w-full flex-col gap-3",
    dropzone: [
      "relative flex w-full cursor-pointer flex-col items-center justify-center gap-2 text-center",
      "border-3 border-dashed border-border bg-raised text-foreground",
      "hover:bg-surface data-dragging:border-solid data-dragging:bg-secondary",
      "data-invalid:bg-danger/15",
      "data-disabled:cursor-not-allowed data-disabled:border-disabled-foreground data-disabled:bg-disabled data-disabled:text-disabled-foreground",
      focusRingWithin,
    ],
    icon: "shrink-0",
    title: "font-display font-extrabold",
    hint: "text-caption",
    input: "sr-only",
    list: "flex flex-col gap-2",
    file: "flex items-center gap-3 border-3 border-border bg-raised py-1 pr-1 pl-3 shadow-sm",
    fileName: "min-w-0 flex-1 truncate font-mono text-sm font-bold",
    fileSize: "shrink-0 font-mono text-xs",
  },
  variants: {
    size: {
      sm: { dropzone: "px-4 py-6", icon: "size-6", title: "text-base" },
      md: { dropzone: "px-6 py-10", icon: "size-8", title: "text-lg" },
      lg: { dropzone: "px-8 py-14", icon: "size-10", title: "text-xl" },
    },
  },
  defaultVariants: {
    size: "md",
  },
});

export type FileUploadVariants = VariantProps<typeof fileUpload>;
