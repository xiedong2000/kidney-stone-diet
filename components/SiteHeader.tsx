"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLanguage } from "@/components/LanguageProvider";
import { siteCopy } from "@/lib/site-copy";

const primaryLinks = [
  { href: "/check", label: "Check food" },
  { href: "/cuisines", label: "Takeout" },
  { href: "/habits", label: "Daily guide" },
];

const moreLinks = [
  { href: "/stones", label: "Stone types" },
  { href: "/meals", label: "Sample days" },
  { href: "/oxalate", label: "Oxalate list" },
  { href: "/about", label: "Sources" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const { language, setLanguage } = useLanguage();
  const chinese = language === "zh";
  const moreActive = moreLinks.some((link) => pathname === link.href);

  return (
    <header className="sticky top-0 z-20 border-b border-line bg-paper/95 backdrop-blur">
      <div className="mx-auto flex w-full max-w-5xl flex-wrap items-center justify-between gap-3 px-5 py-3">
        <Link href="/" className="group flex items-center gap-2">
          <span className="grid h-9 w-9 place-items-center rounded-full bg-pine text-paper">
            <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
              <path
                fill="currentColor"
                d="M12 3c1.6 3.2 5 5.1 5 9.2A5 5 0 0 1 7 12.2C7 8.1 10.4 6.2 12 3z"
              />
            </svg>
          </span>
          <span>
            <span className="block font-serif text-xl leading-none text-ink">
              StoneWise
            </span>
            <span className="block text-xs text-ink/60">{chinese ? siteCopy.header.subtitle : "Kidney stone diet guide"}</span>
          </span>
        </Link>
        <div className="flex w-full flex-wrap items-center gap-2 sm:w-auto sm:justify-end">
        <nav className="flex w-full max-w-full flex-wrap items-center gap-1 sm:w-auto" aria-label={chinese ? "主导航" : "Primary"}>
          {primaryLinks.map((link, index) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={active ? "page" : undefined}
                className={`whitespace-nowrap rounded-md px-3 py-2 text-sm font-semibold ${
                  active ? "bg-pine text-paper" : "text-ink hover:bg-mist"
                }`}
              >
                {chinese ? [siteCopy.header.check, siteCopy.header.takeout, siteCopy.header.habits][index] : link.label}
              </Link>
            );
          })}
          <details className="group relative w-full sm:w-auto sm:shrink-0">
            <summary className={`flex cursor-pointer list-none items-center gap-1 whitespace-nowrap rounded-md px-3 py-2 text-sm font-semibold ${
              moreActive ? "bg-pine text-paper" : "text-ink hover:bg-mist"
            } group-open:bg-pine group-open:text-paper`}>
              {chinese ? siteCopy.header.more : "More"}
              <svg
                viewBox="0 0 20 20"
                className="h-4 w-4 transition-transform group-open:rotate-180"
                aria-hidden="true"
              >
                <path d="m5 7.5 5 5 5-5" fill="none" stroke="currentColor" strokeWidth="1.8" />
              </svg>
            </summary>
            <div className="mt-1 grid w-full gap-1 rounded-md border border-line bg-card p-2 shadow-lg sm:absolute sm:right-0 sm:top-full sm:z-30 sm:w-52">
              {moreLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current={pathname === link.href ? "page" : undefined}
                  className={`rounded px-3 py-2 text-sm font-semibold ${
                    pathname === link.href ? "bg-mist text-pine" : "text-ink hover:bg-mist"
                  }`}
                >
                  {chinese
                    ? [siteCopy.header.stones, siteCopy.header.meals, siteCopy.header.oxalate, siteCopy.header.sources][moreLinks.indexOf(link)]
                    : link.label}
                </Link>
              ))}
            </div>
          </details>
        </nav>
        <div className="inline-flex shrink-0 rounded-md border border-line bg-card p-1" role="group" aria-label={chinese ? "语言" : "Language"}>
          <button type="button" aria-pressed={language === "en"} onClick={() => setLanguage("en")} className={`rounded px-2.5 py-1.5 text-xs font-semibold ${language === "en" ? "bg-pine text-paper" : "text-ink/70"}`}>English</button>
          <button type="button" aria-pressed={language === "zh"} onClick={() => setLanguage("zh")} className={`rounded px-2.5 py-1.5 text-xs font-semibold ${language === "zh" ? "bg-pine text-paper" : "text-ink/70"}`}>中文</button>
        </div>
        </div>
      </div>
    </header>
  );
}
