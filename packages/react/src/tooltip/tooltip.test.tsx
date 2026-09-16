import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { expectNoAxeViolations } from "../../test/a11y.ts";
import { Button } from "../button/button.tsx";
import { Tooltip } from "./tooltip.tsx";

function Example() {
  return (
    <>
      <Tooltip content="Copy to clipboard" delay={0}>
        <Button iconOnly aria-label="Copy to clipboard">
          <span aria-hidden="true">C</span>
        </Button>
      </Tooltip>
      <button type="button">Next</button>
    </>
  );
}

describe("Tooltip", () => {
  it("[axe] has no violations closed or open", async () => {
    const user = userEvent.setup();
    const { container } = render(<Example />);
    await expectNoAxeViolations(container);

    await user.hover(screen.getByRole("button", { name: "Copy to clipboard" }));
    await screen.findByText("Copy to clipboard", { selector: "div" });
    await expectNoAxeViolations(document.body);
  });

  it("[name] the trigger carries its own name, so the tooltip is never the only source", () => {
    render(<Example />);
    // The tooltip is visual only: it adds no role and no description.
    expect(screen.getByRole("button", { name: "Copy to clipboard" })).toBeInTheDocument();
    expect(screen.queryByRole("tooltip")).not.toBeInTheDocument();
  });

  it("[keyboard] appears on focus", async () => {
    const user = userEvent.setup();
    render(<Example />);

    await user.tab();
    expect(screen.getByRole("button", { name: "Copy to clipboard" })).toHaveFocus();
    await waitFor(() =>
      expect(screen.getByText("Copy to clipboard", { selector: "div" })).toBeVisible(),
    );
  });

  it("[keyboard] Escape dismisses it while the trigger keeps focus", async () => {
    const user = userEvent.setup();
    render(<Example />);
    await user.tab();
    await screen.findByText("Copy to clipboard", { selector: "div" });

    await user.keyboard("{Escape}");
    await waitFor(() =>
      expect(screen.queryByText("Copy to clipboard", { selector: "div" })).not.toBeInTheDocument(),
    );
    expect(screen.getByRole("button", { name: "Copy to clipboard" })).toHaveFocus();
  });

  it("appears on hover and hides when focus moves on", async () => {
    const user = userEvent.setup();
    render(<Example />);
    const trigger = screen.getByRole("button", { name: "Copy to clipboard" });

    await user.hover(trigger);
    await screen.findByText("Copy to clipboard", { selector: "div" });

    await user.tab();
    await user.tab();
    await waitFor(() =>
      expect(screen.queryByText("Copy to clipboard", { selector: "div" })).not.toBeInTheDocument(),
    );
  });
});
