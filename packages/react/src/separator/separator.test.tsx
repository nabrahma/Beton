import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { expectNoAxeViolations } from "../../test/a11y.ts";
import { Separator } from "./separator.tsx";

describe("Separator", () => {
  it("[axe] has no violations decorative or semantic, in both orientations", async () => {
    const { container } = render(
      <div>
        <Separator />
        <Separator decorative={false} />
        <div>
          <Separator orientation="vertical" decorative={false} size="lg" />
        </div>
      </div>,
    );
    await expectNoAxeViolations(container);
  });

  it("[name] decorative separators are hidden; semantic ones expose orientation", () => {
    render(
      <>
        <Separator data-testid="decorative" />
        <Separator decorative={false} orientation="vertical" />
      </>,
    );
    expect(screen.getByTestId("decorative")).toHaveAttribute("role", "none");
    expect(screen.getByRole("separator")).toHaveAttribute("aria-orientation", "vertical");
  });

  it("[keyboard] is never focusable", async () => {
    const user = userEvent.setup();
    render(
      <>
        <Separator decorative={false} />
        <button type="button">After</button>
      </>,
    );
    await user.tab();
    expect(screen.getByRole("button")).toHaveFocus();
  });
});
