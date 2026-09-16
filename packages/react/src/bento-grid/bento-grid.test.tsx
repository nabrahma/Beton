import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { expectNoAxeViolations } from "../../test/a11y.ts";
import { BentoGrid } from "./bento-grid.tsx";

const cells = [
  { title: "Press physics", description: "Buttons move by their shadow.", span: 2 as const },
  { title: "Two-tone focus", description: "Visible on every fill." },
  { title: "44px targets", description: "Everywhere, measured in a browser." },
];

describe("BentoGrid", () => {
  it("[axe] has no violations, accented or plain", async () => {
    const { container } = render(
      <BentoGrid
        title="The set"
        cells={[
          ...cells,
          { title: "Accent", description: "On ink.", accent: "ink" as const },
          { title: "Tall", description: "Two rows.", tall: true },
        ]}
      />,
    );
    await expectNoAxeViolations(container);
  });

  it("[semantics] is a list of cells with headings", () => {
    render(<BentoGrid title="The set" cells={cells} />);
    expect(screen.getAllByRole("listitem")).toHaveLength(3);
    expect(screen.getByRole("heading", { level: 3, name: "Press physics" })).toBeInTheDocument();
  });

  it("[span] a wide cell says so in its classes", () => {
    const { container } = render(<BentoGrid title="The set" cells={cells} />);
    const [first] = screen.getAllByRole("listitem");
    expect(first?.className).toContain("col-span-2");
    expect(container.querySelectorAll("li")).toHaveLength(3);
  });

  it("[media] a cell can hold a component", () => {
    render(
      <BentoGrid title="The set" cells={[{ title: "Live", media: <button>Press</button> }]} />,
    );
    expect(screen.getByRole("button", { name: "Press" })).toBeInTheDocument();
  });
});
