import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { expectNoAxeViolations } from "../../test/a11y.ts";
import { Heading, Text } from "./text.tsx";

describe("Text and Heading", () => {
  it("[axe] has no violations", async () => {
    const { container } = render(
      <article>
        <Heading level={1}>Béton</Heading>
        <Text>Neobrutalist components.</Text>
        <Heading level={2} size="sm">
          Small heading
        </Heading>
        <Text size="sm" mono>
          v0.1.0
        </Text>
      </article>,
    );
    await expectNoAxeViolations(container);
  });

  it("[name] heading level controls semantics, size controls appearance", () => {
    render(
      <Heading level={4} size="xl">
        Big but level four
      </Heading>,
    );
    const heading = screen.getByRole("heading", { level: 4 });
    expect(heading).toHaveAttribute("data-size", "xl");
  });

  it("[keyboard] text renders as another element through render", () => {
    render(<Text render={<span />}>Inline</Text>);
    expect(screen.getByText("Inline").tagName).toBe("SPAN");
  });
});
