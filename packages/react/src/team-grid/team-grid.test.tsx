import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { expectNoAxeViolations } from "../../test/a11y.ts";
import { TeamGrid } from "./team-grid.tsx";

const members = [
  { name: "Ada Mbeki", role: "Design", bio: "Draws the lines." },
  { name: "Tom Reyes", role: "Engineering", bio: "Pours the concrete." },
];

describe("TeamGrid", () => {
  it("[axe] has no violations at any width", async () => {
    const { container } = render(
      <div>
        {([2, 3, 4] as const).map((columns) => (
          <TeamGrid key={columns} columns={columns} title={"Team " + columns} members={members} />
        ))}
      </div>,
    );
    await expectNoAxeViolations(container);
  });

  it("[semantics] each person is a list item with a heading", () => {
    render(<TeamGrid title="Team" members={members} />);
    expect(screen.getAllByRole("listitem")).toHaveLength(2);
    expect(screen.getByRole("heading", { level: 3, name: "Ada Mbeki" })).toBeInTheDocument();
  });

  it("[links] a person can carry links", () => {
    render(
      <TeamGrid
        title="Team"
        members={[{ ...members[0]!, links: <a href="https://example.com">Site</a> }]}
      />,
    );
    expect(screen.getByRole("link", { name: "Site" })).toBeInTheDocument();
  });
});
