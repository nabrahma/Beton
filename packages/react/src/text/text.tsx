import { heading, text, type HeadingVariants, type TextVariants } from "@beton-ui/recipes";
import type { ComponentProps } from "react";
import { renderElement, type RenderProp } from "../utils/render-element.ts";

export interface TextProps extends ComponentProps<"p">, TextVariants {
  render?: RenderProp;
}

export function Text({ size = "md", weight, mono, className, render, ...props }: TextProps) {
  return renderElement(
    "p",
    { ...props, "data-size": size, className: text({ size, weight, mono, class: className }) },
    render,
  );
}

type Level = 1 | 2 | 3 | 4 | 5 | 6;

const DEFAULT_SIZE: Record<Level, NonNullable<HeadingVariants["size"]>> = {
  1: "xl",
  2: "lg",
  3: "md",
  4: "sm",
  5: "sm",
  6: "sm",
};

export interface HeadingProps extends ComponentProps<"h2">, HeadingVariants {
  /** The semantic heading level. Visual size follows it unless `size` is set. */
  level?: Level;
  render?: RenderProp;
}

export function Heading({ level = 2, size, uppercase, className, render, ...props }: HeadingProps) {
  const resolvedSize = size ?? DEFAULT_SIZE[level];
  return renderElement(
    `h${level}`,
    {
      ...props,
      "data-size": resolvedSize,
      className: heading({ size: resolvedSize, uppercase, class: className }),
    },
    render,
  );
}
