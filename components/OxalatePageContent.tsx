"use client";

import Link from "next/link";
import { OxalateTable } from "@/components/OxalateTable";
import { useLanguage } from "@/components/LanguageProvider";
import { PageIntro, PageShell } from "@/components/PageShell";
import { siteCopy } from "@/lib/site-copy";
import { oxalateRows, oxalateSource } from "@/lib/oxalate";

export function OxalatePageContent() {
  const { language } = useLanguage();
  const chinese = language === "zh";
  return (
    <PageShell>
      <PageIntro
        eyebrow={chinese ? siteCopy.oxalate.eyebrow : "Oxalate handout"}
        title={chinese ? siteCopy.oxalate.title : "Milligrams, not just the word high"}
      >
        <p>
          {chinese
            ? siteCopy.oxalate.intro(oxalateRows.length)
            : `Search ${oxalateRows.length} listed servings by food or group. Values are milligrams per listed serving; varieties and cooking methods can change them.`}
        </p>
      </PageIntro>
      <OxalateTable />
      <p className="mt-8 text-sm leading-6 text-ink/60">
        {chinese ? (
          <>
            来源：{oxalateSource.author}，《{oxalateSource.title}》（{oxalateSource.year}）。{oxalateSource.note} {siteCopy.oxalate.detail}{" "}
          </>
        ) : (
          <>Source: {oxalateSource.author}, {oxalateSource.title} ({oxalateSource.year}). {oxalateSource.note} Boiling and discarding water can lower oxalate in some vegetables. Use this reference beside the{" "}</>
        )}
        <Link href="/check" className="font-semibold text-pine underline decoration-pine/30 underline-offset-4">
          {chinese ? "食物查询器" : "food checker"}
        </Link>
        {chinese ? "，不要用它替代尿液检查。" : ", not instead of a urine test."}
      </p>
    </PageShell>
  );
}
