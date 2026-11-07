import Link from "next/link";
import { PageShell } from "@/components/PageShell";

export default function NotFound() {
  return (
    <PageShell width="narrow">
      <p className="text-sm font-semibold uppercase tracking-[0.16em] text-pine">
        Missing page
      </p>
      <h1 className="mt-2 font-serif text-4xl text-ink">That page is not on this site.</h1>
      <p className="mt-4 leading-7 text-ink/80">
        The food checker and the habit guide are the useful places to go next.
      </p>
      <Link
        href="/check"
        className="mt-6 inline-flex min-h-12 items-center rounded-md bg-pine px-5 text-sm font-semibold text-paper"
      >
        Check a food
      </Link>
    </PageShell>
  );
}
