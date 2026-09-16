import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { expectNoAxeViolations } from "../../test/a11y.ts";
import { Button } from "../button/button.tsx";
import { Table } from "./table.tsx";

function Example(props: {
  sort?: "ascending" | "descending" | "none";
  onSort?: (direction: "ascending" | "descending") => void;
}) {
  return (
    <Table caption="Recent pours">
      <Table.Head>
        <Table.Row>
          <Table.HeaderCell sort={props.sort ?? "none"} onSort={props.onSort}>
            Site
          </Table.HeaderCell>
          <Table.HeaderCell>Grade</Table.HeaderCell>
          <Table.HeaderCell>Volume</Table.HeaderCell>
        </Table.Row>
      </Table.Head>
      <Table.Body>
        <Table.Row selected>
          <Table.Cell>Wharf Road</Table.Cell>
          <Table.Cell>C30/37</Table.Cell>
          <Table.Cell>18 m³</Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>Kiln Street</Table.Cell>
          <Table.Cell>C25/30</Table.Cell>
          <Table.Cell>
            <Table.Actions>
              <Button size="sm" variant="secondary">
                Edit
              </Button>
            </Table.Actions>
          </Table.Cell>
        </Table.Row>
      </Table.Body>
    </Table>
  );
}

describe("Table", () => {
  it("[axe] has no violations in any size or decoration", async () => {
    const { container } = render(
      <div>
        <Example sort="ascending" />
        {(["sm", "lg"] as const).map((size) => (
          <Table key={size} size={size} striped hoverable caption={`Sites ${size}`}>
            <Table.Head>
              <Table.Row>
                <Table.HeaderCell>Site</Table.HeaderCell>
              </Table.Row>
            </Table.Head>
            <Table.Body>
              <Table.Row>
                <Table.Cell>Wharf Road</Table.Cell>
              </Table.Row>
            </Table.Body>
          </Table>
        ))}
      </div>,
    );
    await expectNoAxeViolations(container);
  });

  it("[name] takes its name from the caption", () => {
    render(<Example />);
    expect(screen.getByRole("table", { name: "Recent pours" })).toBeInTheDocument();
  });

  it("[aria] column headers are scoped and rows report selection", () => {
    render(<Example />);
    expect(screen.getByRole("columnheader", { name: "Grade" })).toHaveAttribute("scope", "col");
    const [, firstRow] = screen.getAllByRole("row");
    expect(firstRow).toHaveAttribute("aria-selected", "true");
  });

  it("[sort] reports the direction and asks for the opposite one", async () => {
    const user = userEvent.setup();
    const onSort = vi.fn();
    render(<Example sort="ascending" onSort={onSort} />);

    const header = screen.getByRole("columnheader", { name: "Site" });
    expect(header).toHaveAttribute("aria-sort", "ascending");

    await user.click(screen.getByRole("button", { name: "Site" }));
    expect(onSort).toHaveBeenCalledWith("descending");
  });

  it("[sort] an unsorted column is not announced as sorted", () => {
    render(<Example />);
    expect(screen.getByRole("columnheader", { name: "Site" })).toHaveAttribute("aria-sort", "none");
  });

  it("[keyboard] the sort button is reachable and the scroller is focusable", async () => {
    const user = userEvent.setup();
    render(<Example sort="none" onSort={() => {}} />);

    await user.tab();
    // A table that scrolls sideways has to be reachable by keyboard.
    expect(screen.getByRole("group", { name: "Recent pours" })).toHaveFocus();
    await user.tab();
    expect(screen.getByRole("button", { name: "Site" })).toHaveFocus();
  });

  it("[caption] can be hidden from the screen but not from screen readers", () => {
    render(
      <Table caption="Hidden caption" hideCaption>
        <Table.Body>
          <Table.Row>
            <Table.Cell>One</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>,
    );
    expect(screen.getByRole("table", { name: "Hidden caption" })).toBeInTheDocument();
  });

  it("[empty] spans the message across the table", () => {
    render(
      <Table caption="Nothing yet">
        <Table.Body>
          <Table.Empty colSpan={3}>No pours recorded.</Table.Empty>
        </Table.Body>
      </Table>,
    );
    expect(screen.getByRole("cell", { name: "No pours recorded." })).toHaveAttribute(
      "colspan",
      "3",
    );
  });
});
