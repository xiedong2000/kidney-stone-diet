import type { Metadata } from "next";
import { Figtree, Newsreader } from "next/font/google";
import { Suspense } from "react";
import { LanguageProvider } from "@/components/LanguageProvider";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { EducationNotice } from "@/components/EducationNotice";
import "./globals.css";

const sans = Figtree({
  subsets: ["latin"],
  variable: "--font-figtree",
});

const serif = Newsreader({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-newsreader",
});

export const metadata: Metadata = {
  title: {
    default: "StoneWise · Diet guide for kidney stones",
    template: "%s · StoneWise",
  },
  description:
    "A plain-language diet guide for adults with kidney stones: what is usually fine, what to keep rare, and the habits that matter for each stone type.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${sans.variable} ${serif.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
       <LanguageProvider>
        <a
          href="#content"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-card focus:px-4 focus:py-2"
        >
          Skip to content
        </a>
        <Suspense
          fallback={<div className="h-16 border-b border-line bg-paper" />}
        >
          <SiteHeader />
        </Suspense>
        <EducationNotice />
        <main id="content" className="flex-1">
          {children}
        </main>
        <SiteFooter />
       </LanguageProvider>
      </body>
    </html>
  );
}
