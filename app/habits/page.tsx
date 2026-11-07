import type { Metadata } from "next";
import { PageIntro, PageShell } from "@/components/PageShell";
import { LocaleText } from "@/components/LocaleText";
import { habits } from "@/lib/learn";
import { siteCopy } from "@/lib/site-copy";

export const metadata: Metadata = {
  title: "Daily guide",
  description:
    "Fluid, sodium, food calcium, animal protein, oxalate, citrate, sugar, and supplements for kidney-stone prevention.",
};

export default function HabitsPage() {
  return (
    <PageShell width="narrow">
      <PageIntro eyebrow={<LocaleText english="Daily guide" chinese={siteCopy.habits.eyebrow} />} title={<LocaleText english="A few daily targets to start with" chinese={siteCopy.habits.title} />}>
        <p><LocaleText
          english={<>Common adult starting points—not personal prescriptions. Your stone type, urine test, kidney function, and any fluid limit can change your plan.</>}
          chinese={siteCopy.habits.intro}
        />
        </p>
      </PageIntro>

      <dl className="mt-8 grid gap-3 sm:grid-cols-2">
        <div className="rounded-md border border-line bg-card p-4">
          <dt className="font-semibold text-ink"><LocaleText english="Fluids" chinese={siteCopy.habits.fluids} /></dt>
          <dd className="mt-1 text-sm leading-6 text-ink/75"><LocaleText english="A common goal is enough to make at least 2.5 L of urine daily. Drink amounts vary." chinese={siteCopy.habits.fluidsText} /></dd>
        </div>
        <div className="rounded-md border border-line bg-card p-4">
          <dt className="font-semibold text-ink"><LocaleText english="Sodium" chinese={siteCopy.habits.sodium} /></dt>
          <dd className="mt-1 text-sm leading-6 text-ink/75"><LocaleText english="Many stone plans aim for no more than 2,300 mg daily; some need less." chinese={siteCopy.habits.sodiumText} /></dd>
        </div>
        <div className="rounded-md border border-line bg-card p-4">
          <dt className="font-semibold text-ink"><LocaleText english="Calcium" chinese={siteCopy.habits.calcium} /></dt>
          <dd className="mt-1 text-sm leading-6 text-ink/75"><LocaleText english="Often 1,000–1,200 mg daily from food, eaten with meals." chinese={siteCopy.habits.calciumText} /></dd>
        </div>
        <div className="rounded-md border border-line bg-card p-4">
          <dt className="font-semibold text-ink"><LocaleText english="Oxalate" chinese={siteCopy.habits.oxalate} /></dt>
          <dd className="mt-1 text-sm leading-6 text-ink/75"><LocaleText english="There is no one daily limit for everyone. Restrict high-oxalate foods only when your plan calls for it." chinese={siteCopy.habits.oxalateText} /></dd>
        </div>
      </dl>

      <section className="mt-10">
        <h2 className="font-serif text-2xl text-ink"><LocaleText english="More detail, if you need it" chinese={siteCopy.habits.more} /></h2>
        <div className="mt-3 space-y-2">
          <LocaleText
            english={habits.map((habit, index) => (
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
            chinese={<div className="space-y-2">{siteCopy.habits.topics.map(([title, detail], index) => (
              <details key={title} id={habits[index].id} className="rounded-md border border-line bg-card">
                <summary className="cursor-pointer p-4">
                  <span className="mr-2 text-sm font-semibold text-pine">0{index + 1}</span>
                  <span className="font-semibold text-ink">{title}</span>
                  <span className="mt-1 block text-sm leading-6 text-ink/70">{detail}</span>
                </summary>
              </details>
            ))}</div>}
          />
        </div>
      </section>
    </PageShell>
  );
}
