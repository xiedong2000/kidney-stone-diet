"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { foodSearchScore } from "@/lib/food-search";
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
      if (query && foodSearchScore(item, query) === null) return false;
      if (cuisine !== "all" && item.cuisine !== cuisine) return false;
      if (group !== "asked" && group !== "all" && item.group !== group) return false;
      if (query) return true;
      if (group === "asked") {
        if (cuisine !== "all") return true;
        return featuredFoodIds.includes(item.id as (typeof featuredFoodIds)[number]);
      }
      return true;
    });

    return pool.sort((a, b) => {
      if (query) {
        return (
          (foodSearchScore(b, query) ?? 0) - (foodSearchScore(a, query) ?? 0) ||
          a.name.localeCompare(b.name)
        );
      }
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
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className="text-sm font-semibold text-ink">What are you serving or ordering?</span>
          <input
            type="search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search a food or dish"
            autoComplete="off"
            className="mt-2 w-full rounded-md border border-line bg-card px-3 py-3 text-base text-ink outline-none placeholder:text-ink/40"
          />
        </label>
        <label className="block">
          <span className="text-sm font-semibold text-ink">Stone type</span>
          <select
            value={focus}
            onChange={(event) => setFocus(event.target.value as StoneFocusId)}
            className="mt-2 w-full rounded-md border border-line bg-card px-3 py-3 text-base text-ink"
          >
            {stoneFocuses.map((item) => (
              <option key={item.id} value={item.id}>{item.label}</option>
            ))}
          </select>
          <span className="mt-1 block text-xs leading-5 text-ink/60">{selected.summary}</span>
        </label>
      </div>

      <div className="mt-4 grid gap-3 sm:grid-cols-[1fr_1fr_auto] sm:items-end">
        <label className="block">
          <span className="text-sm font-semibold text-ink">Restaurant / cuisine</span>
          <select
            value={cuisine}
            onChange={(event) => setCuisine(event.target.value as Cuisine)}
            className="mt-2 w-full rounded-md border border-line bg-card px-3 py-2.5 text-base text-ink"
          >
            {cuisines.map((item) => (
              <option key={item.id} value={item.id}>{item.label}</option>
            ))}
          </select>
        </label>
        <label className="block">
          <span className="text-sm font-semibold text-ink">Browse</span>
          <select
            value={group}
            onChange={(event) => setGroup(event.target.value as FoodGroup)}
            className="mt-2 w-full rounded-md border border-line bg-card px-3 py-2.5 text-base text-ink"
          >
            {foodGroups.map((item) => (
              <option key={item.id} value={item.id}>{item.label}</option>
            ))}
          </select>
        </label>
        <p className="text-sm text-ink/60" aria-live="polite">
          {results.length} {results.length === 1 ? "match" : "matches"}
        </p>
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
                <p className="mt-3 text-sm leading-6 text-ink/80">
                  <span className="font-semibold text-ink">Serving / ordering note: </span>
                  {item.tip}
                </p>
                {item.oxalateMg != null && item.oxalateServing ? (
                  <p className="mt-2 text-sm text-pine">
                    Oxalate reference portion: {item.oxalateMg} mg per{" "}
                    {item.id === "tofu"
                      ? "3.5 oz (about 100 g by weight)"
                      : item.oxalateServing}
                    {item.id === "tofu" ? ". This is a reference amount, not a daily limit." : ""}
                  </p>
                ) : null}
                <details className="mt-3 rounded-md bg-paper/70 px-3 py-2">
                  <summary className="cursor-pointer text-sm font-semibold text-pine">
                    Why this suggestion?
                  </summary>
                  <p className="mt-2 text-sm leading-6 text-ink/75">{guidance.reason}</p>
                  <p className="mt-2 text-xs leading-5 text-ink/60">
                    Oxalate {item.oxalate} · Sodium {item.sodium} · Purine {item.purine}
                    {item.addedSugar !== "low" ? ` · Added sugar ${item.addedSugar}` : ""}
                  </p>
                  {item.oxalateMg != null && item.oxalateServing ? (
                    <p className="mt-1 text-xs leading-5 text-ink/60">
                      The oxalate value comes from a food handout
                      {item.oxalateSheet ? ` labeled ${item.oxalateSheet}` : ""}. Amounts vary by food and preparation.
                    </p>
                  ) : null}
                </details>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
