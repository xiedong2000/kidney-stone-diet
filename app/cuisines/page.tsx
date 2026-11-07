import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PageIntro, PageShell } from "@/components/PageShell";
import { dishes } from "@/lib/dishes";
import type { Food } from "@/lib/model";

export const metadata: Metadata = {
  title: "Restaurant and takeout",
  description:
    "Kidney-stone guidance for Chinese, American, Mexican, Japanese, Indian, and Italian dishes, including the salty restaurant versions.",
};

const sections: { id: Food["cuisine"]; title: string; text: string }[] = [
  {
    id: "chinese",
    title: "Chinese",
    text: "Try steamed or plain dishes; ask for salty sauces on the side.",
  },
  {
    id: "american",
    title: "American",
    text: "Choose a simple grilled plate; go easy on processed meat, sauces, and fries.",
  },
  {
    id: "mexican",
    title: "Mexican",
    text: "Tacos with corn tortillas can be easier to portion than oversized combo meals.",
  },
  {
    id: "japanese",
    title: "Japanese",
    text: "Fish and rice are flexible choices; broth and soy-based sauces can be salty.",
  },
  {
    id: "indian",
    title: "Indian",
    text: "Dal and raita are options; ask about spinach-heavy dishes if oxalate is a concern.",
  },
  {
    id: "italian",
    title: "Italian",
    text: "Simple tomato pasta is flexible; processed-meat toppings and spinach fillings may change the choice.",
  },
];

export default function CuisinesPage() {
  return (
    <PageShell>
      <PageIntro eyebrow="Restaurant and takeout" title="Make the order work for you">
        <p>
          Choose a cuisine for quick ordering ideas, or search a menu item in the{" "}
          <Link href="/check" className="font-semibold text-pine underline decoration-pine/30 underline-offset-4">
            food and serving checker
          </Link>
          . These are examples, not a complete restaurant-menu list. If a dish
          is not listed, search its main ingredients separately in the{" "}
          <Link href="/check" className="font-semibold text-pine underline decoration-pine/30 underline-offset-4">
            food and serving checker
          </Link>
          . Recipes and portions vary, so confirm ingredients and sauces with
          the restaurant.
        </p>
      </PageIntro>

      <div className="mt-8 space-y-3">
        {sections.map((section) => {
          const items = dishes.filter((dish) => dish.cuisine === section.id);
          return (
            <details key={section.id} id={section.id} className="group rounded-md border border-line bg-card">
              <summary className="flex cursor-pointer list-none flex-wrap items-baseline justify-between gap-x-4 gap-y-1 p-4">
                <span className="font-serif text-2xl text-ink">{section.title}</span>
                <span className="text-sm text-ink/65">{section.text}</span>
              </summary>
              <ul className="grid gap-3 border-t border-line p-4 sm:grid-cols-2">
                {items.map((dish) => (
                  <li key={dish.id} className="rounded-md bg-paper/70 p-3">
                    {dish.image ? (
                      <Image
                        src={dish.image}
                        alt={dish.originalName ? `${dish.name}, ${dish.originalName}` : dish.name}
                        width={640}
                        height={480}
                        className="mb-3 h-36 w-full rounded-sm object-cover"
                      />
                    ) : null}
                    <h3 className="font-semibold text-ink">{dish.name}</h3>
                    {dish.originalName ? <p className="text-xs text-ink/55">{dish.originalName}</p> : null}
                    <p className="mt-1 text-sm leading-6 text-ink/75">{dish.tip}</p>
                  </li>
                ))}
              </ul>
            </details>
          );
        })}
      </div>
    </PageShell>
  );
}
