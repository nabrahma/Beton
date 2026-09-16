import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { expectNoAxeViolations } from "../../test/a11y.ts";
import { Button } from "../button/button.tsx";
import { PricingTable } from "./pricing-table.tsx";

const plans = [
  {
    name: "Free",
    price: "£0",
    period: "/ forever",
    description: "Every component, every block.",
    features: ["All components", "All blocks", ["Priority support", false] as [string, boolean]],
    action: <Button variant="secondary">Start</Button>,
  },
  {
    name: "Pro",
    price: "£199",
    period: "/ year",
    features: ["All components", "All blocks", "Priority support"],
    action: <Button>Buy</Button>,
    featured: true,
    badge: "Most popular",
    footnote: "One-time payment, lifetime updates.",
  },
];

describe("PricingTable", () => {
  it("[axe] has no violations at any width", async () => {
    const { container } = render(
      <div>
        {([2, 3, 4] as const).map((columns) => (
          <PricingTable
            key={columns}
            columns={columns}
            title={"Pricing " + columns}
            plans={plans}
          />
        ))}
      </div>,
    );
    await expectNoAxeViolations(container);
  });

  it("[semantics] each plan is a list item with its own heading", () => {
    render(<PricingTable title="Pricing" plans={plans} />);
    expect(screen.getByRole("heading", { level: 3, name: "Free" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { level: 3, name: "Pro" })).toBeInTheDocument();
  });

  it("[features] included and missing are said in words, not only in icons", () => {
    render(<PricingTable title="Pricing" plans={plans} />);
    expect(screen.getByText("Not included:")).toBeInTheDocument();
    expect(screen.getAllByText("Included:").length).toBeGreaterThan(0);
  });

  it("[featured] the highlighted plan says so in the markup", () => {
    render(<PricingTable title="Pricing" plans={plans} />);
    const items = screen.getAllByRole("listitem");
    const featured = items.filter((item) => item.hasAttribute("data-featured"));
    expect(featured).toHaveLength(1);
  });
});
