import type { Metadata } from "next";
import { PageIntro, PageShell } from "@/components/PageShell";
import { habits } from "@/lib/learn";

export const metadata: Metadata = {
  title: "Daily guide",
  description:
    "Fluid, sodium, food calcium, animal protein, oxalate, citrate, sugar, and supplements for kidney-stone prevention.",
};

export default function HabitsPage() {
  return (
    <PageShell width="narrow">
      <PageIntro eyebrow="Daily guide" title="A few daily targets to start with">
        <p>
          Common adult starting points—not personal prescriptions. Your stone
          type, urine test, kidney function, and any fluid limit can change your plan.
        </p>
      </PageIntro>

      <dl className="mt-8 grid gap-3 sm:grid-cols-2">
        <div className="rounded-md border border-line bg-card p-4">
          <dt className="font-semibold text-ink">Fluids</dt>
          <dd className="mt-1 text-sm leading-6 text-ink/75">A common goal is enough to make at least 2.5 L of urine daily. Drink amounts vary.</dd>
        </div>
        <div className="rounded-md border border-line bg-card p-4">
          <dt className="font-semibold text-ink">Sodium</dt>
          <dd className="mt-1 text-sm leading-6 text-ink/75">Many stone plans aim for no more than 2,300 mg daily; some need less.</dd>
        </div>
        <div className="rounded-md border border-line bg-card p-4">
          <dt className="font-semibold text-ink">Calcium</dt>
          <dd className="mt-1 text-sm leading-6 text-ink/75">Often 1,000–1,200 mg daily from food, eaten with meals.</dd>
        </div>
        <div className="rounded-md border border-line bg-card p-4">
          <dt className="font-semibold text-ink">Oxalate</dt>
          <dd className="mt-1 text-sm leading-6 text-ink/75">There is no one daily limit for everyone. Restrict high-oxalate foods only when your plan calls for it.</dd>
        </div>
      </dl>

      <section className="mt-10">
        <h2 className="font-serif text-2xl text-ink">More detail, if you need it</h2>
        <div className="mt-3 space-y-2">
          {habits.map((habit, index) => (
            <details key={habit.id} id={habit.id} className="rounded-md border border-line bg-card">
              <summary className="cursor-pointer p-4">
                <span className="mr-2 text-sm font-semibold text-pine">0{index + 1}</span>
                <span className="font-semibold text-ink">{habit.title}</span>
                <span className="mt-1 block text-sm leading-6 text-ink/70">{habit.lede}</span>
              </summary>
              <ul className="list-disc space-y-2 border-t border-line px-5 py-4 pl-9 text-sm leading-6 text-ink/80">
                {habit.points.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            </details>
          ))}
        </div>
      </section>
    </PageShell>
  );
}
