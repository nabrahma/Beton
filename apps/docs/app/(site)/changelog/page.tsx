import type { Metadata } from "next";
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { PageHeader } from "@/components/page-header";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Changelog",
  description: "Release notes for Béton, generated from changesets.",
};

interface Release {
  version: string;
  sections: { heading: string; entries: string[] }[];
}

/** Parses a changesets-generated CHANGELOG.md into releases. */
function readReleases(): Release[] {
  const file = join(process.cwd(), "../../packages/react/CHANGELOG.md");
  if (!existsSync(file)) return [];
  const releases: Release[] = [];
  let current: Release | undefined;
  let section: Release["sections"][number] | undefined;
  for (const line of readFileSync(file, "utf8").split("\n")) {
    const version = line.match(/^## (.+)/);
    const heading = line.match(/^### (.+)/);
    const entry = line.match(/^- (.+)/);
    if (version) {
      current = { version: version[1] ?? "", sections: [] };
      releases.push(current);
      section = undefined;
    } else if (heading && current) {
      section = { heading: heading[1] ?? "", entries: [] };
      current.sections.push(section);
    } else if (entry && section) {
      section.entries.push((entry[1] ?? "").replace(/^[0-9a-f]{7}: /, ""));
    }
  }
  return releases;
}

export default function ChangelogPage() {
  const releases = readReleases();
  return (
    <main className="mx-auto w-full max-w-4xl px-4 py-12 sm:px-6">
      <PageHeader
        eyebrow="Releases"
        title="Changelog"
        description="Every release of the Béton packages."
      />
      {releases.length ? (
        <ol className="flex flex-col gap-10">
          {releases.map((release) => (
            <li key={release.version} className="border-3 border-border bg-raised shadow-sm">
              <h2 className="border-b-3 border-border bg-secondary px-5 py-3 font-display text-2xl font-black">
                {release.version}
              </h2>
              <div className="flex flex-col gap-4 p-5">
                {release.sections.map((s) => (
                  <section key={s.heading}>
                    <h3 className="font-mono text-sm font-bold uppercase">{s.heading}</h3>
                    <ul className="mt-2 flex list-[square] flex-col gap-1 pl-5">
                      {s.entries.map((e) => (
                        <li key={e}>{e}</li>
                      ))}
                    </ul>
                  </section>
                ))}
              </div>
            </li>
          ))}
        </ol>
      ) : (
        <div className="border-3 border-border bg-raised p-6 shadow-sm">
          <p className="font-display text-2xl font-black">No releases yet.</p>
          <p className="mt-2 text-lg">
            The first release, v0.1.0, is being prepared. Release notes will appear here
            automatically. Until then, follow the{" "}
            <a href={`${site.github}/commits/main`} className="font-bold underline">
              commit history
            </a>
            .
          </p>
        </div>
      )}
    </main>
  );
}
