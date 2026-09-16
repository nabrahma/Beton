import { sticker, visuallyHidden, type StickerVariants } from "@beton-ui/recipes";
import type { ComponentProps, ReactNode } from "react";

export interface StickerProps extends Omit<ComponentProps<"div">, "children">, StickerVariants {
  /** The words that run around the circle. */
  text: string;
  /** What sits in the middle: an arrow, a price, an icon. */
  children?: ReactNode;
  /** How many times the text repeats around the circle. */
  repeat?: number;
}

/**
 * A round badge whose words run around the edge, turning slowly. The turn is a
 * hard 24-step rotation, and it stops under reduced motion.
 */
export function Sticker({
  variant = "primary",
  size = "md",
  text,
  children,
  repeat = 2,
  reverse = false,
  className,
  ...props
}: StickerProps) {
  const styles = sticker({ variant, size, reverse });
  const id = `beton-sticker-${text.replace(/[^a-z0-9]+/gi, "-").toLowerCase()}`;
  const around = Array.from({ length: Math.max(1, Math.trunc(repeat)) }, () => text)
    .join(" · ")
    .concat(" · ");

  return (
    <div {...props} data-variant={variant} className={styles.root({ class: className })}>
      <svg viewBox="0 0 100 100" aria-hidden="true" className={styles.spinner()}>
        <defs>
          <path id={id} d="M 50,50 m -37,0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0" fill="none" />
        </defs>
        <text className={styles.text()} fontSize="9">
          <textPath href={`#${id}`}>{around}</textPath>
        </text>
      </svg>
      <span className={styles.center()}>{children}</span>
      <span className={visuallyHidden}>{text}</span>
    </div>
  );
}
