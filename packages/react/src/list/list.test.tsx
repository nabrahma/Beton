import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { expectNoAxeViolations } from "../../test/a11y.ts";
import { Button } from "../button/button.tsx";
import { List } from "./list.tsx";

describe("List", () => {
  it("[axe] has no violations in any size, plain or interactive", async () => {
    const { container } = render(
      <div>
        {(["sm", "md", "lg"] as const).map((size) => (
          <List key={size} size={size}>
            <List.Item title="Wharf Road" description="Poured Tuesday" meta="18 m³" />
            <List.Item
              href="#"
              title="Kiln Street"
              description="Booked for Friday"
              actions={
                <Button size="sm" variant="secondary">
                  Edit
                </Button>
              }
            />
          </List>
        ))}
      </div>,
    );
    await expectNoAxeViolations(container);
  });

  it("[aria] is a list of items", () => {
    render(
      <List>
        <List.Item title="One" />
        <List.Item title="Two" />
      </List>,
    );
    expect(screen.getByRole("list")).toBeInTheDocument();
    expect(screen.getAllByRole("listitem")).toHaveLength(2);
  });

  it("[aria] marks the row being shown as the current one", () => {
    render(
      <List>
        <List.Item title="One" selected />
        <List.Item title="Two" />
      </List>,
    );
    const [first, second] = screen.getAllByRole("listitem");
    // aria-selected is only meaningful inside a listbox or a grid.
    expect(first).toHaveAttribute("aria-current", "true");
    expect(first).not.toHaveAttribute("aria-selected");
    expect(second).not.toHaveAttribute("aria-current");
  });

  it("[keyboard] a linked row and its actions are separately reachable", async () => {
    const user = userEvent.setup();
    render(
      <List>
        <List.Item href="#edit" title="Kiln Street" actions={<Button size="sm">Delete</Button>} />
      </List>,
    );

    await user.tab();
    expect(screen.getByRole("link", { name: /Kiln Street/ })).toHaveFocus();
    await user.tab();
    expect(screen.getByRole("button", { name: "Delete" })).toHaveFocus();
  });

  it("[render] a row can be handed to a routing link", () => {
    render(
      <List>
        <List.Item render={<a data-router="" href="/sites/1" />} title="Wharf Road" />
      </List>,
    );
    expect(screen.getByRole("link", { name: /Wharf Road/ })).toHaveAttribute("data-router");
  });
});
