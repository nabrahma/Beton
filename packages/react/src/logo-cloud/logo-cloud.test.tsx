import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { expectNoAxeViolations } from "../../test/a11y.ts";
import { LogoCloud } from "./logo-cloud.tsx";

const logos = ["WHARF ROAD", "KILN STREET", "BRIDGE YARD"];

describe("LogoCloud", () => {
  it("[axe] has no violations at any size", async () => {
    const { container } = render(
      <div>
        {(["sm", "md", "lg"] as const).map((size) => (
          <LogoCloud key={size} size={size} title={"Used by " + size} logos={logos} />
        ))}
      </div>,
    );
    await expectNoAxeViolations(container);
  });

  it("[semantics] the names are a list, so they are counted", () => {
    render(<LogoCloud title="Used by" logos={logos} />);
    expect(screen.getAllByRole("listitem")).toHaveLength(3);
    expect(screen.getByText("KILN STREET")).toBeInTheDocument();
  });
});
