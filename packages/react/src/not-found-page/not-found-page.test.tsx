import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { expectNoAxeViolations } from "../../test/a11y.ts";
import { Button } from "../button/button.tsx";
import { NotFoundPage } from "./not-found-page.tsx";

describe("NotFoundPage", () => {
  it("[axe] has no violations", async () => {
    const { container } = render(<NotFoundPage actions={<Button>Back to the docs</Button>} />);
    await expectNoAxeViolations(container);
  });

  it("[aria] is the main landmark, named by its heading", () => {
    render(<NotFoundPage />);
    expect(screen.getByRole("main", { name: "Page not found" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { level: 1, name: "Page not found" })).toBeInTheDocument();
  });

  it("[aria] the big number is decoration: the words carry the meaning", () => {
    render(<NotFoundPage />);
    expect(screen.getByText("404")).toHaveAttribute("aria-hidden", "true");
  });

  it("[content] the words can all be changed", () => {
    render(
      <NotFoundPage code="410" title="Gone for good" description="This one is not coming back." />,
    );
    expect(screen.getByRole("heading", { level: 1, name: "Gone for good" })).toBeInTheDocument();
    expect(screen.getByText("This one is not coming back.")).toBeInTheDocument();
  });
});
