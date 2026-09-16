import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { expectNoAxeViolations } from "../../test/a11y.ts";
import { ContextMenu } from "./context-menu.tsx";

function Example({ onRename = () => {} }) {
  return (
    <ContextMenu>
      <ContextMenu.Trigger>
        <div tabIndex={0}>Right-click this canvas</div>
      </ContextMenu.Trigger>
      <ContextMenu.Content>
        <ContextMenu.Item onClick={onRename}>Rename</ContextMenu.Item>
        <ContextMenu.Separator />
        <ContextMenu.Item danger>Delete</ContextMenu.Item>
      </ContextMenu.Content>
    </ContextMenu>
  );
}

function openMenu() {
  fireEvent.contextMenu(screen.getByText("Right-click this canvas"));
  return screen.findByRole("menu");
}

describe("ContextMenu", () => {
  it("[axe] has no violations closed or open", async () => {
    const { container } = render(<Example />);
    await expectNoAxeViolations(container);

    await openMenu();
    await expectNoAxeViolations(document.body);
  });

  it("[name] opens on right-click with menu items", async () => {
    render(<Example />);
    await openMenu();
    expect(screen.getByRole("menuitem", { name: "Rename" })).toBeInTheDocument();
    expect(screen.getByRole("menuitem", { name: "Delete" })).toBeInTheDocument();
  });

  it("[keyboard] arrows move between items and Enter runs one", async () => {
    const user = userEvent.setup();
    const onRename = vi.fn();
    render(<Example onRename={onRename} />);
    await openMenu();

    await user.keyboard("{ArrowDown}");
    await waitFor(() => expect(screen.getByRole("menuitem", { name: "Rename" })).toHaveFocus());
    await user.keyboard("{Enter}");

    expect(onRename).toHaveBeenCalledOnce();
    await waitFor(() => expect(screen.queryByRole("menu")).not.toBeInTheDocument());
  });

  it("[keyboard] Escape closes the menu", async () => {
    const user = userEvent.setup();
    render(<Example />);
    await openMenu();

    await user.keyboard("{Escape}");
    await waitFor(() => expect(screen.queryByRole("menu")).not.toBeInTheDocument());
  });
});
