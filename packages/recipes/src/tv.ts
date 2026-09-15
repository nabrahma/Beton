import { cnMerge, createTV, type TWMConfig } from "tailwind-variants";

/**
 * Teaches tailwind-merge the Béton theme scales, so that a consumer's
 * `className="text-h2"` correctly replaces a recipe's `text-h4` instead of
 * being mistaken for a text colour.
 */
export const twMergeConfig: NonNullable<TWMConfig["twMergeConfig"]> = {
  extend: {
    theme: {
      text: ["h1", "h2", "h3", "h4", "body", "caption"],
      radius: ["md", "lg"],
      shadow: ["sm", "lg"],
      font: ["display", "sans", "mono"],
      animate: ["spin-stepped", "blink"],
    },
  },
};

export const tv = createTV({ twMerge: true, twMergeConfig });

/** Joins class names and resolves Tailwind conflicts using the Béton theme. */
export function cn(...classes: Parameters<typeof cnMerge>): string {
  return cnMerge(...classes)({ twMerge: true, twMergeConfig }) ?? "";
}

export type { VariantProps } from "tailwind-variants";
