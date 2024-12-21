import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

import enJSOn from './locales/en-US/en.json';
import arJSON from './locales/ar/ar.json';

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
    resources: {
      en: {
        translation: enJSOn,
      },
      ar: {
        translation: arJSON,
      },
    },
  });

export default i18n;
