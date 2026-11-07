"use client";

import Image from "next/image";
import { useState } from "react";
import { useLanguage } from "@/components/LanguageProvider";
import { chineseFoodName, chineseFoodTip, chineseFocus, chineseGuidance, chineseVerdict } from "@/lib/chinese-localization";
import { siteCopy } from "@/lib/site-copy";
import { dishes } from "@/lib/dishes";
import { guidanceFor } from "@/lib/guidance";
import { stoneFocuses, verdicts, type Food } from "@/lib/model";

const sections: { id: Food["cuisine"]; title: string; text: string; thumbnail: string }[] = [
  { id: "chinese", title: "Chinese", text: "Try steamed or plain dishes; ask for salty sauces on the side.", thumbnail: "/foods/cuisines/chinese.webp" },
  { id: "american", title: "American", text: "Choose a simple grilled plate; go easy on processed meat, sauces, and fries.", thumbnail: "/foods/cuisines/american.webp" },
  { id: "mexican", title: "Mexican", text: "Tacos with corn tortillas can be easier to portion than oversized combo meals.", thumbnail: "/foods/cuisines/mexican.webp" },
  { id: "japanese", title: "Japanese", text: "Fish and rice are flexible choices; broth and soy-based sauces can be salty.", thumbnail: "/foods/cuisines/japanese.webp" },
  { id: "indian", title: "Indian", text: "Dal and raita are options; ask about spinach-heavy dishes if oxalate is a concern.", thumbnail: "/foods/cuisines/indian.webp" },
  { id: "italian", title: "Italian", text: "Simple tomato pasta is flexible; processed-meat toppings and spinach fillings may change the choice.", thumbnail: "/foods/cuisines/italian.webp" },
];

const verdictStyle = {
  fits: "bg-sage/10 text-sage border-sage/30",
  careful: "bg-amber/10 text-amber border-amber/30",
  limit: "bg-clay/10 text-clay border-clay/30",
} as const;

