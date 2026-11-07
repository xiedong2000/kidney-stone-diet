import type { Metadata } from "next";
import { PageIntro, PageShell } from "@/components/PageShell";
import { LocaleText } from "@/components/LocaleText";
import { mealPlans } from "@/lib/learn";
import { siteCopy } from "@/lib/site-copy";

export const metadata: Metadata = {
  title: "Sample days",
  description:
    "Example days of eating for an unknown stone, calcium oxalate stones, and uric acid stones.",
};

const notes = [
  {
    title: "Calcium phosphate",
    text: "Use the calcium oxalate day, and do not add a large juice or baking-soda routine. Whole fruit can stay. Ask before any alkali.",
  },
  {
    title: "Cystine",
    text: "Use the general day, keep the meat portions where they are or smaller, and add the water your clinician set, including overnight. Salt stays lower than a typical restaurant week.",
  },
  {
    title: "Struvite",
    text: "Eat an ordinary healthy pattern. These sample days will not treat an infection stone. Follow the plan to clear the infection and remove the stone.",
  },
];

export default function MealsPage() {
  return (
    <PageShell>
      <PageIntro eyebrow={<LocaleText english="Sample days" chinese={siteCopy.meals.eyebrow} />} title={<LocaleText english="One day, written as a pattern" chinese={siteCopy.meals.title} />}>
        <p><LocaleText
          english={<>These are illustrations for adults without a fluid restriction. They are not a calorie plan, a kidney-disease diet, or a substitute for a dietitian. Repeat the shape of the plate more than the exact menu.</>}
          chinese={siteCopy.meals.intro}
        />
        </p>
      </PageIntro>

      <LocaleText
        english={<div className="mt-10 space-y-10">
        {mealPlans.map((plan) => (
          <article key={plan.id} id={plan.id}>
            <h2 className="font-serif text-3xl text-ink">{plan.title}</h2>
            <p className="mt-2 max-w-3xl leading-7 text-ink/80">{plan.intro}</p>
            <div className="mt-4 grid gap-3 md:grid-cols-2">
              {plan.meals.map((meal) => (
                <div key={meal.name} className="rounded-md border border-line bg-card p-4">
                  <h3 className="font-semibold text-pine">{meal.name}</h3>
                  <p className="mt-2 leading-7 text-ink">{meal.plate}</p>
                  <p className="mt-2 text-sm leading-6 text-ink/70">{meal.why}</p>
                </div>
              ))}
            </div>
            <p className="mt-3 text-sm leading-6 text-ink/75">
              <span className="font-semibold text-ink">Drinks. </span>
              {plan.drinks}
            </p>
          </article>
        ))}
      </div>}
        chinese={<div className="mt-10 space-y-10">
          {siteCopy.meals.examples.map((plan) => (
            <article key={plan.title}>
              <h2 className="font-serif text-3xl text-ink">{plan.title}</h2>
              <p className="mt-2 max-w-3xl leading-7 text-ink/80">{plan.intro}</p>
              <div className="mt-4 grid gap-3 md:grid-cols-2">
                {plan.meals.map(([name, plate]) => (
                  <div key={name} className="rounded-md border border-line bg-card p-4">
                    <h3 className="font-semibold text-pine">{name}</h3>
                    <p className="mt-2 leading-7 text-ink">{plate}</p>
                  </div>
                ))}
              </div>
              <p className="mt-3 text-sm leading-6 text-ink/75"><span className="font-semibold text-ink">{siteCopy.meals.drinks}</span>{plan.drinks}</p>
            </article>
          ))}
          <section className="grid gap-4 md:grid-cols-3">
            {[
              [siteCopy.meals.calciumPhosphate, siteCopy.meals.calciumPhosphateText],
              [siteCopy.meals.cystine, siteCopy.meals.cystineText],
              [siteCopy.meals.struvite, siteCopy.meals.struviteText],
            ].map(([title, text]) => (
              <div key={title} className="rounded-md bg-mist p-4">
                <h2 className="font-serif text-2xl text-ink">{title}</h2>
                <p className="mt-2 text-sm leading-6 text-ink/80">{text}</p>
              </div>
            ))}
          </section>
        </div>}
      />

      <LocaleText english={<section className="mt-12 grid gap-4 md:grid-cols-3">
        {notes.map((note) => (
          <div key={note.title} className="rounded-md bg-mist p-4">
            <h2 className="font-serif text-2xl text-ink">{note.title}</h2>
            <p className="mt-2 text-sm leading-6 text-ink/80">{note.text}</p>
          </div>
        ))}
      </section>} chinese={<></>} />
    </PageShell>
  );
}
