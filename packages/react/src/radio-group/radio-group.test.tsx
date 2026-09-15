import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { expectNoAxeViolations } from "../../test/a11y.ts";
import { RadioGroup } from "./radio-group.tsx";

function Plans(props: Partial<Parameters<typeof RadioGroup>[0]>) {
  return (
    <>
      <p id="plan-label">Plan</p>
      <RadioGroup aria-labelledby="plan-label" defaultValue="team" {...props}>
        <RadioGroup.Item value="free">Free</RadioGroup.Item>
        <RadioGroup.Item value="team">Team</RadioGroup.Item>
        <RadioGroup.Item value="legacy" disabled>
          Legacy
        </RadioGroup.Item>
        <RadioGroup.Item value="enterprise">Enterprise</RadioGroup.Item>
      </RadioGroup>
    </>
  );
}

describe("RadioGroup", () => {
  it("[axe] has no violations in every variant, size and orientation", async () => {
    const { container } = render(
      <div>
        {(["primary", "secondary", "danger"] as const).map((variant) => (
          <div key={variant}>
            <p id={`label-${variant}`}>{variant}</p>
            <RadioGroup
              aria-labelledby={`label-${variant}`}
              variant={variant}
              size={variant === "primary" ? "sm" : variant === "secondary" ? "md" : "lg"}
              orientation={variant === "danger" ? "horizontal" : "vertical"}
              defaultValue="a"
            >
              <RadioGroup.Item value="a">A</RadioGroup.Item>
              <RadioGroup.Item value="b">B</RadioGroup.Item>
            </RadioGroup>
          </div>
        ))}
      </div>,
    );
    await expectNoAxeViolations(container);
  });

  it("[name] the group and every option are named", () => {
    render(<Plans />);
    expect(screen.getByRole("radiogroup", { name: "Plan" })).toBeInTheDocument();
    expect(screen.getByRole("radio", { name: "Free" })).toBeInTheDocument();
    expect(screen.getByRole("radio", { name: "Team" })).toBeChecked();
  });

  it("[keyboard] Tab enters on the selected option and arrows move the selection", async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();
    render(<Plans onValueChange={onValueChange} />);

    await user.tab();
    expect(screen.getByRole("radio", { name: "Team" })).toHaveFocus();

    await user.keyboard("{ArrowDown}");
    // Legacy is disabled, so focus and selection skip to Enterprise.
    expect(screen.getByRole("radio", { name: "Enterprise" })).toHaveFocus();
    expect(screen.getByRole("radio", { name: "Enterprise" })).toBeChecked();
    expect(onValueChange).toHaveBeenLastCalledWith("enterprise", expect.anything());

    await user.keyboard("{ArrowUp}");
    expect(screen.getByRole("radio", { name: "Team" })).toBeChecked();
  });

  it("[keyboard] Tab leaves the group in a single stop", async () => {
    const user = userEvent.setup();
    render(
      <>
        <Plans />
        <button type="button">After</button>
      </>,
    );
    await user.tab();
    await user.tab();
    expect(screen.getByRole("button", { name: "After" })).toHaveFocus();
  });

  it("[keyboard] clicking a label selects its option", async () => {
    const user = userEvent.setup();
    render(<Plans />);
    await user.click(screen.getByText("Free"));
    expect(screen.getByRole("radio", { name: "Free" })).toBeChecked();
  });

  it("[focus] radios render the focus ring and hit area", () => {
    render(<Plans size="sm" />);
    const { className } = screen.getByRole("radio", { name: "Free" });
    expect(className).toContain("focus-visible:outline-3");
    expect(className).toContain("after:-inset-3");
  });
});
