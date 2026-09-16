"use client";

import { cursorTrail, type CursorTrailVariants } from "@beton-ui/recipes";
import { useEffect, useState, type ComponentProps } from "react";
import { useReducedMotion } from "../utils/use-reduced-motion.ts";

interface Mark {
  id: number;
  x: number;
  y: number;
}

export interface CursorTrailProps
  extends Omit<ComponentProps<"div">, "children">, CursorTrailVariants {
  /** How many marks follow the pointer. */
  length?: number;
  /** How big the leading mark is, in pixels. */
  size?: number;
  /** Only draw the trail inside this element. Defaults to the whole page. */
  container?: React.RefObject<HTMLElement | null>;
}

/**
 * Hard squares that follow the pointer. It draws nothing for touch users, who
 * have no pointer to follow, and nothing under reduced motion.
 */
export function CursorTrail({
  variant = "primary",
  length = 8,
  size = 16,
  container,
  className,
  ...props
}: CursorTrailProps) {
  const reduced = useReducedMotion();
  const [marks, setMarks] = useState<Mark[]>([]);

  useEffect(() => {
    if (reduced) return;
    // A trail is meaningless without a pointer that hovers.
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

    const target: HTMLElement | Document = container?.current ?? document;
    let id = 0;
    const onMove = (event: Event) => {
      const { clientX, clientY } = event as PointerEvent;
      id += 1;
      setMarks((current) => [...current, { id, x: clientX, y: clientY }].slice(-length));
    };
    target.addEventListener("pointermove", onMove);
    return () => target.removeEventListener("pointermove", onMove);
  }, [container, length, reduced]);

  const styles = cursorTrail({ variant });
  if (reduced || marks.length === 0) return null;

  return (
    <div {...props} aria-hidden="true" className={styles.root({ class: className })}>
      {marks.map((mark, index) => {
        const scale = (index + 1) / marks.length;
        const side = Math.max(4, Math.round(size * scale));
        return (
          <span
            key={mark.id}
            className={styles.dot()}
            style={{
              left: mark.x - side / 2,
              top: mark.y - side / 2,
              width: side,
              height: side,
            }}
          />
        );
      })}
    </div>
  );
}
