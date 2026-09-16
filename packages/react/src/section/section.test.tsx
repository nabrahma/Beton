import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { expectNoAxeViolations } from "../../test/a11y.ts";
import { Button } from "../button/button.tsx";
import { Section } from "./section.tsx";

describe("Section", () => {
  it("[axe] has no violations on any surface or size", async () => {
    const { container } = render(
      <div>
        {(["paper", "raised", "accent", "ink"] as const).map((surface) =>
          (["sm", "md", "lg"] as const).map((size) => (
            <Section
              key={surface + size}
              surface={surface}
              size={size}
              eyebrow="Tier six"
              title={surface + " " + size}
              description="A frame for a section of a page."
              actions={<Button size="sm">Read more</Button>}
            >
              <p>Body</p>
            </Section>
          )),
        )}
      </div>,
    );
    await expectNoAxeViolations(container);
  });

  it("[aria] is a landmark named by its own heading", () => {
    render(
      <Section title="What it does">
        <p>Body</p>
      </Section>,
    );
    const region = screen.getByRole("region", { name: "What it does" });
    expect(region).toBeInTheDocument();
    expect(screen.getByRole("heading", { level: 2, name: "What it does" })).toBeInTheDocument();
  });

  it("[heading] takes the level the page needs", () => {
    render(<Section title="Deeper" headingLevel={3} />);
    expect(screen.getByRole("heading", { level: 3, name: "Deeper" })).toBeInTheDocument();
  });

  it("[surface] reports which surface it is on", () => {
    const { container } = render(<Section surface="ink" title="Dark" />);
    expect(container.firstElementChild).toHaveAttribute("data-surface", "ink");
  });

  it("[aria] a section with no heading is not a landmark at all", () => {
    render(
      <Section>
        <p>Just content</p>
      </Section>,
    );
    expect(screen.queryByRole("region")).toBeNull();
  });
});
