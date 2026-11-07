import type { Metadata } from "next";
import { PageIntro, PageShell } from "@/components/PageShell";
import { LocaleText } from "@/components/LocaleText";
import { reviewed, sources } from "@/lib/learn";
import { siteCopy } from "@/lib/site-copy";

export const metadata: Metadata = {
  title: "Sources",
  description:
    "Where the StoneWise kidney stone diet guidance comes from, and what it cannot decide for you.",
};

const rules = [
  "High sodium is marked keep it rare for calcium and cystine stones, because salt raises calcium or cystine in the urine.",
  "Very high oxalate foods are marked keep it rare only for calcium oxalate stones. If you do not know the stone, they are marked mind the portion.",
  "Organ meats, anchovies, sardines, and similar seafoods are the purine foods. They are marked keep it rare for uric acid stones.",
  "Sugar-sweetened drinks are marked keep it rare across stone types.",
  "Dairy stays in the usually fine column. The calcium is meant to be eaten with meals.",
  "Struvite results stay ordinary on purpose. Diet is not the treatment for infection stones.",
  "Star fruit is marked keep it rare for every stone, because of oxalate and because it can be toxic when kidney function is low.",
];

export default function AboutPage() {
  return (
    <PageShell width="narrow">
      <PageIntro eyebrow={<LocaleText english="Sources and limits" chinese={siteCopy.about.eyebrow} />} title={<LocaleText english="How this guide was put together" chinese={siteCopy.about.title} />}>
        <p><LocaleText
          english={<>StoneWise is a learning project and a public explanation. It summarizes diet patterns from kidney-stone guidelines and major patient-education pages. It was last reviewed in {reviewed}.</>}
          chinese={<>{siteCopy.about.intro} {reviewed}。</>}
        />
        </p>
        <p><LocaleText
          english={<>It cannot see your stone analysis, urine collection, medicines, kidney function, or the rest of what you ate today. Two people with the same stone name can still need different plans.</>}
          chinese={siteCopy.about.limit}
        />
        </p>
      </PageIntro>

      <LocaleText english={<>
      <section className="mt-10">
        <h2 className="font-serif text-3xl text-ink">How a label is chosen</h2>
        <ul className="mt-4 list-disc space-y-2 pl-5 leading-7 text-ink/80">
          {rules.map((rule) => (
            <li key={rule}>{rule}</li>
          ))}
        </ul>
        <p className="mt-4 leading-7 text-ink/80">
          Older handouts sometimes say to eliminate nuts, tea, berries, and
          even kale. Kale is a low-oxalate green, and a long ban is not what
          current guidance teaches. This site follows the narrower rule: limit
          the very high-oxalate foods when urine oxalate is high, and keep
          calcium intake normal.
        </p>
        <p className="mt-3 leading-7 text-ink/80">
          One public NIDDK page groups dairy with animal protein to limit, and
          also tells readers to get enough calcium. Specialty guidance usually
          resolves that by keeping dairy as the calcium source and trimming
          meat, poultry, and seafood instead. StoneWise does it that way.
        </p>
      </section>

      <section className="mt-10">
        <h2 className="font-serif text-3xl text-ink">Reading list</h2>
        <ul className="mt-4 space-y-5">
          {sources.map((source) => (
            <li key={source.href}>
              <a
                href={source.href}
                className="font-semibold text-pine underline decoration-pine/30 underline-offset-4"
                {...(source.href.startsWith("http")
                  ? { target: "_blank", rel: "noopener noreferrer" }
                  : {})}
              >
                {source.title}
              </a>
              <p className="text-sm text-ink/60">{source.name}</p>
              <p className="mt-1 text-sm leading-6 text-ink/75">{source.note}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-10">
        <h2 className="font-serif text-3xl text-ink">Who should not use this as their plan</h2>
        <ul className="mt-4 list-disc space-y-2 pl-5 leading-7 text-ink/80">
          <li>Children. Use a pediatric clinician and the NIDDK page written for children.</li>
          <li>Pregnancy, one kidney, a transplant, or chronic kidney disease.</li>
          <li>
            Anyone told to limit fluid, potassium, or protein for heart or kidney disease.
          </li>
          <li>
            People with gastric bypass or chronic diarrhea, who often need a
            specific oxalate and calcium plan.
          </li>
        </ul>
        <p className="mt-4 leading-7 text-ink/80">
          A registered dietitian who knows kidney stones can turn a urine test
          into portions. The Academy of Nutrition and Dietetics has a directory
          at{" "}
          <a
            href="https://www.eatright.org/find-a-nutrition-expert"
            className="font-semibold text-pine underline decoration-pine/30 underline-offset-4"
            target="_blank"
            rel="noopener noreferrer"
          >
            eatright.org/find-a-nutrition-expert
          </a>
          .
        </p>
      </section>
      </>} chinese={<>
      <section className="mt-10">
        <h2 className="font-serif text-3xl text-ink">{siteCopy.about.label}</h2>
        <ul className="mt-4 list-disc space-y-2 pl-5 leading-7 text-ink/80">
          {siteCopy.about.rules.map((rule) => <li key={rule}>{rule}</li>)}
        </ul>
        <p className="mt-4 leading-7 text-ink/80">{siteCopy.about.caution}</p>
        <p className="mt-3 leading-7 text-ink/80">不同公共健康资料的概括方式可能不同；本指南依据泌尿科专科建议，将奶制品作为钙来源，并着重控制肉类、禽类和海鲜份量。</p>
      </section>
      <section className="mt-10">
        <h2 className="font-serif text-3xl text-ink">{siteCopy.about.reading}</h2>
        <p className="mt-2 text-sm leading-6 text-ink/70">以下为原始资料链接；标题保留原文，具体建议请查阅来源页面。</p>
        <ul className="mt-4 space-y-5">
          {sources.map((source) => (
            <li key={source.href}>
              <a href={source.href} className="font-semibold text-pine underline decoration-pine/30 underline-offset-4" {...(source.href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}>{source.title}</a>
              <p className="text-sm text-ink/60">{source.name}</p>
            </li>
          ))}
        </ul>
      </section>
      <section className="mt-10">
        <h2 className="font-serif text-3xl text-ink">{siteCopy.about.who}</h2>
        <ul className="mt-4 list-disc space-y-2 pl-5 leading-7 text-ink/80">
          {siteCopy.about.conditionsList.map((item) => <li key={item}>{item}</li>)}
        </ul>
        <p className="mt-4 leading-7 text-ink/80">{siteCopy.about.dietitian}{" "}
          <a href="https://www.eatright.org/find-a-nutrition-expert" className="font-semibold text-pine underline decoration-pine/30 underline-offset-4" target="_blank" rel="noopener noreferrer">eatright.org/find-a-nutrition-expert</a>
        </p>
      </section>
      </>} />
    </PageShell>
  );
}
