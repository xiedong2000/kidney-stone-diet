"use client";

import { useLanguage } from "@/components/LanguageProvider";
import { siteCopy } from "@/lib/site-copy";

export function EducationNotice() {
  const { language } = useLanguage();
  return (
    <p className="border-b border-line bg-mist px-5 py-2 text-center text-sm leading-6 text-ink/80">
      {language === "zh"
        ? siteCopy.notice
        : "Education for adults, not a personal diet prescription. Fever, vomiting, uncontrolled pain, or trouble passing urine needs care now."}
    </p>
  );
}
