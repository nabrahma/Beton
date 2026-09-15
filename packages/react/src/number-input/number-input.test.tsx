import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { expectNoAxeViolations } from "../../test/a11y.ts";
import { NumberInput } from "./number-input.tsx";

describe("NumberInput", () => {
  it("[axe] has no violations in every size and state", async () => {
    const { container } = render(
      <div>
        <NumberInput label="Quantity" defaultValue={1} size="sm" />
        <NumberInput aria-label="Seats" defaultValue={5} min={1} max={10} />
        <NumberInput label="Disabled" defaultValue={3} disabled size="lg" />
      </div>,
    );
    await expectNoAxeViolations(container);
  });

  it("[name] the input and both steppers are named", () => {
    render(<NumberInput label="Quantity" defaultValue={1} />);
    expect(screen.getByRole("textbox", { name: "Quantity" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Decrease" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Increase" })).toBeInTheDocument();
  });

  it("[keyboard] arrow keys step within min and max", async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();
    render(
      <NumberInput label="Seats" defaultValue={9} min={1} max={10} onValueChange={onValueChange} />,
    );

    await user.tab();
    const input = screen.getByRole("textbox", { name: "Seats" });
    expect(input).toHaveFocus();

    await user.keyboard("{ArrowUp}");
    expect(input).toHaveValue("10");
    await user.keyboard("{ArrowUp}");
    expect(input).toHaveValue("10");
    await user.keyboard("{ArrowDown}");
    expect(input).toHaveValue("9");
    expect(onValueChange).toHaveBeenCalled();
  });

  it("[keyboard] the stepper buttons change the value", async () => {
    const user = userEvent.setup();
    render(<NumberInput label="Guests" defaultValue={2} />);
    await user.click(screen.getByRole("button", { name: "Increase" }));
    expect(screen.getByRole("textbox", { name: "Guests" })).toHaveValue("3");
    await user.click(screen.getByRole("button", { name: "Decrease" }));
    await user.click(screen.getByRole("button", { name: "Decrease" }));
    expect(screen.getByRole("textbox", { name: "Guests" })).toHaveValue("1");
  });

  it("[focus] the group shows the focus ring while the input is focused", () => {
    const { container } = render(<NumberInput label="Ring" defaultValue={1} />);
    const group =
      container.querySelector("[role='group']") ?? screen.getByRole("textbox").parentElement;
    expect(group?.className).toContain("has-focus-visible:ring-focus-gap");
  });
});
