import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { expectNoAxeViolations } from "../../test/a11y.ts";
import { Timeline } from "./timeline.tsx";

function Example() {
  return (
    <Timeline>
      <Timeline.Item title="Batched" time="09:00" dateTime="2026-03-02T09:00" state="done" />
      <Timeline.Item title="Poured" time="10:30" dateTime="2026-03-02T10:30" state="current">
        Two trucks, no delays.
      </Timeline.Item>
      <Timeline.Item title="Struck" time="Friday" state="upcoming" />
    </Timeline>
  );
}

describe("Timeline", () => {
  it("[axe] has no violations in any size", async () => {
    const { container } = render(
      <div>
        <Example />
        {(["sm", "lg"] as const).map((size) => (
          <Timeline key={size} size={size}>
            <Timeline.Item title={"Event " + size} />
          </Timeline>
        ))}
      </div>,
    );
    await expectNoAxeViolations(container);
  });

  it("[semantics] is an ordered list of events", () => {
    render(<Example />);
    expect(screen.getByRole("list")).toBeInTheDocument();
    expect(screen.getAllByRole("listitem")).toHaveLength(3);
  });

  it("[time] writes a machine-readable date when one is given", () => {
    render(<Example />);
    const time = screen.getByText("10:30");
    expect(time.tagName).toBe("TIME");
    expect(time).toHaveAttribute("datetime", "2026-03-02T10:30");
  });

  it("[state] reports each state and draws no line after the last event", () => {
    const { container } = render(<Example />);
    const items = screen.getAllByRole("listitem");
    expect(items[0]).toHaveAttribute("data-state", "done");
    expect(items[1]).toHaveAttribute("data-state", "current");
    expect(items[2]).toHaveAttribute("data-state", "upcoming");
    expect(container.querySelectorAll("span[aria-hidden='true']")).toHaveLength(2);
  });
});
