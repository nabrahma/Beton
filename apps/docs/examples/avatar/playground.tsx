"use client";

import { Avatar, type AvatarProps } from "@beton-ui/react";

export default function AvatarPlayground(props: Omit<AvatarProps, "alt">) {
  return <Avatar {...props} alt="Ada Lovelace" />;
}
