"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/check", label: "Check a food" },
  { href: "/cuisines", label: "Cuisines" },
  { href: "/oxalate", label: "Oxalate" },
  { href: "/habits", label: "Daily habits" },
  { href: "/stones", label: "Stone types" },
  { href: "/meals", label: "Sample days" },
  { href: "/about", label: "Sources" },
];

export function SiteHeader() {
  const pathname = usePathname();

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
            <span className="block text-xs text-ink/60">Kidney stone diet guide</span>
          </span>
        </Link>
        <nav className="flex gap-1 overflow-x-auto" aria-label="Primary">
          {links.map((link) => {
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
                {link.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
