import { badge, type BadgeVariants } from "@beton-ui/recipes";
import type { ComponentProps } from "react";
import { renderElement, type RenderProp } from "../utils/render-element.ts";

export interface BadgeProps extends ComponentProps<"span">, BadgeVariants {
  render?: RenderProp;
}

export function Badge({
  variant = "primary",
  size = "md",
  className,
  render,
  ...props
}: BadgeProps) {
  return renderElement(
    "span",
    {
      ...props,
      "data-variant": variant,
      "data-size": size,
      className: badge({ variant, size, class: className }),
    },
    render,
  );
}
