# Contributing to Béton

Thanks for helping build Béton. This guide covers local setup, how the
repository is organised, and what a pull request needs before it can merge.

## Ground rules

- Read [CONTRACTS.md](./CONTRACTS.md) before writing a component. Pull requests
  that break the contracts will be asked to change, however good they look.
- Accessibility is not optional. A component without `[axe]` and `[keyboard]`
  tests does not merge.
- Be kind. This project follows the [Code of Conduct](./CODE_OF_CONDUCT.md).

## Local setup

Requirements: Node.js 20.9 or newer (22 recommended) and pnpm 11.

```sh
git clone https://github.com/nabrahma/Beton.git
cd Beton
corepack enable
pnpm install
pnpm dev
```

`pnpm dev` starts the documentation site at http://localhost:3000 with every
package linked from source, so edits to tokens, recipes and components reload
instantly.

## Repository layout

```text
packages/
  tokens/     Design tokens as plain CSS (Tailwind v4 @theme)
  recipes/    tailwind-variants recipes; framework-agnostic class strings
  react/      React components; call recipes, never write classes
  cli/        The beton-ui installer
apps/
  docs/       Documentation site (Next.js)
registry/     Generated shadcn-compatible registry. Never edit by hand.
scripts/      Contrast checker, registry and docs data generators
tests/        Browser tests: hit areas and visual regression (Playwright)
```

## Common tasks

| Command               | What it does                                 |
| --------------------- | -------------------------------------------- |
| `pnpm dev`            | Run the docs site                            |
| `pnpm build`          | Build every package and the docs site        |
| `pnpm test`           | Unit, behaviour and axe tests                |
| `pnpm lint`           | ESLint, including the no-inline-classes rule |
| `pnpm typecheck`      | TypeScript across the workspace              |
| `pnpm check:contrast` | Assert every token colour pair meets WCAG AA |
| `pnpm registry:build` | Regenerate `registry/` from component source |
| `pnpm test:browser`   | Playwright hit-area and visual tests         |
| `pnpm changeset`      | Describe a change to a published package     |

## Adding a component

1. **Recipe.** Create `packages/recipes/src/<name>.ts` with `tv()` from
   `./tv`. Export it from `packages/recipes/src/index.ts`.
2. **Component.** Create `packages/react/src/<name>/<name>.tsx`. Import the
   recipe, pass `className` through the recipe's `class` slot, expose state as
   data attributes, and add `"use client"` only if the component needs it.
3. **Tests.** Create `<name>.test.tsx` next to it. At minimum:
   - `[axe]` no violations, for every variant
   - `[keyboard]` every supported interaction
   - `[name]` accessible name is present
4. **Docs metadata.** Create `<name>.meta.ts` with a description, examples and
   accessibility notes. The docs page, props table and registry entry are
   generated from it.
5. **Export** the component from `packages/react/src/index.ts`.
6. Run `pnpm registry:build` and commit the generated files.
7. Add a changeset.

Look at `Button` for the reference implementation of a presentational component
and `Checkbox` for one built on Base UI.

## Commit messages

Use [Conventional Commits](https://www.conventionalcommits.org/):
`feat(button): add loading state`, `fix(dialog): restore focus on close`,
`docs: clarify theming`.

## Pull requests

- Keep pull requests focused: one component or one fix.
- Fill in the template checklist.
- CI must be green. It runs typecheck, lint, unit and axe tests, the contrast
  check, registry drift check, and a production build of the docs site.
- A maintainer aims to reply within 48 hours.

## Licensing of contributions

By contributing, you agree that your contributions are licensed under the
project's [license](./LICENSE) (MIT with the Commons Clause condition).
