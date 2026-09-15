import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { expectNoAxeViolations } from "../../test/a11y.ts";
import { Select } from "./select.tsx";

const fonts = [
  { label: "Archivo", value: "archivo" },
  { label: "Public Sans", value: "public-sans" },
  { label: "JetBrains Mono", value: "jetbrains-mono" },
];

function FontSelect(props: {
  onValueChange?: (value: string | null) => void;
  defaultOpen?: boolean;
}) {
  return (
    <Select items={fonts} onValueChange={props.onValueChange} defaultOpen={props.defaultOpen}>
      <Select.Label>Typeface</Select.Label>
      <Select.Trigger placeholder="Choose a typeface" />
      <Select.Content>
        {fonts.map((font) => (
          <Select.Item key={font.value} value={font.value}>
            {font.label}
          </Select.Item>
        ))}
      </Select.Content>
    </Select>
  );
}

describe("Select", () => {
  it("[axe] has no violations when closed", async () => {
    const { container } = render(<FontSelect />);
    await expectNoAxeViolations(container);
  });

  it("[axe] has no violations when open", async () => {
    render(<FontSelect defaultOpen />);
    await screen.findByRole("listbox");
    await expectNoAxeViolations(document.body);
  });

  it("[name] the trigger is a combobox named by the label", () => {
    render(<FontSelect />);
    expect(screen.getByRole("combobox", { name: "Typeface" })).toBeInTheDocument();
  });

  it("[keyboard] opens with ArrowDown, moves with arrows and selects with Enter", async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();
    render(<FontSelect onValueChange={onValueChange} />);

    await user.tab();
    const trigger = screen.getByRole("combobox", { name: "Typeface" });
    expect(trigger).toHaveFocus();

    await user.keyboard("{ArrowDown}");
    const listbox = await screen.findByRole("listbox");
    expect(listbox).toBeVisible();

    await user.keyboard("{ArrowDown}");
    await user.keyboard("{Enter}");

    await waitFor(() => expect(screen.queryByRole("listbox")).not.toBeInTheDocument());
    expect(onValueChange).toHaveBeenCalled();
    expect(trigger).toHaveTextContent(/Public Sans|Archivo/);
    await waitFor(() => expect(trigger).toHaveFocus());
  });

  it("[keyboard] Escape closes the list and returns focus to the trigger", async () => {
    const user = userEvent.setup();
    render(<FontSelect />);
    const trigger = screen.getByRole("combobox");
    await user.click(trigger);
    await screen.findByRole("listbox");
    await user.keyboard("{Escape}");
    await waitFor(() => expect(screen.queryByRole("listbox")).not.toBeInTheDocument());
    await waitFor(() => expect(trigger).toHaveFocus());
  });

  it("[keyboard] options are selectable with the pointer", async () => {
    const user = userEvent.setup();
    render(<FontSelect />);
    await user.click(screen.getByRole("combobox"));
    await user.click(await screen.findByRole("option", { name: "JetBrains Mono" }));
    await waitFor(() => expect(screen.getByRole("combobox")).toHaveTextContent("JetBrains Mono"));
  });

  it("[focus] the trigger renders the focus ring", () => {
    render(<FontSelect />);
    expect(screen.getByRole("combobox").className).toContain("focus-visible:ring-focus-gap");
  });
});
