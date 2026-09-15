import { spawn } from "node:child_process";
import { existsSync } from "node:fs";
import { join } from "node:path";
import { readJson } from "./fs-utils.ts";

export type PackageManager = "pnpm" | "yarn" | "bun" | "npm";

export function detectPackageManager(cwd: string): PackageManager {
  const agent = process.env.npm_config_user_agent ?? "";
  if (existsSync(join(cwd, "pnpm-lock.yaml"))) return "pnpm";
  if (existsSync(join(cwd, "yarn.lock"))) return "yarn";
  if (existsSync(join(cwd, "bun.lock")) || existsSync(join(cwd, "bun.lockb"))) return "bun";
  if (existsSync(join(cwd, "package-lock.json"))) return "npm";
  if (agent.startsWith("pnpm")) return "pnpm";
  if (agent.startsWith("yarn")) return "yarn";
  if (agent.startsWith("bun")) return "bun";
  return "npm";
}

interface PackageJson {
  dependencies?: Record<string, string>;
  devDependencies?: Record<string, string>;
  peerDependencies?: Record<string, string>;
}

export function readPackageJson(cwd: string): PackageJson | undefined {
  return readJson<PackageJson>(join(cwd, "package.json"));
}

/** Returns the packages that are not yet declared in package.json. */
export function missingPackages(cwd: string, packages: string[]): string[] {
  const pkg = readPackageJson(cwd) ?? {};
  const declared = new Set(
    Object.keys({ ...pkg.dependencies, ...pkg.devDependencies, ...pkg.peerDependencies }),
  );
  return [...new Set(packages)].filter((name) => !declared.has(name)).sort();
}

// npm package name, optionally with a version range. Registry data is remote
// input, so anything else is refused before it can reach a shell.
const PACKAGE_SPEC = /^(@[a-z0-9-~][a-z0-9-._~]*\/)?[a-z0-9-~][a-z0-9-._~]*(@[\w.^~<>=*|-]+)?$/;

export function isValidPackageSpec(spec: string): boolean {
  return spec.length <= 214 && PACKAGE_SPEC.test(spec);
}

export function installCommand(manager: PackageManager, packages: string[]): [string, string[]] {
  const invalid = packages.filter((spec) => !isValidPackageSpec(spec));
  if (invalid.length)
    throw new Error(`Refusing to install invalid package names: ${invalid.join(", ")}`);
  const verb = manager === "npm" ? "install" : "add";
  return [manager, [verb, ...packages]];
}

export function installPackages(cwd: string, manager: PackageManager, packages: string[]) {
  const [command, args] = installCommand(manager, packages);
  return new Promise<void>((resolve, reject) => {
    const child = spawn(command, args, {
      cwd,
      stdio: "inherit",
      shell: process.platform === "win32",
    });
    child.on("error", reject);
    child.on("exit", (code) =>
      code === 0
        ? resolve()
        : reject(new Error(`${command} ${args.join(" ")} exited with ${code}`)),
    );
  });
}

export function tailwindMajor(cwd: string): number | undefined {
  const pkg = readPackageJson(cwd);
  const range = pkg?.dependencies?.tailwindcss ?? pkg?.devDependencies?.tailwindcss;
  const match = range?.match(/(\d+)/);
  return match ? Number(match[1]) : undefined;
}
