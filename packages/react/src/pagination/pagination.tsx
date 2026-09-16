import { pagination, type PaginationVariants } from "@beton-ui/recipes";
import type { ComponentProps, ReactNode } from "react";
import { ChevronLeftIcon, ChevronRightIcon, EllipsisIcon } from "../utils/icons.tsx";

/**
 * The pages to show: page numbers, with `null` where a run has been collapsed.
 * Always keeps the first page, the last page and `siblings` pages either side
 * of the current one.
 */
export function paginationRange(page: number, count: number, siblings = 1): (number | null)[] {
  const total = Math.max(0, Math.trunc(count));
  if (total <= 0) return [];
  const current = Math.min(Math.max(1, Math.trunc(page)), total);
  const span = Math.max(0, Math.trunc(siblings));
  // First, last, current, the siblings either side and up to two gap markers.
  const slots = span * 2 + 5;
  if (total <= slots) return Array.from({ length: total }, (_, i) => i + 1);

  const left = Math.max(current - span, 1);
  const right = Math.min(current + span, total);
  const gapLeft = left > 2;
  const gapRight = right < total - 1;
  const run = (from: number, to: number) =>
    Array.from({ length: to - from + 1 }, (_, i) => from + i);

  if (!gapLeft && gapRight) return [...run(1, span * 2 + 3), null, total];
  if (gapLeft && !gapRight) return [1, null, ...run(total - (span * 2 + 2), total)];
  return [1, null, ...run(left, right), null, total];
}

export interface PaginationProps
  extends Omit<ComponentProps<"nav">, "onChange">, PaginationVariants {
  /** The page being shown, counting from 1. */
  page: number;
  /** How many pages there are in total. */
  count: number;
  /** How many pages to show either side of the current one. */
  siblings?: number;
  /** Called with the page that was chosen. Renders buttons. */
  onPageChange?: (page: number) => void;
  /** Builds the address for a page. Renders links, which work without JavaScript. */
  href?: (page: number) => string;
  /** Text beside the pages, such as "Page 2 of 10". Pass `null` to leave it out. */
  status?: ReactNode;
}

function PaginationRoot({
  page,
  count,
  siblings = 1,
  size = "md",
  onPageChange,
  href,
  status,
  className,
  "aria-label": ariaLabel = "Pagination",
  ...props
}: PaginationProps) {
  const styles = pagination({ size });
  const current = Math.min(Math.max(1, Math.trunc(page)), Math.max(1, Math.trunc(count)));
  const range = paginationRange(current, count, siblings);
  const label = status === undefined ? `Page ${current} of ${Math.max(1, count)}` : status;

  function item(target: number, children: ReactNode, itemLabel: string, isCurrent = false) {
    const disabled = target < 1 || target > count;
    const classes = styles.item();
    if (href && !disabled) {
      return (
        <a
          href={href(target)}
          data-size={size}
          aria-label={itemLabel}
          aria-current={isCurrent ? "page" : undefined}
          className={classes}
        >
          {children}
        </a>
      );
    }
    return (
      <button
        type="button"
        data-size={size}
        disabled={disabled}
        data-disabled={disabled ? "" : undefined}
        aria-label={itemLabel}
        aria-current={isCurrent ? "page" : undefined}
        className={classes}
        onClick={onPageChange && !disabled ? () => onPageChange(target) : undefined}
      >
        {children}
      </button>
    );
  }

  return (
    <nav {...props} aria-label={ariaLabel} className={styles.root({ class: className })}>
      <ul className={styles.list()}>
        <li>{item(current - 1, <ChevronLeftIcon width={20} height={20} />, "Previous page")}</li>
        {range.map((target, index) => (
          <li key={target ?? `gap-${index}`}>
            {target === null ? (
              <span aria-hidden="true" className={styles.ellipsis()}>
                <EllipsisIcon width={20} height={20} />
              </span>
            ) : (
              item(target, target, `Page ${target}`, target === current)
            )}
          </li>
        ))}
        <li>{item(current + 1, <ChevronRightIcon width={20} height={20} />, "Next page")}</li>
      </ul>
      {label === null ? null : (
        <p aria-live="polite" className={styles.status()}>
          {label}
        </p>
      )}
    </nav>
  );
}

/** Move through a list that is split across pages. */
export const Pagination = PaginationRoot;
