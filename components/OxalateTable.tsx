"use client";

import { useMemo, useState } from "react";
import { useLanguage } from "@/components/LanguageProvider";
import { chineseOxalateCategory, chineseServing } from "@/lib/chinese-localization";
import { levelFromOxalateMg, oxalateRows } from "@/lib/oxalate";
import { siteCopy } from "@/lib/site-copy";

const groups = ["All groups", ...Array.from(new Set(oxalateRows.map((row) => row.group)))];
const PAGE_SIZE = 25;

export function OxalateTable() {
  const { language } = useLanguage();
  const chinese = language === "zh";
  const [query, setQuery] = useState("");
  const [group, setGroup] = useState("All groups");
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  const results = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return oxalateRows
      .filter((row) => {
        if (group !== "All groups" && row.group !== group) return false;
        if (!needle) return true;
        return `${row.name} ${row.group} ${row.category}`.toLowerCase().includes(needle);
      })
      .sort((a, b) => b.mg - a.mg || a.name.localeCompare(b.name));
  }, [group, query]);
  const visibleResults = results.slice(0, visibleCount);

  function readingLabel(mg: number) {
    const level = levelFromOxalateMg(mg);
    if (level === "high") return chinese ? siteCopy.oxalate.highRead : "High, 50 mg or more";
    if (level === "moderate") return chinese ? siteCopy.oxalate.portionRead : "Portion, 10 to 49 mg";
    return chinese ? siteCopy.oxalate.lowRead : "Low, under 10 mg";
  }

  function labelCategory(value: string) {
    return chinese ? chineseOxalateCategory(value) || value : value;
  }

  return (
    <div className="mt-8">
      <label className="block">
        <span className="text-sm font-semibold text-ink">{chinese ? siteCopy.oxalate.search : "Search the handout"}</span>
        <input
          type="search"
          value={query}
          onChange={(event) => {
            setQuery(event.target.value);
            setVisibleCount(PAGE_SIZE);
          }}
          placeholder={chinese ? siteCopy.oxalate.placeholder : "Try spinach, Cheerios, miso, potato"}
          className="mt-2 w-full rounded-md border border-line bg-card px-3 py-3 text-base text-ink outline-none"
        />
      </label>
      <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-sm" aria-label={chinese ? "草酸含量" : "Oxalate levels"}>
        <span><span className="font-semibold text-sage">{chinese ? "低：" : "Low:"}</span> {chinese ? "少于 10 mg" : "under 10 mg"}</span>
        <span><span className="font-semibold text-amber">{chinese ? "适量：" : "Portion:"}</span> 10–49 mg</span>
        <span><span className="font-semibold text-clay">{chinese ? "高：" : "High:"}</span> {chinese ? "50 mg 或以上" : "50 mg or more"}</span>
      </div>
      <div className="mt-4 max-w-xs">
        <label className="block">
          <span className="text-sm font-semibold text-ink">{chinese ? "类别" : "Group"}</span>
          <select
            value={group}
            onChange={(event) => {
              setGroup(event.target.value);
              setVisibleCount(PAGE_SIZE);
            }}
            className="mt-2 w-full rounded-md border border-line bg-card px-3 py-3 text-base text-ink"
          >
            {groups.map((item) => (
              <option key={item} value={item}>{chinese && item === "All groups" ? "所有类别" : labelCategory(item)}</option>
            ))}
          </select>
        </label>
      </div>
      <p className="mt-3 text-sm text-ink/60" aria-live="polite">
        {chinese
          ? `显示 ${visibleResults.length} / ${results.length} 个份量，按草酸含量从高到低`
          : `Showing ${visibleResults.length} of ${results.length} servings, highest oxalate first`}
      </p>
      <div className="mt-4 space-y-3 md:hidden">
        {visibleResults.map((row) => (
          <article key={`${row.group}-${row.name}-${row.serving}-${row.mg}`} className="rounded-md border border-line bg-card p-4">
            <h2 className="font-semibold text-ink">{row.name}</h2>
            <p className="text-xs text-ink/50">{labelCategory(row.group)}</p>
            <dl className="mt-3 grid grid-cols-[auto_1fr] gap-x-4 gap-y-2 text-sm">
              <dt className="font-semibold text-ink">{chinese ? "份量" : "Serving"}</dt>
              <dd className="text-ink/80">{chinese ? chineseServing(row.serving) : row.serving}</dd>
              <dt className="font-semibold text-ink">{chinese ? "草酸" : "Oxalate"}</dt>
              <dd className="font-semibold text-ink">{row.mg} mg</dd>
              <dt className="font-semibold text-ink">{chinese ? "资料表分类" : "Handout label"}</dt>
              <dd className="text-ink/75">{labelCategory(row.category)}</dd>
              <dt className="font-semibold text-ink">{chinese ? "如何理解" : "How to read it"}</dt>
              <dd className="text-ink/75">{readingLabel(row.mg)}</dd>
            </dl>
          </article>
        ))}
      </div>
      <div className="mt-4 hidden overflow-x-auto rounded-md border border-line bg-card md:block">
        <table className="w-full min-w-[40rem] text-left text-sm">
          <thead className="border-b border-line bg-mist text-ink">
            <tr>
              <th className="px-3 py-2 font-semibold">{chinese ? "食物（英文原名）" : "Food"}</th>
              <th className="px-3 py-2 font-semibold">{chinese ? "份量" : "Serving"}</th>
              <th className="px-3 py-2 font-semibold">{chinese ? "草酸" : "Oxalate"}</th>
              <th className="px-3 py-2 font-semibold">{chinese ? "资料表分类" : "Handout label"}</th>
              <th className="px-3 py-2 font-semibold">{chinese ? "如何理解" : "How to read it"}</th>
            </tr>
          </thead>
          <tbody>
            {visibleResults.map((row) => (
              <tr key={`${row.group}-${row.name}-${row.serving}-${row.mg}`} className="border-b border-line/80">
                <td className="px-3 py-2">
                  <span className="font-semibold text-ink">{row.name}</span>
                  <span className="block text-xs text-ink/50">{labelCategory(row.group)}</span>
                </td>
                <td className="px-3 py-2 text-ink/80">{chinese ? chineseServing(row.serving) : row.serving}</td>
                <td className="px-3 py-2 font-semibold text-ink">{row.mg} mg</td>
                <td className="px-3 py-2 text-ink/75">{labelCategory(row.category)}</td>
                <td className="px-3 py-2 text-ink/75">{readingLabel(row.mg)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {visibleCount < results.length ? (
        <button
          type="button"
          onClick={() => setVisibleCount((count) => count + PAGE_SIZE)}
          className="mt-4 min-h-11 rounded-md border border-pine px-4 py-2 text-sm font-semibold text-pine hover:bg-pine/5"
        >
          {chinese ? siteCopy.oxalate.showMore : "Show 25 more"}
        </button>
      ) : null}
    </div>
  );
}
