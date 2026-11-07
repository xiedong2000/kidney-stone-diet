import type { Metadata } from "next";
import { OxalatePageContent } from "@/components/OxalatePageContent";

export const metadata: Metadata = {
  title: "Oxalate numbers",
  description:
    "Oxalate in milligrams per serving from Pam Hilton's 2020 food list, with a note on how the sheet's Very High label compares with spinach.",
};

export default function OxalatePage() {
  return (
    <OxalatePageContent />
  );
}
