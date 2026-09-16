import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { expectNoAxeViolations } from "../../test/a11y.ts";
import { Calendar } from "./calendar.tsx";

// A fixed month and locale, so the tests read the same in March as in
// December, and on a machine set to any language.
const LOCALE = "en-GB";
const MARCH = new Date(2026, 2, 1);
const day = (n: number) => new Date(2026, 2, n);
const full = new Intl.DateTimeFormat(LOCALE, { dateStyle: "full" });

function dayButton(date: Date) {
  return screen.getByRole("button", { name: full.format(date) });
}

/** The gridcell around a day, which is what carries the selected state. */
function dayCell(date: Date) {
  return dayButton(date).closest("td");
}

describe("Calendar", () => {
  it("[axe] has no violations", async () => {
    const { container } = render(
      <div>
        <Calendar locale={LOCALE} defaultMonth={MARCH} defaultValue={day(12)} label="Pour date" />
        <Calendar
          locale={LOCALE}
          defaultMonth={MARCH}
          min={day(10)}
          max={day(20)}
          label="Delivery window"
        />
      </div>,
    );
    await expectNoAxeViolations(container);
  });

  it("[aria] is a named grid of days with a month heading", () => {
    render(<Calendar locale={LOCALE} defaultMonth={MARCH} label="Pour date" />);
    expect(screen.getByRole("grid", { name: "Pour date" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "March 2026" })).toBeInTheDocument();
    expect(screen.getByRole("columnheader", { name: "Monday" })).toBeInTheDocument();
  });

  it("[name] every day is announced in full, not as a bare number", () => {
    render(<Calendar locale={LOCALE} defaultMonth={MARCH} />);
    expect(dayButton(day(12))).toBeInTheDocument();
  });

  it("[keyboard] only one day is a tab stop, as the grid pattern asks", async () => {
    const user = userEvent.setup();
    render(<Calendar locale={LOCALE} defaultMonth={MARCH} defaultValue={day(12)} />);

    const stops = screen
      .getAllByRole("button")
      .filter(
        (button) => button.tabIndex === 0 && /2026/.test(button.getAttribute("aria-label") ?? ""),
      );
    expect(stops).toHaveLength(1);

    await user.tab();
    await user.tab();
    await user.tab();
    expect(dayButton(day(12))).toHaveFocus();
  });

  it("[keyboard] arrows move by day and by week", async () => {
    const user = userEvent.setup();
    render(<Calendar locale={LOCALE} defaultMonth={MARCH} defaultValue={day(12)} />);

    dayButton(day(12)).focus();
    await user.keyboard("{ArrowRight}");
    expect(dayButton(day(13))).toHaveFocus();

    await user.keyboard("{ArrowDown}");
    expect(dayButton(day(20))).toHaveFocus();

    await user.keyboard("{ArrowLeft}{ArrowUp}");
    expect(dayButton(day(12))).toHaveFocus();
  });

  it("[keyboard] Home and End reach the ends of the week", async () => {
    const user = userEvent.setup();
    render(<Calendar locale={LOCALE} defaultMonth={MARCH} defaultValue={day(12)} />);

    dayButton(day(12)).focus();
    await user.keyboard("{Home}");
    expect(dayButton(day(9))).toHaveFocus();

    await user.keyboard("{End}");
    expect(dayButton(day(15))).toHaveFocus();
  });

  it("[keyboard] Page Up and Page Down change month, with Shift for a year", async () => {
    const user = userEvent.setup();
    const onMonthChange = vi.fn();
    render(
      <Calendar
        locale={LOCALE}
        defaultMonth={MARCH}
        defaultValue={day(12)}
        onMonthChange={onMonthChange}
      />,
    );

    dayButton(day(12)).focus();
    await user.keyboard("{PageDown}");
    expect(screen.getByRole("heading", { name: "April 2026" })).toBeInTheDocument();
    expect(dayButton(new Date(2026, 3, 12))).toHaveFocus();

    await user.keyboard("{Shift>}{PageUp}{/Shift}");
    expect(screen.getByRole("heading", { name: "April 2025" })).toBeInTheDocument();
    expect(onMonthChange).toHaveBeenCalled();
  });

  it("[keyboard] arrowing past the end of the month brings the next one into view", async () => {
    const user = userEvent.setup();
    render(<Calendar locale={LOCALE} defaultMonth={MARCH} defaultValue={day(31)} />);

    dayButton(day(31)).focus();
    await user.keyboard("{ArrowRight}");
    expect(screen.getByRole("heading", { name: "April 2026" })).toBeInTheDocument();
    expect(dayButton(new Date(2026, 3, 1))).toHaveFocus();
  });

  it("[selection] choosing a day reports it and marks it selected", async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();
    render(<Calendar locale={LOCALE} defaultMonth={MARCH} onValueChange={onValueChange} />);

    await user.click(dayButton(day(18)));
    expect(onValueChange).toHaveBeenCalledWith(day(18));
    expect(dayCell(day(18))).toHaveAttribute("aria-selected", "true");
  });

  it("[today] the current day is marked with aria-current", () => {
    render(<Calendar locale={LOCALE} />);
    expect(dayButton(new Date())).toHaveAttribute("aria-current", "date");
  });

  it("[limits] days outside the range cannot be chosen", async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();
    render(
      <Calendar
        locale={LOCALE}
        defaultMonth={MARCH}
        min={day(10)}
        max={day(20)}
        onValueChange={onValueChange}
      />,
    );

    const early = dayButton(day(2));
    expect(early).toHaveAttribute("aria-disabled", "true");
    await user.click(early);
    expect(onValueChange).not.toHaveBeenCalled();

    await user.click(dayButton(day(11)));
    expect(onValueChange).toHaveBeenCalledWith(day(11));
  });

  it("[limits] individual days can be ruled out", () => {
    render(
      <Calendar
        locale={LOCALE}
        defaultMonth={MARCH}
        isDateDisabled={(date) => date.getDay() === 0}
      />,
    );
    expect(dayButton(day(8))).toHaveAttribute("aria-disabled", "true");
    expect(dayButton(day(9))).not.toHaveAttribute("aria-disabled");
  });

  it("[navigation] the arrows move month and the heading announces it", async () => {
    const user = userEvent.setup();
    render(<Calendar locale={LOCALE} defaultMonth={MARCH} />);

    const heading = screen.getByRole("heading", { name: "March 2026" });
    expect(heading).toHaveAttribute("aria-live", "polite");

    await user.click(screen.getByRole("button", { name: "Next month" }));
    expect(screen.getByRole("heading", { name: "April 2026" })).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Previous month" }));
    await user.click(screen.getByRole("button", { name: "Previous month" }));
    expect(screen.getByRole("heading", { name: "February 2026" })).toBeInTheDocument();
  });

  it("[weekStartsOn] the week can start on Sunday instead", () => {
    render(<Calendar locale={LOCALE} defaultMonth={MARCH} weekStartsOn={0} />);
    const [first] = screen.getAllByRole("columnheader");
    expect(first).toHaveTextContent("Sunday");
  });

  it("[controlled] the month and the value can both be held outside", () => {
    const { rerender } = render(<Calendar locale={LOCALE} month={MARCH} value={day(4)} />);
    expect(screen.getByRole("heading", { name: "March 2026" })).toBeInTheDocument();

    rerender(
      <Calendar locale={LOCALE} month={new Date(2026, 5, 1)} value={new Date(2026, 5, 4)} />,
    );
    expect(screen.getByRole("heading", { name: "June 2026" })).toBeInTheDocument();
    expect(dayCell(new Date(2026, 5, 4))).toHaveAttribute("aria-selected", "true");
  });
});
