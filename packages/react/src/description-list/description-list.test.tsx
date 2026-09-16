import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { expectNoAxeViolations } from "../../test/a11y.ts";
import { DescriptionList } from "./description-list.tsx";

function Example(props: { layout?: "stacked" | "inline" }) {
  return (
    <DescriptionList {...props}>
      <DescriptionList.Item term="Grade" {...props}>
        C30/37
      </DescriptionList.Item>
      <DescriptionList.Item term="Slump" {...props}>
        150mm
      </DescriptionList.Item>
    </DescriptionList>
  );
}

describe("DescriptionList", () => {
  it("[axe] has no violations in either layout", async () => {
    const { container } = render(
      <div>
        <Example />
        <Example layout="inline" />
      </div>,
    );
    await expectNoAxeViolations(container);
  });

  it("[semantics] renders real terms and descriptions", () => {
    const { container } = render(<Example />);
    expect(container.querySelectorAll("dt")).toHaveLength(2);
    expect(container.querySelectorAll("dd")).toHaveLength(2);
    expect(screen.getByText("Grade").tagName).toBe("DT");
    expect(screen.getByText("C30/37").tagName).toBe("DD");
  });

  it("[layout] reports the layout it is using", () => {
    const { container } = render(<Example layout="inline" />);
    expect(container.firstElementChild).toHaveAttribute("data-layout", "inline");
  });
});
