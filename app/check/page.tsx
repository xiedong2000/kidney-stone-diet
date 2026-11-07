import type { Metadata } from "next";
import { FoodChecker } from "@/components/FoodChecker";
import { PageIntro, PageShell } from "@/components/PageShell";

export const metadata: Metadata = {
  title: "Check a food",
  description:
    "Look up a food and see whether a usual portion is fine, worth limiting, or best kept rare for your type of kidney stone.",
};

export default function CheckPage() {
  return (
    <PageShell>
      <PageIntro eyebrow="Food and serving checker" title="What can I serve?">
        <p>
          Search an ingredient or restaurant dish, choose a stone type, and
          start with the serving or ordering note. “Usually fine,” “mind the
          portion,” and “keep it rare” are general guidance—not guarantees or
          personal daily limits.
        </p>
      </PageIntro>
      <FoodChecker />
      <p className="mt-8 text-sm leading-6 text-ink/60">
        The list covers common foods, not every recipe or restaurant portion.
        Ask your care team for personal daily limits based on your stone and
        urine test.
      </p>
    </PageShell>
  );
}
