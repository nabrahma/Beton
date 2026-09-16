import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { expectNoAxeViolations } from "../../test/a11y.ts";
import { ChangelogEntry } from "./changelog-entry.tsx";

const changes = [
  { kind: "added" as const, summary: "Tabs, accordion and breadcrumbs." },
  { kind: "fixed" as const, summary: "Badges rendered as links now reach 44px." },
  { kind: "removed" as const, summary: "The undocumented size prop on Kbd." },
];

describe("ChangelogEntry", () => {
  it("[axe] has no violations", async () => {
    const { container } = render(
      <div>
        <ChangelogEntry
          version="1.2.0"
          date="2 March 2026"
          dateTime="2026-03-02"
          title="Navigation"
          changes={changes}
        />
        <ChangelogEntry version="1.1.0" changes={[]} />
      </div>,
    );
    await expectNoAxeViolations(container);
  });

  it("[semantics] is an article named by its heading", () => {
    render(<ChangelogEntry version="1.2.0" title="Navigation" changes={changes} />);
    expect(screen.getByRole("article", { name: "Navigation" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { level: 3, name: "Navigation" })).toBeInTheDocument();
  });

  it("[time] writes a machine-readable date when one is given", () => {
    render(
      <ChangelogEntry version="1.2.0" date="2 March 2026" dateTime="2026-03-02" changes={[]} />,
    );
    const time = screen.getByText("2 March 2026");
    expect(time.tagName).toBe("TIME");
    expect(time).toHaveAttribute("datetime", "2026-03-02");
  });

  it("[changes] every change says what kind it is in words", () => {
    render(<ChangelogEntry version="1.2.0" changes={changes} />);
    expect(screen.getByText("added")).toBeInTheDocument();
    expect(screen.getByText("fixed")).toBeInTheDocument();
    expect(screen.getByText("removed")).toBeInTheDocument();
  });

  it("[title] falls back to the version when there is no headline", () => {
    render(<ChangelogEntry version="1.2.0" changes={[]} />);
    expect(screen.getByRole("heading", { level: 3, name: "1.2.0" })).toBeInTheDocument();
  });
});
