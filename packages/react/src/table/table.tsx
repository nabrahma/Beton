"use client";

import { table, visuallyHidden, type TableVariants } from "@beton-ui/recipes";
import { createContext, useContext, type ComponentProps, type ReactNode } from "react";
import { ChevronDownIcon, ChevronUpIcon } from "../utils/icons.tsx";

interface TableState {
  styles: ReturnType<typeof table>;
  size: NonNullable<TableVariants["size"]>;
}

const TableContext = createContext<TableState>({ styles: table(), size: "md" });

function useStyles() {
  return useContext(TableContext).styles;
}

export interface TableProps extends Omit<ComponentProps<"table">, "children">, TableVariants {
  children?: ReactNode;
  /** Describes the table. Required: a table without one is a grid of mystery. */
  caption: ReactNode;
  /** Hide the caption from the screen while leaving it for screen readers. */
  hideCaption?: boolean;
  /** Classes for the element that scrolls when the table is wider than the page. */
  scrollerClassName?: string;
}

function TableRoot({
  size = "md",
  striped = false,
  hoverable = false,
  caption,
  hideCaption = false,
  className,
  scrollerClassName,
  children,
  ...props
}: TableProps) {
  const styles = table({ size, striped, hoverable });
  return (
    <TableContext.Provider value={{ styles, size }}>
      <div className={styles.root({ class: className })}>
        {/* Scrollable regions need a name and a tab stop of their own. */}
        <div
          tabIndex={0}
          role="group"
          aria-label={typeof caption === "string" ? caption : undefined}
          className={styles.scroller({ class: scrollerClassName })}
        >
          <table {...props} className={styles.table()}>
            <caption
              className={styles.caption({ class: hideCaption ? visuallyHidden : undefined })}
            >
              {caption}
            </caption>
            {children}
          </table>
        </div>
      </div>
    </TableContext.Provider>
  );
}

export type TableSectionProps = ComponentProps<"thead">;

function TableHead({ className, ...props }: TableSectionProps) {
  return <thead {...props} className={useStyles().head({ class: className })} />;
}

function TableBody({ className, ...props }: ComponentProps<"tbody">) {
  return <tbody {...props} className={useStyles().body({ class: className })} />;
}

function TableFooter({ className, ...props }: ComponentProps<"tfoot">) {
  return <tfoot {...props} className={useStyles().footer({ class: className })} />;
}

export interface TableRowProps extends ComponentProps<"tr"> {
  /** Marks the row as selected, for screen readers as well as on screen. */
  selected?: boolean;
}

function TableRow({ className, selected, ...props }: TableRowProps) {
  return (
    <tr
      {...props}
      aria-selected={selected}
      data-selected={selected ? "" : undefined}
      className={useStyles().row({ class: className })}
    />
  );
}

export type SortDirection = "ascending" | "descending" | "none";

export interface TableHeaderCellProps extends Omit<ComponentProps<"th">, "onClick"> {
  /** Makes the header a sort button and reports the direction to screen readers. */
  sort?: SortDirection;
  /** Called with the direction to sort by next. */
  onSort?: (direction: "ascending" | "descending") => void;
}

function TableHeaderCell({ className, children, sort, onSort, ...props }: TableHeaderCellProps) {
  const styles = useStyles();
  if (!sort) {
    return (
      <th
        {...props}
        scope={props.scope ?? "col"}
        className={styles.headerCell({ class: className })}
      >
        {children}
      </th>
    );
  }
  const next = sort === "ascending" ? "descending" : "ascending";
  return (
    <th
      {...props}
      scope={props.scope ?? "col"}
      aria-sort={sort}
      className={styles.headerCell({ class: className })}
    >
      <button type="button" className={styles.sortButton()} onClick={() => onSort?.(next)}>
        {children}
        {sort === "ascending" ? (
          <ChevronUpIcon className={styles.sortIcon()} />
        ) : sort === "descending" ? (
          <ChevronDownIcon className={styles.sortIcon()} />
        ) : (
          <ChevronDownIcon className={styles.sortIcon()} aria-hidden="true" />
        )}
      </button>
    </th>
  );
}

function TableCell({ className, ...props }: ComponentProps<"td">) {
  return <td {...props} className={useStyles().cell({ class: className })} />;
}

function TableActions({ className, ...props }: ComponentProps<"div">) {
  return <div {...props} className={useStyles().actions({ class: className })} />;
}

export interface TableEmptyProps extends ComponentProps<"td"> {
  /** How many columns the message spans. */
  colSpan: number;
}

function TableEmpty({ className, colSpan, ...props }: TableEmptyProps) {
  const styles = useStyles();
  return (
    <tr>
      <td {...props} colSpan={colSpan} className={styles.empty({ class: className })} />
    </tr>
  );
}

/** Rows and columns of data, with sortable headers and row actions. */
export const Table = Object.assign(TableRoot, {
  Head: TableHead,
  Body: TableBody,
  Footer: TableFooter,
  Row: TableRow,
  HeaderCell: TableHeaderCell,
  Cell: TableCell,
  Actions: TableActions,
  Empty: TableEmpty,
});
