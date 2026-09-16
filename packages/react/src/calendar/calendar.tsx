"use client";

import { calendar, visuallyHidden } from "@beton-ui/recipes";
import { useEffect, useRef, useState, type ComponentProps, type KeyboardEvent } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "../utils/icons.tsx";

const styles = calendar();
const DAY = 86_400_000;

/** Midnight local time, so two dates on the same day compare equal. */
function startOfDay(date: Date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

function addDays(date: Date, days: number) {
  return startOfDay(new Date(date.getTime() + days * DAY));
}

function addMonths(date: Date, months: number) {
  const next = new Date(date.getFullYear(), date.getMonth() + months, 1);
  const lastDay = new Date(next.getFullYear(), next.getMonth() + 1, 0).getDate();
  next.setDate(Math.min(date.getDate(), lastDay));
  return next;
}

function sameDay(a: Date | null | undefined, b: Date | null | undefined) {
  return Boolean(
    a &&
    b &&
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate(),
  );
}

function key(date: Date) {
  return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
}

/** The Monday (or Sunday) on or before the first of the month. */
function gridStartOf(month: Date, weekStartsOn: number) {
  const first = new Date(month.getFullYear(), month.getMonth(), 1);
  return addDays(first, -((first.getDay() - weekStartsOn + 7) % 7));
}

export interface CalendarProps extends Omit<
  ComponentProps<"div">,
  "defaultValue" | "onChange" | "onSelect"
> {
  /** The selected date when the calendar manages it itself. */
  defaultValue?: Date | null;
  /** The selected date, when you manage it. */
  value?: Date | null;
  /** Called with the date that was chosen. */
  onValueChange?: (date: Date) => void;
  /** The month on show, when you manage it. */
  month?: Date;
  /** The month to open on. */
  defaultMonth?: Date;
  /** Called when the month changes. */
  onMonthChange?: (month: Date) => void;
  /** Nothing before this date can be chosen. */
  min?: Date;
  /** Nothing after this date can be chosen. */
  max?: Date;
  /** Rule out individual dates, such as weekends or days that are fully booked. */
  isDateDisabled?: (date: Date) => boolean;
  /** 0 is Sunday, 1 is Monday. Defaults to Monday. */
  weekStartsOn?: 0 | 1 | 2 | 3 | 4 | 5 | 6;
  /** Formats the month heading, the weekdays and the day labels. */
  locale?: string;
  /** Names the calendar for screen readers. */
  label?: string;
}

/** A month of dates, one of which can be chosen. */
export function Calendar({
  defaultValue = null,
  value,
  onValueChange,
  month,
  defaultMonth,
  onMonthChange,
  min,
  max,
  isDateDisabled,
  weekStartsOn = 1,
  locale,
  label = "Calendar",
  className,
  ...props
}: CalendarProps) {
  const [ownValue, setOwnValue] = useState<Date | null>(defaultValue);
  const selected = value === undefined ? ownValue : value;

  const [ownMonth, setOwnMonth] = useState<Date>(
    () => defaultMonth ?? selected ?? startOfDay(new Date()),
  );
  const shown = month ?? ownMonth;

  // The one day in the grid that is a tab stop, as the grid pattern requires.
  const [focused, setFocused] = useState<Date>(() => selected ?? startOfDay(new Date()));
  const shouldFocus = useRef(false);
  const days = useRef(new Map<string, HTMLButtonElement | null>());

  useEffect(() => {
    if (!shouldFocus.current) return;
    shouldFocus.current = false;
    days.current.get(key(focused))?.focus();
  }, [focused]);

  const today = startOfDay(new Date());
  const monthFormat = new Intl.DateTimeFormat(locale, { month: "long", year: "numeric" });
  const dayFormat = new Intl.DateTimeFormat(locale, { dateStyle: "full" });
  const weekdayShort = new Intl.DateTimeFormat(locale, { weekday: "short" });
  const weekdayLong = new Intl.DateTimeFormat(locale, { weekday: "long" });

  function setMonth(next: Date) {
    if (month === undefined) setOwnMonth(next);
    onMonthChange?.(next);
  }

  function disabled(date: Date) {
    if (min && date < startOfDay(min)) return true;
    if (max && date > startOfDay(max)) return true;
    return Boolean(isDateDisabled?.(date));
  }

  function moveTo(date: Date) {
    shouldFocus.current = true;
    setFocused(date);
    if (date.getMonth() !== shown.getMonth() || date.getFullYear() !== shown.getFullYear()) {
      setMonth(new Date(date.getFullYear(), date.getMonth(), 1));
    }
  }

  function select(date: Date) {
    if (disabled(date)) return;
    if (value === undefined) setOwnValue(date);
    onValueChange?.(date);
    moveTo(date);
  }

  function onKeyDown(event: KeyboardEvent<HTMLButtonElement>, date: Date) {
    const moves: Record<string, () => Date> = {
      ArrowLeft: () => addDays(date, -1),
      ArrowRight: () => addDays(date, 1),
      ArrowUp: () => addDays(date, -7),
      ArrowDown: () => addDays(date, 7),
      Home: () => addDays(date, -((date.getDay() - weekStartsOn + 7) % 7)),
      End: () => addDays(date, 6 - ((date.getDay() - weekStartsOn + 7) % 7)),
      PageUp: () => addMonths(date, event.shiftKey ? -12 : -1),
      PageDown: () => addMonths(date, event.shiftKey ? 12 : 1),
    };
    const move = moves[event.key];
    if (!move) return;
    event.preventDefault();
    moveTo(move());
  }

  // Always six weeks, so the grid never changes height as months go by.
  const gridStart = gridStartOf(shown, weekStartsOn);
  const weeks = Array.from({ length: 6 }, (_, week) => ({
    start: addDays(gridStart, week * 7),
    days: Array.from({ length: 7 }, (_, day) => addDays(gridStart, week * 7 + day)),
  }));
  const weekdays = Array.from({ length: 7 }, (_, day) => addDays(gridStart, day));
  const inGrid = weeks.some((week) => week.days.some((date) => sameDay(date, focused)));
  const tabStop = inGrid ? focused : gridStart;

  return (
    <div {...props} className={styles.root({ class: className })}>
      <div className={styles.header()}>
        {/* The heading is a live region: moving month announces the new one. */}
        <h2 aria-live="polite" className={styles.heading()}>
          {monthFormat.format(shown)}
        </h2>
        <div className={styles.nav()}>
          <button
            type="button"
            aria-label="Previous month"
            className={styles.navButton()}
            onClick={() => setMonth(addMonths(shown, -1))}
          >
            <ChevronLeftIcon width={20} height={20} />
          </button>
          <button
            type="button"
            aria-label="Next month"
            className={styles.navButton()}
            onClick={() => setMonth(addMonths(shown, 1))}
          >
            <ChevronRightIcon width={20} height={20} />
          </button>
        </div>
      </div>

      <table role="grid" aria-label={label} className={styles.grid()}>
        <thead className={styles.weekdays()}>
          <tr>
            {weekdays.map((date) => (
              <th key={date.getDay()} scope="col" className={styles.weekday()}>
                <span aria-hidden="true">{weekdayShort.format(date)}</span>
                <span className={visuallyHidden}>{weekdayLong.format(date)}</span>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {weeks.map((week) => (
            <tr key={key(week.start)} className={styles.week()}>
              {week.days.map((date) => {
                const outside = date.getMonth() !== shown.getMonth();
                const isDisabled = disabled(date);
                return (
                  <td
                    key={key(date)}
                    // The cell carries the selected state; the button inside is
                    // the target. aria-selected is not allowed on a button.
                    aria-selected={sameDay(date, selected)}
                    className={styles.cell()}
                  >
                    <button
                      type="button"
                      ref={(el) => {
                        days.current.set(key(date), el);
                      }}
                      tabIndex={sameDay(date, tabStop) ? 0 : -1}
                      aria-label={dayFormat.format(date)}
                      aria-disabled={isDisabled || undefined}
                      aria-current={sameDay(date, today) ? "date" : undefined}
                      data-today={sameDay(date, today) ? "" : undefined}
                      data-selected={sameDay(date, selected) ? "" : undefined}
                      data-outside={outside ? "" : undefined}
                      data-disabled={isDisabled ? "" : undefined}
                      className={styles.day()}
                      onClick={() => select(date)}
                      onKeyDown={(event) => onKeyDown(event, date)}
                      onFocus={() => setFocused(date)}
                    >
                      {date.getDate()}
                    </button>
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
