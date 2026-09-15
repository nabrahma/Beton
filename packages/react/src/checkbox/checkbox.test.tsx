import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { expectNoAxeViolations } from "../../test/a11y.ts";
import { Checkbox } from "./checkbox.tsx";

describe("Checkbox", () => {
  it("[axe] has no violations in every variant, size and state", async () => {
    const { container } = render(
      <div>
        {(["primary", "secondary", "danger"] as const).map((variant) =>
          (["sm", "md", "lg"] as const).map((size) => (
            <label key={`${variant}-${size}`}>
              <Checkbox variant={variant} size={size} defaultChecked />
              {variant} {size}
            </label>
          )),
        )}
        <label>
          <Checkbox indeterminate />
          Some selected
        </label>
        <label>
          <Checkbox disabled defaultChecked />
          Disabled
        </label>
      </div>,
    );
    await expectNoAxeViolations(container);
  });

  it("[name] takes its name from a wrapping label", () => {
    render(
      <label>
        <Checkbox />
        Accept terms
      </label>,
    );
    expect(screen.getByRole("checkbox", { name: "Accept terms" })).toBeInTheDocument();
  });

  it("[name] accepts aria-label when there is no visible text", () => {
    render(<Checkbox aria-label="Select row" />);
    expect(screen.getByRole("checkbox", { name: "Select row" })).toBeInTheDocument();
  });

  it("[keyboard] toggles with Space and reports the change", async () => {
    const user = userEvent.setup();
    const onCheckedChange = vi.fn();
    render(<Checkbox aria-label="Subscribe" onCheckedChange={onCheckedChange} />);

    await user.tab();
    const box = screen.getByRole("checkbox", { name: "Subscribe" });
    expect(box).toHaveFocus();
    expect(box).toHaveAttribute("aria-checked", "false");

    await user.keyboard(" ");
    expect(box).toHaveAttribute("aria-checked", "true");
    expect(box).toHaveAttribute("data-checked");
    expect(onCheckedChange).toHaveBeenLastCalledWith(true, expect.anything());

    await user.keyboard(" ");
    expect(box).toHaveAttribute("aria-checked", "false");
  });

  it("[keyboard] clicking the label toggles it", async () => {
    const user = userEvent.setup();
    render(
      <label>
        <Checkbox />
        Remember me
      </label>,
    );
    await user.click(screen.getByText("Remember me"));
    expect(screen.getByRole("checkbox")).toHaveAttribute("aria-checked", "true");
  });

  it("[keyboard] disabled checkboxes are skipped and cannot be toggled", async () => {
    const user = userEvent.setup();
    render(
      <>
        <Checkbox aria-label="Locked" disabled />
        <Checkbox aria-label="Open" />
      </>,
    );
    await user.tab();
    expect(screen.getByRole("checkbox", { name: "Open" })).toHaveFocus();
    await user.click(screen.getByRole("checkbox", { name: "Locked" }));
    expect(screen.getByRole("checkbox", { name: "Locked" })).toHaveAttribute(
      "aria-checked",
      "false",
    );
  });

  it("[name] exposes the indeterminate state as mixed", () => {
    render(<Checkbox aria-label="All rows" indeterminate />);
    expect(screen.getByRole("checkbox")).toHaveAttribute("aria-checked", "mixed");
  });

  it("[focus] renders the two-tone focus ring and a 44px hit area", () => {
    render(<Checkbox aria-label="Ring" size="sm" />);
    const { className } = screen.getByRole("checkbox");
    expect(className).toContain("focus-visible:ring-focus-gap");
    expect(className).toContain("after:-inset-3");
  });

  it("submits with a form", async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn((event: SubmitEvent) => event.preventDefault());
    render(
      <form onSubmit={(e) => onSubmit(e.nativeEvent)}>
        <label>
          <Checkbox name="newsletter" value="yes" />
          Newsletter
        </label>
        <button type="submit">Send</button>
      </form>,
    );
    await user.click(screen.getByText("Newsletter"));
    await user.click(screen.getByRole("button", { name: "Send" }));
    const form = screen.getByRole("button", { name: "Send" }).closest("form") as HTMLFormElement;
    expect(new FormData(form).get("newsletter")).toBe("yes");
  });
});
