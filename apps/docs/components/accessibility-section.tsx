import type { A11yResult, ComponentMeta } from "@/lib/components";

const TAG_LABELS: Record<string, string> = {
  axe: "axe violations",
  keyboard: "Keyboard",
  name: "Accessible name",
  focus: "Focus ring",
  motion: "Reduced motion",
};

export function ResultPill({ passed, total }: { passed: number; total: number }) {
  const ok = passed === total;
  return (
    <span
      className={`inline-flex items-center gap-1.5 border-2 border-border px-2 py-0.5 font-mono text-xs font-bold ${
        ok ? "bg-success" : "bg-danger"
      }`}
    >
      <span aria-hidden="true">{ok ? "✓" : "✗"}</span>
      {passed}/{total}
      <span className="sr-only">{ok ? "passing" : "failing"}</span>
    </span>
  );
}

export function AccessibilitySection({
  meta,
  result,
}: {
  meta: ComponentMeta;
  result?: A11yResult;
}) {
  const { keyboard, aria, notes, limitations } = meta.accessibility;

  return (
    <div className="flex flex-col gap-8">
      {result ? (
        <div className="flex flex-col gap-3 border-3 border-border bg-raised p-5 shadow-sm">
          <p className="font-display text-lg font-extrabold">Test results</p>
          <ul className="flex flex-wrap gap-x-6 gap-y-3">
            {Object.entries(result.tags).map(([tag, counts]) => (
              <li key={tag} className="flex items-center gap-2">
                <span className="font-medium">{TAG_LABELS[tag] ?? tag}</span>
                <ResultPill passed={counts.passed} total={counts.total} />
              </li>
            ))}
          </ul>
          <details>
            <summary className="cursor-pointer font-display font-bold">
              All {result.total} tests
            </summary>
            <ul className="mt-3 flex flex-col gap-1.5 text-sm">
              {result.tests.map((test) => (
                <li key={test.title} className="flex gap-2">
                  <span aria-hidden="true">{test.passed ? "✓" : "✗"}</span>
                  <span>
                    {test.title}
                    <span className="sr-only">{test.passed ? " (passing)" : " (failing)"}</span>
                  </span>
                </li>
              ))}
            </ul>
          </details>
        </div>
      ) : null}

      {keyboard.length ? (
        <div className="flex flex-col gap-3">
          <h3 className="font-display text-xl font-extrabold">Keyboard</h3>
          <div className="overflow-x-auto border-3 border-border bg-raised">
            <table className="w-full border-collapse text-left">
              <thead>
                <tr className="bg-secondary font-display">
                  <th scope="col" className="w-40 border-b-3 border-border px-4 py-2.5">
                    Key
                  </th>
                  <th scope="col" className="border-b-3 border-border px-4 py-2.5">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {keyboard.map((row) => (
                  <tr key={row.keys} className="border-b-2 border-border last:border-b-0">
                    <td className="px-4 py-3">
                      <kbd className="border-2 border-b-4 border-border bg-raised px-1.5 font-mono text-xs font-bold">
                        {row.keys}
                      </kbd>
                    </td>
                    <td className="px-4 py-3">{row.action}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : null}

      <div className="grid gap-6 md:grid-cols-2">
        <div className="flex flex-col gap-2">
          <h3 className="font-display text-xl font-extrabold">Semantics</h3>
          <ul className="flex list-[square] flex-col gap-1.5 pl-5">
            {aria.map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ul>
        </div>
        <div className="flex flex-col gap-2">
          <h3 className="font-display text-xl font-extrabold">Guidance</h3>
          <ul className="flex list-[square] flex-col gap-1.5 pl-5">
            {notes.map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ul>
        </div>
      </div>

      {limitations?.length ? (
        <div className="border-3 border-border bg-secondary p-4">
          <h3 className="font-display font-extrabold">Known limitations</h3>
          <ul className="mt-2 flex list-[square] flex-col gap-1 pl-5">
            {limitations.map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ul>
        </div>
      ) : null}
    </div>
  );
}
