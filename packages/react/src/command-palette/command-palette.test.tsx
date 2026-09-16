import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { expectNoAxeViolations } from "../../test/a11y.ts";
import { CommandPalette, matchesShortcut, type CommandGroup } from "./command-palette.tsx";

function groups(onSelect: () => void): CommandGroup[] {
  return [
    {
      label: "Pages",
      items: [
        { value: "docs", label: "Documentation", hint: "G D", onSelect },
        { value: "components", label: "Components", keywords: ["button", "card"] },
      ],
    },
    {
      label: "Actions",
      items: [
        { value: "theme", label: "Copy theme tokens" },
        { value: "issue", label: "Report an issue", disabled: true },
      ],
    },
  ];
}

describe("CommandPalette", () => {
  it("[axe] has no violations open", async () => {
    render(<CommandPalette groups={groups(() => {})} defaultOpen />);
    await screen.findByRole("dialog");
    await expectNoAxeViolations(document.body);
  });

  it("[name] the dialog and its input share the same name", async () => {
    render(<CommandPalette groups={groups(() => {})} defaultOpen />);
    const dialog = await screen.findByRole("dialog");
    expect(dialog).toHaveAccessibleName("Command palette");
    expect(screen.getByRole("combobox", { name: "Command palette" })).toHaveFocus();
  });

  it("[keyboard] the shortcut opens it and Escape closes it", async () => {
    const user = userEvent.setup();
    render(<CommandPalette groups={groups(() => {})} />);
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();

    await user.keyboard("{Control>}k{/Control}");
    await screen.findByRole("dialog");

    await user.keyboard("{Escape}");
    await waitFor(() => expect(screen.queryByRole("dialog")).not.toBeInTheDocument());
  });

  it("[keyboard] typing filters, including by keyword, and Enter runs the command", async () => {
    const user = userEvent.setup();
    const onSelect = vi.fn();
    render(<CommandPalette groups={groups(onSelect)} defaultOpen />);
    await screen.findByRole("dialog");

    expect(screen.getAllByRole("option")).toHaveLength(4);

    await user.keyboard("card");
    await waitFor(() => expect(screen.getAllByRole("option")).toHaveLength(1));
    expect(screen.getByRole("option", { name: /Components/ })).toBeInTheDocument();

    await user.clear(screen.getByRole("combobox"));
    await user.keyboard("Documentation");
    await waitFor(() =>
      expect(screen.getByRole("option", { name: /Documentation/ })).toBeInTheDocument(),
    );
    await user.keyboard("{Enter}");

    expect(onSelect).toHaveBeenCalledOnce();
    await waitFor(() => expect(screen.queryByRole("dialog")).not.toBeInTheDocument());
  });

  it("[name] shows a message when nothing matches", async () => {
    const user = userEvent.setup();
    render(<CommandPalette groups={groups(() => {})} defaultOpen />);
    await screen.findByRole("dialog");

    await user.keyboard("zzzz");
    expect(await screen.findByText("No matching commands.")).toBeInTheDocument();
  });

  it("matches shortcuts against keyboard events", () => {
    const event = (init: Partial<KeyboardEvent>) => new KeyboardEvent("keydown", init);
    expect(matchesShortcut(event({ key: "k", ctrlKey: true }), "mod+k")).toBe(true);
    expect(matchesShortcut(event({ key: "K", metaKey: true }), "mod+k")).toBe(true);
    expect(matchesShortcut(event({ key: "k" }), "mod+k")).toBe(false);
    expect(matchesShortcut(event({ key: "k", ctrlKey: true, shiftKey: true }), "mod+k")).toBe(
      false,
    );
    expect(matchesShortcut(event({ key: "/", shiftKey: true }), "shift+/")).toBe(true);
    expect(matchesShortcut(event({ key: "p", ctrlKey: true }), "mod+k")).toBe(false);
  });
});
