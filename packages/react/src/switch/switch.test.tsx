import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { expectNoAxeViolations } from "../../test/a11y.ts";
import { Switch } from "./switch.tsx";

describe("Switch", () => {
  it("[axe] has no violations in every variant, size and state", async () => {
    const { container } = render(
      <div>
        {(["primary", "secondary", "danger"] as const).map((variant) =>
          (["sm", "md", "lg"] as const).map((size) => (
            <label key={`${variant}-${size}`}>
              <Switch variant={variant} size={size} defaultChecked={size === "md"} />
              {variant} {size}
            </label>
          )),
        )}
        <label>
          <Switch disabled />
          Disabled
        </label>
      </div>,
    );
    await expectNoAxeViolations(container);
  });

  it("[name] is a switch named by its label", () => {
    render(
      <label>
        <Switch />
        Airplane mode
      </label>,
    );
    expect(screen.getByRole("switch", { name: "Airplane mode" })).toBeInTheDocument();
  });

  it("[keyboard] toggles with Space and Enter", async () => {
    const user = userEvent.setup();
    const onCheckedChange = vi.fn();
    render(<Switch aria-label="Dark roast" onCheckedChange={onCheckedChange} />);

    await user.tab();
    const control = screen.getByRole("switch", { name: "Dark roast" });
    expect(control).toHaveFocus();

    await user.keyboard(" ");
    expect(control).toHaveAttribute("aria-checked", "true");
    await user.keyboard("{Enter}");
    expect(control).toHaveAttribute("aria-checked", "false");
    expect(onCheckedChange).toHaveBeenCalledTimes(2);
  });

  it("[keyboard] disabled switches cannot be toggled", async () => {
    const user = userEvent.setup();
    render(<Switch aria-label="Locked" disabled />);
    await user.click(screen.getByRole("switch"));
    expect(screen.getByRole("switch")).toHaveAttribute("aria-checked", "false");
  });

  it("[motion] the thumb stops animating under reduced motion", () => {
    const { container } = render(<Switch aria-label="Motion" />);
    const thumb = container.querySelector("[role='switch'] > span");
    expect(thumb?.className).toContain("motion-reduce:transition-none");
  });

  it("[focus] renders the focus ring and a 44px hit area", () => {
    render(<Switch aria-label="Ring" size="sm" />);
    const { className } = screen.getByRole("switch");
    expect(className).toContain("focus-visible:ring-focus-gap");
    expect(className).toContain("after:-inset-y-2.5");
  });
});