export function CuisineGuide() {
  const [focus, setFocus] = useState<(typeof stoneFocuses)[number]["id"]>("unsure");
  const { language } = useLanguage();
  const chinese = language === "zh";
  const chineseGroups = [
    {
      id: "takeout",
      title: chinese ? siteCopy.cuisines.chineseGroups.takeout : "Chinese takeout favorites",
      description: chinese
        ? siteCopy.cuisines.chineseGroups.takeoutDescription
        : "Familiar restaurant and takeout dishes; recipes and seasoning vary by restaurant.",
    },
    {
      id: "home-style",
      title: chinese ? siteCopy.cuisines.chineseGroups.homeStyle : "Chinese home-style and regional dishes",
      description: chinese
        ? siteCopy.cuisines.chineseGroups.homeStyleDescription
        : "Home cooking and dishes representing regional Chinese cuisines.",
    },
  ] as const;

  function renderDishCard(dish: Food) {
    const guidance = guidanceFor(dish, focus);
    return (
      <li key={dish.id} className="rounded-md bg-paper/70 p-3">
        {dish.image ? (
          <Image
            src={dish.image}
            alt={dish.originalName ? `${dish.name}, ${dish.originalName}` : dish.name}
            width={640}
            height={480}
            sizes="(max-width: 640px) 100vw, 50vw"
            loading="lazy"
            className="mb-3 h-36 w-full rounded-sm object-cover"
          />
        ) : null}
        {dish.imageCredit ? (
          <p className="mb-2 text-[10px] leading-4 text-ink/55">
            Photo:{" "}
            <a
              href={dish.imageCredit.sourceUrl}
              target="_blank"
              rel="noreferrer"
              className="underline underline-offset-2"
            >
              {dish.imageCredit.creator}
            </a>
            {" · "}
            <a
              href={dish.imageCredit.licenseUrl}
              target="_blank"
              rel="noreferrer"
              className="underline underline-offset-2"
            >
              {dish.imageCredit.license}
            </a>
            {" · resized"}
          </p>
        ) : null}
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h3 className="font-semibold text-ink">{chinese ? chineseFoodName(dish) : dish.name}</h3>
          <span className={`rounded-full border px-2.5 py-1 text-xs font-semibold ${verdictStyle[guidance.verdict]}`}>
            {chinese ? chineseVerdict(guidance.verdict) : verdicts[guidance.verdict].label}
          </span>
        </div>
        {chinese && dish.name !== chineseFoodName(dish) ? <p className="text-xs text-ink/55">{dish.name}</p> : dish.originalName ? <p className="text-xs text-ink/55">{dish.originalName}</p> : null}
        <p className="mt-1 text-sm leading-6 text-ink/75">{chinese ? chineseFoodTip(dish) : dish.tip}</p>
        <details className="mt-2 rounded-sm bg-card/70 px-2.5 py-2">
          <summary className="cursor-pointer text-xs font-semibold text-pine">
            {chinese ? "为什么这样建议？" : "Why this suggestion?"}
          </summary>
          <p className="mt-1 text-xs leading-5 text-ink/70">{chinese ? chineseGuidance(dish, focus, guidance.verdict) : guidance.reason}</p>
        </details>
      </li>
    );
  }

  return (
    <>
      <div className="mt-8">
        <label className="block max-w-sm">
          <span className="text-sm font-semibold text-ink">{chinese ? siteCopy.cuisines.stoneType : "Stone type"}</span>
          <select
            value={focus}
            onChange={(event) => setFocus(event.target.value as typeof focus)}
            className="mt-2 w-full rounded-md border border-line bg-card px-3 py-3 text-base text-ink"
          >
            {stoneFocuses.map((item) => (
              <option key={item.id} value={item.id}>{chinese ? chineseFocus(item.id).label : item.label}</option>
            ))}
          </select>
        </label>
      </div>
      <nav className="mt-5 flex flex-wrap gap-2" aria-label="Cuisine sections">
        {sections.map((section) => (
          <a
            key={section.id}
            href={`#${section.id}`}
            className="rounded-full border border-line bg-card px-3 py-1.5 text-sm font-semibold text-pine hover:border-pine"
          >
            {chinese ? siteCopy.cuisines.nav[sections.indexOf(section)] : section.title}
          </a>
        ))}
      </nav>
      <div className="mt-5 space-y-3">
        {sections.map((section) => {
          const items = dishes.filter((dish) => dish.cuisine === section.id);
          return (
            <details
              key={section.id}
              id={section.id}
              open={section.id === "chinese"}
              className="group scroll-mt-6 rounded-md border border-line bg-card"
            >
              <summary className="flex cursor-pointer list-none flex-wrap items-baseline justify-between gap-x-4 gap-y-1 p-4">
                <span className="flex items-center gap-3">
                  <Image
                    src={section.thumbnail}
                    alt=""
                    width={48}
                    height={48}
                    loading="lazy"
                    unoptimized
                    className="h-12 w-12 rounded-sm object-cover"
                  />
                  <span className="font-serif text-2xl text-ink">{chinese ? siteCopy.cuisines.nav[sections.indexOf(section)] : section.title}</span>
                </span>
                <span className="text-sm text-ink/65">{chinese ? siteCopy.cuisines.sections[sections.indexOf(section)] : section.text}</span>
              </summary>
              {section.id === "chinese" ? (
                <div className="space-y-6 border-t border-line p-4">
                  {chineseGroups.map((group) => {
                    const groupItems = items.filter(
                      (item) => item.chineseMenuGroup === group.id,
                    );
                    return (
                      <section key={group.id}>
                        <h3 className="font-serif text-xl text-ink">{group.title}</h3>
                        <p className="mt-1 text-sm text-ink/65">{group.description}</p>
                        <ul className="mt-3 grid gap-3 sm:grid-cols-2">
                          {groupItems.map(renderDishCard)}
                        </ul>
                      </section>
                    );
                  })}
                </div>
              ) : (
                <ul className="grid gap-3 border-t border-line p-4 sm:grid-cols-2">
                  {items.map(renderDishCard)}
                </ul>
              )}
            </details>
          );
        })}
      </div>
    </>
  );
}
