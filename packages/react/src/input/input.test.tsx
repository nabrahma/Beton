import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { expectNoAxeViolations } from "../../test/a11y.ts";
import { Label } from "../label/label.tsx";
import { Input } from "./input.tsx";

describe("Input", () => {
  it("[axe] has no violations in every size and state", async () => {
    const { container } = render(
      <form>
        {(["sm", "md", "lg"] as const).map((size) => (
          <div key={size}>
            <Label htmlFor={`name-${size}`}>Name {size}</Label>
            <Input id={`name-${size}`} size={size} />
          </div>
        ))}
        <Label htmlFor="disabled">Disabled</Label>
        <Input id="disabled" disabled />
        <Label htmlFor="invalid">Invalid</Label>
        <Input id="invalid" aria-invalid="true" />
      </form>,
    );
    await expectNoAxeViolations(container);
  });

  it("[name] is named by its label", () => {
    render(
      <>
        <Label htmlFor="email">Email</Label>
        <Input id="email" type="email" />
      </>,
    );
    expect(screen.getByRole("textbox", { name: "Email" })).toBeInTheDocument();
  });

  it("[keyboard] receives focus with Tab and accepts typing", async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();
    render(<Input aria-label="Search" onValueChange={onValueChange} />);
    await user.tab();
    const input = screen.getByRole("textbox", { name: "Search" });
    expect(input).toHaveFocus();
    await user.keyboard("béton");
    expect(input).toHaveValue("béton");
    expect(onValueChange).toHaveBeenLastCalledWith("béton", expect.anything());
  });

  it("[keyboard] disabled inputs are skipped", async () => {
    const user = userEvent.setup();
    render(
      <>
        <Input aria-label="Disabled" disabled />
        <Input aria-label="Enabled" />
      </>,
    );
    await user.tab();
    expect(screen.getByRole("textbox", { name: "Enabled" })).toHaveFocus();
  });

  it("separates the visual size from the native size attribute", () => {
    render(<Input aria-label="Code" size="lg" htmlSize={6} />);
    const input = screen.getByRole("textbox");
    expect(input).toHaveAttribute("data-size", "lg");
    expect(input).toHaveAttribute("size", "6");
  });
});
