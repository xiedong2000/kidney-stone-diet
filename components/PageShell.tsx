import type { ReactNode } from "react";

export function PageShell({
  children,
  width = "default",
}: {
  children: ReactNode;
  width?: "default" | "narrow";
}) {
  const max = width === "narrow" ? "max-w-3xl" : "max-w-5xl";
  return (
    <div className={`mx-auto w-full ${max} px-5 py-12 sm:py-16`}>{children}</div>
  );
}

export function PageIntro({
  eyebrow,
  title,
  children,
}: {
  eyebrow: ReactNode;
  title: ReactNode;
  children: ReactNode;
}) {
  return (
    <header className="max-w-3xl">
      <p className="text-sm font-semibold uppercase tracking-[0.16em] text-pine">
        {eyebrow}
      </p>
      <h1 className="mt-2 font-serif text-4xl leading-tight tracking-tight text-ink sm:text-5xl">
        {title}
      </h1>
      <div className="mt-4 space-y-3 text-lg leading-8 text-ink/80">{children}</div>
    </header>
  );
}
