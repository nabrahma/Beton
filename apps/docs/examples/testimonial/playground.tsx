"use client";

import { Avatar, Testimonial, type TestimonialProps } from "@beton-ui/react";

const quotes = [
  {
    quote: "It is the first library where the focus rings were clearly drawn on purpose.",
    name: "Ada Mbeki",
    role: "Design lead, Wharf Road",
    portrait: <Avatar alt="Ada Mbeki" size="sm" />,
  },
  {
    quote: "We deleted three hundred lines of wrapper components the week we installed it.",
    name: "Tom Reyes",
    role: "Engineer, Kiln Street",
    portrait: <Avatar alt="Tom Reyes" size="sm" variant="primary" />,
  },
  {
    quote: "The accessibility notes settled an argument we had been having for a year.",
    name: "Mira Sol",
    role: "Head of platform, Bridge Yard",
    portrait: <Avatar alt="Mira Sol" size="sm" variant="danger" />,
  },
];

export default function TestimonialPlayground(props: Partial<TestimonialProps>) {
  return <Testimonial {...props} headingLevel={2} title="What people say" quotes={quotes} />;
}
