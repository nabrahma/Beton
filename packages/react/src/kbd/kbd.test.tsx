import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { expectNoAxeViolations } from "../../test/a11y.ts";
import { Kbd } from "./kbd.tsx";

describe("Kbd", () => {
  it("[axe] has no violations", async () => {
    const { container } = render(
      <p>
        Press <Kbd>Ctrl</Kbd> + <Kbd size="lg">K</Kbd>
      </p>,
    );
    await expectNoAxeViolations(container);
  });

  it("[name] renders a semantic kbd element", () => {
    render(<Kbd>Esc</Kbd>);
    expect(screen.getByText("Esc").tagName).toBe("KBD");
  });

  it("[keyboard] is not focusable", () => {
    render(<Kbd>Tab</Kbd>);
    expect(screen.getByText("Tab")).not.toHaveAttribute("tabindex");
  });
});
