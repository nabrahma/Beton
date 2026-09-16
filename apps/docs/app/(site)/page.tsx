import { button } from "@beton-ui/recipes";
import Link from "next/link";
import { InlineCommand } from "@/components/code-block";
import { ArrowRightIcon, GitHubIcon } from "@/components/icons";
import { ComponentWall } from "@/components/landing/component-wall";
import { HeroPanel } from "@/components/landing/hero-panel";
import { TabDemo } from "@/components/landing/tab-demo";
import { getA11ySummary, getComponents } from "@/lib/components";
import { site } from "@/lib/site";

const ticker = [
  "Zero blur",
  "Hard shadows",
  "WCAG 2.2 AA",
  "44px targets",
  "Two-tone focus",
  "You own the code",
  "shadcn registry",
  "Reduced motion",
  "Server components",
];

export default function Home() {
  const components = getComponents();
  const a11y = getA11ySummary();

  return (
    <main>
      {/* ------------------------------------------------------------ hero */}
      <section className="bg-grid relative overflow-hidden border-b-3 border-border">
        <div className="mx-auto grid max-w-7xl items-center gap-14 px-4 py-16 sm:px-6 lg:grid-cols-[1.15fr_1fr] lg:py-24">
          <div className="flex flex-col gap-8">
            <p className="w-fit border-3 border-border bg-raised px-3 py-1 font-mono text-xs font-bold tracking-widest uppercase shadow-sm">
              v0.1 · {components.length} components · open source
            </p>
            <h1 className="font-display text-[clamp(3rem,8vw,6rem)] leading-[0.92] font-black tracking-tight text-balance">
              The complete{" "}
              <span className="relative inline-block -rotate-1 border-3 border-border bg-secondary px-2 shadow-sm font-stretch-wide">
                neobrutalist
              </span>{" "}
              toolkit for React.
            </h1>
            <p className="max-w-xl text-xl leading-relaxed sm:text-2xl">
              Components, blocks and templates.{" "}
              <strong>Loud on the surface, WCAG AA underneath.</strong>
            </p>
            <div className="flex max-w-xl flex-col gap-4">
              <InlineCommand command="npx beton-ui add button card" />
              <div className="flex flex-wrap gap-4">
                <Link href="/docs/components" className={button({ class: "gap-3" })}>
                  Browse components
                  <ArrowRightIcon className="size-5" />
                </Link>
                <a href={site.github} className={button({ variant: "secondary", class: "gap-3" })}>
                  <GitHubIcon className="size-5" />
                  Star on GitHub
                </a>
              </div>
            </div>
          </div>
          <HeroPanel />
        </div>
      </section>

      {/* ---------------------------------------------------------- ticker */}
      <div
        className="overflow-hidden border-b-3 border-border bg-ink py-3 text-paper"
        aria-hidden="true"
      >
        <div className="flex w-max animate-[ticker_40s_linear_infinite] gap-8 motion-reduce:animate-none">
          {[...ticker, ...ticker].map((item, i) => (
            <span
              key={i}
              className="flex items-center gap-8 font-display text-lg font-black tracking-wide uppercase"
            >
              {item}
              <span className="size-3 bg-secondary" />
            </span>
          ))}
        </div>
      </div>

      {/* ------------------------------------------------------------ wall */}
      <section aria-labelledby="wall" className="border-b-3 border-border">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
          <div className="mb-10 flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="mb-3 font-mono text-sm font-bold uppercase">01 / Components</p>
              <h2
                id="wall"
                className="font-display text-5xl leading-none font-black tracking-tight sm:text-6xl"
              >
                Poured, not polished.
              </h2>
            </div>
            <Link
              href="/docs/components"
              className={button({ variant: "secondary", class: "gap-2" })}
            >
              All components <ArrowRightIcon className="size-4" />
            </Link>
          </div>
          <ComponentWall />
        </div>
      </section>

      {/* ------------------------------------------------------ principles */}
      <section aria-labelledby="why" className="border-b-3 border-border bg-raised">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
          <p className="mb-3 font-mono text-sm font-bold uppercase">02 / Why Béton</p>
          <h2
            id="why"
            className="mb-12 max-w-3xl font-display text-5xl leading-none font-black tracking-tight sm:text-6xl"
          >
            Brutal to look at. Easy to live with.
          </h2>
          <div className="grid gap-6 md:grid-cols-3">
            {[
              {
                n: "A",
                title: "Complete",
                tone: "bg-primary",
                body: "Primitives, then forms, overlays, navigation, data display, motion and marketing blocks. One visual language from button to landing page.",
              },
              {
                n: "B",
                title: "Rigorous",
                tone: "bg-secondary",
                body: "Every component has axe, keyboard and accessible-name tests. The results are generated on every build and published, not claimed.",
              },
              {
                n: "C",
                title: "Yours",
                tone: "bg-success",
                body: "Components install as readable source with no runtime dependency on Béton. Styles live in recipes you can change in one place.",
              },
            ].map((item) => (
              <article
                key={item.title}
                className="flex flex-col border-3 border-border bg-surface shadow-lg"
              >
                <div
                  className={`flex items-center justify-between border-b-3 border-border px-6 py-4 ${item.tone}`}
                >
                  <h3 className="font-display text-3xl font-black uppercase">{item.title}</h3>
                  <span aria-hidden="true" className="font-mono text-2xl font-bold">
                    {item.n}
                  </span>
                </div>
                <p className="p-6 text-lg leading-relaxed">{item.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------- accessibility */}
      <section aria-labelledby="a11y" className="border-b-3 border-border">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 py-20 sm:px-6 lg:grid-cols-[1fr_1.1fr]">
          <div className="flex flex-col gap-6">
            <p className="font-mono text-sm font-bold uppercase">03 / Accessibility</p>
            <h2
              id="a11y"
              className="font-display text-5xl leading-none font-black tracking-tight sm:text-6xl"
            >
              Press Tab. Watch where it goes.
            </h2>
            <p className="text-lg leading-relaxed">
              A single-colour focus ring vanishes on at least one accent. Béton draws a white ring
              inside an ink outline, so focus is visible on teal, magenta, white and paper alike.
            </p>
            <dl className="grid grid-cols-3 gap-4">
              <div className="border-3 border-border bg-raised p-4">
                <dt className="font-mono text-xs font-bold uppercase">Tests</dt>
                <dd className="font-display text-4xl font-black">{a11y.total}</dd>
              </div>
              <div className="border-3 border-border bg-success p-4">
                <dt className="font-mono text-xs font-bold uppercase">Passing</dt>
                <dd className="font-display text-4xl font-black">{a11y.passed}</dd>
              </div>
              <div className="border-3 border-border bg-raised p-4">
                <dt className="font-mono text-xs font-bold uppercase">axe clean</dt>
                <dd className="font-display text-4xl font-black">{a11y.axe}</dd>
              </div>
            </dl>
            <Link
              href="/docs/accessibility"
              className={button({ variant: "secondary", class: "w-fit gap-2" })}
            >
              See the results <ArrowRightIcon className="size-4" />
            </Link>
          </div>
          <TabDemo />
        </div>
      </section>

      {/* ----------------------------------------------------------- agents */}
      <section aria-labelledby="agents" className="border-b-3 border-border bg-ink text-paper">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-20 sm:px-6 lg:grid-cols-2">
          <div className="flex flex-col gap-5">
            <p className="font-mono text-sm font-bold text-secondary uppercase">04 / Agents</p>
            <h2
              id="agents"
              className="font-display text-5xl leading-none font-black tracking-tight sm:text-6xl"
            >
              Your coding agent already speaks Béton.
            </h2>
            <p className="text-lg leading-relaxed">
              Béton is a standard shadcn registry. Cursor, Claude Code, v0 and friends install
              components with the commands they already know, dependencies and all.
            </p>
            <Link
              href="/docs/agents"
              className="w-fit font-display font-extrabold text-secondary underline decoration-3 underline-offset-4"
            >
              Installing with agents →
            </Link>
          </div>
          <div className="flex flex-col gap-4 border-3 border-paper p-6">
            {[
              "npx shadcn@latest add @beton/button",
              "npx beton-ui add card input",
              "curl https://beton.dev/r/registry.json",
            ].map((cmd) => (
              <code
                key={cmd}
                className="block border-2 border-paper/40 px-4 py-3 font-mono text-sm break-all"
              >
                <span aria-hidden="true" className="text-secondary">
                  ${" "}
                </span>
                {cmd}
              </code>
            ))}
          </div>
        </div>
      </section>

      {/* ----------------------------------------------------------- blocks */}
      <section aria-labelledby="blocks">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
          <div className="flex flex-col items-start gap-8 border-3 border-border bg-secondary p-8 shadow-lg sm:p-12 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex flex-col gap-3">
              <p className="font-mono text-sm font-bold uppercase">05 / Blocks</p>
              <h2
                id="blocks"
                className="max-w-2xl font-display text-4xl leading-none font-black tracking-tight sm:text-5xl"
              >
                Heroes, pricing tables and footers are next on the pour.
              </h2>
              <p className="max-w-xl text-lg">
                Watch the repository to hear when marketing blocks land.
              </p>
            </div>
            <a href={site.github} className={button({ size: "lg", class: "gap-3" })}>
              <GitHubIcon className="size-5" />
              Watch on GitHub
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
