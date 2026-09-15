import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { expectNoAxeViolations } from "../../test/a11y.ts";
import { Label } from "./label.tsx";

describe("Label", () => {
  it("[axe] has no violations", async () => {
    const { container } = render(
      <div>
        <Label htmlFor="a" required>
          Email
        </Label>
        <input id="a" required />
        <Label htmlFor="b" disabled>
          Disabled
        </Label>
        <input id="b" disabled />
      </div>,
    );
    await expectNoAxeViolations(container);
  });

  it("[name] the required marker is not part of the accessible name", () => {
    render(
      <>
        <Label htmlFor="email" required>
          Email
        </Label>
        <input id="email" required />
      </>,
    );
    expect(screen.getByRole("textbox", { name: "Email" })).toBeRequired();
  });

  it("[keyboard] clicking the label focuses its control", async () => {
    const user = userEvent.setup();
    render(
      <>
        <Label htmlFor="city">City</Label>
        <input id="city" />
      </>,
    );
    await user.click(screen.getByText("City"));
    expect(screen.getByRole("textbox", { name: "City" })).toHaveFocus();
  });
});
