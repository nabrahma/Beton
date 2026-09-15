import { separator, type SeparatorVariants } from "@beton-ui/recipes";
import type { ComponentProps } from "react";
import { renderElement, type RenderProp } from "../utils/render-element.ts";

export interface SeparatorProps extends ComponentProps<"div">, SeparatorVariants {
  /**
   * A decorative separator is hidden from assistive technology. Set to `false`
   * when the separator divides meaningful groups of content.
   */
  decorative?: boolean;
  render?: RenderProp;
}

export function Separator({
  orientation = "horizontal",
  size = "md",
  decorative = true,
  className,
  render,
  ...props
}: SeparatorProps) {
  const semantics = decorative
    ? { role: "none" }
    : { role: "separator", "aria-orientation": orientation };

  return renderElement(
    "div",
    {
      ...semantics,
      ...props,
      "data-orientation": orientation,
      "data-size": size,
      className: separator({ orientation, size, class: className }),
    },
    render,
  );
}
