import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import Backend from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";

i18n
  .use(Backend) // Load translations using http (default public/locales)
  .use(LanguageDetector) // Detect user language
  .use(initReactI18next) // Pass i18next instance to react-i18next
  .init({
    fallbackLng: "en", // Default language
    debug: true, // Enable debug logs
    interpolation: {
      escapeValue: false, // React already escapes values
    },
    backend: {
      loadPath: "/locales/{{lng}}/{{ns}}.json", // Path to translation files
    },
  });

export default i18n;