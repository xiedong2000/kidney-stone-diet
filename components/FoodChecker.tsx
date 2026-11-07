"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { useLanguage } from "@/components/LanguageProvider";
import {
  foodSearchScoreForTerms,
  splitFoodSearchTerms,
  unmatchedFoodSearchTerms,
} from "@/lib/food-search";
import { featuredFoodIds, foods } from "@/lib/foods";
import { guidanceFor } from "@/lib/guidance";
import {
  chineseFocus,
  chineseFoodName,
  chineseFoodTip,
  chineseGuidance,
  chineseLevel,
  chineseOxalateCategory,
  chineseServing,
  chineseUi,
  chineseVerdict,
  containsChineseText,
  foodDisplayNames,
  foodSummary,
} from "@/lib/chinese-localization";
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

export function FoodChecker({
  isChinese,
}: {
  isChinese: boolean;
}) {
  const { setLanguage } = useLanguage();
  const [focus, setFocus] = useState<StoneFocusId>("unsure");
  const [group, setGroup] = useState<FoodGroup>("asked");
  const [cuisine, setCuisine] = useState<Cuisine>("all");
  const [search, setSearch] = useState("");

  const copy = chineseUi();
  const selected = stoneFocuses.find((item) => item.id === focus) ?? stoneFocuses[0];
  const selectedChinese = chineseFocus(focus);
  const query = search.trim().toLowerCase();
  const searchParts = useMemo(() => splitFoodSearchTerms(search), [search]);
  const unmatchedParts = query ? unmatchedFoodSearchTerms(search, foods) : [];

  const results = useMemo(() => {
    const pool = foods.filter((item) => {
      if (query && foodSearchScoreForTerms(item, searchParts) === null) return false;
      if (!query && cuisine !== "all" && item.cuisine !== cuisine && item.cuisine !== "everyday") return false;
      if (!query && group !== "asked" && group !== "all" && item.group !== group) return false;
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
          (foodSearchScoreForTerms(b, searchParts) ?? 0) -
            (foodSearchScoreForTerms(a, searchParts) ?? 0) ||
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
  }, [cuisine, group, query, searchParts]);

  return (
    <div className="mt-8">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className="text-sm font-semibold text-ink">
            {isChinese ? copy.searchLabel : "What are you serving or ordering?"}
          </span>
          <input
            type="search"
            value={search}
            onChange={(event) => {
              const value = event.target.value;
              setSearch(value);
              if (containsChineseText(value)) setLanguage("zh");
            }}
            placeholder={isChinese ? copy.searchPlaceholder : "Search a dish or list ingredients"}
            autoComplete="off"
            className="mt-2 w-full rounded-md border border-line bg-card px-3 py-3 text-base text-ink outline-none placeholder:text-ink/40"
          />
          <span className="mt-1 block text-xs text-ink/60">
            {isChinese ? copy.unlistedHint : "For an unlisted dish, enter ingredients separated by commas."}
          </span>
        </label>
        <label className="block">
          <span className="text-sm font-semibold text-ink">{isChinese ? copy.stoneType : "Stone type"}</span>
          <select
            value={focus}
            onChange={(event) => setFocus(event.target.value as StoneFocusId)}
            className="mt-2 w-full rounded-md border border-line bg-card px-3 py-3 text-base text-ink"
          >
            {stoneFocuses.map((item) => (
              <option key={item.id} value={item.id}>
                {isChinese ? chineseFocus(item.id).label : item.label}
              </option>
            ))}
          </select>
          <span className="mt-1 block text-xs leading-5 text-ink/60">
            {isChinese ? selectedChinese.summary : selected.summary}
          </span>
        </label>
      </div>

      <div className="mt-4 grid gap-3 sm:grid-cols-[1fr_1fr_auto] sm:items-end">
        <label className="block">
          <span className="text-sm font-semibold text-ink">{isChinese ? "餐馆 / 菜系" : "Restaurant / cuisine"}</span>
          <select
            value={cuisine}
            onChange={(event) => setCuisine(event.target.value as Cuisine)}
            className="mt-2 w-full rounded-md border border-line bg-card px-3 py-2.5 text-base text-ink"
          >
            {cuisines.map((item) => (
              <option key={item.id} value={item.id}>
                {isChinese
                  ? ({ all: "所有菜系", chinese: "中餐", american: "美式", mexican: "墨西哥菜", japanese: "日式", indian: "印度菜", italian: "意大利菜", everyday: "食材" }[item.id])
                  : item.label}
              </option>
            ))}
          </select>
        </label>
        <label className="block">
          <span className="text-sm font-semibold text-ink">{isChinese ? "浏览分类" : "Browse"}</span>
          <select
            value={group}
            onChange={(event) => setGroup(event.target.value as FoodGroup)}
            className="mt-2 w-full rounded-md border border-line bg-card px-3 py-2.5 text-base text-ink"
          >
            {foodGroups.map((item) => (
              <option key={item.id} value={item.id}>
                {isChinese
                  ? ({ asked: "常见查询", all: "所有食物", meals: "菜品", drinks: "饮品", fruit: "水果", vegetables: "蔬菜", grains: "谷物", protein: "蛋白质", dairy: "奶制品", nuts: "坚果和种子", sweets: "甜食", seasoning: "咸味食品" }[item.id])
                  : item.label}
              </option>
            ))}
          </select>
        </label>
        <p className="text-sm text-ink/60" aria-live="polite">
          {isChinese
            ? `${results.length} ${results.length === 1 ? copy.match : copy.matches}`
            : `${results.length} ${results.length === 1 ? "match" : "matches"}`}
        </p>
      </div>

      {unmatchedParts.length > 0 && results.length > 0 ? (
        <p className="mt-4 rounded-md border border-amber/30 bg-amber/5 px-4 py-3 text-sm leading-6 text-ink/75">
          {isChinese
            ? `${copy.notFound}${unmatchedParts.join("、")}。${copy.matchedIngredients}`
            : <>Not found in this guide: {unmatchedParts.join(", ")}. The listed ingredients below are only the parts this guide can check.</>}
        </p>
      ) : null}

      {results.length === 0 ? (
        <div className="mt-8 rounded-md border border-dashed border-line bg-card px-4 py-5">
          <h2 className="font-semibold text-ink">
            {isChinese ? copy.noResultTitle : "That food or dish is not in this guide yet."}
          </h2>
          <p className="mt-2 text-sm leading-6 text-ink/75">
            {isChinese ? copy.noResultBody : <>No match does not mean it is safe or unsafe. For a restaurant dish, enter its main ingredients separated by commas, such as{" "}
            <span className="font-semibold">beef, noodles, bok choy, soy sauce</span>.
            Recipes, sauces, and portions vary, so ask the restaurant what is
            in the dish and request sauces or broth on the side when helpful.</>}
          </p>
          <p className="mt-2 text-sm leading-6 text-ink/75">
            {isChinese ? copy.curatedGuide : "This is a curated guide, not a complete menu database or an automatic nutrition analysis."}
          </p>
        </div>
      ) : (
        <>
        {!query && group === "asked" && cuisine === "all" ? (
          <div className="mt-6">
            <h2 className="font-serif text-2xl text-ink">
              {isChinese ? "常见查询（示例）" : "Common questions"}
            </h2>
            <p className="mt-1 text-sm text-ink/65">
              {isChinese ? "这些是常见食物示例，不是完整清单。" : "A few common examples to get started—not the full food list."}
            </p>
          </div>
        ) : null}
        <ul className="mt-4 grid gap-3">
          {results.map((item) => {
            const guidance = guidanceFor(item, focus);
            const verdict = verdicts[guidance.verdict];
            const names = foodDisplayNames(item, isChinese);
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
                    alt={isChinese ? chineseFoodName(item) : item.originalName ? `${item.name}, ${item.originalName}` : item.name}
                    width={640}
                    height={480}
                    className="h-44 w-full object-cover sm:h-full"
                  />
                ) : null}
                <div className="p-4 sm:p-5">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <h2 className="font-serif text-2xl text-ink">{names.primary}</h2>
                    {names.secondary ? (
                      <p className="text-sm text-ink/55">{names.secondary}</p>
                    ) : null}
                  </div>
                  <p
                    className={`rounded-full border px-3 py-1 text-sm font-semibold ${verdictStyle[guidance.verdict]}`}
                  >
                    {isChinese ? chineseVerdict(guidance.verdict) : verdict.label}
                  </p>
                </div>
                <p className="mt-3 text-sm leading-6 text-ink/80">
                  <span className="font-semibold text-ink">
                    {isChinese ? copy.servingNote : "Serving / ordering note: "}
                  </span>
                  {foodSummary(item, isChinese)}
                </p>
                <details className="mt-3 rounded-md bg-paper/70 px-3 py-2">
                  <summary className="cursor-pointer text-sm font-semibold text-pine">
                    {isChinese ? copy.why : "Why this suggestion?"}
                  </summary>
                  <p className="mt-2 text-sm leading-6 text-ink/75">
                    <span className="font-semibold text-ink">
                      {isChinese ? copy.servingNote : "Serving / ordering note: "}
                    </span>
                    {isChinese ? chineseFoodTip(item) : item.tip}
                  </p>
                  {item.oxalateMg != null && item.oxalateServing ? (
                    <p className="mt-2 text-sm text-pine">
                      {isChinese ? copy.oxalatePortion : "Oxalate reference portion: "}
                      {item.oxalateMg} mg /{" "}
                      {item.id === "tofu"
                        ? isChinese ? "3.5 盎司（约 100 克，按重量）" : "3.5 oz (about 100 g by weight)"
                        : isChinese ? chineseServing(item.oxalateServing) : item.oxalateServing}
                      {item.id === "tofu"
                        ? isChinese ? `。${copy.referenceOnly}` : ". This is a reference amount, not a daily limit."
                        : ""}
                    </p>
                  ) : null}
                  <p className="mt-2 text-sm leading-6 text-ink/75">
                    {isChinese ? chineseGuidance(item, focus, guidance.verdict) : guidance.reason}
                  </p>
                  <p className="mt-2 text-xs leading-5 text-ink/60">
                    {isChinese
                      ? `${copy.oxalate}${chineseLevel(item.oxalate)} · ${copy.sodium}${chineseLevel(item.sodium)} · ${copy.purine}${chineseLevel(item.purine)}${item.addedSugar !== "low" ? ` · ${copy.sugar}${chineseLevel(item.addedSugar)}` : ""}`
                      : <>Oxalate {item.oxalate === "not-listed" ? "not listed for this variety" : item.oxalate}
                    {" · "}Sodium {item.sodium} · Purine {item.purine}
                    {item.addedSugar !== "low" ? ` · Added sugar ${item.addedSugar}` : ""}</>}
                  </p>
                  {item.oxalate === "not-listed" ? (
                    <p className="mt-1 text-xs leading-5 text-ink/60">
                      {isChinese ? copy.missingVarietyValue : "This reference does not provide a variety-specific oxalate value."}
                    </p>
                  ) : null}
                  {item.oxalateMg != null && item.oxalateServing ? (
                    <p className="mt-1 text-xs leading-5 text-ink/60">
                      {isChinese
                        ? `${copy.sourceNote}${item.oxalateSheet ? ` 参考资料分类：${chineseOxalateCategory(item.oxalateSheet)}。` : ""}`
                        : <>The oxalate value comes from a food handout{item.oxalateSheet ? ` labeled ${item.oxalateSheet}` : ""}. Amounts vary by food and preparation.</>}
                    </p>
                  ) : null}
                </details>
                </div>
              </li>
            );
          })}
        </ul>
        </>
      )}
    </div>
  );
}
