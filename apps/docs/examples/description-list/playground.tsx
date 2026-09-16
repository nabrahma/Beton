"use client";

import { DescriptionList, type DescriptionListProps } from "@beton-ui/react";

const spec = [
  ["Grade", "C30/37"],
  ["Slump", "150mm"],
  ["Aggregate", "20mm limestone"],
  ["Admixtures", "None"],
];

export default function DescriptionListPlayground(props: DescriptionListProps) {
  return (
    <DescriptionList {...props} className="w-full max-w-md">
      {spec.map(([term, value]) => (
        <DescriptionList.Item key={term} term={term} layout={props.layout} size={props.size}>
          {value}
        </DescriptionList.Item>
      ))}
    </DescriptionList>
  );
}
