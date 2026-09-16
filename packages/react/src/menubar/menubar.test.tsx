import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { expectNoAxeViolations } from "../../test/a11y.ts";
import { Menubar } from "./menubar.tsx";

function Example({ onCut = () => {} }: { onCut?: () => void }) {
  return (
    <Menubar>
      <Menubar.Menu>
        <Menubar.Trigger>File</Menubar.Trigger>
        <Menubar.Content>
          <Menubar.Item>New file</Menubar.Item>
          <Menubar.Item>Open…</Menubar.Item>
        </Menubar.Content>
      </Menubar.Menu>
      <Menubar.Menu>
        <Menubar.Trigger>Edit</Menubar.Trigger>
        <Menubar.Content>
          <Menubar.Item onClick={onCut}>Cut</Menubar.Item>
          <Menubar.Item disabled>Paste</Menubar.Item>
        </Menubar.Content>
      </Menubar.Menu>
    </Menubar>
  );
}

describe("Menubar", () => {
  it("[axe] has no violations closed or open", async () => {
    const user = userEvent.setup();
    const { container } = render(<Example />);
    await expectNoAxeViolations(container);

    await user.tab();
    await user.keyboard("{ArrowDown}");
    await expectNoAxeViolations(document.body);
  });

  it("[aria] is a menubar of menu triggers", () => {
    render(<Example />);
    expect(screen.getByRole("menubar")).toBeInTheDocument();
    const trigger = screen.getByRole("menuitem", { name: "File" });
    expect(trigger).toHaveAttribute("aria-haspopup", "menu");
    expect(trigger).toHaveAttribute("aria-expanded", "false");
  });

  it("[keyboard] opens a menu and runs an item", async () => {
    const user = userEvent.setup();
    const onCut = vi.fn();
    render(<Example onCut={onCut} />);

    await user.tab();
    expect(screen.getByRole("menuitem", { name: "File" })).toHaveFocus();

    await user.keyboard("{ArrowRight}");
    expect(screen.getByRole("menuitem", { name: "Edit" })).toHaveFocus();

    await user.keyboard("{Enter}");
    expect(screen.getByRole("menuitem", { name: "Cut" })).toBeInTheDocument();
    // Opening a menu highlights its first item.
    expect(screen.getByRole("menuitem", { name: "Cut" })).toHaveAttribute("data-highlighted");

    await user.keyboard("{Enter}");
    expect(onCut).toHaveBeenCalledOnce();
  });

  it("[keyboard] Escape closes the menu and leaves focus on the trigger", async () => {
    const user = userEvent.setup();
    render(<Example />);

    await user.tab();
    await user.keyboard("{ArrowDown}");
    expect(screen.getByRole("menuitem", { name: "New file" })).toBeInTheDocument();

    await user.keyboard("{Escape}");
    expect(screen.queryByRole("menuitem", { name: "New file" })).toBeNull();
    expect(screen.getByRole("menuitem", { name: "File" })).toHaveFocus();
  });
});
