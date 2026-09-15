"use client";

import { Slider, type SliderProps } from "@beton-ui/react";

export default function SliderPlayground(props: SliderProps) {
  return <Slider {...props} label="Volume" defaultValue={60} showValue className="max-w-sm" />;
}
