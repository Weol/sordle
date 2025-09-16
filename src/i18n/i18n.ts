import i18next2 from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import HttpApi from "i18next-http-backend";
import { initReactI18next } from "react-i18next";
import { CONFIG } from "../constants/config";
import translationEn from "../locales/en/translation.json";
import translationSe from "../locales/se/translation.json";

const resources = {
  en: {
    translation: translationEn,
  },
  se: {
    translation: translationSe,
  },
};

export const availableLanguages: (keyof typeof resources)[] = Object.keys(resources) as (keyof typeof resources)[];

export const localeLanguageKey = "i18nextLng";

export const i18next = i18next2
  .use(HttpApi)
  // pass the i18n instance to react-i18next.
  .use(initReactI18next)
  // detect language from browser - this will check the localstorage localeLanguageKey and use the declared CONFIG.defaultLang otherwise
  .use(LanguageDetector)
  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    resources,
    fallbackLng: CONFIG.defaultLang,
    debug: false,
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
    react: {
      useSuspense: false,
    },
    saveMissing: true,
  });
