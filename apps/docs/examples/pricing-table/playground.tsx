"use client";

import { Button, PricingTable, type PricingTableProps } from "@beton-ui/react";

const plans = [
  {
    name: "Free",
    price: "£0",
    period: "forever",
    description: "Everything in the open source library.",
    features: ["Every component", "Every block", "The registry", ["Private Slack", false] as const],
    action: (
      <Button variant="secondary" className="w-full">
        Install
      </Button>
    ),
  },
  {
    name: "Pro",
    price: "£199",
    period: "one-off",
    description: "For teams shipping application UI.",
    features: ["Everything in Free", "Application blocks", "Templates", "Private Slack"],
    action: <Button className="w-full">Buy Pro</Button>,
    featured: true,
    badge: "Most popular",
    footnote: "Lifetime updates. No subscription.",
  },
  {
    name: "Agency",
    price: "£499",
    period: "one-off",
    description: "Unlimited client projects.",
    features: ["Everything in Pro", "Unlimited projects", "Priority support"],
    action: (
      <Button variant="secondary" className="w-full">
        Contact
      </Button>
    ),
  },
];

export default function PricingTablePlayground(props: Partial<PricingTableProps>) {
  return (
    <PricingTable
      {...props}
      headingLevel={2}
      title="Pricing"
      description="The library is free. The extras are not."
      plans={plans.map((plan) => ({ ...plan, features: [...plan.features] }))}
    />
  );
}
