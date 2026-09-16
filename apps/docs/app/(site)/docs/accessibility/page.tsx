import type { Metadata } from "next";
import Link from "next/link";
import { ResultPill } from "@/components/accessibility-section";
import { PageHeader, SectionHeading } from "@/components/page-header";
import { getA11ySummary, getComponent } from "@/lib/components";

export const metadata: Metadata = {
  title: "Accessibility",
  description:
    "The accessibility standard every Béton component meets, with generated test results.",
};

const TAGS = [
  { id: "axe", label: "axe" },
  { id: "keyboard", label: "Keyboard" },
  { id: "name", label: "Name" },
  { id: "focus", label: "Focus" },
  { id: "motion", label: "Motion" },
] as const;

export default function AccessibilityPage() {
  const summary = getA11ySummary();
  const generated = new Date(summary.generatedAt);

  return (
    <article>
      <PageHeader
        eyebrow="WCAG 2.2 AA"
        title="Accessibility"
        description="Loud is not an excuse. A component that looks striking and traps keyboard focus is a broken component."
      >
        <dl className="grid grid-cols-2 gap-4 pt-2 sm:grid-cols-4">
          {[
            ["Components tested", summary.components.length],
            ["Tests", summary.total],
            ["Passing", summary.passed],
            ["axe suites clean", summary.axe],
          ].map(([label, value]) => (
            <div key={label} className="border-3 border-border bg-raised p-4 shadow-sm">
              <dt className="font-mono text-xs font-bold uppercase">{label}</dt>
              <dd className="font-display text-4xl font-black">{value}</dd>
            </div>
          ))}
        </dl>
      </PageHeader>

      <div className="flex flex-col gap-16">
        <section>
          <SectionHeading id="results">Test results</SectionHeading>
          <p className="mb-5 max-w-prose">
            This table is generated from the component test suite on every build. It is never edited
            by hand. Last run{" "}
            <time dateTime={generated.toISOString()}>
              {generated.toLocaleDateString("en-GB", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </time>
            .
          </p>
          <div
            className="overflow-x-auto border-3 border-border bg-raised shadow-sm"
            tabIndex={0}
            role="region"
            aria-label="Accessibility test results"
          >
            <table className="w-full min-w-[42rem] border-collapse text-left">
              <caption className="sr-only">Accessibility test results by component</caption>
              <thead>
                <tr className="bg-secondary font-display">
                  <th scope="col" className="border-b-3 border-border px-4 py-3">
                    Component
                  </th>
                  {TAGS.map((tag) => (
                    <th key={tag.id} scope="col" className="border-b-3 border-border px-4 py-3">
                      {tag.label}
                    </th>
                  ))}
                  <th scope="col" className="border-b-3 border-border px-4 py-3">
                    All tests
                  </th>
                </tr>
              </thead>
              <tbody>
                {summary.components.map(([slug, result]) => (
                  <tr key={slug} className="border-b-2 border-border last:border-b-0">
                    <th scope="row" className="px-4 py-3">
                      <Link
                        href={`/docs/components/${slug}#accessibility`}
                        className="font-display font-extrabold underline decoration-2 underline-offset-4"
                      >
                        {getComponent(slug)?.title ?? slug}
                      </Link>
                    </th>
                    {TAGS.map((tag) => {
                      const counts = result.tags[tag.id];
                      return (
                        <td key={tag.id} className="px-4 py-3">
                          {counts ? (
                            <ResultPill {...counts} />
                          ) : (
                            <span aria-label="Not applicable">—</span>
                          )}
                        </td>
                      );
                    })}
                    <td className="px-4 py-3">
                      <ResultPill passed={result.passed} total={result.total} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-3 text-sm">
            A dash means the check does not apply: presentational components have no motion to
            reduce, for example.
          </p>
        </section>

        <section className="prose-beton">
          <SectionHeading id="standard">The standard</SectionHeading>
          <p>Before a component merges, it must meet every item below.</p>
          <ul>
            <li>Keyboard reachable and operable, with tab order that matches visual order.</li>
            <li>A visible focus ring in every variant, including on accent fills.</li>
            <li>
              An accessible name from a label, <code>aria-label</code> or{" "}
              <code>aria-labelledby</code>.
            </li>
            <li>Zero axe violations across WCAG 2.0, 2.1 and 2.2 A and AA rules.</li>
            <li>Interactive targets of at least 44 × 44 pixels, including invisible hit area.</li>
            <li>
              Safe to server-render: no <code>window</code> or <code>document</code> access during
              render.
            </li>
            <li>
              Honours <code>prefers-reduced-motion</code>.
            </li>
            <li>
              Overlays trap focus, restore it on close, close on Escape and outside click, and make
              the background inert.
            </li>
          </ul>
        </section>

        <section className="prose-beton">
          <SectionHeading id="how">How it is tested</SectionHeading>
          <table>
            <thead>
              <tr>
                <th>Check</th>
                <th>How</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>axe</td>
                <td>axe-core runs against every variant and size of each component.</td>
              </tr>
              <tr>
                <td>Keyboard</td>
                <td>Testing Library and user-event drive every supported key.</td>
              </tr>
              <tr>
                <td>Accessible name</td>
                <td>Queries by role and name, the way assistive technology finds elements.</td>
              </tr>
              <tr>
                <td>Contrast</td>
                <td>
                  A CI script checks every permitted colour pairing in the tokens against 4.5:1 and
                  3:1.
                </td>
              </tr>
              <tr>
                <td>Server rendering</td>
                <td>Presentational components render to a string with no DOM.</td>
              </tr>
            </tbody>
          </table>
          <h3>The focus ring</h3>
          <p>
            A single-colour ring disappears against at least one of Béton&apos;s fills: an ink ring
            vanishes on dark content and a white ring vanishes on paper. Béton draws a 3px white
            ring at the element edge and a 3px ink outline beyond it, so one of the two always
            contrasts with whatever is behind it.
          </p>
          <h3>Colour</h3>
          <p>
            Accents are light, so text on an accent fill is always ink. None of the accents are
            allowed as text on paper or white, where they cannot reach 4.5:1. The recipes are
            checked for this in CI.
          </p>
        </section>

        <section className="prose-beton">
          <SectionHeading id="report">Report a problem</SectionHeading>
          <p>
            Accessibility bugs are release blockers. If something does not work with your assistive
            technology,{" "}
            <a href="https://github.com/nabrahma/Beton/issues/new?template=accessibility.yml">
              open an accessibility issue
            </a>
            .
          </p>
        </section>
      </div>
    </article>
  );
}
