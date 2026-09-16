import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { expectNoAxeViolations } from "../../test/a11y.ts";
import { Button } from "../button/button.tsx";
import { Hero } from "./hero.tsx";

describe("Hero", () => {
  it("[axe] has no violations in any variant or surface", async () => {
    const { container } = render(
      <div>
        {(["stacked", "split", "poster"] as const).map((variant, index) => (
          <Hero
            key={variant}
            variant={variant}
            surface={index === 0 ? "paper" : index === 1 ? "accent" : "ink"}
            headingLevel={2}
            eyebrow="v1.0"
            title={"Concrete " + variant}
            description="Components that look like they were poured, not designed."
            actions={<Button>Get started</Button>}
            note="MIT with Commons Clause"
            aside={<div>Panel</div>}
          />
        ))}
      </div>,
    );
    await expectNoAxeViolations(container);
  });

  it("[aria] is a landmark named by the page heading", () => {
    render(<Hero title="Béton" description="Poured in place." />);
    expect(screen.getByRole("heading", { level: 1, name: "Béton" })).toBeInTheDocument();
    expect(screen.getByRole("region", { name: "Béton" })).toBeInTheDocument();
  });

  it("[variant] only the split layout shows the panel beside the text", () => {
    const { rerender } = render(<Hero title="Béton" aside={<p>Live panel</p>} />);
    expect(screen.queryByText("Live panel")).toBeNull();

    rerender(<Hero variant="split" title="Béton" aside={<p>Live panel</p>} />);
    expect(screen.getByText("Live panel")).toBeInTheDocument();
  });

  it("[background] anything drawn behind sits inside the section", () => {
    const { container } = render(<Hero title="Béton" background={<span data-testid="grid" />} />);
    expect(container.querySelector("[data-testid='grid']")).toBeInTheDocument();
  });
});
