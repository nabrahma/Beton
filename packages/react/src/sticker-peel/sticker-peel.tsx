import { stickerPeel, type StickerPeelVariants } from "@beton-ui/recipes";
import type { ComponentProps } from "react";
import { renderElement, type RenderProp } from "../utils/render-element.ts";

export interface StickerPeelProps extends ComponentProps<"div">, StickerPeelVariants {
  render?: RenderProp;
}

/**
 * A panel that lifts off the page as the pointer crosses it, with the corner
 * peeling back. The lift is a single hard step, and nothing moves at all under
 * reduced motion.
 */
export function StickerPeel({
  size = "md",
  className,
  children,
  render,
  ...props
}: StickerPeelProps) {
  const styles = stickerPeel({ size });
  return renderElement(
    "div",
    {
      ...props,
      className: styles.root({ class: className }),
      children: (
        <>
          <span aria-hidden="true" className={styles.corner()} />
          <span className={styles.content()}>{children}</span>
        </>
      ),
    },
    render,
  );
}
