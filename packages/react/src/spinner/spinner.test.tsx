import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { expectNoAxeViolations } from "../../test/a11y.ts";
import { Spinner } from "./spinner.tsx";

describe("Spinner", () => {
  it("[axe] has no violations", async () => {
    const { container } = render(
      <div>
        <Spinner />
        <Spinner size="lg" showLabel label="Fetching results" />
      </div>,
    );
    await expectNoAxeViolations(container);
  });

  it("[name] announces its label through a status role", () => {
    render(<Spinner label="Uploading" />);
    expect(screen.getByRole("status")).toHaveTextContent("Uploading");
  });

  it("[motion] stops animating under reduced motion", () => {
    const { container } = render(<Spinner />);
    expect(container.querySelector("svg")?.getAttribute("class")).toContain(
      "motion-reduce:animate-none",
    );
  });

  it("[keyboard] is not focusable", () => {
    const { container } = render(<Spinner />);
    expect(container.querySelector("[tabindex]")).toBeNull();
  });
});
