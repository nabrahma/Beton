import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { expectNoAxeViolations } from "../../test/a11y.ts";
import { Testimonial } from "./testimonial.tsx";

const quotes = [
  { quote: "It looks like nothing else.", name: "Ada Mbeki", role: "Design lead" },
  { quote: "The focus rings alone were worth it.", name: "Tom Reyes", role: "Engineer" },
];

describe("Testimonial", () => {
  it("[axe] has no violations at any size or width", async () => {
    const { container } = render(
      <div>
        {(["sm", "md", "lg"] as const).map((size) => (
          <Testimonial key={size} size={size} title={"Said " + size} quotes={quotes} />
        ))}
      </div>,
    );
    await expectNoAxeViolations(container);
  });

  it("[semantics] each quote is a figure with its attribution", () => {
    const { container } = render(<Testimonial title="What people say" quotes={quotes} />);
    expect(container.querySelectorAll("figure")).toHaveLength(2);
    expect(container.querySelectorAll("blockquote")).toHaveLength(2);
    expect(container.querySelectorAll("figcaption")).toHaveLength(2);
    expect(screen.getByText("Ada Mbeki")).toBeInTheDocument();
  });

  it("[aria] the quote mark is decoration", () => {
    const { container } = render(<Testimonial title="Said" quotes={quotes} />);
    expect(container.querySelectorAll("[aria-hidden='true']")).toHaveLength(2);
  });
});
