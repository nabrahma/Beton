import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { expectNoAxeViolations } from "../../test/a11y.ts";
import { SearchInput } from "./search-input.tsx";

describe("SearchInput", () => {
  it("[axe] has no violations empty and with a value", async () => {
    const { container } = render(
      <div>
        <SearchInput aria-label="Search components" size="sm" />
        <SearchInput aria-label="Search docs" defaultValue="button" />
        <SearchInput aria-label="Disabled search" disabled size="lg" />
      </div>,
    );
    await expectNoAxeViolations(container);
  });

  it("[name] is a searchbox with a named clear button", () => {
    render(<SearchInput aria-label="Search components" defaultValue="card" />);
    expect(screen.getByRole("searchbox", { name: "Search components" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Clear search" })).toBeInTheDocument();
  });

  it("[keyboard] typing updates the value and Escape clears it", async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();
    const onClear = vi.fn();
    render(<SearchInput aria-label="Search" onValueChange={onValueChange} onClear={onClear} />);

    await user.tab();
    const box = screen.getByRole("searchbox");
    expect(box).toHaveFocus();
    await user.keyboard("dialog");
    expect(box).toHaveValue("dialog");
    expect(onValueChange).toHaveBeenLastCalledWith("dialog");

    await user.keyboard("{Escape}");
    expect(box).toHaveValue("");
    expect(onClear).toHaveBeenCalledOnce();
  });

  it("[keyboard] the clear button empties the field and returns focus to it", async () => {
    const user = userEvent.setup();
    render(<SearchInput aria-label="Search" defaultValue="tabs" />);
    await user.click(screen.getByRole("button", { name: "Clear search" }));
    const box = screen.getByRole("searchbox");
    expect(box).toHaveValue("");
    expect(box).toHaveFocus();
    expect(screen.queryByRole("button", { name: "Clear search" })).not.toBeInTheDocument();
  });

  it("supports a controlled value", async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();
    render(<SearchInput aria-label="Search" value="fixed" onValueChange={onValueChange} />);
    await user.type(screen.getByRole("searchbox"), "x");
    expect(onValueChange).toHaveBeenCalledWith("fixedx");
    expect(screen.getByRole("searchbox")).toHaveValue("fixed");
  });

  it("[focus] renders the focus ring", () => {
    render(<SearchInput aria-label="Ring" />);
    expect(screen.getByRole("searchbox").className).toContain("focus-visible:ring-focus-gap");
  });
});
