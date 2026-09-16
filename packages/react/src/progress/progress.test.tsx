import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { expectNoAxeViolations } from "../../test/a11y.ts";
import { Progress } from "./progress.tsx";

describe("Progress", () => {
  it("[axe] has no violations in any variant or size", async () => {
    const { container } = render(
      <div>
        {(["primary", "secondary", "success", "danger"] as const).map((variant) =>
          (["sm", "md", "lg"] as const).map((size) => (
            <Progress
              key={variant + size}
              variant={variant}
              size={size}
              value={40}
              label={variant + " " + size}
            />
          )),
        )}
        <Progress value={null} aria-label="Working" />
      </div>,
    );
    await expectNoAxeViolations(container);
  });

  it("[aria] reports its value on a progressbar", () => {
    render(<Progress value={40} label="Upload" />);
    const bar = screen.getByRole("progressbar", { name: "Upload" });
    expect(bar).toHaveAttribute("aria-valuenow", "40");
    expect(bar).toHaveAttribute("aria-valuemin", "0");
    expect(bar).toHaveAttribute("aria-valuemax", "100");
  });

  it("[aria] an unknown value is announced as indeterminate", () => {
    render(<Progress value={null} aria-label="Working" />);
    const bar = screen.getByRole("progressbar", { name: "Working" });
    expect(bar).not.toHaveAttribute("aria-valuenow");
    expect(bar).toHaveAttribute("data-indeterminate");
  });

  it("[value] shows the percentage beside the label, and can be told not to", () => {
    const { rerender } = render(<Progress value={40} label="Upload" />);
    expect(screen.getByText("40%")).toBeInTheDocument();

    rerender(<Progress value={40} label="Upload" showValue={false} />);
    expect(screen.queryByText("40%")).toBeNull();
  });

  it("[state] says when it is complete", () => {
    render(<Progress value={100} label="Upload" />);
    expect(screen.getByRole("progressbar", { name: "Upload" })).toHaveAttribute("data-complete");
  });
});
