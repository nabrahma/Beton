/**
 * Two-tone focus ring: a 3px white ring fills the gap at the element edge and
 * a 3px ink outline sits beyond it. A single-colour ring disappears against at
 * least one of the accent fills; this construction is visible on all of them.
 */
export const focusRing = [
  "outline-none",
  "focus-visible:outline-3 focus-visible:outline-offset-3 focus-visible:outline-solid focus-visible:outline-focus",
  "focus-visible:ring-3 focus-visible:ring-focus-gap",
].join(" ");

/** Same ring, triggered from a parent that receives focus (e.g. a label wrapping a hidden input). */
export const focusRingWithin = [
  "has-focus-visible:outline-3 has-focus-visible:outline-offset-3 has-focus-visible:outline-solid has-focus-visible:outline-focus",
  "has-focus-visible:ring-3 has-focus-visible:ring-focus-gap",
].join(" ");

/** Press physics for a 4px shadow: translate exactly the offset, drop the shadow. */
export const pressable = [
  "shadow-sm transition-[translate,box-shadow] duration-70 ease-linear motion-reduce:transition-none",
  "active:translate-x-1 active:translate-y-1 active:shadow-none",
  "data-pressed:translate-x-1 data-pressed:translate-y-1 data-pressed:shadow-none",
].join(" ");

/** Flat grey at full opacity. Never faded. */
export const disabled = [
  "disabled:cursor-not-allowed disabled:border-disabled-foreground disabled:bg-disabled disabled:text-disabled-foreground disabled:shadow-none disabled:translate-none",
  "data-disabled:cursor-not-allowed data-disabled:border-disabled-foreground data-disabled:bg-disabled data-disabled:text-disabled-foreground data-disabled:shadow-none data-disabled:translate-none",
].join(" ");

/** Extends the pointer target to 44x44 without changing layout. Requires `relative`. */
export const hitArea = "after:absolute after:-inset-1 after:content-['']";

/** The raised, stroked surface shared by every text-entry control. */
export const fieldSurface = [
  "border-3 border-border bg-raised text-foreground shadow-sm",
  "font-sans placeholder:text-disabled-foreground",
  "aria-invalid:bg-danger/15 data-invalid:bg-danger/15",
].join(" ");

/** Label typography shared by Label, Field and group legends. */
export const labelText =
  "font-display font-bold uppercase tracking-wide text-foreground data-disabled:text-disabled-foreground";
