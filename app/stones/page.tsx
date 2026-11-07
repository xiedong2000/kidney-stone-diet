import type { Metadata } from "next";
import Link from "next/link";
import { PageIntro, PageShell } from "@/components/PageShell";
import { LocaleText } from "@/components/LocaleText";
import { stoneGuides, visitQuestions } from "@/lib/learn";
import { siteCopy } from "@/lib/site-copy";

export const metadata: Metadata = {
  title: "Stone types",
  description:
    "How diet changes for calcium oxalate, calcium phosphate, uric acid, cystine, and struvite kidney stones.",
};

export default function StonesPage() {
  return (
    <PageShell>
      <PageIntro eyebrow={<LocaleText english="Stone types" chinese={siteCopy.stones.eyebrow} />} title={<LocaleText english="The grocery list follows the crystal" chinese={siteCopy.stones.title} />}>
        <p><LocaleText
          english={<>If a stone was saved, it can be analyzed. If stones keep coming, a 24-hour urine test shows which number is off: volume, calcium, oxalate, uric acid, citrate, sodium, or how acidic the urine is. Diet is aimed at that number.</>}
          chinese={siteCopy.stones.intro}
        />
        </p>
      </PageIntro>

      <LocaleText
      english={<div className="mt-10 grid gap-5">
        {stoneGuides.map((stone) => (
          <article
            key={stone.id}
            id={stone.id}
            className="rounded-md border border-line bg-card p-5 sm:p-6"
          >
            <p className="text-sm font-semibold uppercase tracking-[0.14em] text-mineral">
              {stone.frequency}
            </p>
            <h2 className="mt-1 font-serif text-3xl text-ink">{stone.title}</h2>
            <p className="mt-3 max-w-3xl leading-7 text-ink/80">{stone.summary}</p>
            <div className="mt-5 grid gap-5 md:grid-cols-2">
              <div>
                <h3 className="font-semibold text-ink">Useful moves</h3>
                <ul className="mt-2 list-disc space-y-2 pl-5 text-sm leading-6 text-ink/80">
                  {stone.doThis.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-ink">Easy to get wrong</h3>
                <ul className="mt-2 list-disc space-y-2 pl-5 text-sm leading-6 text-ink/80">
                  {stone.leaveAlone.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
            <Link
              href="/check"
              className="mt-4 inline-block text-sm font-semibold text-pine underline decoration-pine/40 underline-offset-4"
            >
              Open the food checker
            </Link>
          </article>
        ))}
      </div>}
      chinese={<div className="mt-10 grid gap-5">
        {siteCopy.stones.types.map(([title, summary], index) => (
          <article key={title} id={stoneGuides[index].id} className="rounded-md border border-line bg-card p-5 sm:p-6">
            <h2 className="font-serif text-3xl text-ink">{title}</h2>
            <p className="mt-3 max-w-3xl leading-7 text-ink/80">{summary}</p>
            <Link href="/check" className="mt-4 inline-block text-sm font-semibold text-pine underline decoration-pine/40 underline-offset-4">
              {siteCopy.stones.checker}
            </Link>
          </article>
        ))}
      </div>}
      />

      <LocaleText english={<section id="questions" className="mt-12 rounded-md bg-mist p-6">
        <h2 className="font-serif text-3xl text-ink">Questions worth writing down</h2>
        <ol className="mt-4 list-decimal space-y-2 pl-5 leading-7 text-ink/80">
          {visitQuestions.map((question) => (
            <li key={question}>{question}</li>
          ))}
        </ol>
      </section>} chinese={<section id="questions" className="mt-12 rounded-md bg-mist p-6">
        <h2 className="font-serif text-3xl text-ink">{siteCopy.stones.questions}</h2>
        <ol className="mt-4 list-decimal space-y-2 pl-5 leading-7 text-ink/80">
          {siteCopy.stones.questionsList.map((question) => <li key={question}>{question}</li>)}
        </ol>
      </section>} />
    </PageShell>
  );
}
