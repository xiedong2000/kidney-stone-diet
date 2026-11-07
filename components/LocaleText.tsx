"use client";

import type { ReactNode } from "react";
import { useLanguage } from "@/components/LanguageProvider";

export function LocaleText({
  english,
  chinese,
}: {
  english: ReactNode;
  chinese: ReactNode;
}) {
  const { language } = useLanguage();
  return <>{language === "zh" ? chinese : english}</>;
}
