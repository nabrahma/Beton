"use client";

import { backToTop } from "@beton-ui/recipes";
import { useEffect, useState, type ComponentProps } from "react";
import { Button } from "../button/button.tsx";
import { ArrowUpIcon } from "../utils/icons.tsx";

export interface BackToTopProps extends Omit<ComponentProps<typeof Button>, "children"> {
  /** How far the page must scroll before the button appears, in pixels. */
  threshold?: number;
  /** The label read out and shown in a tooltip. */
  label?: string;
  /** Where focus goes after scrolling. Defaults to the first heading or the body. */
  targetId?: string;
  /** Classes for the fixed wrapper. */
  wrapperClassName?: string;
}

/** A button that returns to the top of a long page, and moves focus there too. */
export function BackToTop({
  threshold = 400,
  label = "Back to top",
  targetId,
  wrapperClassName,
  className,
  variant = "secondary",
  size = "md",
  onClick,
  ...props
}: BackToTopProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const update = () => setVisible(window.scrollY > threshold);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, [threshold]);

  const styles = backToTop({ hidden: !visible });

  return (
    <div className={styles.root({ class: wrapperClassName })}>
      <Button
        {...props}
        variant={variant}
        size={size}
        iconOnly
        aria-label={label}
        tabIndex={visible ? undefined : -1}
        className={className}
        onClick={(event) => {
          onClick?.(event);
          if (event.defaultPrevented) return;
          const target = targetId
            ? document.getElementById(targetId)
            : document.querySelector<HTMLElement>("h1");
          const behavior = window.matchMedia("(prefers-reduced-motion: reduce)").matches
            ? "auto"
            : "smooth";
          window.scrollTo({ top: 0, behavior });
          // Scrolling alone leaves the keyboard where it was, so move focus too.
          if (target) {
            target.setAttribute("tabindex", "-1");
            target.focus({ preventScroll: true });
          }
        }}
      >
        <ArrowUpIcon width={20} height={20} />
      </Button>
    </div>
  );
}
