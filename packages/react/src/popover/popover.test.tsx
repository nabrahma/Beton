import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { expectNoAxeViolations } from "../../test/a11y.ts";
import { Popover } from "./popover.tsx";

function Example() {
  return (
    <div>
      <button type="button">Before</button>
      <Popover>
        <Popover.Trigger>Share</Popover.Trigger>
        <Popover.Content showClose>
          <Popover.Title>Share this page</Popover.Title>
          <Popover.Description>Anyone with the link can view it.</Popover.Description>
          <button type="button">Copy link</button>
        </Popover.Content>
      </Popover>
      <button type="button">After</button>
    </div>
  );
}

describe("Popover", () => {
  it("[axe] has no violations closed or open", async () => {
    const user = userEvent.setup();
    const { container } = render(<Example />);
    await expectNoAxeViolations(container);

    await user.click(screen.getByRole("button", { name: "Share" }));
    await screen.findByRole("dialog");
    await expectNoAxeViolations(document.body);
  });

  it("[name] the trigger reports its expanded state and the popup is named", async () => {
    const user = userEvent.setup();
    render(<Example />);
    const trigger = screen.getByRole("button", { name: "Share" });
    expect(trigger).toHaveAttribute("aria-expanded", "false");

    await user.click(trigger);
    expect(await screen.findByRole("dialog")).toHaveAccessibleName("Share this page");
    expect(trigger).toHaveAttribute("aria-expanded", "true");
  });

  it("[keyboard] opens with Enter and moves focus into the popup", async () => {
    const user = userEvent.setup();
    render(<Example />);
    await user.tab();
    await user.tab();
    expect(screen.getByRole("button", { name: "Share" })).toHaveFocus();

    await user.keyboard("{Enter}");
    const popup = await screen.findByRole("dialog");
    await waitFor(() => expect(popup.contains(document.activeElement)).toBe(true));
  });

  it("[keyboard] Escape closes it and returns focus to the trigger", async () => {
    const user = userEvent.setup();
    render(<Example />);
    const trigger = screen.getByRole("button", { name: "Share" });

    await user.click(trigger);
    await screen.findByRole("dialog");
    await user.keyboard("{Escape}");

    await waitFor(() => expect(screen.queryByRole("dialog")).not.toBeInTheDocument());
    await waitFor(() => expect(trigger).toHaveFocus());
  });

  it("closes when clicking outside", async () => {
    const user = userEvent.setup();
    render(<Example />);
    await user.click(screen.getByRole("button", { name: "Share" }));
    await screen.findByRole("dialog");

    await user.click(screen.getByRole("button", { name: "After" }));
    await waitFor(() => expect(screen.queryByRole("dialog")).not.toBeInTheDocument());
  });

  it("leaves the rest of the page usable, unlike a modal dialog", async () => {
    const user = userEvent.setup();
    render(<Example />);
    await user.click(screen.getByRole("button", { name: "Share" }));
    await screen.findByRole("dialog");

    expect(screen.getByRole("button", { name: "Before" })).toBeInTheDocument();
  });
});
