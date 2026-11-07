"use client";

import { FoodChecker } from "@/components/FoodChecker";
import { useLanguage } from "@/components/LanguageProvider";
import { PageIntro } from "@/components/PageShell";
import { siteCopy } from "@/lib/site-copy";

export function CheckPageContent() {
  const { language } = useLanguage();
  const isChinese = language === "zh";

  return (
    <>
      <PageIntro
        eyebrow={isChinese ? siteCopy.check.eyebrow : "Food and serving checker"}
        title={isChinese ? siteCopy.check.title : "What can I serve?"}
      >
        <p>
          {isChinese
            ? siteCopy.check.intro
            : "Search an ingredient or restaurant dish, choose a stone type, and start with the serving or ordering note. “Usually fine,” “mind the portion,” and “keep it rare” are general guidance—not guarantees or personal daily limits."}
        </p>
      </PageIntro>
      <FoodChecker isChinese={isChinese} />
      <p className="mt-8 text-sm leading-6 text-ink/60">
        {isChinese
          ? siteCopy.check.closing
          : "The list covers common foods, not every recipe or restaurant portion. Ask your care team for personal daily limits based on your stone and urine test."}
      </p>
    </>
  );
}
