import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { expectNoAxeViolations } from "../../test/a11y.ts";
import { Sheet } from "./sheet.tsx";

function Example(props: { side?: "left" | "right" | "top" | "bottom" }) {
  return (
    <Sheet side={props.side}>
      <Sheet.Trigger>Open filters</Sheet.Trigger>
      <Sheet.Content>
        <Sheet.Header>
          <Sheet.Title>Filters</Sheet.Title>
          <Sheet.Description>Narrow the results.</Sheet.Description>
        </Sheet.Header>
        <Sheet.Body>
          <button type="button">Reset</button>
        </Sheet.Body>
        <Sheet.Footer>
          <Sheet.Close>Done</Sheet.Close>
        </Sheet.Footer>
      </Sheet.Content>
    </Sheet>
  );
}

describe("Sheet", () => {
  it("[axe] has no violations open, on every side", async () => {
    const user = userEvent.setup();
    for (const side of ["left", "right", "top", "bottom"] as const) {
      const view = render(<Example side={side} />);
      await user.click(screen.getByRole("button", { name: "Open filters" }));
      await screen.findByRole("dialog");
      await expectNoAxeViolations(document.body);
      await user.keyboard("{Escape}");
      await waitFor(() => expect(screen.queryByRole("dialog")).not.toBeInTheDocument());
      view.unmount();
    }
  });

  it("[name] is a dialog named by its title", async () => {
    const user = userEvent.setup();
    render(<Example />);
    await user.click(screen.getByRole("button", { name: "Open filters" }));
    expect(await screen.findByRole("dialog")).toHaveAccessibleName("Filters");
  });

  it("[keyboard] Escape closes it and focus returns to the trigger", async () => {
    const user = userEvent.setup();
    render(<Example />);
    const trigger = screen.getByRole("button", { name: "Open filters" });

    await user.click(trigger);
    await screen.findByRole("dialog");
    await user.keyboard("{Escape}");

    await waitFor(() => expect(screen.queryByRole("dialog")).not.toBeInTheDocument());
    await waitFor(() => expect(trigger).toHaveFocus());
  });

  it("[keyboard] focus moves into the panel when it opens", async () => {
    const user = userEvent.setup();
    render(<Example />);
    await user.click(screen.getByRole("button", { name: "Open filters" }));
    const panel = await screen.findByRole("dialog");
    await waitFor(() => expect(panel.contains(document.activeElement)).toBe(true));
  });

  it("anchors to the chosen side", async () => {
    const user = userEvent.setup();
    render(<Example side="left" />);
    await user.click(screen.getByRole("button", { name: "Open filters" }));
    expect(await screen.findByRole("dialog")).toHaveClass("left-0");
  });
});
