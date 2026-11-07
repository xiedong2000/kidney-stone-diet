import Image from "next/image";
import Link from "next/link";
import { PageShell } from "@/components/PageShell";
import { dishes } from "@/lib/dishes";
import { visitQuestions } from "@/lib/learn";

const galleryIds = [
  "tomato-egg",
  "bok-choy",
  "congee",
  "grilled-chicken-plate",
  "street-tacos",
  "nopales",
  "ramen",
  "dal",
];

const starts = [
  {
    href: "/check",
    title: "Check a food",
    text: "See a usual portion called usually fine, mind the portion, or keep it rare. The label changes with the stone type.",
  },
  {
    href: "/habits",
    title: "Learn the daily habits",
    text: "Fluid, salt, calcium with meals, modest meat, and oxalate only when a test says it matters.",
  },
  {
    href: "/stones",
    title: "Match the stone you formed",
    text: "Calcium oxalate, calcium phosphate, uric acid, cystine, and infection stones do not share one food list.",
  },
];

export default function HomePage() {
  return (
    <PageShell>
      <section className="grid items-start gap-8 lg:grid-cols-[1.35fr_0.75fr]">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-pine">
            For adults with kidney stones
          </p>
          <h1 className="mt-3 max-w-3xl font-serif text-[clamp(2.7rem,6vw,4.6rem)] leading-[1.02] tracking-tight text-ink">
            Eat in a way that gives stones less to work with.
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-ink/80">
            StoneWise explains the diet patterns clinicians use for kidney
            stones: enough fluid, less salt, calcium from food, and a short
            list of foods that matter for your stone type. It is a starting
            point to take to a clinician or a kidney dietitian.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link
              href="/check"
              className="inline-flex min-h-12 items-center rounded-md bg-pine px-5 text-sm font-semibold text-paper hover:bg-pine/90"
            >
              Check a food
            </Link>
            <Link
              href="/habits"
              className="inline-flex min-h-12 items-center rounded-md border border-pine px-5 text-sm font-semibold text-pine hover:bg-mist"
            >
              See the daily habits
            </Link>
          </div>
        </div>
        <aside className="border border-line bg-card p-6 shadow-[8px_8px_0_#1e4f4818]">
          <h2 className="font-serif text-2xl text-ink">Before any food ban</h2>
          <ol className="mt-4 space-y-3 text-sm leading-6 text-ink/80">
            <li>
              <span className="font-semibold text-ink">1. Fluid first. </span>
              Most stone plans aim for enough to make at least 2.5 liters of
              urine a day, unless you have been told to limit fluid.
            </li>
            <li>
              <span className="font-semibold text-ink">2. Salt down. </span>
              Sodium pulls calcium into the urine. Packages and restaurants
              hide more of it than the shaker.
            </li>
            <li>
              <span className="font-semibold text-ink">3. Calcium stays. </span>
              Eat dairy or another calcium food with meals. A low-calcium diet
              can make calcium oxalate stones more likely.
            </li>
            <li>
              <span className="font-semibold text-ink">4. Name the stone. </span>
              Oxalate lists, alkali, and purine limits are for specific stones.
              Guessing the wrong list wastes the effort.
            </li>
          </ol>
        </aside>
      </section>

      <figure className="mt-12 overflow-hidden rounded-md border border-line">
        <Image
          src="/foods/table-spread.jpg"
          alt="A shared table with tomato and egg, tacos, grilled chicken, and congee"
          width={1600}
          height={900}
          priority
          className="h-56 w-full object-cover sm:h-80"
        />
      </figure>

      <section className="mt-8">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <h2 className="font-serif text-3xl text-ink">Meals, not just ingredients</h2>
          <Link
            href="/cuisines"
            className="text-sm font-semibold text-pine underline decoration-pine/40 underline-offset-4"
          >
            Browse by cuisine
          </Link>
        </div>
        <p className="mt-2 max-w-2xl leading-7 text-ink/75">
          Chinese, American, Mexican, and other tables follow the same rules.
          Restaurant salt is usually the problem. A few dishes, such as nopales
          and saag, hide a lot of oxalate.
        </p>
        <ul className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {galleryIds.map((id) => {
            const dish = dishes.find((item) => item.id === id);
            if (!dish?.image) return null;
            return (
              <li key={dish.id}>
                <Link href="/cuisines" className="group block overflow-hidden rounded-md border border-line bg-card">
                  <Image
                    src={dish.image}
                    alt={dish.originalName ? `${dish.name}, ${dish.originalName}` : dish.name}
                    width={640}
                    height={480}
                    className="h-32 w-full object-cover sm:h-36"
                  />
                  <span className="block px-3 py-2 text-sm font-semibold text-ink group-hover:text-pine">
                    {dish.originalName ?? dish.name}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </section>

      <section className="mt-14 grid gap-4 md:grid-cols-3">
        {starts.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="block rounded-md border border-line bg-card p-5 hover:border-pine/40"
          >
            <h2 className="font-serif text-2xl text-ink">{item.title}</h2>
            <p className="mt-2 text-sm leading-6 text-ink/75">{item.text}</p>
          </Link>
        ))}
      </section>

      <section className="mt-14 grid gap-8 lg:grid-cols-2">
        <div>
          <h2 className="font-serif text-3xl text-ink">What this will not do</h2>
          <ul className="mt-4 space-y-3 leading-7 text-ink/80">
            <li>It will not tell you that a food is safe for your body.</li>
            <li>
              It will not replace a stone analysis or a 24-hour urine test.
            </li>
            <li>
              It is written for adults. Children, pregnancy, one kidney, a
              transplant, and chronic kidney disease need their own plan.
              People with reduced kidney function should not eat star fruit.
            </li>
            <li>
              Infection stones, called struvite, are treated by clearing
              infection and removing the stone. A grocery list does not do that.
            </li>
          </ul>
        </div>
        <div className="rounded-md bg-mist p-6">
          <h2 className="font-serif text-3xl text-ink">Ask at the next visit</h2>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-6 text-ink/80">
            {visitQuestions.slice(0, 4).map((question) => (
              <li key={question}>{question}</li>
            ))}
          </ul>
          <Link
            href="/stones#questions"
            className="mt-4 inline-block text-sm font-semibold text-pine underline decoration-pine/40 underline-offset-4"
          >
            See the full question list
          </Link>
        </div>
      </section>
    </PageShell>
  );
}
