import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { expectNoAxeViolations } from "../../test/a11y.ts";
import { Button } from "../button/button.tsx";
import { Alert } from "./alert.tsx";

describe("Alert", () => {
  it("[axe] has no violations in any variant or size", async () => {
    const { container } = render(
      <div>
        {(["info", "success", "warning", "danger"] as const).map((variant) =>
          (["sm", "md", "lg"] as const).map((size) => (
            <Alert key={variant + size} variant={variant} size={size} title={variant}>
              Something worth saying.
            </Alert>
          )),
        )}
      </div>,
    );
    await expectNoAxeViolations(container);
  });

  it("[aria] a danger banner interrupts, the rest wait their turn", () => {
    const { rerender } = render(<Alert title="Saved">All good.</Alert>);
    expect(screen.getByRole("status")).toHaveAttribute("aria-live", "polite");

    rerender(
      <Alert variant="danger" title="Failed">
        Try again.
      </Alert>,
    );
    expect(screen.getByRole("alert")).toHaveAttribute("aria-live", "assertive");
  });

  it("[aria] can be told not to announce itself at all", () => {
    render(
      <Alert live="off" title="Context">
        Just here for reference.
      </Alert>,
    );
    expect(screen.getByRole("status")).toHaveAttribute("aria-live", "off");
  });

  it("[content] carries a title, a body, actions and a way out", () => {
    render(
      <Alert
        title="Update available"
        actions={<Button size="sm">Reload</Button>}
        onClose={<Button size="sm" variant="ghost" aria-label="Dismiss" iconOnly />}
      >
        A new version is ready.
      </Alert>,
    );
    expect(screen.getByText("Update available")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Reload" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Dismiss" })).toBeInTheDocument();
  });

  it("[state] exposes the variant as a data attribute", () => {
    const { container } = render(<Alert variant="warning" title="Careful" />);
    expect(container.firstElementChild).toHaveAttribute("data-variant", "warning");
  });
});
