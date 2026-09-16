"use client";

import { FeatureGrid, type FeatureGridProps } from "@beton-ui/react";

const features = [
  {
    title: "You own the source",
    description: "The code lands in your repository. No wrapper package, no upgrade treadmill.",
  },
  {
    title: "Tested where it runs",
    description: "axe, keyboard and accessible-name tests ship beside every component.",
  },
  {
    title: "One visual language",
    description: "Tokens decide the radius, the shadow and the motion. Components never guess.",
  },
];

export default function FeatureGridPlayground(props: Partial<FeatureGridProps>) {
  return (
    <FeatureGrid
      {...props}
      headingLevel={2}
      title="Why it is like this"
      description="Three decisions that the rest follows from."
      features={features}
    />
  );
}
