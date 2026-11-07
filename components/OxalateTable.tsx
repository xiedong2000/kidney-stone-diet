"use client";

import { useMemo, useState } from "react";
import { levelFromOxalateMg, oxalateRows } from "@/lib/oxalate";

const groups = ["All groups", ...Array.from(new Set(oxalateRows.map((row) => row.group)))];

export function OxalateTable() {
  const [query, setQuery] = useState("");
  const [group, setGroup] = useState("All groups");

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

  return (
    <div className="mt-8">
      <div className="grid gap-3 sm:grid-cols-[1fr_16rem] sm:items-end">
        <label className="block">
          <span className="text-sm font-semibold text-ink">Search the handout</span>
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Try spinach, Cheerios, miso, potato"
            className="mt-2 w-full rounded-md border border-line bg-card px-3 py-3 text-base text-ink outline-none"
          />
        </label>
        <label className="block">
          <span className="text-sm font-semibold text-ink">Group</span>
          <select
            value={group}
            onChange={(event) => setGroup(event.target.value)}
            className="mt-2 w-full rounded-md border border-line bg-card px-3 py-3 text-base text-ink"
          >
            {groups.map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>
        </label>
      </div>
      <p className="mt-3 text-sm text-ink/60" aria-live="polite">
        {results.length} servings, highest oxalate first
      </p>
      <div className="mt-4 overflow-x-auto rounded-md border border-line bg-card">
        <table className="w-full min-w-[40rem] text-left text-sm">
          <thead className="border-b border-line bg-mist text-ink">
            <tr>
              <th className="px-3 py-2 font-semibold">Food</th>
              <th className="px-3 py-2 font-semibold">Serving</th>
              <th className="px-3 py-2 font-semibold">Oxalate</th>
              <th className="px-3 py-2 font-semibold">Handout label</th>
              <th className="px-3 py-2 font-semibold">How to read it</th>
            </tr>
          </thead>
          <tbody>
            {results.map((row) => {
              const reading = levelFromOxalateMg(row.mg);
              const readingLabel =
                reading === "high" ? "High, 50 mg or more" : reading === "moderate" ? "Portion, 10 to 49 mg" : "Low, under 10 mg";
              return (
                <tr key={`${row.group}-${row.name}-${row.serving}-${row.mg}`} className="border-b border-line/80">
                  <td className="px-3 py-2">
                    <span className="font-semibold text-ink">{row.name}</span>
                    <span className="block text-xs text-ink/50">{row.group}</span>
                  </td>
                  <td className="px-3 py-2 text-ink/80">{row.serving}</td>
                  <td className="px-3 py-2 font-semibold text-ink">{row.mg} mg</td>
                  <td className="px-3 py-2 text-ink/75">{row.category}</td>
                  <td className="px-3 py-2 text-ink/75">{readingLabel}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
