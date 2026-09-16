import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { expectNoAxeViolations } from "../../test/a11y.ts";
import { GridBackground } from "./grid-background.tsx";

describe("GridBackground", () => {
  it("[axe] has no violations at any weight", async () => {
    const { container } = render(
      <div>
        {(["light", "medium", "heavy"] as const).map((weight) => (
          <GridBackground key={weight} weight={weight} />
        ))}
      </div>,
    );
    await expectNoAxeViolations(container);
  });

  it("[aria] is decoration: hidden, and never in the way of a pointer", () => {
    const { container } = render(<GridBackground />);
    const root = container.firstElementChild;
    expect(root).toHaveAttribute("aria-hidden", "true");
    expect(root?.className).toContain("pointer-events-none");
  });

  it("[cell] draws the grid at the size asked for", () => {
    const { container } = render(<GridBackground cell={48} />);
    expect(container.querySelector("pattern")).toHaveAttribute("width", "48");
  });
});
