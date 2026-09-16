import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { expectNoAxeViolations } from "../../test/a11y.ts";
import { ScrollArea } from "./scroll-area.tsx";

describe("ScrollArea", () => {
  it("[axe] has no violations", async () => {
    const { container } = render(
      <div>
        <ScrollArea label="Release notes" style={{ height: 120 }}>
          <p>A long passage of text.</p>
        </ScrollArea>
        <ScrollArea label="Wide table" horizontal style={{ height: 120 }}>
          <p>Something wide.</p>
        </ScrollArea>
      </div>,
    );
    await expectNoAxeViolations(container);
  });

  it("[keyboard] the scrolling region is focusable, as a scrollable region must be", async () => {
    const user = userEvent.setup();
    render(
      <ScrollArea label="Release notes" style={{ height: 120 }}>
        <p>A long passage of text.</p>
      </ScrollArea>,
    );

    await user.tab();
    const region = screen.getByRole("group", { name: "Release notes" });
    expect(region).toHaveFocus();
    expect(region).toHaveAttribute("tabindex", "0");
  });

  it("[structure] puts the content inside the scrolling viewport", () => {
    const { container } = render(
      <ScrollArea label="Notes">
        <p>Text</p>
      </ScrollArea>,
    );
    const viewport = screen.getByRole("group", { name: "Notes" });
    expect(viewport.contains(screen.getByText("Text"))).toBe(true);
    expect(container.firstElementChild).not.toBe(viewport);
  });

  // The scrollbars themselves only mount once there is something to scroll,
  // which needs real layout: they are covered by the browser tests.
});
