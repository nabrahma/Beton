import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { expectNoAxeViolations } from "../../test/a11y.ts";
import { StatsBand } from "./stats-band.tsx";

const stats = [
  { label: "Components", value: "68" },
  { label: "Tests", value: "700", description: "Run on every commit" },
  { label: "Runtime dependencies", value: "0" },
];

describe("StatsBand", () => {
  it("[axe] has no violations at any width or size", async () => {
    const { container } = render(
      <div>
        {([2, 3, 4] as const).map((columns) => (
          <StatsBand
            key={columns}
            columns={columns}
            title={"By the numbers " + columns}
            stats={stats}
          />
        ))}
      </div>,
    );
    await expectNoAxeViolations(container);
  });

  it("[semantics] pairs each number with its label", () => {
    const { container } = render(<StatsBand title="By the numbers" stats={stats} />);
    expect(container.querySelectorAll("dt")).toHaveLength(3);
    expect(screen.getByText("Components")).toBeInTheDocument();
    expect(screen.getByText("68")).toBeInTheDocument();
  });
});
