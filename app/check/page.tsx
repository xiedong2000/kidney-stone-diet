import type { Metadata } from "next";
import { FoodChecker } from "@/components/FoodChecker";
import { PageIntro, PageShell } from "@/components/PageShell";
import { verdicts } from "@/lib/model";

export const metadata: Metadata = {
  title: "Check a food",
  description:
    "Look up a food and see whether a usual portion is fine, worth limiting, or best kept rare for your type of kidney stone.",
};

export default function CheckPage() {
  return (
    <PageShell>
      <PageIntro eyebrow="Food checker" title="A food is a portion, not a verdict on you">
        <p>
          Pick the stone you are planning around, then search. The labels mean{" "}
          {verdicts.fits.label.toLowerCase()}, {verdicts.careful.label.toLowerCase()},
          or {verdicts.limit.label.toLowerCase()}. Almost nothing here is a
          permanent ban. Star fruit is the exception to skip.
        </p>
        <p>
          Use the cuisine row for Chinese, American, Mexican, Japanese, Indian,
          and Italian dishes, including home cooking and the salty restaurant
          version of the same idea. Oxalate, sodium, and purine are shown as
          low, moderate, or high.
          Those are teaching categories. Variety, soil, cooking, and the brand
          change the milligrams. The checker runs in your browser. The search
          is not stored.
        </p>
      </PageIntro>
      <FoodChecker />
    </PageShell>
  );
}
