"use client";

import { useState } from "react";
import { FoodChecker } from "@/components/FoodChecker";
import { PageIntro } from "@/components/PageShell";

export function CheckPageContent() {
  const [isChinese, setIsChinese] = useState(false);

  return (
    <>
      <PageIntro
        eyebrow={isChinese ? "食物与份量查询" : "Food and serving checker"}
        title={isChinese ? "可以怎么吃？" : "What can I serve?"}
      >
        <p>
          {isChinese
            ? "输入食材或餐馆菜名，选择结石类型，并查看份量或点餐建议。这些是一般参考，不是保证，也不是个人每日限量。"
            : "Search an ingredient or restaurant dish, choose a stone type, and start with the serving or ordering note. “Usually fine,” “mind the portion,” and “keep it rare” are general guidance—not guarantees or personal daily limits."}
        </p>
      </PageIntro>
      <FoodChecker onLanguageChange={setIsChinese} />
      <p className="mt-8 text-sm leading-6 text-ink/60">
        {isChinese
          ? "本指南收录常见食物，但不涵盖所有食谱或餐馆份量。个人每日目标请根据结石类型和尿液检查结果咨询医疗团队。"
          : "The list covers common foods, not every recipe or restaurant portion. Ask your care team for personal daily limits based on your stone and urine test."}
      </p>
    </>
  );
}
