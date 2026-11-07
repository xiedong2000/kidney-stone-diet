import type { Metadata } from "next";
import { CuisinePageContent } from "@/components/CuisinePageContent";

export const metadata: Metadata = {
  title: "Restaurant and takeout",
  description:
    "Kidney-stone guidance for Chinese, American, Mexican, Japanese, Indian, and Italian dishes, including the salty restaurant versions.",
};

export default function CuisinesPage() {
  return (
    <CuisinePageContent />
  );
}
