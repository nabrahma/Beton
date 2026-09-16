import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { expectNoAxeViolations } from "../../test/a11y.ts";
import { DropdownMenu } from "./dropdown-menu.tsx";

function Example({ onDuplicate = () => {}, onDelete = () => {} }) {
  return (
    <DropdownMenu>
      <DropdownMenu.Trigger>Actions</DropdownMenu.Trigger>
      <DropdownMenu.Content>
        <DropdownMenu.Item onClick={onDuplicate} shortcut="Ctrl D">
          Duplicate
        </DropdownMenu.Item>
        <DropdownMenu.Item disabled>Move</DropdownMenu.Item>
        <DropdownMenu.Separator />
        <DropdownMenu.Item danger onClick={onDelete}>
          Delete
        </DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu>
  );
}

describe("DropdownMenu", () => {
  it("[axe] has no violations closed or open", async () => {
    const user = userEvent.setup();
    const { container } = render(<Example />);
    await expectNoAxeViolations(container);

    await user.click(screen.getByRole("button", { name: "Actions" }));
    await screen.findByRole("menu");
    await expectNoAxeViolations(document.body);
  });

  it("[name] the trigger reports expansion and the items are a menu", async () => {
    const user = userEvent.setup();
    render(<Example />);
    const trigger = screen.getByRole("button", { name: "Actions" });
    expect(trigger).toHaveAttribute("aria-expanded", "false");

    await user.click(trigger);
    expect(await screen.findByRole("menu")).toBeInTheDocument();
    expect(screen.getByRole("menuitem", { name: /Duplicate/ })).toBeInTheDocument();
    expect(trigger).toHaveAttribute("aria-expanded", "true");
  });

  it("[keyboard] opens with ArrowDown and moves through every item, disabled included", async () => {
    const user = userEvent.setup();
    const onDelete = vi.fn();
    render(<Example onDelete={onDelete} />);

    await user.tab();
    await user.keyboard("{ArrowDown}");
    await screen.findByRole("menu");
    await waitFor(() => expect(screen.getByRole("menuitem", { name: /Duplicate/ })).toHaveFocus());

    // Disabled items stay reachable so they can be discovered and announced,
    // but activating one does nothing.
    await user.keyboard("{ArrowDown}");
    const move = screen.getByRole("menuitem", { name: "Move" });
    expect(move).toHaveFocus();
    expect(move).toHaveAttribute("data-disabled");
    await user.keyboard("{Enter}");
    expect(screen.getByRole("menu")).toBeInTheDocument();

    await user.keyboard("{ArrowDown}");
    expect(screen.getByRole("menuitem", { name: "Delete" })).toHaveFocus();
    expect(onDelete).not.toHaveBeenCalled();
  });

  it("[keyboard] Enter runs the highlighted item and closes the menu", async () => {
    const user = userEvent.setup();
    const onDuplicate = vi.fn();
    render(<Example onDuplicate={onDuplicate} />);
    const trigger = screen.getByRole("button", { name: "Actions" });

    trigger.focus();
    await user.keyboard("{ArrowDown}");
    await screen.findByRole("menu");
    await waitFor(() => expect(screen.getByRole("menuitem", { name: /Duplicate/ })).toHaveFocus());
    await user.keyboard("{Enter}");

    expect(onDuplicate).toHaveBeenCalledOnce();
    await waitFor(() => expect(screen.queryByRole("menu")).not.toBeInTheDocument());
    await waitFor(() => expect(trigger).toHaveFocus());
  });

  it("[keyboard] Escape closes without running anything", async () => {
    const user = userEvent.setup();
    const onDelete = vi.fn();
    render(<Example onDelete={onDelete} />);
    const trigger = screen.getByRole("button", { name: "Actions" });

    await user.click(trigger);
    await screen.findByRole("menu");
    await user.keyboard("{Escape}");

    await waitFor(() => expect(screen.queryByRole("menu")).not.toBeInTheDocument());
    expect(onDelete).not.toHaveBeenCalled();
    await waitFor(() => expect(trigger).toHaveFocus());
  });

  it("supports checkbox and radio items", async () => {
    const user = userEvent.setup();
    render(
      <DropdownMenu>
        <DropdownMenu.Trigger>View</DropdownMenu.Trigger>
        <DropdownMenu.Content>
          <DropdownMenu.CheckboxItem defaultChecked>Show grid</DropdownMenu.CheckboxItem>
          <DropdownMenu.RadioGroup defaultValue="comfortable">
            <DropdownMenu.RadioItem value="compact">Compact</DropdownMenu.RadioItem>
            <DropdownMenu.RadioItem value="comfortable">Comfortable</DropdownMenu.RadioItem>
          </DropdownMenu.RadioGroup>
        </DropdownMenu.Content>
      </DropdownMenu>,
    );

    await user.click(screen.getByRole("button", { name: "View" }));
    await screen.findByRole("menu");

    expect(screen.getByRole("menuitemcheckbox", { name: "Show grid" })).toBeChecked();
    expect(screen.getByRole("menuitemradio", { name: "Comfortable" })).toBeChecked();
    expect(screen.getByRole("menuitemradio", { name: "Compact" })).not.toBeChecked();

    await user.click(screen.getByRole("menuitemradio", { name: "Compact" }));
    await waitFor(() =>
      expect(screen.getByRole("menuitemradio", { name: "Compact" })).toBeChecked(),
    );
  });
});
