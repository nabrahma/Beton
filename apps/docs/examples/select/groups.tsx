/**
 * Groups
 * Group long lists under labels and separate them.
 */
"use client";

import { Select } from "@beton-ui/react";

const regions = {
  Europe: ["Paris", "Berlin", "Lisbon"],
  Asia: ["Tokyo", "Mumbai", "Singapore"],
};

export default function SelectGroups() {
  return (
    <div className="flex w-full max-w-xs flex-col gap-2">
      <Select defaultValue="Paris">
        <Select.Label>Region</Select.Label>
        <Select.Trigger />
        <Select.Content>
          {Object.entries(regions).map(([region, cities], index) => (
            <Select.Group key={region}>
              {index > 0 ? <Select.Separator /> : null}
              <Select.GroupLabel>{region}</Select.GroupLabel>
              {cities.map((city) => (
                <Select.Item key={city} value={city}>
                  {city}
                </Select.Item>
              ))}
            </Select.Group>
          ))}
        </Select.Content>
      </Select>
    </div>
  );
}
