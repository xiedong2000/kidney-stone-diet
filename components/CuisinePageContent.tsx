"use client";

import Link from "next/link";
import { CuisineGuide } from "@/components/CuisineGuide";
import { useLanguage } from "@/components/LanguageProvider";
import { PageIntro, PageShell } from "@/components/PageShell";
import { siteCopy } from "@/lib/site-copy";

export function CuisinePageContent() {
  const { language } = useLanguage();
  const chinese = language === "zh";
  return (
    <PageShell>
      <PageIntro
        eyebrow={chinese ? siteCopy.cuisines.eyebrow : "Restaurant and takeout"}
        title={chinese ? siteCopy.cuisines.title : "Make the order work for you"}
      >
        <p>
          {chinese ? (
            <>
              选择菜系查看实用点餐建议，或使用{" "}
              <Link href="/check" className="font-semibold text-pine underline decoration-pine/30 underline-offset-4">食物与份量查询器</Link>
              {" "}搜索菜单菜品。以下仅为示例，并非完整菜单。未收录的菜品可分别查询主要食材。食谱和份量各不相同，请向餐馆确认成分和酱料。
            </>
          ) : (
            <>
              Choose a cuisine for quick ordering ideas, or search a menu item in the{" "}
              <Link href="/check" className="font-semibold text-pine underline decoration-pine/30 underline-offset-4">food and serving checker</Link>.
              {" "}These are examples, not a complete restaurant-menu list. If a dish is not listed, search its main ingredients separately in the{" "}
              <Link href="/check" className="font-semibold text-pine underline decoration-pine/30 underline-offset-4">food and serving checker</Link>.
              {" "}Recipes and portions vary, so confirm ingredients and sauces with the restaurant.
            </>
          )}
        </p>
      </PageIntro>
      <CuisineGuide />
    </PageShell>
  );
}
