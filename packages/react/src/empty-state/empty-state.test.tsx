import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { expectNoAxeViolations } from "../../test/a11y.ts";
import { Button } from "../button/button.tsx";
import { EmptyState } from "./empty-state.tsx";

describe("EmptyState", () => {
  it("[axe] has no violations in any size", async () => {
    const { container } = render(
      <div>
        {(["sm", "md", "lg"] as const).map((size) => (
          <EmptyState
            key={size}
            size={size}
            title={"Nothing here " + size}
            description="Once there is something, it will show up here."
            actions={<Button>Add the first one</Button>}
          />
        ))}
      </div>,
    );
    await expectNoAxeViolations(container);
  });

  it("[heading] the title is a heading, at the level you choose", () => {
    render(<EmptyState title="No results" headingLevel={2} />);
    expect(screen.getByRole("heading", { level: 2, name: "No results" })).toBeInTheDocument();
  });

  it("[icon] the mark is decoration and is hidden from screen readers", () => {
    render(<EmptyState title="No results" icon={<span>!</span>} />);
    expect(screen.getByText("!").closest("[aria-hidden='true']")).not.toBeNull();
  });
});
