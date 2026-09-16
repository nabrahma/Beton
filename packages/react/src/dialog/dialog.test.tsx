import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { expectNoAxeViolations } from "../../test/a11y.ts";
import { Button } from "../button/button.tsx";
import { Input } from "../input/input.tsx";
import { Dialog } from "./dialog.tsx";

function Example({ onOpenChange }: { onOpenChange?: (open: boolean) => void } = {}) {
  return (
    <div>
      <button type="button">Outside before</button>
      <Dialog onOpenChange={onOpenChange}>
        <Dialog.Trigger>Invite people</Dialog.Trigger>
        <Dialog.Content>
          <Dialog.Header>
            <Dialog.Title>Invite people</Dialog.Title>
            <Dialog.Description>They will receive an email.</Dialog.Description>
          </Dialog.Header>
          <Dialog.Body>
            <Input aria-label="Email" />
          </Dialog.Body>
          <Dialog.Footer>
            <Dialog.Close>Cancel</Dialog.Close>
            <Button>Send invites</Button>
          </Dialog.Footer>
        </Dialog.Content>
      </Dialog>
      <button type="button">Outside after</button>
    </div>
  );
}

describe("Dialog", () => {
  it("[axe] has no violations closed or open", async () => {
    const user = userEvent.setup();
    const { container } = render(<Example />);
    await expectNoAxeViolations(container);

    await user.click(screen.getByRole("button", { name: "Invite people" }));
    await screen.findByRole("dialog");
    await expectNoAxeViolations(document.body);
  });

  it("[name] is a modal dialog named by its title and described by its description", async () => {
    const user = userEvent.setup();
    render(<Example />);
    await user.click(screen.getByRole("button", { name: "Invite people" }));

    const dialog = await screen.findByRole("dialog");
    expect(dialog).toHaveAccessibleName("Invite people");
    expect(dialog).toHaveAccessibleDescription("They will receive an email.");
  });

  it("[keyboard] traps focus inside while open", async () => {
    const user = userEvent.setup();
    render(<Example />);
    // Captured before opening: while open they are inert and unreachable by role.
    const before = screen.getByRole("button", { name: "Outside before" });
    const after = screen.getByRole("button", { name: "Outside after" });

    await user.click(screen.getByRole("button", { name: "Invite people" }));
    const dialog = await screen.findByRole("dialog");
    await waitFor(() => expect(dialog.contains(document.activeElement)).toBe(true));

    // Tabbing past the last control wraps back to the first. A tab that leaves
    // the dialog lands on a focus guard, and the guard hands focus back on a
    // later tick, so what is asserted is where focus settles, not where the key
    // press first puts it.
    const visited: string[] = [];
    for (let i = 0; i < 12; i++) {
      await user.tab();
      await waitFor(() => expect(dialog.contains(document.activeElement)).toBe(true));
      const active = document.activeElement as HTMLElement;
      // The popup itself can hold focus for a moment while the guard hands it on.
      if (active !== dialog) {
        visited.push(active.getAttribute("aria-label") ?? active.textContent?.trim() ?? "");
      }
      expect(before).not.toHaveFocus();
      expect(after).not.toHaveFocus();
    }

    // Every control inside is reached, and the order wraps around.
    for (const name of ["Email", "Cancel", "Send invites", "Close dialog"]) {
      expect(visited).toContain(name);
    }
    // Something was focused twice, which only happens if the order wrapped.
    expect(visited.length).toBeGreaterThan(new Set(visited).size);
  });

  it("[keyboard] Escape closes it and returns focus to the trigger", async () => {
    const user = userEvent.setup();
    const onOpenChange = vi.fn();
    render(<Example onOpenChange={onOpenChange} />);
    const trigger = screen.getByRole("button", { name: "Invite people" });

    await user.click(trigger);
    await screen.findByRole("dialog");
    await user.keyboard("{Escape}");

    await waitFor(() => expect(screen.queryByRole("dialog")).not.toBeInTheDocument());
    await waitFor(() => expect(trigger).toHaveFocus());
    expect(onOpenChange).toHaveBeenLastCalledWith(false, expect.anything());
  });

  it("[keyboard] the close button dismisses it", async () => {
    const user = userEvent.setup();
    render(<Example />);
    await user.click(screen.getByRole("button", { name: "Invite people" }));
    await screen.findByRole("dialog");

    await user.click(screen.getByRole("button", { name: "Close dialog" }));
    await waitFor(() => expect(screen.queryByRole("dialog")).not.toBeInTheDocument());
  });

  it("makes the rest of the page inert while open", async () => {
    const user = userEvent.setup();
    render(<Example />);
    const outside = screen.getByRole("button", { name: "Outside before" });

    await user.click(screen.getByRole("button", { name: "Invite people" }));
    await screen.findByRole("dialog");

    await waitFor(() => {
      const hidden = outside.closest("[aria-hidden='true'], [inert]");
      expect(hidden).not.toBeNull();
    });
  });

  it("closes when the backdrop is clicked", async () => {
    const user = userEvent.setup();
    render(<Example />);
    await user.click(screen.getByRole("button", { name: "Invite people" }));
    const dialog = await screen.findByRole("dialog");

    await user.click(dialog.parentElement as HTMLElement);
    await waitFor(() => expect(screen.queryByRole("dialog")).not.toBeInTheDocument());
  });
});
