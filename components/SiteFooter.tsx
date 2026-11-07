"use client";

import Link from "next/link";
import { reviewed } from "@/lib/learn";
import { useLanguage } from "@/components/LanguageProvider";
import { siteCopy } from "@/lib/site-copy";

export function SiteFooter() {
  const { language } = useLanguage();
  const chinese = language === "zh";
  return (
    <footer className="mt-auto border-t border-line bg-pine text-paper">
      <div className="mx-auto grid w-full max-w-5xl gap-6 px-5 py-10 sm:grid-cols-[1.4fr_1fr]">
        <div>
          <p className="font-serif text-2xl">StoneWise™</p>
          <p className="mt-3 max-w-xl text-sm leading-6 text-paper/85">
            {chinese ? siteCopy.footer.disclaimer : <>Educational material for adults learning the diet patterns used in
            kidney-stone prevention. It is not medical advice, a diagnosis, or
            a personal meal plan. Fever, vomiting, pain you cannot control, or
            trouble passing urine needs medical care now, not a change in
            dinner.</>}
          </p>
          <p className="mt-3 text-sm text-paper/70">
            {chinese ? `${siteCopy.footer.reviewed} ${reviewed}。您在食物查询器中输入的内容不会保存或发送。` : <>Content reviewed {reviewed}. Nothing you type into the food checker is saved or sent.</>}
          </p>
        </div>
        <div className="text-sm leading-7">
          <p className="font-semibold">{chinese ? siteCopy.footer.links : "On this site"}</p>
          <ul className="mt-1">
            <li>
              <Link href="/check" className="underline decoration-paper/40 underline-offset-4">
                {chinese ? siteCopy.footer.check : "Check a food"}
              </Link>
            </li>
            <li>
              <Link href="/cuisines" className="underline decoration-paper/40 underline-offset-4">
                {chinese ? siteCopy.footer.takeout : "Takeout choices"}
              </Link>
            </li>
            <li>
              <Link href="/oxalate" className="underline decoration-paper/40 underline-offset-4">
                {chinese ? siteCopy.footer.oxalate : "Oxalate reference"}
              </Link>
            </li>
            <li>
              <Link href="/habits" className="underline decoration-paper/40 underline-offset-4">
                {chinese ? siteCopy.footer.habits : "Daily guide"}
              </Link>
            </li>
            <li>
              <Link href="/stones" className="underline decoration-paper/40 underline-offset-4">
                {chinese ? siteCopy.footer.stones : "Stone types"}
              </Link>
            </li>
            <li>
              <Link href="/meals" className="underline decoration-paper/40 underline-offset-4">
                {chinese ? siteCopy.footer.meals : "Sample meals"}
              </Link>
            </li>
            <li>
              <Link href="/about" className="underline decoration-paper/40 underline-offset-4">
                {chinese ? siteCopy.footer.sources : "Sources and limits"}
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-paper/20">
        <p className="mx-auto w-full max-w-5xl px-5 py-4 text-xs text-paper/70">
          StoneWise™ · Created by Dong Xie
        </p>
      </div>
    </footer>
  );
}
