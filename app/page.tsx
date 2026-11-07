"use client";

import Link from "next/link";
import { PageShell } from "@/components/PageShell";
import { useLanguage } from "@/components/LanguageProvider";
import { siteCopy } from "@/lib/site-copy";

const tasks = [
  {
    href: "/check",
    number: "01",
    title: "Check a food or serving",
    text: "Look up an ingredient or meal and see how it fits your stone type.",
    action: "Search foods",
  },
  {
    href: "/cuisines",
    number: "02",
    title: "Choose takeout",
    text: "Find practical restaurant choices and what to ask for on the side.",
    action: "Browse restaurant tips",
  },
  {
    href: "/habits",
    number: "03",
    title: "See daily basics",
    text: "Review common fluid, salt, and calcium targets in one place.",
    action: "View daily guide",
  },
  {
    href: "/meals",
    number: "04",
    title: "Plan sample days",
    text: "See example meals shaped around different kidney-stone types.",
    action: "Browse sample days",
  },
];

export default function HomePage() {
  const { language } = useLanguage();
  const chinese = language === "zh";
  return (
    <PageShell>
      <section className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-pine">
            {chinese ? siteCopy.home.eyebrow : "A practical guide for patients and families"}
          </p>
          <h1 className="mt-3 max-w-3xl font-serif text-[clamp(2.7rem,6vw,4.6rem)] leading-[1.02] tracking-tight text-ink">
            {chinese ? siteCopy.home.title : "What can we serve today?"}
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-ink/80">
            {chinese ? siteCopy.home.intro : "Check everyday foods, meal portions, and restaurant choices against the kind of kidney stone you have. If you do not know the type yet, start with the general guidance and avoid strict food bans."}
          </p>
          <Link
            href="/check"
            className="mt-7 inline-flex min-h-12 items-center rounded-md bg-pine px-5 text-sm font-semibold text-paper hover:bg-pine/90"
          >
            {chinese ? siteCopy.home.cta : "Check a food or meal"}
          </Link>
        </div>
        <aside className="rounded-md border border-line bg-card p-5 sm:p-6">
          <h2 className="font-serif text-2xl text-ink">{chinese ? siteCopy.home.daily : "Daily starting points"}</h2>
          <dl className="mt-4 space-y-3 text-sm leading-6">
            <div>
              <dt className="font-semibold text-ink">{chinese ? siteCopy.home.fluid : "Fluids"}</dt>
              <dd className="text-ink/75">{chinese ? siteCopy.home.fluidText : "A common goal is enough to make 2.5 L of urine daily."}</dd>
            </div>
            <div>
              <dt className="font-semibold text-ink">{chinese ? siteCopy.home.salt : "Salt"}</dt>
              <dd className="text-ink/75">{chinese ? siteCopy.home.saltText : "Many stone plans aim for no more than 2,300 mg sodium daily."}</dd>
            </div>
            <div>
              <dt className="font-semibold text-ink">{chinese ? siteCopy.home.calcium : "Calcium"}</dt>
              <dd className="text-ink/75">{chinese ? siteCopy.home.calciumText : "Keep normal calcium from food, often 1,000–1,200 mg daily, with meals."}</dd>
            </div>
          </dl>
          <p className="mt-4 border-t border-line pt-3 text-sm leading-6 text-ink/70">
            {chinese ? siteCopy.home.disclaimer : <>These are common adult targets, not personal prescriptions. There
            is no single daily oxalate limit for everyone; stone type, urine
            tests, kidney function, and fluid restrictions can change your plan.</>}
          </p>
          <Link
            href="/habits"
            className="mt-3 inline-block text-sm font-semibold text-pine underline decoration-pine/30 underline-offset-4"
          >
            {chinese ? siteCopy.home.fullGuide : "See the full daily guide"}
          </Link>
        </aside>
      </section>

      <section className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4" aria-label="What do you need?">
        {tasks.map((task, index) => {
          const translated = siteCopy.home.tasks[index];
          return (
          <Link
            key={task.href}
            href={task.href}
            className="group rounded-md border border-line bg-card p-5 hover:border-pine/50"
          >
            <p className="text-sm font-semibold text-pine">{task.number}</p>
            <h2 className="mt-2 font-serif text-2xl text-ink">{chinese ? translated[0] : task.title}</h2>
            <p className="mt-2 min-h-12 text-sm leading-6 text-ink/75">{chinese ? translated[1] : task.text}</p>
            <span className="mt-4 inline-block text-sm font-semibold text-pine group-hover:underline">
              {chinese ? translated[2] : task.action} →
            </span>
          </Link>
        );})}
      </section>

      <p className="mt-10 text-sm leading-6 text-ink/60">
        {chinese ? siteCopy.home.closing : <>StoneWise is an educational guide for adults, not a personal meal plan.
        Ask your care team to tailor daily targets to your stone analysis and
        urine test.</>}
      </p>
    </PageShell>
  );
}
