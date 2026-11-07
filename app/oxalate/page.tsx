import type { Metadata } from "next";
import Link from "next/link";
import { OxalateTable } from "@/components/OxalateTable";
import { PageIntro, PageShell } from "@/components/PageShell";
import { oxalateRows, oxalateSource } from "@/lib/oxalate";

export const metadata: Metadata = {
  title: "Oxalate numbers",
  description:
    "Oxalate in milligrams per serving from Pam Hilton's 2020 food list, with a note on how the sheet's Very High label compares with spinach.",
};

export default function OxalatePage() {
  return (
    <PageShell>
      <PageIntro eyebrow="Oxalate handout" title="Milligrams, not just the word high">
        <p>
          These {oxalateRows.length} servings come from {oxalateSource.author},{" "}
          {oxalateSource.title} ({oxalateSource.year}). {oxalateSource.note}
        </p>
        <p>
          On that sheet, Very High starts near 12 mg. A taco, a cup of brewed
          tea, and half a grapefruit get the same label as foods that are far
          denser. Cooked spinach is 755 mg per half cup. Rhubarb is 541 mg per
          half cup. Almonds are 122 mg per ounce. The checker treats 50 mg or
          more in the listed serving as high, 10 to 49 mg as a portion
          question, and under 10 mg as low.
        </p>
        <p>
          Variety, soil, and cooking change the number. Boiling and discarding
          the water lowers oxalate in some vegetables. Use this beside the{" "}
          <Link href="/check" className="font-semibold text-pine underline decoration-pine/30 underline-offset-4">
            food checker
          </Link>
          , not instead of a urine test.
        </p>
      </PageIntro>
      <OxalateTable />
    </PageShell>
  );
}
