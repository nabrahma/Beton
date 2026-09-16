import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { expectNoAxeViolations } from "../../test/a11y.ts";
import { Tabs } from "./tabs.tsx";

function Example(props: { orientation?: "horizontal" | "vertical" }) {
  return (
    <Tabs defaultValue="one" {...props}>
      <Tabs.List>
        <Tabs.Tab value="one">Details</Tabs.Tab>
        <Tabs.Tab value="two">Delivery</Tabs.Tab>
        <Tabs.Tab value="three" disabled>
          Archive
        </Tabs.Tab>
      </Tabs.List>
      <Tabs.Panel value="one">Panel one</Tabs.Panel>
      <Tabs.Panel value="two">Panel two</Tabs.Panel>
      <Tabs.Panel value="three">Panel three</Tabs.Panel>
    </Tabs>
  );
}

describe("Tabs", () => {
  it("[axe] has no violations in either orientation or any size", async () => {
    const { container } = render(
      <div>
        <Example />
        <Example orientation="vertical" />
        {(["sm", "md", "lg"] as const).map((size) => (
          <Tabs key={size} size={size} defaultValue="a">
            <Tabs.List>
              <Tabs.Tab value="a">{size}</Tabs.Tab>
            </Tabs.List>
            <Tabs.Panel value="a">Content</Tabs.Panel>
          </Tabs>
        ))}
      </div>,
    );
    await expectNoAxeViolations(container);
  });

  it("[aria] wires each tab to its panel", () => {
    render(<Example />);
    const tab = screen.getByRole("tab", { name: "Details" });
    expect(tab).toHaveAttribute("aria-selected", "true");
    expect(screen.getByRole("tabpanel")).toHaveTextContent("Panel one");
    expect(screen.getByRole("tabpanel")).toHaveAttribute(
      "aria-labelledby",
      tab.getAttribute("id"),
    );
  });

  it("[keyboard] moves between tabs with the arrow keys and activates with Enter", async () => {
    const user = userEvent.setup();
    render(<Example />);

    await user.tab();
    expect(screen.getByRole("tab", { name: "Details" })).toHaveFocus();

    await user.keyboard("{ArrowRight}");
    expect(screen.getByRole("tab", { name: "Delivery" })).toHaveFocus();
    // Activation is manual: moving the focus alone does not switch the panel.
    expect(screen.getByRole("tabpanel")).toHaveTextContent("Panel one");

    await user.keyboard("{Enter}");
    expect(screen.getByRole("tabpanel")).toHaveTextContent("Panel two");
  });

  it("[keyboard] reaches a disabled tab but will not activate it", async () => {
    const user = userEvent.setup();
    render(<Example />);

    await user.tab();
    await user.keyboard("{ArrowRight}{ArrowRight}");
    // Disabled tabs stay focusable, as the ARIA tabs pattern asks, so they can
    // be found and announced rather than silently disappearing.
    const archive = screen.getByRole("tab", { name: "Archive" });
    expect(archive).toHaveFocus();
    expect(archive).toHaveAttribute("aria-disabled", "true");

    await user.keyboard("{Enter}");
    expect(screen.getByRole("tabpanel")).toHaveTextContent("Panel one");
  });

  it("[keyboard] Tab from the tab list reaches the panel, not every tab", async () => {
    const user = userEvent.setup();
    render(<Example />);

    await user.tab();
    await user.tab();
    expect(screen.getByRole("tabpanel")).toHaveFocus();
  });

  it("[orientation] reports vertical to assistive technology", () => {
    render(<Example orientation="vertical" />);
    expect(screen.getByRole("tablist")).toHaveAttribute("aria-orientation", "vertical");
  });
});
