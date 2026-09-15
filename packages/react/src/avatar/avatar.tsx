"use client";

import { Avatar as BaseAvatar } from "@base-ui/react/avatar";
import { avatar, type AvatarVariants } from "@beton-ui/recipes";
import type { ReactNode } from "react";

export interface AvatarProps
  extends Omit<BaseAvatar.Root.Props, "className" | "children">, AvatarVariants {
  className?: string;
  /** Image URL. When missing or broken, the fallback is shown. */
  src?: string;
  /** Describes the person or entity. Used as the image alt text and the fallback's accessible name. */
  alt: string;
  /** Shown while the image loads or when it fails. Defaults to initials derived from `alt`. */
  fallback?: ReactNode;
  /** Milliseconds to wait before showing the fallback, to avoid a flash on fast connections. */
  fallbackDelay?: number;
}

export function initials(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  const first = parts[0]?.[0] ?? "";
  const last = parts.length > 1 ? (parts[parts.length - 1]?.[0] ?? "") : "";
  return (first + last).toUpperCase();
}

export function Avatar({
  variant = "secondary",
  size = "md",
  src,
  alt,
  fallback,
  fallbackDelay,
  className,
  ...props
}: AvatarProps) {
  const styles = avatar({ variant, size });
  return (
    <BaseAvatar.Root
      {...props}
      data-variant={variant}
      data-size={size}
      className={styles.root({ class: className })}
    >
      {src ? <BaseAvatar.Image src={src} alt={alt} className={styles.image()} /> : null}
      <BaseAvatar.Fallback
        delay={src ? fallbackDelay : undefined}
        role="img"
        aria-label={alt}
        className={styles.fallback()}
      >
        <span aria-hidden="true">{fallback ?? initials(alt)}</span>
      </BaseAvatar.Fallback>
    </BaseAvatar.Root>
  );
}
