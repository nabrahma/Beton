"use client";

import { ScrollArea as BaseScrollArea } from "@base-ui/react/scroll-area";
import { scrollArea } from "@beton-ui/recipes";

const styles = scrollArea();

export interface ScrollAreaProps extends Omit<BaseScrollArea.Root.Props, "className"> {
  className?: string;
  /** Classes for the scrolling viewport. */
  viewportClassName?: string;
  /** Show the horizontal scrollbar as well. Off by default. */
  horizontal?: boolean;
  /** Keeps the viewport reachable with the keyboard, as scrollable regions must be. */
  label?: string;
}

function ScrollAreaRoot({
  className,
  viewportClassName,
  horizontal = false,
  label,
  children,
  ...props
}: ScrollAreaProps) {
  return (
    <BaseScrollArea.Root {...props} className={styles.root({ class: className })}>
      <BaseScrollArea.Viewport
        tabIndex={0}
        role="group"
        aria-label={label}
        className={styles.viewport({ class: viewportClassName })}
      >
        <BaseScrollArea.Content className={styles.content()}>{children}</BaseScrollArea.Content>
      </BaseScrollArea.Viewport>
      <BaseScrollArea.Scrollbar orientation="vertical" className={styles.scrollbar()}>
        <BaseScrollArea.Thumb className={styles.thumb()} />
      </BaseScrollArea.Scrollbar>
      {horizontal ? (
        <>
          <BaseScrollArea.Scrollbar orientation="horizontal" className={styles.scrollbar()}>
            <BaseScrollArea.Thumb className={styles.thumb()} />
          </BaseScrollArea.Scrollbar>
          <BaseScrollArea.Corner className={styles.corner()} />
        </>
      ) : null}
    </BaseScrollArea.Root>
  );
}

/** A scrolling panel with scrollbars that match the rest of the set. */
export const ScrollArea = ScrollAreaRoot;
