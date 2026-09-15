# beton-ui

Add [Béton](https://github.com/nabrahma/Beton) neobrutalist components to your
React project. Components are copied into your codebase as readable source, so
you own and can change every line.

## Requirements

- React 19
- Tailwind CSS v4
- A TypeScript or JavaScript project with an import alias such as `@/*`

## Usage

```sh
npx beton-ui init
npx beton-ui add button card input
```

`init` detects your import alias and global stylesheet, writes `beton.json`,
adds the Béton theme next to your stylesheet, and installs the shared utilities.

`add` installs components with their styling recipes and any components they
depend on, then installs npm dependencies with your package manager.

| Command          | Description                                |
| ---------------- | ------------------------------------------ |
| `init`           | Set up the theme and shared utilities      |
| `add <names...>` | Add components (`add all` adds everything) |
| `list`           | Show every available component             |

| Option             | Description                                      |
| ------------------ | ------------------------------------------------ |
| `--cwd <dir>`      | Project directory                                |
| `--css <file>`     | Global stylesheet that imports Tailwind (`init`) |
| `--registry <url>` | Registry URL or local directory                  |
| `--overwrite`      | Replace files you have changed (`add`)           |
| `--force`          | Regenerate `beton.json` and the theme (`init`)   |
| `--no-install`     | Print the install command instead of running it  |
| `--dry-run`        | Show what would be written (`add`)               |

## Using the shadcn CLI instead

Béton is a standard shadcn registry. Add the namespace to `components.json`:

```json
{
  "registries": {
    "@beton": "https://beton.dev/r/{name}.json"
  }
}
```

Then install with `npx shadcn@latest add @beton/button`. Running
`npx beton-ui init` in a project with `components.json` adds the namespace for
you.

## Configuration

`beton.json`:

```json
{
  "registry": "https://beton.dev/r",
  "css": "src/app/globals.css",
  "aliases": {
    "ui": "@/components/ui",
    "lib": "@/lib"
  }
}
```

Components are written to `<ui>/beton/` and utilities to `<lib>/beton/`, so they
never collide with existing files.

## License

MIT with the Commons Clause condition. See
[LICENSE](https://github.com/nabrahma/Beton/blob/main/LICENSE).
