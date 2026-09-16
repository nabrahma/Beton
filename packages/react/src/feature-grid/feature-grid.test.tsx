import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { expectNoAxeViolations } from "../../test/a11y.ts";
import { FeatureGrid } from "./feature-grid.tsx";

const features = [
  { title: "Owned", description: "The source lands in your repo." },
  { title: "Tested", description: "axe, keyboard and name tests ship with it." },
  { title: "Accessible", description: "WCAG 2.2 AA, checked in a real browser." },
];

describe("FeatureGrid", () => {
  it("[axe] has no violations at any width", async () => {
    const { container } = render(
      <div>
        {([2, 3, 4] as const).map((columns) => (
          <FeatureGrid
            key={columns}
            columns={columns}
            title={"Features " + columns}
            features={features}
          />
        ))}
      </div>,
    );
    await expectNoAxeViolations(container);
  });

  it("[semantics] is a list of features under the section heading", () => {
    render(<FeatureGrid title="What you get" features={features} />);
    expect(screen.getByRole("list")).toBeInTheDocument();
    expect(screen.getAllByRole("listitem")).toHaveLength(3);
    expect(screen.getByRole("heading", { level: 3, name: "Owned" })).toBeInTheDocument();
  });

  it("[icon] the mark is decoration", () => {
    render(
      <FeatureGrid title="What you get" features={[{ ...features[0]!, icon: <span>!</span> }]} />,
    );
    expect(screen.getByText("!").closest("[aria-hidden='true']")).not.toBeNull();
  });

  it("[href] a feature can lead somewhere", () => {
    render(<FeatureGrid title="What you get" features={[{ ...features[0]!, href: "/docs" }]} />);
    expect(screen.getByRole("link", { name: "Owned" })).toHaveAttribute("href", "/docs");
  });
});
