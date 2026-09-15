# Component Contracts

These rules are binding for every component in `@beton-ui/react` and every item
in the registry. They exist so that 100+ components written over months still
read as one library. A change to this document requires its own pull request,
reviewed before any component relies on it.

## 1. The three layers

| Layer      | Package             | Knows React? | Knows Tailwind?          |
| ---------- | ------------------- | ------------ | ------------------------ |
| Tokens     | `@beton-ui/tokens`  | no           | it _is_ the theme        |
| Recipes    | `@beton-ui/recipes` | no           | yes, emits class strings |
| Components | `@beton-ui/react`   | yes          | no, only calls recipes   |

- Components never contain Tailwind utility classes. Every class string comes
  from a recipe. The `beton/no-inline-classes` lint rule fails the build on
  violations.
- Recipes never import React.
- Tokens are plain CSS. Nothing reads a hex value except the token file.

## 2. Props

- Every interactive component accepts `variant`, `size` and `className`.
- `size` is always `"sm" | "md" | "lg"`, default `"md"`.
- `variant` uses only this vocabulary: `primary`, `secondary`, `ghost`,
  `danger`. Components that need fewer may use a subset. Adding a fifth name
  requires amending this document first.
- Status components (`Badge`, `Alert`, `Toast`, `Progress`) additionally accept
  `success`, which maps to the success token. This is the only extension to the
  vocabulary.
- Non-interactive components (for example `Card`, `Kbd`) accept `className` and
  only the variants that make sense for them, from the same vocabulary where one
  applies. Display typography (`Heading`) may add an `xl` size.
- `className` is merged last and always wins conflicts (via `tailwind-merge`).
- All remaining props spread onto the outermost DOM element.

## 3. Refs

React 19 passes `ref` as a regular prop. Every component forwards `ref` to its
outermost DOM element. No `forwardRef` wrappers.

## 4. Composition

- Composition uses the `render` prop, with the same semantics as Base UI:
  `render={<a href="/docs" />}` or `render={(props) => <a {...props} />}`.
- There is no `asChild`.
- Components built on Base UI pass `render` straight through. Presentational
  components use the shared `renderElement` helper, which has no hooks and is
  safe in React Server Components.

## 5. Compound components

- Compound components use dot notation: `Card.Header`, `Card.Body`.
- Parts are never also exported as separate names (`CardHeader` does not exist).
- The root is the default callable: `<Card>` renders the root element.

## 6. State

State is exposed as data attributes, never as classes:

| Attribute       | Meaning                          |
| --------------- | -------------------------------- |
| `data-disabled` | The component is disabled        |
| `data-loading`  | An async action is in progress   |
| `data-selected` | The item is selected             |
| `data-invalid`  | The value failed validation      |
| `data-state`    | Open/closed or checked/unchecked |
| `data-variant`  | The active variant               |
| `data-size`     | The active size                  |

Consumers may style these attributes; internals can change freely underneath.

## 7. Server and client

- A component that uses hooks, event handlers, or browser APIs starts with
  `"use client"`.
- Presentational components do not, so they render in Server Components.
- No component reads `window`, `document` or `navigator` during render.
- A Server Component cannot "dot into" a client module (`Dialog.Trigger`).
  Compound client components are therefore used inside client components,
  which matches how interactive UI is written anyway. A client component that
  is commonly placed directly in server-rendered markup (for example `Avatar`)
  uses a single-element API instead of parts.

## 8. Design law

The design tokens are the source of truth. In particular:

- Radius is `0`, `12px` or `24px`. There is no fourth value.
- Shadows have zero blur and zero spread: `none`, `4px 4px 0 0 ink`,
  `12px 12px 0 0 ink`.
- Strokes are ink. Border widths are 2, 3 or 5 pixels.
- Pressed elements translate by exactly their shadow offset and drop the
  shadow.
- Motion is linear or stepped, under 100ms for press states. No springs, no
  easing curves with overshoot. Everything honours `prefers-reduced-motion`.
- Text on an accent fill is always ink. Accent colours are never used as text
  on paper or white; they do not meet 4.5:1.
- Disabled is flat grey at full opacity. Never reduced opacity.

## 9. Accessibility

A component does not merge unless it has:

1. An axe test with zero violations for every variant.
2. A keyboard test covering every interaction it supports.
3. An accessible name in every documented example.
4. A focus ring visible on every variant (`focusRing` from recipes).
5. A 44 × 44px minimum target, including the invisible hit-area extension on
   `sm` sizes.
6. Reduced-motion behaviour if it animates.
7. For overlays: focus trap, focus restore, Escape to close, outside click to
   close, inert background.

## 10. File layout

```text
packages/recipes/src/<name>.ts            recipe (tailwind-variants)
packages/react/src/<name>/<name>.tsx      component
packages/react/src/<name>/<name>.test.tsx behaviour + axe tests
packages/react/src/<name>/<name>.meta.ts  docs metadata (description, a11y notes)
apps/docs/examples/<name>/*.tsx           live, copyable usage examples
```

Test names carry tags that feed the published accessibility table:
`[axe]`, `[keyboard]`, `[name]`, `[motion]`, `[focus]`.
