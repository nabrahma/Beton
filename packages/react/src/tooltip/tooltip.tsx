"use client";

import { Tooltip as BaseTooltip } from "@base-ui/react/tooltip";
import { tooltip } from "@beton-ui/recipes";
import type { ReactElement, ReactNode } from "react";

export interface TooltipProps extends Omit<BaseTooltip.Root.Props, "children"> {
  /** The tooltip text. Mirror it in the trigger's accessible name. */
  content: ReactNode;
  /** The element the tooltip describes. Must accept props and a ref. */
  children: ReactElement;
  className?: string;
  side?: BaseTooltip.Positioner.Props["side"];
  align?: BaseTooltip.Positioner.Props["align"];
  sideOffset?: number;
  /** Milliseconds before it opens on hover. Focus opens it immediately. */
  delay?: number;
  closeDelay?: number;
}

/**
 * A short visual label shown on hover and on keyboard focus.
 *
 * Tooltips are supplementary and visual only: they add no ARIA role and no
 * description, because touch and screen reader users never see them. Give the
 * trigger an accessible name that matches the tooltip text, and put anything
 * essential in the page or in a Popover instead.
 */
export function Tooltip({
  content,
  children,
  className,
  side = "top",
  align = "center",
  sideOffset = 8,
  delay,
  closeDelay,
  ...props
}: TooltipProps) {
  const styles = tooltip();
  return (
    <BaseTooltip.Root {...props}>
      <BaseTooltip.Trigger delay={delay} closeDelay={closeDelay} render={children} />
      <BaseTooltip.Portal>
        <BaseTooltip.Positioner
          side={side}
          align={align}
          sideOffset={sideOffset}
          className={styles.positioner()}
        >
          <BaseTooltip.Popup className={styles.popup({ class: className })}>
            {content}
          </BaseTooltip.Popup>
        </BaseTooltip.Positioner>
      </BaseTooltip.Portal>
    </BaseTooltip.Root>
  );
}

/** Shares hover delays between tooltips, so moving between them feels instant. */
export const TooltipProvider = BaseTooltip.Provider;
