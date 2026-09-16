import { skeleton, type SkeletonVariants } from "@beton-ui/recipes";
import type { ComponentProps } from "react";
import { renderElement, type RenderProp } from "../utils/render-element.ts";

export interface SkeletonProps extends ComponentProps<"span">, SkeletonVariants {
  render?: RenderProp;
}

/**
 * A placeholder for content that has not arrived. Hidden from screen readers:
 * put the loading state in a live region or on the control that started it.
 */
export function Skeleton({ shape = "line", className, render, ...props }: SkeletonProps) {
  return renderElement(
    "span",
    {
      ...props,
      "aria-hidden": "true",
      className: skeleton({ shape, class: className }),
    },
    render,
  );
}
