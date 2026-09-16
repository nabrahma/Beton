# Béton

**Neobrutalist components for React. Loud on the surface, WCAG 2.2 AA underneath.**

Béton is a complete set of React components, marketing blocks and design tokens,
distributed as source through a shadcn-compatible registry. You install the code
into your own repository and own it from there: no runtime dependency, no
wrapper package, no upgrade treadmill.

<!-- generated:start -->

[![Components](https://img.shields.io/badge/components-68-00c2cb?style=flat-square&labelColor=000000)](https://beton.dev/docs/components)
[![Blocks](https://img.shields.io/badge/blocks-16-ffc700?style=flat-square&labelColor=000000)](https://beton.dev/docs/blocks)
[![Tests](https://img.shields.io/badge/tests-409%2F409%20passing-3edba0?style=flat-square&labelColor=000000)](https://beton.dev/docs/accessibility)
[![Axe](https://img.shields.io/badge/axe%20checks-83-3edba0?style=flat-square&labelColor=000000)](https://beton.dev/docs/accessibility)

|                                   |                  |
| --------------------------------- | ---------------- |
| Components                        | 68               |
| Blocks                            | 16               |
| Component tests                   | 409, all passing |
| Axe checks in the component tests | 83               |

<!-- generated:end -->

## Install

```sh
npx beton-ui init
npx beton-ui add button card input
```

Or through shadcn, by adding the registry to `components.json`:

```json
{ "registries": { "@beton": "https://beton.dev/r/{name}.json" } }
```

```sh
npx shadcn@latest add @beton/button
```

Requires React 19 and Tailwind CSS v4.

## What is in it

| Tier         | What it covers                                                                                                                                                                                 |
| ------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Foundation   | Button, card, badge, avatar, text, separator, spinner, kbd, label                                                                                                                              |
| Forms        | Input, textarea, select, checkbox, radio, switch, slider, file upload, OTP, number input, search, field, form                                                                                  |
| Overlays     | Dialog, alert dialog, sheet, popover, tooltip, dropdown and context menus, toast, command palette, hover card                                                                                  |
| Navigation   | Tabs, accordion, breadcrumbs, pagination, stepper, scroll area, navbar, sidebar, menubar, back to top                                                                                          |
| Data display | Table, list, description list, progress, skeleton, empty state, stat, timeline, calendar, alert, code block                                                                                    |
| Motion       | Marquee, ticker, sticker, scramble text, typewriter, counter, glitch text, backgrounds, sticker peel, cursor trail, confetti, split flap                                                       |
| Blocks       | Section frame, hero, feature grid, bento grid, pricing table, FAQ, CTA band, logo cloud, testimonial, stats band, newsletter signup, team grid, changelog entry, footer, site header, 404 page |

## Why it is like this

- **You own the source.** Components install as readable files in your project.
  Styles live in recipes you can edit in one place.
- **Accessibility is tested, not claimed.** Every component ships with axe,
  keyboard and accessible-name tests, and the whole documentation site is
  checked in a real browser on every commit. The results are
  [published](https://beton.dev/docs/accessibility).
- **One visual language.** Three radii, two shadows, linear or stepped motion,
  44px targets, and a two-tone focus ring that stays visible on every fill.
  The rules are written down in [CONTRACTS.md](./CONTRACTS.md).
- **Reduced motion is honoured everywhere**, including the flair: every
  animated component degrades to a readable, static state.

## Documentation

- [Introduction](https://beton.dev/docs/introduction)
- [Installation](https://beton.dev/docs/installation)
- [CLI](https://beton.dev/docs/cli)
- [Theming](https://beton.dev/docs/theming)
- [Accessibility](https://beton.dev/docs/accessibility)
- [Installing with a coding agent](https://beton.dev/docs/agents) ·
  [llms.txt](https://beton.dev/llms.txt)

## Repository

| Package             | What it is                                        |
| ------------------- | ------------------------------------------------- |
| `@beton-ui/tokens`  | The design tokens, as a Tailwind v4 theme         |
| `@beton-ui/recipes` | Every class string, as tailwind-variants recipes  |
| `@beton-ui/react`   | The React components                              |
| `beton-ui`          | The installer CLI                                 |
| `apps/docs`         | The documentation site and the registry it serves |

See [CONTRIBUTING.md](./CONTRIBUTING.md) for local setup and what a pull request
needs.

## License

MIT with the Commons Clause condition: use it, change it and ship it, but do not
sell the library itself. See [LICENSE](./LICENSE).
