"use client";

import {
  createContext,
  useContext,
  useEffect,
  useCallback,
  useSyncExternalStore,
  type ReactNode,
} from "react";

export type SiteLanguage = "en" | "zh";

type LanguageContextValue = {
  language: SiteLanguage;
  setLanguage: (language: SiteLanguage) => void;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);
const STORAGE_KEY = "stonewise-language";

function getLanguage(): SiteLanguage {
  const value = window.localStorage.getItem(STORAGE_KEY);
  return value === "zh" ? "zh" : "en";
}

function subscribeToLanguage(onChange: () => void) {
  window.addEventListener("storage", onChange);
  window.addEventListener("stonewise-language-change", onChange);
  return () => {
    window.removeEventListener("storage", onChange);
    window.removeEventListener("stonewise-language-change", onChange);
  };
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const language = useSyncExternalStore<SiteLanguage>(
    subscribeToLanguage,
    getLanguage,
    () => "en",
  );

  useEffect(() => {
    document.documentElement.lang = language === "zh" ? "zh-CN" : "en";
  }, [language]);

  const setLanguage = useCallback((next: SiteLanguage) => {
    window.localStorage.setItem(STORAGE_KEY, next);
    window.dispatchEvent(new Event("stonewise-language-change"));
  }, []);
  const value = { language, setLanguage };

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage(): LanguageContextValue {
  const context = useContext(LanguageContext);
  if (!context) throw new Error("useLanguage must be used within LanguageProvider");
  return context;
}
