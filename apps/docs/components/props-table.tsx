import type { PropInfo } from "@/lib/components";

export function PropsTable({ name, props }: { name: string; props: PropInfo[] }) {
  const own = props.filter((prop) => !prop.inherited);
  const inherited = props.filter((prop) => prop.inherited);

  return (
    <div className="flex flex-col gap-2">
      <h3 className="font-mono text-lg font-bold">{name}</h3>
      <div
        className="overflow-x-auto border-3 border-border bg-raised"
        tabIndex={0}
        role="region"
        aria-label={`${name} props`}
      >
        <table className="w-full min-w-[40rem] border-collapse text-left text-sm">
          <thead>
            <tr className="bg-secondary font-display">
              <th scope="col" className="border-b-3 border-border px-4 py-2.5">
                Prop
              </th>
              <th scope="col" className="border-b-3 border-border px-4 py-2.5">
                Type
              </th>
              <th scope="col" className="border-b-3 border-border px-4 py-2.5">
                Default
              </th>
            </tr>
          </thead>
          <tbody>
            {[...own, ...inherited].map((prop) => (
              <tr key={prop.name} className="border-b-2 border-border last:border-b-0 align-top">
                <th scope="row" className="px-4 py-3 font-mono font-bold whitespace-nowrap">
                  {prop.name}
                  {prop.required ? <span aria-label="required"> *</span> : null}
                  {prop.inherited ? (
                    <span className="ml-2 border-2 border-border px-1 text-[0.65rem] uppercase">
                      Base UI
                    </span>
                  ) : null}
                </th>
                <td className="px-4 py-3">
                  <code className="font-mono text-xs break-words">{prop.type}</code>
                  {prop.description ? <p className="mt-1.5 text-sm">{prop.description}</p> : null}
                </td>
                <td className="px-4 py-3 font-mono text-xs whitespace-nowrap">
                  {prop.default ?? "—"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
