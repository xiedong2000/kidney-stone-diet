import type { Metadata } from "next";
import { PageIntro, PageShell } from "@/components/PageShell";
import { habits } from "@/lib/learn";

export const metadata: Metadata = {
  title: "Daily habits",
  description:
    "Fluid, sodium, food calcium, animal protein, oxalate, citrate, sugar, and supplements for kidney-stone prevention.",
};

export default function HabitsPage() {
  return (
    <PageShell width="narrow">
      <PageIntro eyebrow="Daily habits" title="The pattern matters more than one food">
        <p>
          People remember spinach and forget the salt. These are the habits
          stone clinics teach most often. Your numbers can differ if you have
          heart disease, kidney disease, pregnancy, or a fluid restriction.
        </p>
      </PageIntro>
      <div className="mt-10 space-y-8">
        {habits.map((habit, index) => (
          <article key={habit.id} id={habit.id} className="border-t border-line pt-6">
            <p className="text-sm font-semibold text-pine">0{index + 1}</p>
            <h2 className="mt-1 font-serif text-3xl text-ink">{habit.title}</h2>
            <p className="mt-3 leading-7 text-ink/80">{habit.lede}</p>
            <ul className="mt-4 list-disc space-y-2 pl-5 leading-7 text-ink/80">
              {habit.points.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </PageShell>
  );
}
