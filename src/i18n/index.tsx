import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import locales from "./locales/index";
console.log(locales.en);
i18n.use(LanguageDetector).init({
  debug: true,
  lng: "en",
  resources: {
    vi: {
      common: locales.vi
    },
    en: {
      common: locales.en
    }
  },

  fallbackLng: "en",

  ns: ["common"],

  defaultNS: "common",

  react: {
    wait: false,
    bindI18n: "languageChanged loaded",
    bindStore: "added removed",
    nsMode: "default"
  }
});

export default i18n;
