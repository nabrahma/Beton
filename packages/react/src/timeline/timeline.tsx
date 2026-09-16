import { timeline, type TimelineVariants } from "@beton-ui/recipes";
import {
  Children,
  cloneElement,
  isValidElement,
  type ComponentProps,
  type ReactElement,
  type ReactNode,
} from "react";

export type TimelineState = "done" | "current" | "upcoming";

export interface TimelineProps extends Omit<ComponentProps<"ol">, "children">, TimelineVariants {
  children?: ReactNode;
}

function TimelineRoot({ size = "md", className, children, ...props }: TimelineProps) {
  const styles = timeline({ size });
  const items = Children.toArray(children).filter(isValidElement);
  return (
    <ol {...props} className={styles.root({ class: className })}>
      {items.map((item, index) =>
        cloneElement(item as ReactElement<TimelineItemProps>, {
          size,
          last: index === items.length - 1,
        }),
      )}
    </ol>
  );
}

export interface TimelineItemProps extends Omit<ComponentProps<"li">, "title">, TimelineVariants {
  /** What happened. */
  title: ReactNode;
  /** When it happened. */
  time?: ReactNode;
  /** A machine-readable date, so the time is more than decoration. */
  dateTime?: string;
  /** What goes in the marker. Defaults to a plain dot. */
  marker?: ReactNode;
  /** Colours the marker: done, current or still to come. */
  state?: TimelineState;
  /** Set by Timeline. */
  last?: boolean;
}

function TimelineItem({
  title,
  time,
  dateTime,
  marker,
  state = "done",
  last = false,
  size = "md",
  className,
  children,
  ...props
}: TimelineItemProps) {
  const styles = timeline({ size });
  return (
    <li {...props} data-state={state} className={styles.item({ class: className })}>
      <span data-state={state} className={styles.marker()}>
        {marker}
      </span>
      {last ? null : <span aria-hidden="true" className={styles.connector()} />}
      <div className={styles.content()}>
        {time ? (
          <time dateTime={dateTime} className={styles.time()}>
            {time}
          </time>
        ) : null}
        <p className={styles.title()}>{title}</p>
        {children ? <div className={styles.body()}>{children}</div> : null}
      </div>
    </li>
  );
}

/** What happened, in order: releases, deployments, an audit trail. */
export const Timeline = Object.assign(TimelineRoot, { Item: TimelineItem });
