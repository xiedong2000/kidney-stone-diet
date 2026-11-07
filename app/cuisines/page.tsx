import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PageIntro, PageShell } from "@/components/PageShell";
import { dishes } from "@/lib/dishes";
import type { Food } from "@/lib/model";

export const metadata: Metadata = {
  title: "Cuisines",
  description:
    "Kidney-stone guidance for Chinese, American, Mexican, Japanese, Indian, and Italian dishes, including the salty restaurant versions.",
};

const sections: { id: Food["cuisine"]; title: string; text: string }[] = [
  {
    id: "chinese",
    title: "Chinese",
    text: "Home cooking and a restaurant banquet are different meals. Steamed fish, garlic greens, tomato and egg, and plain congee fit a stone pattern. Soy sauce, doubanjiang, hot-pot broth, and sweet drinks do the damage. A teaspoon of sauce is not the same as a ladle.",
  },
  {
    id: "american",
    title: "American",
    text: "A grilled chicken plate with a potato and a low-oxalate vegetable is a normal dinner. A burger, fries, barbecue ribs, and a Caesar dressing are salt meals. Cheese on the burger is still calcium, and it does not erase the sodium.",
  },
  {
    id: "mexican",
    title: "Mexican",
    text: "Corn tortillas, salsa, peppers, beans, and a modest taco fit more easily than a burrito the length of your forearm. Horchata is a sweet drink. Nopales are the surprise: cactus is very high in oxalate.",
  },
  {
    id: "japanese",
    title: "Japanese",
    text: "Fish and rice can fit. The soy dish and the ramen broth are where the sodium sits. Edamame is a moderate-oxalate snack, not a free bowl, when calcium oxalate is your stone.",
  },
  {
    id: "indian",
    title: "Indian",
    text: "Dal and raita belong in the rotation. Saag paneer pairs spinach with calcium, which is the right idea, and the amount of spinach in a restaurant bowl is still large.",
  },
  {
    id: "italian",
    title: "Italian",
    text: "Pasta with tomato sauce and a simple margherita can fit. Jarred sauce and processed-meat toppings are the salty turn. Spinach stuffed inside the pasta is a higher-oxalate dish than tomato sauce.",
  },
];

export default function CuisinesPage() {
  return (
    <PageShell>
      <PageIntro eyebrow="Cuisines" title="The same rules, on different tables">
        <p>
          Stone prevention does not require a separate cuisine. It asks what
          is salty, what is a huge portion of meat, what is a sugar drink, and
          what is very high in oxalate. Search any of these dishes in the{" "}
          <Link href="/check" className="font-semibold text-pine underline decoration-pine/30 underline-offset-4">
            food checker
          </Link>{" "}
          after you pick your stone type.
        </p>
      </PageIntro>

      <div className="mt-10 space-y-12">
        {sections.map((section) => {
          const items = dishes.filter((dish) => dish.cuisine === section.id);
          return (
            <section key={section.id} id={section.id}>
              <h2 className="font-serif text-3xl text-ink">{section.title}</h2>
              <p className="mt-2 max-w-3xl leading-7 text-ink/80">{section.text}</p>
              <ul className="mt-5 grid gap-4 sm:grid-cols-2">
                {items.map((dish) => (
                  <li key={dish.id} className="overflow-hidden rounded-md border border-line bg-card">
                    {dish.image ? (
                      <Image
                        src={dish.image}
                        alt={dish.originalName ? `${dish.name}, ${dish.originalName}` : dish.name}
                        width={640}
                        height={480}
                        className="h-48 w-full object-cover"
                      />
                    ) : null}
                    <div className="p-4">
                      <h3 className="font-serif text-2xl text-ink">{dish.name}</h3>
                      {dish.originalName ? (
                        <p className="text-sm text-ink/55">{dish.originalName}</p>
                      ) : null}
                      <p className="mt-2 text-sm leading-6 text-ink/75">{dish.tip}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </section>
          );
        })}
      </div>
    </PageShell>
  );
}
