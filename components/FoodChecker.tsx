"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { cuisineCovers } from "@/lib/dishes";
import { featuredFoodIds, foods } from "@/lib/foods";
import { guidanceFor } from "@/lib/guidance";
import {
  cuisines,
  foodGroups,
  stoneFocuses,
  verdicts,
  type Cuisine,
  type FoodGroup,
  type StoneFocusId,
} from "@/lib/model";

const verdictStyle = {
  fits: "bg-sage/10 text-sage border-sage/30",
  careful: "bg-amber/10 text-amber border-amber/30",
  limit: "bg-clay/10 text-clay border-clay/30",
} as const;

export function FoodChecker() {
  const [focus, setFocus] = useState<StoneFocusId>("unsure");
  const [group, setGroup] = useState<FoodGroup>("asked");
  const [cuisine, setCuisine] = useState<Cuisine>("all");
  const [search, setSearch] = useState("");

  const selected = stoneFocuses.find((item) => item.id === focus) ?? stoneFocuses[0];
  const query = search.trim().toLowerCase();

  const results = useMemo(() => {
    const pool = foods.filter((item) => {
      const matchesQuery =
        query.length === 0 ||
        [item.name, item.originalName ?? "", item.cuisine, item.group, ...item.aliases]
          .join(" ")
          .toLowerCase()
          .includes(query);

      if (!matchesQuery) return false;
      if (query) return true;
      if (cuisine !== "all" && item.cuisine !== cuisine) return false;
      if (group === "asked") {
        if (cuisine !== "all") return true;
        return featuredFoodIds.includes(item.id as (typeof featuredFoodIds)[number]);
      }
      if (group === "all") return true;
      return item.group === group;
    });

    return pool.sort((a, b) => {
      if (!query && group === "asked" && cuisine === "all") {
        return (
          featuredFoodIds.indexOf(a.id as (typeof featuredFoodIds)[number]) -
          featuredFoodIds.indexOf(b.id as (typeof featuredFoodIds)[number])
        );
      }
      return a.name.localeCompare(b.name);
    });
  }, [cuisine, group, query]);

  return (
    <div className="mt-8">
      <fieldset>
        <legend className="text-sm font-semibold text-ink">
          Which stone are you planning around?
        </legend>
        <div className="mt-3 flex flex-wrap gap-2">
          {stoneFocuses.map((item) => (
            <label
              key={item.id}
              className={`cursor-pointer rounded-md border px-3 py-2 text-sm font-semibold has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-pine ${
                focus === item.id
                  ? "border-pine bg-pine text-paper"
                  : "border-line bg-card text-ink hover:border-pine/40"
              }`}
            >
              <input
                type="radio"
                name="stone-focus"
                value={item.id}
                checked={focus === item.id}
                onChange={() => setFocus(item.id)}
                className="sr-only"
              />
              {item.label}
            </label>
          ))}
        </div>
      </fieldset>
      <p className="mt-3 max-w-3xl text-sm leading-6 text-ink/75">{selected.summary}</p>

      <div className="mt-6 grid gap-3 sm:grid-cols-[1fr_auto] sm:items-end">
        <label className="block">
          <span className="text-sm font-semibold text-ink">Search a food</span>
          <input
            type="search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Try 番茄炒蛋, tacos, ramen, spinach"
            autoComplete="off"
            className="mt-2 w-full rounded-md border border-line bg-card px-3 py-3 text-base text-ink outline-none placeholder:text-ink/40"
          />
        </label>
        <p className="text-sm text-ink/60" aria-live="polite">
          {results.length} {results.length === 1 ? "food" : "foods"}
        </p>
      </div>

      <div className="mt-5" role="group" aria-label="Cuisine">
        <p className="text-sm font-semibold text-ink">Which table is this from?</p>
        <div className="mt-2 flex gap-2 overflow-x-auto pb-1">
          {cuisines.map((item) => {
            const cover = item.id === "all" ? "/foods/table-spread.jpg" : cuisineCovers[item.id];
            return (
              <button
                key={item.id}
                type="button"
                aria-pressed={cuisine === item.id}
                onClick={() => setCuisine(item.id)}
                className={`flex w-28 shrink-0 flex-col overflow-hidden rounded-md border text-left ${
                  cuisine === item.id
                    ? "border-pine ring-2 ring-pine"
                    : "border-line bg-card"
                }`}
              >
                <Image
                  src={cover}
                  alt=""
                  width={320}
                  height={240}
                  className="h-16 w-full object-cover"
                />
                <span className="px-2 py-1.5 text-xs font-semibold text-ink">{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-2" role="group" aria-label="Food groups">
        {foodGroups.map((item) => (
          <button
            key={item.id}
            type="button"
            aria-pressed={group === item.id}
            onClick={() => setGroup(item.id)}
            className={`rounded-full border px-3 py-1.5 text-sm font-semibold ${
              group === item.id
                ? "border-mineral bg-mineral text-paper"
                : "border-line bg-card text-ink hover:border-mineral/40"
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>

      {results.length === 0 ? (
        <p className="mt-8 rounded-md border border-dashed border-line bg-card px-4 py-6 text-ink/75">
          Nothing in this list matches. Try a simpler word, such as tea, cheese,
          or beans. The list is common foods, not every product in a store.
        </p>
      ) : (
        <ul className="mt-6 grid gap-3">
          {results.map((item) => {
            const guidance = guidanceFor(item, focus);
            const verdict = verdicts[guidance.verdict];
            return (
              <li
                key={item.id}
                className={`overflow-hidden rounded-md border border-line bg-card ${
                  item.image ? "sm:grid sm:grid-cols-[11rem_1fr]" : ""
                }`}
              >
                {item.image ? (
                  <Image
                    src={item.image}
                    alt={item.originalName ? `${item.name}, ${item.originalName}` : item.name}
                    width={640}
                    height={480}
                    className="h-44 w-full object-cover sm:h-full"
                  />
                ) : null}
                <div className="p-4 sm:p-5">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <h2 className="font-serif text-2xl text-ink">{item.name}</h2>
                    {item.originalName ? (
                      <p className="text-sm text-ink/55">{item.originalName}</p>
                    ) : null}
                  </div>
                  <p
                    className={`rounded-full border px-3 py-1 text-sm font-semibold ${verdictStyle[guidance.verdict]}`}
                  >
                    {verdict.label}
                  </p>
                </div>
                <p className="mt-2 text-sm text-ink/55">
                  Oxalate {item.oxalate} · Sodium {item.sodium} · Purine {item.purine}
                  {item.addedSugar !== "low" ? ` · Added sugar ${item.addedSugar}` : ""}
                </p>
                {item.oxalateMg != null && item.oxalateServing ? (
                  <p className="mt-1 text-sm text-pine">
                    {item.oxalateMg} mg per {item.oxalateServing}
                    {item.oxalateSheet ? ` · handout label: ${item.oxalateSheet}` : ""}
                  </p>
                ) : null}
                <p className="mt-3 leading-7 text-ink/85">{guidance.reason}</p>
                <p className="mt-2 text-sm leading-6 text-ink/70">{item.tip}</p>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
