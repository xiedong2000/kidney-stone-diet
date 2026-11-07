import type { Metadata } from "next";
import { CheckPageContent } from "@/components/CheckPageContent";
import { PageShell } from "@/components/PageShell";

export const metadata: Metadata = {
  title: "Check a food",
  description:
    "Look up a food and see whether a usual portion is fine, worth limiting, or best kept rare for your type of kidney stone.",
};

export default function CheckPage() {
  return (
    <PageShell>
      <CheckPageContent />
    </PageShell>
  );
}
