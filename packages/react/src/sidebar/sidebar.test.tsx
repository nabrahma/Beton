import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { expectNoAxeViolations } from "../../test/a11y.ts";
import { Badge } from "../badge/badge.tsx";
import { Sidebar } from "./sidebar.tsx";

function Example() {
  return (
    <Sidebar>
      <Sidebar.Section title="Getting started">
        <Sidebar.Item href="/install" active>
          Installation
        </Sidebar.Item>
        <Sidebar.Item href="/theming">Theming</Sidebar.Item>
      </Sidebar.Section>
      <Sidebar.Section title="Components">
        <Sidebar.Item href="/button" badge={<Badge size="sm">New</Badge>}>
          Button
        </Sidebar.Item>
      </Sidebar.Section>
    </Sidebar>
  );
}

describe("Sidebar", () => {
  it("[axe] has no violations in any size", async () => {
    const { container } = render(
      <div>
        <Example />
        {(["sm", "lg"] as const).map((size) => (
          <Sidebar key={size} size={size} aria-label={`Sidebar ${size}`}>
            <Sidebar.Section title="Group">
              <Sidebar.Item href="/a">One</Sidebar.Item>
            </Sidebar.Section>
          </Sidebar>
        ))}
      </div>,
    );
    await expectNoAxeViolations(container);
  });

  it("[aria] is a named navigation landmark of grouped lists", () => {
    render(<Example />);
    expect(screen.getByRole("navigation", { name: "Sidebar" })).toBeInTheDocument();
    expect(screen.getAllByRole("list")).toHaveLength(2);
    expect(screen.getAllByRole("listitem")).toHaveLength(3);
  });

  it("[aria] marks the page you are on", () => {
    render(<Example />);
    expect(screen.getByRole("link", { name: "Installation" })).toHaveAttribute(
      "aria-current",
      "page",
    );
  });

  it("[keyboard] every item is reachable in order", async () => {
    const user = userEvent.setup();
    render(<Example />);

    await user.tab();
    expect(screen.getByRole("link", { name: "Installation" })).toHaveFocus();
    await user.tab();
    expect(screen.getByRole("link", { name: "Theming" })).toHaveFocus();
    await user.tab();
    expect(screen.getByRole("link", { name: /Button/ })).toHaveFocus();
  });

  it("[section] shows the group heading above its links", () => {
    render(<Example />);
    expect(screen.getByText("Getting started")).toBeInTheDocument();
    expect(screen.getByText("Components")).toBeInTheDocument();
  });
});
